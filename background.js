let color = '#3aa757';
let active = false

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ active });
  console.log('Default background color set to %cgn', `color: ${color}`);
  console.log('Default background color set to %cghn kjh', `color: ${color}`);
});

// chrome.declarativeContent.onPageChanged.addListener((ran)=>
// {
//     console.log('*******************  page change from the background ************')
// })


  chrome.action.onClicked.addListener(function (tab) {


    // console.log(active)

    chrome.storage.sync.get("active", ({ active }) => {

            if(!active)
            {
                chrome.storage.sync.set({ active:true });

                chrome.action.setBadgeText(
                    {
                        text: 'ON'
                    }
                    , ()=> {})
                    chrome.action.setBadgeBackgroundColor(
                        {
                            color: [2,55,144,1]
                        }
                        , ()=> {})




                chrome.tabs.query( {} , (tabs) =>{ // The Query {} was missing here
                    // console.log(tabs)
                    console.log(chrome.tabs)
                for (var i = 0; i < tabs.length; i++) {
                    console.log(i+"   i the id:   "+ tabs[i].id)
                }
            });
            }
            else
            {
                chrome.storage.sync.set({ active:false });
                chrome.action.setBadgeText(
                    {
                        text: 'OFF'
                    }
                    , ()=> {})
                    chrome.action.setBadgeBackgroundColor(
                        {
                            color: [200,55,2,1]
                        }
                        , ()=> {})
            }
    })

})

  

