import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { sendTopDealsEmail } from "@/lib/email";
import { logToGoogleSheets } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const { product } = await req.json();
    console.log("Received product:", product);

    // Load deals JSON
    const filePath = path.join(process.cwd(), "public", "full_mock_reseller_data.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const allDeals = JSON.parse(fileContent);

    // Filter deals
    const matches = allDeals.filter((item: any) =>
      item.product.toLowerCase().includes(product.toLowerCase())
    );

    // Sort by price ascending, rating descending
    const sorted = matches.sort((a: any, b: any) => {
      if (a.price !== b.price) return a.price - b.price;
      return b.rating - a.rating;
    });

    const top3 = sorted.slice(0, 3);
    console.log("Top 3 deals:", top3);

    try {
      console.log("Sending email...");
      await sendTopDealsEmail(top3);
      console.log("Email sent successfully");

      console.log("Logging to Google Sheets...");
      await logToGoogleSheets(top3);
      console.log("Logged to Google Sheets successfully");
    } catch (err) {
      console.error("Error sending email or logging sheets:", err);
    }

    return NextResponse.json({ reseller_data: top3 });
  } catch (error) {
    console.error("Error in POST /api/deals:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
