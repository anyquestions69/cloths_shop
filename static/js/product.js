$(document).ready(async function(){
    const urlParams = new URLSearchParams(window.location.search)
    id = urlParams.get('id')
    var url = `/api/product/${id}/`
    console.log(url)
    fetch(url).then(async (res)=>{
        let item = await res.json()
        document.title=item.name
        $('#title').empty().text(item.name)
        $('#priceTag').text(item.price+' ₽')
        $('#description').text(item.brand.name)
        $('#subCatTitle').text(item.subcategory.name)
        $('#breadSub').text(item.subcategory.name).attr('href','/shop?sub='+item.subcategory.id)
        $('#breadCat').text(item.category.name).attr('href','/shop?cat='+item.category.id)
        $('#breadTitle').empty().text(item.name)
        $('#fullDescription').html(item.description)
        $('#catTitle').text(item.category.name)
        $('#images').empty()
        $('#imgList').empty()
        let i=1;
        for(let img of item.imgs){
            $('#images').append(`
                    <div class="tab-pane " id="tabs-${i}" role="tabpanel">
                    <div class="product__details__pic__item">
                        <img src="img/products/${img.name}" alt="">
                    </div>
                </div>
            `)
            $('#imgList').append(
                ` <li class="nav-item">
                <a class="nav-link " data-toggle="tab" href="#tabs-${i}" role="tab">
                    <div class="product__thumb__pic set-bg" style="background-image:url('img/products/${img.name}');background-position:center;background-size:contain">
                    </div>
                </a>
            </li>`
            )
            i++
        }
        $('#tabs-1').addClass('active')
        $('.nav-link[href="#tabs-1"').addClass('active')
       
    })
    

})