import { google } from "googleapis";
import { promises as fs } from "fs";

export async function logToGoogleSheets(deals: any[]) {
  const credentials = JSON.parse(await fs.readFile(process.env.GOOGLE_CREDENTIALS!, "utf-8"));

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const values = deals.map(deal => [deal.seller, deal.price, deal.delivery]);

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet1!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });
}
