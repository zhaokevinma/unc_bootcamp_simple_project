// VARS =========================================
var id;
var team;
var teamID;
var data = [];
var apiData = {
  eventDate: "",
  flightDate: "",
  hotelArriveDate: "",
  hotelDepartDate: "",
  eventLocation: "",
  eventCity: "",
  departAirport: "",
  arriveAirport: ""
};

// FUNCTIONS ====================================

// When user chooses league, show teams
function chooseLeague() {
  var league = $(this);
  // console.log("league: ", league.val());

  // If user chooses NBA
  switch (league.val()) {
    case "NBA":
      var id = 4387;
      var sportsURL =
        "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" +
        id;
      // console.log('NBA', sportsURL);

      $.ajax({
        url: sportsURL,
        method: "GET"
      }).then(function(response) {
        // console.log(response);
        // Empty the team dropdown
        $("#team").empty();
        // Empty data array
        data = [];

        var team = response.teams;

        // For each response of the AJAX, show the team name in the dropdown
        for (var t = 0; t < team.length; t++) {
          // console.log(team[t].strTeam);
          var option = $("<option>");
          option.addClass("nbaTeam");
          option.text(team[t].strTeam);
          $("#team").append(option);
          data.push({ team: team[t].strTeam, teamID: team[t].idTeam });
        }
      });
      break;

    // If user chooses WNBA
    case "WNBA":
      var id = 4516;
      var sportsURL =
        "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" +
        id;
      // console.log('WNBA', sportsURL);

      $.ajax({
        url: sportsURL,
        method: "GET"
      }).then(function(response) {
        // console.log(response);
        // Empty the team dropdown
        $("#team").empty();
        // Empty data array
        data = [];

        var team = response.teams;

        // For each response of the AJAX, show the team name in the dropdown
        for (var t = 0; t < team.length; t++) {
          // console.log(team[t].strTeam)
          var option = $("<option>");
          option.addClass("wnbaTeam");
          option.text(team[t].strTeam);
          $("#team").append(option);
          data.push({ team: team[t].strTeam, teamID: team[t].idTeam });
        }
      });
      break;

    // If user chooses NFL
    case "NFL":
      var id = 4391;
      var sportsURL =
        "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" +
        id;
      // console.log('NFL', sportsURL);

      $.ajax({
        url: sportsURL,
        method: "GET"
      }).then(function(response) {
        // console.log(response);
        // Empty the team dropdown
        $("#team").empty();
        // Empty data array
        data = [];

        var team = response.teams;

        // For each response of the AJAX, show the team name in the dropdown
        for (var t = 0; t < team.length; t++) {
          // console.log(team[t].strTeam)
          var option = $("<option>");
          option.addClass("nflTeam");
          option.text(team[t].strTeam);
          $("#team").append(option);
          data.push({ team: team[t].strTeam, teamID: team[t].idTeam });
        }
      });
      break;
  }
} //Close chooseLeague function

// When user chooses team, show events
function chooseTeam() {
  var teamChoosen = $(this);
  // console.log("Team: ", teamChoosen.val());

  for (d = 0; d < data.length; d++) {
    if (data[d].team === teamChoosen.val()) {
      // console.log(data[d].teamID)

      // Pull team schedule
      var gamesURL =
        "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" +
        data[d].teamID;
      // console.log('Games', gamesURL);
      $.ajax({
        url: gamesURL,
        method: "GET"
      }).then(function(response) {
        // console.log(response);

        // Empty games dropdown
        $("#game").empty();

        var games = response.events;
        // console.log("Games ", games)

        // If there are no games
        if (games == null) {
          console.log("No events");
          var option = $("<option>");
          option.attr("id", "noEvent");
          option.text("No Upcoming Events");
          $("#game").append(option);
        }
        // If there are games
        else {
          // For each response of the AJAX, show the team name in the dropdown
          for (var g = 0; g < games.length; g++) {
            // Get events
            // console.log("Event: ", games[g].strEvent)

            // use moment JS to reformat event data
            var eventDate = games[g].dateEvent;
            var dateFormat = "YYYY-MM-DD";
            var eventDate = moment(eventDate, dateFormat);

            // Make an option
            var option = $("<option>");
            option.attr("id", "event");
            option.attr("data-day", eventDate.format("YYYY-MM-DD"));
            option.attr("data-homeid", games[g].idHomeTeam);
            // show event data with game
            option.text(
              games[g].strEvent + " on " + eventDate.format("MMM Do YYYY")
            );

            // Show schedule in first column
            $("#game").append(option);

            // Get home team id
            // console.log("Home team id: ", games[g].idHomeTeam)
          }
        }
      });
    }
  }
} //Close chooseTeam function



