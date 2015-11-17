// Totals
var total;
var left;

// Personality Points array
var persArray;

// Types array
var typeArray;

function loader() {
	window.total = Number(document.getElementById("total").value);
	window.left = total;
	
	window.persArray = [["kindness",0],["naughtiness",0],
						["modesty",0],["flamboyance",0],
						["stubborness",0],["bashfulness",0],
						["cheerfulness",0],["shyness",0],
						["curiosity",0],["obedience",0]];
	
	window.typeArray = [[0, document.getElementById('default'), "http://vignette1.wikia.nocookie.net/myroid/images/c/c7/Default0.png", "http://vignette1.wikia.nocookie.net/myroid/images/2/20/Default1.png"],
						[0, document.getElementById('sweet'), "http://vignette2.wikia.nocookie.net/myroid/images/a/ab/Sweet0.png", "http://vignette2.wikia.nocookie.net/myroid/images/6/63/Sweet1.png"],
						[0, document.getElementById('childish'), "http://vignette1.wikia.nocookie.net/myroid/images/5/5e/Childish0.png", "http://vignette4.wikia.nocookie.net/myroid/images/0/0c/Childish1.png"],
						[0, document.getElementById('tsundere'), "http://vignette4.wikia.nocookie.net/myroid/images/6/6f/Tsundere0.png", "http://vignette2.wikia.nocookie.net/myroid/images/b/b9/Tsundere1.png"],
						[0, document.getElementById('dominant'), "http://vignette3.wikia.nocookie.net/myroid/images/b/ba/Dominant0.png", "http://vignette1.wikia.nocookie.net/myroid/images/1/1b/Dominant1.png"],
						[0, document.getElementById('tomboy'), "http://vignette1.wikia.nocookie.net/myroid/images/3/3c/Tomboy0.png", "http://vignette2.wikia.nocookie.net/myroid/images/c/c0/Tomboy1.png"],
						[0, document.getElementById('mysterious'), "http://vignette3.wikia.nocookie.net/myroid/images/4/4d/Mysterious0.png", "http://vignette4.wikia.nocookie.net/myroid/images/2/2d/Mysterious1.png"],
						[0, document.getElementById('sexy'), "http://vignette1.wikia.nocookie.net/myroid/images/9/94/Sexy0.png", "http://vignette1.wikia.nocookie.net/myroid/images/a/ae/Sexy1.png"],
						[0, document.getElementById('neat'), "http://vignette1.wikia.nocookie.net/myroid/images/1/1f/Neat0.png", "http://vignette4.wikia.nocookie.net/myroid/images/6/65/Neat1.png"],
						[0, document.getElementById('sassy'), "http://vignette3.wikia.nocookie.net/myroid/images/e/ed/Sassy0.png", "http://vignette3.wikia.nocookie.net/myroid/images/a/a9/Sassy1.png"],
						[0, document.getElementById('cool'), "http://vignette3.wikia.nocookie.net/myroid/images/9/9c/Cool0.png", "http://vignette2.wikia.nocookie.net/myroid/images/2/2a/Cool1.png"],
						[0, document.getElementById('needy'), "http://vignette2.wikia.nocookie.net/myroid/images/5/5f/Needy0.png", "http://vignette3.wikia.nocookie.net/myroid/images/e/e8/Needy1.png"],
						[0, document.getElementById('yandere'), "http://vignette2.wikia.nocookie.net/myroid/images/a/aa/Yandere0.png", "http://vignette3.wikia.nocookie.net/myroid/images/c/cb/Yandere1.png"],
						[0, document.getElementById('crybaby'), "http://vignette1.wikia.nocookie.net/myroid/images/4/4a/Crybaby0.png", "http://vignette3.wikia.nocookie.net/myroid/images/9/9e/Crybaby1.png"]];

	resetStats();	
}

