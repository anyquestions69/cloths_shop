
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
        let sc = cat.subcategories.find(({id})=>id==subcat)
        let appenddable
        if(sc){
            appenddable=`<li><a class="active filterCat" href="/shop?cat=${cat.id}" data-id="${cat.id}">${cat.name}</a>`
        }else{
            appenddable=`<li><a class="filterCat" href="/shop?cat=${cat.id}"  data-id="${cat.id}">${cat.name}</a>`
        }
        
        
        if(cat.subcategories){
            
            appenddable+=`<ol style="height:auto;padding-left:1em">`
            for(let sub of cat.subcategories){
                if(sub.id==subcat){
                    appenddable+=`<li><a  href="/shop?subcat=${sub.id}" class="active filterSubCat" data-id="${sub.id}">${sub.name}</a></li>`
                }else{
                    appenddable+=`<li><a  href="/shop?subcat=${sub.id}" class="filterSubCat" data-id="${sub.id}">${sub.name}</a></li>`
                }
                
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
    
    $('.filterSubCat[data-id='+subcat+']').addClass('active')
   
}) 

async function search(name,cat,subcat,brand,price){
    let params = `?name=${name||''}&cat=${cat||''}&subcat=${subcat||''}&brand=${brand||''}&price=${price||''}&`
    let url = `/api/product/${params}`
    let products = await fetch(url)
    let itemList = await products.json()
    $('#product_list').empty()
    for(let item of itemList.Products){
        $('#product_list').append(`
        <div class="product__item col-lg-4 col-md-4">
            
        <a href="/shop-details?id=${item.id}" class="">
        <div class="product__item__pic set-bg" style="background:url('../img/product/product-1.jpg')">
        
            <ul class="product__hover">
                <li><img src="img/icon/heart.png" alt=""></li>
                <li><img src="img/icon/search.png" alt=""></li>
            </ul>

         
        </div> </a>
                        <div class="product__item__text">
                        
                            <h6>${item.name}</h6>
                            <a  class="add-cart" style="cursor:pointer" data-id="${item.name}">+ Добавить в корзину</a>
                            <h5>${item.price} р</h5>
                            <div class="rating">
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                        
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