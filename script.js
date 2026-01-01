// ========================================
// API CONFIGURATION
// ========================================
const API_KEY = '36b53e26a15249dc890207b03047317b'; // Replace with your OpenWeatherMap API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// News API Configuration
const NEWS_API_KEY = 'aa099081134d41c495c8a9c9b0f9438d'; // Get free key from https://newsapi.org
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

// Wikipedia API Configuration (No API key needed!)
const WIKI_API_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

// Currency API (No key required for this endpoint)
const CURRENCY_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// ========================================
// DOM ELEMENTS
// ========================================
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContainer = document.getElementById('weatherContainer');
const newsContainer = document.getElementById('newsContainer');
const wikiContainer = document.getElementById('wikiContainer');
const currencyContainer = document.getElementById('currencyContainer');
const contentGrid = document.getElementById('contentGrid');
const errorMessage = document.getElementById('errorMessage');
const loader = document.getElementById('loader');
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

// ========================================
// LANGUAGE TRANSLATIONS
// ========================================
const translations = {
    en: {
        title: 'Weather',
        subtitle: 'Real-time weather information',
        searchPlaceholder: 'Enter city name...',
        searchButton: 'Search',
        feelsLike: 'Feels Like',
        humidity: 'Humidity',
        windSpeed: 'Wind Speed',
        pressure: 'Pressure',
        sunrise: 'Sunrise',
        sunset: 'Sunset',
        hourlyForecast: 'Hourly Forecast',
        dailyForecast: '5-Day Forecast',
        localTime: 'Local Time',
        localNews: 'Local News',
        headlinesFrom: 'Headlines from',
        readMore: 'Read more on Wikipedia',
        errorTitle: 'Oops! Something went wrong',
        enterCityName: 'Please enter a city name',
        cityNotFound: 'City not found. Please check the spelling and try again.',
        invalidApiKey: 'API key is invalid. Please check your configuration.',
        networkError: 'Network error. Please check your internet connection.',
        unableToFetch: 'Unable to fetch weather data. Please try again later.',
        newsNotConfigured: 'News API key not configured',
        newsUnavailable: 'News service temporarily unavailable',
        noNews: 'No recent news available',
        unableToLoadNews: 'Unable to load news',
        wikiNotFound: 'City information not found on Wikipedia',
        unableToLoadWiki: 'Unable to load city information'
    },
    mn: {
        title: 'Цаг Агаар',
        subtitle: 'Бодит цагийн цаг агаарын мэдээлэл',
        searchPlaceholder: 'Хотын нэр бичнэ үү...',
        searchButton: 'Хайх',
        feelsLike: 'Мэдрэгдэх',
        humidity: 'Чийгшил',
        windSpeed: 'Салхины Хурд',
        pressure: 'Даралт',
        sunrise: 'Мандах',
        sunset: 'Жаргах',
        hourlyForecast: 'Цагийн Урьдчилсан Мэдээ',
        dailyForecast: '5 Хоногийн Урьдчилсан Мэдээ',
        localTime: 'Орон Нутгийн Цаг',
        localNews: 'Орон Нутгийн Мэдээ',
        headlinesFrom: 'Мэдээ эх үүсвэр',
        readMore: 'Википедиас дэлгэрэнгүй унших',
        errorTitle: 'Алдаа гарлаа!',
        enterCityName: 'Хотын нэр оруулна уу',
        cityNotFound: 'Хот олдсонгүй. Үсгийн алдаа шалгана уу.',
        invalidApiKey: 'API түлхүүр буруу байна. Тохиргоогоо шалгана уу.',
        networkError: 'Сүлжээний алдаа. Интернэт холболтоо шалгана уу.',
        unableToFetch: 'Цаг агаарын мэдээлэл татах боломжгүй. Дахин оролдоно уу.',
        newsNotConfigured: 'News API түлхүүр тохируулаагүй байна',
        newsUnavailable: 'Мэдээний үйлчилгээ түр ашиглах боломжгүй',
        noNews: 'Сүүлийн үеийн мэдээ олдсонгүй',
        unableToLoadNews: 'Мэдээ ачаалах боломжгүй',
        wikiNotFound: 'Википедиас хотын мэдээлэл олдсонгүй',
        unableToLoadWiki: 'Хотын мэдээлэл ачаалах боломжгүй'
    }
};


// ========================================
// THEME MANAGEMENT
// ========================================
// Load saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ========================================
// LANGUAGE MANAGEMENT
// ========================================
let currentLang = localStorage.getItem('lang') || 'en';
document.documentElement.setAttribute('data-lang', currentLang);

