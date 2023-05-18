import sql from 'mssql'
const bcrypt = require('bcrypt');

 export const config = {
        user: 'nandha',
        password: 'Nandha@123',
        server: 'BIITSWO217',
        database: 'DB3',
        options:{
          encrypt: false,
          enableArithAbort: true,
          trueServerCertificate: false,
      },
      ssl:{
          rejectUnauthorized: false
      }
      };
        

export const pool = new sql.ConnectionPool(config)

export const connect = async () => {
  try {
    await pool.connect()
    console.log('Connected to database')
  } catch (err) {
    console.error('Error connecting to database', err.message)
  }
}

export const closePool = async () => {
  try {
    await pool.close()
    console.log('Connection to database closed')
  } catch (err) {
    console.error('Error closing database connection', err.message)
  }
}

// export async function authenticateUser(email, password) {
//   const pool = await sql.connect(config);
//   // const pool = await sql.ConnectionPool(config);
//   const result = await pool
//     .request()
//     .input('email', sql.VarChar, email)
//     .input('password', sql.VarChar, password)
//     .query('SELECT * FROM Users WHERE email = @email AND password = @password');
//   sql.close();
//   if (result.recordset.length === 1) {
//     return {
//       name: result.recordset[0].name,
//       email: result.recordset[0].email
//     };
//   } else {
//     return null;
//   }
// };


export async function authenticateUser(email, password) {
  const pool = await sql.connect(config);
  // const pool = await sql.ConnectionPool(config);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool
      .request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');

    if (result.recordset.length === 1) {
      const storedPassword = result.recordset[0].password;
      const isPasswordMatch = await bcrypt.compare(password, storedPassword);

      if (isPasswordMatch) {
        return {
          name: result.recordset[0].name,
          email: result.recordset[0].email
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  } finally {
    sql.close();
  }
};