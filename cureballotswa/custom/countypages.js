function updateContentFromHash() {
	// Extract the hash from the URL, removing the leading '#'
	const hash = window.location.hash.substring(1);
	
	// Find the county object with the matching countyname
	const county = countyElectionsData.find(c => c.countyname.toLowerCase().replace(/\s+/g, '') === hash.toLowerCase());

	/*if (county) {
		// Update the <h2> and <p> elements with the corresponding values
		document.querySelector('article h2').textContent = county.countyname;
		document.querySelector('article p').textContent = county.website;
	}*/
	
	countyinfo.innerHTML = generateCountyElectionsHTML(county);
}

// Call the function to update content based on the current hash
window.addEventListener('hashchange', updateContentFromHash);
// Also call the function on initial page load to handle direct access with hash
document.addEventListener('DOMContentLoaded', updateContentFromHash);

function generateCountyElectionsHTML(countyName) {
    // Find the county object with the matching name
    const county = countyName;

    if (!county) {
        return `<p>Click a county above to view its election information.</p>`;
    }

    return `
		<h2>${county.countyname} County</h2>
		<h3><a href="http://${county.website}" target="_blank" class="display">${county.website}</a></h3>
		<ul class="icon-ul">
		    <li><span class="icon-li"><i class="fa-solid fa-envelope"></i></span><b>Email:</b> ${county.email}</li>
		    <li><span class="icon-li"><i class="fa-solid fa-phone-alt"></i></span><b>Phone:</b> ${county.phone}</li>
		    <li><span class="icon-li"><i class="fa-solid fa-fax"></i></span><b>Fax:</b> ${county.fax}</li>
		</ul>
		
		${county.canEmailCurePic ? 
		`
		<p>&#10004; ${county.countyname} county allows emailing a photo of the cure!</p>
		` 
		: 
		''}
		
			<h3>${county.secondaryaddress ? 'Addresses' : 'Address'}</h3>
			<ul class="icon-ul">
				<li><span class="icon-li"><i class="fa-solid fa-map-marker-alt"></i></span>${county.address}</li>
				<li><span class="icon-li"><i class="fa-solid fa-clock"></i></span><b>Hours:</b> ${county.officehours}</li>
			</ul>
			
			
			${county.secondaryaddress ? 
			`
			<ul class="icon-ul">
				<li><span class="icon-li"><i class="fa-solid fa-map-marker-alt"></i></span>${county.secondaryaddress}</li>
				<li><span class="icon-li"><i class="fa-solid fa-clock"></i></span><b>Hours:</b>  ${county.secondaryofficehours ? `${county.secondaryofficehours}` : `${county.officehours}`}</li>
			</ul>
			` 
			: 
			''}

			${GenerateFormsHtml(county.forms, county.usesStatewideForm)}
		
		
		${county.extraInfo ? `
			<h3>Extra Information</h3>
			<p>${county.extraInfo}</p>
		` : ''}
		
		<p><i>Information last updated: ${county.lastupdated}</i></p>
    `;
}

function GenerateFormsHtml(forms, usesStatewideForm) {
	if ((!forms || forms.length == 0) && !usesStatewideForm) return "";
	
	let formsHtml = '<h3>Forms</h3>';
	formsHtml += '<ul class="style2">';
	if (usesStatewideForm) {
		formsHtml += `<li class="icon solid info fa-link"><a href="${StateGlobals.StatewideForm}" target="_blank">Statewide signature update form</a>`;
	}
	if (forms) {
		for (let [formName, formUrl] of Object.entries(forms)) {
			formsHtml += `<li class="icon solid info fa-link"><a href="${formUrl}" target="_blank">${formName}</a></li>`;
		}
	}
	formsHtml += '</ul>';
	return formsHtml;
}

function GenerateCountyList() {
	// Get the UL element by its ID
	const countyList = document.getElementById('countyList');
	
	// Clear existing list items
	countyList.innerHTML = '';
	
	// Loop through each JSON object in the data array
	for (let i = 0; i < countyElectionsData.length; i++) {
		let jsonObj = countyElectionsData[i];
		
		// Create a new LI element
		const li = document.createElement('li');
		
		// Create a new A element
		const a = document.createElement('a');
		a.textContent = jsonObj.countyname;
		
		// Generate href attribute, convert countyname to lowercase and replace spaces with a hyphen
		a.href = `#${jsonObj.countyname.toLowerCase().replace(/\s+/g, '-')}`;
		
		// Append the A element to the LI element
		li.appendChild(a);
		
		// Append the LI element to the UL element
		countyList.appendChild(li);
	}
}

function GenerateCountyButtons() {
	// Get the section element by its ID
	const countySection = document.getElementById('countybuttons');
	
	// Clear existing buttons
	countySection.innerHTML = '';
	
	// Loop through each JSON object in the data array
	for (let i = 0; i < countyElectionsData.length; i++) {
		let jsonObj = countyElectionsData[i];
		
		// Create a new A element for the button
		const a = document.createElement('a');
		a.className = 'button small solid'; // Set button classes
		a.textContent = jsonObj.countyname;
		
		// Generate href attribute, convert countyname to lowercase and remove spaces
		a.href = `#${jsonObj.countyname.toLowerCase().replace(/\s+/g, '')}`;
		
		// Append the A element to the section element
		countySection.appendChild(a);
	}
}