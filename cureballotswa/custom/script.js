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
		
		const emailLi = createIconListItem('fa-solid fa-envelope', 'Email', jsonObj.email);
		const phoneLi = createIconListItem('fa-solid fa-phone-alt', 'Phone', jsonObj.phone);
		const faxLi = createIconListItem('fa-solid fa-fax', 'Fax', jsonObj.fax);

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

// Function to create list item for icon li class
function createIconListItem(iconClass, label, content) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'icon-li';
    const icon = document.createElement('i');
    icon.className = iconClass;
    span.appendChild(icon);

    const b = document.createElement('b');
    b.textContent = `${label}: `;

    li.appendChild(span);
    li.appendChild(b);
    li.appendChild(document.createTextNode(content));
    
    return li;
}