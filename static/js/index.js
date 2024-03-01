$(document).ready(async ()=>{
   
    let brands = await fetch('/api/brand')
    let brandList = await brands.json()
    $('#brandList').empty()
    for(let brand of brandList){
        $('#brandList').append(`<li><a href="/shop?brand=${brand.id}" data-id="${brand.id}">${brand.name}</a></li>`)
    }

    let category = await fetch('/api/category')
    let categoryList = await category.json()
    $('#categoryList').empty()
    for(let cat of categoryList){
        let appenddable=`<li><a href="/shop?cat=${cat.id}" data-id="${cat.id}">${cat.name}</a>`
        
        if(cat.subcategories){
            appenddable+=`<ol style="height:auto;padding-left:1em">`
            for(let sub of cat.subcategories){
                appenddable+=`<li><a href="/shop?subcat=${sub.id}"data-id="${sub.id}">${sub.name}</a></li>`
            }
            appenddable+=`</ol>`
        }
        appenddable+=`</li>`
        await $('#categoryList').append(appenddable)
    }
    cartView()
   
    $('.add-cart').each(function(){
        $(this).on('click', async function(e){
            e.preventDefault();
            let id = $(this).data('id')
            let res = await fetch('/api/cart/add', {
                method:'POST', 
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body:JSON.stringify({id:id})
            })
            let cart= await res.json()
            console.log(cart)
            cartView()
        })
    })
   
})
async function cartView() { 
    let price = await fetch('/api/cart/view')
    let priceText = await price.json()
    $('#priceHeader').text(priceText.price)
    $('#priceHeaderAdapt').text(priceText.price)
 }