// Initial translation update
updateLanguage(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'mn' : 'en';
    document.documentElement.setAttribute('data-lang', currentLang);
    localStorage.setItem('lang', currentLang);
    updateLanguage(currentLang);

    // If data is currently displayed, re-render labels where possible
    // Note: To fully translate API data, we'd need to re-fetch with language params
    // For now, we update the UI labels around the data
    const weatherCard = document.querySelector('.weather-card');
    if (weatherCard) {
        // Simple re-search/refresh could be triggered here if desired
        // handleSearch(); // Optional: might use too many API calls
        updateDynamicLabels();
    }
});

function getTrans(key) {
    return translations[currentLang][key] || key;
}

function updateLanguage(lang) {
    // Update static text elements
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
        const key = element.getAttribute('data-lang-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

function updateDynamicLabels() {
    // Helper to update labels inside generated HTML
    const labels = {
        'Feels Like': 'feelsLike',
        'Humidity': 'humidity',
        'Wind Speed': 'windSpeed',
        'Pressure': 'pressure',
        'Мэдрэгдэх': 'feelsLike',
        'Чийгшил': 'humidity',
        'Салхины Хурд': 'windSpeed',
        'Даралт': 'pressure'
    };

    // This is a basic implementation to update visible labels in weather card
    const detailLabels = document.querySelectorAll('.detail-label');
    detailLabels.forEach(label => {
        const text = label.textContent;
        const key = labels[text];
        if (key) {
            label.textContent = getTrans(key);
        }
    });

    // Update News Header
    const newsTitle = document.querySelector('.news-title');
    if (newsTitle) {
        newsTitle.innerHTML = `📰 ${getTrans('localNews')}`;
    }

    const newsSubtitle = document.querySelector('.news-subtitle');
    if (newsSubtitle && newsSubtitle.textContent.includes('from')) {
        // Conserve the country name part if possible, or simple re-render
    }

    // Update Wiki Link
    const wikiLink = document.querySelector('.wiki-link');
    if (wikiLink) {
        wikiLink.textContent = getTrans('readMore');
    }
}

// ========================================
// EVENT LISTENERS
// ========================================
// Search button click
searchBtn.addEventListener('click', handleSearch);

// Enter key press in input field
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// ========================================
// MAIN SEARCH HANDLER
// ========================================
async function handleSearch() {
    const city = cityInput.value.trim();

    // Validate input
    if (!city) {
        showError('Please enter a city name', '⚠️');
        return;
    }

    // Clear previous results
    hideError();
    hideWeather();
    hideNews();
    hideWiki();
    showLoader();

    try {
        const weatherData = await fetchWeatherData(city);
        displayWeather(weatherData);
    } catch (error) {
        handleError(error);
    } finally {
        hideLoader();
    }
}

// ========================================
// API FETCH FUNCTION
// ========================================
async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (response.status === 401) {
                throw new Error('API key is invalid. Please check your configuration.');
            } else {
                throw new Error('Unable to fetch weather data. Please try again later.');
            }
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error.message.includes('fetch')) {
            throw new Error('Network error. Please check your internet connection.');
        }
        throw error;
    }
}

// ========================================
// DISPLAY WEATHER DATA
// ========================================
function displayWeather(data) {
    const {
        name,
        timezone,
        sys,
        main: { temp, feels_like, humidity, pressure },
        weather,
        wind: { speed }
    } = data;

    // Extract country for existing logic
    const country = sys.country;

    const weatherInfo = weather[0];
    const iconCode = weatherInfo.icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    // Apply gradient based on weather condition
    applyWeatherGradient(weatherInfo.main);

    // Build weather card HTML
    const weatherHTML = `
        <div class="weather-card">
            <div class="weather-icon-container">
                <img src="${iconUrl}" alt="${weatherInfo.description}" class="weather-icon" />
            </div>
            
            <h2 class="city-name">${name}, ${country}</h2>
            
            <div class="local-time">
                ${getTrans('localTime')}: ${formatLocalTime(timezone)}
            </div>
            
            <div class="temperature">${Math.round(temp)}°C</div>
            
            <p class="weather-description">${weatherInfo.description}</p>
            
            <div class="weather-details">
                <div class="weather-detail-item">
                    <div class="detail-label">${getTrans('feelsLike')}</div>
                    <div class="detail-value">${Math.round(feels_like)}°C</div>
                </div>
                
                <div class="weather-detail-item">
                    <div class="detail-label">${getTrans('humidity')}</div>
                    <div class="detail-value">${humidity}%</div>
                </div>
                
                <div class="weather-detail-item">
                    <div class="detail-label">${getTrans('windSpeed')}</div>
                    <div class="detail-value">${speed} m/s</div>
                </div>
                
                <div class="weather-detail-item">
                    <div class="detail-label">${getTrans('pressure')}</div>
                    <div class="detail-value">${pressure} hPa</div>
                </div>
            </div>

            <div class="weather-details-extended">
                <div class="weather-detail-item">
                    <div class="detail-label">${getTrans('sunrise')}</div>
                    <div class="detail-value">
                        ${new Date((sys.sunrise + timezone) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}
                    </div>
                </div>
                <div class="weather-detail-item">
                    <div class="detail-label">${getTrans('sunset')}</div>
                    <div class="detail-value">
                        ${new Date((sys.sunset + timezone) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })}
                    </div>
                </div>
            </div>
        </div>
    `;

    weatherContainer.innerHTML = weatherHTML;
    showWeather();

    // Fetch news for the country
    fetchNewsForCountry(country, name);

    // Fetch Wikipedia info for the city
    fetchWikipediaInfo(name);

    // Fetch Forecast (Hourly & Daily)
    fetchForecastData(name);
}

