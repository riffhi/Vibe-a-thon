"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaStar, FaShippingFast } from "react-icons/fa";

export default function HomePage() {
  const [deals, setDeals] = useState<any[]>([]);
  const [product, setProduct] = useState("concert ticket");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if (!product.trim()) {
      setError("Please enter a product name.");
      setDeals([]);
      return;
    }

    setLoading(true);
    setError(null);
    setDeals([]);

    try {
      const res = await axios.post("/api/deals", { product });
      if (res.data?.reseller_data && res.data.reseller_data.length > 0) {
        setDeals(res.data.reseller_data);
      } else {
        setError("No deals found for this product.");
      }
    } catch (err) {
      console.error("Failed to fetch deals:", err);
      setError("Failed to load deals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-12">
      <h1 className="text-5xl font-extrabold mb-6 text-center tracking-tight">🎤 DealFinder AI</h1>
      <p className="text-center text-lg mb-8 max-w-xl mx-auto leading-relaxed text-gray-300">
        Ask our voice agent for the best deals. Enter a product name and click “Get Best Deals” to see the top offers.
      </p>

      <div className="max-w-md mx-auto mb-8">
        <label htmlFor="product" className="block mb-2 text-sm font-semibold text-gray-400">
          Product Name
        </label>
        <input
          id="product"
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="e.g. concert ticket"
          className="w-full px-5 py-3 rounded-md text-white font-medium bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500"
          disabled={loading}
        />
      </div>

      <div className="text-center mb-10">
        <Button
          onClick={fetchDeals}
          disabled={loading || !product.trim()}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-10 py-3 font-semibold text-lg"
        >
          {loading ? "Loading..." : "Get Best Deals"}
        </Button>
      </div>

      {error && (
        <p className="text-center text-red-500 font-semibold mb-8">{error}</p>
      )}

      {deals.length > 0 && (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center tracking-wide">🔥 Top Deals</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {deals.map((deal, i) => (
              <Card
                key={i}
                className="bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-green-600"
              >
                <CardContent className="p-6 text-white">
                  <p className="text-sm mb-1">Seller</p>
                  <p className="text-lg font-semibold mb-3">{deal.seller || "Unknown Seller"}</p>

                  <p className="text-sm mb-1">Price</p>
                  <p className="text-xl font-bold text-green-400 mb-4">
                    ${Number(deal.price).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <FaShippingFast className="text-green-400" />
                    <p className="text-sm">
                      Delivery:{" "}
                      <span className="font-medium">
                        {deal.delivery
                          ? deal.delivery
                          : "Delivery time not available"}
                      </span>
                    </p>
                  </div>

                  {deal.rating !== undefined && deal.rating !== null && (
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      <p className="text-sm font-medium">
                        Rating: {deal.rating.toFixed(1)} / 5
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
