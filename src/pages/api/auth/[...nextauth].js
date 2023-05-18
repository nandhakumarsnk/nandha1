// import NextAuth  from 'next-auth/next'
// import GoogleProvider from 'next-auth/providers/google'
// import authenticateUser from 'C:/Users/Kushala.V/Desktop/nextlogregister/app/src/pages/db'


// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//         }),
//         ],
//     callbacks:{
//         // async signIn(){
//         //     return '/homepage'
//         // },
//         async signOut(){
//             return '/LoginForm'
//         }
//     },
    
// secret: process.env.JWT_SECRET

// })
// import NextAuth from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import { authenticateUser } from 'C:/Users/Nandha.kumar/Desktop/next/nextlogregister/app/src/pages/db.js';

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         // Authenticate the user using the authenticateUser function from db.js
//         const user = await authenticateUser(credentials.email, credentials.password)
//         if (user) {
//           // Return the authenticated user object
//           return user
//         } else {
//           // Return null if authentication failed
//           return null
//         }
//       },
//     }),
//     GoogleProvider({
//                   clientId: process.env.GOOGLE_CLIENT_ID,
//                   clientSecret: process.env.GOOGLE_CLIENT_SECRET
//               }),
//   ],
//   callbacks:{
//             // async signIn(){
//             //     return '/Homepage'
//             // },
//             async signOut(){
//                 return '/LoginForm'
//             }
//           },
//           secret: process.env.JWT_SECRET

//   // Add any additional options or callbacks as needed
// })





import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authenticateUser } from '../../db';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Authenticate the user using the authenticateUser function from db.js
        const user = await authenticateUser(credentials.email, credentials.password)
        if (user) {
          // Return the authenticated user object
          return user
        } else {
          // Return null if authentication failed
          return null
        }
      },
    }),
    GoogleProvider({
                  clientId: process.env.GOOGLE_CLIENT_ID,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET
              }),
  ],
  callbacks:{
            async signIn(){
                return '/IssueForm'
            }
            // async signOut(){
            //     return '/LoginForm'
            // }
            // async session({ session, token, user }) {
            //   // Send properties to the client, like an access_token from a provider.
            //   session.accessToken = token.accessToken
            //   return session
            // }
            // async session({ session, user, token }) {
            //   return session
            // },
          },
          secret: process.env.JWT_SECRET

  // Add any additional options or callbacks as needed
})