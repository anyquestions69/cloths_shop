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
    })
    

})