$latRelay = "";
$lonRelay = "";
$cityInput = $("#cityInput");
$textArea = $("textarea");
$paintCity = $("#cityCountry");

$apiKey = "9ec8fa29518e4540182f9fb78ea5599d";

$fiveDay = $(".fiveDay");
$paintTemp = $("#temp");
$paintHumid = $("#humidity");

$translateThis = ("#phraseInput");
$translated = ("#outputArea");
$french = ("#fr");
$italian = ("#it");
$spanish = ("#de");


// $('.dropdown-item').on('click',function() {
//   console.log($(this).attr('tolang'))
// })
// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://kiara-translate.p.rapidapi.com/get_translated/",
// 	"method": "POST",
// 	"headers": {
// 		"content-type": "application/json",
// 		"x-rapidapi-key": "aa0fcad8b2msh86b04d71f9f4ab5p1463a5jsn539a4a4083a9",
// 		"x-rapidapi-host": "kiara-translate.p.rapidapi.com"
// 	},
// 	"processData": false,
// 	"data": "{\n    \"input\": \"We make the world a better place\",\n    \"lang\": \"ja\"\n}"
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });

// Hides certain elements on page load.
$("h4").hide();
$("#fiveDaySection").hide();

function currencyCodeGrab($country) {
	const settings = {
		async: true,
		crossDomain: true,
		url: "https://wft-geo-db.p.rapidapi.com/v1/geo/countries/" + $country,
		method: "GET",
		headers: {
			"x-rapidapi-key": "aa0fcad8b2msh86b04d71f9f4ab5p1463a5jsn539a4a4083a9",
			"x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
		},
	};
	// dont forget to create variables for the url above!

	$.ajax(settings).done(function (response) {
		console.log(response);
		console.log("this should be currency codes" + response.data.currencyCodes);
		$currencyCode = response.data.currencyCodes;
		$currencyKey = "fa753faa7a0842e89449dcd0c15c6c0c";
		$currencyUrl =
			"https://api.currencyfreaks.com/latest?apikey=" +
			$currencyKey +
			"&symbols=" +
			$currencyCode;

		$.ajax({
			url: $currencyUrl,
			method: "GET",
		}).then(function (response) {
			$currency_name = Object.keys(response.rates)[0];
			$currency_rate = Object.values(response.rates)[0];

			console.log($currency_name);
			console.log($currency_rate);
			var math = ($currency_rate * 100).toFixed(2);
			$displayCurrency = "You need: " + $currency_name;
			$displayRate = "Exchange Rate: " + $currency_rate;
			$displayMath = "100 USD = " + math + " " + $currency_name;
			$("#localCurrency").html(
				$displayCurrency + "<br>" + $displayRate + "<br>" + $displayMath
			);
		});
	});
}

