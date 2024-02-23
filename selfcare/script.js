function ConstructQuestions() {
	for (let i = 0; i < jsonData.length; i++) {
		let jsonObj = jsonData[i];
		
		// Create a group fieldset for the question categories
		const fieldset = document.createElement('fieldset');
		fieldset.id = jsonObj.id;
		fieldset.classList.add(jsonObj.id);
		const legend = document.createElement('legend');
		legend.textContent = jsonObj.title;
		legend.classList.add(jsonObj.id);
		fieldset.appendChild(legend);
		parentContainer.appendChild(fieldset); // Add the fieldset to the parent container
		
		for (let j = 0; j < jsonObj.questions.length; j++) {
			let question = jsonObj.questions[j];
			
			// Create a label element
			var label = document.createElement("label");
			label.textContent = question;
			label.style.fontWeight = 'bold';
			
			// Append label to container
			fieldset.appendChild(label);
			
			const buttonGroup = document.createElement('div');

			createRadioButtons(buttonGroup, jsonObj.id, j);

			fieldset.appendChild(buttonGroup);
			
			const br = document.createElement("br");
			fieldset.appendChild(br);
		}
	}
}

function createRadioButtons(buttonGroupElement, categoryId, questionNumber) {
	// Create radio buttons with values from 1 to 5
	for (var k = 3; k >= -1; k--) {
		buttonValue = k;
		if (k == -1) {
			buttonValue = 0;
		}
		var radio = document.createElement("input");
		radio.type = "radio";
		radio.id = categoryId + "q" + questionNumber + "-" + k;
		radio.name = categoryId + "q" + questionNumber + "-rating";
		radio.value = buttonValue;
		radio.classList.add(categoryId);

		// Append radio button to label
		buttonGroupElement.appendChild(radio);

		// Add the value text label for the radio button
		var buttonLabel = document.createElement("label");
		buttonLabel.textContent = getRatingText(k);
		buttonLabel.htmlFor = categoryId + "q" + questionNumber + "-" + k;
		buttonGroupElement.append(buttonLabel);
		const br = document.createElement("br");
		buttonGroupElement.appendChild(br);
	}
}

function getRatingText(numberValue) {
	switch (numberValue) {
	  case -1:
		return "This never occurred to me";
	  case 0:
		return "I never do this";
	  case 1:
		return "I barely or rarely do this";
	  case 2:
		return "I do this okay (occasionally)";
	  case 3:
		return "I do this well (frequently)";
	  default:
		return "unexpected input in getRatingText";
	}
}

function calculateResults() {
    results.innerHTML = ""; // Clear previous results

	let resultsArray = new Array(6);

    for (let i = 0; i < jsonData.length; i++) {
        let jsonObj = jsonData[i];

        var totalScore = 0;
        var userScore = 0;

        for (let j = 0; j < jsonObj.questions.length; j++) {
            let question = jsonObj.questions[j];
            totalScore += 3;  // todo magic number booboo
            var rating = document.querySelector('input[name="' + jsonObj.id + "q" + j + '-rating"]:checked');
            if (rating) {
                var questionScore = parseInt(rating.value);
                userScore += questionScore;
                var result = document.createElement("p");
                results.appendChild(result);
            } else {
                //results.innerHTML = "<p>Please rate all fruits.</p>";
                //return;  // anya todo uncomment
            }
        }

        var result = document.createElement("p");
        result.innerHTML = jsonObj.title + " score: " + userScore + "/" + totalScore + " (" + calculatePercentage(userScore, totalScore) + "%)";
        results.appendChild(result);
		resultsArray[i] = calculatePercentage(userScore, totalScore);
    }
	
	createChart(resultsArray[0], resultsArray[1], resultsArray[2], resultsArray[3], resultsArray[4], resultsArray[5])
}

function calculatePercentage(part, whole) {
  var percentage = (part * 1.0 / whole) * 100; // Calculates the percentage
  var roundedPercentage = Math.round(percentage * 10) / 10; // Rounds to one decimal place
  return roundedPercentage;
}