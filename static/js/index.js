$(document).ready(async ()=>{
   
    let brands = await fetch('/api/brand')
    let brandList = await brands.json()
    $('#brandList').empty()
    for(let brand of brandList){
        $('#brandList').append(`<li><a data-id="${brand.id}">${brand.name}</a></li>`)
    }

    let category = await fetch('/api/category')
    let categoryList = await category.json()
    $('#categoryList').empty()
    for(let cat of categoryList){
        let appenddable=`<li><a href="/shop.html?cat=${cat.id}" data-id="${cat.id}">${cat.name}</a>`
        
        if(cat.subcategories){
            appenddable+=`<ol style="height:auto;padding-left:1em">`
            for(let sub of cat.subcategories){
                appenddable+=`<li><a href="/shop.html?subcat=${sub.id}"data-id="${sub.id}">${sub.name}</a></li>`
            }
            appenddable+=`</ol>`
        }
        appenddable+=`</li>`
        await $('#categoryList').append(appenddable)
    }
})