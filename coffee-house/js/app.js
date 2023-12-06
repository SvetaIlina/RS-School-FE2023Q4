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

const parentTab = document.querySelector('.tabs__content');
parentTab.addEventListener('click', showModal)

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
// const parentTab = document.querySelector('.tabs__content');
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
  
  if (e.matches && document.querySelector('.show').childNodes.length > 4) {

    hideExtraCard ();
    
  }
}


///Modal

class Modal {
  constructor ({id, url, name, description, price, sizes, additives}) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.description = description;
    this.price = price;
    this.sizes = sizes;
    this.additives = additives;
        
}

 generateModal () {
   const modalCard = this.createDomNode('div', 'modal__inner');
   modalCard.setAttribute('data-idmodal', this.id)
  
  modalCard.append(this.createImgContent());
  modalCard.append(this.createContent());

  modalCard.addEventListener('click', this.showTotalSum);

return modalCard;


}

createDomNode(element, ...classes) {
  const node = document.createElement(element);
  node.classList.add(...classes);
  return node
}

createImgContent () {
  const modalImg = this.createDomNode('div', 'modal-img');
  modalImg.innerHTML = `
  <div class="modal-img__wrapper">
      <img src=${this.url} alt=${this.name}>
  </div>
  `
  return modalImg
}



createContent() {
  const content = this.createDomNode('div', 'modal-content');
  content.innerHTML = `
                        <div class="item__descr">
                            <h3 class="item-title modal-title">${this.name}</h3>
                            <p class="section-text">${this.description}</p>
                        </div>
                       
  `
  content.append(this.createSizeBtn())
  content.append(this.createAdditivesBtn())

  content.innerHTML += ` <div class="item__total">
  <h3 class="item-title">Total:</h3>
  <p class="item-price" id="total" data-price=${this.price}>$${this.price}</p>
  </div>
  <p class="warning">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
  <button class="close-modal">Close</button>
  `
   return content
}


 createSizeBtn() {
  const itemSizes = this.createDomNode('div', 'item__size');
  const btnWrap = this.createDomNode('div', 'btn__wrapper' );
  const sizeBtns = []
  itemSizes.innerHTML = '<h5 class="section-text">Size</h5>'

  for ( let key in this.sizes) {
      const btn =  this.createDomNode('button', 'modal__item-btn');
      btn.setAttribute('data-addprice', this.sizes[key]["add-price"]);
       if(key == "s") {
        btn.classList.add('modal__item-btn--active');
       }
       btn.innerHTML = `
       <span class="choose">${key}</span>
       ${this.sizes[key]["size"]}
       `
       sizeBtns.push(btn)

  }

  sizeBtns.forEach( size => btnWrap.append(size));
  itemSizes.append(btnWrap)
  return itemSizes;
}

 createAdditivesBtn() {
  const itemAdditives = this.createDomNode('div', 'item__additives');
  const btnWrap = this.createDomNode('div', 'btn__wrapper' );
  const additivesBtns = []
  itemAdditives.innerHTML = '<h5 class="section-text">Additives</h5>'

  this.additives.forEach ((item, i) => {
    const btn =  this.createDomNode('button', 'modal__item-btn');
    btn.setAttribute('data-addprice', item["add-price"]);
    btn.innerHTML = `
    <span class="choose">${i+1}</span>
    ${item["name"]}
    `
    additivesBtns.push(btn)
  })

  additivesBtns.forEach (add => btnWrap.append(add));

  itemAdditives.append(btnWrap)
 
   return itemAdditives;
}


 showTotalSum (e) {
   const btn = e.target.closest('.modal__item-btn');
  if(btn) {
    showCheckedBtn (btn);
    changeSum(btn);
         }

  }

}

function changeSum (btn) {
  const parentContent = btn.closest('.modal-content');
  const activeBtns = parentContent.querySelectorAll('.modal__item-btn--active');
  const total = document.querySelector('#total');
  const baseSum = +total.getAttribute('data-price');
  let addPrice = 0;
  activeBtns.forEach(i => addPrice += +i.getAttribute('data-addprice'))
  total.innerText =`$${(baseSum + addPrice).toFixed(2)}`;

}


function showCheckedBtn (btn) {
    if (btn) {
    const parentItem = btn.parentElement
    const allBtns = parentItem.querySelectorAll('.modal__item-btn');

  if (parentItem.parentElement.classList.contains('item__size')) {
    allBtns.forEach (btn => btn.classList.remove('modal__item-btn--active'));
    btn.classList.add('modal__item-btn--active')
  }

  if (parentItem.parentElement.classList.contains('item__additives')) {
    btn.classList.toggle('modal__item-btn--active');
  }

 
  }
}

function showModal (e) {
 const targetCard = e.target.closest('.item-card');
 const dataId = targetCard.getAttribute('data-id');
 const dataForModal = myData.filter(i => i.id == dataId);
 const modal = new Modal(dataForModal[0])
 const overlay = document.createElement('div');
 overlay.classList.add('modal');
 overlay.append(modal.generateModal());
 document.body.append(overlay);
 document.body.style.overflow = 'hidden';

 overlay.addEventListener('click', closeModal);

}


function closeModal(e) {
  
  if(e.target.classList.contains('close-modal') || e.target.classList.contains('modal') ) {
    document.querySelector('.modal').remove();
    document.body.style.overflow = '';
}
}












