export default function ConfirmationMessage({ participant }) {
  if (!participant) return null

  return (
    <div className="confirmation" role="status">
      <span className="check" aria-hidden="true">
        {"\u2713"}
      </span>
      <div className="text">
        <strong>Registration confirmed!</strong>
        <p>
          Thank you, {participant.name}. You are registered for{" "}
          <b>{participant.workshop}</b>. A confirmation has been sent to{" "}
          {participant.email}.
        </p>
      </div>
    </div>
  )
}