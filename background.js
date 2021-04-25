let color = '#3aa757';
let active = false

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ active });
  console.log('Default background color set to %cgn', `color: ${color}`);
  console.log('Default background color set to %cghn kjh', `color: ${color}`);
});

// chrome.decl
  chrome.action.onClicked.addListener(function (tab) {

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
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[i].id },
                        function: pageRefresher
                      });
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

                

                    chrome.tabs.query( {} , (tabs) =>{ // The Query {} was missing here
                            // console.log(tabs)
                            console.log(chrome.tabs)
                        for (var i = 0; i < tabs.length; i++) {
                            console.log(i+"   i the id:   "+ tabs[i].id)
                            chrome.scripting.executeScript({
                                target: { tabId: tabs[i].id },
                                function: pageRefresher
                              });
                        }
                    });
            }
    })

})

  

function pageRefresher() {
    window.location.reload();
    // document.body.style.backgroundColor = 'red';
  }
