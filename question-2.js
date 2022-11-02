// Question 2
/*
- Make a call to the Rawg API.
- Loop through the results and display the following properties in HTML, but only for the first eight results:
    name
    rating
    number of tags (not the tag details, just the amount of tags)
    
- The styling for this assignment is not important but loading indicator should be displayed while the API call is in progress. 
- Be sure to handle any potential errors in the code.

- You can use either regular promise or async/await syntax to make the call.
*/

const apiKey = "bdf18b4af36049e9872643a5b35c39fc";
const url =
  "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=";
const games = [];
const header = document.querySelector(".header");
const resultContainer = document.querySelector(".results");

const fetchGames = async () => {
  try {
    header.innerHTML =
      "<div id='loading'><img src='./images/icons/loading.gif'/></div>";
    const response = await fetch(url + apiKey);
    const results = await response.json();
    let data = results.results;
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};

const displayGames = async (games) => {
  fetchGames()
    .then((data) => {
      for (let i = 0; i < 8; i++) {
        const name = data[i].name;
        const rating = data[i].rating;
        const tags = data[i].tags.length;
        games.push({ name, rating, tags });
        header.innerHTML = "<h2>Games:</h2>";
      }
    })
    .then(() => {
      games.forEach((game) => {
        resultContainer.innerHTML += `<div class="game">
            <h3 class="">${game.name}</h3>
            <p>Rating: ${game.rating}</p>
            <p>Tags: ${game.tags}</p>
        </div>`;
      });
    });
};


displayGames(games);
