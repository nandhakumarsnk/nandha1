// import { useState } from 'react'
// import { useRouter } from 'next/router'


// export default function RegisterForm() {
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')
//   const [phone, setPhone] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const router = useRouter()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//    const response = await fetch('api/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ firstName,lastName,email,phone,password}),
//     })

//     if (response.ok) {
//       router.push('/LoginForm')
//     } else {
//       const data = await response.json()
//       setError(data.message)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Register</h1>
//       <label htmlFor="firstName">firstName</label>
//       <input
//         type="text"
//         id="firstName"
//         value={firstName}
//         onChange={(e) => setFirstName(e.target.value)}
//         required
//       /><br></br>
//       <label htmlFor="lastName">SecondName</label>
//       <input
//         type="text"
//         id="lastName"
//         value={lastName}
//         onChange={(e) => setLastName(e.target.value)}
//         required
//       /><br></br>
//       <label htmlFor="email">Email</label>
//       <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       /><br></br>
//       <label htmlFor="phone">PhoneNo</label>
//       <input
//         type="text"
//         id="phone"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         required
//       /><br></br>
//       <label htmlFor="password">Password</label>
//       <input
//         type="password"
//         id="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       /><br></br>
//       {error && <p>{error}</p>}
//       <button type="submit">Register</button>
//       <br></br>
//     </form>
//   )
// }


import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/registerform.module.css'

export default function RegisterForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, phone, password }),
    })

    if (response.ok) {
      router.push('/LoginForm')
    } else {
      const data = await response.json()
      setError(data.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
    <center>  <h1>REGISTER</h1></center>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className={styles.input}
      /><br></br><br></br>
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        className={styles.input}
      /><br></br><br></br>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.input}
      /><br></br><br></br>
      <label htmlFor="phone">PhoneNo</label>
      <input
        type="text"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className={styles.input}
      /><br></br><br></br>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.input}
      /><br></br><br></br>
      {error && <p>{error}</p>}
      <button type="submit" className={styles.button}>Register</button>
      <br></br><br></br>
    </form>
  )
}
