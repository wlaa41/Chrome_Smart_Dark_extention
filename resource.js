// document.addEventListener('DOMNodeInserted',handleInsertedElement)
// document.body.backgroundColor = 'rgb(3,3,3)'

// function handleInsertedElement({relatedNode})
// {   
//     console.log(relatedNode.style.backgroundColor)
//     let actual = window.getComputedStyle(relatedNode, null).
//     getPropertyValue('background-color')
//     console.log(actual);
    
//     // console.log(e)
//     if(actual)
//     {
//         document.querySelectorAll("[class^=page]")
   

//     //      relatedNode.style.setProperty('border',
//     //      '3px solid lightplnk', "important");

//     //     //  relatedNode.style.setProperty('background',
//     //     //  'black', "important");        
//     //      relatedNode.style.setProperty('background-color',
//     //      'rgb(3,3,3)', "important");
//     }
// }
    //////////////////////////////////////////////////////////////



// all arguments end with '_adj' are to give YOU ability to call the method with different 
// value than than the default
function get_Active(){
    chrome.storage.sync.get("active", ({ active }) => {
        ACTIVE = active
    
        if(ACTIVE){
            

            //////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////

                function rgbatotext(rgba_array){
                    [r,g,b,a]=rgba_array
                    return "rgba("+r+","+g+","+b+","+a+ ")";
                }
                
                // dark or bright this method flips the value with keeping the color degree
                function flipColor(rgba_arry,rate=2){
            
                    let min = Math.min(...rgba_arry.slice(0,3))
                    let max = Math.max(...rgba_arry.slice(0,3)) 
                    for (let i = 0; i < rgba_arry.length-1; i++) {
                        rgba_arry[i] = (255-max- min + parseFloat(rgba_arry[i]) ) * rate;
                    }
                    let after = rgba_arry
                    return after
                }
            
                var operator_table = {
                    moreThan: function(a, b) { return a > b; },
                    lessThan: function(a, b) { return a < b; }
                    };
            
                // the properties to be changed in the dom element
                let properties = [ { name: "color", ratio: 1, camelCase: "color" , element: null, 
                                            threshold:350,compare: operator_table.lessThan, missingValue_replace: "rgba(255,120,150,1)"},
                                    { name: "background-color", ratio: 2, camelCase: "backgroundColor"  , 
                                        element: null, threshold:450,compare: operator_table.moreThan, missingValue_replace: "rgb(130,120,150)"},
                                
                                    { name: "border_color", ratio: 1, camelCase: "borderColor"  ,
                                        element: null, threshold:350,compare: operator_table.lessThan, missingValue_replace: "rgb(130,120,150)"} ,
                                    { name: "box-shadow", ratio: 1, camelCase: "boxShadow"  ,
                                        element: null, threshold:400,compare: operator_table.lessThan, missingValue_replace: "rgb(130,120,150)"} ]
            
            // #region  propperties
            let DomElemCount = 0;
            console.log('Start');
            // this to stop updating at every DOM update as -addEventListener DOMNodeInserted- fires a lot in the begining
            let updateNow = false  
            timeTOwait = 8000 // the time start slow then it become faster to be more responsive
            repetition_counter=0;
            let restartcounter = true
            let repRESETERstart = false
            let maxREPallowed = 200
            let nextMAXrepAllowed = 10
            listeningtoupdates = false
            let ACTIVE = false
            time2recheckAll = 5000

            reCheckAll_extraCheck=false
            //#endregion

            function reCheckALL_ExtraAfter_5sec()
            {
                if(!reCheckAll_extraCheck)
                {
                    reCheckAll_extraCheck = true
                    setTimeout(()=>{

                        console.log('%c-------------- firing double check --------------','color: yellow')
                        check_allElem()

                        reCheckAll_extraCheck = false;
                        console.log('%c-------------- ^^^^^^^^^^^^^^^^^^^ --------------','color: pink')

                    },time2recheckAll)
                }
            }


            // 
            function checkRepetitionFreq({relatedNode},repAllow_adj=  maxREPallowed){

                reCheckALL_ExtraAfter_5sec()
                console.log(relatedNode)
                if(repAllow_adj > repetition_counter)
                {
                    console.log('%cCounter at '+repetition_counter,'color: yellow')
                    repetition_counter+=1;
                    checkfreq(relatedNode);
                }
                else
                {
                    console.log('%crepetition_counter at '+ repetition_counter+' Too many repetition',"color: lightpink")
                    killListner()
                }
            }
            function checkfreq(relatedNode){
                if ( !repRESETERstart ) {
                    repRESETERstart = true;
                    resetAfter()
                } 
                checkProp_thenChange(relatedNode)
            }

            function resetAfter(time2wait = timeTOwait, nxtMax_adj = nextMAXrepAllowed)
            {
                console.log('%cnxtMax_adj value is '+nxtMax_adj+' time2wait value is '+time2wait,'color: orange')

                setTimeout(() => {
                    repRESETERstart = false
                    console.log('%cResting counter to 0','color: lightblue')
                    repetition_counter =0;
                    console.log('%cnxtMax_adj value is '+nxtMax_adj,'color: orange')
                    maxREPallowed = nxtMax_adj
                    EventListenerDOMNodeInserted()
                    if( time2wait >3000) // the time start slow then it become faster to be more responsive
                        {timeTOwait-=2000}
                    // timeTOwait = 3000 // the time start slow then it become faster to be more responsive

                }, time2wait);
            }
            function killListner()
            {
                console.log('%cStop Lisening',"color: red")
                document.removeEventListener('DOMNodeInserted',checkRepetitionFreq)
                listeningtoupdates=false
            }
            // function checkElementchange(relatedNode,DomElemCount_adj = DomElemCount){
            //     let elem =   document.body.getElementsByTagName("*");


            //         DomElemCount = elem.length
            //         ApplyChanges(elem)
                    
            // }




            function checkProp_thenChange(element)
            {

                // let itsText = element.childNodes[0]?.nodeValue?true:false
                // console.log(  ''+element.childNodes[0]?.nodeValue + ':  '      + itsText)
                // console.log(  element)


                for (let j = 0; j < properties.length; j++) {

                    let prop = window.getComputedStyle(element, null).getPropertyValue(properties[j].name);
                    // let propDef = element?.style[properties[j].name];
                    // let background = propDef?(element?.style['background']?true:false) : false;
                    
                    if(j > 0 ){
                    if(!prop){continue}
                    // if(!prop && element.tagName !=='BODY'){continue}
                    }
                    // handling missing data
                    var rgba = prop  ?prop: properties[j].missingValue_replace ; 
                
                    if(rgba !== undefined && rgba.length > 5) {

                            rgba = rgba.split('(')[1].split(')')[0]
                                    .replace(/ /g, '')
                                    .split(',');

                            // convert to number
                            rgba= rgba.map(Number) 
                            
                            // if (rgba[0]+rgba[1]+rgba[2] === 639) { // this methon was used to catch amazon wrong transparency behavior
                            //     console.log(rgbatotext(rgba) + "  639  "+  properties[j].name +"   "+ element)
                            //     // console.log('%c  sum   '+   sum_bckgrnd  +'   ##' ,`color: lightgreen`)
                            // }
                            if(rgba.length<4){
                                rgba = rgba.concat([1]) // changing rgb to rgba
                            }


                            // Cancel transparency 
                            rgba[3]= ( rgba[3] < 0.2 )? .2:rgba[3]

                        
                            const sum_bckgrnd= rgba[0]+rgba[1]+rgba[2] // calculate how bright the element is. the larger the number is the brighter it is
                            
                            // if (sum_bckgrnd === 639) { // this methon was used to catch amazon wrong transparency behavior
                            //     console.log(rgbatotext(rgba) + "  639  "+  properties[j].name +"   "+ element)
                            //     console.log('%c  sum   '+   sum_bckgrnd  +'   ##' ,`color: lightgreen`)
                            // }

                            threshold = properties[j].threshold  // the threshole where change in the color will happen
                            let newbackground = rgba
                            if (properties[j].compare(sum_bckgrnd,threshold)) {   // Dynamic comparision as some properties must have dark and other bright change
                                let newbackground = flipColor(rgba, properties[j].ratio) // calculating the new color
                            }
                                let name = properties[j].name
                                element.style.removeProperty(name);
                                element.style.setProperty(name, ""+rgbatotext(newbackground)+"", "important");
                    }
                }
                }

                
            function checkbody(defaultValue)
                {
                    let body = document.getElementsByTagName('body')[0]
                        let prop = window.getComputedStyle(body, null).getPropertyValue(defaultValue.name);
                        // handling missing data
                        var rgba = prop ? prop: defaultValue.defaultValue; 
                        if(rgba !== undefined && rgba.length > 5) {
                                rgba = rgba.split('(')[1].split(')')[0]
                                        .replace(/ /g, '')
                                        .split(',');
                                // convert to number
                                rgba= rgba.map(Number) 
                                if(rgba.length<4){
                                    rgba = rgba.concat([1]) // changing rgb to rgba
                                }
                                // Cancel transparency 
                                rgba[3]= ( rgba[3] < 0.2 )? 1:rgba[3]
                                const sum_bckgrnd= rgba[0]+rgba[1]+rgba[2] // calculate how bright the element is. the larger the number is the brighter it is
                                
                                threshold = defaultValue.threshold  // the threshole where change in the color will happen
                                let newbackground = rgba
                                if (defaultValue.compare(sum_bckgrnd,threshold)) {   // Dynamic comparision as some properties must have dark and other bright change
                                    let newbackground = flipColor(rgba, defaultValue.ratio) // calculating the new color
                                }
                                    let name = defaultValue.name
                                    body.style.removeProperty(name);
                                    body.style.setProperty(name, ""+rgbatotext(newbackground)+"", "important");
                            
                        }
                            
                }


            function EventListenerDOMNodeInserted(){
                if(!listeningtoupdates){
                    listeningtoupdates =true
                    console.log('%cStart Lisening',"color: green")
                    document.addEventListener('DOMNodeInserted',checkRepetitionFreq)
                    console.log('%cStart Lisening',"color: green")
                    console.log('%c^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',"color: green")

                }



            }
            // function  eventlistner(event){
            //     console.log('%cStill  Lisening .................  ',"color: purple")
            //     console.log(event)
            // }
            // get_Active()

                ////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////
                /////////////// Calling the methods above to apply//////////////
                /////////////////////////   changes  ///////////////////////////
                ////////////////////////////////////////////////////////////////

            checkbody(properties[1]) // the prop[1] to apply changes on the background if the order above change change the number
            // this to check the body as the it was not included in the main wildselector
            function check_allElem(){
                


                let elem =   document.body.getElementsByTagName("*");
                length = elem.length
                console.log(`%c-------------- ${length} --------------`,'color: hotpink')
                
                if(length>7000){
                    console.log(`%c-------------- extremly larg page --------------`,'color: red')
                    maxREPallowed = 4
                    time2recheckAll += length;
                     timeTOwait += .3*length
                }
                else if(length>5000){
                    console.log(`%c-------------- Huge page --------------`,'color: red')
                    time2recheckAll = 10000;
                    timeTOwait = 7000
                }
                for (var i = 0; i < elem.length; i++) { 
                    
                    let tag = elem[i].tagName.toLowerCase()
                    if(tag === 'script'|| tag === 'path'|| tag === 'meta'|| tag === 'img'|| tag === 'link'|| tag === 'svg'|| tag === 'use' )
                    {}else{
                        checkProp_thenChange(elem[i])
                    }
                }
            }

            check_allElem()
        
        // checkRepetitionFreq(relatedNode)
        EventListenerDOMNodeInserted()
    }

})
}

get_Active()
