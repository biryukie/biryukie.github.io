// Creating an empty object
var questions = {};

// Adding key-value pairs
questions["Physical Self-Care"] = ["apple", "orange", "banana"];
questions["Psychological Self-Care"] = ["tomato", "corn", "radish", "cucumber"];


function ConstructQuestions() {
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
            label.textContent = element + "\r\n";

            const br = document.createElement("br");
            label.appendChild(br);

            // Create radio buttons with values from 1 to 5
            for (var j = 1; j <= 5; j++) {
                var radio = document.createElement("input");
                radio.type = "radio";
                radio.name = element + "-rating";
                radio.value = j;

                // Append radio button to label
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