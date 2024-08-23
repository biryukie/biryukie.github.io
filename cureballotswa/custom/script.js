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
		
		// Create the list for email, phone, and fax
		const ul = document.createElement('ul');
		ul.className = 'icon-ul';
		
		const emailLi = createIconListItem('fa-solid fa-envelope', 'Email: ', jsonObj.email);
		const phoneLi = createIconListItem('fa-solid fa-phone-alt', 'Phone: ', jsonObj.phone);
		const faxLi = createIconListItem('fa-solid fa-fax', 'Fax: ', jsonObj.fax);

		ul.appendChild(emailLi);
		ul.appendChild(phoneLi);
		ul.appendChild(faxLi);
		
		const p1 = document.createElement('p');
		p1.innerHTML = `<a href="https://${jsonObj.website}" target="_blank">${jsonObj.website}</a>`;
		
		header.appendChild(h2);
		header.appendChild(p1);
		header.appendChild(ul);

		// Add the header to the inner div
		innerDiv.appendChild(header);

		// Email cure
		if (jsonObj.canEmailCurePic) {
			const ulEmailCure = document.createElement('ul');
			ulEmailCure.className = 'icon-ul';
			const emailCureLi = createIconListItem('fa-solid fa-check-circle', '', 'Can email cure picture!');
			ulEmailCure.appendChild(emailCureLi);
			innerDiv.appendChild(ulEmailCure);
		}

		generateAddresses(innerDiv, jsonObj);

		// Forms	
		const ulForms = document.createElement('ul');
		ulForms.className = 'icon-ul';
		
		if (jsonObj.usesStatewideForm) {
			const stateFormLi = createIconListItem('fa-solid fa-link', '', `<a href="${StateGlobals.StatewideForm}" target="_blank">Statewide signature update form</a>`);
			ulForms.appendChild(stateFormLi);
		}
		
		if (jsonObj.forms) {
			// Loop through the forms object and create list items for each form
			for (const [formName, formUrl] of Object.entries(jsonObj.forms)) {
				const formLi = createIconListItem('fa-solid fa-link', '', `<a href="${formUrl}" target="_blank">${formName}</a>`
				);
				ulForms.appendChild(formLi);
			}
		}
		
		innerDiv.appendChild(ulForms);
		
		if (jsonObj.customFormName) {
			const customFormP = document.createElement('p');
			customFormP.innerHTML = `🔗 <a href="${jsonObj.customFormUrl}" target="_blank">${jsonObj.customFormName}</a>`;
			innerDiv.appendChild(customFormP);
		}
		
		// Extra info
		if (jsonObj.extraInfo) {
			const ulExtra = document.createElement('ul');
			ulExtra.className = 'icon-ul';
			const extraInfoLi = createIconListItem('fa-solid fa-info-circle', '', jsonObj.extraInfo);
			ulExtra.appendChild(extraInfoLi);
			innerDiv.appendChild(ulExtra);
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

function generateAddresses(containerDiv, county) {
	// Create the first UL for address and office hours
	const ulAddressHours = document.createElement('ul');
	ulAddressHours.className = 'icon-ul';

	const addressItem = createIconListItem('fa-solid fa-map-marker-alt', '', county.address);
	ulAddressHours.appendChild(addressItem);

	const hoursItem = createIconListItem('fa-solid fa-clock', 'Hours: ', county.officehours);
	ulAddressHours.appendChild(hoursItem);

	containerDiv.appendChild(ulAddressHours);

	// Create the second UL if secondary address exists
	if (county.secondaryaddress) {
		const ulSecondary = document.createElement('ul');
		ulSecondary.className = 'icon-ul';

		const secondaryAddressItem = createIconListItem('fa-solid fa-map-marker-alt', '', county.secondaryaddress);
		ulSecondary.appendChild(secondaryAddressItem);

		const secondaryHoursItem = createIconListItem(
			'fa-solid fa-clock',
			'Hours: ',
			county.secondaryofficehours || county.officehours
		);
		ulSecondary.appendChild(secondaryHoursItem);

		containerDiv.appendChild(ulSecondary);
	}	
}

// Function to create list item for icon li class
function createIconListItem(iconClass, label, content) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'icon-li';
    const icon = document.createElement('i');
    icon.className = iconClass;
    span.appendChild(icon);

    const b = document.createElement('b');
    b.textContent = `${label}`;

    li.appendChild(span);
    li.appendChild(b);
    // Create a temporary container to parse HTML content
    const contentContainer = document.createElement('span');
    contentContainer.innerHTML = content; // Set HTML content
    li.appendChild(contentContainer);
    
    return li;
}