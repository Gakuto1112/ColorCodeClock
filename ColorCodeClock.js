function zeroFillTwoDigit(value) {
	//0字詰めして2桁にして返す。
	return ("0" + value).slice(-2);
}

function RGBParse(RGBString) {
	//「rgb(0, 0, 0)」の形式。形式に沿わないものはnullを返す。
	if(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/.test(RGBString)) return RGBString.match(/\d{1,3}/g).map((valueString) => Number(valueString));
	else return null
}

function drawClockBase() {
	//時計のベースを描画する。
	context.beginPath();
	context.lineWidth = 2;
	context.arc(200, 200, 198, 0, 2 * Math.PI);
	context.stroke();
	for(let i = 0; i < 12; i++) {
		context.beginPath();
		if(i % 3 == 0) context.moveTo(Math.sin(i / 6 * Math.PI) * 120 + 200, Math.cos(i / 6 * Math.PI) * 120 + 200);
		else context.moveTo(Math.sin(i / 6 * Math.PI) * 160 + 200, Math.cos(i / 6 * Math.PI) * 160 + 200);
		context.lineTo(Math.sin(i / 6 * Math.PI) * 180 + 200, Math.cos(i / 6 * Math.PI) * 180 + 200);
		context.stroke();
	}
}

const canvas = document.getElementById("clock");
let context = null;
if(canvas.getContext) {
	context = canvas.getContext("2d");
	context.strokeStyle = "black";
	drawClockBase();
}

setTimeout(() => {
	const weekdayName = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", 'Fri.', 'Sat.'];
	const year = document.getElementById("year");
	const month = document.getElementById("month");
	const day = document.getElementById("day");
	const weekday = document.getElementById("weekday");
	const hour = document.getElementById("hour");
	const minute = document.getElementById("minute");
	const second = document.getElementById("second");
	const date = document.getElementById("date");
	const time = document.getElementById("time");

	function drawClockHands() {
		//時計の針を描画する。

		function drawHands(lineLength, lineWidth, value, maxNumber) {
			context.beginPath();
			context.lineWidth = lineWidth;
			context.moveTo(200, 200);
			context.lineTo(-Math.sin(value / (maxNumber / 2) * Math.PI + Math.PI) * lineLength + 200, Math.cos(value / (maxNumber / 2) * Math.PI + Math.PI) * lineLength + 200);
			context.stroke();
		}

		context.lineCap = "round";
		drawHands(100, 8, Number(hour.innerText) + Number(minute.innerText) / 60 + Number(second.innerText) / 3600, 12);
		drawHands(160, 8, Number(minute.innerText) + Number(second.innerText) / 60, 60);
		drawHands(160, 2, Number(second.innerText), 60);
	}

	function drawClock() {
		//時計を描画する。
		context.clearRect(0, 0, 400, 400);
		drawClockBase();
		drawClockHands();
}

	setInterval(() => {
		const dateTime = new Date();
		if(year.innerText == "--" || Number(year.innerText) != dateTime.getFullYear() % 100) year.innerText = dateTime.getFullYear() % 100;
		if(month.innerText == "--" || Number(month.innerText) != dateTime.getMonth() + 1) month.innerText = zeroFillTwoDigit(dateTime.getMonth() + 1);
		if(day.innerText == "--" || Number(day.innerText) != dateTime.getDate()) day.innerText = zeroFillTwoDigit(dateTime.getDate());
		if(weekday.innerText == "---" || weekdayName.indexOf(weekday.innerText) != dateTime.getDay()) weekday.innerText = weekdayName[dateTime.getDay()];
		if(hour.innerText == "--" || Number(hour.innerText) != dateTime.getHours()) hour.innerText = zeroFillTwoDigit(dateTime.getHours());
		if(minute.innerText == "--" || Number(minute.innerText) != dateTime.getMinutes()) minute.innerText = zeroFillTwoDigit(dateTime.getMinutes());
		second.innerText = zeroFillTwoDigit(dateTime.getSeconds());
		if(date.style.backgroundColor != "rgb(" + parseInt(year.innerText, 16) + ", " + parseInt(month.innerText, 16) + ", " + parseInt(day.innerText, 16) + ")") {
			date.style.backgroundColor = date.innerText.match(/#\d{6}/)[0];
			if(RGBParse(date.style.backgroundColor).reduce((sum, value) => sum + value, 0) / 3 < 128) date.style.color = "white";
			else date.style.color = "black";
		}
		document.body.style.backgroundColor = time.innerText;
		if(RGBParse(document.body.style.backgroundColor).reduce((sum, value) => sum + value, 0) / 3 < 128) {
			time.style.color = "white";
			context.strokeStyle = "white";
			drawClock();
		}
		else {
			time.style.color = "black";
			context.strokeStyle = "black";
			drawClock();
		}
	}, 1000);
}, 1000 - new Date().getMilliseconds);