const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);
import { sql, connect, config } from '../db1';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body;

        try {
      // Connect to the SSMS database
      await connect();

      // Insert the form data into the database
      const query = `
      INSERT INTO IT_SUPPORT1 (firstName, lastName, email, phone, place, date, priority, issue)
      OUTPUT INSERTED.TokenID
      VALUES (@firstName, @lastName, @email, @phone, @place, @date, @priority, @issue)
      `;

      const pool = await sql.connect(config);
      const result = await pool.request()
      .input('firstName', sql.VarChar, formData.fname)
      .input('lastName', sql.VarChar, formData.lname)
      .input('email', sql.VarChar, formData.email)
      .input('phone', sql.VarChar, formData.phone)
      .input('place', sql.VarChar, formData.place)
      .input('date', sql.Date, formData.date)
      .input('priority', sql.VarChar, formData.priority)
      .input('issue', sql.VarChar, formData.issue)
      .query(query);

      const tokenID = result.recordset[0].TokenID;
      console.log(tokenID);

      // Close the database connection
      sql.close();
    

      const message = `
        TokenID: ${tokenID}<br><br>
        Name: ${formData.fname} ${formData.lname}<br><br>
        Email: ${formData.email}<br><br>
        Phone: ${formData.phone}<br><br>
        Place where the issue Occurred: ${formData.place}<br><br>
        Date of issue Happened: ${formData.date}<br><br>
        Issue Priority: ${formData.priority}<br><br>
        Issue details: ${formData.issue}<br><br>
      `;

      const data = {
        to: 'nandha.kumar@biits.in',
        from: 'nandha020999@gmail.com',
        // cc: ['kushala.v@biits.in','Disha.more@biits.in'],
        subject: 'IT SUPPORT ISSUES',
        // text: `<b>TESTING MAIL FOR IT SUPPORT ISSUE APPLICATION USING NEXT-JS AND SENDGRID</b>\r\n\r\n${message}`,
        // html: `<p><b>TESTING MAIL FOR IT SUPPORT ISSUE APPLICATION USING NEXT-JS AND SENDGRID</b></p>${message.replace(
        //   /\r\n/g,
        text: `<b>MAIL FOR IT SUPPORT ISSUE APPLICATION</b>\r\n\r\n${message}`,
        html: `<p><b>MAIL FOR IT SUPPORT ISSUE APPLICATION</b></p>${message.replace(
          /\r\n/g,
          '<br>'
        )}`,
      };

      // Send the email
      mail.send(data);

      console.log(message);
      res.status(200).json({ status: 'Ok' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'Error' });
    }
  } else {
    res.status(405).end();
  }
}
