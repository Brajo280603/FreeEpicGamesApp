import { getGames } from './game-info.mjs'
import { createPage } from './page-creator.mjs'

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

export { startPage }
