$(document).ready(async function(){

    let res = await fetch('/api/cart/view')
    let cart = await res.json()
    $('#cartItemsList').empty()
    for(let item of cart.cart){
        $('#cartItemsList').append(`
        <tr >
        <td class="product__cart__item">
            <div class="product__cart__item__pic">
                <img src="img/shopping-cart/cart-1.jpg" alt="">
            </div>
            <div class="product__cart__item__text">
                <h6>${item.name}</h6>
                <h5>${item.price}</h5>
            </div>
        </td>
        <td class="quantity__item">
            <div class="quantity">
                <div class="pro-qty-2">
                    <input type="text" value="${item.count}">
                </div>
            </div>
        </td>
        <td class="cart__price">${item.price*item.count}</td>
        <td class="cart__close"><i class="fa fa-close"></i></td>
    </tr>
        `)
    }
    $('#summaryPrice').text(cart.price+ " ₽")
})