'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const logInForm = document.querySelector("#logInForm");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// lesson 1

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
//2
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
//2

let login = localStorage.getItem('Delivery');

function toggleModalAuth(){
  loginInput.style.borderColor = '';
  modalAuth.classList.toggle('is-open');
}


function authorized(){
  console.log('avtorizovan');

  function logOut(){
    login = null;
localStorage.removeItem('Delivery');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
buttonOut.removeEventListener('click', logOut)
    checkAuth();
returnMain();
  }
  console.log('авторизован');
  //buttonAuth.style.backgroundColor = 'red'; меняет цвет кнопки\

userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
buttonOut.addEventListener('click', logOut)
}


function notAuthorized(){
  console.log('не авторизован');

  function logIn(event){
    event.preventDefault(); //не дает обновлять страничку после submit

if(valid(loginInput.value)){    //mask valid
    login = loginInput.value;
localStorage.setItem('Delivery', login);
    toggleModalAuth();
    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset(); //очистка поля ввода
    checkAuth();
  } else{
    loginInput.style.borderColor = 'red';
  }
  }
  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function checkAuth(){
  if(login){
    authorized();
  }else {
    notAuthorized();
  }
}

checkAuth();

// lesson 2
function returnMain() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}

function createCardRestaurant(){
  const card = `
  <a class="card card-restaurant">
    <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">Тануки</h3>
        <span class="card-tag tag">60 мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          4.5
        </div>
        <div class="price">От 1 200 ₽</div>
        <div class="category">Суши, роллы</div>
      </div>
    </div>
  </a>
  `;
  cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();

function createCardGood(){

  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
    <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">Пицца Классика</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
          грибы.
        </div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">510 ₽</strong>
      </div>
    </div>
  `);
  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event){
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');

  if(restaurant){
  if(login){
    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

createCardGood();
createCardGood();
createCardGood();
}else{
  toggleModalAuth();
}
}
}
cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', returnMain);
checkAuth();


//swiper
new Swiper ('.swiper-container',{
  loop: true, // анлим прокрутка
  autoplay: {
  delay: 1000, //speed view
},
sliderPerView: 1
})
//swiper
// mask
const valid = function(str){
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
  return nameReg.test(str); //test подставляет строку для тест
}
//mask
