'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const logInForm = document.querySelector("#logInForm");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const restaurantTitle = document.querySelector('.restaurant-title');
const rating = document.querySelector('.rating');
const minPrice = document.querySelector('.price');
const category = document.querySelector('.category');
const inputSearch = document.querySelector('.input-search');
const modalBody = document.querySelector('.modal-body');
const modalPrice = document.querySelector('.modal-pricetag');
const buttonClearCart = document.querySelector('.clear-cart');

let login = localStorage.getItem('Delivery');

const cart = [];

const getData = async function (url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(` Ошибка по адресу ${url},
    статус ошибки ${response.status}!  `);
    }
    return await response.json();
};

modalBody.addEventListener('click', changeCount);





function toggleModalAuth() {
    loginInput.style.borderColor = '';
    modalAuth.classList.toggle('is-open');
}






function authorized() {
    console.log('avtorizovan');

    function logOut() {
        login = null;
        localStorage.removeItem('Delivery');
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        cartButton.style.display = '';
        buttonOut.removeEventListener('click', logOut)
        checkAuth();
        returnMain();
    }
    console.log('авторизован');
    //buttonAuth.style.backgroundColor = 'red'; меняет цвет кнопки\

    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'flex';// меняем блок на флекс чтобы был адаптив
    cartButton.style.display = 'flex';// меняем блок на флекс чтобы было видно картинку карзины

    buttonOut.addEventListener('click', logOut)
}


function notAuthorized() {
    console.log('не авторизован');

    function logIn(event) {
        event.preventDefault(); //не дает обновлять страничку после submit

        if (valid(loginInput.value)) {    //mask valid
            login = loginInput.value;
            localStorage.setItem('Delivery', login);
            toggleModalAuth();
            buttonAuth.removeEventListener('click', toggleModalAuth);
            closeAuth.removeEventListener('click', toggleModalAuth);
            logInForm.removeEventListener('submit', logIn);
            logInForm.reset(); //очистка поля ввода
            checkAuth();
        } else {
            loginInput.style.borderColor = 'red';
        }
    }
    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}


// lesson 2
function returnMain() {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
}

function createCardRestaurant(restaurant) {

    const {         //деструкторизация
        image,        //переменные с масива
        kitchen,
        name,
        price,
        stars,
        products,
        time_of_delivery: timeOfDelivery  //так можно переименовать перевенную снейк кейс больше не существует
    } = restaurant;  // откуда получили
    const card = `
  <a class="card card-restaurant"
   data-products="${products}"
   data-info="${[name, price, stars, kitchen]}">
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${timeOfDelivery}</span>
      </div>
      <div class="card-info">
        <div class="rating">
          ${stars}
        </div>
        <div class="price">${price}₽</div>
        <div class="category">${kitchen}</div>
      </div>
    </div>
  </a>
  `;
    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}


function createCardGood({ image, name, price, description, id }) {

    const card = document.createElement('div');
    card.className = 'card';

    card.insertAdjacentHTML('beforeend', `
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">${name}</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">${description}
        </div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart" id="${id}">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price card-price-bold">${price} ₽</strong>
      </div>
    </div>
  `);
    cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
    const target = event.target;
    const restaurant = target.closest('.card-restaurant');

    if (restaurant) {
        if (login) {

            //  console.log(restaurant.dataset.info);
            const info = restaurant.dataset.info.split(',');

            const [name, price, stars, kitchen] = info;


            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            restaurantTitle.textContent = name;
            rating.textContent = stars;
            minPrice.textContent = `От ${price}₴`;
            category.textContent = kitchen;

            getData(`./db/${restaurant.dataset.products}`).then(function (data) {
                data.forEach(createCardGood); //make cards

            });

            // createCardGood();
            // createCardGood();
            // createCardGood();
        } else {
            toggleModalAuth();
        }
    }
}




// mask
const valid = function (str) {
    const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
    return nameReg.test(str); //test подставляет строку для тест
}
//mask






inputSearch.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        const target = event.target;
        const value = target.value.toLowerCase().trim();

target.value = '';

        if(!value){
          target.style.backgroundColor = 'tomato';
          setTimeout(function(){
            target.style.backgroundColor = '';
          }, 2000);
          return;
        }
        const goods = [];

        getData('./db/partners.json').then(function (data) {
            const products = data.map(function (item) {
                return item.products;
            });

            products.forEach(function (product) {
                getData(`./db/${product}`).then(function (data) {
                    goods.push(...data);

                    const searchGoods = goods.filter(function (item) {
                        return item.name.toLowerCase().includes(value) //!
                    })

                    console.log(searchGoods);

                    cardsMenu.textContent = '';
                    containerPromo.classList.add('hide');
                    restaurants.classList.add('hide');
                    menu.classList.remove('hide');

                    restaurantTitle.textContent = 'Результат поиска';
                    rating.textContent = '';
                    minPrice.textContent = '';
                    category.textContent = '';

                    return searchGoods;
                })
                    .then(function (data) {
                        data.forEach(createCardGood);
                    })
            })

        });
    }
});


function changeCount(event) {
    const target = event.target;

    if (target.classList.contains('counter-button')) {
        const food = cart.find(function (item) {
            return item.id === target.dataset.id;
        });
        if (target.classList.contains('counter-minus')) {
            food.count --;
            if (food.count === 0) {
                cart.splice(cart.indexOf(food), 1);
            }
        };
        if (target.classList.contains('counter-plus'))     food.count++;

        renderCart();
    }
}




function addToCart(event) {
    const target = event.target;
    const buttonAddToCart = target.closest('.button-add-cart');
    if (buttonAddToCart) {
        const card = target.closest('.card');
        const title = card.querySelector('.card-title-reg').textContent;
        const cost = card.querySelector('.card-price').textContent;
        const id = buttonAddToCart.id;

        const food = cart.find(function (item) {
            return item.id === id;
        })

        if (food) {
            food.count += 1;
        } else {
            cart.push({
                id,
                title,
                cost,
                count: 1
            });
        }
    }
}

function toggleModal() {
    modal.classList.toggle("is-open");
}

function renderCart() {
    modalBody.textContent = '';//для того чтобы не сумировалось в корзине
    cart.forEach(function ({ id, title, cost, count }) {
        const itemCart = `
    <div class="food-row">
      <span class="food-name">${title}</span>
      <strong class="food-price">${cost}</strong>
      <div class="food-counter">
        <button class="counter-button counter-minus" data-id=${id}>-</button>
        <span class="counter">${count}</span>
        <button class="counter-button counter-plus" data-id=${id}>+</button>
      </div>`;
        modalBody.insertAdjacentHTML('beforeBegin', itemCart)
    });
    const totalPrice = cart.reduce(function (result, item) {
        return result + (parseFloat(item.cost)) * item.count;
    }, 0);
    modalPrice.textContent = totalPrice + 'cash';
}



function init(){

  // get data
  getData('./db/partners.json').then(function (data) {
      data.forEach(createCardRestaurant) //make cards

  });

  cartButton.addEventListener("click", function () {
      renderCart();
      toggleModal();
  });

  buttonClearCart.addEventListener('click', function(){
      cart.length = 0;
      //toggleModal();
      renderCart();
  });
  cardsMenu.addEventListener('click', addToCart);
  close.addEventListener("click", toggleModal);
  cardsRestaurants.addEventListener('click', openGoods);
  logo.addEventListener('click', returnMain);
  checkAuth();

  //swipero
  new Swiper('.swiper-container', {
      loop: true, // анлим прокрутка
      autoplay: {
          delay: 2000, //speed view
      },
      sliderPerView: 1
  });
  //swiper0
}
init();
