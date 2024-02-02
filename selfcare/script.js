// Creating an empty object
var questions = {};

// Adding key-value pairs
questions["Physical Self-Care"] = ["Apple sauce", "Orange juice", "Banana peel"];
questions["Psychological Self-Care"] = ["tomato", "corn", "radish", "cucumber"];


function ConstructQuestions() {
	
	/*alert(jsonData[0].id);
	alert(jsonData[0].title);
	alert(jsonData[0].questions);*/
	
	for (let i = 0; i < jsonData.length; i++) {
		let obj = jsonData[i];
		
		// Create a group fieldset for the question categories
		const fieldset = document.createElement('fieldset');
		fieldset.id = obj.id;
		const legend = document.createElement('legend');
		legend.textContent = obj.title;
		fieldset.appendChild(legend);
		parentContainer.appendChild(fieldset); // Add the fieldset to the parent container
		
		for (let j = 0; j < obj.questions.length; j++) {
			let question = obj.questions[j];
			
			// Create a label element
			var label = document.createElement("label");
			label.textContent = question;

			const br = document.createElement("br");
			//label.appendChild(br);
			
			// Append label to container
			fieldset.appendChild(label);
			
			const buttonGroup = document.createElement('div');
			
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
				radio.id = obj.id + "q" + j + "-" + k;
				radio.name = obj.id + "q" + j + "-rating";
				radio.value = buttonValue;

				// Append radio button to label
				buttonGroup.appendChild(radio);
				
				// Add the value text label for the radio button
				var buttonLabel = document.createElement("label");
				buttonLabel.textContent = buttonLabelText;
				buttonLabel.htmlFor = obj.id + "q" + j + "-" + k;
				buttonGroup.append(buttonLabel);
				buttonGroup.append("\xa0 \xa0 \xa0 \xa0");
			}

			fieldset.appendChild(buttonGroup);
			//fieldset.appendChild(br);


		}
	}
	
    // Iterating over key-value pairs
    for (var key in questions) {

        console.log(key + ": " + questions[key]);

        // Create a div for each first element in the child array
        const divElement = document.createElement("div");
        divElement.id = key;
        parentContainer.appendChild(divElement); // Add the div to the parent container

        var heading = document.createElement("h3");
        heading.innerHTML = key;
        divElement.appendChild(heading);

        // Create radio buttons for each array element in the second element
        questions[key].forEach((element, index) => {

            // Create a label element
            var label = document.createElement("label");
            label.textContent = element;

            const br = document.createElement("br");
            label.appendChild(br);

            // Create radio buttons with values from 1 to 5
            for (var j = 1; j <= 5; j++) {
                var radio = document.createElement("input");
                radio.type = "radio";
                radio.id = element + j;
                radio.name = element + "-rating";
                radio.value = j;

                // Append radio button to label
				label.htmlFor = element + j;
                label.appendChild(radio);
                label.append(j);
            }

            label.appendChild(br);

            // Append label to container
            divElement.appendChild(label);
        });
    }
}

function calculateResults() {
    results.innerHTML = ""; // Clear previous results

    for (var key in questions) {
        var totalScore = 0;
        var userScore = 0;
        questions[key].forEach((element, index) => {
            totalScore += 5;
            var rating = document.querySelector('input[name="' + element + '-rating"]:checked');
            if (rating) {
                var questionScore = parseInt(rating.value);
                userScore += questionScore;
                var result = document.createElement("p");
                //result.innerHTML = element + " score: " + questionScore;
                results.appendChild(result);
            } else {
                //results.innerHTML = "<p>Please rate all fruits.</p>";
                //return;  // anya todo uncomment
            }
        });
        var result = document.createElement("p");
        result.innerHTML = key + " score: " + userScore + "/" + totalScore + " (" + calculatePercentage(userScore, totalScore) + ")";
        results.appendChild(result);

    }
}

function calculatePercentage(part, whole) {
  var percentage = (part * 1.0 / whole) * 100; // Calculates the percentage
  var roundedPercentage = Math.round(percentage * 10) / 10; // Rounds to one decimal place
  return roundedPercentage + "%"; // Appends the "%" symbol
}