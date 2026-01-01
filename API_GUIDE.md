# 🌍 Weather + News + Wikipedia App - Бүрэн Заавар

## ✨ Таны App Одоо Юу Хийх Вэ?

Та хотын нэр хайхад **3 төрлийн мэдээлэл** татна:

1. ☀️ **Цаг Агаар** (Weather API) - Температур, салхи, чийг
2. 📰 **Тухайн Улсын Мэдээ** (News API) - Өнөөдрийн топ 5 мэдээ
3. 📖 **Хотын Түүх/Мэдээлэл** (Wikipedia API) - Зураг, түүх, баримт

---

## 🔑 API Түлхүүрүүд

### 1. ✅ OpenWeatherMap API (Идэвхтэй)
- **Status**: Ажиллаж байна
- **Key**: `36b53e26a15249dc890207b03047317b`
- **Юу өгөх вэ?**: Цаг агаар + улс орны код (MN, US, GB)

### 2. ✅ NewsAPI (Идэвхтэй)  
- **Status**: Та API key оруулчихсан байна!
- **Key**: `aa099081134d41c495c8a9c9b0f9438d`
- **Юу өгөх вэ?**: Тухайн улсын өнөөдрийн топ 5 мэдээ
- **Хязгаар**: Өдөрт 100 хүсэлт (Free tier)

### 3. ✅ Wikipedia API (Түлхүүр шаардлагагүй!)
- **Status**: Ажиллахад бэлэн! API key шаарддаггүй
- **URL**: `https://en.wikipedia.org/api/rest_v1/page/summary/`
- **Юу өгөх вэ?**: Хотын нэр, зураг, богино тайлбар, линк
- **Давуу тал**: 100% үнэгүй, хязгааргүй!

---

## 🚀 Хэрхэн Ажиллах Вэ?

### Алхам 1: Хотын нэр хайх
```
Жишээ: "Ulaanbaatar" гэж бичнэ үү
```

### Алхам 2: API-үүд автоматаар ажиллана
```javascript
1. Weather API → Улаанбаатар, MN улс, 15°C
2. News API → MN улсын өнөөдрийн мэдээнүүд авна
3. Wikipedia API → "Улаанбаатар" хотын мэдээлэл авна
```

### Алхам 3: 3 хэсэг харагдана
```
┌─────────────┬─────────────┬─────────────┐
│  ☀️ WEATHER │  📰 NEWS    │  📖 WIKI    │
│             │             │             │
│ Температур  │ 5 мэдээ     │ Зураг       │
│ Салхи       │ Линк        │ Түүх        │
│ Чийг        │             │ Линк        │
└─────────────┴─────────────┴─────────────┘
```

---

## 🎯 API Дуудлагын Урсгал

```
USER хайлт: "Tokyo"
    ↓
[Weather API]
    ↓
Result: Tokyo, JP улс, 12°C
    ↓
[News API] ← JP улс
    ↓
Result: Japan-ы өнөөдрийн 5 мэдээ
    ↓
[Wikipedia API] ← "Tokyo"
    ↓
Result: Tokyo хотын түүх + зураг
    ↓
Display: 3 талбар зэрэгц харуулна
```

---

## 📱 Дэлгэцийн Харагдац

### Desktop (Өргөн дэлгэц):
```
┌────────────────────────────────────────────────┐
│              ☁️ Weather App                    │
│          Real-time weather information         │
│   [🔍 Enter city name...  ] [Search]  🌙      │
├────────────────────────────────────────────────┤
│                                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ ☀️ WEATHER│  │ 📰 NEWS  │  │ 📖 WIKI  │    │
│  │          │  │          │  │ [Image]  │    │
│  │ Tokyo,JP │  │ 5 мэдээ  │  │ History  │    │
│  │ 12°C     │  │ Links    │  │ Link     │    │
│  └──────────┘  └──────────┘  └──────────┘    │
└────────────────────────────────────────────────┘
```

### Mobile (Нарийн дэлгэц):
```
┌──────────────┐
│ ☁️ Weather   │
│ [🔍 Search]  │
├──────────────┤
│  ☀️ WEATHER  │
│  Tokyo, JP   │
│  12°C        │
├──────────────┤
│  📰 NEWS     │
│  Top 5 items │
├──────────────┤
│  📖 WIKI     │
│  [Image]     │
│  Info        │
└──────────────┘
(3 хэсэг доошоо stack хийгдэнэ)
```

