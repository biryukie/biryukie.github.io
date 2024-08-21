//const statewideForm = "https://www.sos.wa.gov/sites/default/files/2024-06/Signature_Update_Form_English_1.pdf";

function GenerateCountyCards() {
	for (let i = 0; i < countyElectionsData.length; i++) {
		let jsonObj = countyElectionsData[i];
		
		// Create the outer div
		const outerDiv = document.createElement('div');
		outerDiv.className = 'col-4 col-12-medium card';

		// Create the section element
		const section = document.createElement('section');
		section.className = 'box feature';

		// Create the anchor tag with image
		const anchor = document.createElement('a');
		anchor.href = '#';
		anchor.className = 'image featured';
		
		const img = document.createElement('img');
		img.src = 'images/' + (jsonObj.pic ? jsonObj.pic : 'pic01.jpg'); /* TODO: add a placeholder image */
		img.alt = '';
		
		anchor.appendChild(img);

		// Create the inner div
		const innerDiv = document.createElement('div');
		innerDiv.className = 'inner';

		// Create the header element
		const header = document.createElement('header');

		const h2 = document.createElement('h2');
		h2.textContent = jsonObj.countyname;
		
		const p1 = document.createElement('p');
		p1.innerHTML = `<a href="https://${jsonObj.website}" target="_blank">${jsonObj.website}</a>`;
		
		const p2 = document.createElement('p');
		p2.textContent = "✉ " + jsonObj.email;
		
		const p3 = document.createElement('p');
		p3.textContent = "☏ Phone: " + jsonObj.phone;
		
		const p4 = document.createElement('p');
		p4.textContent = "🖷 Fax: " + jsonObj.fax;
		
		header.appendChild(h2);
		header.appendChild(p1);
		header.appendChild(p2);
		header.appendChild(p3);
		header.appendChild(p4);

		// Add the header to the inner div
		innerDiv.appendChild(header);
		
		if (jsonObj.canEmailCurePic) {
			const canEmailPicP = document.createElement('p');
			canEmailPicP.textContent = '✓ Can email cure picture!';

			// Append the <p> element to the inner div
			innerDiv.appendChild(canEmailPicP);
		}

		// Add address paragraph to the inner div
		const addressP = document.createElement('p');
		addressP.innerHTML = jsonObj.address;
		innerDiv.appendChild(addressP);
			
		if (jsonObj.secondaryaddress) {
			const secondaryAddressP = document.createElement('p');
			secondaryAddressP.innerHTML = jsonObj.secondaryaddress;
			innerDiv.appendChild(secondaryAddressP);
		}
		
		// Add office hours paragraph to the inner div
		const officeHoursP = document.createElement('p');
		officeHoursP.innerHTML = jsonObj.officehours;
		innerDiv.appendChild(officeHoursP);

		// Forms
		if (jsonObj.customFormName) {
			const customFormP = document.createElement('p');
			customFormP.innerHTML = `🔗 <a href="${jsonObj.customFormUrl}" target="_blank">${jsonObj.customFormName}</a>`;
			innerDiv.appendChild(customFormP);
		}	
	
		if (jsonObj.usesStatewideForm) {
			const statewideSigFormP = document.createElement('p');
			statewideSigFormP.innerHTML = `🔗 <a href="${StateGlobals.StatewideForm}" target="_blank">Statewide signature update form</a>`;
			innerDiv.appendChild(statewideSigFormP);
		}
		
		if (jsonObj.customMissingSigForm) {
			const missingSigFormP = document.createElement('p');
			missingSigFormP.innerHTML = `🔗 <a href="${jsonObj.customMissingSigForm}" target="_blank">Missing signature form</a>`;
			innerDiv.appendChild(missingSigFormP);
		}
		
		if (jsonObj.customMismatchedSigForm) {
			const mismatchedSigFormP = document.createElement('p');
			mismatchedSigFormP.innerHTML = `🔗 <a href="${jsonObj.customMismatchedSigForm}" target="_blank">Mismatched signature form</a>`;
			innerDiv.appendChild(mismatchedSigFormP);
		}
		
		// Extra info
		if (jsonObj.extraInfo) {
			const extrainfoP = document.createElement('p');
			extrainfoP.innerHTML = "🛈 " + jsonObj.extraInfo;
			innerDiv.appendChild(extrainfoP);
		}

		// Add the inner div to the section
		section.appendChild(anchor);
		section.appendChild(innerDiv);

		// Add the section to the outer div
		outerDiv.appendChild(section);

		// Append the outer div to the document body or another container
		cardContainer.appendChild(outerDiv);
		
		
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