// VARS =========================================

// FUNCTIONS ====================================
$("document").ready(function() {
  // User chooses team

  $("#league").change(function chooseTeam() {
    var league = $(this);
    console.log("league: ", league.val());

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
});

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

// TODO Show hotel info in third column
