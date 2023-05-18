// import LoginForm from './LoginForm'

// import Handler from './api/sign'

// export default function Home() {
//   // const {data: session} = useSession()
//   // console.log(session)
//   // if(session)
//   return (
//     <div>
//       <LoginForm/>
//      <a href="./RegisterForm"> Click here to Create an Account</a>
//      <Handler/>
   
//   </div>
//   )
// }



// import LoginForm from './LoginForm'
// import { useSession } from 'next-auth/react'

// import Handler from './api/sign'

// export default function Home() {
//   const {data: session} = useSession()
//   console.log(session)
//   if(!session){
//   return (
//     <div>
//       <LoginForm/>
//      <a href="./RegisterForm"> Click here to Create an Account</a>
//      <Handler/>
//   </div>
//   )}

//   else{
//     return (
//       <div>
//        <Handler/>
//     </div>
//     )}

// }

import LoginForm from './LoginForm'
import { useSession } from 'next-auth/react'
import Handler from './api/sign'

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <LoginForm />
        <a
          href="./RegisterForm"
          style={{ display: 'block', marginTop: '20px' }}
        >
          Click here to Create an Account
        </a>
        <br></br>
        <Handler />
      </div>
    )
  } else {
    return (
      <div>
        <Handler />
      </div>
    )
  }
}


