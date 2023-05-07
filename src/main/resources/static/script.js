/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */


var app = new Vue({
    el:'#app',
    data:{
         message: '',
         rows:[],
         toDoRow:[],
          completedRow:[],
           isHidden: false,
           compeledState:"pending",
           displayRows:[],
           onWhichIndex:0,
           connectionStatus:"online mode",
        showcompletedItemButton:"Hide the completed items",
        
      
    },
    created:async function(){
        await this.checkHaveInternet();
       window.setInterval(() => {
    
    this.checkHaveInternet();//check wheather user can connect to database
}, 1000);
      
        if(this.connectionStatus=="online mode"){
           
            await  fetch('http://localhost/todolistItems').then(response=>{
           return response.json();
        }).then(rows => {this.rows = rows;
            if(rows.length<=5){
               for(var i=0;i<rows.length;i++) {
            
              app.displayRows.push(rows[i]) ;
           }  
            }else{
                for(var i=0;i<5;i++) {
              
              app.displayRows.push(rows[i]) ;
           }
            }
           
           //get all items form the h2 db 
   app.paginationUpdate();
        }); 
        }else{
            
            if(localStorage.getItem("rows")==null||localStorage.getItem("rows")==[]){
                localStorage.setItem("rows", app.rows);
               
                
            }else{
                 app.rows =JSON.parse(localStorage.getItem("rows"));
          app.paginationUpdate();
            if(app.rows.length<=5){
               for(var i=0;i<app.rows.length;i++) {
            
              app.displayRows.push(app.rows[i]) ;
           }  
            }else{
                for(var i=0;i<5;i++) {
              
              app.displayRows.push(app.rows[i]) ;
           }
            }
            }
           //get all items form local storage
        }
    },
     
    methods:{
        createItem:async function(){
            app.checkHaveInternet();
            
          if(this.connectionStatus=="online mode"){
              
       await fetch("http://localhost/todolistItems", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
           mode: 'cors', // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
              
            },
          
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({"id":'',"name":app.message,"state":"pending"}), // body data type must match "Content-Type" header
          });
   
       await  fetch('http://localhost/todolistItems').then(response=>{
           return response.json();
        }).then(rows => {
             localStorage.setItem("rows", JSON.stringify(rows));
         if(app.isHidden==false){
             app.rows = rows;
               app.paginationUpdate(); 
         app.paginationOnClick(app.onWhichIndex); 

        }else{
           app.toDoRow=[];
                    app.completedRow=[];
                 
                   for(var i =0;i< rows.length;i++){
                       if(rows[i].state=="pending"){
                        app.toDoRow.push(rows[i]);
                       }else{
                          app.completedRow.push(rows[i]);   
                       }
                   }
                   app.rows = app.toDoRow;
                   app.paginationUpdate(); 
           app.paginationOnClick(app.onWhichIndex); 
        }
   //create the item on db
     
        });
          }
   
       
    },
       
    deleteRows:function(row){
        app.checkHaveInternet();
            
          if(this.connectionStatus=="online mode"){
                    fetch("http://localhost/todolistItems/"+row.id, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
           
          });
          //delete the item on database 
            app.rows= app.removeObjectWithId(app.rows, row.id);
            if(app.rows.length==0){
                app.paginationUpdate();
                app.displayRows=[];
            }else if(row.id==app.displayRows[0].id&&app.rows.length%5==0&&app.onWhichIndex+1!=Math.ceil(app.rows.length/5)){
                 app.paginationUpdate();
                 app.onWhichIndex=app.onWhichIndex-1;
       app.paginationOnClick(app.onWhichIndex); 
            }else{
                app.paginationUpdate();
                
       app.paginationOnClick(app.onWhichIndex);  
            }//update on the frontend
          }
    
    },
    
     updateRows:async function(row){
         var nowState = "pending";
       if(row.state=="pending"){
           nowState="completed";
          
       }
        app.checkHaveInternet();
            
          if(this.connectionStatus=="online mode"){
               await   fetch("http://localhost/todolistItems/"+row.id, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({"id":row.id,"name":row.name,"state":nowState}), // body data type must match "Content-Type" header
          });
         //update the item
         await  fetch('http://localhost/todolistItems').then(response=>{
           return response.json();
        }).then(rows => {   
           
             if(app.isHidden==false){
             app.rows = rows;
         app.paginationOnClick(app.onWhichIndex); 

        }else{
           app.toDoRow=[];
                    app.completedRow=[];
                 
                   for(var i =0;i< rows.length;i++){
                       if(rows[i].state=="pending"){
                        app.toDoRow.push(rows[i]);
                       }else{
                          app.completedRow.push(rows[i]);   
                       }
                   }
                   app.rows = app.toDoRow;
          
            app.paginationUpdate(); 
           if(app.rows.length==0){
                app.paginationUpdate();
                app.displayRows=[];
            }else if(row.id==app.displayRows[0].id&&app.rows.length%5==0&&app.onWhichIndex+1!=Math.ceil(app.rows.length/5)){
                 app.paginationUpdate();
                 app.onWhichIndex=app.onWhichIndex-1;
       app.paginationOnClick(app.onWhichIndex); 
            }else{
                app.paginationUpdate();
                
       app.paginationOnClick(app.onWhichIndex);  
            }
       //update frontend
        }
        });
          }
           
             
       
       
    },
            paginationOnClick:function(index){
                app.displayRows=[];
                var numOfPage = app.rows.length/5;
                var lastPageItem = app.rows.length%5;
               app.onWhichIndex = index;
             
     var checkUndefCase = Math.ceil(numOfPage) - numOfPage;
    
         if(index+1==Math.ceil(numOfPage)&&checkUndefCase!=0){
               
           for(var i = index*5;i< index*5+lastPageItem;i++){
                      app.displayRows.push(app.rows[i]) ;
               }   
         }else{
            
            for(var i = index*5;i< index*5+5;i++){
                      app.displayRows.push(app.rows[i]) ;
               }  
         }
     },//decide which item to display
              
    
     paginationUpdate:function(){
     var numOfPage = app.rows.length/5;

            const newPaginationDiv = document.createElement("div");
              newPaginationDiv.id = "paginationBar";
              newPaginationDiv.classList.add("pagination");
         for(var i = 0; i< Math.ceil(numOfPage);i++)  {
             var pageNum = i+1;
   newPaginationDiv.innerHTML += ' <button class="btn btn-sm" onclick="app.paginationOnClick('+i+')">'+pageNum.toString()+'</button>';
         }
           const currentDiv = document.getElementById("paginationBar");
          currentDiv.parentNode.replaceChild(newPaginationDiv, currentDiv);
        
    
    }, //create number of pagination
    
     isHideCompletedItem:function(){
         
                if(app.isHidden==false){
                   
                        app.isHidden=true ;
                          app.showcompletedItemButton="show the completed items";
                            app.toDoRow=[];
                    app.completedRow=[];
                 
                   for(var i =0;i< app.rows.length;i++){
                       if(app.rows[i].state=="pending"){
                        app.toDoRow.push(app.rows[i]);
                       }else{
                          app.completedRow.push(app.rows[i]);   
                       }
                   }
                   app.rows = app.toDoRow;
                      if(app.rows.length==0){
                       app.paginationUpdate();  
                       app.displayRows=[];
                      
                    }else{
                          app.paginationUpdate(); 
                  app.onWhichIndex = 0;
      app.paginationOnClick(app.onWhichIndex);
                    }
              
 
                }else{
                         app.isHidden=false; 
                              app.showcompletedItemButton="hide the completed items";
                               for(var i =0;i< app.completedRow.length;i++){
                      app.rows.push(app.completedRow[i]);
                     
                   }
                    app.rows = app.toDoRow;
                    
                         app.paginationUpdate();                     
                   app.onWhichIndex = 0;
      app.paginationOnClick(app.onWhichIndex);

                }//function for the show and hide completed item
    },    removeObjectWithId:function(arr, id){
      
           const objWithIdIndex = arr.findIndex((obj) => obj.id === id);

  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }

  return arr;  
   //remove item form array 
            
    },
   checkHaveInternet:async function(){
      
      
   try {
        const response = await fetch(
            'http://localhost/todolistItems',{mode: 'no-cors'}
        );

         app.connectionStatus = "online mode";
    } catch (error) {
        app.connectionStatus = "offline mode";
    }
   //check online 
    console.log(app.connectionStatus);   
    },
     logout: function(){
      
    window.location.href = "login.html";//go back to login page
    },
    },}
)


