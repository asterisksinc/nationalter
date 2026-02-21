import nodemailer from "nodemailer";

type RegistrationType = "ORG" | "SCHOLAR";
type RegistrationSubType = "MEDICAL" | "RESEARCHER" | "ORG";

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

Ticket ID: ${ticketId}

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
  const subject = "NationCite | Registration Approved";

  const body = `
Hello ${name},

Congratulations! Your NationCite registration has been approved.

Here are your login credentials:

Username: ${username}
Temporary Password: ${password}

Important:
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

/* ======================================================
   CONTACT FORM MAIL
   ====================================================== */

function buildContactMail({
  name,
  inquiryType,
}: {
  name: string;
  inquiryType: string;
}) {
  const subject = "NationCite | Contact Form Received";

  const body = `
Hello ${name},

Thank you for reaching out to NationCite regarding ${inquiryType.toLowerCase()}.

We have received your inquiry and our team will get back to you within 24-48 hours.

If you have any urgent matters, please don't hesitate to reach out to us directly.

Warm regards,  
NationCite Team
`;

  return { subject, body };
}

export async function sendContactMail({
  to,
  name,
  inquiryType,
}: {
  to: string;
  name: string;
  inquiryType: string;
}) {
  const { subject, body } = buildContactMail({
    name,
    inquiryType,
  });

  await transporter.sendMail({
    from: `"NationCite" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text: body,
  });
}

/* ======================================================
   ADMIN NOTIFICATION - NEW CONTACT FORM
   ====================================================== */

function buildAdminContactAlert({
  name,
  email,
  phone,
  institution,
  inquiryType,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  institution: string;
  inquiryType: string;
  message: string;
}) {
  const subject = "📨 New Contact Form Submission | NationCite";

  const body = `
Hello Admin,

A new contact form has been submitted on NationCite.

👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
🏢 Institution: ${institution}
📋 Inquiry Type: ${inquiryType}

💬 Message:
${message}

Please respond to this inquiry promptly.

Admin Panel:
${process.env.APP_URL}/admin

Regards,
NationCite System
`;

  return { subject, body };
}

export async function sendAdminContactAlert({
  name,
  email,
  phone,
  institution,
  inquiryType,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  institution: string;
  inquiryType: string;
  message: string;
}) {
  const { subject, body } = buildAdminContactAlert({
    name,
    email,
    phone,
    institution,
    inquiryType,
    message,
  });

  await transporter.sendMail({
    from: `"NationCite System" <${process.env.MAIL_USER}>`,
    to: process.env.ADMIN_EMAIL, // 👈 admin email here
    subject,
    text: body,
  });
}

/* ======================================================
   ADMIN REPLY - CONTACT FORM
   ====================================================== */

export async function sendContactReplyMail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  await transporter.sendMail({
    from: `"NationCite Support" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text: body,
  });
}
