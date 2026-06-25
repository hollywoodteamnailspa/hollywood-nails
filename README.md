# Hollywood Nails — Appointment Scheduler

A beautiful, mobile-friendly scheduling dashboard built for Hollywood Nails salon.

## Features

- 📅 Monthly calendar with appointment counts per day
- ⏰ Time slots from 9:00 AM to 6:00 PM in 30-minute intervals
- 👤 Optional customer name field
- 💅 All services pre-loaded (Full Set, Refill, Pedicures, etc.)
- 👩 Tech name quick-select (Henry, Katie, Lily, Lisa, Ti, Vic) + custom
- 📞 (504) and (985) prefix quick-select + custom area code entry
- 💾 Auto-saves to browser localStorage — data persists between visits
- 📱 Fully responsive for iPad and mobile

---

## Setup Instructions

### 1. Prerequisites

Install the following (free):
- [Node.js](https://nodejs.org/) — version 18 or higher
- [VS Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)
- A free [GitHub](https://github.com) account
- A free [Vercel](https://vercel.com) account

---

### 2. Open in VS Code

1. Open VS Code
2. Open a terminal: **Terminal → New Terminal**
3. Navigate to where you want the project:
   ```
   cd ~/Documents
   ```
4. Copy the `hollywood-nails` folder here, then:
   ```
   cd hollywood-nails
   code .
   ```

---

### 3. Install and run locally

In VS Code's terminal:

```bash
npm install
npm start
```

This opens the app at **http://localhost:3000** in your browser.
It works on any device on the same Wi-Fi — just visit your computer's local IP on port 3000 from your iPad.

---

### 4. Push to GitHub

1. Go to [github.com](https://github.com) → **New repository**
2. Name it `hollywood-nails` → **Create repository**
3. In VS Code terminal:

```bash
git init
git add .
git commit -m "Initial commit — Hollywood Nails scheduler"
git remote add origin https://github.com/YOUR_USERNAME/hollywood-nails.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### 5. Deploy to Vercel (free hosting)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Select your `hollywood-nails` repository
4. Vercel auto-detects Create React App — click **Deploy**
5. In ~1 minute, your app is live at a URL like:
   `https://hollywood-nails.vercel.app`

**Any time you push to GitHub, Vercel automatically redeploys.**

---

### 6. Use on iPad / Mobile

Once deployed to Vercel:
- Open Safari on your iPad
- Go to your Vercel URL
- Tap the **Share** button → **Add to Home Screen**
- It becomes a full-screen app icon on your iPad!

---

## Data Storage

Appointments are saved in **localStorage** in the browser. This means:
- ✅ Data persists between sessions on the same device/browser
- ⚠️ Data does NOT sync between devices (iPad vs phone vs computer)

If you need multi-device sync in the future, we can add a free database (like Supabase or Firebase) to this project.

---

## Customizing Services or Techs

Edit `src/constants.js`:

```js
export const SERVICES = [
  'Full Set',
  // add or remove services here
];

export const TECHS = [
  'Henry', 'Katie', 'Lily', 'Lisa', 'Ti', 'Vic',
  // add names here
];
```

Save the file → Vercel redeploys automatically after you push to GitHub.

---

## Tech Stack

- **React 18** — UI framework
- **Create React App** — build tooling
- **localStorage** — data persistence
- **Vercel** — free hosting with auto-deploy
- **Google Fonts** — Cormorant Garamond + DM Sans
