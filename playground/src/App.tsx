import { useState } from 'react'
import { Disclosure } from './components/Disclosure'
import { Modal } from './components/Modal'
import { Tabs } from './components/Tabs'
import './App.css'

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main>
      <h1>Disclosure playground</h1>
      <Disclosure title="Personal details">
        <p>Name: Alex Example</p>
        <p>Email: alex@example.com</p>
      </Disclosure>
      <Disclosure title="Shipping address">
        <p>123 Main Street</p>
        <p>Springfield, ST 12345</p>
      </Disclosure>
      <Tabs
        ariaLabel="Account sections"
        tabs={[
          {
            label: 'Profile',
            children: (
              <p>Update your display name, avatar, and public profile details.</p>
            ),
          },
          {
            label: 'Notifications',
            children: (
              <p>Choose which email and push alerts you want to receive.</p>
            ),
          },
          {
            label: 'Security',
            children: (
              <p>Manage your password, two-factor authentication, and sessions.</p>
            ),
          },
        ]}
      />
      <button type="button" onClick={() => setModalOpen(true)}>
        Open modal
      </button>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm changes"
      >
        <p>Your profile updates will be saved immediately.</p>
        <button type="button" onClick={() => setModalOpen(false)}>
          Save changes
        </button>
        <button type="button" onClick={() => setModalOpen(false)}>
          Cancel
        </button>
      </Modal>
    </main>
  )
}

export default App
