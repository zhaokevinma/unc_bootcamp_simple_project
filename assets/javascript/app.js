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
  arriveAirport: "",
};

var modalData = {
  userGame: "", //* You choose to see _ vs _ ...
  userDate: "", //* on _ ...
  userCity: "", //* in the city of _ 
  userFlight: "", //* You found a flight with _ ...
  userFlightDate: "", //* on _ ...
  userFlightPrice: "", //* for $ _
  userHotel: "filler", // And you're staying with _ ...
  userHotelArriveDate: "filler", // from _ ...
  userHotelDepartDate: "filler", // to _ ...
  userHotelPrice: "filler", // for $ _
}

var pickTeam = $("<option>").text("Choose a Team");
var pickGame = $("<option>").text("Choose a Game");
var pickFlight = $("<option>").text("Choose a Flight");
var pickHotel = $("<option>").text("Choose a Hotel");

// FUNCTIONS ====================================

// * When user chooses league, show teams
// Run when user chooses a league
function chooseLeague() {
  console.log("chooseLeague: ", apiData)
  var league = $(this);

  // If user chooses NBA
  switch (league.val()) {
    case "NBA":
      var id = 4387;
      var sportsURL = "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" + id;

      $.ajax({
        url: sportsURL,
        method: "GET"
      }).then(function(response) {
        // console.log(response);

        // Empty the team dropdown
        $("#team").empty();
        $("#team").append(pickTeam);

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
      var sportsURL = "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" + id;

      $.ajax({
        url: sportsURL,
        method: "GET"
      }).then(function(response) {
        // console.log(response);

        // Empty the team dropdown
        $("#team").empty();
        $("#team").append(pickTeam);

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
      var sportsURL = "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" + id;

      $.ajax({
        url: sportsURL,
        method: "GET"
      }).then(function(response) {
        // console.log(response);

        // Empty the team dropdown
        $("#team").empty();
        $("#team").append(pickTeam);

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

// * When user chooses team, show events
// Run when user chooses a team
function chooseTeam() {
  console.log("chooseTeam: ", apiData)
  var teamChoosen = $(this);
  // console.log("Team: ", teamChoosen.val());

  for (d = 0; d < data.length; d++) {
    if (data[d].team === teamChoosen.val()) {

      // Pull team schedule
      var gamesURL = "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + data[d].teamID;

      $.ajax({
        url: gamesURL,
        method: "GET"
      }).then(function(response) {
        // console.log(response);

        // Empty games dropdown
        $("#game").empty();
        $("#game").append(pickGame);

        var games = response.events;
        // console.log("Games ", games)

        // If there are no games
        if (games == null) {
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
            eventDate = moment(eventDate, dateFormat);

            // Make an option
            var option = $("<option>");
            option.attr("id", "event");
            option.attr("data-day", eventDate.format("YYYY-MM-DD"));
            option.attr("data-vs", games[g].strEvent);
            option.attr("data-homeid", games[g].idHomeTeam);
            // show event data with game
            option.text(games[g].strEvent + " on " + eventDate.format("MMM Do YYYY"));

            // Show schedule in first column
            $("#game").append(option);
          }
        }
      });
    }
  }
} //Close chooseTeam function

// * When user chooses event, push event date
// Run when user chooses a game
function pushEventDate() {
  console.log("pushEventDate: ", apiData)
  var gameDate = this.options[this.selectedIndex].getAttribute("data-day");
  apiData.eventDate = gameDate;
  apiData.flightDate = gameDate; //  Default to arrive day of event
  apiData.hotelArriveDate = gameDate; // Default to check in day of event
  apiData.hotelDepartDate = moment(gameDate, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD"); // Default to leave hotel day after event

  var gameTeams =  this.options[this.selectedIndex].getAttribute("data-vs");
  modalData.userGame = gameTeams;
  modalData.userDate = moment(gameDate, "YYYY-MM-DD").format("MMM Do YYYY");
} //Close pushEventDate function

// * When user chooses a event, push event city
// Run when user chooses a game
function pushCityData() {
  console.log("pushCityData: ", apiData)
  var homeTeam = this.options[this.selectedIndex].getAttribute("data-homeid");
  var teamURL = "https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=" + homeTeam;

  return $.ajax({
    url: teamURL,
    method: "GET"
  }).then(function(response) {
    // console.log(response);

    var city = response.teams[0];
    // Get strStadiumLocation
    var stadium = city.strStadiumLocation;
    // Push stadium location to apiData
    apiData.eventLocation = stadium;
    // Push stadium location to modalData
    modalData.userCity = stadium;
    // Split event into city and state
    city = stadium.split(",");
    // Push city only 
    apiData.eventCity = city[0];
    // Now that we have a city, run the function to convert it to a airport code
    pushAirportArriveCode();
  })
}; //Close pushCityData function

// * Convert city to airport code
// Run after pushCityData and city has been set
function pushAirportArriveCode() {
  console.log("pushAirportArriveCode: ", apiData)
  for (a = 0; a<airports.length; a++){
    if (airports[a].city === apiData.eventCity){
      apiData.arriveAirport = airports[a].code + "-sky";
    }
  }
}; //Close pushAirportArriveCode function

// * When user inputs their airport code, send to apiData
// Run when user input airport code
function pushAirportDepartCode () {
  console.log("pushAirportDepartCode: ", apiData)
  var code = $(this).val().toUpperCase().trim();
  console.log("Code: ", code)
  apiData.departAirport = code + "-sky";
  // Event date and city have been set and user has selected their depart city, now find flights
  findFlight();
}; //Close pushAirportDepartCode function

// * When user inputs days before event, get new flight out date
// Run when user inputs days before event to leave
function pushFlightDate() {
  console.log("pushFlightDate: ", apiData)
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

// * When user inputs days to stay in city, get new hotels
// Run when user inputs how many days to stay in city
function pushHotelDate () {
  console.log("pushHotelDate: ", apiData)
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

// * Find flights from user to game and display on page
// Run when user inputs airport code (in pushAirportDepartCode)
// Run when user inputs days before event to leave (in pushFlightDate)
function findFlight() {
  console.log("findFlight: ", apiData)
  if (apiData.eventDate == false) {
    console.log("Need Event Date")
  }
  else if (apiData.departAirport == false) {
    console.log("Need city");
    $("#airport").css("border", "1px solid red")
  }
  else {
    console.log("Finding Flight")
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
        // console.log(response)
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
          console.log("Flights: ", response);
          // Empty dropdown
          $("#flight2").empty();

          var flights = response.Carriers;

          // If no flights
          if (flights.length == 0) {
            console.log("No flights");
            var option = $("<option>");
            option.attr("id", "noFlight");
            option.text("No Flights available");
            $("#flight2").append(option);
          }
          // if there are flight options
          else {
            $("#flight2").append(pickFlight);
            //Show list of flights for game time period
            // show 3 of the AJAX calls, show flight in response
            for (var i = 0; i < 3; i++) {
              // Make an option
              var option = $("<option>");
              // Airline names
              option.attr("data-flight", flights[i].Name);
              // Prices
              option.attr("data-flightprice", response.Itineraries[i].PricingOptions[0].Price);
              // show event data with flight
              option.text("Fly with " + flights[i].Name + " for $" + response.Itineraries[i].PricingOptions[0].Price);
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

// * When user chooses flight, push airline and price
// Run when user chooses flight
function pushFlightData() {
  var flight = this.options[this.selectedIndex].getAttribute("data-flight");
  var price = this.options[this.selectedIndex].getAttribute("data-flightprice");

  modalData.userFlight = flight;
  modalData.userFlightDate = moment(apiData.flightDate, "YYYY-MM-DD").format("MMM Do YYYY")
  modalData.userFlightPrice = price;
}

// * Pull hotel info in game city for time period
// TODO Populate information in dropdown
// Run when user chooses flight
// Run when user inputs days before event to leave (in pushFlightDate)
// Run when user inputs days to stay in city (in pushHotelDate)
function findHotel() {
  console.log("findHotel: ", apiData);
  if (apiData.arriveAirport == false) {
    console.log("Need city for hotel")
  }
  else {
    console.log("Finding Hotel");

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
    }).done(function (response) {
      console.log(response);
      var searchType = response[0].dest_type;
      var destId = response[0].dest_id;
      
      $.ajax({
        url: "https://apidojo-booking-v1.p.rapidapi.com/properties/list",
        data: {
          departure_date: apiData.hotelDepartDate,
          arrival_date: apiData.hotelArriveDate,
          search_type: searchType,
          dest_ids: destId,
        },
        headers: {
          "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
          "x-rapidapi-key": "4fba5df7b8msh229636a0ecdf4e5p109982jsn50f9b16b19c2"
        }
      }).done(function (response) {
        console.log("booking results working: ", response);
        // Empty dropdown
        $("#hotel").empty();

        var hotels = response;

        // TODO If no rooms
        if (hotels == null) {
          console.log("No Hotels");
          var option = $("<option>");
          option.attr("id", "noRooms");
          option.text("No Rooms available");
          $("#hotel").append(option);
        }
        // TODO If there are room options
        else {
          $("#hotel").append(pickHotel);

          // TODO Show list of hotels for game time period
          for (var h = 0; h < hotels.length; h++) {
            // Get Rooms
            var rooms
            // Get prices
            var roomPrice
            // Make an option
            var option = $("<option>");
            option.attr("data-room", rooms);

            // show hotel and price
            option.text("Stay with " + rooms + " for $" + roomPrice);
            // Show flight in column
            $("#flight2").append(option);
          }
        }

      }).fail(function() {
        console.error("error");
      });
    }).fail(function () {
      console.error("error");
    });
  }
}; //Close findHotel function

// TODO Show selected information in modal
// Run when user clicks submit
function popModal() {
  var data =  Object.values(modalData);

  for (m = 0; m < data.length; m++) {
    if (data[m] == false) {
      $(".modal-title").text("Oops");
      $(".modal-body").text("Make sure you made necessary selections!")
      return m;
    }
    else {
      // Change the header
      $(".modal-title").text("Your Selections");
      // Empty the modal of the placeholder text
      $(".modal-body").empty();
      // Sentence for each card
      var gameData = "You choose to see <b>" + modalData.userGame + "</b> on <b>" + modalData.userDate + "</b> in the city of <b>" + modalData.userCity + "</b>. <br/><br/>";
      var flightData = "You found a flight with <b>" + modalData.userFlight + "</b> on <b>" + modalData.userFlightDate + "</b> for <b>$" + modalData.userFlightPrice + "</b>. <br/><br/>";
      var hotelData = "And you're staying with <b>" + modalData.userHotel + "</b> from <b>" + modalData.userHotelArriveDate + " to " + modalData.userHotelDepartDate + "</b> for <b>$" + modalData.userHotelPrice + "</b>. <br/><br/>";
      // Append the sentences to the modal
      $(".modal-body").append(gameData);
      $(".modal-body").append(flightData);
      $(".modal-body").append(hotelData);
    }
  }
}; //Close popModal function

// CALL ========================================================
$("document").ready(function () {
  // User chooses a league
  $("#league").change(chooseLeague); // Populate team data

  // User chooses a team
  $("#team").change(chooseTeam); // Populate Game Data

  // User chooses a game
  $("#game").change(pushEventDate); // Push Date to apiData
  $("#game").change(pushCityData); // Push City to apiData

  // User inputs Airport Code
  $("#airport").change(pushAirportDepartCode); // Push airport code to apiData

  // If user inputs how many days to stay in city
  $("#stay").change(pushHotelDate); // Populate hotels

  // If user changes number of days
  $("#flight").change(pushFlightDate); // Push number to apiData

  // User chooses flight
  $("#flight2").change(findHotel); // Populate flights
  $("#flight2").change(pushFlightData); // Push flight and price to userData

  // User clicks submit button
  $(".btn-info").click(popModal);
}); //Close document ready function
