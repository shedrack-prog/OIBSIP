import sgmail from '@sendgrid/mail';

const SEND_GRID_API_KEY =
  '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';

sgmail.setApiKey(SEND_GRID_API_KEY);

export const sendVerificationEmail = async (email, name, url) => {
  const message = {
    to: `${email}`,
    from: 'shaggypizza001@gmail.com',
    subject: 'Shaggy Pizza Email verification',
    text: 'hello world',
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"><span>Action require : Activate your Shaggy account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Shaggy Pizza. To complete your registration, please confirm your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Shaggy pizza lets you order any pizza of your choice and bring your loved ones together. Thank you for eating with us.</span></div></div>`,
  };

  await sgmail
    .send(message)
    .then((response) => console.log('Email sent....', response))
    .catch((error) => console.log('Mail Error:', error.message));
};
