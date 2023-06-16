let responseBackup = {};
let gamesData = []


let currents = [] ;
let nexts = [];

async function getGames(){
    let res = fetch("https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions")
    res = (await res).json();
    
    res = await res;
    
    responseBackup = await res;
    await res?.data?.Catalog?.searchStore?.elements?.forEach(el => {
        if(el.promotions){
          gamesData.push(el);
        }
    })

  
    let gamesInfo = []



gamesData.forEach(el => {
    let date;
    let isaval;
    if(el?.promotions?.upcomingPromotionalOffers.length){
        date = el?.promotions?.upcomingPromotionalOffers;
        isaval = false;
    }else if(el?.promotions?.promotionalOffers.length){
        date = el?.promotions?.promotionalOffers;
        isaval = true;
    }

    if(Array.isArray(date)){
      date = date[0]?.promotionalOffers[0];
    }



    let img;
    el?.keyImages.forEach(el => {
        if(el?.type == "Thumbnail"){
            img = el?.url;
        }})
   

    
    el?.keyImages?.forEach(el=>{
        if(!img){
            if(el?.type == "VaultClosed"){
                img = el?.url;
            }
        }
    })
    

    let game = {

        "name":el?.title,
        "desc":el?.description,
        "link":el.productSlug?el.productSlug:el.offerMappings[0].pageSlug?el.offerMappings[0].pageSlug:"",
        "start_date": new Date(date?.startDate),
        "end_date": new Date(date?.endDate),
        "is_available": isaval,
        "img": img
    }

    gamesInfo.push(game);


})


gamesInfo.forEach(el=>{
    if(el?.is_available){
        currents.push(el);
    }else{
        nexts.push(el)
    }
})



let currentStartDate = currents[0]?.start_date.toISOString();
let currentEndDate = currents[0]?.end_date.toISOString();
let nextStartDate = nexts[0]?.start_date.toISOString();
let nextEndDate = nexts[0]?.end_date.toISOString();



    return {currents,nexts,currentStartDate,currentEndDate,nextStartDate,nextEndDate};
}


module.exports = {getGames}