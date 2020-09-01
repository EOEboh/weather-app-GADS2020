
const form = document.querySelector(".top-side form");
const input = document.querySelector(".top-side input");
const msg = document.querySelector(".top-side .msg");
const showResults = document.querySelector(".bottom-side .results");

// my api details from openweathermap
const api = {
    key:"a4ebe081f0c56979bcbbe865881154ee",
baseUrl:"https://api.openweathermap.org/data/2.5/weather?"
}


// stopping the form from submitting by using preventDefault and then grabbing the user input in the search field
form.addEventListener("submit", e => {
  e.preventDefault();
  
  const inputVal = input.value;

  //using fetchapi method to send a request to the api
//    fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     // do stuff with the data
//   })
//   .catch(() => {
//     msg.textContent = "Please search for a valid city 😩";
//   });
  const url = `${api.baseUrl}q=${inputVal}&appid=${api.key}&units=metric`;
  console.log(url)

  fetch(url)
    .then(response => response.json()) 
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@4x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}<br/>Feels like
          ${main.feels_like}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      showResults.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please enter a valid city";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});

