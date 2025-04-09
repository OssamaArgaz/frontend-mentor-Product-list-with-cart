document.querySelectorAll('.add-to-cart-btn').forEach((addToCartBtn, index) => {
    let quantity = 0;
    let iconPlus = addToCartBtn.parentElement.nextElementSibling.firstElementChild.lastElementChild;
    let iconMoins = addToCartBtn.parentElement.nextElementSibling.firstElementChild.firstElementChild;
    let product = iconPlus.previousElementSibling;
    let cartActive = document.querySelector('.cart-active');
    let cartImg = document.querySelector('.cart-img');
    let totalProducts = document.getElementById('totalProducts');


    addToCartBtn.addEventListener('click', function showBtnActive() {
        addToCartBtn.parentElement.nextElementSibling.classList.add('d-block');
        addToCartBtn.parentElement.classList.add('d-none');

        cartActive.classList.remove('d-none');
        cartImg.classList.add('d-none');

        quantity += 1;
        product.innerHTML = quantity;

        addProductsNumberCart();

        let dessertPrice = this.parentElement.parentElement.nextElementSibling.lastElementChild.firstElementChild;
        let dessertName = this.parentElement.parentElement.nextElementSibling.firstElementChild;
        let dessertQuantity = this.parentElement.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling;
        let dessertTotalPrice = Number(dessertQuantity.textContent) * Number(dessertPrice.textContent);
        addToCartBtn.setAttribute("data-index", index);
        let IndexAttribute = addToCartBtn.getAttribute("data-index");
        addDessert(IndexAttribute, dessertQuantity.textContent, dessertPrice.textContent, dessertName.textContent, dessertTotalPrice);

    });

    iconPlus.addEventListener('click', function addProduct(e) {
        let product = iconPlus.previousElementSibling;


        let dessertPrice = addToCartBtn.parentElement.parentElement.nextElementSibling.lastElementChild.firstElementChild;
        let dessertName = addToCartBtn.parentElement.parentElement.nextElementSibling.firstElementChild;

        quantity += 1;
        product.innerHTML = quantity;
        addProductsNumberCart();


        let dessertTotalPrice = Number(quantity) * Number(dessertPrice.textContent);
        addToCartBtn.setAttribute("data-index", index);
        let IndexAttribute = addToCartBtn.getAttribute("data-index");

        calculerDessert(IndexAttribute, quantity, dessertPrice.textContent, dessertName.textContent, dessertTotalPrice);
        
    });

    iconMoins.addEventListener('click', function addProduct() {
        let product = iconPlus.previousElementSibling;

        let dessertPrice = addToCartBtn.parentElement.parentElement.nextElementSibling.lastElementChild.firstElementChild;
        let dessertName = addToCartBtn.parentElement.parentElement.nextElementSibling.firstElementChild;

        quantity -= 1;
        product.innerHTML = quantity;
        if (quantity == 0) {
            addToCartBtn.parentElement.nextElementSibling.classList.remove('d-block');
            addToCartBtn.parentElement.classList.remove('d-none');
        }
        removeProductsNumberCart();
        if (totalProducts.textContent == 0) {
            cartActive.classList.add('d-none');
            cartImg.classList.remove('d-none');
        }
        


        let dessertTotalPrice = Number(quantity) * Number(dessertPrice.textContent);
        addToCartBtn.setAttribute("data-index", index);
        let IndexAttribute = addToCartBtn.getAttribute("data-index");

        calculerDessert(IndexAttribute, quantity, dessertPrice.textContent, dessertName.textContent, dessertTotalPrice);

        let dessert = document.querySelector(`.dessert[data-index="${IndexAttribute}"]`);
        let dessertQuantity = dessert.firstElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild;
        if(dessertQuantity.textContent == 0){
            dessert.remove();
        }
    });

});





function addProductsNumberCart() {
    let total = 0;
    let totalProducts = document.getElementById('totalProducts');
    document.querySelectorAll('.icofont-minus-circle').forEach(minusIcon => {
        let productsNumber = minusIcon.nextElementSibling.textContent;
        total += Number(productsNumber);
        totalProducts.innerHTML = total;

    });
}

