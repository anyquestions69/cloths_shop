$(document).ready(async ()=>{
    let products = await fetch('/api/product')
    let itemList = await products.json()
    $('#product_list').empty()
    for(let item of itemList.Products){
        $('#product_list').append(`
        <div class="product__item col-lg-4 col-md-6">
                        <div class="product__item__pic set-bg" data-setbg="../img/product/product-1.jpg">
                           
                            <ul class="product__hover">
                                <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>
                                <li><a href="#"><img src="img/icon/compare.png" alt=""> <span>Сравнить</span></a></li>
                                <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
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
                        </div>
                    </div>
        `)
    }
    $('#pagination').empty()
    if(itemList.currentPage>0){
        $('#pagination').append(`
        <a class="" href="?page=1">1</a><span>...</span>
        `)
    }
    $('#pagination').append(`
    <a class="active" href="?page=${itemList.currentPage+1}">${itemList.currentPage+1}</a>
    
    
    `)
    if(itemList.totalPages-itemList.currentPage>1){
        $('#pagination').append(`<a href="?page=${itemList.currentPage+2}">${itemList.currentPage+2}</a>`)
    }
    if(itemList.currentPage>0){
        $('#pagination').append(`<span>...</span><a href="?page=${itemList.totalPages}">${itemList.totalPages}</a>`)
    }
    $('#showingPages').text(`Показано ${itemList.Products.length} из ${itemList.totalItems}`)
    let brands = await fetch('/api/brand')
    let brandList = await brands.json()
    $('#brandList').empty()
    for(let brand of brandList){
        $('#brandList').append(`<li><a href="#">${brand.name}</a></li>`)
    }

    $('#productSearchForm').on('submit', async function(e){
        e.preventDefault()
        let name = $('#searchInput').val()
        let products = await fetch('/api/product?name='+name)
    let itemList = await products.json()
    $('#product_list').empty()
    for(let item of itemList.Products){
        $('#product_list').append(`
        <div class="product__item col-lg-4 col-md-6">
                        <div class="product__item__pic set-bg" data-setbg="../img/product/product-1.jpg">
                           
                            <ul class="product__hover">
                                <li><a href="#"><img src="img/icon/heart.png" alt=""></a></li>
                                <li><a href="#"><img src="img/icon/compare.png" alt=""> <span>Сравнить</span></a></li>
                                <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                            </ul>
                        </div>
                        <div class="product__item__text">
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
                        </div>
                    </div>
        `)
    }
    })
   
}) 