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

  createPage(currents,nexts);


  // console.log(res.nextGames);
}).catch(err => {
  // Do something
});

function createPage (current,next){
    let currentCards = '';
    let nextCards = '';
    // console.log(current,next);

    current.forEach(el => {
      // console.log(el);
      currentCards  += `<div style="margin:1rem;padding: 1rem;" >
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${el.keyImages[2].url}" alt="currentGame">
        <div class="card-body">
          <h5 class="card-title">${el.title}</h5>
          <p class="card-text">${el.description}</p>
          <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
        </div>
      </div>
    </div>`

    });

    next.forEach(el => {
      // console.log(el);
      nextCards  += `<div style="margin:1rem;padding: 1rem;" >
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${el.keyImages[2].url}" alt="currentGame">
        <div class="card-body">
          <h5 class="card-title">${el.title}</h5>
          <p class="card-text">${el.description}</p>
          <!--<a href="#" class="btn btn-primary">Go somewhere</a>-->
        </div>
      </div>
    </div>`

    });


    let data = `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>EGSF</title>
      <link rel="stylesheet" href="./bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/css/bootstrap.css">
      <script src="./bootstrap-5.3.0-alpha1-dist/bootstrap-5.3.0-alpha1-dist/js/bootstrap.js"></script>
    </head>
    <body>
      <nav class="navbar bg-light text-bg-dark ">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img src="./img/maskable_icon_x384.png" alt="E" width="30" height="24">
          </a>
        </div>
      </nav>
    
      <div>
        <h4>currents:</h4>
        <div>
          ${currentCards}
        </div>
      </div>
      <div>
        <h4>nexts:</h4>
        <div>
          ${nextCards}
        </div>
      </div>
    </body>
    <!-- <script src="bundle.js"></script> -->
    </html>`


    fs.writeFile(fileName, data, (err) => {
      if (err)
        console.log(err);
      else {
        console.log("Page created successfully!\n");
      }
    });

   

}







fs.writeFile("./checkforworkflowcheckagain.js","checkingjust",(err) => {
  if (err)
    console.log(err);
  else {
    console.log("workflowcheck\n");
  }
}
);