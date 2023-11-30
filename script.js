// Function to fetch data from the API
function getGeoData() {

    const searchElement = document.getElementById('searchBar').value;

        const url=`https://geocode.maps.co/search?q=${searchElement}`;

    return fetch(url)
        .then(response => {
         
            return response.json();
        })
        .then(data => {

            if(data.length==0){
                alert("Invalid city name");
                document.getElementById('searchbar').value=""
                return;
            }

            console.log(data);
            const lat = data[0].lat;
            const lon = data[0].lon;
            
            webdata(lat, lon);

           

           
            return data.results;
        })
        .catch(error => {
         
            console.error('Error:', error); 
        });
}

function webdata(lat, lon){
    const todayurl = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&date=today`;
    const tomorrowurl = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&date=tomorrow`;

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const today = new Date();
    //date for today
    const dayOfWeek = daysOfWeek[today.getDay()];
    const month = months[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();
  
    const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;
    console.log(formattedDate);
    
    // date for tomorrow

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayOfWeek1 = daysOfWeek[tomorrow.getDay()];
    const month1 = months[tomorrow.getMonth()];
    const day1 = tomorrow.getDate();
    const year1 = tomorrow.getFullYear();

    const formattedDate1 = `${dayOfWeek1}, ${month1} ${day1}, ${year1}`;
    console.log(formattedDate1);
  
    fetch(todayurl)
    .then(response => response.json())
    .then(data => {
        console.log(data.results);
        // Update your dashboard with the sunrise/sunset data
        
        document.querySelector('#todayDate').innerHTML = formattedDate;
        document.querySelector('#todaySunriseTime').innerHTML = data.results.sunrise;
        document.querySelector('#todayDawnTime').innerHTML = data.results.dawn;
        document.querySelector('#todaySunsetTime').innerHTML = data.results.sunset;
        document.querySelector('#todayDuskTime').innerHTML = data.results.dusk;
        document.querySelector('#todaySolarNoon').innerHTML = data.results.solar_noon;
        document.querySelector('#todayDayLength').innerHTML = data.results.day_length;
        document.querySelector('#todayTimeZone').innerHTML = data.results.timezone;

    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors and display a message to the user
        alert('Error fetching sunrise/sunset data. Please try again.');
    });

    fetch(tomorrowurl)
    .then(response => response.json())
    .then(data => {
        console.log(data.results);

        document.querySelector('#tomorrowDate').innerHTML = formattedDate1;
        document.querySelector('#tomorrowSunriseTime').innerHTML = data.results.sunrise;
        document.querySelector('#tomorrowDawnTime').innerHTML = data.results.dawn;
        document.querySelector('#tomorrowSunsetTime').innerHTML = data.results.sunset;
        document.querySelector('#tomorrowDuskTime').innerHTML = data.results.dusk;
        document.querySelector('#tomorrowSolarNoon').innerHTML = data.results.solar_noon;
        document.querySelector('#tomorrowDayLength').innerHTML = data.results.day_length;
        document.querySelector('#tomorrowTimeZone').innerHTML = data.results.timezone;

    })  
    .catch(error => {
        console.error('Error:', error);
        // Handle errors and display a message to the user
        alert('Error fetching sunrise/sunset data. Please try again.');
    });

}
