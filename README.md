# DealFinder AI 🎤

A Next.js app that helps users find the best ticket deals from multiple resellers.  
It fetches top deals, emails them to the user, and logs them to a Google Sheet.

---

## Features

- Fetch top 3 ticket deals by product name (case-insensitive search)  
- Send an email with top deals using Gmail SMTP  
- Log top deals to Google Sheets via Google Sheets API  
- Stylish UI with React and Tailwind CSS  
- Integrates OmniDimension widget for voice-based deal searching  

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)  
- Google Cloud project with Sheets API enabled  
- Gmail account with App Password for SMTP  
- Next.js 13+ project (app router)

---

### Installation

1. Clone the repo:


git clone https://github.com/riffhi/Vibe-a-thon.git
cd Vibe-a-thon
Install dependencies:



2. Install dependencies:


npm install
# or
yarn install

3. Add environment variables:
Create a .env.local file in the root:

GMAIL_USER=your.email@gmail.com
GMAIL_PASS=your-app-password
USER_EMAIL=recipient.email@example.com
GOOGLE_CREDENTIALS=./path-to-your-google-service-account.json
SHEET_ID=your-google-sheet-id

Running the App
npm run dev
# or
yarn dev

