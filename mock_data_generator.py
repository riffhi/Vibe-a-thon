import json
import random
from datetime import datetime, timedelta

sellers = ["HypeSole", "SneakerPlug", "KickMart", "StreetStyle", "DropSpot", "UrbanFeet",
           "Ticketo", "LiveX", "PassMela", "GoEntry", "StubMaster", "FanDeals"]

products = [
    # Sneakers
    {"category": "Sneaker", "name": "Air Jordan 4 Black Cat"},
    {"category": "Sneaker", "name": "Yeezy Boost 350 V2 Zebra"},
    {"category": "Sneaker", "name": "Nike Dunk Low Panda"},
    {"category": "Sneaker", "name": "Air Max 1 Patta Waves"},
    # Concert Tickets
    {"category": "Concert", "name": "Taylor Swift Eras Tour - Mumbai"},
    {"category": "Concert", "name": "Arijit Singh Live - Delhi"},
    {"category": "Concert", "name": "Coldplay World Tour - Bengaluru"},
    {"category": "Concert", "name": "BTS Comeback Tour - Virtual"},
    # Cricket Tickets
    {"category": "Cricket", "name": "IPL Final - Mumbai Indians vs CSK"},
    {"category": "Cricket", "name": "India vs Pakistan - Ahmedabad"},
    {"category": "Cricket", "name": "WPL Final - Delhi Capitals vs RCB"},
    {"category": "Cricket", "name": "ICC T20 World Cup Final - Barbados"}
]

mock_data = []

for _ in range(100):  # Generate 40 mock listings
    product = random.choice(products)
    seller = random.choice(sellers)
    base_price = random.randint(999, 25999)

    delivery_days = random.randint(1, 7)
    authenticity = "Yes" if product["category"] != "Concert" else "N/A"
    seat_type = random.choice(["VIP", "Regular", "Balcony", "General"]) if product["category"] != "Sneaker" else "N/A"

    mock_data.append({
        "product": product["name"],
        "category": product["category"],
        "seller": seller,
        "price": base_price,
        "deliveryDays": delivery_days if product["category"] == "Sneaker" else "E-Ticket",
        "authentic": authenticity,
        "seatType": seat_type,
        "rating": round(random.uniform(3.5, 5.0), 1),
        "eventDate": (datetime.today() + timedelta(days=random.randint(5, 45))).strftime("%Y-%m-%d") if product["category"] != "Sneaker" else "N/A"
    })

# Save to JSON file
with open("full_mock_reseller_data.json", "w") as f:
    json.dump(mock_data, f, indent=2)

print("✅ 100+ mock reseller listings saved to full_mock_reseller_data.json")
