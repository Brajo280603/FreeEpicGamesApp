// let responseBackup = {}
const gamesData = []

const currents = []
const nexts = []

async function getGames () {
  let res = fetch(
    'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions'
  )
  res = (await res).json()
  res = await res
  // responseBackup = await res;
  await res?.data?.Catalog?.searchStore?.elements?.forEach((el) => {
    if (el.promotions) {
      gamesData.push(el)
    }
  })

  return parseGames(gamesData)
}

function parseGames (gamesData) {
  const gamesInfo = []

  gamesData.forEach((game) => {
    let gameInfo = {
      data: '',
      free: false
    }
    gameInfo = ifFree(game)
    if (gameInfo.free) {
      gamesInfo.push(gameInfo.data)
    }
  })

  gamesInfo.forEach((el) => {
    if (el?.is_available) {
      currents.push(el)
    } else {
      nexts.push(el)
    }
  })

  const currentStartDate = currents[0]?.start_date.toISOString()
  const currentEndDate = currents[0]?.end_date.toISOString()
  const nextStartDate = nexts[0]?.start_date.toISOString()
  const nextEndDate = nexts[0]?.end_date.toISOString()

  return {
    currents,
    nexts,
    currentStartDate,
    currentEndDate,
    nextStartDate,
    nextEndDate
  }
}

function ifFree (game) {
  let date
  let isaval
  // if (game?.promotions?.upcomingPromotionalOffers.length) {
  //   date = game?.promotions?.upcomingPromotionalOffers
  //   isaval = false
  // } else if (game?.promotions?.promotionalOffers.length) {
  //   date = game?.promotions?.promotionalOffers
  //   isaval = true
  // }

  if (game?.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0]?.discountSetting?.discountPercentage === 0) {
    date = game?.promotions?.upcomingPromotionalOffers
    isaval = false
  } else if (game?.promotions?.promotionalOffers.length && game?.price?.totalPrice?.discountPrice === 0) {
    date = game?.promotions?.promotionalOffers
    isaval = true
  }

  if (Array.isArray(date)) {
    date = date[0]?.promotionalOffers[0]
  }

  let img
  game?.keyImages.forEach((game) => {
    if (game?.type === 'Thumbnail') {
      img = game?.url
    }
  })

  game?.keyImages?.forEach((game) => {
    if (!img) {
      if (game?.type === 'VaultClosed') {
        img = game?.url
      }
    }
  })

  return {
    name: game?.title,
    desc: game?.description,
    link: game?.productSlug
      ? game?.productSlug
      : game?.offerMappings[0]?.pageSlug
        ? game?.offerMappings[0]?.pageSlug
        : '',
    start_date: new Date(date?.startDate),
    end_date: new Date(date?.endDate),
    is_available: isaval,
    img
  }
}

export { getGames }
