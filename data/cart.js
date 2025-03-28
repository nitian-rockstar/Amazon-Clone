export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart = [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId:'1'
  },
    {
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId:'2'
    },
    {
      productId:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
      quantity: 1,
      deliveryOptionId:'3'
    }];
};

function saveToLocalStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId) {
  let matchingItem;
  cart.forEach((CartItem) => {
    if (productId === CartItem.productId) {
      matchingItem = CartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  }
  else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId:'1'
    });
  }
  saveToLocalStorage();
}

export function removeFromCart(productId) {
  const newCart=[];
  cart.forEach((CartItem) => {
    if (CartItem.productId !==productId ) {
     newCart.push(CartItem);
    }
  });

  cart=newCart;
  saveToLocalStorage();
}


export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((CartItem) => {
    if (productId === CartItem.productId) {
      matchingItem = CartItem;
    }
  });
 matchingItem.deliveryOptionId=deliveryOptionId;
  saveToLocalStorage();
}