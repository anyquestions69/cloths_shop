$(document).ready(async function(){
    const urlParams = new URLSearchParams(window.location.search)
    id = urlParams.get('id')
    var url = `/api/product/${id}/`
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
        let j=0
        for(let size of item.prod_sizes){
            if(j==0){
                $('#sizeList').append(`
                <label class="active" for="size-${size.sizeId}">${size.size.name}
                    <input type="radio" checked id="size-${size.sizeId}" data-id="${j}" class="sizeRadio">
                </label>`)
                $('#sizeCount').text(size.count+' шт')
                $('#countInput').attr({"max": size.count})
            }else{
                $('#sizeList').append(`
            <label for="size-${size.sizeId}">${size.size.name}
                <input type="radio" id="size-${size.sizeId}" data-id="${j}" class="sizeRadio">
            </label>`)
            }
            
            j++
        }
        
        //await $('.sizeRadio').first().prop("checked", true)
        
       
        $('.sizeRadio').each(async function(){
           
            $(this).on('click',async ()=>{
                $('#sizeList label').removeClass('active')
                let li = await $('#sizeList label').get($(this).data('id'))
                $(li).addClass('active')
                let count = item.prod_sizes[$(this).data('id')].count
                $('#sizeCount').text(count+' шт')
                $('#countInput').attr({"max": count})
            })
        })
        
        $('#tabs-1').addClass('active')
        $('.nav-link[href="#tabs-1"').addClass('active')
       
    })
    

})