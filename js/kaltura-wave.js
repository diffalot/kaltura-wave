// Set Player as default tab
var tabs = new gadgets.TabSet(__MODULE_ID__, "Play");

// Initialization
function init() {

  // Define Tabs
  tabs.addTab("Play", {
                      contentContainer: document.getElementById("kplayer")
                      });
  tabs.addTab("Edit", {
                      contentContainer: document.getElementById("keditor")
                      });
  tabs.addTab("Add Media", {
                           contentContainer: document.getElementById("kmedia_adder")
                           });
}

// Call init function to initialize and display tabs.
gadgets.util.registerOnLoadHandler(init);
