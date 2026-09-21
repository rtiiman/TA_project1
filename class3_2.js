const fs = require('fs');
const textRef = '/home/rasmtiim/public_html/Veebiprog/class3/vanasonad.txt';
//impordin oma kuupeäeva ja kellaaja mooduli (funktsioonid)
const dateTimeET = require('../src/dateAndTimeFormattedET');

function showTextAsList(rawText){
	let var1 = rawText.split(';');
	console.log('Tänane vanasõna: ' + var1[Math.round(Math.random() * (var1.length - 1))]);
}

function readTextFile(referencedFile){
	// "err" (esimene parameeter suluges) - veaolukorra väljendus, "data" (teine parameeter sulgudes) - õnnestumisoluorra väljendus
	fs.readFile(referencedFile, 'UTF8', (err, data)=>{
		if(err){
			console.log('Error: ' + err);
		} else {
			showTextAsList(data);
		}
	});
}

readTextFile(textRef);
console.log(dateTimeET.fullDate() + ' - ' + dateTimeET.weekDay());
console.log(dateTimeET.fullTime());