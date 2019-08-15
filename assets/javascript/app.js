// VARS =========================================
var id;
var team;
var teamID;
var data = [];
var gameDates = [];

// FUNCTIONS ====================================

$("document").ready(function () {


// User chooses leauge and team
$("#league").change(function chooseTeam() {
  var league = $(this);
  console.log("league: ", league.val());

  // If user chooses NBA
  switch (league.val()) {
    case "NBA":
      var id = 4387;
      var sportsURL = "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" + id;
      // console.log('NBA', sportsURL);

      $.ajax({
        url: sportsURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        // Empty the team dropdown
        $("#team").empty();
        // Empty data array
        data = [];

        var team = response.teams

        // For each response of the AJAX, show the team name in the dropdown
        for (var t = 0; t < team.length; t++) {
          // console.log(team[t].strTeam);
          var option = $("<option>");
          option.addClass("nbaTeam");
          option.text(team[t].strTeam);
          $("#team").append(option);
          data.push({team: team[t].strTeam, teamID: team[t].idTeam})
        }
        
      })
      break;

    // If user chooses WNBA
    case "WNBA":
      var id = 4516;
      var sportsURL = "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" + id;
      // console.log('WNBA', sportsURL);

      $.ajax({
        url: sportsURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        // Empty the team dropdown
        $("#team").empty();
        // Empty data array
        data = [];

        var team = response.teams

        // For each response of the AJAX, show the team name in the dropdown
        for (var t = 0; t < team.length; t++) {
          // console.log(team[t].strTeam)
          var option = $("<option>");
          option.addClass("wnbaTeam");
          option.text(team[t].strTeam);
          $("#team").append(option);
          data.push({team: team[t].strTeam, teamID: team[t].idTeam})
        }
      })
      break;

    // If user chooses NFL
    case "NFL":
      var id = 4391;
      var sportsURL = "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" + id;
      // console.log('NFL', sportsURL);

      $.ajax({
        url: sportsURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        // Empty the team dropdown
        $("#team").empty();
        // Empty data array
        data = [];

        var team = response.teams

        // For each response of the AJAX, show the team name in the dropdown
        for (var t = 0; t < team.length; t++){
          // console.log(team[t].strTeam)
          var option = $("<option>");
          option.addClass("nflTeam");
          option.text(team[t].strTeam);
          $("#team").append(option);
          data.push({team: team[t].strTeam, teamID: team[t].idTeam})
        }
      })
      break;
  }
})

<<<<<<< HEAD

    switch (league.val()) {
      case "NBA":
        var id = 4387;
        var sportsURL =
          "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" +
          id;
        console.log("NBA", sportsURL);

        $.ajax({
          url: sportsURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);

          $("#team").empty();

          var team = response.teams;

          for (var t = 0; t < team.length; t++) {
            console.log(team[t].strTeam);
            var option = $("<option>");
            option.addClass("nbaTeam");
            option.text(team[t].strTeam);
            $("#team").append(option);
          }
        });
        break;

      case "WNBA":
        var id = 4516;
        var sportsURL =
          "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" +
          id;
        console.log("WNBA", sportsURL);

        $.ajax({
          url: sportsURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);

          $("#team").empty();

          var team = response.teams;

          for (var t = 0; t < team.length; t++) {
            console.log(team[t].strTeam);
            var option = $("<option>");
            option.addClass("wnbaTeam");
            option.text(team[t].strTeam);
            $("#team").append(option);
          }
        });
        break;

      case "NFL":
        var id = 4391;
        var sportsURL =
          "https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=" +
          id;
        console.log("NFL", sportsURL);
        $.ajax({
          url: sportsURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);

          $("#team").empty();

          var team = response.teams;

          for (var t = 0; t < team.length; t++) {
            console.log(team[t].strTeam);
            var option = $("<option>");
            option.addClass("nflTeam");
            option.text(team[t].strTeam);
            $("#team").append(option);
          }
        });
        break;
    }
  });

  // TODO Pull team schedule
  // TODO Show schedule in first column
  // TODO User chooses game
  // TODO User enters their airport code
  // TODO Pull flights from user to game
  // TODO Show list of flights for game time period in second column
  // TODO User chooses flight
  // TODO Pull hotel info in game city for time period
// });

$.ajax({
  url: "https://apidojo-booking-v1.p.rapidapi.com/properties/list",
  data: {
    departure_date: "2019-09-08",
    arrival_date: "2019-09-01",
    latitude: "42.3601",
    longitude: "-71.0589",
    search_type: "latlong"
  },
  headers: {
    "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
    "x-rapidapi-key": "4fba5df7b8msh229636a0ecdf4e5p109982jsn50f9b16b19c2"
  }
}).done(function(response) {
  console.log(response);
  $.ajax({
    url: "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete",

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
});


=======
>>>>>>> 1aff3aa6bad2ba5d706c1a7b253f87d4e10119a6
// User chooses game
$("#team").change(function chooseGame() {
  console.log("Data: ", data);
  var teamChoosen = $(this)
  console.log("Team: ", teamChoosen.val());

  for (d=0; d < data.length; d++){
    if (data[d].team === teamChoosen.val()) {
      console.log(data[d].teamID)

      // Pull team schedule
      var gamesURL = "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + data[d].teamID;
      console.log('Games', gamesURL);
      $.ajax({
        url: gamesURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        // Empty games dropdown
        $("#game").empty();

        var games = response.events

        // For each response of the AJAX, show the team name in the dropdown
        for (var g = 0; g < games.length; g++){
          // Get events
          console.log("Event: ", games[g].strEvent)
          
          // use moment JS to reformat event data
          var eventDate = games[g].dateEvent
          var dateFormat = "YYYY-MM-DD"
          var convertedDate = moment(eventDate, dateFormat)
          console.log(convertedDate.format("MMM Do YYYY"));

          // Make an option
          var option = $("<option>");
          option.addClass("event");
          // show event data with game
          option.text(games[g].strEvent + " on " + convertedDate.format("MMM Do YYYY"));

          // Show schedule in first column
          $("#game").append(option);
          


          

          // Get home team id
          console.log("Home team id: ", games[g].idHomeTeam)

          gameDates.push({vs:games[g].strEvent, date:convertedDate, homeTeam:games[g].idHomeTeam})
          console.log(gameDates)
        }
      })
    }
  }
})

// TODO Show list of flights for game time period in second column
// TODO User chooses flight
// TODO User enters their airport code
// TODO Pull flights from user to game

// TODO plug id into 'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id='
// TODO get strStadiumLocation 
// TODO show staium location




$.ajax({
  url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
  data: {
    sessionkey: "b241ccd2-4075-404d-be39-be3af4d215e1",
    // country: "US",
    // currency: "USD", 
    // locale: "en-US", 
    // originPlace: "SFO-sky", 
    // adults: "1"

  },
  headers: {
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "x-rapidapi-key": "39679fe291msh490fd3370e51da5p1a43a2jsn13fddd01de35s"
  }
}).done(function(response) {
  console.log(response); 
  $.ajax({
    url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",

    headers: {
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "39679fe291msh490fd3370e51da5p1a43a2jsn13fddd01de35"
    }, 
    data: {
      country: "US",
      currency: "USD", 
      locale: "en-US", 
      originPlace: "SFO-sky", 
      adults: "1"
    }
  })
    .done(function(response) {
      console.log(response);
    })

    .fail(function() {
      console.error("error");
    });

  }); 

// TODO Show list of flights for game time period in second column
// TODO User chooses flight



// TODO Pull hotel info in game city for time period

// TODO plug id into 'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id='
// TODO get strStadiumLocation 
// TODO show staium location


