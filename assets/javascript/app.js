// VARS =========================================
var id;
var team;
var teamID;
var data = [];

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

        // TODO Empty games dropdown
        //! $("#games").empty();

        var games = response.events

        // For each response of the AJAX, show the team name in the dropdown
        for (var g = 0; g < games.length; g++){
        console.log("Event: ", games[g].strEvent)
        
        // Get home team id
        console.log("Home team id: ", games[g].idHomeTeam)
        // var option = $("<option>");
        // option.addClass("event");
        // option.text(games[g].strEvent);
        // TODO Show schedule in first column
        //! $("#games").append(option);

        // use moment JS to reformat event data
        var eventDate = games[g].dateEvent
        var dateFormat = "YYYY-MM-DD"
        var convertedDate = moment(eventDate, dateFormat)
        console.log(convertedDate.format("MMM Do YYYY"));
        // TODO show event data with game
        }
      })
    }
  }
})

// TODO Show list of flights for game time period in second column
// TODO User chooses flight
$("#game").change(function showFlights(){
  // TODO User enters their airport code

  // TODO Pull flights from user to game
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
})
})







// TODO plug id into 'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id='
// TODO get strStadiumLocation 
// TODO show staium location

// TODO Pull hotel info in game city for time period

// TODO Show hotel info in third column
