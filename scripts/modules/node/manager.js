const { getGames } = require('./game-info.js').default
const { createPage } = require('./page-creator.js')

async function startPage () {
  const res = await getGames()

  console.log(res)

  const data = createPage(
    res.currents,
    res.nexts,
    res.currentStartDate,
    res.currentEndDate,
    res.nextStartDate,
    res.nextEndDate
  )

  console.log(data)
}

export default { startPage }
