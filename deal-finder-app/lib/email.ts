import nodemailer from "nodemailer";

export async function sendTopDealsEmail(deals: any[]) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS || !process.env.USER_EMAIL) {
    throw new Error("Missing Gmail or user email environment variables.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const htmlContent = deals.map(
    (deal, i) => `
      <p><strong>Deal ${i + 1}</strong></p>
      <p>Seller: ${deal.seller}</p>
      <p>Price: $${deal.price}</p>
      <p>Delivery: ${deal.delivery || "Delivery time not available"}</p>
      <br/>
    `
  ).join("");

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.USER_EMAIL,
    subject: "Top 3 Deals",
    html: `<h2>Here are your top 3 deals:</h2>${htmlContent}`,
  });
}
