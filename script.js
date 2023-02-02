const { getGames } = require("epic-free-games");
const fs = require('fs');

let fileName = './index.html';

let currents = [] ;
let nexts = [];
let images = []



getGames("IN", true).then(res => {
  // Do something
  // console.log(res.currentGames);
  // console.log(res);
  currents = res.currentGames;
  nexts = res.nextGames;

  // nexts.forEach(el=>{
  //   console.log(el.offerMappings[0].pageSlug)
  // })
  
  createPage(currents,nexts);


  // console.log(res.nextGames);
}).catch(err => {
  // Do something
});

function createPage (current,next){
    let currentCards = '';
    let nextCards = '';
    // console.log(current,next);
console.log(` msg before current`);
    current.forEach(el => {
      // console.log(el);

        let url = "";
      if (el.offerMappings.length != 0) {
        url = el.offerMappings[0].pageSlug ;
      }else if (el.productSlug != null){
        url = el.productSlug;
        }
      
      currentCards  += 
      `<div style="margin:1rem;padding: 1rem;" >
      <div class="card bg-dark" style="width: 18rem;height:100%;">
        <img class="card-img-top gameImage" src="${el.keyImages[2].url}" alt="currentGame">
        <div class="card-body" style="display: flex; flex-direction: column; height: 100%;">
          <h5 class="card-title text-light fw-bold gameTitle">${el.title}</h5>
          <p class="card-text text-light gameDesc">${el.description}</p>
          <a target="_blank" href="https://store.epicgames.com/en-US/p/${url}" class="btn btn-primary" style="margin-top: auto;">Open Page <img style="height:32px; width:32px;filter: invert(1);" src="./img/arrow-right.png" alt=""></a>
        </div>
      </div>
    </div>`



      

    });
  console.log(` msg after current`);
    next.forEach(el => {
      //console.log(el);
      let url = "";
      if (el.offerMappings.length != 0) {
        url = el.offerMappings[0].pageSlug ;
      }else if (el.productSlug != null){
        url = el.productSlug;
        }
      
      nextCards  += `<div style="margin:1rem;padding: 1rem;" >
      <div class="card bg-dark" style="width: 18rem;height:100%;">
        <img class="card-img-top gameImage" src="${el.keyImages[2].url}" alt="currentGame">
        <div class="card-body" style="display: flex; flex-direction: column; height: 100%;">
          <h5 class="card-title text-light fw-bold gameTitle">${el.title}</h5>
          <p class="card-text text-light gameDesc">${el.description}</p>
          <a target="_blank" href="https://store.epicgames.com/en-US/p/${url}" class="btn btn-primary" style="margin-top: auto;">Open Page <img style="height:32px; width:32px;filter: invert(1);" src="./img/arrow-right.png" alt=""></a>
        </div>
      </div>
    </div>`

    });
console.log(`message`);

    let data = 
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="A webApp that shows the current available free games on the Epic Games Store">
        <title>Free Games</title>
        <link rel="stylesheet" href="./bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/css/bootstrap.css">
        <script src="./bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/js/bootstrap.js"></script>
        <style>
        html,body{
          background-color: #343a40; color:lightgrey;
        }
        
        .gameDesc {
          font-size:0.8rem;
          font-weight: 300;
        }

        @media (min-width: 718px) {
          .gameCards{
            display:flex;
            justify-content: evenly;
            align-items:stretch;
          }
        }

        @media (max-width: 718px){
          .gameCards{
            display:flex;
            justify-content: evenly;
            align-items:center;
            flex-direction:column;
          }
        }
        .removeBtnStyle{
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
        }

        </style>
        <link rel="manifest" href="./manifest.json">
        <link rel="apple-touch-icon" href="img/apple_touch_icon.png">
        <meta name="theme-color" content="#212529"/>
      </head>
      <body>
        <nav class="navbar bg-dark text-bg-dark ">
          <div class="container">
            <a class="navbar-brand" href="#">
            <img src="./img/maskable_icon_x384.png" alt="Free Games" width="50" height="50">
            </a>

            <button id="downloadBtn" class="navbar-right removeBtnStyle" onclick="triggerInstall()" style="display: none;">
              <img src="./img/download.png" alt="download" width="30" height="30" style="filter: invert(1);">
            </button>
            <!--<button onclick="notifyMe()">notification</button>-->
          </div>
        </nav>
      <div style="margin:1rem">
        <div>
        <h2>Current Free Game</h2>
          <div class="gameCards">
            ${currentCards}
          </div>
        </div>
        <div>
        <h2>Upcoming Free Game</h2>
        <div class="gameCards">
          ${nextCards}   
        </div>
        </div>

      


        
      </div>
      </body>
      <script src="offline.js"></script>
      </html>`
    


    fs.writeFile(fileName, data, (err) => {
      if (err)
        console.log(err);
      else {
        console.log("Page created successfully!\n");
      }
    });



   

}







