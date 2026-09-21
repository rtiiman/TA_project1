const http = require('http');
const dateET = require('../src/dateAndTimeFormattedET.js');
// moodul päringu parsimiseks
const url = require('url');
// moodul faili tee haldamiseks
const path = require('path');
// moodul failide haldamiseks, kuid ASYNC puhul on vaja erilisemat moodulit
//const fs = require('fs');
const fs = require('fs').promises;


const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Rasmus Tiiman - veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Rasmus Tiiman - veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning sisaldab tõsiseltvõetavat sisu.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';
const pageBanner = '<img src="/media/veebiprogrammeerimine_2026_TA.png" alt="">';

http.createServer(async function(req, res){
	// parsin url'i
	console.log('päring: ' + req.url);
	let currentURL = url.parse(req.url, true);
	console.log('pärsituna: ' + currentURL.pathname);
	
	// jaotame erinevaid lehti -> "routing"
	
	if(currentURL.pathname === '/'){
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
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\n\t\t<li><a href="/vanasona">Tänane vanasõna</a></li>');
		res.write(pageDateInfo);
		res.write(pageFoot);
		//res.write('www3 - Rasmus Tiiman');
		return res.end();
	}
	
	else if (currentURL.pathname === '/vanasona'){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write('\t<h1>Eesti vanasõnad<h1>\n\t<p>Tänane vanasõna.</p>\n\t<hr>');
		res.write('\n\t<p><a href="/">Tagasi avalehele</a></p>');
		res.write(pageFoot);
	}
	
	else if (currentURL.pathname === '/media/veebiprogrammeerimine_2026_TA.png'){
		let picPath = path.join(__dirname, 'pic', currentURL.pathname);
		try {
			const data = await fs.readFile(picPath + currentURL.pathname);
			res.writeHead(200, {"Content-type": "image/png"});
			res.end(data);
		} catch (err){
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"})
			return res.end('Pilti ei letud');
			// throw(err);
		}
	}
	
	else {
		res.end('Viga 404.');
	}	
}).listen(5129);