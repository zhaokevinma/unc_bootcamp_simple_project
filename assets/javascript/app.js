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

        var gamesURL = "https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=" + data[d].teamID;
        console.log('Games', gamesURL);
        $.ajax({
          url: gamesURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
        })
        // TODO Pull team schedule
        // TODO Show schedule in first column
        // TODO User chooses game
    }
  }
})



// TODO User enters their airport code
// TODO Pull flights from user to game

// TODO Show list of flights for game time period in second column
// TODO User chooses flight

// TODO Pull hotel info in game city for time period
// TODO Show hotel info in third column
})
// CALL =========================================
