import { useState } from "react"
import RegistrationForm from "./components/RegistrationForm.jsx"
import ConfirmationMessage from "./components/ConfirmationMessage.jsx"
import ParticipantList from "./components/ParticipantList.jsx"
import "./components/workshop.css"
export default function App() {
  const [participants, setParticipants] = useState([])
  const [lastRegistered, setLastRegistered] = useState(null)

  // Returns false if it's a duplicate (same email + same workshop)
  function handleRegister(data) {
    const isDuplicate = participants.some(
      (p) => p.email === data.email && p.workshop === data.workshop
    )
    if (isDuplicate) {
      return false
    }

    const newParticipant = { id: Date.now(), ...data }
    setParticipants((prev) => [...prev, newParticipant])
    setLastRegistered(newParticipant)
    return true
  }

  function handleRemove(id) {
    setParticipants((prev) => prev.filter((p) => p.id !== id))
    setLastRegistered((prev) => (prev && prev.id === id ? null : prev))
  }

  return (
    <main className="workshop-app">
      <header className="workshop-header">
        <h1>Workshop Registration</h1>
        <p>Register for our upcoming institutional workshops</p>
      </header>

      <ConfirmationMessage participant={lastRegistered} />

      <RegistrationForm onRegister={handleRegister} />

      <ParticipantList participants={participants} onRemove={handleRemove} />
    </main>
  )
}