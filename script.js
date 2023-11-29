// Global variable to store the selected location (if any)
let selectedLocation = null;

// Function to get the current location using the Geolocation API
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                // Success: Update the selectedLocation variable and make API request
                selectedLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                makeApiRequest(selectedLocation);
            },
            error => {
                // Error: Handle geolocation error
                console.error('Geolocation error:', error.message);
                updateResultContainer(null, 'Geolocation error. Please try again.');
            }
        );
    } else {
        // Geolocation not supported
        updateResultContainer(null, 'Geolocation is not supported by your browser.');
    }
}

// Function to make an API request using the selectedLocation
function makeApiRequest(location) {
    // Replace 'YOUR_API_KEY' with your actual API key (if required by the API)
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.sunrise-sunset.org/json?lat=${location.latitude}&lng=${location.longitude}&date=today&formatted=0&apikey=${apiKey}`;

    // Make the API request using AJAX or fetch
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Success: Update the result container with the data
            updateResultContainer(data, null);
        })
        .catch(error => {
            // Error: Handle API request error
            console.error('API request error:', error);
            updateResultContainer(null, 'Error fetching data from the API. Please try again.');
        });
}

// Function to update the result container with data or an error message
function updateResultContainer(data, errorMessage) {
    const resultContainer = document.getElementById('resultContainer');

    // Clear previous content
    resultContainer.innerHTML = '';

    if (errorMessage) {
        // Display error message
        resultContainer.innerHTML = `<p>${errorMessage}</p>`;
    } else {
        // Update result container with data
        updateResultContainerWithData(data);
    }
}

// Function to update the result container with data from the API response
function updateResultContainerWithData(data) {
    const resultContainer = document.getElementById('resultContainer');

    // Implement this function based on the structure of the API response
    // Refer to the previous example for displaying sunrise, sunset, etc.

    // Call updateResultContainer with data (or handle data directly here)
}

// Event listener for the "Get Current Location" button
document.querySelector('button').addEventListener('click', getCurrentLocation);

// Event listener for the location select dropdown
document.getElementById('locationSelect').addEventListener('change', function () {
    // Update the selectedLocation variable with the chosen location
    selectedLocation = getSelectedLocation();
    // Make API request using the selected location
    makeApiRequest(selectedLocation);
});

// Function to get the selected location from the dropdown
function getSelectedLocation() {
    const selectElement = document.getElementById('locationSelect');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    return {
        latitude: selectedOption.dataset.latitude,
        longitude: selectedOption.dataset.longitude
    };
}

// Additional event listeners and functions for handling user input can be added here
// Remember to handle errors and update the UI accordingly