//click event for search button that triggers the ajax routine
$("#citySearch").on("click", function () {
  event.preventDefault();
  colorChange();
  // Shows certain elements on click.
  $("h4").show();
  $("#fiveDaySection").show();
  $fiveDay.empty();
  $grabCity = $cityInput.val();
  console.log($grabCity);
  $queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    $grabCity +
    "&units=imperial&appid=" +
    $apiKey;

  $.ajax({
    url: $queryUrl,
    method: "GET",
  }).then(function (response) {
    $latRelay = response.coord.lat;
    $lonRelay = response.coord.lon;
    $country = response.sys.country;
    console.log(response);
    console.log(response.sys.country);
    $("#country").html($country);
    $oneCallUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      $latRelay +
      "&lon=" +
      $lonRelay +
      "&units=imperial" +
      "&appid=" +
      $apiKey;
    $paintCity.text(response.name);

    currencyCodeGrab($country);

    $.ajax({
      url: $oneCallUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      $dailyDate = [];
      $dailyIcons = [];
      $dailyHighTemp = [];
      $dailyLowTemp = [];
      $dailyHumidity = [];
      $forecastIcons = $(".icons");
      $forecastHumidty = $(".forecastHumidity");
      var iconUrl = "https://openweathermap.org/img/wn/";

      for (var i = 0; i < 5; i++) {
        var newDate = moment().add(i, "days").format("M/D/YYYY");
        $dailyDate.push(newDate);
      }
      for (var i = 0; i < 5; i++) {
        $saveHighTemp = response.daily[i].temp.max;
        $dailyHighTemp.push($saveHighTemp);
      }
      for (var i = 0; i < 5; i++) {
        $saveLowTemp = response.daily[i].temp.min;
        $dailyLowTemp.push($saveLowTemp);
      }

      for (var i = 0; i < 5; i++) {
        $saveIcons = response.daily[i].weather[0].icon;
        $dailyIcons.push($saveIcons);
      }
      for (var i = 0; i < 5; i++) {
        $saveHumidity = response.daily[i].humidity;
        $dailyHumidity.push($saveHumidity);
      }

      $fiveDay.each(function (index) {
        $(this).append("<p>" + $dailyDate[index] + "</p>");
        $(this).append(
          "<p>High: " + $dailyHighTemp[index].toFixed() + "&degF" + "</p>"
        );
        $(this).append(
          "<p>Low: " + $dailyLowTemp[index].toFixed() + "&degF" + "</p>"
        );
        $(this).append(
          "<img src=" + iconUrl + $dailyIcons[index] + ".png" + ">"
        );
        $(this).append("<p>Humidity: " + $dailyHumidity[index] + "%</p>");
      });
    });
    // This call's the funciton that generates the country name from the country code and paints it to the page! 
    countryName($country);
  });
});


function countryName($country) {
	const settings = {
		async: true,
		crossDomain: true,
		url: "https://wft-geo-db.p.rapidapi.com/v1/geo/countries/" + $country,
		method: "GET",
		headers: {
			"x-rapidapi-key": "f56af25d36mshce106e7a526f0dfp1a8712jsna55f57ba62d8",
			"x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
		},
	};

	$.ajax(settings).done(function (response) {
		console.log(response);
		var paintCountry = $("#country");
		var fullCountry = response.data.name;
		console.log(fullCountry);
		paintCountry.text(fullCountry);
	});
}

function colorChange() {
  var one = $("#one");
  var two = $("#two");
  var three = $("#three");
  var four = $("#four");
  var five = $("#five");
  var six = $("#six");
  var seven = $("#seven");
  var eight = $("#eight");
  var nine = $("#nine");

  setTimeout(function () {
    one.attr("id", "cTwo");
    four.attr("id", "cThree");
    seven.attr("id", "cOne");
  }, 200);
  setTimeout(function () {
    two.attr("id", "cTwo");
    five.attr("id", "cThree");
    eight.attr("id", "cOne");
  }, 400);
  setTimeout(function () {
    three.attr("id", "cTwo");
    six.attr("id", "cThree");
    nine.attr("id", "cOne");
  }, 600);
  setTimeout(function () {
    one.attr("id", "cThree");
    four.attr("id", "cOne");
    seven.attr("id", "cTwo");
  }, 800);
  setTimeout(function () {
    two.attr("id", "cThree");
    five.attr("id", "cOne");
    eight.attr("id", "cTwo");
  }, 1000);
  setTimeout(function () {
    three.attr("id", "cThree");
    six.attr("id", "cOne");
    nine.attr("id", "cTwo");
  }, 1200);
  setTimeout(function () {
    one.attr("id", "one");
    four.attr("id", "four");
    seven.attr("id", "seven");
  }, 1400);
  setTimeout(function () {
    two.attr("id", "two" );
    five.attr("id", "five");
    eight.attr("id", "eight");
  }, 1600);
  setTimeout(function () {
    three.attr("id", "three");
    six.attr("id", "six");
    nine.attr("id", "nine");
  }, 1800);
};
