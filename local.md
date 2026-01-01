You are a professional JavaScript developer.

I have an existing web project.
Do NOT modify or depend on any other features (weather, news, etc).

Task:
Implement a standalone Wikipedia integration for city information.

Requirements:
1. When a city name is provided as a string input:
   - Fetch data from Wikipedia REST API.
2. Use this endpoint:
   https://en.wikipedia.org/api/rest_v1/page/summary/{CITY_NAME}

3. Display the following information:
   - City title
   - Short description (summary extract)
   - City image (thumbnail if available)
   - Link to the full Wikipedia page

4. Handle edge cases:
   - City not found
   - No image available
   - Network errors

Technical rules:
- Vanilla JavaScript only
- Use fetch()
- Clean, modular functions
- No external libraries
- No CSS frameworks

UI requirements:
- Simple card-style layout
- Image on top, text below
- Minimal, modern design

Output format:
- JavaScript code only (functions)
- Small HTML snippet for the Wikipedia section
- Short explanation of how the Wikipedia API works

Important:
- This feature must be completely independent
- Do not reference weather or news logic
