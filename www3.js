const http = require('http');
const dateET = require('../src/dateAndTimeFormattedET.js');

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Rasmus Tiiman - veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Rasmus Tiiman - veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning sisaldab tõsiseltvõetavat sisu.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	let weekDayNow = dateET.weekDay();
	//nädalapäeva esimene täht suureks
	weekDayNow = weekDayNow.charAt(0).toUpperCase() + weekDayNow.slice(1);
	//kuupäev jagatakse tühikute kohalt osadeks (päev, kuu, aasta), et lisada rahvakalendri kuunimi sulgudes tavalise kuunime järele
	let dateParts = dateET.fullDate().split(' ');
	let folkMonthNow = dateET.fullDate(1).split(' ')[1];
	let dateWithFolkMonth = dateParts[0] + ' ' + dateParts[1] + ' (' + folkMonthNow + ') ' + dateParts[2];
	let pageDateInfo = '\n\t<p>' + weekDayNow + ', ' + dateWithFolkMonth + ', kell ' + dateET.fullTime() + '</p>';
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead);
	res.write(pageBody);
	res.write(pageDateInfo);
	res.write(pageFoot);
	//res.write('www3 - Rasmus Tiiman');
	return res.end();
}
).listen(5129);