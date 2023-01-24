fetch("https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions")
.then((response) => response.json())
.then((data) => data.data.Catalog.searchStore.elements.forEach(el=>console.log(el.title)));