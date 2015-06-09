var {data} = require("sdk/self");
var {process_page} = require("personalize")

//needs a verbose mode

var pageMod = require("sdk/page-mod");

pageMod.PageMod({
	include: ["*", "file://*"],
	contentScriptFile: data.url("personalize_worker.js"),
	onAttach: function(worker) {
		
		//Send a signal to get some container divs that need personalizing
		worker.port.emit("get_container_divs");
		
		//Once some container divs have been found,  
		worker.port.on("got_container_divs", function(retrieved_divs) {
			console.log('getting results')
			let results = process_page(retrieved_divs)
			worker.port.emit("show_hide_child_divs", results)
		});
	}
});

//testing file:
//file:///Users/mruttley/Documents/2015-06-02%20Rearranger/mozcurator/test/test.html


