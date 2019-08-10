// VARS =========================================

// FUNCTIONS ====================================
$("document").ready(function () {
  // TODO User chooses team

  $("#league").change(function chooseTeam() {
    var league = $(this);
    console.log("league: ", league.val());

    switch (league.val()) {
      case "NBA":
        console.log('NBA');
        $("#team").empty();
        $("#team").append("<option>NBA</option>");
        break;
      case "WNBA":
        console.log('WNBA');
        $("#team").empty();
        $("#team").append("<option>WNBA</option>");
        break;
      case "NFL":
        console.log('NFL');
        $("#team").empty();
        $("#team").append("<option>NFL</option>");
        break;
    }
  })
// TODO Pull team schedule
// TODO Show schedule in first column
// TODO User chooses game
// TODO User enters their airport code
// TODO Pull flights from user to game
// TODO Show list of flights for game time period in second column
// TODO User chooses flight
// TODO Pull hotel info in game city for time period
// TODO Show hotel info in third column
})
// CALL =========================================
