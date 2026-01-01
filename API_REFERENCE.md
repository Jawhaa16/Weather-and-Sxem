# 📡 API Ecosystem of Your App

Одоогоор таны апп дараах API-уудыг ашиглаж байна. Нэмэлт бүртгэл шаардлагагүй.

## 1. OpenWeatherMap (Ecosystem)
Таны нэг түлхүүр (`36b53e...`) дараах бүх үйлчилгээнд ажиллана:

### A. Current Weather Data ✅ (Ашиглагдаж байгаа)
- **URL**: `api.openweathermap.org/data/2.5/weather`
- **Үүрэг**: Одоогийн температур, салхи, чийг, үзэгдэх орчин.

### B. 5 Day / 3 Hour Forecast ✅ (Ашиглагдаж байгаа)
- **URL**: `api.openweathermap.org/data/2.5/forecast`
- **Үүрэг**: Ирэх 5 хоногийн цаг агаар, 3 цаг тутмын өөрчлөлт.

### C. Air Pollution (Optional / Сонголтоор) ⏳
- **URL**: `api.openweathermap.org/data/2.5/air_pollution`
- **Үүрэг**: AQI (Агаарын чанарын индекс), PM2.5, PM10, SO2, NO2.
- **Хэрэгтэй юу?**: Улаанбаатар зэрэг хотуудад маш хэрэгтэй мэдээлэл.

---

## 2. NewsAPI ✅ (Ашиглагдаж байгаа)
- **URL**: `newsapi.org/v2/top-headlines`
- **Үүрэг**: Тухайн улсын топ мэдээг татах.
- **Анхаар**: Free tier нь зөвхөн хөгжүүлэлтэд зориулагдсан (production дээр удаан байж магадгүй).

---

## 3. Wikipedia API ✅ (Ашиглагдаж байгаа)
- **URL**: `en.wikipedia.org/api/rest_v1/page/summary/`
- **Үүрэг**: Хотын түүх, зураг.
- **Лайк**: Үнэгүй, бүртгэлгүй.

---

## 💡 Зөвлөмж

Хэрвээ та аппаа улам сайжруулъя гэвэл **Air Quality (AQI)** нэмэхийг санал болгож байна.
Код нь `weather` болон `forecast` шиг амархан:

```javascript
// Жишээ URL
const AQI_URL = 'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}';
```

Хэрэв хүсвэл "AQI нэмээд өг" гэж бичээрэй! 😉
