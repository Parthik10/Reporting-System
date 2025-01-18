# Disaster Report System with Weather Dashboard

## Table of Contents

- Overview
- Built With
- Screenshot
- Links
- Features
- Lighthouse Report
- Project Structure
- API Integration
- Installation
- License
- Author

### Overview

This MERN (MongoDB, Express, React, Node.js) project is designed to help users stay informed about disasters and weather conditions. The Disaster Report System allows users to report disasters and view them on a dedicated Reports Page and an interactive Map. Additionally, the project features a Weather Dashboard on a separate page, offering up-to-date and comprehensive weather information.

With its user-friendly interface and intuitive design, the system provides valuable tools to track both small- and large-scale disasters, monitor current conditions, and access detailed forecasts. This project aims to empower users by keeping them informed and prepared for any situation.

### Built With

- **Node.js**
- **Express.js**
- **MongoDB**
- **React.js**
- **Material UI** and **CSS Modules** for styling
- **RESTful API**
- **Context API** for state management
- **Vite** for a fast development environment
- **ESLint** and **Prettier** for code linting and formatting
- **Mapbox API** for map integration
- **OpenWeatherMap API** for weather data

### Screenshot

![Weather Application](Screenshot.png)

### Links

- [GitHub Repository](https://github.com/Parthik10/Reporting-System)

### Features

1. **Disaster Reporting:**
   - A form to report disasters, with location and time autofilled.
   - Users can enter the disaster name, description, and upload an image from their gallery.

2. **Reports Page:**
   - View reports in the form of cards.
   - Red markers on the map indicate reported disasters.

3. **Weather Dashboard:**
   - Default city set to Dehradun, providing weather information for this location.
   - Real-time weather data based on the user’s current geographical location.
   - Search for any city to instantly view its weather conditions.
   - "Today's Highlights" section, including:
     - Sunrise & Sunset times
     - Humidity, Pressure, Visibility, and "Feels Like" temperature
   - Daily Weather Forecast:
     - Updates every 3 hours
     - Corresponding wind speed
   - 5-day Weather Forecast

### Lighthouse Report Metrics

#### Desktop Metrics:
- **Performance:** Outstanding at 99%
- **Accessibility:** High score of 95%
- **Best Practices:** High score of 93%
- **SEO:** Perfect score of 100%

#### Mobile Metrics:
- **Performance:** Solid at around 90%
- **Accessibility:** High score of 94%
- **Best Practices:** High score of 93%
- **SEO:** Impressive score of 97%

These metrics reflect a well-optimized and compliant website.

### Project Structure

#### Client
```
client
├── public
├── src
    ├── assets
    ├── components
    ├── Weather
    ├── Hooks
    ├── forecast
    ├── header
    ├── highlights
    ├── layout
    ├── now
    ├── today
    ├── context
    ├── icons
    ├── AddLocation.jsx
    ├── DetailCard.jsx
    ├── Geocoder.jsx
    ├── Header.jsx
    ├── InfoField.jsx
    ├── Map.jsx
    ├── ReportingForm.jsx
    ├── pages
        ├── AddReport.jsx
        ├── Home.jsx
        ├── Reports.jsx
        ├── Weather.jsx
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
.env
.gitignore
README.md
eslint.config.js
index.html
package-lock.json
package.json
vite.config.js
```

#### Server
```
server
├── controllers
├── middlewares
├── models
├── router
├── uploads
├── utils
├── validators
.env
package-lock.json
package.json
server.js
```

### API Integration

#### Mapbox API
- Used to display the map and show markers for reported disasters.

#### OpenWeatherMap API
- Provides real-time weather data, daily forecasts, and weather highlights.

#### Fetching Weather Data
```javascript
const apiKey = "YOUR_API_KEY";
const city = "YourCity";

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
)
  .then((response) => response.json())
  .then((data) => displayWeather(data))
  .catch((error) => console.error("Error:", error));
```

### Installation

To set up and run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Parthik10/Reporting-System
   ```
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```
4. Navigate to the server directory:
   ```bash
   cd ../server
   ```
5. Install dependencies and start the backend server:
   ```bash
   npm install
   nodemon server.js
   ```

### License

This project is open-source and free for non-commercial use. You are allowed to view, modify, and distribute the code for non-commercial purposes. For commercial use or other inquiries, please contact the author.

### Author

- Email: parthikrajput0021@gmail.com

