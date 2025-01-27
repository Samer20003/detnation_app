// Function to fetch coordinates from Geonames API
async function getCoordinates(destination) {
    try {
      const response = await fetch(`http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=samer33434`);
      const data = await response.json();
  
      console.log("Geonames API Response:", data); // Log the response
  
      // Check if the response contains valid data
      if (!data.geonames || data.geonames.length === 0) {
        throw new Error("No results found for the destination.");
      }
  
      return {
        lat: data.geonames[0].lat,
        lng: data.geonames[0].lng,
      };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw new Error("Failed to fetch coordinates. Please try again.");
    }
  }
  
  // Function to fetch weather from Weatherbit API
  async function getWeather(lat, lng, date) {
    try {
      const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=YOUR_WEATHERBIT_API_KEY`);
      const data = await response.json();
  
      console.log("Weatherbit API Response:", data); // Log the response
  
      // Check if the response contains valid data
      if (!data.data || data.data.length === 0) {
        throw new Error("No weather data found for the location.");
      }
  
      return data.data[0]; // Return the first day's forecast
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw new Error("Failed to fetch weather data. Please try again.");
    }
  }
  
  // Function to fetch image from Pixabay API
  async function getImage(destination) {
    try {
      const response = await fetch(`https://pixabay.com/api/?key=YOUR_PIXABAY_API_KEY&q=${destination}&image_type=photo`);
      const data = await response.json();
  
      console.log("Pixabay API Response:", data); // Log the response
  
      // Check if the response contains valid data
      if (!data.hits || data.hits.length === 0) {
        throw new Error("No images found for the destination.");
      }
  
      return data.hits[0].webformatURL; // Return the URL of the first image
    } catch (error) {
      console.error("Error fetching image:", error);
      throw new Error("Failed to fetch an image. Please try again.");
    }
  }
  
  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
  
    // Get form inputs
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('departure-date').value;
  
    // Clear previous results
    const results = document.getElementById('results');
    results.innerHTML = "<p>Loading...</p>";
  
    try {
      // Fetch coordinates, weather, and image
      const { lat, lng } = await getCoordinates(destination);
      const weather = await getWeather(lat, lng, date);
      const image = await getImage(destination);
  
      // Display results
      results.innerHTML = `
        <h2>${destination}</h2>
        <img src="${image}" alt="${destination}" style="max-width: 100%; height: auto;">
        <p>Weather: ${weather.weather.description}</p>
        <p>Temperature: ${weather.temp}°C</p>
      `;
    } catch (error) {
      // Display error message
      results.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
  }
  
  // Add event listener to the form
  document.getElementById('travel-form').addEventListener('submit', handleSubmit);