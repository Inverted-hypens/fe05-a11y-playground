# FE-05 Notes: Accessible component fundamentals

## Scope
Three components in `playground/src/components/`, each built against its W3C ARIA Authoring Practices pattern in React + TypeScript with no component libraries:

- `Disclosure.tsx` (APG Disclosure)
- `Tabs.tsx` (APG Tabs, automatic activation)
- `Modal.tsx` (APG Dialog (Modal))

TypeScript runs with `"strict": true`. No `any` in component props. `npx tsc -b` and `npm run lint` pass with no errors.

The three components were generated with an AI coding assistant. I then reviewed each against the APG page and tested it with the keyboard only. The one bug the tests found is described below.

shadcn/ui was initialised with the Radix UI base and the Maia preset. Its `dialog.tsx` and `tabs.tsx` are in `src/components/ui/`.

## Keyboard testing (no mouse)

| Component | What I checked | Result |
|---|---|---|
| Disclosure | Tab reaches each button, Enter and Space toggle, two instances are independent, collapsed content vanishes | Pass |
| Tabs | Tab enters on the active tab only, Left/Right move and switch with wrap-around, Home/End work, Tab from a tab goes to the panel | Pass after adding `tabIndex={0}` to each panel |
| Modal | Focus lands inside on open, Tab and Shift+Tab wrap inside, Escape closes, focus returns to the "Open modal" button | Pass after one fix |

**Bug found by manual testing:** after clicking plain text inside the modal, focus sits on the dialog container itself. Shift+Tab from there was not handled, so focus escaped to the "Open modal" button behind the dialog. The first version only wrapped focus when it was on the first or last focusable element. The fix also treats the container as a starting point on Shift+Tab. `tsc` and lint had both passed before the bug was found.

## What shadcn handled that I missed

shadcn's `dialog.tsx` and `tabs.tsx` are thin styled wrappers. The behaviour comes from the Radix packages they import (`radix-ui@1.6.7`, which re-exports `@radix-ui/react-dialog@1.1.23` and `@radix-ui/react-tabs@1.1.21`). Each item below names where I found it.

### Modal

1. **Hides the rest of the page from screen readers.** `@radix-ui/react-dialog` calls `hideOthers(content)` from the `aria-hidden` package. That sets `aria-hidden="true"` on everything outside the dialog. My modal relies on `aria-modal="true"` and the Tab trap, and nothing marks the page behind as hidden.
2. **Locks page scrolling.** `@radix-ui/react-dialog` wraps its content in `RemoveScroll` from `react-remove-scroll`, which blocks wheel and touch scrolling of the page behind. Mine has no scroll lock.
3. **Traps focus by more than the Tab key.** `@radix-ui/react-focus-scope` handles Tab and Shift+Tab with looping, and it also watches `focusin` and `focusout` to pull focus back if it leaves by another route. My trap is one `onKeyDown` handler on the dialog for the Tab key only, which is exactly how the Shift+Tab bug above got through.
4. **Renders in a portal.** `DialogPortal` in shadcn's `dialog.tsx` uses `@radix-ui/react-portal`, so the dialog is rendered at the end of `<body>`. Mine renders in place, so a parent's `overflow` or `z-index` can clip or bury it.
5. **Provides a description and a labelled close button.** shadcn includes `DialogDescription` (wraps `DialogPrimitive.Description`) and a close button with `<span className="sr-only">Close</span>`. Mine has a title but no description and no close button, so it can only be dismissed with Escape or a backdrop click.

### Tabs

1. **Right-to-left support.** `@radix-ui/react-tabs` resolves direction with `useDirection`, and `@radix-ui/react-roving-focus` swaps ArrowLeft and ArrowRight in `getDirectionAwareKey` when the direction is `rtl`. Mine hard-codes left and right.
2. **Ignores arrow keys when a modifier is held.** In `@radix-ui/react-roving-focus`, the key handler returns early if `metaKey`, `ctrlKey`, `altKey` or `shiftKey` is pressed. Mine calls `preventDefault()` on ArrowLeft and ArrowRight regardless, so Alt+Left (browser Back) is swallowed.

## Observation about shadcn's own defaults (not tested in a browser)
shadcn's `TabsContent` has the class `outline-none`, and the Radix tab panel has `tabIndex: 0`, so the panel can take keyboard focus. Together these suggest a focused panel may show no visible outline unless another style adds one. I have not checked this in the browser.

## Takeaway
Generated code compiled, linted clean, and looked right, but it had a real focus-trap hole that only keyboard testing exposed. Reading the Radix source showed that most of what a modal needs (inert background, scroll lock, portal, focus-out recovery) sits in the primitive layer, not in the styled file shadcn copies into a project.
