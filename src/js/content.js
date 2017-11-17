let adElems = []
if (location.href.includes('feixiaohao')) {
  adElems.push(
    ...Array.from(document.getElementsByClassName('outLink')),
    ...Array.from(document.getElementsByClassName('outlink02')),
  )
} else {   // coinmarketcap
  adElems.push(
    document.getElementById('icobanner-wrapper'),
    document.getElementById('leaderboard'),
    document.getElementById('title'),
  )
}
adElems.forEach(elem => {elem.parentNode.removeChild(elem)})
