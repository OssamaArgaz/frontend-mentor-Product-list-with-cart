// import cardData from "./data.js"
// let cards = document.querySelector('.dessert-cards')

// for (let i=0; i<cardData.length; i++){
//         cards.innerHTML += `
//             <div class="dessert-card col-4 p-0 overflow-hidden">
//             <div class="row position-relative">
//               <div class="dessert-card-img col-12 overflow-hidden">
//                 <img class=" w-100 h-100 desktop" src="${cardData[i].image.desktop}" alt="">
//                 <img class=" w-100 h-100 tablet" src="${cardData[i].image.tablet}" alt="">
//                 <img class=" w-100 h-100 mobile" src="${cardData[i].image.mobile}" alt="">
//               </div>
//               <div class="add-to-cart text-center position-absolute">
//                 <button data-index=0 class="add-to-cart-btn"><img class="pe-1"
//                     src="./assets/images/icon-add-to-cart.svg" alt=""> Add to cart</button>
//               </div>
//               <div class="add-to-cart add-to-cart-active text-center position-absolute">
//                 <button class="add-to-cart-btn-active d-flex justify-content-between align-items-center"><i
//                     class="icofont-minus-circle" icon-index=0></i><span></span><i
//                     class="icofont-plus-circle"></i></button>
//               </div>
//             </div>
//             <div class="dessert-card-desc pt-4 pb-2 row">
//               <p>${cardData[i].category}</p>
//               <h4 class="pt-0">${cardData[i].name}</h4>
//               <span>$<span id="dessertPrice">${cardData[i].price}</span></span>
//             </div>
//           </div>
//         `;
// }

