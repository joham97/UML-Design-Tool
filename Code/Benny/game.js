var mainbuttons;
var methodenbuttons;
var beziehungenbuttons;
var kardinalitaetenbuttons;

function preload() {
	this.methodenbuttons = [];
	this.beziehungenbuttons = [];
	this.kardinalitaetenbuttons = [];

	this.mainbuttons = [];
	this.mainbuttons.push(new Button(10, 20, 125, 125, "Klasse", "Symbole//Hauptmenü//Klassensymbol.PNG", true, []));
	this.mainbuttons.push(new Button(10, 160, 125, 125, "Methoden / Attribute", "Symbole//Hauptmenü//AttributeMethoden.PNG", true, methodenbuttons));
	this.mainbuttons.push(new Button(10, 300, 125, 125, "Beziehung", "Symbole//Hauptmenü//Beziehungsymbol.PNG", true, beziehungenbuttons));
	this.mainbuttons.push(new Button(10, 440, 125, 125, "Kardinalitäten", "Symbole//Hauptmenü//Kardinalitätsymbol.PNG", true, kardinalitaetenbuttons));
	this.mainbuttons.push(new Button(10, 580, 125, 125, "Löschen", "Symbole//Hauptmenü//Löschensymbol.PNG", true, []));
	this.mainbuttons.push(new Button(10, 720, 125, 125, "Undo", "Symbole//Hauptmenü//Undosymbol.PNG", true, []));
	this.mainbuttons.push(new Button(10, 860, 125, 125, "Export / Import", "Symbole//Hauptmenü//ImportExportsymbol.PNG", true, []));

	this.methodenbuttons.push(new Button(160, 20, 125, 125, "Konstruktor", "dustin.jpg", false));
	this.methodenbuttons.push(new Button(160, 160, 125, 125, "Public", "Symbole//Untermenü//Public.PNG", false));
	this.methodenbuttons.push(new Button(160, 300, 125, 125, "Private", "Symbole//Untermenü//Private.PNG", false));
	this.methodenbuttons.push(new Button(160, 440, 125, 125, "Protected", "Symbole//Untermenü//Protected.PNG", false));


	this.beziehungenbuttons.push(new Button(160, 20, 125, 125, "Assoziation", "Symbole//Untermenü//Assoziation.PNG", false));
	this.beziehungenbuttons.push(new Button(160, 160, 125, 125, "gerichtete Assoziation", "Symbole//Untermenü//gerichteteAssoziation.PNG", false));
	this.beziehungenbuttons.push(new Button(160, 300, 125, 125, "Abhängigkeit", "Symbole//Untermenü//Abhängigkeit.PNG", false));
	this.beziehungenbuttons.push(new Button(160, 440, 125, 125, "Komposition", "Symbole//Untermenü//Komposition.PNG", false));
	this.beziehungenbuttons.push(new Button(160, 580, 125, 125, "Aggregation", "Symbole//Untermenü//Aggregation.PNG", false));
	this.beziehungenbuttons.push(new Button(160, 720, 125, 125, "Vererbung", "Symbole//Untermenü//Vererbung.PNG", false));


	this.kardinalitaetenbuttons.push(new Button(160, 20, 125, 125, "", "Symbole//Untermenü//Bezeichner.PNG", false));
	this.kardinalitaetenbuttons.push(new Button(160, 160, 125, 125, "", "Symbole//Untermenü//0..1.PNG", false));
	this.kardinalitaetenbuttons.push(new Button(160, 300, 125, 125, "", "Symbole//Untermenü//0..Stern.PNG", false));
	this.kardinalitaetenbuttons.push(new Button(160, 440, 125, 125, "", "Symbole//Untermenü//1.PNG", false));
	this.kardinalitaetenbuttons.push(new Button(160, 580, 125, 125, "", "Symbole//Untermenü//1..Stern.PNG", false));
	this.kardinalitaetenbuttons.push(new Button(160, 720, 125, 125, "", "Symbole//Untermenü//Stern.PNG", false));



}
function setup() {
	createCanvas(1250, 990);

}


function draw() {
	background(255);

	strokeWeight(5);
	noFill();


	for (let i = 0; i < this.mainbuttons.length; i++) {
		this.mainbuttons[i].draw();
		for (let j = 0; j < this.mainbuttons[i].subButtons.length; j++) {
			this.mainbuttons[i].subButtons[j].draw();
		}
	}

	ellipse(mouseX, mouseY, 10, 10);

}

function closeAll() {
	for (let i = 0; i < this.mainbuttons.length; i++) {
		this.mainbuttons[i].isMarked = false;
		for (let j = 0; j < this.mainbuttons[i].subButtons.length; j++) {
			this.mainbuttons[i].subButtons[j].visible = false;
			this.mainbuttons[i].subButtons[j].isMarked = false;
		}
	}
}

function mousePressed() {
	for (let i = 0; i < this.mainbuttons.length; i++) {
		if (this.mainbuttons[i].checkHitbox()) {
			closeAll();
			this.mainbuttons[i].isMarked = true;
			for (let j = 0; j < this.mainbuttons[i].subButtons.length; j++) {
				this.mainbuttons[i].subButtons[j].visible = true;
				if (this.mainbuttons[i].subButtons[j].checkHitbox()) {
					this.mainbuttons[i].subButtons[j].isMarked = true;
				}
			}
		}
	}
	for (let i = 0; i < this.mainbuttons.length; i++) {
		for (let j = 0; j < this.mainbuttons[i].subButtons.length; j++) {
			if (this.mainbuttons[i].subButtons[j].checkHitbox()) {
				for (let k = 0; k < this.mainbuttons[i].subButtons.length; k++) {
					this.mainbuttons[i].subButtons[k].isMarked = false;
				}
				this.mainbuttons[i].subButtons[j].isMarked = true;
			}
		}
	}



}






