function ConstructQuestions() {
	for (let i = 0; i < jsonData.length; i++) {
		let jsonObj = jsonData[i];
		
		// Create a group fieldset for the question categories
		const fieldset = document.createElement('fieldset');
		fieldset.id = jsonObj.id;
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

			const br = document.createElement("br");
			//label.appendChild(br);
			
			// Append label to container
			fieldset.appendChild(label);
			
			const buttonGroup = document.createElement('div');

			createRadioButtons(buttonGroup, jsonObj.id, j);

			fieldset.appendChild(buttonGroup);
		}
	}
}

function createRadioButtons(buttonGroupElement, categoryId, questionNumber) {
	// Create radio buttons with values from 1 to 5
	for (var k = -1; k < 4; k++) {
		buttonLabelText = k;
		buttonValue = k;
		if (k == -1) {
			buttonLabelText = "?"
			buttonValue = 0;
		}
		var radio = document.createElement("input");
		radio.type = "radio";
		radio.id = categoryId + "q" + questionNumber + "-" + k;
		radio.name = categoryId + "q" + questionNumber + "-rating";
		radio.value = buttonValue;

		// Append radio button to label
		buttonGroupElement.appendChild(radio);

		// Add the value text label for the radio button
		var buttonLabel = document.createElement("label");
		buttonLabel.textContent = buttonLabelText;
		buttonLabel.htmlFor = categoryId + "q" + questionNumber + "-" + k;
		buttonGroupElement.append(buttonLabel);
		buttonGroupElement.append("\xa0 \xa0 \xa0 \xa0");
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