document.querySelectorAll('.dessert-card').forEach((dessertCard, index) => {
    let addToCartBtn = dessertCard.querySelector('.add-to-cart-btn');
    let iconPlus = dessertCard.querySelector('.icofont-plus-circle');
    let iconMoins = dessertCard.querySelector('.icofont-minus-circle');
    let product = iconPlus.previousElementSibling;
    let cartActive = document.querySelector('.cart-active');
    let cartImg = document.querySelector('.cart-img');
    let totalProducts = document.getElementById('totalProducts');
    
    
    addToCartBtn.addEventListener('click', function showBtnActive() {
        let quantity = 0;
        addToCartBtn.parentElement.nextElementSibling.classList.add('d-block');
        addToCartBtn.parentElement.classList.add('d-none');

        cartActive.classList.remove('d-none');
        cartImg.classList.add('d-none');

        quantity++;
        product.innerHTML = quantity;


        addProductsNumberCart();
        let dessertImg = this.parentElement.previousElementSibling.firstElementChild.getAttribute('src');
        let dessertPrice = this.parentElement.parentElement.nextElementSibling.lastElementChild.firstElementChild;
        let dessertName = this.parentElement.parentElement.nextElementSibling.firstElementChild;
        let dessertQuantity = this.parentElement.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling;
        let dessertTotalPrice = Number(dessertQuantity.textContent) * Number(dessertPrice.textContent);
        addToCartBtn.setAttribute("data-index", index);
        let IndexAttribute = addToCartBtn.getAttribute("data-index");
        addDessert(IndexAttribute, dessertImg, dessertQuantity.textContent, dessertPrice.textContent, dessertName.textContent, dessertTotalPrice);
        calculerTotalOrders()
    });

    iconPlus.addEventListener('click', function addProduct() {
        let product = iconPlus.previousElementSibling;

        let dessertImg = addToCartBtn.parentElement.previousElementSibling.firstElementChild.getAttribute('src');
        let dessertPrice = addToCartBtn.parentElement.parentElement.nextElementSibling.lastElementChild.firstElementChild;
        let dessertName = addToCartBtn.parentElement.parentElement.nextElementSibling.firstElementChild;

        let quantity = Number(product.textContent)+1
        product.textContent = quantity;
        addProductsNumberCart();


        let dessertTotalPrice = Number(quantity) * Number(dessertPrice.textContent);
        addToCartBtn.setAttribute("data-index", index);
        let IndexAttribute = addToCartBtn.getAttribute("data-index");

        calculerDessert(IndexAttribute, dessertImg, quantity, dessertPrice.textContent, dessertName.textContent, dessertTotalPrice);
        calculerTotalOrders()
    });

    iconMoins.addEventListener('click', function addProduct() {
        let product = iconPlus.previousElementSibling;
        
        let dessertImg = addToCartBtn.parentElement.previousElementSibling.firstElementChild.getAttribute('src');
        let dessertPrice = addToCartBtn.parentElement.parentElement.nextElementSibling.lastElementChild.firstElementChild;
        let dessertName = addToCartBtn.parentElement.parentElement.nextElementSibling.firstElementChild;

        let quantity = Number(product.textContent)-1;
        product.textContent = quantity;
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

        calculerDessert(IndexAttribute, dessertImg, quantity, dessertPrice.textContent, dessertName.textContent, dessertTotalPrice);

        let dessert = document.querySelector(`.dessert[data-index="${IndexAttribute}"]`);
        let dessertQuantity = dessert.firstElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild;
        if(dessertQuantity.textContent == 0){
            dessert.remove();
        }
        calculerTotalOrders()
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




function addDessert(IndexAttribute, dessertImg, dessertQuantity, dessertPrice, dessertName, dessertTotalPrice) {
    let desserts = document.querySelector('.desserts');

    let dessert = `<div data-index=${IndexAttribute} class="dessert row border-bottom pb-4 pt-2 d-flex align-items-center">  
                        <div class="confirm-dessert-img col-2 d-none">
                            <img src="${dessertImg}">
                        </div>
                        <div class="col-10">    
                            <div class="dessert-desc">      
                                <div class="dessert-name">        
                                    <p>${dessertName}</p>      
                                </div>      
                                <div class="dessert-info d-flex align-items-center">        
                                    <div class="dessert-quantity">
                                    <span class="dessert-quantity-span">${dessertQuantity}</span>x
                                    </div>        
                                    <div class="ms-4 dessert-prices-info">          
                                    <span>@ $<span class="dessert-price me-2">${dessertPrice}</span> $<span class="dessert-total-price">${dessertTotalPrice}</span></span>        
                                    </div>     
                                </div>    
                            </div>  
                        </div>  
                        <div class="col-2">    
                            <i class="icofont-close-line-circled" onclick="removeDessert(this)"></i>  
                        </div>
                    </div>`;

    // desserts.insertAdjacentHTML("beforeBegin", dessert);
    desserts.innerHTML += dessert;
}


function removeDessert(dessert){
    let IndexAttribute = dessert.parentElement.parentElement.getAttribute("data-index");
    let cartActive = document.querySelector('.cart-active');
    let cartImg = document.querySelector('.cart-img');
    let totalProducts = document.getElementById('totalProducts');

    totalProducts.textContent -= Number(dessert.parentElement.previousElementSibling.firstElementChild.lastElementChild.firstElementChild.firstElementChild.textContent);
    dessert.parentElement.parentElement.remove();

    if (totalProducts.textContent == 0) {
        cartActive.classList.add('d-none');
        cartImg.classList.remove('d-none');
    }

    let item = document.querySelector(`.dessert-card button[data-index="${IndexAttribute}"]`)
    let dessertnumber = item.parentElement.nextElementSibling.querySelector('.add-to-cart-btn-active span');
    let iconMoins = item.parentElement.nextElementSibling.querySelector('.icofont-minus-circle')
    iconMoins.parentElement.parentElement.classList.remove('d-block');
    iconMoins.parentElement.parentElement.previousElementSibling.classList.remove('d-none');
    dessertnumber.innerHTML = 0;
    quantity = 0;

    // document.querySelectorAll('.icofont-minus-circle').forEach(iconMoins => {
    //     let dessertnumber = iconMoins.nextElementSibling;
    //     let resetQuantity = 0;
    //     let dessertName = dessert.parentElement.previousElementSibling.firstElementChild.firstElementChild.firstElementChild;
    //     let productsName = iconMoins.parentElement.parentElement.parentElement.nextElementSibling.firstElementChild;
    //     if(dessertName.textContent == productsName.textContent){
    //         dessertnumber.innerHTML = resetQuantity;
    //         quantity = 0;
    //         iconMoins.parentElement.parentElement.classList.remove('d-block');
    //         iconMoins.parentElement.parentElement.previousElementSibling.classList.remove('d-none');
    //     }
    // });
    calculerTotalOrders()
}

function calculerDessert(IndexAttribute, dessertImg, dessertQuantity, dessertPrice, dessertName, dessertTotalPrice) {
    let dessert = document.querySelector(`.dessert[data-index="${IndexAttribute}"]`);
    // d = `<div data-index=${IndexAttribute} class="dessert row border-bottom pb-4 pt-2 d-flex align-items-center">  <div class="col-10">    <div class="dessert-desc">      <div class="dessert-name">        <p>${dessertName}</p>      </div>      <div class="dessert-info d-flex align-items-center">        <div class="dessert-quantity"><span class="dessert-quantity-span">${dessertQuantity}</span>x</div>        <div class="ms-4 dessert-prices-info">          <span>@ $<span class="dessert-price me-2">${dessertPrice}</span> $<span class="dessert-total-price">${dessertTotalPrice}</span></span>        </div>      </div>    </div>  </div>  <div class="col-2">    <i class="icofont-close-line-circled"></i>  </div></div>`;

    dessert.innerHTML = `<div class="confirm-dessert-img col-2 d-none">
                            <img src="${dessertImg}">
                        </div>
                        <div class="col-10">
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

function calculerTotalOrders(){
    let totalOrderPriceSpan = document.querySelector('.total-order-price-span')
    let totalOrders = 0;

    document.querySelectorAll('.dessert-total-price').forEach(total => {
        totalOrders += Number(total.textContent);
    })
    totalOrderPriceSpan.innerHTML = totalOrders;
}

function confirmOrder(){
    let desserts = document.querySelector('.desserts-modal');
    // let cartTotalModal = document.querySelector('.cart-total-modal'); 
    // let totalOrderPriceSpan = cartTotalModal.querySelector('.total-order-price-span');
    // let totalOrder = 0;




    // document.querySelectorAll('.dessert').forEach(dessert =>{
    //     let dessertImg = dessert.querySelector('.confirm-dessert-img img').getAttribute('src');
    //     let dessertName = dessert.querySelector('.dessert-name p');
    //     let dessertQuantity = dessert.querySelector('.dessert-quantity-span');
    //     let dessertPrice = dessert.querySelector('.dessert-price');
    //     let dessertTotalPrice = dessert.querySelector('.dessert-total-price');


    //     totalOrder += Number(dessertTotalPrice.textContent);
    //     console.log(totalOrder);
    //     console.log(dessertImg);

    //     desserts.innerHTML += `<div class="row pb-3">
    //                                 <div class="confirm-dessert-img col-2">
    //                                     <img src="${dessertImg}" width="50px" height="50px">
    //                                 </div>
    //                                 <div class="dessert-desc col-8">
    //                                     <div class="dessert-name">
    //                                         <p>${dessertName.textContent}</p>
    //                                     </div>
    //                                     <div class="dessert-info d-flex align-items-center">
    //                                         <div class="dessert-quantity">
    //                                             <span class="dessert-quantity-span">${dessertQuantity.textContent}</span>x
    //                                         </div>
    //                                         <div class="ms-4 dessert-prices-info">
    //                                             <span>@ $<span class="dessert-price me-2">${dessertPrice.textContent}</span> 
    //                                             </span>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                                 <div class="col-2 text-center">
    //                                     $<span class="dessert-total-price">${dessertTotalPrice.textContent}</span>
    //                                 </div>
    //                             </div>`
    // });
    // totalOrderPriceSpan.innerHTML += totalOrder;





    let cart = document.querySelector('.cart-content');
    let totalOrder = 0;
    cart.querySelectorAll('.desserts .dessert .col-10').forEach(itemd => {
        let dessertImg = itemd.previousElementSibling.firstElementChild.getAttribute('src');
        let dessertName = itemd.querySelector('.dessert-name p');
        let dessertQuantity = itemd.querySelector('.dessert-quantity-span');
        let dessertPrice = itemd.querySelector('.dessert-price');
        let dessertTotalPrice = itemd.querySelector('.dessert-total-price');
        let dessertTotalOrderPrice = document.querySelector('.total-order-price-span-modal');

        totalOrder += Number(dessertTotalPrice.textContent);


        dessertTotalOrderPrice.innerHTML = totalOrder;
        desserts.innerHTML += `<div class="row pb-3">
                            <div class="confirm-dessert-img col-2">
                                <img src="${dessertImg}" width="50px" height="50px">
                            </div>
                            <div class="dessert-desc col-8">
                                <div class="dessert-name">
                                    <p>${dessertName.textContent}</p>
                                </div>
                                <div class="dessert-info d-flex align-items-center">
                                    <div class="dessert-quantity">
                                        <span class="dessert-quantity-span">${dessertQuantity.textContent}</span>x
                                    </div>
                                    <div class="ms-4 dessert-prices-info">
                                        <span>@ $<span class="dessert-price me-2">${dessertPrice.textContent}</span> 
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2 text-center">
                                $<span class="dessert-total-price">${dessertTotalPrice.textContent}</span>
                            </div>
                        </div>`
        
    })
}


document.addEventListener('DOMContentLoaded', function() {
    var modal1 = document.getElementById('exampleModalToggle');
    var confirmOrderBtn = document.querySelector('.confirm-order-btn');
    
    modal1.addEventListener('hidden.bs.modal', function () {
      location.reload();
    });
    confirmOrderBtn.addEventListener('click', function () {
        location.reload();
      });
    
  });
















