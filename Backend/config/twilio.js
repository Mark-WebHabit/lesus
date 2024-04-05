import twilio from "twilio";

const accountSid =
  process.env.TWILIO_ACCOUNT_SID || "AC56bd5e7688a6e44774714c85d42a1e71";
const authToken =
  process.env.TWILIO_AUTH_TOKEN || "d3f612d0f7b376cb250b5baff754e7c7";
const client = twilio(accountSid, authToken);

export async function sendSMS(body, to) {
  const messgOptions = {
    body,
    from: "+12512996391", // Your Twilio number
    to, // The recipient's number
  };

  try {
    const instance = await client.messages.create(messgOptions);
  } catch (error) {
    console.log(error);
  }
}
