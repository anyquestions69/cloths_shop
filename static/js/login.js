$(document).ready(async function(){
    $('#logForm').on('submit',async function(e){
        e.preventDefault()
        let email = $('emailLog').val()
        let password = $('passwordLog').val()
        let result = await fetch('/api/auth/login', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body:JSON.stringify({email:email,
            password:password})
        })
        let session = await result.json()
        console.log(session)
    })
    $('#regForm').on('submit',async function(e){
        e.preventDefault()
        let logemail = $('emailReg').val()
        let logpassword = $('passwordReg').val()
        let firstname = $('#firstnameReg').val()
        let lastname = $('#lastnameReg').val()
        let repass = $('#repassReg').val()
        console.log(JSON.stringify({email:logemail,
            password:logpassword, firstname, lastname, repass}))
        let result = await fetch('/api/auth/register', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body:JSON.stringify({email:logemail,
            password:logpassword, firstname, lastname, repass})
        })
        let session = await result.json()
        console.log(session)
    })
})