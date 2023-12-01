//Burger

const burgerBtn = document.querySelector('.burger');
const menuLinks = document.querySelectorAll('.menu__list-link');
const menu = document.querySelector('.menu__list');




burgerBtn.addEventListener('click', showBurgerMenu);
menuLinks.forEach(link => {
    link.addEventListener('click', closeBurger);

});


function showBurgerMenu () {
    if (burgerBtn.classList.contains('burger--active')) {
        closeBurger()
    } else {
        openBurger()
            }
  }

  function openBurger() {
    burgerBtn.classList.add('burger--active');
    menu.classList.add('menu__list--active');
    document.body.style.overflow = 'hidden'
  }

  function closeBurger() {
    burgerBtn.classList.remove('burger--active');
    menu.classList.remove('menu__list--active');
    document.body.style.overflow = ''
  }


// render card

class MenuCard {
  constructor ({id, url, name, description, price, category}) {
      this.id = id;
      this.url = url;
      this.name = name;
      this.description = description;
      this.price = price;
      this.category = category;
      
      
  }

    generateMenuCard () {
      const card = document.createElement('div');
      card.classList.add("item-card");
      card.setAttribute('data-id', this.id);

      card.innerHTML = `
              <div class="img-wrapper">
                <img class="item-card__img" src=${this.url} alt=${this.name}>
              </div>

              <div class="item-card__descr">
                <h3 class="item-title">${this.name}</h3>
                <p class="section-text">${this.description}</p>
                <p class="item-price">$${this.price}</p>
              </div>
      `
      return card;
    }

}

 getData('js/product.json')
    .then(data => createMenuCard(data))
    .then(cards => renderMenu(cards))



  async function getData (url) {
    const response = await fetch(url);
    return await response.json();
 
  }

  function createMenuCard(data) {
  const menuCards = [];
  data.forEach(card => {
    menuCards.push(new MenuCard(card))
  })
    return menuCards;
  }


function renderMenu(cardsArr) {
  const menuContent = document.querySelector('.tabs__content');
  menuContent.innerHTML = ''
  const divs = createMenuTab(cardsArr);

  cardsArr.forEach(i => {
    let type = i.category;
    divs.forEach(div => {
      if (div.getAttribute('data-menu') == type) {
        div.append(i.generateMenuCard())
      }
    })
  })

  divs.forEach(i => menuContent.append(i))
}


function createMenuTab(obj) {
  const tabs = []
  const categorySet = new Set();
  obj.forEach(item => categorySet.add(item.category));
  categorySet.forEach(i => {
    const tab = document.createElement('div');
    tab.classList.add("tabs__content-item");
    if(!(i === 'coffee')) {
      tab.classList.add('hidden')
    } else {
      tab.classList.add('show')
    }
    tab.setAttribute('data-menu', i);
    tabs.push(tab)
  })
  return tabs;
}


const y = document.querySelectorAll('.products-menu')

console.log(y.parentElement);

// const mediaQuery = window.matchMedia('(max-width: 768px)')

// function handleTabletChange(e) {
//   if (e.matches) {
//     console.log('Media Query Matched!')
//   }
// }

// mediaQuery.addListener(handleTabletChange)
// handleTabletChange(mediaQuery)