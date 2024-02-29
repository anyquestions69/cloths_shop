
$(document).ready(async function(){
    const urlParams = new URLSearchParams(window.location.search)
    cat = urlParams.get('cat')
    name1 = urlParams.get('name')
    subcat = urlParams.get('subcat')
    brand = urlParams.get('brand')
    price = urlParams.get('price')
    search(name1, cat,subcat, brand, price)

    
    let brands = await fetch('/api/brand')
    let brandList = await brands.json()
    $('#brandListFilter').empty()
    for(let brand of brandList){
        $('#brandListFilter').append(`<li><a class="filterBrand" data-id="${brand.id}">${brand.name}</a></li>`)
    }

    let category = await fetch('/api/category')
    let categoryList = await category.json()
    $('#categoryListFilter').empty()
    for(let cat of categoryList){
        let appenddable=`<li><a class="filterCat"  data-id="${cat.id}">${cat.name}</a>`
        
        if(cat.subcategories){
            appenddable+=`<ol style="height:auto;padding-left:1em">`
            for(let sub of cat.subcategories){
                appenddable+=`<li><a  class="filterSubCat" data-id="${sub.id}">${sub.name}</a></li>`
            }
            appenddable+=`</ol>`
        }
        appenddable+=`</li>`
        await $('#categoryListFilter').append(appenddable)
    }

    $('#productSearchForm').on('submit', async function(e){
        e.preventDefault()
        let name = $('#searchInput').val()
        search(name, cat, subcat, brand, price)
    })
    $('.filterBrand').each(function(){
        $(this).on('click', function(){
            let id=$(this).data('id')
            if(brand==null || brand==undefined ||brand==''){
                brand=new String($(this).data('id'))
                console.log(brand)
            }else{
                if(!brand.split(',').find((el)=>el==id)){
                    
                    brand+=','+$(this).data('id')
                    $(this).addClass('active')
                }else{
                    $(this).removeClass('active')
                    brand=brand.split(',').filter(item => item != id).join(',')
                    
                }
                
            }
            
            urlParams.set('brand',brand)
            
            search(name1, cat, subcat, brand, price)
        })
    })
    $('.filterBrand[data-id='+brand+']').addClass('active')
    
   
}) 

async function search(name,cat,subcat,brand,price){
    let params = `?name=${name||''}&cat=${cat||''}&subcat=${subcat||''}&brand=${brand||''}&price=${price||''}&`
    let url = `/api/product/${params}`
    let products = await fetch(url)
    let itemList = await products.json()
    $('#product_list').empty()
    for(let item of itemList.Products){
        $('#product_list').append(`
        <div class="product__item col-lg-4 col-md-6">
                        <div class="product__item__pic set-bg" style="background:url('../img/product/product-1.jpg')">
                           
                            <ul class="product__hover">
                                <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>
                                <li><a href="#"><img src="img/icon/compare.png" alt=""> <span>Сравнить</span></a></li>
                                <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
                        <a href="/shop/${item.id}">
                            <h6>${item.name}</h6>
                            <a href="#" class="add-cart">+ Добавить в корзину</a>
                            <div class="rating">
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <h5>${item.price} р</h5>
                            <div class="product__color__select">
                                <label for="pc-1">
                                    <input type="radio" id="pc-1">
                                </label>
                                <label class="active black" for="pc-2">
                                    <input type="radio" id="pc-2">
                                </label>
                                <label class="grey" for="pc-3">
                                    <input type="radio" id="pc-3">
                                </label>
                            </div>
                        </a>
                        </div>
                    </div>
        `)
    }
    $('#pagination').empty()
    if(itemList.currentPage>0){
        $('#pagination').append(`
        <a class="" href="/shop${params}page=1">1</a><span>...</span>
        `)
    }
    $('#pagination').append(`
    <a class="active" href="/shop${params}page=${itemList.currentPage+1}">${itemList.currentPage+1}</a>
    
    
    `)
    if(itemList.totalPages-itemList.currentPage>1){
        $('#pagination').append(`<a href="/shop${params}page=${itemList.currentPage+2}">${itemList.currentPage+2}</a>`)
    }
    if(itemList.currentPage>0){
        $('#pagination').append(`<span>...</span><a href="/shop{params}page=${itemList.totalPages}">${itemList.totalPages}</a>`)
    }
    $('#showingPages').text(`Показано ${itemList.Products.length} из ${itemList.totalItems}`)
}