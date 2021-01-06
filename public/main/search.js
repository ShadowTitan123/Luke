
const form = document.getElementById("search_form");
const search_input  = document.getElementById("search_input");


search_input.addEventListener("keyup",(event)=>{

   $('.quick-search').hide();

   var key = event.keyCode || event.charCode;

   if( key == 8 || key == 46 ){
     
       if((search_input.value.length === 0) || (search_input.value === '')){
        
        $('.quick-search').show();
       }
   }
    

});


form.addEventListener("submit",(e)=>{

//alert("clicked");
 e.preventDefault();
 var keyword = document.getElementById("search_input");
 let words = keyword.value;


 $('.addyellow').removeClass('addyellow');

 


 var word = words,
   queue = [document.body],
   curr
;
while (curr = queue.pop()) {
   if (!curr.textContent.toUpperCase().match(word.toUpperCase())) continue;
   for (var i = 0; i < curr.childNodes.length; ++i) {
       switch (curr.childNodes[i].nodeType) {
           case Node.TEXT_NODE : // 3
               if (curr.childNodes[i].textContent.toUpperCase().match(word.toUpperCase())) {
                   console.log("Found!");
                   console.log(curr);
                   curr.scrollIntoView();
                //    curr.style.backgroundColor = 'yellow';
                curr.classList.add("addyellow");
                   // you might want to end your search here.
               }
               break;
           case Node.ELEMENT_NODE : // 1
               queue.push(curr.childNodes[i]);
               break;
       }
   }
}



});