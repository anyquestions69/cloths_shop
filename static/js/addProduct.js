$(document).ready(async function(){
    $('#productForm').on('submit', async function(e){
        e.preventDefault()
        const formData  = new FormData();
        let files = $('#imgs')[0].files
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
            formData.append('sizes[]',$(this).val())
              
          }
        })
       
      let res = await fetch('/api/product',{
          method:'POST',
          
          body:formData
      })
  
      let cart = await res.json()
     console.log(cart)
    })
    
})