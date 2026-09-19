import { Disclosure } from './components/Disclosure'
import './App.css'

function App() {
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
    </main>
  )
}

export default App
