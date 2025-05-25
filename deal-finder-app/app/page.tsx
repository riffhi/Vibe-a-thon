"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://backend.omnidim.io/web_widget.js?secret_key=5ca433a8b72d1f8a89ff19c4e7f33fb3";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchDeals = async () => {
    const res = await axios.get("/api/deals");
    setDeals(res.data.reseller_data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-12">
      <h1 className="text-5xl font-bold mb-6 text-center">🎤 DealFinder AI</h1>
      <p className="text-center text-lg mb-10">
        Ask our voice agent for the best deals. Click “Show Top 3 Deals” to get results.
      </p>
      <div className="text-center">
        <Button onClick={fetchDeals} className="bg-green-600 hover:bg-green-700">
          Show Top 3 Deals
        </Button>
      </div>

      {deals.length > 0 && (
        <div className="mt-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">🔥 Top Deals</h2>
          {deals.map((deal, i) => (
            <Card key={i} className="mb-4 bg-gray-800 text-white">
              <CardContent className="p-4">
                <p><strong>Seller:</strong> {deal.seller}</p>
                <p><strong>Price:</strong> ${deal.price}</p>
                <p><strong>Delivery:</strong> {deal.delivery}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
