// import { pool,connect, closePool } from '../db'
// import sql from 'mssql'

// export default async function login(req, res) {
//   if (req.method === 'POST') {
//     const {login,password} = req.body
//     try {
//       await connect()
//       const result = await pool
//         .request()
//         .input('login', sql.NVarChar, login)
//         .input('password', sql.NVarChar, password)
//         // .execute('select_Userslogins')
//         .query('SELECT * FROM Users WHERE email=@email OR password=@password');
//       //console.log(result.recordset)
//       const user = result.recordset[0];
      
//       if (result.recordset.length > 0) {
//         res.status(200).json({ message: 'Login successful' })
//       } else {
//         res.status(401).json({ message: 'Invalid email or password' })
//       }
//     } catch (err) {
//       console.error(err.message)
//       res.status(500).json({ message: 'Internal server error' })
//     } finally {
//       await closePool()
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' })
//   }
  
// }


import { pool, connect, closePool } from '../db';
import sql from 'mssql';
import bcrypt from 'bcrypt';

export default async function login(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      await connect();
      const query = `
        SELECT * FROM Users
        WHERE email = @email;
      `;
      const result = await pool
        .request()
        .input('email', sql.VarChar, email)
        .query(query);

      const user = result.recordset[0];
     
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {

          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Invalid emailaaa or password' });
        }
      } 
      else {
        res.status(401).json({ message: 'Invalid emailbbb or password' });
      }
    } 
    
    catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await closePool();
    }
  } 
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

