// import { pool,connect,closePool } from '../db'
// import sql from 'mssql'
// import bcrypt from 'bcrypt'

// export default async function register(req, res) {
//   if (req.method === 'POST') {
//     const { firstName, lastName, email, phone, password } = req.body
//     try {
//       await connect()
//       const saltRounds = 10;
//       // const hashedPassword = await bcrypt.hash(password, saltRounds);
//       const result = await pool
//         .request()
//         .input('firstName', sql.NVarChar, firstName)
//         .input('lastName', sql.NVarChar, lastName)
//         .input('email', sql.NVarChar, email)
//         .input('phone', sql.NVarChar, phone)
//         .input('password', sql.NVarChar, password)
//         // .execute('register_user')
//          query('INSERT INTO Users (firstName,lastName,email,phone,password) VALUES(@firstName,@lastName,@email,@phone,@password)')

//       res.status(200).json({ message: 'User registered successfully' })
//     } catch (err) {
//       console.error(err.message)
//       res.status(500).json({ message: 'Email or Phone already in use...' })
//     } finally {
//       await closePool()
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' })
//   }
// }



import { pool, connect, closePool } from '../db'
import sql from 'mssql'
import bcrypt from 'bcrypt'

export default async function register(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, password } = req.body
    try {
      await connect()
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Check if email or phone already exists
      const checkQuery = `
        SELECT COUNT(*) as count FROM Users
        WHERE email = @email OR phone = @phone
      `;
      const checkResult = await pool
        .request()
        .input('email', sql.NVarChar, email)
        .input('phone', sql.NVarChar, phone)
        .query(checkQuery);

      const existingCount = checkResult.recordset[0].count;

      if (existingCount > 0) {
        res.status(409).json({ message: 'Email or Phone already in use...' });
      } else {
        // Insert the data into the database
        const insertQuery = `
          INSERT INTO Users (firstName, lastName, email, phone, password)
          VALUES (@firstName, @lastName, @email, @phone, @password)
        `;
        await pool
          .request()
          .input('firstName', sql.NVarChar, firstName)
          .input('lastName', sql.NVarChar, lastName)
          .input('email', sql.NVarChar, email)
          .input('phone', sql.NVarChar, phone)
          .input('password', sql.NVarChar, hashedPassword)
          .query(insertQuery);

        res.status(200).json({ message: 'User registered successfully' });
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ message: 'An error occurred during registration' })
    } finally {
      await closePool()
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