---

## 🌐 API Endpoint-үүд

### Weather API
```
GET https://api.openweathermap.org/data/2.5/weather
    ?q={city}
    &appid={API_KEY}
    &units=metric

Response Example:
{
  "name": "Ulaanbaatar",
  "sys": { "country": "MN" },
  "main": { "temp": 15 },
  "weather": [{ "description": "clear sky" }]
}
```

### News API
```
GET https://newsapi.org/v2/top-headlines
    ?country={MN}
    &pageSize=5
    &from={today}
    &apiKey={API_KEY}

Response Example:
{
  "articles": [
    {
      "title": "Breaking news...",
      "source": { "name": "BBC" },
      "url": "https://..."
    }
  ]
}
```

### Wikipedia API
```
GET https://en.wikipedia.org/api/rest_v1/page/summary/{city}

Response Example:
{
  "title": "Ulaanbaatar",
  "extract": "Capital city of Mongolia...",
  "thumbnail": {
    "source": "https://..."
  },
  "content_urls": {
    "desktop": {
      "page": "https://en.wikipedia.org/wiki/Ulaanbaatar"
    }
  }
}
```

---

## ⚡ Шууд Ажиллуулах

1. **Хөтөч нээх**:
   ```
   index.html-г double click хий
   ```

2. **Live Server (VS Code)**:
   ```
   Right-click index.html → Open with Live Server
   ```

3. **Python Server**:
   ```bash
   cd "C:\Users\VORTEX\Desktop\sonirhol\weather app"
   python -m http.server 8000
   # Дараа нь http://localhost:8000
   ```

---

## 🧪 Турших Хотын Нэрс

- **Ulaanbaatar** → Mongolia мэдээ + Монголын нийслэлийн түүх
- **Tokyo** → Japan мэдээ + Токиогийн мэдээлэл
- **London** → UK мэдээ + Лондонгийн түүх
- **New York** → USA мэдээ + Нью-Йоркийн мэдээлэл
- **Paris** → France мэдээ + Парисын түүх
- **Seoul** → South Korea мэдээ + Сөүлийн мэдээлэл

---

## 💡 Давуу Талууд

✅ **Wikipedia API**: API key шаардлагагүй!  
✅ **3-н нэг**: Цаг агаар + мэдээ + түүх  
✅ **Responsive**: Desktop болон Mobile дээр сайн харагдана  
✅ **Dark/Light mode**: Автомат theme toggle  
✅ **Хурдан**: Бүх API зэрэг татагдана  

---

## ⚠️ Анхаарах Зүйлс

1. **NewsAPI Free Tier**: Өдөрт 100 хүсэлт, үүнээс илүү хэрвээ хийвэл алдаа гарна
2. **Wikipedia**: Хот олдохгүй бол "Not found" гэж харуулна
3. **Weather Key**: 10-15 минут хүлээгээд идэвхжинэ (шинэ түлхүүр)

---

## 📂 Файлын Бүтэц

```
weather app/
├── index.html       # HTML бүтэц (Weather + News + Wiki containers)
├── style.css        # CSS design (Grid layout, 3 columns)
├── script.js        # JavaScript logic (3 API integrations)
├── do.md            # Weather app анхны заавар
├── new.md           # News integration заавар
├── local.md         # Wikipedia integration заавар
├── README.md        # Ерөнхий заавар
├── SETUP_NEWS.md    # News API setup
└── API_GUIDE.md     # ЭНЭ ФАЙЛ - Бүрэн заавар
```

---

## 🎨 Code Highlights

### JavaScript: 3 API зэрэг татах
```javascript
// displayWeather() дотор:
fetchNewsForCountry(country, name);     // News API
fetchWikipediaInfo(name);                // Wikipedia API
```

### CSS: 3 column grid
```css
.content-grid.three-columns {
    grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 600px) {
    .content-grid.three-columns {
        grid-template-columns: 1fr;  /* Stack vertically */
    }
}
```

---

## 🔥 Enjoy!

Та одоо **цаг агаар**, **мэдээ**, **түүх** гурвыг нэг дор харах боломжтой! 🎉

**Асуулт байвал**: README.md, SETUP_NEWS.md харна уу.

---

**Made with ❤️ for Weather + News + Wikipedia Integration**
