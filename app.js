class Product {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
}

const shoppingCart = new ShoppingCart();

const products = [
    new Product(1, 'Apples', 50, 10),
    new Product (2, 'Sugar' , 50 ,10),
    new Product(3, 'Bananas', 40, 20),
    new Product(4, 'Oranges', 30, 15),
    new Product (5 , 'Nascafe' , 100 ,10),
    new Product (6 , 'Pasta' , 80 ,10),
    new Product (7 , 'Oil', 100 , 30),


     
];


   

function renderProducts() {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
      <p>${product.name}</p>
      <p>Price: $${product.price.toFixed(2)}</p>
      <input type="number" min="0" value="" id="quantity-${product.id}">
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
        productContainer.appendChild(productItem);
    });
}



function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    cartItems.innerHTML = '';
    shoppingCart.items.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = `Total: $${shoppingCart.getTotalPrice().toFixed(2)}`;
}

function addToCart(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value, 10);
    quantityInput.value = '0';

    if (quantity <= 0) {
        return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
        const item = new Product(product.id, product.name, product.price, quantity);
        shoppingCart.addItem(item);
        renderCart();
    }
}

function checkout() {
    alert('Thank you for shopping with us!\nYour order total price is $' + shoppingCart.getTotalPrice().toFixed(3));
    shoppingCart.items = [];
    renderCart();
}

renderProducts();
renderCart();
