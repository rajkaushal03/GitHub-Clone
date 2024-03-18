export function formatMemberSince(inputDateString) {
	const options = { month: "short", day: "2-digit", year: "numeric" };
	const formattedDate = new Date(inputDateString).toLocaleDateString("en-US", options);
	return formattedDate;
}


export function showAlert(message, duration) {
	const alertBox = document.createElement('div');
	alertBox.textContent = message;
	alertBox.style.position = 'fixed';
	alertBox.style.top = '50%';
	alertBox.style.left = '50%';
	alertBox.style.transform = 'translate(-50%, -50%)';
	alertBox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
	alertBox.style.color = '#fff';
	alertBox.style.padding = '20px';
	alertBox.style.borderRadius = '5px';
	alertBox.style.opacity = '0';
	alertBox.style.transition = 'opacity 0.5s ease-in-out';

	document.body.appendChild(alertBox);

	setTimeout(() => {
		alertBox.style.opacity = '1';
		setTimeout(() => {
			alertBox.style.opacity = '0';
			setTimeout(() => {
				alertBox.parentNode.removeChild(alertBox);
			}, 500);
		}, duration - 500);
	}, 100);

}

export function formatDate(inputDateString) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const date = new Date(inputDateString);
	const monthName = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	// Function to add ordinal suffix to day
	function getOrdinalSuffix(day) {
		if (day >= 11 && day <= 13) {
			return day + "th";
		}
		switch (day % 10) {
			case 1:
				return day + "st";
			case 2:
				return day + "nd";
			case 3:
				return day + "rd";
			default:
				return day + "th";
		}
	}

	const formattedDate = `${monthName} ${getOrdinalSuffix(day)}, ${year}`;
	return formattedDate;
}