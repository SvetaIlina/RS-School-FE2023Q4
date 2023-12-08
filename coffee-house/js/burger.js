export default function displayBurger() {
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
  }