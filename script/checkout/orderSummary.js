import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOpsn } from '../../data/deliveryOptions.js';


export function renderOrderSummary() {


  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productid = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productid) {
        matchingProduct = product;
      }
    });
    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;
    deliveryOpsn.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const dayOfWeek = deliveryDate.format('dddd, MMMM D');


    if (matchingProduct) {
      cartSummaryHTML += `
        <div class="cart-item-container
          js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dayOfWeek}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
      `;
    }
    else {
      console.error(`Product not found with id ${productid}`);
    }
  });
  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOpsn.forEach((Option) => {
      const today = dayjs();
      const deliveryDate = today.add(Option.deliveryDays, 'day');
      const dayOfWeek = deliveryDate.format('dddd,MMMM D');
      const price = Option.priceCents === 0 ? 'Free Shipping' : `$${formatCurrency(Option.priceCents)
        }-Shipping`;
      let IsChecked = (cartItem.deliveryOptionId === Option.id ? 'checked' : '');
      html += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${Option.id}">
          <input type="radio" ${IsChecked} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dayOfWeek}
              </div>
              <div class="delivery-option-price">
                ${price}
              </div>
            </div>
        </div>`

    });
    return html;
  }


  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();
      });
    });
  document.querySelectorAll('.js-delivery-option')
    .forEach((option) => {
      option.addEventListener('click', () => {
        const productId = option.dataset.productId;
        const deliveryOptionId = option.dataset.deliveryOptionId;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
      });
    });
}