// ========================================
// APPLY GRADIENT BASED ON WEATHER
// ========================================
function applyWeatherGradient(weatherCondition) {
    const appTitle = document.querySelector('.app-title');
    const temperature = document.querySelector('.temperature');

    let gradient;

    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            gradient = 'var(--gradient-sunny)';
            break;
        case 'rain':
        case 'drizzle':
        case 'thunderstorm':
            gradient = 'var(--gradient-rainy)';
            break;
        case 'clouds':
            gradient = 'var(--gradient-cloudy)';
            break;
        default:
            gradient = 'var(--gradient-default)';
    }

    // Apply gradient to elements
    if (appTitle) {
        appTitle.style.background = gradient;
        appTitle.style.webkitBackgroundClip = 'text';
        appTitle.style.webkitTextFillColor = 'transparent';
        appTitle.style.backgroundClip = 'text';
    }
}

// ========================================
// ERROR HANDLING
// ========================================
function handleError(error) {
    console.error('Weather App Error:', error);
    showError(error.message, '❌');
}

function showError(message, icon = '⚠️') {
    const errorHTML = `
        <div class="error-card">
            <div class="error-icon">${icon}</div>
            <h3 class="error-title">Oops! Something went wrong</h3>
            <p class="error-text">${message}</p>
        </div>
    `;

    errorMessage.innerHTML = errorHTML;
    errorMessage.classList.add('show');
}

function hideError() {
    errorMessage.classList.remove('show');
    // Clear error content after animation
    setTimeout(() => {
        if (!errorMessage.classList.contains('show')) {
            errorMessage.innerHTML = '';
        }
    }, 300);
}

// ========================================
// UI STATE MANAGEMENT
// ========================================
function showWeather() {
    weatherContainer.classList.add('show');
}

function hideWeather() {
    weatherContainer.classList.remove('show');
}

function showLoader() {
    loader.classList.add('show');
}

function hideLoader() {
    loader.classList.remove('show');
}

// ========================================
// NEWS API FUNCTIONS
// ========================================
async function fetchNewsForCountry(countryCode, cityName) {
    try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

        const response = await fetch(
            `${NEWS_API_URL}?country=${countryCode.toLowerCase()}&pageSize=5&from=${today}&apiKey=${NEWS_API_KEY}`
        );

        if (!response.ok) {
            if (response.status === 401) {
                console.warn('News API key is invalid or missing');
                showNewsEmpty(countryCode, 'News API key not configured');
                return;
            } else if (response.status === 426) {
                console.warn('News API requires upgrade for this request');
                showNewsEmpty(countryCode, 'News service temporarily unavailable');
                return;
            }
            throw new Error('Unable to fetch news data');
        }

        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles, countryCode, cityName);
        } else {
            showNewsEmpty(countryCode, 'No recent news available');
        }
    } catch (error) {
        console.error('News API Error:', error);
        showNewsEmpty(countryCode, 'Unable to load news');
    }
}

function displayNews(articles, countryCode, cityName) {
    const newsHTML = `
        <div class="news-header">
            <div class="news-title">
               📰 ${getTrans('localNews')}
            </div>
            <div class="news-subtitle">${getTrans('headlinesFrom')} ${getCountryName(countryCode)}</div>
        </div>
        <div class="news-list">
            ${articles.slice(0, 5).map(article => `
                <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="news-item">
                    <div class="news-item-title">${article.title}</div>
                    <div class="news-item-source">${article.source.name || 'Unknown Source'}</div>
                </a>
            `).join('')}
        </div>
    `;

    newsContainer.innerHTML = newsHTML;
    showNews();

    // Enable two-column layout when both weather and news are shown
    contentGrid.classList.add('two-columns');
}

