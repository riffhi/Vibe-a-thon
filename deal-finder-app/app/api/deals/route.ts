import { NextRequest, NextResponse } from "next/server";
import { sendTopDealsEmail } from "@/lib/email";
import { logToGoogleSheets } from "@/lib/sheets";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { product } = await req.json();

  // Load and parse the dataset
  const filePath = path.join(process.cwd(), "public", "full_mock_reseller_data.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const allDeals = JSON.parse(fileContent);

  // Match product name (case-insensitive, partial allowed)
  const matches = allDeals.filter((item: any) =>
    item.product.toLowerCase().includes(product.toLowerCase())
  );

  // Sort by price asc, then rating desc
  const sorted = matches.sort((a: any, b: any) => {
    if (a.price !== b.price) return a.price - b.price;
    return b.rating - a.rating;
  });

  const top3 = sorted.slice(0, 3);

  try {
    await sendTopDealsEmail(top3);
    await logToGoogleSheets(top3);
  } catch (err) {
    console.error("Email or Google Sheets error:", err);
  }

  return NextResponse.json({ reseller_data: top3 });
}
