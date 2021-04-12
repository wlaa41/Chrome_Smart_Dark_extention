
function setPageBackgroundColor() {

    chrome.storage.sync.get("color", ({ color }) => {

    function rgbatotext(rgba_array){
        [r,g,b,a]=rgba_array
        return "rgba("+r+","+g+","+b+","+a+ ")";
    }
    
    // dark or bright this method flips the value with keeping the color degree
    function flipColor(rgba_arry,rate=2){

        // if(rate==1){console.log(rate+" "+rgba_arry+ 'before %c#######'  , `color: ${rgbatotext(rgba_arry)}`);}
        let min = Math.min(...rgba_arry.slice(0,3))
        let max = Math.max(...rgba_arry.slice(0,3)) 
        for (let i = 0; i < rgba_arry.length-1; i++) {
            rgba_arry[i] = (255-max- min + parseFloat(rgba_arry[i]) ) * rate;
        }
        let after = rgba_arry
        // if(rate==1){console.log(after + 'after %cback  #########' + min , `color: ${rgbatotext(after)}`)}
        return after
    }

    
    

    let e = document.getElementsByClassName("smart-bar--smart-bar--yellow--3RXTf")
    console.log('e which the yollow ')
    console.log('----')
    console.log(e)
    // Dynamic Operator     smart-bar--smart-bar--yellow--3RXTfsmart-bar--smart-bar--32jNQ smart-bar--smart-bar--yellow--3RXTf
    var operator_table = {
        moreThan: function(a, b) { return a > b; },
        lessThan: function(a, b) { return a < b; }
    };

    // the properties to be changed in the dom element
    let properties = [{ name: "background-color", ratio: 2, camelCase: "backgroundColor"  , 
                            element: null, threshold:430,compare: operator_table.moreThan, missingValue_replace: "rgb(130,120,150)"},
                        { name: "color", ratio: 1, camelCase: "color" , element: null, 
                            threshold:350,compare: operator_table.lessThan, missingValue_replace: "rgba(255,120,150,1)"},
                        { name: "border_color", ratio: 1, camelCase: "borderColor"  ,
                            element: null, threshold:350,compare: operator_table.lessThan, missingValue_replace: "rgb(130,120,150)"} ,
                        { name: "box-shadow", ratio: 1, camelCase: "boxShadow"  ,
                            element: null, threshold:400,compare: operator_table.lessThan, missingValue_replace: "rgb(130,120,150)"} ]



    let elem =   document.body.getElementsByTagName("*");

    checkChange(document.getElementsByTagName('body')[0])// this to check the body as the it was not included in the main wildselector
    for (var i = 0; i < elem.length; i++) { 
        checkChange(elem[i])
    }


    console.log('number of element in the DOM '+ elem.length)
    console.log('element number 7 in the DOM  '+ elem.length)
    console.log(elem[6])

    function checkChange(element)
    {
        for (let j = 0; j < properties.length; j++) {

            properties[j].element = window.getComputedStyle(element, null).getPropertyValue(properties[j].name);
         

            // handling missing data
            var rgba = properties[j].element  ?properties[j].element: properties[j].missingValue_replace ; 
            if(element.classList.contains("smart-bar--smart-bar--yellow--3RXTf") ||  rgba === "rga(255, 231, 153)"){
                console.log('catch it     #############################################3')
            }
            // console.log(rgba,properties[j].name) 
        
            if(rgba !== undefined && rgba.length > 5) {

                    rgba = rgba.split('(')[1].split(')')[0]
                            .replace(/ /g, '')
                            .split(',');

                    // convert to number
                    rgba= rgba.map(Number) 
                    
                    if (rgba[0]+rgba[1]+rgba[2] === 639) { // this methon was used to catch amazon wrong transparency behavior
                        console.log(rgbatotext(rgba) + "  639  "+  properties[j].name +"   "+ element)
                        console.log('%c  sum   '+   sum_bckgrnd  +'   ##' ,`color: lightgreen`)
                    }
                    if(rgba.length<4){
                        rgba = rgba.concat([1]) // changing rgb to rgba
                    }
                    // else if(rgba[3]<.5){ // increasing the brightness when the transparency is low
                    //     //this is important as rgba(0.0.0,0) can be consider dark while it is white
                    //     // because transparency is zero
                    //     let sum = 0
                    //         for (let k = 0; k < rgba.length-1 ; k++) {
                    //         rgba[k] = 255- (rgba[3]* 255)
                    //         sum+=rgba[k]

                    //     }

                        
                    // }

                    // Cancel transparency 
                    rgba[3]= ( rgba[3] < 0.2 )? .2:rgba[3]

                
                    const sum_bckgrnd= rgba[0]+rgba[1]+rgba[2] // calculate how bright the element is. the larger the number is the brighter it is
                    
                    if (sum_bckgrnd === 639) { // this methon was used to catch amazon wrong transparency behavior
                        console.log(rgbatotext(rgba) + "  639  "+  properties[j].name +"   "+ element)
                        console.log('%c  sum   '+   sum_bckgrnd  +'   ##' ,`color: lightgreen`)
                    }

                    threshold = properties[j].threshold  // the threshole where change in the color will happen
                    let newbackground = rgba
                    if (properties[j].compare(sum_bckgrnd,threshold)) {   // Dynamic comparision as some properties must have dark and other bright change
                        let newbackground = flipColor(rgba, properties[j].ratio) // calculating the new color
                    }
                        let name = properties[j].name



                        element.style.removeProperty(name);
                        // properties[j].element.style.backgroundColor = rgbatotext(newbackground)
                        // console.log('%c---   '+ rgbatotext(newbackground), `color: yellow`)
                        
                        element.style.setProperty(name, ""+rgbatotext(newbackground)+"", "important");
                

                           
                        if (sum_bckgrnd === 639)  { // this methon was used to catch amazon wrong transparency behavior
                            console.log(rgbatotext(newbackground) + "  "+  properties[j].name)
                            console.log('##########   after   ###############')
                        }
                   
            }
                
        }
    }



});

}

chrome.storage.sync.get("active", ({ active }) => {
    // changeColor.style.backgroundColor = color;
    // changeColor.innerHTML=""+active
    // console.log('hello ################################3')
    console.log(active)
    if(active)setPageBackgroundColor();

    // changeColor.style.color='white'
  });
// setPageBackgroundColor()