// When user chooses event, push event date
function pushEventDate() {
  var gameDate = this.options[this.selectedIndex].getAttribute("data-day");
  apiData.eventDate = gameDate;
  apiData.flightDate = gameDate; //  Default to arrive day of event
  apiData.hotelArriveDate = gameDate; // Default to check in day of event
  apiData.hotelDepartDate = moment(gameDate, "YYYY-MM-DD")
    .add(1, "days")
    .format("YYYY-MM-DD"); // Default to leave hotel day after event
  console.log("apiData: ", apiData);
} //Close pushEventDate function

function pushCityData() {
  var homeTeam = this.options[this.selectedIndex].getAttribute("data-homeid");
  var teamURL =
    "https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=" + homeTeam;

  return $.ajax({
    url: teamURL,
    method: "GET"
  }).then(function(response) {
    // console.log(response);

    var city = response.teams[0];
    // Get strStadiumLocation
    var stadium = city.strStadiumLocation;
    // Push stadium location
    apiData.eventLocation = stadium;
    // Split event into city and state

    city = stadium.split(",")
    // Push city only 
    apiData.eventCity = city[0]
    console.log(apiData)
    pushAirportArriveCode()
  })
}; //Close pushCityData function

// Convert city to airport code
function pushAirportArriveCode() {
  for (a = 0; a<airports.length; a++){

    if (airports[a].city === apiData.eventCity){
      apiData.arriveAirport = airports[a].code + "-sky";
      console.log(apiData)
    }
    /*
    else {
      console.log("Not working")
    }
    */
  }
}; //Close pushAirportArriveCode function


// When user inputs their airport code, send to apiData and run findFlight
function pushAirportDepartCode () {
  var code = $(this).val().trim();
  apiData.departAirport = code + "-sky";
  console.log(apiData);
  findFlight();
}; //Close pushAirportDepartCode function


// When user inputs days before event, get new flight out date
function pushFlightDate() {
  // Number of days before
  var daysBefore = $(this).val();
  // Event date
  var eventDate = apiData.eventDate;
  // Event date format
  var eventFormat = "YYYY-MM-DD";
  // Event date and format into moment
  var convertDate = moment(eventDate, eventFormat);
  // Subtract number of days from event date
  var flightDate = convertDate.subtract(daysBefore, "days");
  // Put new flight out date in apiData object
  apiData.flightDate = flightDate.format("YYYY-MM-DD");
  // Put new hotel arrival date in apiData object
  apiData.hotelArriveDate = flightDate.format("YYYY-MM-DD");
  // Find new flights with new date
  findFlight();
  // Find new hotels with new date
  findHotel();
} //Close pushFlightDate function

// When user inputs days to stay in city, get new hotels
function pushHotelDate () {
  // Number of days to stay
  var daysToStay = $(this).val();
  // Flight date
  var arrivalDate = apiData.hotelArriveDate;
  // Flight date format
  var dateFormat = "YYYY-MM-DD";
  // Flight date and format into moment
  var convertDate = moment(arrivalDate, dateFormat);
  // Add days to stay to arrival date
  var departDate = convertDate.add(daysToStay, "days");
  // Put new hotel departure date in apiData object
  apiData.hotelDepartDate = departDate.format("YYYY-MM-DD");
  // Find new hotels with new date
  findHotel();
} //Close pushHotelDate function

// TODO Show list of flights for game time period in second column
// TODO User chooses flight
// TODO User enters their airport code
// TODO Pull flights from user to game

