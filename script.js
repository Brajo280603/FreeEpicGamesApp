let gamesData = []
const fs = require('fs');
let fileName = './index.html';

let currents = [] ;
let nexts = [];

getGames();

async function getGames(){
    let res = fetch("https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions")
    res = (await res).json();
    
    res = await res;
    res.data.Catalog.searchStore.elements.forEach(el => {
        gamesData.push(el);
    })

    // console.log(res);
    let gamesInfo = []

// console.log(gamesData);

gamesData.forEach(el => {
    let date;
    let isaval;
    if(el.promotions.upcomingPromotionalOffers.length){
        date = el.promotions.upcomingPromotionalOffers;
        isaval = false;
    }else if(el.promotions.promotionalOffers.length){
        date = el.promotions.promotionalOffers;
        isaval = true;
    }
    date = date[0].promotionalOffers[0];



    let img;
    el.keyImages.forEach(el => {
        if(el.type == "Thumbnail"){
            img = el.url;
        }})
    console.log(img);

    
    el.keyImages.forEach(el=>{
        if(!img){
            if(el.type == "VaultClosed"){
                img = el.url;
            }
        }
    })
    

    let game = {

        "name":el.title,
        "desc":el.description,
        "link":el.productSlug?el.productSlug:"",
        "start_date": new Date(date.startDate),
        "end_date": new Date(date.endDate),
        "is_available": isaval,
        "img": img
    }

    gamesInfo.push(game);


})

// console.log(gamesInfo);

gamesInfo.forEach(el=>{
    if(el.is_available){
        currents.push(el);
    }else{
        nexts.push(el)
    }
})

console.log(currents,nexts);

let currentStartDate = currents[0].start_date.toLocaleString();
let currentEndDate = currents[0].end_date.toLocaleString();
let nextStartDate = nexts[0].start_date.toLocaleString();
let nextEndDate = nexts[0].end_date.toLocaleString();

createPage(currents,nexts,currentStartDate,currentEndDate,nextStartDate,nextEndDate);
}


// .then((data) => data.data.Catalog.searchStore.elements.forEach(el=>console.log(el.title)));

// console.log(gamesData);


// const { getGames } = require("epic-free-games");






// getGames("IN", true).then(res => {
//   // Do something
//   // console.log(res.currentGames);
//   // console.log(res);
//   currents = res.currentGames;
//   nexts = res.nextGames;

//   // nexts.forEach(el=>{
//   //   console.log(el.offerMappings[0].pageSlug)
//   // })
  
//   createPage(currents,nexts);


//   // console.log(res.nextGames);
// }).catch(err => {
//   // Do something
// });



function createPage (current,next,currentStartDate,currentEndDate,nextStartDate,nextEndDate){
    let currentCards = '';
    let nextCards = '';
    // console.log(current,next);
    console.log(` msg before current`);
    current.forEach(el => {
      // console.log(el);

   
      
      currentCards  += 
      `<div style="margin:1rem;padding: 1rem;" >
      <div class="card bg-dark" style="width: 18rem;height:100%;">
        <img class="card-img-top gameImage" src="${el.img}" alt="currentGame">
        <div class="card-body" style="display: flex; flex-direction: column; height: 100%;">
          <h5 class="card-title text-light fw-bold gameTitle">${el.name}</h5>
          <p class="card-text text-light gameDesc">${el.desc}</p>

          

          <a target="_blank" href="https://store.epicgames.com/en-US/p/${el.link}" class="btn btn-primary" style="margin-top: auto;">Open Page <img style="height:32px; width:32px;filter: invert(1);" src="./img/arrow-right.png" alt=""></a>
        </div>
      </div>
    </div>`



      

    });
  console.log(` msg after current`);
    next.forEach(el => {
      // console.log(el);

      let date = el.start_date.toISOString()

        
    //   <a target="_blank" href="https://store.epicgames.com/en-US/p/${el.link}" class="btn btn-primary" style="margin-top: auto;">Open Page <img style="height:32px; width:32px;filter: invert(1);" src="./img/arrow-right.png" alt=""></a>
      
      nextCards  += `<div style="margin:1rem;padding: 1rem;" >
      <div class="card bg-dark" style="width: 18rem;height:100%;">
        <img class="card-img-top gameImage" src="${el.img}" alt="nextGame">
        <div class="card-body" style="display: flex; flex-direction: column; height: 100%;">
          <h5 class="card-title text-light fw-bold gameTitle">${el.name}</h5>
          <p class="card-text text-light gameDesc">${el.desc}</p>
          <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="btn btn-primary" style="margin-top: auto;"><p class="datelink"></p></a>
          <p class="hidethis">${date}</p>
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

        h6{
            font-size: 0.9rem;
            font-weight: 300;
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
        .hidethis{
            display:none;
        }
        .datelink{
            margin:0;
            padding:0;
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
            <h6>Starts From ${currentStartDate} -- Ends On ${currentEndDate}</h6>
          <div class="gameCards">
            ${currentCards}
          </div>
        </div>
        <div>
        <h2>Upcoming Free Game</h2>
        <h6>Starts From ${nextStartDate} -- Ends On ${nextEndDate}</h6>
        <div class="gameCards">
          ${nextCards}   
        </div>
        </div>

      
        

        
      </div>
      </body>
      <script src="offline.js"></script>
      <script src="datecalc.js"></script>
      </html>`
    


    fs.writeFile(fileName, data, (err) => {
      if (err)
        console.log(err);
      else {
        console.log(data);
        console.log("Page created successfully!\n");
      }
    });



   

}







