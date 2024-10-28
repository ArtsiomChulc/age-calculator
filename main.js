const form = document.getElementById('form');
const result = document.getElementById('result');
const error = document.getElementById('error');
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

result.innerHTML = `<span class="result-title">Calculate your age</span>`;

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const day = parseInt(document.getElementById("input-day").value);
	const month = parseInt(document.getElementById("input-month").value);
	const year = parseInt(document.getElementById("input-year").value);

	if (isNaN(day) || isNaN(month) || isNaN(year)) {
		error.innerText = 'Please enter valid numbers for day, month and year.';
		return;
	}

	if (day < 1 || day > 31 || month < 1 || month > 12 || year < 2 || year > 2024) {
		error.innerText = 'Please enter valid day, month and year.';
		return;
	}

	const today = new Date();
	const birthDate  = new Date(year, month - 1, day);

	if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {

		error.innerText = 'Please enter valid day, month and year.';
		return;
	}

	if (birthDate > today) {
		error.innerText = 'Birth date cannot be in the future!';
		return;
	}

	let ageYear = today.getFullYear() - birthDate.getFullYear();
	let ageMonth = today.getMonth() - birthDate.getMonth();
	let ageDays = today.getDate() - birthDate.getDate();

	if (ageDays < 0) {
		ageMonth--;
		ageDays += daysInMonth[(today.getMonth() - 1 + 12) % 12]; // Предыдущий месяц
	}

	if (ageMonth < 0) {
		ageYear--;
		ageMonth += 12;
	}

	result.innerHTML = `
		<span class="result-title">Your age:</span>
		<span class="result-wrap">
			<span>${ageYear} years</span> 
			<span>${ageMonth} month</span>
			<span>${ageDays} days</span>
		</span>
`;
	result.classList.remove('hidden');
	error.classList.add('hidden');
	form.reset();
})