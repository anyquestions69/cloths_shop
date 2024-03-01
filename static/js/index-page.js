$(document).ready(async ()=>{
   
    fetch('/api/product/?name=&cat=1&subcat=&brand=&price=&').then(async (res)=>{
        let trendProductList = await res.json()
    console.log(trendProductList)
    $('#trendProducts').empty()
    for(let prod of trendProductList.Products){
        if(prod.id%2==0){
            $('#trendProducts').append(`
            
            <div class="product__item sale col-lg-3 col-md-4">
            <a href="/shop-details?id=${prod.id}" class="">
                        <div class="product__item__pic set-bg" style="background:url('../img/product/product-1.jpg')">
                        
                            <span class="label">Sale</span>
                            <ul class="product__hover">
                                <li><img src="img/icon/heart.png" alt=""></li>
                                <li><img src="img/icon/search.png" alt=""></li>
                            </ul>

                         
                        </div> </a>
                        <div class="product__item__text">
                        
                            <h6>${prod.name}</h6>
                            <a style="cursor:pointer" class="add-cart" data-id=${prod.id}>+ Добавить в корзину</a>
                            <div class="rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <h5>${prod.price}</h5>
                            <div class="product__color__select">
                                <label for="pc-7">
                                    <input type="radio" id="pc-7">
                                </label>
                                <label class="active black" for="pc-8">
                                    <input type="radio" id="pc-8">
                                </label>
                                <label class="grey" for="pc-9">
                                    <input type="radio" id="pc-9">
                                </label>
                            </div>
                        </div>
                       
                    </div>
                   
            `)
        }else{
            $('#trendProducts').append(`
            
            <div class="product__item col-lg-3 col-md-4">
            
            <a href="/shop-details?id=${prod.id}" class="">
            <div class="product__item__pic set-bg" style="background:url('../img/product/product-1.jpg')">
            
                <ul class="product__hover">
                    <li><img src="img/icon/heart.png" alt=""></li>
                    <li><img src="img/icon/search.png" alt=""></li>
                </ul>

             
            </div> </a>
                            <div class="product__item__text">
                            
                                <h6>${prod.name}</h6>
                                <a  class="add-cart" style="cursor:pointer" data-id="${prod.name}">+ Добавить в корзину</a>
                                <h5>${prod.price} р</h5>
                                <div class="rating">
                                    <i class="fa fa-star-o"></i>
                                    <i class="fa fa-star-o"></i>
                                    <i class="fa fa-star-o"></i>
                                    <i class="fa fa-star-o"></i>
                                    <i class="fa fa-star-o"></i>
                                </div>
                            
                            </div>
                           
                        </div> `)
        }
        
    }
    })
    fetch('/api/product/?name=&cat=2&subcat=&brand=&price=&').then(async (res)=>{
        let trendProductList = await res.json()
    console.log(trendProductList)
    $('#hotSales').empty()
    for(let prod of trendProductList.Products){
        
            $('#hotSales').append(`
            <div class="product__item sale col-lg-3 col-md-4">
           
            <a href="/shop-details?id=${prod.id}" class="">
            <div class="product__item__pic set-bg" style="background:url('../img/product/product-2.jpg')">
            
                <ul class="product__hover">
                    <li><img src="img/icon/heart.png" alt=""></li>
                    <li><img src="img/icon/search.png" alt=""></li>
                </ul>

             
            </div> </a>
                        <div class="product__item__text">
                            <h6>${prod.name}</h6>
                            <a class="add-cart" data-id=${prod.id}>+ Добавить в корзину</a>
                            <div class="rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <h5>${prod.price}</h5>
                            <div class="product__color__select">
                                <label for="pc-7">
                                    <input type="radio" id="pc-7">
                                </label>
                                <label class="active black" for="pc-8">
                                    <input type="radio" id="pc-8">
                                </label>
                                <label class="grey" for="pc-9">
                                    <input type="radio" id="pc-9">
                                </label>
                            </div>
                        </div>
                       
                    </div>
            `)
        
        
    }
    })
   
})