function showNewsEmpty(countryCode, message) {
    const newsHTML = `
        <div class="news-empty">
            <div class="news-empty-icon">📄</div>
            <div class="news-empty-text">${message}</div>
        </div>
    `;

    newsContainer.innerHTML = newsHTML;
    showNews();
    contentGrid.classList.add('two-columns');
}

function getCountryName(countryCode) {
    const countryNames = {
        'US': 'United States',
        'GB': 'United Kingdom',
        'MN': 'Mongolia',
        'JP': 'Japan',
        'CN': 'China',
        'KR': 'South Korea',
        'RU': 'Russia',
        'FR': 'France',
        'DE': 'Germany',
        'IT': 'Italy',
        'ES': 'Spain',
        'CA': 'Canada',
        'AU': 'Australia',
        'IN': 'India',
        'BR': 'Brazil',
        'MX': 'Mexico',
        'AR': 'Argentina',
        'TR': 'Turkey',
        'SA': 'Saudi Arabia',
        'AE': 'UAE',
        'SG': 'Singapore',
        'TH': 'Thailand',
        'VN': 'Vietnam',
        'PH': 'Philippines',
        'ID': 'Indonesia',
        'MY': 'Malaysia',
        'NZ': 'New Zealand',
        'ZA': 'South Africa',
        'EG': 'Egypt',
        'NG': 'Nigeria',
        'PL': 'Poland',
        'UA': 'Ukraine',
        'SE': 'Sweden',
        'NO': 'Norway',
        'FI': 'Finland',
        'DK': 'Denmark',
        'NL': 'Netherlands',
        'BE': 'Belgium',
        'CH': 'Switzerland',
        'AT': 'Austria',
        'PT': 'Portugal',
        'CZ': 'Czech Republic',
        'GR': 'Greece',
        'IE': 'Ireland',
        'HU': 'Hungary',
        'RO': 'Romania',
        'BG': 'Bulgaria',
        'HR': 'Croatia',
        'RS': 'Serbia',
        'SK': 'Slovakia',
        'IL': 'Israel',
        'PK': 'Pakistan',
        'BD': 'Bangladesh',
        'LK': 'Sri Lanka',
        'NP': 'Nepal',
        'KZ': 'Kazakhstan',
        'UZ': 'Uzbekistan',
        'CL': 'Chile',
        'PE': 'Peru',
        'CO': 'Colombia',
        'VE': 'Venezuela',
        'EC': 'Ecuador',
        'UY': 'Uruguay',
        'CR': 'Costa Rica',
        'PA': 'Panama'
    };

    return countryNames[countryCode] || countryCode;
}

function showNews() {
    newsContainer.classList.add('show');
}

function hideNews() {
    newsContainer.classList.remove('show');
}


// ========================================
// WIKIPEDIA API FUNCTIONS
// ========================================
async function fetchWikipediaInfo(cityName) {
    try {
        const response = await fetch(`${WIKI_API_URL}${encodeURIComponent(cityName)}`);

        if (!response.ok) {
            if (response.status === 404) {
                showWikiEmpty('City information not found on Wikipedia');
                return;
            }
            throw new Error('Unable to fetch Wikipedia data');
        }

        const data = await response.json();
        displayWiki(data);
    } catch (error) {
        console.error('Wikipedia API Error:', error);
        showWikiEmpty('Unable to load city information');
    }
}

function displayWiki(data) {
    const {
        title,
        extract,
        thumbnail,
        content_urls
    } = data;

    const imageHTML = thumbnail
        ? `<img src="${thumbnail.source}" alt="${title}" class="wiki-image" />`
        : `<div class="wiki-no-image">🏙️</div>`;

    const wikiHTML = `
        <div class="wiki-card">
            <div class="wiki-image-container">
                ${imageHTML}
            </div>
            <div class="wiki-content">
                <div class="wiki-header">
                    <div class="wiki-title">${title}</div>
                </div>
                <div class="wiki-description">
                    ${extract || 'No description available.'}
                </div>
                <a href="${content_urls.desktop.page}" target="_blank" rel="noopener noreferrer" class="wiki-link">
                    ${getTrans('readMore')}
                </a>
            </div>
        </div>
    `;

    wikiContainer.innerHTML = wikiHTML;
    showWiki();

    // Enable three-column layout
    contentGrid.classList.remove('two-columns');
    contentGrid.classList.add('three-columns');
}

function showWikiEmpty(message) {
    const wikiHTML = `
        <div class="wiki-empty">
            <div class="wiki-empty-icon">📚</div>
            <div class="wiki-empty-text">${message}</div>
        </div>
    `;

    wikiContainer.innerHTML = wikiHTML;
    showWiki();
    contentGrid.classList.remove('two-columns');
    contentGrid.classList.add('three-columns');
}

