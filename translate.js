// const settings = {
// 	async: true,
// 	crossDomain: true,
// 	url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
// 	method: "POST",
// 	headers: {
// 		"content-type": "application/x-www-form-urlencoded",
// 		// "accept-encoding": "application/gzip",
// 		"x-rapidapi-key": "f56af25d36mshce106e7a526f0dfp1a8712jsna55f57ba62d8",
// 		"x-rapidapi-host": "google-translate1.p.rapidapi.com",
// 	},
// 	data: {
// 		q: "",
// 		source: "en",
// 		target: "",
// 	},
// };

// $(document).ready(function () {
// 	$("#langSel").click(function (event) {
// 		$(".translate-option").toggle("show");
// 		// settings.data.target = $(this).attr("tolang");
// 		// translate();
// 		// $("#langSel").html($(this).html());

// 	});
// 	$('.dropdown-item').on('click', function(event){
// 		settings.data.target = $(this).attr('tolang');
// 		console.log(settings.data.target);
// 		translate();
		
// 	});
// });
// function translate() {
// 	$.ajax(settings).done(function (response) {
// 		console.log(response);

// 		var translatedPhrase = response.data[0].translatedPhrase;

// 		$(".phraseInput").text(translatedPhrase);
// 	});
// }

const settings = {
	async: true,
	crossDomain: true,
	url: "https://google-translate20.p.rapidapi.com/translate",
	method: "POST",
	headers: {
		"content-type": "application/x-www-form-urlencoded",
		"x-rapidapi-key": "aa0fcad8b2msh86b04d71f9f4ab5p1463a5jsn539a4a4083a9",
		"x-rapidapi-host": "google-translate20.p.rapidapi.com"
	},
	data: {
		text: "",
		tl: "",
		sl: "en"
	}
};

$(document).ready(function () {
	$("#langSel").click(function (event) {
		$('phraseOutput').empty();
		$(".translate-option").toggle("show");
		// settings.data.tl = $(this).attr("tolang");
		// translate();
		// $("#langSel").html($(this).html());
	});
	$('.dropdown-item').on('click', function(event){
		settings.data.text = ($('#phraseInput').val());
		settings.data.tl = $(this).attr('tolang');
		console.log(settings.data.tl);
		console.log(settings.data.text);
		translate();
		
	});

});

function translate() {
	$.ajax(settings).done(function (response) {
		console.log(response);
		console.log(response.data.translation);
		var translatedPhrase = response.data.translation;
		$('#phraseOutput').text(translatedPhrase);
		$('.translate-option').toggle('hide');

	});
}