// Total value update handler
function totalUpdate() {
	var x = document.getElementById('total').value;
	if (x > 7500) {x = 7500;}
	if (x < 5000 || isNaN(x)) {x = 5000;}
	window.left += x-window.total;
	if (window.left < 0) {
		for (var i = 0; i < window.persArray.length; i++) {
			window.persArray[i][1] = 0;
			document.getElementById(persArray[i][0]).value = 0;
		}
		window.left = x;
	}
	window.total = x;
	document.getElementById('total').value = window.total;
	document.getElementById('left').innerHTML = window.left;
	updateBar();
}

// Point value update handler
function pointsUpdate(id) {
	
	var j = -1;
	var i;
	for (i = 0; i < window.persArray.length; i++) {
		if (id == window.persArray[i][0]) {
			j = i;
			break;
		}
	}
	
	if (j == -1) {
		console.log("naming bug");
	}
	var x = verifyValue(document.getElementById(id).value);
	if (x-window.persArray[j][1] > window.left) {
		x=window.persArray[j][1] + window.left;
	}
	window.left -= x-window.persArray[j][1];
	window.persArray[i][1] = x;
	document.getElementById(id).value = window.persArray[j][1];
	document.getElementById('left').innerHTML = window.left;
	updateBar();
	updateTypes();
}

// Updates the bar size
function updateBar() {
	document.getElementById("leftBar").style.width = Math.round(left*100/total) + "%";
	if ((total-left) < total*0.005) {
		document.getElementById("leftBar").style.borderBottomRightRadius = "5px";
		document.getElementById("leftBar").style.borderTopRightRadius = "5px";
	} else {
		document.getElementById("leftBar").style.borderBottomRightRadius = "0px";
		document.getElementById("leftBar").style.borderTopRightRadius = "0px";
	}
}

// Auto type on/off updating
function updateTypes() {
	checkTypes();
	for (var i = 0; i < window.typeArray.length; i++) {
		if (window.typeArray[i][0]==1) {
			window.typeArray[i][1].src = window.typeArray[i][3];
		} else {
			window.typeArray[i][1].src = window.typeArray[i][2];
		}
	}
}

// Value verification for updates
function verifyValue(value) {
	if (isNaN(value) || value<0) {
		return 0;
	} else if (value>1000) {
		return 1000;
	} return parseInt(value);
}

// Button add/minus handlers
function minusminus(id) {
	var idExtract = id.substring(3,id.length);
	document.getElementById(idExtract).value = parseInt(document.getElementById(idExtract).value) - 100;
	if (idExtract == "total") {
		totalUpdate();
	} else {
		pointsUpdate(idExtract);
	}
}
function minus(id) {
	var idExtract = id.substring(2,id.length);
	console.log(idExtract);
	document.getElementById(idExtract).value = parseInt(document.getElementById(idExtract).value) - 10;
	if (idExtract == "total") {
		totalUpdate();
	} else {
		pointsUpdate(idExtract);
	}
}
function plusplus(id) {
	var idExtract = id.substring(3,id.length);
	console.log(idExtract);
	document.getElementById(idExtract).value = parseInt(document.getElementById(idExtract).value) + 100;
	if (idExtract == "total") {
		totalUpdate();
	} else {
		pointsUpdate(idExtract);
	}
}
function plus(id) {
	var idExtract = id.substring(2,id.length);
	console.log(idExtract);
	document.getElementById(idExtract).value = parseInt(document.getElementById(idExtract).value) + 10;
	if (idExtract == "total") {
		totalUpdate();
	} else {
		pointsUpdate(idExtract);
	}
}

