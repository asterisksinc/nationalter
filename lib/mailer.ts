import nodemailer from "nodemailer";

type RegistrationType = "ORG" | "SCHOLAR";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/* ======================================================
   REGISTRATION SUBMISSION MAIL
   ====================================================== */

/**
 * Builds mail subject + body for registration submission
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
 * Sends registration submission mail
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
    text: body,
  });
}

/* ======================================================
   REGISTRATION APPROVAL + CREDENTIALS MAIL
   ====================================================== */

/**
 * Builds approval mail with credentials
 */
function buildApprovalMail({
  name,
  username,
  password,
}: {
  name: string;
  username: string;
  password: string;
}) {
  const subject = "NationCite | Registration Approved 🎉";

  const body = `
Hello ${name},

🎉 Congratulations! Your NationCite registration has been approved.

Here are your login credentials:

👤 Username: ${username}
🔑 Temporary Password: ${password}

🔐 Important:
• This is a temporary password
• You will be asked to change it on your first login

Login here:
${process.env.APP_URL}/login

If you face any issues, feel free to contact our support team.

Warm regards,  
NationCite Team
`;

  return { subject, body };
}

/**
 * Sends approval mail with login credentials
 */
export async function sendApprovalCredentialsMail({
  to,
  name,
  username,
  password,
}: {
  to: string;
  name: string;
  username: string;
  password: string;
}) {
  const { subject, body } = buildApprovalMail({
    name,
    username,
    password,
  });

  await transporter.sendMail({
    from: `"NationCite" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text: body,
  });
}

/* ======================================================
   FORGOT PASSWORD MAIL
   ====================================================== */

function buildForgotPasswordMail({
  name,
  password,
}: {
  name: string;
  password: string;
}) {
  const subject = "NationCite | Password Reset";

  const body = `
Hello ${name},

We received a request to reset your NationCite password.

Here is your new temporary password:

🔑 Temporary Password: ${password}

🔐 Important:
• Please login and change your password immediately.
• If you did not request this reset, contact support immediately.

Login here:
${process.env.APP_URL}/login

Warm regards,  
NationCite Team
`;

  return { subject, body };
}

export async function sendForgotPasswordMail({
  to,
  name,
  password,
}: {
  to: string;
  name: string;
  password: string;
}) {
  const { subject, body } = buildForgotPasswordMail({
    name,
    password,
  });

  await transporter.sendMail({
    from: `"NationCite" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text: body,
  });
}

/* ======================================================
   ADMIN NOTIFICATION - NEW REGISTRATION
   ====================================================== */

function buildAdminRegistrationAlert({
  name,
  email,
  type,
  ticketId,
  nationciteId,
}: {
  name: string;
  email: string;
  type: string;
  ticketId: string;
  nationciteId: string;
}) {
  const subject = "🚨 New Registration Submitted | NationCite";

  const body = `
Hello Admin,

A new registration has been submitted on NationCite.

👤 Name: ${name}
📧 Email: ${email}
🧾 Type: ${type}
🎟 Ticket ID: ${ticketId}
🆔 Temp NationCite ID: ${nationciteId}

Please review this registration in the admin dashboard.

Admin Panel:
${process.env.APP_URL}/admin

Regards,
NationCite System
`;

  return { subject, body };
}

export async function sendAdminRegistrationAlert({
  name,
  email,
  type,
  ticketId,
  nationciteId,
}: {
  name: string;
  email: string;
  type: string;
  ticketId: string;
  nationciteId: string;
}) {
  const { subject, body } = buildAdminRegistrationAlert({
    name,
    email,
    type,
    ticketId,
    nationciteId,
  });

  await transporter.sendMail({
    from: `"NationCite System" <${process.env.MAIL_USER}>`,
    to: process.env.ADMIN_EMAIL, // 👈 admin email here
    subject,
    text: body,
  });
}
