
import nodemailer from "nodemailer";
import { url } from "../../variables/host";


async function sendMail(password: any,token:any) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();
  
  
  let account = {
    service: 'Gmail',
    user:'bebetovictor@gmail.com',
    pass:'bkmxzyjkmflnzpul'
  }

  const tos = [
    'vicbebeto@hotmail.com',
    'bebetovic@hotmail.com',
    'bebetovictor@gmail.com',
    '08083206@uagro.mx'
  ];
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    //host: "smtp.ethereal.email",
    //port: 587,
    //secure: false,
    //host: 'smtp.gmail.com',
    //port: 465,
    service: account.service,
    //secure: true,
    auth: {
      user: account.user,
      pass: account.pass, // generated ethereal password
    },
  });


  tos.map(async(to)=>{
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"UAGRO" <bebetovictor@gmail.com>',
      //to: "vicbebeto@hotmail.com, bebetovic@hotmail.com", spam send one by one
      to,
      subject: "Activar cuenta",
      text: `Su contraseña temporal es: ${password} Activar: ${url()}/api/login/activate/${token}`,
      html: `Su contraseña temporal es: <b>${password}</b><br>Activar: <a>${url()}/api/login/activate/${token}</a>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Message INFO: %s", info.accepted);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
  
}
  
  export default sendMail