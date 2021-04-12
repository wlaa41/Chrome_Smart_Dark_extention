
chrome.storage.sync.get("active", ({ active }) => {
    // changeColor.style.backgroundColor = color;
    // changeColor.innerHTML=""+active
    console.log('hello ################################3')
    console.log(active)
    // changeColor.style.color='white'
  });








//     console.log(this)

//     // document.body.style.backgroundColor = color;

//     chrome.storage.sync.get("color", ({ color }) => {
//     //   let elem =  document.getElementsByTagName('*')
        
//     function rgba(rgba_array){
//         [r,g,b,a]=rgba_array
//         return "rgba("+r+","+g+","+b+","+a+ ")";
//     }
    
//     // Option 1
//     // it adds the value to 128 which result of DARKER than the next function
//     function text_darkmode(rgba_arry, rate=1){
//         // console.log(rgba_arry + ' %c########## text before  #############'  , `color: ${rgba(rgba_arry)}`);

//         let min = Math.min(...rgba_arry.slice(0,3))
//         let max = Math.max(...rgba_arry.slice(0,3)) 
//         for (let i = 0; i < rgba_arry.length-1; i++) {
//             rgba_arry[i] = (255-max- min + parseFloat(rgba_arry[i]) ) * rate;
//         }

//         let after = rgba_arry

//         // let after = [ rgba_arry[0]+bright_increacse,  rgba_arry[1]+bright_increacse,  rgba_arry[2] +bright_increacse ,  rgba_arry[3]   ]
//         // console.log(after + ' %c########## text after          #############'  , `color: ${rgba(after)}`);

//         return after
//     }
//     // Option 2
//     // It subtract the diff betwee the number and the max  from 255 which result a brighter color
//     function background_darkmode(rgba_arry,rate=2){
//         // console.log(rgba_arry + ' %cback before  ###############'  , `color: ${rgba(rgba_arry)}`);


//         let min = Math.min(...rgba_arry.slice(0,3))
//         let max = Math.max(...rgba_arry.slice(0,3)) 
//         for (let i = 0; i < rgba_arry.length-1; i++) {
//             rgba_arry[i] = (255-max- min + parseFloat(rgba_arry[i]) ) * rate;
//         }

//         let after = rgba_arry
//         // console.log(after + ' %cback after        ###############' + min , `color: ${rgba(after)}`);


//         return after
//     }

//     var body = document.getElementsByTagName('body')
//     body[0].style.backgroundColor ='rgb(243,243,243)'

//     let elem =   document.getElementsByTagName("*");

//     for (var i = 0; i < elem.length; i++) {

//         if (true) {
            
//             var rgba_bkgrnd = window.getComputedStyle(elem[i], null).getPropertyValue("background-color");
//             var rgba_color = window.getComputedStyle(elem[i], null).getPropertyValue("color");
//             var border_color = window.getComputedStyle(elem[i], null).getPropertyValue("border-color");

//                 if (true ){
//                     var rgba_bkgrnd  = rgba_bkgrnd.substring(0, rgba_bkgrnd.length-1).split('(')[1]
//                             .replace(/ /g, '')
//                             .split(',');

//                     if(rgba_bkgrnd.length<4){rgba_bkgrnd = rgba_bkgrnd.concat([1])}
                    
//                     rgba_bkgrnd= rgba_bkgrnd.map(Number) 
//                     const sum_bckgrnd= rgba_bkgrnd[0]+rgba_bkgrnd[1]+rgba_bkgrnd[2]

//                     // cancel trasparent 
//                     rgba_bkgrnd[3] = 1

//                     if(sum_bckgrnd > 460){  // bright background 


//                         let newbackground = background_darkmode(rgba_bkgrnd)
//                         // console.log('%c-----back-   '+ rgba(newbackground), `color: yellow`)
//                         elem[i].style.removeProperty("background-color");
//                         elem[i].style.backgroundColor = rgba(newbackground)
//                         elem[i].style.setProperty("background-color", ""+rgba(newbackground)+"", "important");
//                     }
//                     if(rgba_bkgrnd[2]===0){
//                         // console.log('%c--   warning    '+ rgba(newbackground), `color: red`)
//                     }
//                 }


//                 if(rgba_color){
                    
//                     rgba_color  = rgba_color.substring(0, rgba_color.length-1).split('(')[1]
//                             .replace(/ /g, '')
//                             .split(',');

//                     if(rgba_color.length<4){rgba_color = rgba_color.concat([1])}
                    

//                     rgba_color= rgba_color.map(Number) 

//                     const sum_color= rgba_color[0]+rgba_color[1]+rgba_color[2]
                    
//                     let newcolor
//                     if(sum_color < 350){  //  dark color 
//                         if(sum_color< 260)
//                         {
//                             newcolor = text_darkmode(rgba_color ,1)

//                         }
//                         else{
//                             newcolor = text_darkmode(rgba_color ,1)

//                         }
//                         // console.log('%c      color-  '+ rgba(newcolor), `color: plum`)
//                         elem[i].style.color = rgba(newcolor)


//                         elem[i].style.removeProperty("color");
//                         elem[i].style.color = rgba(newcolor)
//                         elem[i].style.setProperty("color", ""+rgba(newcolor)+"", "important");

//                     }
                

//                 }
                
//                 if(border_color){
                    

//                     border_color  = border_color.substring(0, border_color.length-1).split('(')[1]
//                             .replace(/ /g, '')
//                             .split(',');

//                     if(border_color.length<4){border_color = border_color.concat([1])}
                    

//                     border_color= border_color.map(Number) 

//                     const sum_color= border_color[0]+border_color[1]+border_color[2]
                    
//                     let newcolor
//                     if(sum_color < 350){  //  dark color 
//                         if(sum_color< 260)
//                         {
//                             newcolor = text_darkmode(border_color ,1)

//                         }
//                         else{
//                             newcolor = text_darkmode(border_color ,1)

//                         }
//                         // console.log('%c      color-  '+ rgba(newcolor), `color: plum`)
//                         elem[i].style.border_color = rgba(newcolor)
//                     }
                

//                 }

                
//         }

//     }





//     });

//   }


//   setPageBackgroundColor();

  