# AI Weather App 

Aplikacja pogodowa, która nie tylko wyświetla temperaturę, ale również analizuje warunki atmosferyczne i generuje inteligentne porady dla użytkownika (AI Assistant).

O Projekcie:

Celem projektu było stworzenie narzędzia, które pobiera dane w czasie rzeczywistym z zewnętrznego serwera i przetwarza je na użyteczne informacje. Aplikacja rozwiązuje problem interpretacji surowych danych pogodowych, oferując gotowe sugestie (np. jak się ubrać).

Kluczowe funkcjonalności:
Real-time Data: Pobieranie aktualnej pogody dla dowolnego miasta na świecie (OpenWeatherMap API).
AI Smart Advice: Autorski algorytm (Rule-based AI), który analizuje temperaturę, opady i wiatr, aby doradzić użytkownikowi odpowiedni ubiór i ostrzec przed trudnymi warunkami.
Error Handling: Obsługa błędów (np. literówki w nazwie miasta) z komunikatem dla użytkownika.


Technologie:

Frontend: React.js + Vite
API: OpenWeatherMap API (REST)
Język: JavaScript (ES6+), Asynchronous JS (Async/Await)
Style: CSS3 (Flexbox, CSS Variables, Animations)

Jak uruchomić lokalnie?

1.  Sklonuj repozytorium:
    ```bash
    git clone [https://github.com/wiktoriasikerko05/weather-app.git](https://github.com/wiktoriasikerko05/weather-app.git)
    ```
2.  Zainstaluj zależności:
    ```bash
    npm install
    ```
3.  Uruchom projekt:
    ```bash
    npm run dev
    ```