function findFlight() {
  console.log("Finding Flights")

  if (apiData.departAirport == false) {
    console.log("Need city");
    $("#airport").css("border", "1px solid red")
  }
  else {
    $("#airport").css("border-width", "2px").css("border-style", "inset").css("border-color", "initial");

    $.ajax({
      url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0',
      method: 'POST',
      data: {
        country: 'US',
        currency: 'USD',
        locale: 'en-US',
        originPlace: apiData.departAirport,
        destinationPlace: apiData.arriveAirport,
        outboundDate: apiData.flightDate, //outbound date here
        adults: 1
      },
      headers: {
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
        'x-rapidapi-key': '39679fe291msh490fd3370e51da5p1a43a2jsn13fddd01de35',
        'content-type': 'application/x-www-form-urlencoded'
      }
    }).done(function (response, textStatus, jqXHR) {
        console.log(response)
        var location = jqXHR.getResponseHeader('Location');
        var array = location.split('/');
        var sessionKey = array[array.length - 1];

        $.ajax({
          url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/' + sessionKey,
          // Example with optional parameters
          data: {
            pageIndex: 0,
            pageSize: 10,
          },
          headers: {
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'x-rapidapi-key': '39679fe291msh490fd3370e51da5p1a43a2jsn13fddd01de35'
          }
        }).done(function (response) {
          console.log(response);
          // Empty dropdown
          $("#flight2").empty();

          var flights = response.Carriers;

          // If no flights
          if (flights == null) {
            console.log("No flights");
            var option = $("<option>");
            option.attr("id", "noEvent");
            option.text("No Flights available");
            $("#flight2").append(option);
          }
          // if there are flight options
          else {
            // show 3 of the AJAX calls, show flight in response
            for (var i = 0; i < 3; i++) {
              // Get prices
              console.log("Price: ", response.Itineraries[i].PricingOptions[0].Price)
              // Make an option
              var option = $("<option>");
              option.attr("data-flight", flights[i].Name);
              // show event data with flight
              option.text(flights[i].Name + " / " + response.Itineraries[i].PricingOptions[0].Price);
              // Show flight in column
              $("#flight2").append(option);
            }
          }
        }).fail(function () {
          console.error('error');
        });
      })
      .fail(function () {
        console.error('error');
      });
  }
}; //Close findFlight function


// TODO Pull hotel info in game city for time period
function findHotel() {
  console.log("Finding Hotels");
  return $.ajax({
    url: "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete",
    data: {
      languagecode: "en-us",
      text: apiData.eventCity
    },
    headers: {
      "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
      "x-rapidapi-key": "4fba5df7b8msh229636a0ecdf4e5p109982jsn50f9b16b19c2"
    }
  })
    .done(function(response) {
      console.log(response);
    })
    .fail(function() {
      console.error("error");
    });
}

function bookingResults(data, textStatus, jqXHR) {
  console.log("data: ", data);
  return $.ajax({
    url: "https://apidojo-booking-v1.p.rapidapi.com/properties/list",
    data: {
      departure_date: apiData.hotelDepartDate,
      arrival_date: apiData.hotelArriveDate,
      search_type: data[0].search_type,
      dest_ids: data[0].dest_id
    },
    headers: {
      "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
      "x-rapidapi-key": "4fba5df7b8msh229636a0ecdf4e5p109982jsn50f9b16b19c2"
    }
  }).fail(function() {
    console.error("error");
  });
}
function getResponses(elem) {
  pushCityData(elem)
    .then(findHotel)
    .then(bookingResults)
    .then(function(response) {
      console.log(response);
    });
} //Close findHotel function*/

// CALL ========================================================
$("document").ready(function () {
  // User chooses a league
  $("#league").change(chooseLeague); // Populate team data
  // User chooses a team
  $("#team").change(chooseTeam); // Populate Game Data
  // User chooses a game
  $("#game").change(pushEventDate); // Push Date to apiData
  $("#game").change(pushCityData); // Push City to apiData
  $("#game").change(findHotel); // Populate hotels
  // User inputs Airport Code
  $("#airport").change(pushAirportDepartCode); // Push airport code to apiData
  $("#stay").change(pushHotelDate); // Populate hotels
  // If user changes number of days
  $("#flight").change(pushFlightDate); // Push number to apiData
}); //Close document ready function
