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
  constructor (id, url, name, description, price, category) {
      this.id = id;
      this.url = url;
      this.name = name;
      this.description = description;
      this.price = price;
      this.category = category;
      
  }

    generateMenuCard () {
      const card = document.createElement('div');
      card.className = "item-card";
      card.setAttribute('data-id', this.id);

      card.innerHTML = `
              <div class="img-wrapper">
                <img class="item-card__img" src=${this.url} alt=${this.name}>
              </div>

              <div class="item-card__descr">
                <h3 class="item-title">${this.name}</h3>
                <p class="section-text">${this.description}</p>
                <p class="item-price">${this.price}</p>
              </div>
      `
      return card;
    }

}



