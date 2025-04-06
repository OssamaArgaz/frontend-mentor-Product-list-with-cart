document.querySelectorAll('.add-to-cart-btn').forEach(addToCartBtn =>{
    let quantity = 0;
    let iconPlus = addToCartBtn.parentElement.nextElementSibling.firstElementChild.lastElementChild;
    let iconMoins = addToCartBtn.parentElement.nextElementSibling.firstElementChild.firstElementChild;
    let product = iconPlus.previousElementSibling;
    let cartActive = document.querySelector('.cart-active');
    let cartImg = document.querySelector('.cart-img');
    let totalProducts = document.getElementById('totalProducts')

    addToCartBtn.addEventListener('click', function showBtnActive() {
        addToCartBtn.parentElement.nextElementSibling.classList.add('d-block')
        addToCartBtn.parentElement.classList.add('d-none');

        cartActive.classList.remove('d-none')
        cartImg.classList.add('d-none');

        quantity += 1;
        product.innerHTML = quantity;

        addProductsNumberCart()
        console.log(this)
    });

    iconPlus.addEventListener('click', function addProduct(){
        let product = iconPlus.previousElementSibling;
        quantity += 1;
        product.innerHTML = quantity;
        addProductsNumberCart()
        console.log(this)

    });

    iconMoins.addEventListener('click', function addProduct(){
        let product = iconPlus.previousElementSibling;
        quantity -= 1;
        product.innerHTML = quantity;
        if(quantity == 0){
            addToCartBtn.parentElement.nextElementSibling.classList.remove('d-block');
            addToCartBtn.parentElement.classList.remove('d-none');
        }
        removeProductsNumberCart()
        if(totalProducts.textContent == 0){
            cartActive.classList.add('d-none')
            cartImg.classList.remove('d-none');
        }
    });



})

function addProductsNumberCart(){
    let total = 0;
    let totalProducts = document.getElementById('totalProducts');
    document.querySelectorAll('.icofont-minus-circle').forEach(minusIcon =>{
        let productsNumber = minusIcon.nextElementSibling.textContent;
        total += Number(productsNumber);
        totalProducts.innerHTML = total
    })
}

function removeProductsNumberCart(){
    let total = 0;
    let totalProducts = document.getElementById('totalProducts');
    document.querySelectorAll('.icofont-minus-circle').forEach(minusIcon =>{
        let productsNumber = minusIcon.nextElementSibling.textContent;
        total -= Number(productsNumber);
        totalProducts.innerHTML = Math.abs(total);
    })
}

function addProductToCart(){
    document.querySelectorAll('.add-to-cart-btn-active span').forEach(span =>{
        let cartActive = document.querySelector('.cart-active');
        let cartImg = document.querySelector('.cart-img');
        
        if(span.textContent == 0){
            cartActive.classList.add('d-none')
            cartImg.classList.remove('d-none');
        }
        console.log(span.textContent)
    })
}


