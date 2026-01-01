# 🔧 Setup Instructions

## Weather + News Integration Complete! ✅

Your weather app now displays **local news headlines** based on the country of the searched city.

---

## 🔑 API Keys Required

### 1. OpenWeatherMap API ✅ (Already configured)
- **Status**: Active
- **Key**: `36b53e26a15249dc890207b03047317b`

### 2. NewsAPI (Required for news feature) 
- **Get your FREE key**: [https://newsapi.org/register](https://newsapi.org/register)
- **Free tier**: 100 requests/day
- **Steps**:
  1. Visit https://newsapi.org/register
  2. Sign up with your email
  3. Verify your email
  4. Copy your API key
  5. Open `script.js` and replace:
     ```javascript
     const NEWS_API_KEY = 'YOUR_NEWS_API_KEY_HERE';
     ```
     with your actual key.

---

## 🎯 How It Works

1. **User searches for a city** (e.g., "Ulaanbaatar", "Tokyo", "London")
2. **Weather API returns**:
   - Temperature, weather conditions
   - **Country code** (e.g., MN, JP, GB)
3. **News API automatically fetches** today's top 5 headlines from that country
4. **Both sections display side-by-side** (stacks on mobile)

---

## 🌐 Supported News Countries

NewsAPI supports 50+ countries including:
- 🇲🇳 Mongolia (MN)
- 🇺🇸 United States (US)
- 🇬🇧 United Kingdom (GB)
- 🇯🇵 Japan (JP)
- 🇰🇷 South Korea (KR)
- 🇫🇷 France (FR), Germany (DE), Italy (IT), Spain (ES)
- 🇨🇦 Canada (CA), Australia (AU)
- And many more...

**Full list**: https://newsapi.org/docs/endpoints/top-headlines

---

## 📂 What Changed?

### HTML (`index.html`)
- Added `<div class="news-container">` next to weather container
- Wrapped both in `<div class="content-grid">` for side-by-side layout

### CSS (`style.css`)
- Added `.content-grid` with responsive two-column layout
- Added `.news-container`, `.news-item`, `.news-header` styles
- Responsive: stacks vertically on mobile (<600px)

### JavaScript (`script.js`)
- Added `NEWS_API_KEY` and `NEWS_API_URL` configuration
- Added `fetchNewsForCountry(countryCode)` function
- Added `displayNews(articles)` function
- Added country code to country name mapping
- Integrated news fetch into weather display flow

---

## 🚀 Quick Start

1. Get NewsAPI key from https://newsapi.org/register
2. Add it to `script.js` line 8
3. Open `index.html` in browser
4. Search for any city!

---

## 💡 Example Searches

Try these to see news from different countries:

- **Ulaanbaatar** → Mongolia 🇲🇳 news
- **New York** → USA 🇺🇸 news
- **London** → UK 🇬🇧 news
- **Tokyo** → Japan 🇯🇵 news
- **Paris** → France 🇫🇷 news
- **Sydney** → Australia 🇦🇺 news

---

## ⚠️ Notes

- **Free NewsAPI tier**: 100 requests/day, 1 request/second
- If no news available for a country, shows friendly empty state
- News links open in new tab
- Dark/Light mode works for both weather and news sections
- Today's headlines only (freshest news!)

---

**Enjoy your enhanced Weather + News app! 🌤️📰**
