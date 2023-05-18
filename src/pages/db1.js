import sql from 'mssql';

const config = {
  user: 'nandha',
  password: 'Nandha@123',
  server: 'BIITSWO217',
  database: 'DB3',
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};

async function connect() {
  try {
    await sql.connect(config);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

module.exports = {
  sql,
  connect,
};
