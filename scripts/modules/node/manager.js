const {getGames} = require('./game-info.js')
const {createPage} = require('./page-creator.js')

async function startPage() {
    let res = await getGames();

    console.log(res);


    let data = createPage(res.currents,res.nexts,res.currentStartDate,res.currentEndDate,res.nextStartDate,res.nextEndDate);

    console.log(data);
}

module.exports = {startPage};