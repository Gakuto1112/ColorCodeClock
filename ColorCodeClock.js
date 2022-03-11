function zeroFillTwoDigit(value) {
	//0字詰めして2桁にして返す。
	return ("0" + value).slice(-2);
}

function RGBParse(RGBString) {
	//「rgb(0, 0, 0)」の形式。形式に沿わないものはnullを返す。
	if(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/.test(RGBString)) return RGBString.match(/\d{1,3}/g).map((valueString) => Number(valueString));
	else return null
}

setTimeout(() => {
	const weekdayName = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", 'Fri.', 'Sat.'];
	const year = document.getElementById("year");
	const month = document.getElementById("month");
	const day = document.getElementById("day");
	const weekday = document.getElementById("weekday");
	const hour = document.getElementById("hour");
	const minute = document.getElementById("minute");
	const date = document.getElementById("date");
	const time = document.getElementById("time");
	setInterval(() => {
		const dateTime = new Date();
		if(year.innerText == "--" || Number(year.innerText) != dateTime.getFullYear() % 100) year.innerText = dateTime.getFullYear() % 100;
		if(month.innerText == "--" || Number(month.innerText) != dateTime.getMonth() + 1) month.innerText = zeroFillTwoDigit(dateTime.getMonth() + 1);
		if(day.innerText == "--" || Number(day.innerText) != dateTime.getDate()) day.innerText = zeroFillTwoDigit(dateTime.getDate());
		if(weekday.innerText == "---" || weekdayName.indexOf(weekday.innerText) != dateTime.getDay()) weekday.innerText = weekdayName[dateTime.getDay()];
		if(hour.innerText == "--" || Number(hour.innerText) != dateTime.getHours()) hour.innerText = zeroFillTwoDigit(dateTime.getHours());
		if(minute.innerText == "--" || Number(minute.innerText) != dateTime.getMinutes()) minute.innerText = zeroFillTwoDigit(dateTime.getMinutes());
		document.getElementById("second").innerText = zeroFillTwoDigit(dateTime.getSeconds());
		if(date.style.backgroundColor != "rgb(" + parseInt(year.innerText, 16) + ", " + parseInt(month.innerText, 16) + ", " + parseInt(day.innerText, 16) + ")") {
			date.style.backgroundColor = date.innerText.match(/#\d{6}/)[0];
			if(RGBParse(date.style.backgroundColor).reduce((sum, value) => sum + value, 0) / 3 < 128) date.style.color = "white";
			else date.style.color = "black";
		}
		document.body.style.backgroundColor = time.innerText;
		if(RGBParse(document.body.style.backgroundColor).reduce((sum, value) => sum + value, 0) / 3 < 128) {
			time.style.color = "white";
			//TODO: アナログ時計の文字色変更
		}
		else {
			time.style.color = "black";
			//TODO: アナログ時計の文字色変更
		}
	}, 1000);
}, 1000 - new Date().getMilliseconds);