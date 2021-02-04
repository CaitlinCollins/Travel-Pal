const settings = {
  async: true,
  crossDomain: true,
  url: "https://google-translate20.p.rapidapi.com/translate",
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "x-rapidapi-key": "aa0fcad8b2msh86b04d71f9f4ab5p1463a5jsn539a4a4083a9",
    "x-rapidapi-host": "google-translate20.p.rapidapi.com",
  },
  data: {
    text: "",
    tl: "",
    sl: "en",
  },
};
//set up for click to grab phrase
$(document).ready(function () {
  $("#langSel").click(function (event) {
    $("phraseOutput").empty();
    $(".translate-option").toggle("show");
  });
  $(".dropdown-item").on("click", function (event) {
    settings.data.text = $("#phraseInput").val();
    settings.data.tl = $(this).attr("tolang");
    console.log(settings.data.tl);
    console.log(settings.data.text);
    translate();
  });
});
//translation function that initializes ajax call
function translate() {
  $.ajax(settings).done(function (response) {
    var translatedPhrase = response.data.translation;

    $("#phraseOutput").text(translatedPhrase);
    $(".translate-option").toggle("hide");
  });
}
