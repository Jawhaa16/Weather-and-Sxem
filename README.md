# 🌤️ Modern Weather App

A beautiful, minimal weather application built with vanilla HTML, CSS, and JavaScript. Features real-time weather data from OpenWeatherMap API with dark/light mode toggle and smooth animations.

## ✨ Features

- 🔍 **City Search** - Search for any city worldwide
- 🌡️ **Real-time Data** - Current temperature, weather conditions, humidity, wind speed, and pressure
- 🌓 **Dark/Light Mode** - Toggle between themes with persistent preference
- 🎨 **Dynamic Gradients** - UI adapts colors based on weather conditions
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Smooth Animations** - Polished micro-interactions and transitions
- 🎯 **Auto-focus** - Search input automatically focused for quick access
- ♿ **Accessible** - Keyboard navigation and screen reader friendly

## 🚀 Quick Start

### 1. Get Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to "API keys" section
4. Copy your API key

### 2. Configure the App

Open `script.js` and replace the API key on line 5:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
```

### 3. Run the App

Simply open `index.html` in your web browser:

- **Option 1**: Double-click the `index.html` file
- **Option 2**: Right-click → "Open with" → Choose your browser
- **Option 3**: Use a local development server (recommended):

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using VS Code Live Server extension
# Right-click on index.html → "Open with Live Server"
```

Then navigate to `http://localhost:8000` (or the port shown).

## 📁 Project Structure

```
weather-app/
│
├── index.html          # Main HTML structure
├── style.css           # Complete styling with design system
├── script.js           # Application logic and API integration
└── README.md           # This file
```

## 🎨 Design Features

### Apple-like Aesthetic
- Clean, minimal interface
- Smooth transitions and animations
- Modern typography (Inter font family)
- Carefully crafted spacing and shadows

### Color System
- Dynamic gradients based on weather conditions
- Carefully selected color palettes for both themes
- High contrast for accessibility

### Responsive Design
- Mobile-first approach
- Breakpoints at 600px and 400px
- Adaptive layout and typography

## 🌐 API Integration

Using OpenWeatherMap Current Weather Data API:
- Endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Units: Metric (Celsius)
- Returns: Temperature, weather description, humidity, wind speed, pressure, and weather icons

## 🛠️ Error Handling

The app handles various error scenarios:
- Invalid city names
- Network connectivity issues
- Invalid API key
- Empty search input
- Server errors

## 🌍 Language Support

- **UI**: English
- **Code Comments**: English
- Can be easily translated to any language by modifying HTML text and JavaScript strings

## 🔧 Customization

### Change Default City
Uncomment lines 240-244 in `script.js` to load a default city on startup:

```javascript
window.addEventListener('load', () => {
    cityInput.value = 'Ulaanbaatar'; // Change to your preferred city
    handleSearch();
});
```

### Modify Color Scheme
Edit CSS custom properties in `style.css` (starting at line 5):

```css
:root {
    --accent-color: #007aff; /* Change accent color */
    --gradient-sunny: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Customize other gradients and colors */
}
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📝 Notes

- API key must be valid for the app to work
- Free tier allows 60 calls/minute, 1,000,000 calls/month
- Weather data updates in real-time with each search
- Theme preference is saved in browser localStorage

## 🔒 Privacy

- No user data is collected or stored
- Only city search queries are sent to OpenWeatherMap API
- Theme preference stored locally in browser

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

## 📄 License

This project is open source and available for personal and commercial use.

---

**Enjoy tracking the weather! ☀️🌧️⛈️❄️**
