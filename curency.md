You are a professional JavaScript developer.

I have an existing web dashboard-style web app.
Do NOT modify or depend on any other modules (weather, news, wikipedia, etc).

Task:
Create a standalone Currency Exchange widget.

Features:
1. Display real-time exchange rates.
2. Show:
   - Base currency
   - Target currency
   - Exchange rate
   - Last updated time
3. Include a simple currency converter:
   - Amount input
   - From currency
   - To currency
   - Converted result updates on input change

API:
- Use ExchangeRate.host API (no API key required)
  Example:
  https://api.exchangerate.host/latest?base=USD

Technical requirements:
- Vanilla JavaScript only
- Use fetch()
- Modular, clean functions
- Error handling (network error, API unavailable)
- No external libraries

UI requirements:
- Card-style widget
- Minimal, modern design
- Converter and rate list in the same card
- Responsive layout

Output:
- JavaScript code only (currency logic)
- Small HTML snippet for the currency widget
- Short explanation of how the API is used

Important:
- This module must be completely independent
- Do not reference weather, news, or wikipedia logic
- Code should be portfolio-ready
