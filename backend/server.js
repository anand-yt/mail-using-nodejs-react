require('dotenv').config()
const fs = require('fs');

const express = require('express');
const cors = require('cors'); // Import the cors middleware
const handlebars = require('handlebars')

const nodemailer = require('nodemailer')
const app = express();
const path = require('path')
app.use(cors());
app.use(express.json()); // Add this line to parse JSON


function sendmail(name,email){
  console.log(name, email)


 var transporter = nodemailer.createTransport({
    service: "gmail",
    
    auth: {
      user: process.env.EMAILID,
      pass: process.env.PASSWORD,
    },
  });
 
  
//   var mailOptions = {
//     from: process.env.EMAILID,
//     to: req.body.email,
//     cc: "anand.k4756@gmail.com",
//     subject: "Thanks for giving feedback " + name,
//     text: "Thanks for your message you have sent to us --> " + message,
//   };

const subject = 'Mail regarding feedback';
const template = handlebars.compile(fs.readFileSync(path.join(__dirname, 'templates/','feedback.hbs'), 'utf8'));
const html = template({ name: name, email: email });
const to = email;
   const from =  process.env.EMAILID;

   
const mailOptions={
  from,
    to,
    subject,
    html
    
}

// replace this url with the link to the email verification page of your front-end app



//   await sendEmail(to, subject, html);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("sent");
    }
  });
}





app.post('/',(req, res)=>{
 const {name, email, message } = req.body;
    sendmail(name,email,message);
  res.json('mail sent');
})



app.listen(5000, ()=>{
    console.log('server running at 5000')
})