function showWiki() {
    wikiContainer.classList.add('show');
}

function hideWiki() {
    wikiContainer.classList.remove('show');
}

// ========================================
// FORECAST API FUNCTIONS
// ========================================
async function fetchForecastData(city) {
    try {
        const response = await fetch(
            `${FORECAST_API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        }
    } catch (error) {
        console.error('Forecast API Error:', error);
    }
}

function displayForecast(data) {
    const { list, city: { timezone } } = data;

    // Process Hourly Data (Next 24h - take first 8 items roughly, strictly speaking items are every 3 hours)
    // To smooth it out we just take the first 9 items (24h+).
    const hourlyData = list.slice(0, 9);

    // Process Daily Data (Pick 1 item per day, e.g., noon)
    // The API returns 5 days. We need to group by day.
    const dailyData = {};
    list.forEach(item => {
        const date = new Date((item.dt + timezone) * 1000).toISOString().split('T')[0];
        if (!dailyData[date]) {
            dailyData[date] = {
                min: item.main.temp_min,
                max: item.main.temp_max,
                icon: item.weather[0].icon,
                dt: item.dt,
                count: 0
            };
        } else {
            dailyData[date].min = Math.min(dailyData[date].min, item.main.temp_min);
            dailyData[date].max = Math.max(dailyData[date].max, item.main.temp_max);
            // Prefer day icon (d) over night icon (n) if available
            if (item.weather[0].icon.includes('d')) {
                dailyData[date].icon = item.weather[0].icon;
            }
        }
        dailyData[date].count++;
    });

    // Convert map to array and skip today if it's incomplete/already shown, or just show next 5 distinct days
    const dailyArray = Object.values(dailyData).slice(0, 5);

    // Inject extra HTML into weather container (keeping existing Current Weather)
    // We target a specific container or append. Since displayWeather rewrites innerHTML, 
    // we should modify displayWeather to accept this data, OR append this AFTER displayWeather runs.
    // The best approach is to have displayForecast update specific sections.
    // Let's create the HTML string and APPEND it.

    const weatherDetailsGrid = document.querySelector('.weather-details');
    if (!weatherDetailsGrid) return; // Safety check

    // 1. Hourly Forecast HTML
    const hourlyHTML = `
        <div class="weather-divider"></div>
        <h3 class="section-title">${getTrans('hourlyForecast')}</h3>
        <div class="hourly-container">
            ${hourlyData.map(item => {
        // Time calculations
        // item.dt is UTC unix timestamp. timezone is offset in seconds.
        // We want local time of the target city.
        // Use a trick: create date with UTC+Offset.
        const localDate = new Date((item.dt + timezone) * 1000);
        // Getting hours depends on browser, but we can extract UTC hours from the shifted date
        // However, standard JS Date handles local tz.
        // Reliable cross-timezone formatting:
        const hours = localDate.getUTCHours();
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHour = hours % 12 || 12; // 12-hour format
        const timeString = `${displayHour} ${period}`;

        return `
                <div class="hourly-item">
                    <div class="hourly-time">${timeString}</div>
                    <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" class="hourly-icon" alt="icon">
                    <div class="hourly-temp">${Math.round(item.main.temp)}°</div>
                </div>`;
    }).join('')}
        </div>
    `;

    // 2. Daily Forecast HTML
    const dailyHTML = `
        <div class="weather-divider"></div>
        <h3 class="section-title">${getTrans('dailyForecast')}</h3>
        <div class="daily-container">
            ${dailyArray.map(day => {
        // Get day name (Monday, Tuesday...)
        const date = new Date((day.dt + timezone) * 1000);
        // We need names in EN/MN. getTrans doesn't support generic days yet.
        // Using Intl.DateTimeFormat with locale.
        const locale = currentLang === 'mn' ? 'mn-MN' : 'en-US';
        const dayName = new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' }).format(date);

        return `
                <div class="daily-item">
                    <div class="daily-day">${dayName}</div>
                    <img src="https://openweathermap.org/img/wn/${day.icon}.png" class="daily-icon" alt="icon">
                    <div class="daily-temp">
                        <span>${Math.round(day.max)}°</span>
                        <span class="temp-min">${Math.round(day.min)}°</span>
                    </div>
                </div>`;
    }).join('')}
        </div>
    `;

    // Append to weather container
    // We place it inside a wrapper to avoid clearing it next time blindly? 
    // Ideally displayWeather clears everything. So displayForecast must be called AFTER displayWeather
    // and it appends.

    const wrapper = document.createElement('div');
    wrapper.innerHTML = hourlyHTML + dailyHTML;
    weatherContainer.appendChild(wrapper);
}

// Helper to format local time
function formatLocalTime(timezoneOffset) {
    // Current time in UTC+Offset
    const d = new Date();
    const localTime = d.getTime() + (d.getTimezoneOffset() * 60000) + (timezoneOffset * 1000);
    const localDate = new Date(localTime);

    const locale = currentLang === 'mn' ? 'mn-MN' : 'en-US';

    return new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(localDate);
}

// ========================================
// CURRENCY WIDGET FUNCTIONS
// ========================================
let currencyRates = {};

async function initCurrency() {
    if (!currencyContainer) return;

    // 1. Render Widget Structure
    currencyContainer.innerHTML = `
        <div class="currency-content">
            <h3 class="currency-header">Currency Converter</h3>
            
            <div class="converter-form">
                <div class="form-group">
                    <input type="number" id="amount" class="currency-input" value="1" min="0" placeholder="Amount">
                </div>
                
                <div class="form-group">
                    <select id="fromCurrency" class="currency-select"></select>
                    <span style="align-self:center; color:var(--text-secondary)">to</span>
                    <select id="toCurrency" class="currency-select"></select>
                </div>
                
                <div class="conversion-result" id="conversionResult">Loading...</div>
                <div class="rate-info" id="rateInfo"></div>
            </div>
        </div>
    `;

    // 2. Add Listeners
    const amountInput = document.getElementById('amount');
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');

    if (amountInput && fromSelect && toSelect) {
        amountInput.addEventListener('input', convertCurrency);
        fromSelect.addEventListener('change', convertCurrency);
        toSelect.addEventListener('change', convertCurrency);
    }

    // 3. Fetch Data
    await fetchCurrencyRates();
}

async function fetchCurrencyRates() {
    try {
        const response = await fetch(CURRENCY_API_URL);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();

        currencyRates = data.rates;
        populateCurrencySelects();
        convertCurrency();

    } catch (error) {
        console.error('Currency Error:', error);
        const resultEl = document.getElementById('conversionResult');
        if (resultEl) resultEl.textContent = 'Error loading rates';
    }
}

function populateCurrencySelects() {
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');
    if (!fromSelect || !toSelect) return;

    const currencies = Object.keys(currencyRates);
    const common = ['USD', 'EUR', 'MNT', 'CNY', 'RUB', 'KRW', 'JPY', 'GBP'];
    // Merge: Common first, then the rest sorted
    const otherCurrencies = currencies.filter(c => !common.includes(c)).sort();
    const sortedCurrencies = [...common, ...otherCurrencies];

    const optionsHTML = sortedCurrencies.map(curr => `<option value="${curr}">${curr}</option>`).join('');

    fromSelect.innerHTML = optionsHTML;
    toSelect.innerHTML = optionsHTML;

    // Defaults
    fromSelect.value = 'USD';
    toSelect.value = 'MNT';
}

function convertCurrency() {
    const amountEl = document.getElementById('amount');
    const fromEl = document.getElementById('fromCurrency');
    const toEl = document.getElementById('toCurrency');
    const resultEl = document.getElementById('conversionResult');
    const rateInfoEl = document.getElementById('rateInfo');

    if (!amountEl || !fromEl || !toEl || !currencyRates[fromEl.value]) return;

    const amount = parseFloat(amountEl.value);
    const from = fromEl.value;
    const to = toEl.value;

    if (isNaN(amount)) {
        resultEl.textContent = '---';
        return;
    }

    // Base is USD. Rate = To / From
    const rate = currencyRates[to] / currencyRates[from];
    const result = amount * rate;

    resultEl.textContent = `${result.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`;
    rateInfoEl.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
}

// Call Init
initCurrency();

// ========================================
// NAVIGATION LOGIC
// ========================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    if (!navLinks.length) return;

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.dataset.target; // 'home' or 'weather'

            // Update Nav State
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Update Section State
            sections.forEach(sec => {
                if (sec.id === `${target}-section`) {
                    sec.classList.remove('hidden');
                } else {
                    sec.classList.add('hidden');
                }
            });
        });
    });
}
initNavigation();


/* ========================================
   HOME WORKSPACE LOGIC (V2)
   ======================================== */

// 1. WORKSPACE TABS
function initWorkspaceNav() {
    const tabs = document.querySelectorAll('.ws-tab');
    const views = document.querySelectorAll('.workspace-view');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            tab.classList.add('active');
            const target = tab.dataset.tab;
            const view = document.getElementById(`view-${target}`);
            if (view) {
                view.classList.add('active');
            }
        });
    });
}
initWorkspaceNav();

// 2. DIAGRAM STUDIO
function initDiagram() {
    const canvas = document.getElementById('diagramCanvas');
    const clearBtn = document.getElementById('clearDiagram');
    if (!canvas) return;

    // Drag from Sidebar
    document.querySelectorAll('.tool-item').forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('type', item.dataset.type);
            e.dataTransfer.setData('source', 'toolbar');
        });
    });

    // Drop on Canvas
    canvas.addEventListener('dragover', (e) => { e.preventDefault(); });
    canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData('type');
        const source = e.dataTransfer.getData('source');

        if (source === 'toolbar' && type) {
            createNode(type, e.offsetX, e.offsetY);
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Clear canvas? All nodes will be lost.')) {
                canvas.innerHTML = '<div class="canvas-bg-grid"></div><p class="empty-hint">Build your architecture here...</p>';
            }
        });
    }

    let draggedNode = null;
    let offset = { x: 0, y: 0 };

    function createNode(type, x, y) {
        const node = document.createElement('div');
        node.className = 'canvas-node';
        node.dataset.type = type;

        // Remove empty hint if exists
        const hint = canvas.querySelector('.empty-hint');
        if (hint) hint.remove();

        // Content
        let label = 'Node';
        let icon = '📦';
        if (type === 'ui') { label = 'View'; icon = '🖥️'; }
        if (type === 'logic') { label = 'Controller'; icon = '⚙️'; }
        if (type === 'db') { label = 'Database'; icon = '💾'; }
        if (type === 'api') { label = 'API'; icon = '☁️'; }

        node.innerHTML = `<strong>${icon} ${label}</strong>`;
        node.style.left = (x - 50) + 'px'; // Center
        node.style.top = (y - 20) + 'px';

        // Move Logic
        node.addEventListener('mousedown', (e) => {
            draggedNode = node;
            // Calculate offset relative to node
            const rect = node.getBoundingClientRect();
            offset.x = e.clientX - rect.left;
            offset.y = e.clientY - rect.top;
            node.style.zIndex = 100;
        });

        canvas.appendChild(node);
    }

    document.addEventListener('mousemove', (e) => {
        if (!draggedNode) return;
        const rect = canvas.getBoundingClientRect();

        // Rel pos inside canvas
        let x = e.clientX - rect.left - offset.x;
        let y = e.clientY - rect.top - offset.y;

        // Boundary checks
        if (x < 0) x = 0;
        if (y < 0) y = 0;

        // Grid Snap (20px)
        x = Math.round(x / 20) * 20;
        y = Math.round(y / 20) * 20;

        draggedNode.style.left = x + 'px';
        draggedNode.style.top = y + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (draggedNode) draggedNode.style.zIndex = 10;
        draggedNode = null;
    });
}
initDiagram();

// 3. PROJECT PLANNER (KANBAN)
function initPlanner() {
    // Setup Native Drag Logic for Columns
    const lists = document.querySelectorAll('.task-list');
    lists.forEach(list => {
        list.addEventListener('dragover', allowDrop);
        list.addEventListener('drop', dropTask);
    });

    // Add buttons
    const addBtns = document.querySelectorAll('.add-task-btn');
    addBtns.forEach(btn => {
        btn.onclick = () => {
            // Using dataset from creating button
            // If onclick is set via HTML (bad practice generally), remove inline onclick in HTML
            // But here we set via JS.
        };
        // Re-attach cleaner listener
        btn.addEventListener('click', (e) => {
            const status = btn.dataset.status; // todo, progress, done
            if (status) addTask(status);
        });
    });
}

function allowDrop(e) { e.preventDefault(); }

let draggedTask = null;

function dragTaskStart(e) {
    draggedTask = e.target;
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => e.target.style.opacity = '0.5', 0);
}

function dragTaskEnd(e) {
    e.target.style.opacity = '1';
    draggedTask = null;
}

function dropTask(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const task = document.getElementById(id);
    // Find closest task list
    let target = e.target;
    // Walk up to find .task-list
    while (target && !target.classList.contains('task-list')) {
        target = target.parentElement;
        if (target && target.classList.contains('kanban-board')) return; // Missed
    }

    if (target && task) {
        target.appendChild(task);
    }
}

function addTask(status) {
    const text = prompt("Enter task:", "New Feature");
    if (!text) return;

    const task = document.createElement('div');
    task.className = 'task-card';
    task.id = 'task-' + Date.now();
    task.draggable = true;
    task.textContent = text;

    const del = document.createElement('span');
    del.className = 'task-delete';
    del.innerHTML = '×';
    del.onclick = (e) => {
        e.stopPropagation();
        if (confirm('Delete task?')) task.remove();
    };
    task.appendChild(del);

    task.addEventListener('dragstart', dragTaskStart);
    task.addEventListener('dragend', dragTaskEnd);

    const list = document.getElementById(`list-${status}`);
    if (list) list.appendChild(task);
}

// Global scope for HTML access if needed (though event listeners handle it)
window.addTask = addTask;
window.dropTask = dropTask;
window.allowDrop = allowDrop;

initPlanner();

// ========================================
// INITIALIZATION
// ========================================
// Auto-focus on search input
// ========================================
// PROJECT PLANNER ENHANCED (V3)
// ========================================
function initPlannerEnhanced() {
    // 1. Drag Logic
    const lists = document.querySelectorAll('.task-list');
    lists.forEach(list => {
        list.removeEventListener('dragover', window.allowDrop); // Try remove old

        list.addEventListener('dragover', allowDrop);
        list.addEventListener('drop', dropTaskEnhanced);
    });

    // 2. Add Task Buttons (Open Modal)
    const addBtns = document.querySelectorAll('.add-task-btn');
    addBtns.forEach(btn => {
        // Clone to wipe old listeners (crucial step)
        const newBtn = btn.cloneNode(true);
        if (btn.parentNode) btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', (e) => {
            const status = newBtn.dataset.status;
            openTaskModal(status);
        });
    });

    // 3. Modal Listeners
    const modal = document.getElementById('taskModal');
    const cancelBtn = document.getElementById('cancelTaskBtn');
    const saveBtn = document.getElementById('saveTaskBtn');

    if (cancelBtn) cancelBtn.onclick = closeTaskModal;
    if (saveBtn) saveBtn.onclick = saveTaskFromModal;

    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) closeTaskModal();
        }
    }
}

// Global state for modal
let currentTaskStatus = 'todo';

function openTaskModal(status) {
    currentTaskStatus = status || 'todo';
    const modal = document.getElementById('taskModal');
    const nameInput = document.getElementById('taskInputName');
    const dateInput = document.getElementById('taskInputDate');

    if (nameInput) nameInput.value = '';
    if (dateInput) dateInput.value = '';

    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
        if (nameInput) nameInput.focus();
    }
}

function closeTaskModal() {
    const modal = document.getElementById('taskModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.classList.add('hidden'), 200);
    }
}

function saveTaskFromModal() {
    const nameInput = document.getElementById('taskInputName');
    const dateInput = document.getElementById('taskInputDate');

    const text = nameInput.value.trim();
    const date = dateInput.value;

    if (!text) {
        alert('Please enter a task name');
        return;
    }

    createTaskCard(text, date, currentTaskStatus);
    closeTaskModal();
}

function createTaskCard(text, date, status) {
    const task = document.createElement('div');
    task.className = 'task-card';
    task.id = 'task-' + Date.now();
    task.draggable = true;

    // Date HTML
    let dateDisplay = '';
    if (date) {
        dateDisplay = `<div class="task-date">📅 ${date}</div>`;
    }

    task.innerHTML = `
        <div class="task-header">
            <input type="checkbox" class="task-checkbox">
            <span class="task-title">${text}</span>
        </div>
        <div class="task-meta">
            ${dateDisplay}
            <button class="task-delete-btn" title="Delete Task">🗑️</button>
        </div>
    `;

    // Drag Events
    task.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', task.id);
        setTimeout(() => task.style.opacity = '0.5', 0);
    });
    task.addEventListener('dragend', (e) => {
        task.style.opacity = '1';
    });

    // Checkbox Logic
    const checkbox = task.querySelector('.task-checkbox');
    const title = task.querySelector('.task-title');
    checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            title.classList.add('completed');
            // Optional: Auto-move to Done?
            if (status !== 'done') {
                // blink effect maybe?
            }
        } else {
            title.classList.remove('completed');
        }
    });

    // Delete Logic
    const delBtn = task.querySelector('.task-delete-btn');
    delBtn.addEventListener('click', (e) => {
        if (confirm('Delete this task?')) {
            task.style.opacity = '0';
            setTimeout(() => task.remove(), 200);
        }
    });

    const list = document.getElementById(`list-${status}`);
    if (list) list.appendChild(task);
}

function dropTaskEnhanced(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const task = document.getElementById(id);
    let target = e.target;
    while (target && !target.classList.contains('task-list')) {
        target = target.parentElement;
        if (target && target.classList.contains('kanban-board')) return;
    }

    if (target && task) {
        target.appendChild(task);
    }
}

// Run Enhanced Init
initPlannerEnhanced();

// Optional: Load a default city on page load (Mongolian capital - Ulaanbaatar / Монгол улсын нийслэл - Улаанбаатар)
// Uncomment the following lines if you want to load default weather:
/*
window.addEventListener('load', () => {
    cityInput.value = 'Ulaanbaatar';
    handleSearch();
});
*/
