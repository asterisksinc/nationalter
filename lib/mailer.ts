import nodemailer from "nodemailer";

type RegistrationType = "ORG" | "SCHOLAR";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Builds mail subject + body for registration
 */
function buildRegistrationMail(
  name: string,
  ticketId: string,
  type: RegistrationType
) {
  const subject = "NationCite | Registration Submitted Successfully";

  const body = `
Hello ${name},

Thank you for submitting your ${
    type === "ORG" ? "organization" : "scholar"
  } registration on NationCite.

📌 Ticket ID: ${ticketId}

Your application is currently under review by our admin team.
You will be notified once it is approved.

If you need to contact support, please reference your Ticket ID.

Warm regards,  
NationCite Team
`;

  return { subject, body };
}

/**
 * Sends registration mail
 */
export async function sendRegistrationMail({
  to,
  name,
  ticketId,
  type,
}: {
  to: string;
  name: string;
  ticketId: string;
  type: RegistrationType;
}) {
  const { subject, body } = buildRegistrationMail(name, ticketId, type);

  await transporter.sendMail({
    from: `"NationCite" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text: body, // ✅ Plain text mail
  });
}
