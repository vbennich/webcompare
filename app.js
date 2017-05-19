var webshot = require('webshot');
var Jimp = require("jimp");
const nodemailer = require('nodemailer');
var url = ''; // website to sniff
console.log("starting");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '', // email to send notification from
        pass: '' // password to that email
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"NameOfSender 👻" <address of sender>', // sender address
    to: '', // list of receivers
    subject: '', // Subject line
    text: '', // plain text body
    html: '' // html body
};



var cont = true;


function app(callback){
  webshot(url, 'current.png', function(err) {
    // screenshot now saved to current.png
    console.log("taking current screenshot");


    Jimp.read("reference0.png", function(err, image1){


      Jimp.read("current.png", function(err, image2){

        var diff = Jimp.diff(image1, image2, 0.1);
        if(diff.percent != 0){
          console.log("there is a change");
          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message %s sent: %s', info.messageId, info.response);
              cont = false;
          });
        } else{
          console.log("nothing changed");
        }
        if(cont){
            app();
        } else{
          cont = false;
        }

      });

    });
  });

}

app();
