import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [advice, setAdvice] = useState('') // Stan dla porady AI
  const [error, setError] = useState(null)

  const API_KEY = 'f42275447b24070df01cbb9c99ce9661' 

  // --- Funkcja "AI Prediction" ---

  const generateAIAdvice = (temp, weatherId, windSpeed) => {
    let message = "";

    // Analiza temperatury
    if (temp < 0) {
      message += "Jest mroźno! Ubierz grubą kurtkę, czapkę i rękawiczki. ";
    } else if (temp < 10) {
      message += "Jest chłodno. Płaszcz lub ciepła kurtka to podstawa. ";
    } else if (temp < 20) {
      message += "Przyjemna temperatura. Bluza lub lekka kurtka wystarczy. ";
    } else {
      message += "Jest ciepło! Krótki rękaw będzie idealny. Pamiętaj o wodzie. ";
    }

    // Analiza warunków (Kody pogodowe OpenWeatherMap)
    // 2xx - burza, 3xx/5xx - deszcz, 6xx - śnieg
    if (weatherId >= 200 && weatherId < 600) {
      message += " ☔ Weź parasol, zapowiada się mokro!";
    } else if (weatherId >= 600 && weatherId < 700) {
      message += " ❄️ Uwaga na śliskie drogi!";
    } else if (weatherId === 800) {
      message += " ☀️ Idealna pogoda na spacer!";
    }

    // Analiza wiatru
    if (windSpeed > 10) {
      message += " 💨 Bardzo wieje! Odczuwalna temperatura może być niższa.";
    }

    setAdvice(message);
  }

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Nie znaleziono miasta')
      }

      const data = await response.json()
      
      // Zapisujemy dane pogodowe
      setWeather(data)
      
      // Generujemy poradę AI na podstawie pobranych danych
      generateAIAdvice(data.main.temp, data.weather[0].id, data.wind.speed)
      
      setError(null)
    } catch (err) {
      setError('Nie znaleziono miasta. Spróbuj wpisać poprawną nazwę.')
      setWeather(null)
      setAdvice('')
    }
  }

  return (
    <div className="app-container">
      <div className="weather-card">
        <h1>🌤️ Sprawdź Pogodę</h1>
        
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Wpisz miasto (np. Kraków)..." 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
          />
          <button onClick={fetchWeather}>Szukaj</button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            
            <div className="temp-box">
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt="ikona pogody" 
              />
              <p className="temp">{Math.round(weather.main.temp)}°C</p>
            </div>
            
            <p className="description">{weather.weather[0].description}</p>

            {/* --- SEKCJA AI --- */}
            <div className="ai-assistant">
              <h3>🤖 AI Asystent radzi:</h3>
              <p>{advice}</p>
            </div>
            {/* ---------------- */}

            <div className="details">
              <p>💧 {weather.main.humidity}%</p>
              <p>💨 {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App