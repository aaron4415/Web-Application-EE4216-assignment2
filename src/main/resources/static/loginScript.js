/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */


var app = new Vue({
    el:'#app',
    data:{
         username: '',
        password: '',
        correctInput: false,
       
    },
    created:function(){
    },
    methods:{
        checkCorrect: async function(){
          var userJson;
      
      let response = await fetch('http://localhost/todolistItems/auth/'+app.username)
            
       const jsonData = await response.json();
  
    console.log(jsonData.password==app.password); 
        if(jsonData.username==app.username&&jsonData.password==app.password){
            window.location.href = "index.html";
          
        }else if((jsonData.password==app.password)==false){
            alert("wrong username or password");
        }

          
        
          
    },
        
   
        
    }
})


