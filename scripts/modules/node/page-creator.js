const fs = require('fs');
let fileName = './index.html';



function createPage (current,next,currentStartDate,currentEndDate,nextStartDate,nextEndDate){
    let currentCards = '';
    let nextCards = '';

    current.forEach(el => {
      

   
      
      currentCards  += 
      `<div style="margin:1rem;padding: 1rem;" >
      <div class="card bg-dark" style="width: 18rem;height:100%;">
        <img class="card-img-top gameImage" src="${el?.img}" alt="currentGame">
        <div class="card-body" style="display: flex; flex-direction: column; height: 100%;">
          <p class="card-title text-light fw-bold gameTitle">${el?.name}</p>
          <p class="card-text text-light gameDesc">${el?.desc}</p>

          

          <a target="_blank" href="https://store.epicgames.com/en-US/p/${el?.link}" class="btn btn-primary" style="margin-top: auto;">Open Page <img style="height:32px; width:32px;filter: invert(1);" src="./img/arrow-right.png" alt=""></a>
        </div>
      </div>
    </div>`



      

    });
 
    next.forEach(el => {
     

  
      nextCards  += `<div style="margin:1rem;padding: 1rem;" >
      <div class="card bg-dark" style="width: 18rem;height:100%;">
        <img class="card-img-top gameImage" src="${el?.img}" alt="nextGame">
        <div class="card-body" style="display: flex; flex-direction: column; height: 100%;">
          <p class="card-title text-light fw-bold gameTitle">${el?.name}</p>
          <p class="card-text text-light gameDesc">${el?.desc}</p>
          <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="btn btn-primary" style="margin-top: auto;"><p class="datelink"></p></a>
          
        </div>
      </div>
    </div>`

    });

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
        #currentStartHead{
          font-size: 0.9rem;
          font-weight: 300;
        }
        #NextStartHead{
          font-size: 0.9rem;
          font-weight: 300;
        }

        .card-title{
          font-size: 1.25rem;
        }

        .navbar-epic-dark{
          background-color:#2a2a2a!important;
        }

        .epic-dark{
          background-color:rgb(28, 28, 28)!important;
        }


        </style>
        <link rel="manifest" href="./manifest.json">
        <link rel="apple-touch-icon" href="img/apple_touch_icon.png">
        <meta name="theme-color" content="#212529"/>
      </head>
      <body>
        <nav class="navbar bg-dark text-bg-dark ">
          <div class="container">
            <a class="navbar-brand" href="https://github.com/Brajo280603/FreeEpicGamesApp">
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
            <h3 id="currentStartHead">Starts From ${currentStartDate} -- Ends On ${currentEndDate}</h3>
          <div class="gameCards">
            ${currentCards}
          </div>
        </div>
        <div>
        <h2>Upcoming Free Game</h2>
        <h3 id="NextStartHead">Starts From ${nextStartDate} -- Ends On ${nextEndDate}</h3>
        <div class="gameCards">
          ${nextCards}   
        </div>
        </div>

      
        
        <p class="hidethis" id="currStart">${currentStartDate}</p>
        <p class="hidethis" id="currEnd">${currentEndDate}</p>
        <p class="hidethis" id="nextStart">${nextStartDate}</p>
        <p class="hidethis" id="nextEnd">${nextEndDate}</p>
        
      </div>
      </body>
      <script src="./scripts/client/offline.js"></script>
      <script src="./scripts/modules/client/datecalc.js"></script>
      </html>`
    


    fs.writeFile(fileName, data, (err) => {
  
    });


    return data
   

}


module.exports = {createPage}
