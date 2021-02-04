const currentHour = moment().format("H");
console.log(currentHour);

function changeMode() {
  // Set the stylesheet to Night Mode if the time between 12am and 6am.
  if (0 <= currentHour && currentHour <= 6) {
    if (theme.getAttribute("href") == "daystyle.css") {
      theme.setAttribute("href", "nightstyle.css");
    }
  }
  // // Set the stylesheet to Day Mode if time is between 7am and 7pm.
  else if (6 < currentHour && currentHour <= 18) {
    if (theme.getAttribute("href") == "nightstyle.css") {
      theme.setAttribute("href", "daystyle.css");
    }
    // Set the stylesheet to Night Mode if the time is between 7pm and 12am.
  } else if (18 < currentHour && currentHour <= 24) {
    if (theme.getAttribute("href") == "daystyle.css") {
      theme.setAttribute("href", "nightstyle.css");
    }
  }
}
changeMode();
