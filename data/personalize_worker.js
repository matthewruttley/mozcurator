//Module that can modify a web page's divs

//Module exists because only firefox content scripts can
//access and modify the page. main.js must sent serializable objects
//to content scripts.

// 2 sections to this module, message passing and functionality.
// - the message parsers receive instructions of what to do from the main.js file
// - the functionality creators 

///////Message passing

self.port.on("get_container_divs", function() {
	//Gets some container divs
	containers = get_div_containers()
	self.port.emit("got_container_divs", containers)
});

self.port.on("show_hide_child_divs", function(which_ones){
	//Given a container div and a specific child div
	// like: [container.id, child.id]
	
	show_hide_child_divs(which_ones)
});

///////Functionality

function show_hide_child_divs(which_ones) {
	//Shows and hides some child divs
	
	for (let entry of which_ones) {
		container = document.getElementById(entry[0])
		child_to_show = entry[1]
	
		for (let child_div of container.children) {
			if (child_div.id != child_to_show) {
				child_div.style.display = 'none' //hide if not most relevant
			}
		}
	}
	
}

function get_div_containers(){
	//returns a generator of container divs flagged for personalization
	let containers = document.getElementsByTagName('div')
	
	let found = {} //relevant containers formatted like:
	//{
	//	"container_id": [
	//		{
	//			"child_id": "Child element's html content"
	//			"chidl_id_2": "More html content"
	//		}
	//	]
	//}
	
	console.log('Processing ', containers.length, " containers")
	
	for (let container of containers) {
		if (container.hasAttribute('personalizable')) {
			let value = container.getAttribute('personalizable')
			if (value === 'true') {
				
				console.log("Found a container called ", container.id, " that needs to be personalized")
				
				//format the contents correctly
				let child_elements = []
				for (let child_div of container.children) {
					child_elements.push([child_div.id, child_div.textContent])
				}
				
				found[container.id] = child_elements
			}
		}
	}
	
	console.log("Sending ", Object.keys(found).length, " containers to be processed")
	
	return found
}
