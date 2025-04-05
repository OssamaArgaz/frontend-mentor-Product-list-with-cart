document.querySelectorAll('.add-to-cart-btn').forEach(addToCartBtn =>{
    let quantity = 0;
    let iconPlus = addToCartBtn.parentElement.nextElementSibling.firstElementChild.lastElementChild;
    let iconMoins = addToCartBtn.parentElement.nextElementSibling.firstElementChild.firstElementChild;
    let product = iconPlus.previousElementSibling;

    addToCartBtn.addEventListener('click', function showBtnActive() {
        addToCartBtn.parentElement.nextElementSibling.classList.add('d-block')
        addToCartBtn.parentElement.classList.add('d-none');

        quantity += 1;
        product.innerHTML = quantity;

        addProductsCart()
    });

    iconPlus.addEventListener('click', function addProduct(){
        let product = iconPlus.previousElementSibling;
        quantity += 1;
        product.innerHTML = quantity;
        addProductsCart()
    });

    iconMoins.addEventListener('click', function addProduct(){
        let product = iconPlus.previousElementSibling;
        quantity -= 1;
        product.innerHTML = quantity;
        if(quantity == 0){
            addToCartBtn.parentElement.nextElementSibling.classList.remove('d-block');
            addToCartBtn.parentElement.classList.remove('d-none');
        }
        removeProductsCart()
    });

})

function addProductsCart(){
    let total = 0;
    let totalProducts = document.getElementById('totalProducts');
    document.querySelectorAll('.icofont-minus-circle').forEach(minusIcon =>{
        let productsNumber = minusIcon.nextElementSibling.textContent;
        total += Number(productsNumber);
        totalProducts.innerHTML = total
    })
}

function removeProductsCart(){
    let total = 0;
    let totalProducts = document.getElementById('totalProducts');
    document.querySelectorAll('.icofont-minus-circle').forEach(minusIcon =>{
        let productsNumber = minusIcon.nextElementSibling.textContent;
        total -= Number(productsNumber);
        totalProducts.innerHTML = Math.abs(total);
    })
}
