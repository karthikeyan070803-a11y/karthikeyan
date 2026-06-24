import { useState } from "react"

const WORKSHOPS = [
  "Web Development Basics",
  "Data Science with Python",
  "UI/UX Design",
  "Cloud Computing",
  "Cybersecurity Essentials",
]

export default function RegistrationForm({ onRegister }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    workshop: WORKSHOPS[0],
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  function validate() {
    const newErrors = {}
    if (!form.name.trim()) {
      newErrors.name = "Please enter your name."
    }
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address."
    }
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // onRegister returns false if it's a duplicate entry
    const success = onRegister({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      workshop: form.workshop,
    })

    if (!success) {
      setErrors({ email: "This email is already registered for this workshop." })
      return
    }

    // reset on success
    setForm({ name: "", email: "", workshop: WORKSHOPS[0] })
    setErrors({})
  }

  return (
    <div className="workshop-card">
      <h2>Register for a Workshop</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="workshop">Select Workshop</label>
          <select
            id="workshop"
            name="workshop"
            value={form.workshop}
            onChange={handleChange}
          >
            {WORKSHOPS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Register Now
        </button>
      </form>
    </div>
  )
}