const dotenv = require('dotenv');
dotenv.config();

export default {
    jwtSecret: 'xxx', // Define the key yourself
    db: 'mongodb://localhost:27017/IPROMS',
    smtp: {
        get host() {
            return 'smtp.gmail.com'
        },
        get user() {
            // Change to your own QQ number
            return process.env.EMAIL_USER
            // return 'menghangsh0101@gmail.com'
        },
        get pass() {
            // Change to the authorization code of your own QQ mailbox
            return process.env.EMAIL_PASS
            // return 'ebtaicmuovmheqkv'
        },
        get code() {
            return () => {
                return Math.random().toString(16).slice(2, 6).toUpperCase()
            }
        },
        get expire() {
            return () => {
                return new Date().getTime() + 60 * 60 * 1000 * 3
            }
        },
        template(code) {
            return `<divstyle="border-radius: 10px 10px 10px 10px;font-size:13px;color: #555555;width: 666px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;border:1px solid #eee;max-width:100%;background: #ffffff repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);"><div
      style="width:100%;background:#49BDAD;color:#ffffff;border-radius: 10px 10px 0 0;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));background-image: -webkit-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;">
      <p
        style="font-size:15px;word-break:break-all;padding: 23px 32px;margin:0;background-color: hsla(0,0%,100%,.4);border-radius: 10px 10px 0 0;">
        Please check your registration verification code </p>
    </div>
    <div style="margin:40px auto;width:90%">
      <div
        style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:14px;color:#555555;">
        <p> Please protect your verification code properly: <strong> ${code} </strong> ，please fill in in three minutes。 </p>
        <p style="text-align: right"> Thanks for registering with our website!</p>
       </div>
      <style type="text/css">
        a:link {
          text-decoration: none
        }
        a:visited {
          text-decoration: none
        }
        a:hover {
          text-decoration: none
        }
        a:active {
          text-decoration: none
        }
      </style>
    </div>
    </div>`
        },
        get subject() {
            return 'Registering Code'
        }
    }
}
