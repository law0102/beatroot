var drum = {
	cost: 0,
	snare: {
		total: 0,
		basecost: 20,
		cost: 20,
		multiplier: 0,
		nextmultiplier: 1,
		gathered: 0,
	},
	hihat: {
		total: 0,
		basecost: 100,
		cost: 150,
		multiplier: 0,
		nextmultiplier: 1,
		fansneeded: 0,
		gathered: 0,
	},
	cymbals: {
		total: 0,
		basecost: 3500,
		cost: 3500,
		multiplier: 1,
		nextmultiplier: 2,
		fansneeded: 100,
		gathered: 0,
	},
	tomtoms: {
		total: 0,
		basecost:7500,
		cost: 7500,
		multiplier: 1,
		nextmultiplier: 2,
		fansneeded: 501,
		gathered: 0,
	},
	sticks: {
		total: 0,
		basecost:100,
		cost: 100,
		multiplier: 1,
		nextmultiplier: 2,
		fansneeded: 50,
	},
};
var guitar = {
	fansneeded: 750,
	total: 0,
	basecost:5000,
	cost: 10000,
	multiplier: 1,
	nextmultiplier: 2
};
var pick = {
	pickofdestiny: 0,
	cost: 1000000,
	multiplier: 1,
	fansneeded: 500000
};
var bass = {
	fansneeded: 1250,
	basecost: 100000,
	cost: 100000,
	total: 0,
	multiplier: 1,
	nextmultiplier: 1,
};

var totaldollars = 0;
var totalbeats = 0;
var fans = 0;
var fansmax=500;
var fansMaxMessage=0;
var clicks = 0;
var dollars = 0;
var beat=0;
var beatsperfan=16;
var hidden=0;
var venuecost=30000;
var venue = "basement";
var information=false;
var informationon=true;
//basement, shed, pub, concert,tour

