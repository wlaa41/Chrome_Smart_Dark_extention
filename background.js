let color = '#3aa757';
let active = false

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ active });
  console.log('Default background color set to %cgn', `color: ${color}`);
  console.log('Default background color set to %cghn kjh', `color: ${color}`);
});




// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id , allFrames: true},
//       function:  setPageBackgroundColor
//     });
   
//   });

   // The body of this function will be executed as a content script inside the
//   // current page

// #region setPageBackgroundColor
// function setPageBackgroundColor() {
//             console.log(this)
//             // document.body.style.backgroundColor = color;

//             chrome.storage.sync.get("color", ({ color }) => {
//             //   let elem =  document.getElementsByTagName('*')
                
//             function rgbatotext(rgba_array){
//                 [r,g,b,a]=rgba_array
//                 return "rgba("+r+","+g+","+b+","+a+ ")";
//             }
            
//             // dark or bright this method flips the value with keeping the color degree
//             function flipColor(rgba_arry,rate=2){

//                 // if(rate==1){console.log(rate+" "+rgba_arry+ 'before %c#######'  , `color: ${rgbatotext(rgba_arry)}`);}
//                 let min = Math.min(...rgba_arry.slice(0,3))
//                 let max = Math.max(...rgba_arry.slice(0,3)) 
//                 for (let i = 0; i < rgba_arry.length-1; i++) {
//                     rgba_arry[i] = (255-max- min + parseFloat(rgba_arry[i]) ) * rate;
//                 }
//                 let after = rgba_arry
//                 // if(rate==1){console.log(after + 'after %cback  #########' + min , `color: ${rgbatotext(after)}`)}
//                 return after
//             }

//             let elem =   document.getElementsByTagName("*");
//             // Dynamic Operator
//             var operator_table = {
//                 moreThan: function(a, b) { return a > b; },
//                 lessThan: function(a, b) { return a < b; }
//             };

//             // the properties to be changed in the dom element
//             let properties = [{ name: "background-color", ratio: 2, camelCase: "backgroundColor"  , 
//                                                         element: null, threshold:430,compare: operator_table.moreThan},
//                                 { name: "color", ratio: 1, camelCase: "color" , element: null, 
//                                                                         threshold:350,compare: operator_table.lessThan},
//                                 { name: "border_color", ratio: 1, camelCase: "borderColor"  ,
//                                                         element: null, threshold:350,compare: operator_table.lessThan} ]

//             for (var i = 0; i < elem.length; i++) {  
//                         for (let j = 0; j < properties.length; j++) {

//                             properties[j].element = window.getComputedStyle(elem[i], null).getPropertyValue(properties[j].name);


                    

//                             // handling missing data
//                             var rgba = properties[j].element? properties[j].element:"rgb(130,120,150)"; 



//                             rgba = rgba.substring(0, rgba.length-1).split('(')[1]
//                                     .replace(/ /g, '')
//                                     .split(',');

//                             // convert to number
//                             rgba= rgba.map(Number) 


//                             if(rgba.length<4){
//                                 rgba = rgba.concat([1]) // changing rgb to rgba
//                             }
//                             else if(rgba[3]<.8){ // increasing the brightness when the transparency is low
//                                 //this is important as rgba(0.0.0,0) can be consider dark while it is white
//                                 // because transparency is zero
//                                     for (let k = 0; k < rgba.length-1 ; k++) {
//                                     rgba[k] = 255- (rgba[3]* 255)

//                                 }
//                             }

//                             // Cancel transparency 
//                             rgba[3]=1

                            
//                             const sum_bckgrnd= rgba[0]+rgba[1]+rgba[2] // calculate how bright the element is. the larger the number is the brighter it is

//                             threshold = properties[j].threshold  // the threshole where change in the color will happen

//                             if (properties[j].compare(sum_bckgrnd,threshold)) {   // Dynamic comparision as some properties must have dark and other bright change
                                
//                                 let name = properties[j].name

//                                 let newbackground = flipColor(rgba, properties[j].ratio) // calculating the new color


//                                 elem[i].style.removeProperty(name);
//                                 // properties[j].element.style.backgroundColor = rgbatotext(newbackground)
//                                 // console.log('%c---   '+ rgbatotext(newbackground), `color: yellow`)
                                
//                                 elem[i].style.setProperty(name, ""+rgbatotext(newbackground)+"", "important");
                        

//                                 // if (elem[i].id === 'a-autoid-3-announce') { // this methon was used to catch amazon wrong transparency behavior
//                                 //     console.log(rgbatotext(newbackground) + "  "+  properties[j].name)
//                                 //     console.log('#######################################')
//                                 // }
//                             }
                        
//                         }

//             }
//     });
//   }
//#endregion


  chrome.action.onClicked.addListener(function (tab) {
    // console.log(active)

    chrome.storage.sync.get("active", ({ active }) => {

            if(!active)
            {
                chrome.storage.sync.set({ active:true });

                
                chrome.tabs.query( {} , (tabs) =>{ // The Query {} was missing here
                    // console.log(tabs)
                    console.log(chrome.tabs)
                for (var i = 0; i < tabs.length; i++) {
                    console.log(i+"   i the id:   "+ tabs[i].id)
                    
                        //    chrome.scripting.executeScript({
                        //    target: { tabId: tabs[i].id },
                        // //    file:  'setdarkmood.js'
                        //    });
                }
            });
            }
            else
            {
                chrome.storage.sync.set({ active:false });
            }
    })

})

  

