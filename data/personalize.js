//Module to personalize a webpage based on an interest signal

function getDivContainers(){
	//returns a generator of container divs flagged for personalization
	var containers = document.getElementsByTagName('div')
	for (var container of containers) {
		if (container.hasAttribute('personalizable')) {
			var value = container.getAttribute('personalizable')
			if (value === 'true') {
				yield container
			}
		}
	}	
}

function tokenize(element) {
	//given an html element, it returns tokens from
	//any text within, having stripped out the html tags
	var tokens = element.innerText.toLowerCase().match(/[a-z]{3,}/g) //get textual tokens
	//remove anything in the stoplist
	var cleaned = []
	for (var t of tokens) {
		if (stoplist.hasOwnProperty(t) === false) {
			cleaned.push(t)
		}
	}
	return cleaned
}

function relevanceScore(interestSignal, newClassification){
	//gets a relevance score between a given interest signal
	//and some classification result
	//TODO
	return relevance
}

function classify(tokens){
	//gives some text tokens a classification according to LICA
	//TODO
	return [classification, confidence]
}

function chooseMostRelevant(childDivs, interestSignal){
	//1) Iterates through a series of child divs,
	//2) classifies them
	//3) orders by similarity to the interest signal
	//4) returns the most relevant one's id
	
	//TODO Edge Case: what if nothing is relevant?
	
	var bestMatch = ""
	var bestScore = 0
	
	for (childDiv of childDivs) {
		var tokens = tokenize(childDiv)
		var classification = classify(tokens)
		var similarity = relevanceScore(interestSignal, classification)
		if (similarity > bestScore) {
			bestScore = similarity
			bestMatch = childDiv.id
		}
	}
	
	return bestMatch
}

function getInterestSignal(){
	//returns interest signal
	//TODO
	return signal
}

function process_page(){
	//Main handler function
	
	//grab interest signal
	var signal = getInterestSignal()
	
	//get containers
	for (container in getDivContainers) {
		var mostRelevant = chooseMostRelevant(container.children, signal)
		for (container of container.children) {
			if (container.id == mostRelevant) {
				container.style.display = 'normal'	//hide if not most
			}else{									//relevant
				container.style.display = 'none'
			}
		}
	}
	
}

process_page()