function removeProductsNumberCart() {
    let total = 0;
    let totalProducts = document.getElementById('totalProducts');
    document.querySelectorAll('.icofont-minus-circle').forEach(minusIcon => {
        let productsNumber = minusIcon.nextElementSibling.textContent;
        total -= Number(productsNumber);
        totalProducts.innerHTML = Math.abs(total);
    })
}





function addDessert(IndexAttribute, dessertQuantity, dessertPrice, dessertName, dessertTotalPrice) {
    let desserts = document.querySelector('.desserts');

    let dessert = `<div data-index=${IndexAttribute} class="dessert row border-bottom pb-4 pt-2 d-flex align-items-center">  <div class="col-10">    <div class="dessert-desc">      <div class="dessert-name">        <p>${dessertName}</p>      </div>      <div class="dessert-info d-flex align-items-center">        <div class="dessert-quantity"><span class="dessert-quantity-span">${dessertQuantity}</span>x</div>        <div class="ms-4 dessert-prices-info">          <span>@ $<span class="dessert-price me-2">${dessertPrice}</span> $<span class="dessert-total-price">${dessertTotalPrice}</span></span>        </div>      </div>    </div>  </div>  <div class="col-2">    <i class="icofont-close-line-circled" onclick="removeDessert(this)"></i>  </div></div>`;

    desserts.insertAdjacentHTML("beforeBegin", dessert);
}


function removeDessert(dessert){
    let cartActive = document.querySelector('.cart-active');
    let cartImg = document.querySelector('.cart-img');
    let totalProducts = document.getElementById('totalProducts');

    totalProducts.textContent -= Number(dessert.parentElement.previousElementSibling.firstElementChild.lastElementChild.firstElementChild.firstElementChild.textContent);
    dessert.parentElement.parentElement.remove();

    if (totalProducts.textContent == 0) {
        cartActive.classList.add('d-none');
        cartImg.classList.remove('d-none');
    }

    document.querySelectorAll('.icofont-minus-circle').forEach(iconMoins => {
        let dessertnumber = iconMoins.nextElementSibling;
        let dessertName = dessert.parentElement.previousElementSibling.firstElementChild.firstElementChild.firstElementChild;
        let productsName = iconMoins.parentElement.parentElement.parentElement.nextElementSibling.firstElementChild;
        if(dessertName.textContent == productsName.textContent){
            dessertnumber.textContent = 0;
            
            iconMoins.parentElement.parentElement.classList.remove('d-block');
            iconMoins.parentElement.parentElement.previousElementSibling.classList.remove('d-none');
        }
    });
}

function calculerDessert(IndexAttribute, dessertQuantity, dessertPrice, dessertName, dessertTotalPrice) {
    let dessert = document.querySelector(`.dessert[data-index="${IndexAttribute}"]`);
    // d = `<div data-index=${IndexAttribute} class="dessert row border-bottom pb-4 pt-2 d-flex align-items-center">  <div class="col-10">    <div class="dessert-desc">      <div class="dessert-name">        <p>${dessertName}</p>      </div>      <div class="dessert-info d-flex align-items-center">        <div class="dessert-quantity"><span class="dessert-quantity-span">${dessertQuantity}</span>x</div>        <div class="ms-4 dessert-prices-info">          <span>@ $<span class="dessert-price me-2">${dessertPrice}</span> $<span class="dessert-total-price">${dessertTotalPrice}</span></span>        </div>      </div>    </div>  </div>  <div class="col-2">    <i class="icofont-close-line-circled"></i>  </div></div>`;

    dessert.innerHTML = `<div class="col-10">
                            <div class="dessert-desc">
                                <div class="dessert-name">
                                    <p>${dessertName}</p>
                                </div>
                                <div class="dessert-info d-flex align-items-center">
                                    <div class="dessert-quantity">
                                        <span class="dessert-quantity-span">${dessertQuantity}</span>x
                                    </div>
                                    <div class="ms-4 dessert-prices-info">
                                        <span>@ $<span class="dessert-price me-2">${dessertPrice}</span> 
                                            $<span class="dessert-total-price">${dessertTotalPrice}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-2"><i class="icofont-close-line-circled" onclick="removeDessert(this)"></i></div>`;
}


// document.querySelectorAll('.icofont-minus-circle').forEach((iconMoins, index) =>{
//     iconMoins.setAttribute("icon-index", index);
// })