// Type check
function checkTypes() {
	// Default
	if (window.persArray[0][1] >= 0)
	{window.typeArray[0][0]=1;} else {window.typeArray[0][0]=0;}
	// Sweet
	if (window.persArray[0][1]>=100 &&
		window.persArray[6][1]>=100 &&
		window.persArray[7][1]>=100 &&
		window.persArray[9][1]>=100)
	{window.typeArray[1][0]=1;} else {window.typeArray[1][0]=0;}
	// Childish
	if (window.persArray[0][1]>=400 &&
		window.persArray[6][1]>=300 &&
		window.persArray[8][1]>=300 &&
		window.persArray[9][1]>=200)
	{window.typeArray[2][0]=1;} else {window.typeArray[2][0]=0;}
	// Tsundere
	if (window.persArray[4][1]>=700 &&
		window.persArray[5][1]>=600 &&
		window.persArray[7][1]>=700)
	{window.typeArray[3][0]=1;} else {window.typeArray[3][0]=0;}
	// Dominant
	if (window.persArray[1][1]>=200 &&
		window.persArray[2][1]>=200 &&
		window.persArray[3][1]>=400 &&
		window.persArray[4][1]>=600 &&
		window.persArray[6][1]>=200 &&
		window.persArray[9][1]>=200)
	{window.typeArray[4][0]=1;} else {window.typeArray[4][0]=0;}
	// Tomboy
	if (window.persArray[6][1]>=700 &&
		window.persArray[9][1]>=300)
	{window.typeArray[5][0]=1;} else {window.typeArray[5][0]=0;}
	// Mysterious
	if (window.persArray[0][1]>=200 &&
		window.persArray[5][1]>=400 &&
		window.persArray[7][1]>=300 &&
		window.persArray[8][1]>=300)
	{window.typeArray[6][0]=1;} else {window.typeArray[6][0]=0;}
	// Sexy
	if (window.persArray[1][1]>=600 &&
		window.persArray[3][1]>=600 &&
		window.persArray[6][1]>=400 &&
		window.persArray[8][1]>=400)
	{window.typeArray[7][0]=1;} else {window.typeArray[7][0]=0;}
	// Neat
	if (window.persArray[0][1]>=300 &&
		window.persArray[7][1]>=200 &&
		window.persArray[9][1]>=200)
	{window.typeArray[8][0]=1;} else {window.typeArray[8][0]=0;}
	// Sassy
	if (window.persArray[0][1]>=300 &&
		window.persArray[1][1]>=300 &&
		window.persArray[3][1]>=200 &&
		window.persArray[8][1]>=200 &&
		window.persArray[9][1]>=200)
	{window.typeArray[9][0]=1;} else {window.typeArray[9][0]=0;}
	// Cool
	if (window.persArray[2][1]>=300 &&
		window.persArray[4][1]>=200 &&
		window.persArray[5][1]>=100 &&
		window.persArray[7][1]>=400 &&
		window.persArray[9][1]>=200)
	{window.typeArray[10][0]=1;} else {window.typeArray[10][0]=0;}
	// Needy
	if (window.persArray[0][1]>=500 &&
		window.persArray[4][1]>=300 &&
		window.persArray[8][1]>=700 &&
		window.persArray[9][1]>=500)
	{window.typeArray[11][0]=1;} else {window.typeArray[11][0]=0;}
	// Yandere
	if (window.persArray[1][1]>=400 &&
		window.persArray[3][1]>=700 &&
		window.persArray[5][1]>=700 &&
		window.persArray[6][1]>=600)
	{window.typeArray[12][0]=1;} else {window.typeArray[12][0]=0;}
	// Crybaby
	if (window.persArray[0][1]>=500 &&
		window.persArray[5][1]>=700 &&
		window.persArray[9][1]>=400)
	{window.typeArray[13][0]=1;} else {window.typeArray[13][0]=0;}
}

function resetStats() {
	document.getElementById("total").value = 5000;
	window.total = 5000;
	window.left = 5000;
	for (var i = 0; i < window.persArray.length; i++) {
		window.persArray[i][1] = 0;
		document.getElementById(window.persArray[i][0]).value = 0;
	}
	totalUpdate();
	updateTypes();
}

