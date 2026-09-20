warning: in the working copy of 'playground/package.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'playground/tsconfig.app.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'playground/tsconfig.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'playground/vite.config.ts', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/playground/package.json b/playground/package.json[m
[1mindex 245d604..5445382 100644[m
[1m--- a/playground/package.json[m
[1m+++ b/playground/package.json[m
[36m@@ -14,11 +14,13 @@[m
     "react-dom": "^19.2.8"[m
   },[m
   "devDependencies": {[m
[31m-    "@types/node": "^24.13.3",[m
[32m+[m[32m    "@tailwindcss/vite": "^4.3.3",[m
[32m+[m[32m    "@types/node": "^24.13.6",[m
     "@types/react": "^19.2.18",[m
     "@types/react-dom": "^19.2.7",[m
     "@vitejs/plugin-react": "^6.1.1",[m
     "oxlint": "^1.81.0",[m
[32m+[m[32m    "tailwindcss": "^4.3.3",[m
     "typescript": "~6.0.2",[m
     "vite": "^8.3.0"[m
   }[m
[1mdiff --git a/playground/tsconfig.app.json b/playground/tsconfig.app.json[m
[1mindex f9defa6..27a38be 100644[m
[1m--- a/playground/tsconfig.app.json[m
[1m+++ b/playground/tsconfig.app.json[m
[36m@@ -17,6 +17,10 @@[m
     "jsx": "react-jsx",[m
 [m
     "strict": true,[m
[32m+[m[32m    "baseUrl": ".",[m
[32m+[m[32m    "paths": {[m
[32m+[m[32m      "@/*": ["./src/*"][m
[32m+[m[32m    },[m
 [m
     /* Linting */[m
     "noUnusedLocals": true,[m
[1mdiff --git a/playground/tsconfig.json b/playground/tsconfig.json[m
[1mindex 1ffef60..aa3c04f 100644[m
[1m--- a/playground/tsconfig.json[m
[1m+++ b/playground/tsconfig.json[m
[36m@@ -1,4 +1,10 @@[m
 {[m
[32m+[m[32m  "compilerOptions": {[m
[32m+[m[32m    "baseUrl": ".",[m
[32m+[m[32m    "paths": {[m
[32m+[m[32m      "@/*": ["./src/*"][m
[32m+[m[32m    }[m
[32m+[m[32m  },[m
   "files": [],[m
   "references": [[m
     { "path": "./tsconfig.app.json" },[m
[1mdiff --git a/playground/vite.config.ts b/playground/vite.config.ts[m
[1mindex 9982072..fbe0fbf 100644[m
[1m--- a/playground/vite.config.ts[m
[1m+++ b/playground/vite.config.ts[m
[36m@@ -1,7 +1,14 @@[m
[32m+[m[32mimport tailwindcss from '@tailwindcss/vite'[m
 import react from '@vitejs/plugin-react'[m
[32m+[m[32mimport path from 'path'[m
 import { defineConfig } from 'vite'[m
 [m
 // https://vite.dev/config/[m
 export default defineConfig({[m
[31m-  plugins: [react()],[m
[32m+[m[32m  plugins: [react(), tailwindcss()],[m
[32m+[m[32m  resolve: {[m
[32m+[m[32m    alias: {[m
[32m+[m[32m      '@': path.resolve(__dirname, './src'),[m
[32m+[m[32m    },[m
[32m+[m[32m  },[m
 })[m
