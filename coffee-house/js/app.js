'use strict'
import myData from "./product.json" assert { type: "json" };

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


// render Menu



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



const loadMoreButton = document.querySelector('.add-btn');



renderMenu();
hideExtraCard ();




 
function hideExtraCard () {
  const activeTab = document.querySelector('.show')
  const shownCards = activeTab.childNodes;
 
  for(let i=4; i <shownCards.length; i++ ){
    shownCards[i].classList.add('hideCard');
    }

    if(!loadMoreButton.classList.contains('add-btn--activ')) {
      toggleMoreBtn ()
    }

    
 
   
}

  function renderMenu() {
const parentTab = document.querySelector('.tabs__content');
    parentTab.innerHTML = ''
  const cardsArray = createMenuCard(myData);
  const tabsCont = createMenuTab(cardsArray);
  

  cardsArray.forEach(i => {
    let type = i.category;
    tabsCont.forEach(div => {
      if (div.getAttribute('data-menu') == type) {
        div.append(i.generateMenuCard())
      }
    })
  })

  tabsCont.forEach(i => parentTab.append(i));
  
}

function createMenuCard(data) {
  const menuCards = [];
  data.forEach(card => {
    menuCards.push(new MenuCard(card))
  })
    return menuCards;
  }


function createMenuTab(obj) {
  const tabs = []
  const categorySet = new Set();
  obj.forEach(item => categorySet.add(item.category));
  categorySet.forEach(i => {
    const tab = document.createElement('div');
    tab.classList.add("tabs__content-item");
    if(i === 'coffee') {
      tab.classList.add('show')
    }
    tab.setAttribute('data-menu', i);
    tabs.push(tab)
  })
  return tabs;
}


/// Tabs

const tabsBtns = document.querySelectorAll('.tabs__btn-item');
const tabs = document.querySelectorAll('.tabs__content-item');

tabsBtns.forEach( btn => btn.addEventListener('click', showSelectMenuTab))

function showSelectMenuTab(e) {
  tabsBtns.forEach( btn => {
      btn.classList.remove('tabs__btn-item--active');
      e.currentTarget.classList.add('tabs__btn-item--active');
    })

    tabs.forEach(tab => {
      tab.classList.remove('show');
    })
    const taabAttribute = e.currentTarget.innerText.toLowerCase();
    const shownTab = document.querySelector(`[data-menu=${taabAttribute}]`);
    shownTab.classList.add('show');

    

    if(shownTab.childNodes.length >4 ) {
      hideExtraCard (); 
        }

    if(shownTab.childNodes.length <=4 && loadMoreButton.classList.contains('add-btn--activ')){
      toggleMoreBtn ()
    }
   
    
    
}


//Load More button



loadMoreButton.addEventListener('click', showMoreItems);

function showMoreItems () {

  const hideCard= document.querySelectorAll('.hideCard');
  hideCard.forEach(card => card.classList.remove('hideCard'));
  toggleMoreBtn ()
   
}

function toggleMoreBtn () {
  loadMoreButton.classList.toggle('add-btn--activ')
}



const mediaQuery = window.matchMedia('(max-width: 768px)')
mediaQuery.addListener(handleTabletChange)

function handleTabletChange(e) {
  
  if (e.matches && document.querySelector('show').childNodes.length > 4) {

    hideExtraCard ();
    
  }
}