function special(id) {
	if (id == "mostTypes5000") {
		document.getElementById("total").value = 5000;
		window.total = 5000;
		window.left = 800;
		window.persArray[0][1] = 400;
		document.getElementById("kindness").value = 400;
		window.persArray[1][1] = 600;
		document.getElementById("naughtiness").value = 600;
		window.persArray[2][1] = 300;
		document.getElementById("modesty").value = 300;
		window.persArray[3][1] = 600;
		document.getElementById("flamboyance").value = 600;
		window.persArray[4][1] = 600;
		document.getElementById("stubborness").value = 600;
		window.persArray[5][1] = 400;
		document.getElementById("bashfulness").value = 400;
		window.persArray[6][1] = 400;
		document.getElementById("cheerfulness").value = 400;
		window.persArray[7][1] = 400;
		document.getElementById("shyness").value = 400;
		window.persArray[8][1] = 400;
		document.getElementById("curiosity").value = 400;
		window.persArray[9][1] = 200;
		document.getElementById("obedience").value = 200;
		totalUpdate();
		updateTypes();
	} else if (id == "all5hour") {
		document.getElementById("total").value = 5000;
		window.total = 5000;
		window.left = 1500;
		window.persArray[0][1] = 300;
		document.getElementById("kindness").value = 300;
		window.persArray[1][1] = 600;
		document.getElementById("naughtiness").value = 600;
		window.persArray[2][1] = 200;
		document.getElementById("modesty").value = 200;
		window.persArray[3][1] = 600;
		document.getElementById("flamboyance").value = 600;
		window.persArray[4][1] = 600;
		document.getElementById("stubborness").value = 600;
		window.persArray[5][1] = 0;
		document.getElementById("bashfulness").value = 0;
		window.persArray[6][1] = 400;
		document.getElementById("cheerfulness").value = 400;
		window.persArray[7][1] = 200;
		document.getElementById("shyness").value = 200;
		window.persArray[8][1] = 400;
		document.getElementById("curiosity").value = 400;
		window.persArray[9][1] = 200;
		document.getElementById("obedience").value = 200;
		totalUpdate();
		updateTypes();
	} else if (id == "allTypes") {
		document.getElementById("total").value = 7500;
		window.total = 7500;
		window.left = 1400;
		window.persArray[0][1] = 500;
		document.getElementById("kindness").value = 500;
		window.persArray[1][1] = 600;
		document.getElementById("naughtiness").value = 600;
		window.persArray[2][1] = 300;
		document.getElementById("modesty").value = 300;
		window.persArray[3][1] = 700;
		document.getElementById("flamboyance").value = 700;
		window.persArray[4][1] = 700;
		document.getElementById("stubborness").value = 700;
		window.persArray[5][1] = 700;
		document.getElementById("bashfulness").value = 700;
		window.persArray[6][1] = 700;
		document.getElementById("cheerfulness").value = 700;
		window.persArray[7][1] = 700;
		document.getElementById("shyness").value = 700;
		window.persArray[8][1] = 700;
		document.getElementById("curiosity").value = 700;
		window.persArray[9][1] = 500;
		document.getElementById("obedience").value = 500;
		totalUpdate();
		updateTypes();
	}
}

function savePers() {
	
	var persString = to3dHexString(parseInt(window.total));
	if (window.left >= 4096) {
		persString += window.left.toString(16);
	} else {
		persString += "0" + to3dHexString(parseInt(window.left));
	}
	for (var i = 0; i < window.persArray.length; i++) {
		persString += to3dHexString(parseInt(window.persArray[i][1]));
	}
	
	document.getElementById("saveload").value = persString;
	
}

function to3dHexString(value) {
	if (value < 16) {
		return "00" + value.toString(16);
	} else if (value < 256) {
		return "0" + value.toString(16);
	}
	return value.toString(16);
}

function loadPers() {
	
	var loadString = document.getElementById("saveload").value;
	
	document.getElementById("total").value = parseInt(loadString.substring(0,4),16);
	window.total = parseInt(loadString.substring(0,4),16);
	window.left = parseInt(loadString.substring(4,8),16);
	
	for (var i = 0; i < window.persArray.length; i++) {
		var index = 3*i+8;
		var n = parseInt(loadString.substring(index, index+3),16)
		window.persArray[i][1] = n;
		document.getElementById(window.persArray[i][0]).value = n;
	}
	
	totalUpdate();
	updateTypes();
}