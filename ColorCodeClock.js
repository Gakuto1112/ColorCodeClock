setTimeout(() => {
	const dayName = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", 'Fri.', 'Sat.'];
	const year = document.getElementById("year");
	const month = document.getElementById("month");
	const date = document.getElementById("date");
	const day = document.getElementById("day");
	const hour = document.getElementById("hour");
	const minute = document.getElementById("minute");
	setInterval(() => {
		const dateTime = new Date();
		if(year.innerText == "--" || Number(year.innerText) != dateTime.getFullYear() % 100) year.innerText = dateTime.getFullYear() % 100;
		if(month.innerText == "--" || Number(month.innerText) != dateTime.getMonth() + 1) month.innerText = ("0" + (dateTime.getMonth() + 1)).slice(-2);
		if(date.innerText == "--" || Number(date.innerText) != dateTime.getDate()) date.innerText = ("0" + dateTime.getDate()).slice(-2);
		if(day.innerText == "---" || dayName.indexOf(day.innerText) != dateTime.getDay()) day.innerText = dayName[dateTime.getDay()];
		if(hour.innerText == "--" || Number(hour.innerText) != dateTime.getHours()) hour.innerText = ("0" + dateTime.getHours()).slice(-2);
		if(minute.innerText == "--" || Number(minute.innerText) != dateTime.getMinutes()) minute.innerText = ("0" + dateTime.getMinutes()).slice(-2);
		document.getElementById("second").innerText = ("0" + dateTime.getSeconds()).slice(-2);
	}, 1000);
}, 1000 - new Date().getMilliseconds);