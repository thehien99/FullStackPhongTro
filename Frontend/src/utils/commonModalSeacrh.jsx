export const getNumbersPrice = (string) => string.split(' ').map(item => +item).filter(item => !item === false)
export const getNumbersArea = (string) => string.split(' ').map(item => +item.match(/\d+/)).filter(item => item !== 0)

export const getCodePriceTo = (totals, min, max) => {
  return totals?.map(item => {
    let arrMaxmin = getNumbersPrice(item.value)
    return ({
      ...item,
      min: arrMaxmin.length === 2 ? arrMaxmin[0] : arrMaxmin[0] === min ? 0 : arrMaxmin[0],
      max: arrMaxmin.length === 2 ? arrMaxmin[1] : arrMaxmin[0] === max ? 9999999 : arrMaxmin[0]
    })
  })
}

export const getCodeAcreaTo = (totals, min, max) => {
  return totals?.map(item => {
    let arrMaxmin = getNumbersArea(item.value)
    return ({
      ...item,
      min: arrMaxmin.length === 2 ? arrMaxmin[0] : arrMaxmin[0] === min ? 0 : arrMaxmin[0],
      max: arrMaxmin.length === 2 ? arrMaxmin[1] : arrMaxmin[0] === max ? 99999999 : arrMaxmin[0]
    })
  })
}

export const getPriceSearchRange = (entry, prices, min, max) => {
  let priceMintoMax = getCodePriceTo(prices, min, max)
  return priceMintoMax?.filter(item => item.min <= entry && entry < item.max)
}

export const getAreaSearchRange = (entry, areas, min, max) => {
  let areaMintoMax = getCodeAcreaTo(areas, min, max)
  return areaMintoMax?.filter(item => item.min <= entry && entry < item.max)
}