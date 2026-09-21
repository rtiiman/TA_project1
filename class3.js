const fs = require('fs');
const textRef = '/home/rasmtiim/public_html/Veebiprog/class3/vanasonad.txt';

function showFullText(data){
	console.log(data);
}

function showTextAsList(rawText){
	let var1 = rawText.split(';');
	if(Math.round(Math.random()) === 0){
		console.log('Meile on teada järgmised vanasõnad: ');
		for(let i = 0;i < var1.length; i ++){
			console.log((i + 1) + ')  ' + var1[i]);
		}
	} else {
		console.log('Tänane vanasõna: ' + var1[Math.round(Math.random() * (var1.length - 1))]);
	}
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