const imgNodes = document.querySelectorAll('.pin-item-wrap img')
const infoNodes = document.querySelectorAll('.pin-info-title')
const priceNodes = document.querySelectorAll('.pin-info-price .fl .price')
const favNodes = document.querySelectorAll('.pin-info-price .fav')
const data = {pop: []}
for (let i = 0; i < imgNodes.length; i++) {
  let item = {
    img: imgNodes[i].src,
    title: infoNodes[i].textContent.replace(/\s+/g,''),
    price: Number.parseFloat(priceNodes[i].textContent.slice(1)),
    fav: Number.parseInt(favNodes[i].textContent)
  }
  data.pop.push(item)
}
console.log(JSON.stringify(data.pop))