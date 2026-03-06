import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const sns = new SNSClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function sendOtpTest() {
  if (!process.argv[2]) {
    console.log("Usage: node send-otp-test.mjs <phone_number> [otp]");
    console.log("Example: node send-otp-test.mjs 9876543210 1234");
    process.exit(1);
  }

  const phoneNumber = process.argv[2];
  const otp = process.argv[3] || "1234";
  
  // Format phone number with country code if not present
  let formattedPhone = phoneNumber;
  if (!phoneNumber.startsWith("+")) {
    if (phoneNumber.startsWith("91")) {
      formattedPhone = "+" + phoneNumber;
    } else {
      formattedPhone = "+91" + phoneNumber;
    }
  }

  console.log(`Sending OTP to: ${formattedPhone}`);
  console.log(`OTP: ${otp}`);

  try {
    const command = new PublishCommand({
      Message: `Your NationCite OTP is ${otp}. It expires in 5 minutes.`,
      PhoneNumber: formattedPhone,
    });

    const response = await sns.send(command);
    console.log("✅ OTP sent successfully!");
    console.log(`Message ID: ${response.MessageId}`);
  } catch (error) {
    console.error("❌ Failed to send OTP:");
    console.error(error.message);
    if (error.$metadata?.httpStatusCode === 400) {
      console.error("\nPossible issues:");
      console.error("- Invalid phone number format");
      console.error("- Phone number not in supported region");
      console.error("- AWS SNS not configured for SMS");
    }
    process.exit(1);
  }
}

sendOtpTest();
