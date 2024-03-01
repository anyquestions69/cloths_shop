$(document).ready(async function(){
    const urlParams = new URLSearchParams(window.location.search)
    id = urlParams.get('id')
    var url = `/api/product/${id}/`
    console.log(url)
    fetch(url).then(async (res)=>{
        let item = await res.json()
        console.log(item)
        document.title=item.name
        $('#title').empty().text(item.name)
        $('#priceTag').text(item.price)
        $('#description').text(item.description)
        let response = await fetch('/api/category')
    })
    

})