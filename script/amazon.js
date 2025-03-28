import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
let web_html = '';
products.forEach(products => {
  web_html += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${products.image}">
          </div>
          <div class="Product-name">
            ${products.name}
          </div>
          <div class="product-rating-conatiner">
            <img class="product-rating-star" src="images/ratings/rating-${products.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${products.rating.count}
            </div>
          </div>

          <div class="product-price"> $ ${formatCurrency(products.priceCents)}</div>
          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="product-spacer"></div>
          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">Added
          </div>
          <button class="added-to-cart-primary-button button-primary js-add-to-cart"
          data-product-id=${products.id} >Add to Cart</button>
        </div>
  ` ;
});
document.querySelector('.js-product-grid').innerHTML = web_html;


function updateCartQuantity(){
  let cartQuantity=0;
  cart.forEach((CartItem)=>{
    cartQuantity+=CartItem.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
}

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click',()=>{
    const productId=button.dataset.productId;
    addToCart(productId); 
    updateCartQuantity();
  });
});
