let adElems = Array.from(document.getElementsByClassName('outLink')).concat(Array.from(document.getElementsByClassName('outlink02')))
adElems.forEach(elem => {elem.parentNode.removeChild(elem)})
