import { useSession,signIn,signOut} from 'next-auth/react'
import React  from 'react'

const Handler = () => {
    const {data: session} = useSession()
   if(session)
{
    return (
        <div><p>welcome,{session.user.email}</p>
        <button onClick={()=>signOut({callbackUrl: 'http://localhost:3000'})}>signOut</button>
        </div>
    )
    
}
else
{
    return (
        <div>
            {/* <p>You are not signed In.</p> */}
            <button onClick={()=>signIn()}>signIn with Google</button>
        </div>
    )
}
}
export default Handler
