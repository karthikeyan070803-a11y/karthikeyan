export default function ParticipantList({ participants, onRemove }) {
  return (
    <div className="workshop-card">
      <div className="participants-header">
        <h2>Registered Participants</h2>
        <span className="count-badge">{participants.length}</span>
      </div>

      {participants.length === 0 ? (
        <p className="empty-state">No participants yet. Be the first to register!</p>
      ) : (
        <table className="participant-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Workshop</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.id}>
                <td className="name-cell">{p.name}</td>
                <td>{p.email}</td>
                <td>
                  <span className="workshop-tag">{p.workshop}</span>
                </td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => onRemove(p.id)}
                    aria-label={`Remove ${p.name}`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}