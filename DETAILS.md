# 🌧️ Enhanced Weather Features

Your weather app now includes professional-grade forecast data!

## 🌟 New Features Added

### 1. 🕒 Local Time Display
- Shows the **actual local time** of the searched city.
- Automatically adjusts based on the city's timezone.
- Format: `Local Time: 2:30 PM` (12-hour format).

### 2. 🕰️ Hourly Forecast (Next 24 Hours)
- **Horizontally Scrollable**: Swipe left/right to see upcoming hours.
- Shows:
  - Time (e.g., 3 PM, 6 PM)
  - Weather Icon
  - Temperature

### 3. 📅 5-Day Daily Forecast
- List view of the next 5 days.
- Shows:
  - Day Name (Monday, Tuesday...)
  - Weather Icon
  - High / Low Temperatures

### 4. 🌅 Extended Details
- **Sunrise**: Exact time sun rises in that city.
- **Sunset**: Exact time sun sets.
- **Atmospheric Pressure**: In hPa units.

---

## 🛠️ Translation Ready

All new features are integrated with the **EN / MN** language switcher.
- "Sunrise" ↔ "Мандах"
- "Daily Forecast" ↔ "5 Хоногийн Урьдчилсан Мэдээ"
- "Monday" ↔ "Даваа" (Automatically formatted via Intl API)

## 📡 API Usage

We now use 2 endpoints from OpenWeatherMap:
1. `current`: For main display & details.
2. `forecast`: For hourly & daily lists (5 day / 3 hour API).

**Enjoy exploring the weather!** 🌍
