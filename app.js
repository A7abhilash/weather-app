window.onload = function(){
    let longitude;
    let latitude;

    let temperaturedegree = $('.temperature-degree');
    let temperatureDescription = $('.temperature-description');
    let locationTimezone = $('.location-timezone');
    let degreeDisplay =$('.degree-display');
    let unit = $('.unit')
    

    if(navigator.geolocation){//a popup will appear to access the location of the user
        //if the popup is accepted
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'; // we using this as we are not allowed to fetch the data from api with localhost.
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitude},${longitude}`; 
            
            fetch(api) //First fetch it from the api
                .then(response => response.json()) //then- convert the response coming from api into json file
                    .then(data => {
                        console.log(data);
                        //fetch temperature and description(summary) from the api
                        const {temperature,summary,icon} = data.currently;
                        /*the default temperature will be in fahrenheit and below 
                        is the formula for conversion from fahrenheit to celcius*/
                        let celcius = Math.floor((temperature-32)*(5/9));

                        //Set DOM elements from the api
                        temperaturedegree.html(temperature);
                        temperatureDescription.html(summary);
                        locationTimezone.html(data.timezone);
                        unit.html('F');
                        
                        //Setting the icon
                        setIcons(icon , document.querySelector('.icon'))

                        //Set the units
                        degreeDisplay.click(function(){
                            if(unit.html() === 'F')
                            {
                                temperaturedegree.html(celcius);
                                unit.html('°C');
                            }
                            else
                            {
                                temperaturedegree.html(temperature);
                                unit.html('F');
                            }
                        })
                    })
                    .then(function(){
                        $('.alert').css('visibility','hidden')
                    })
        });
    }

    function setIcons(icon , iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase(); //the replace() will replace all '-' with '_'
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon]);
    }
}