$(document).ready(function () {
beginTick();
updateValues();

$('#drum').click(function () {
	clicks++;
	beat+=drum.sticks.multiplier;
	totalbeats+=drum.sticks.multiplier;
	beats();
	updateValues();
});

$('#upgradehihat').click(function() {
	if(dollars>=drum.hihat.cost){
		dollars-=drum.hihat.cost;
		drum.hihat.total++;
		drum.hihat.cost=drum.hihat.cost*Math.pow(1.5,drum.hihat.total);
		drum.hihat.multiplier=drum.hihat.nextmultiplier;
		drum.hihat.nextmultiplier++;
		updateValues();
	} else{
		$("#information").prepend($('<p>You can\'t afford that.</p>').fadeIn('slow'));
		information=true;
	}	
});

$('#upgradesnare').click(function() {
	if(dollars>=drum.snare.cost){
		dollars-=drum.snare.cost;
		drum.snare.total++;
		drum.snare.cost=drum.snare.cost*Math.pow(1.5,drum.snare.total);
		drum.snare.multiplier=drum.snare.nextmultiplier;
		drum.snare.nextmultiplier++;
		updateValues();
	} else{
		$("#information").prepend($('<p>You can\'t afford that.</p>').fadeIn('slow'));
		information=true;
	}	
});

$('#upgradecymbals').click(function() {
	if(dollars>=drum.cymbals.cost){
		dollars-=drum.cymbals.cost;
		drum.cymbals.total++;
		drum.cymbals.cost=drum.cymbals.cost*Math.pow(2,drum.cymbals.total*2);
		drum.cymbals.multiplier=drum.cymbals.nextmultiplier;
		drum.cymbals.nextmultiplier++;
		updateValues();
	} else{
		$("#information").prepend($('<p>You can\'t afford that.</p>').fadeIn('slow'));
		information=true;
	}	
});

$('#upgradetomtoms').click(function() {
	if(dollars>=drum.tomtoms.cost){
		dollars-=drum.tomtoms.cost;
		drum.tomtoms.total++;
		drum.tomtoms.cost=drum.tomtoms.cost*Math.pow(2,drum.tomtoms.total);
		drum.tomtoms.multiplier=drum.tomtoms.nextmultiplier;
		drum.tomtoms.nextmultiplier++;
		updateValues();
	} else{
		$("#information").prepend($('<p>You can\'t afford that.</p>').fadeIn('slow'));
		information=true;
	}	
});

$('#buydrumsticks').click(function() {
	if(dollars>=drum.sticks.cost){
		dollars-=drum.sticks.cost;
		drum.sticks.total++;
		drum.sticks.cost=drum.sticks.cost*Math.pow(2,drum.sticks.nextmultiplier);
		drum.sticks.multiplier=drum.sticks.nextmultiplier;
		drum.sticks.nextmultiplier++;
		drum.sticks.fansneeded=Math.floor(drum.sticks.cost*Math.pow(1.3,drum.sticks.multiplier));
		$('.drumsticks').addClass('hidden');
		updateValues();
	} else{
		$("#information").prepend($('<p>You can\'t afford that.</p>').fadeIn('slow'));
		information=true;
	}	
});

$('#buyguitar').click(function() {
	if(dollars>=guitar.cost){
		dollars-=guitar.cost;
		if(!guitar.total)l('guitaricon').innerHTML="<img id=\"drum\" src=\"img/guitar.png\" height=\"100px\" draggable=\"false\">";
		guitar.total++;
		guitar.cost=guitar.cost*Math.pow(1.5,guitar.total);
		guitar.multiplier++;
		guitar.nextmultiplier++;
		updateValues();
	} else{
		$("#information").prepend($('<p>You can\'t afford that.</p>').fadeIn('slow'));
		information=true;
	}	
});

$('#buybass').click(function() {
	if(dollars>=bass.cost){
		dollars-=bass.cost;
		bass.total++;
		l('bassicon').innerHTML="<img id=\"drum\" src=\"img/bass.png\" height=\"100px\" draggable=\"false\">";
		updateValues();
		beatsperfan-=bass.multiplier;
		$('.buybass').addClass('hidden');
	} else{
		$("#information").prepend($('<p>You can\'t afford that.</p>').fadeIn('slow'));
		information=true;
	}	
});

$('#buypick').click(function() {
	if(dollars>=pick.cost){
		dollars-=pick.cost;
		pick.pickofdestiny++;
		pick.multiplier*=0.5;
		$('.buypick').addClass('hidden');
		updateValues();
	} else{
		$("#information").prepend($('<p>You can\'t afford that.</p>').fadeIn('slow'));
		information=true;
	}	
});

$('#buyshed').click(function() {
	if(dollars>=venuecost){
		nextVenue();
		beatsperfan--;
	} else{
		$("#information").prepend($('<p>You can\'t afford that.</p>').fadeIn('slow'));
		information=true;
	}
});

$('#buypub').click(function() {
	if(dollars>=venuecost){
		nextVenue();
		beatsperfan--;
	} else{
		$("#information").prepend($('<p>You can\'t afford that.</p>').fadeIn('slow'));
		information=true;
	}
});

$('#buyconcert').click(function() {
	if(dollars>=venuecost){
		nextVenue();
		beatsperfan--;
	} else{
		$("#information").prepend($('<p>You can\'t afford that.</p>').fadeIn('slow'));
		information=true;
	}
});

$('#buytour').click(function() {
	if(dollars>=venuecost){
		nextVenue();
		beatsperfan--;
	} else{
		$("#information").prepend($('<p>You can\'t afford that.</p>').fadeIn('slow'));
	}
});

$('#statstab').click(function(){
	informationon=true;
	$('.info').addClass('hidden');
	$('.help').addClass('hidden');
	$('.stats').removeClass('hidden');
});

$('#infotab').click(function(){
	informationon=false;
	information=false;
	$('.stats').addClass('hidden');
	$('.help').addClass('hidden');
	$('.info').removeClass('hidden');
});

$('#helptab').click(function(){
	informationon=true;
	$('.info').addClass('hidden');
	$('.stats').addClass('hidden');
	$('.help').removeClass('hidden');
});


$('#save').click(function(){
});

$('#load').click(function(){
	updateValues();
});

$('reset').click(function(){
	dollars=0;
});

function beginTick() {
    nIntervId = setInterval(tick, 1000);
}

function geartext() {
	var str1='',str2='',str3='',str4='',str5='',str6='',str7='',str8='';
	if(drum.snare.total) str1='<h3>Snare:</h3>'+beutify(drum.snare.multiplier)+' Snares<br>'+beutify(drum.snare.multiplier*guitar.multiplier)+' Autobeats per second<br>Total autobeats: '+beutify(drum.snare.gathered);
	if(drum.hihat.total) str2='<h3>Hihat</h3>'+beutify(drum.hihat.multiplier)+' new fans per second<br>Total fans: '+beutify(drum.hihat.gathered);
	if(drum.cymbals.total) str3='<h3>Cymbals</h3>$'+beutify(drum.cymbals.multiplier)+' per fan';
	if(drum.tomtoms.total) str4='<h3>Tomtoms</h3>'+beutify(drum.tomtoms.multiplier)+' fans per beat cycle';
	if(drum.sticks.total) str5='<h3>Drumsticks</h3>'+beutify(drum.sticks.multiplier)+' beats per click<br>Total beats: '+beutify(totalbeats);

	if(guitar.total) str6='<hr><h3>Guitar</h3>Each autobeat hits '+guitar.multiplier+' times per second';
	if(pick.pickofdestiny) str7='<h3>Pick of Destiny</h3>Halfed beats per cycle';
	if(bass.total) str8='<h3>Bass</h3>Beats per cycle reduced by '+bass.multiplier;

	l('geartexts').innerHTML=str1+str2+str3+str4+str5+str6+str7+str8;
}

function beats() {
	if(beat>=Math.floor(beatsperfan*pick.multiplier)){
		fans+=drum.tomtoms.multiplier;
		beat-=Math.floor(beatsperfan*pick.multiplier);
		beats();
	}
}

function updateValues(){
	fansMaximum();
	l('beat').innerHTML= beutify(beat);
	l('fans').innerHTML= beutify(fans);
	l('dollars').innerHTML= beutify(dollars);
	l('bpf').innerHTML= beutify(Math.floor(beatsperfan*pick.multiplier));//make sure it cannot go below 1
	l('bpf2').innerHTML= beutify(beatsperfan);
	//l('dpf').innerHTML = beutify(drum.cymbals.multiplier);
	//l('fpbc').innerHTML = beutify(drum.tomtoms.multiplier);
	//if(drum.snare.multiplier!=1) document.getElementById('s').innerHTML = 's';
	l('hihatmulti').innerHTML = beutify(drum.hihat.nextmultiplier);
	l('hihatcost').innerHTML = beutify(drum.hihat.cost);
	l('snaremulti').innerHTML = beutify(drum.snare.nextmultiplier);
	l('snarecost').innerHTML = beutify(drum.snare.cost);
	l('cymbalsmulti').innerHTML = beutify(drum.cymbals.nextmultiplier);
	l('cymbalscost').innerHTML = beutify(drum.cymbals.cost);
	l('tomtomsmulti').innerHTML = beutify(drum.tomtoms.nextmultiplier);
	l('tomtomscost').innerHTML = beutify(drum.tomtoms.cost);
	l('guitarcost').innerHTML = beutify(guitar.cost);
	l('guitarmulti').innerHTML = beutify(guitar.nextmultiplier);
	l('basscost').innerHTML = beutify(bass.cost);
	//l('fps').innerHTML = beutify(drum.tomtoms.multiplier);
	//l('bpa').innerHTML = beutify(drum.snare.multiplier*guitar.multiplier);
	l('drumstickscost').innerHTML = beutify(drum.sticks.cost);
	l('guitarmulti').innerHTML = beutify(guitar.nextmultiplier);
	l('pickcost').innerHTML = beutify(pick.cost);
	l('venuecosts').innerHTML = beutify(venuecost);
	l('venuecostp').innerHTML = beutify(venuecost);
	l('venuecostc').innerHTML = beutify(venuecost);
	l('clicks').innerHTML = beutify(clicks);
	//l('bpc').innerHTML = beutify(drum.sticks.multiplier);
	l('mffv').innerHTML = beutify(fansmax);
	l('totaldollars').innerHTML = beutify(totaldollars);
	if(guitar.total>0) document.getElementById('guitartext').innerHtml = 'Upgrade';
	geartext();
}

function show(){
	if(fans>=guitar.fansneeded) $('.buyguitar').removeClass('hidden');
	if(fans>=bass.fansneeded&&bass.total==0) $('.buybass').removeClass('hidden');
	if(fans>=pick.fansneeded&&pick.total==0) $('.buypick').removeClass('hidden');
	if(fans>=drum.sticks.fansneeded) $('.drumsticks').removeClass('hidden');
	if(fans>=drum.cymbals.fansneeded) $('.cymbals').removeClass('hidden');
	if(fans>=drum.tomtoms.fansneeded) $('.tomtoms').removeClass('hidden');
}

function nextVenue(){
	dollars-=venuecost;
	switch (venue) {
		case "basement":
			venue="shed";
			document.body.style.backgroundImage="url('img/bg2.png')";
			fansneeded=5000;
			fansmax=5000;
			venuecost=500000;
			fansMaxMessage=0;
			$('.buyshed').addClass('hidden');
			break;
		case "shed":
			venue="pub";
			document.body.style.backgroundImage="url('img/bg3.png')";
			fansneeded=50000;
			fansmax=50000;
			venuecost=10000000;
			fansMaxMessage=0;
			$('.buypub').addClass('hidden');
			break;
		case "pub":
			venue="concert";
			document.body.style.backgroundImage="url('img/bg4.png')";
			fansneeded=500000;
			venuecost=10000000;
			fansmax=500000;
			fansMaxMessage=0;
			$('.buypub').addClass('hidden');
			break;
		case "concert":
			//venue="tour";
			//document.body.style.backgroundImage="url('img/bg1.png')";
			//fansneeded=5000;
			fansmax=9007199254740992;
			fansMaxMessage=0;
			$('.buyconcert').addClass('hidden');
			break;
		case "tour":
			//venue="basement";
			//fansMaxMessage=0;
			//document.body.style.backgroundImage="url('img/bg.png')";
			//fansneeded=5000;
			//fansmax=5000;
			//$('.buyshed').addClass('hidden');
			break;
		}
	}

function fansMaximum(){
	switch (venue) {
		case "basement":
			if (fans>(0.75*fansmax)){
				$('.buyshed').removeClass('hidden');
			}
			break;
		case "shed":
			if (fans>(0.75*fansmax)){
				$('.buypub').removeClass('hidden');
			}
			break;
		case "pub":
			if (fans>(0.75*fansmax)){
				$('.buyconcert').removeClass('hidden');
			}
			break;
		case "concert":
			//if (fans>(0.75*fansmax)){
			//	$('.buytour').removeClass('hidden');
			//}
			break;
		case "tour":
			//if (fans>(0.75*fansmax)){
			//	$('.pubupgrade').removeClass('hidden');
			//}
			break;
		}

	if (fans>fansmax) {
		dollars+=fans-fansmax;
		fans=fansmax;
		if(!fansMaxMessage) {
			$("#information").prepend($('<p>You\'ve reached maximum fans for the venue.</p>').fadeIn('slow'));
			information=true;
			fansMaxMessage=1;
		}
	}
}

function revealhidden(){
	$('.buyguitar').removeClass('hidden');
	$('.buybass').removeClass('hidden');
	$('.buypick').removeClass('hidden');
	$('.drumsticks').removeClass('hidden');
	$('.buyshed').removeClass('hidden');
	$('.buypub').removeClass('hidden');
	$('.buyconcert').removeClass('hidden');
	$('.buytour').removeClass('hidden');
	$('.cymbals').removeClass('hidden');
	$('.tomtoms').removeClass('hidden');
}

function l(a) {return document.getElementById(a);}

function beutify(x){
	//hiden past decimal point
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	//code to remove commas after decimal place
	//return x.toString().replace(/\B(?=(\d{3})+(?!\d)(?=\.))/g, ",");
}

function tick() {
    var dosh = Math.round(Math.random()*fans*drum.cymbals.multiplier);
    dollars+= dosh;
    totaldollars+=dosh;

    beat+=drum.snare.multiplier*guitar.multiplier;
    drum.snare.gathered+=drum.snare.multiplier*guitar.multiplier;

   	fans+=drum.hihat.multiplier;
   	drum.hihat.gathered+=drum.hihat.multiplier;
   	//add case for when max fans is reached

    beats();
	updateValues();
	show();
	fansMaximum();

	if(hidden!=0) revealhidden();
	if(information&&informationon) $("#infotab").fadeTo(100, 0.1).fadeTo(200, 1.0);
}

});
