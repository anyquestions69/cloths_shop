$(document).ready(async function(){

    const formData  = new FormData();
      let files = $('#imgs').files
      console.log(files)
      for(let file of files){
        formData.append('image', file)
      }
      formData.append('name',$('#name').val())
      formData.append('description',$('#description').val())
      formData.append('price',$('#price').val())
      let sizes=[]
      $('#sizeCheck').each(()=>{
        if($(this).attr("checked", "true")){
            sizes.append({name:$(this).val()})
            formData.append('sizes[]',sizes)
        }
      })
    let res = await fetch('/api/product',{
        method:'POST',
        headers:{
            'Content-Type':'multipart/form-data'
        },
        body:formData
    })

    let cart = await res.json()
   console.log(cart)
})