var classes;
var relations;

//Drag and Drop Helpers
var lockOnClass = -1;
var gotDragged = false;
var ignoreFirstDrag = false;
var lastMouseX = -1;
var lastMouseY = -1;

//Rename Input Field
var input;
var ignoreInputAtAll = false;
var classToEdit = -1;
var classNameToEdit = false;
var classAttrToEdit = -1;
var classMethodToEdit = -1;

function setup() {
	createCanvas(1250, 990);

	this.input = createInput();
	this.input.position(-1000, -1000);
	this.input.style("text-align", "center");
	this.input.style("font-size", "24px");

	classes = [];
	classes.push(new Class(380, 100));
	classes.push(new Class(300, 390));

	classes[0].setName("Lebewesen");
	classes[0].addAttribute("-name: String");
	classes[0].addMethod("+getName(): String");
	classes[0].addMethod("+setName(name: String)");

	classes[1].setName("Person");
	classes[1].addAttribute("-adresse: String");
	classes[1].addAttribute("-schuhgroeße: int");
	classes[1].addMethod("+getAdresse(): String");
	classes[1].addMethod("+setAdresse(adresse: String)");
	classes[1].addMethod("+getSchuhgroeße(): String");
	classes[1].addMethod("+setSchuhgroeße(schuhgroeße: String)");

	relations = [];
	relations.push(new Relation(this.INHERITANCE, classes[0], classes[1]));
}

function draw() {
	background(255);

	fill(255);
	stroke(0);
	strokeWeight(5);

	for (let i = 0; i < this.relations.length; i++) {
		this.relations[i].draw();
	}

	for (let i = 0; i < this.classes.length; i++) {
		this.classes[i].draw();
	}

	for (let i = 0; i < this.relations.length; i++) {
		//this.relations[i].draw2();
	}
}

function classOnTop(index) {
	this.classes.push(this.classes[index]);
	this.classes.splice(index, 1);
}

function keyReleased() {
	if (keyCode == ENTER) {
		closeRename();
	}
}

function mousePressed() {
	if (!ignoreInputAtAll && this.lockOnClass == -1) {
		for (let i = this.classes.length - 1; i >= 0; i--) {
			if (this.classes[i].checkHitbox(mouseX, mouseY) && this.lockOnClass == -1) {
				classOnTop(i);
				this.lockOnClass = this.classes.length - 1;
				this.ignoreFirstDrag = true;
				this.lastMouseX = mouseX;
				this.lastMouseY = mouseY;
			}
		}
	}
}

function mouseDragged() {
	if (!ignoreInputAtAll && !ignoreFirstDrag && this.lockOnClass != -1) {
		this.gotDragged = true;
		this.classes[this.lockOnClass].setX(classes[this.lockOnClass].x + (mouseX - this.lastMouseX));
		this.classes[this.lockOnClass].setY(classes[this.lockOnClass].y + (mouseY - this.lastMouseY));
		this.lastMouseX = mouseX;
		this.lastMouseY = mouseY;
	}
	this.ignoreFirstDrag = false;
}

function mouseReleased() {
	this.lockOnClass = -1;
	this.lastMouseX = -1;
	this.lastMouseX = -1;
}

function mouseClicked() {
	//Close Rename Window
	if (this.ignoreInputAtAll && this.classToEdit != -1) {
		closeRename();
	}

	//Show Rename Window if valid
	if (!this.ignoreInputAtAll && !gotDragged) {
		for (let i = this.classes.length - 1; i >= 0; i--) {
			if (this.classes[i].checkHitbox(mouseX, mouseY)) {
				if (this.classes[i].checkHitboxClassName(mouseX, mouseY)) {
					renameClass(i);
				} else {
					let id = this.classes[i].getAttributeByPos(mouseX, mouseY);
					if (id != -1) {
						renameAttribute(i, id);
					} else {
						let id = this.classes[i].getMethodByPos(mouseX, mouseY);
						if (id != -1) {
							renameMethod(i, id);
						}
					}
				}
			}
		}
	}
	gotDragged = false;
}

function closeRename() {
	this.input.position(-1000, -1000);

	if (classNameToEdit) {
		this.classes[this.classToEdit].setName(this.input.value());
	}
	if (this.classAttrToEdit != -1) {
		this.classes[this.classToEdit].setAttribute(this.classAttrToEdit, this.input.value());
	}
	if (this.classMethodToEdit != -1) {
		this.classes[this.classToEdit].setMethod(this.classMethodToEdit, this.input.value());
	}

	this.classToEdit = -1;
	this.classNameToEdit = false;
	this.classAttrToEdit = -1;
	this.classMethodToEdit = -1;

	this.ignoreInputAtAll = false;
}

function renameClass(id) {
	this.input.style("text-align", "center");
	ignoreInputAtAll = true;
	this.input.position(this.classes[id].x + 11, this.classes[id].y + 11);
	this.input.size(this.classes[id].width - 9, this.classes[id].nameHeight - 10);
	this.classToEdit = id;
	this.classNameToEdit = true;
	this.input.value(this.classes[id].name);
	this.input.elt.focus();
}

function renameAttribute(id, count) {
	this.input.style("text-align", "left");
	ignoreInputAtAll = true;
	this.input.position(this.classes[id].x + 11, 8 + this.classes[id].y + this.classes[id].nameHeight + this.classes[id].marginY + count * (textSize() + this.classes[id].marginY / 2));
	this.input.size(this.classes[id].width - 9, textSize() + this.classes[id].marginY / 2 - 5);
	this.classToEdit = id;
	this.classAttrToEdit = count;
	this.input.value(this.classes[id].attributes[count]);
	this.input.elt.focus();
}

function renameMethod(id, count) {
	this.input.style("text-align", "left");
	ignoreInputAtAll = true;

	this.input.position(this.classes[id].x + 11, 8 + this.classes[id].y + this.classes[id].nameHeight + this.classes[id].attrHeight + this.classes[id].marginY + count * (textSize() + this.classes[id].marginY / 2));
	this.input.size(this.classes[id].width - 9, textSize() + this.classes[id].marginY / 2 - 5);
	this.classToEdit = id;
	this.classMethodToEdit = count;
	this.input.value(this.classes[id].methods[count]);
	this.input.elt.focus();
}

function hitbox(x, y, rectX, rectY, rectWidth, rectHeight) {
	return rectX <= x && x <= rectX + rectWidth && rectY <= y && y <= rectY + rectHeight;
}