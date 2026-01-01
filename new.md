You are a senior JavaScript engineer.

I already have a working weather web app using OpenWeatherMap API.
Now I want to EXTEND the project with this feature:

Feature:
When the user searches for a city:
1. Detect the country code of the city from the Weather API response.
2. Use that country code to fetch TODAY's top news from a News API.
3. Display local news next to the weather section.

Technical requirements:
- Use OpenWeatherMap API to get:
  - city name
  - temperature
  - weather description
  - country code (e.g. MN, US, JP)
- Use NewsAPI or GNews API to fetch news based on the country code.
- Fetch only today's top headlines.
- Limit to 5 news articles.
- Each article should include:
  - title
  - source name
  - link (opens in new tab)

Implementation rules:
- Vanilla JavaScript only (no frameworks)
- Use fetch()
- Clean, readable code
- Proper error handling (invalid city, no news available)
- Do NOT rewrite the existing weather code unless necessary
- Just add the logic needed to connect weather → local news

UI:
- Weather on the left
- Local news on the right
- Minimal, clean, modern layout

Output:
- JavaScript code (functions only)
- Small HTML snippet for the news section
- Short explanation of how the country-based news logic works

Do not include setup instructions unless needed.
