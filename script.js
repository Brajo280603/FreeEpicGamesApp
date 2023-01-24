// const { getGames } = require("epic-free-games");

// getGames("IN", true).then(res => {
//   // Do something
//   console.log(res);
// }).catch(err => {
//   // Do something
// });

fetch("https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=IN").then(
  res => console.log(res.json())
)

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords.latitude, position.coords.longitude);
});
