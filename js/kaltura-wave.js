// Set Player as default tab
var tabs = new gadgets.TabSet(__MODULE_ID__, "Play");

// Initialization
function init() {

  // Define Tabs
  tabs.addTab("Play", {
                      contentContainer: document.getElementById("player")
                      });
  tabs.addTab("Edit", {
                      contentContainer: document.getElementById("editor")
                      });
  tabs.addTab("Add Media", {
                           contentContainer: document.getElementById("media_adder")
                           });
};

// Call init function to initialize and display tabs.
gadgets.util.registerOnLoadHandler(init);
