//original code


// import React, { useState } from 'react'
// import { useRouter } from 'next/router'

// export default function LoginForm() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState(null)
//   const router = useRouter()
  
//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email, password })
//     })
//     const data = await response.json()
    
//     if (response.ok) {
//       router.push('/IssueForm')
//       // router.push('/Homepage')
//     } 
//     else {
//       setError(data.message)
//     }
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   )
// }


import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/loginform.module.css'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    
    if (response.ok) {
      router.push('/IssueForm')
      // router.push('/Homepage')
    } 
    else {
      setError(data.message)
    }
  }

  return (
    <div className={styles.container}>
      <h1>LOGIN</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
