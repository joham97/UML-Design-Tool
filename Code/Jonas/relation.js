var ASSOCIATION = 1;
var ASSOCIATION_ARROW = 2;
var DEPENDENCY = 3;
var COMPOSITION = 4;
var AGGREGATION = 5;
var INHERITANCE = 6;
var REALIZATION = 7;

class Relation {
    constructor(type, class1, class2, id, count) {
        this.class1 = class1;
        this.class2 = class2;
        this.class1.addRelation(this);
        this.class2.addRelation(this);
        this.type = type;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.id = id;
        this.count = count;
        this.cadinality1 = new RelationTag();
        this.cadinality2 = new RelationTag();
        this.name1 = new RelationTag();
        this.name2 = new RelationTag();
        this.calculatePosition();
    }

    calculatePosition() {
        this.x1 = this.class1.centerX;
        this.y1 = this.class1.centerY;
        this.x2 = this.class2.centerX;
        this.y2 = this.class2.centerY;
    }

    draw() {
        this.drawLine();

        noStroke();
        fill(0);
        text(this.cadinality1.name, this.cadinality1.x, this.cadinality1.y);
        text(this.cadinality2.name, this.cadinality2.x, this.cadinality2.y);
        text(this.name1.name, this.name1.x, this.name1.y);
        text(this.name2.name, this.name2.x, this.name2.y);
    }

    drawLine() {
        stroke(0);
        noFill();

        let unit = createVector(this.x2 - this.x1, this.y2 - this.y1).normalize();
        if (this.type == ASSOCIATION) {
            line(this.x1, this.y1, this.x2, this.y2);
        } else if (this.type == ASSOCIATION_ARROW) {
            line(this.x1, this.y1, this.x2, this.y2);

            var res2 = getCollisionLineRect(this.x1, this.y1, this.x2, this.y2, this.class2.x, this.class2.y, this.class2.width, this.class2.height);
            let angle = PI / 6;
            let length = 40;
            let angleOfUnit = Math.atan2(unit.y, unit.x);
            line(res2.x, res2.y, res2.x - Math.cos(angleOfUnit + angle) * length, res2.y - Math.sin(angleOfUnit + angle) * length);
            line(res2.x, res2.y, res2.x - Math.cos(angleOfUnit - angle) * length, res2.y - Math.sin(angleOfUnit - angle) * length);


        } else if (this.type == DEPENDENCY) {
            var res1 = getCollisionLineRect(this.x1, this.y1, this.x2, this.y2, this.class1.x, this.class1.y, this.class1.width, this.class1.height);
            var res2 = getCollisionLineRect(this.x1, this.y1, this.x2, this.y2, this.class2.x, this.class2.y, this.class2.width, this.class2.height);
            dottedLine(res1.x, res1.y, res2.x, res2.y);

            let angle = PI / 6;
            let length = 40;
            let angleOfUnit = Math.atan2(unit.y, unit.x);
            line(res2.x, res2.y, res2.x - Math.cos(angleOfUnit + angle) * length, res2.y - Math.sin(angleOfUnit + angle) * length);
            line(res2.x, res2.y, res2.x - Math.cos(angleOfUnit - angle) * length, res2.y - Math.sin(angleOfUnit - angle) * length);


        } else if (this.type == AGGREGATION) {
            line(this.x1, this.y1, this.x2, this.y2);

            var res1 = getCollisionLineRect(this.x1, this.y1, this.x2, this.y2, this.class1.x, this.class1.y, this.class1.width, this.class1.height);
            let length = 50;
            let angleOfUnit = Math.atan2(unit.y, unit.x);
            let angle = PI / 6;

            fill(255);
            stroke(0);
            beginShape();
            vertex(res1.x, res1.y);
            vertex(res1.x + Math.cos(angleOfUnit + angle) * length / 2, res1.y + Math.sin(angleOfUnit + angle) * length / 2);
            vertex(res1.x + unit.x * length, res1.y + unit.y * length);
            vertex(res1.x + Math.cos(angleOfUnit - angle) * length / 2, res1.y + Math.sin(angleOfUnit - angle) * length / 2);
            endShape(CLOSE);

        } else if (this.type == COMPOSITION) {
            line(this.x1, this.y1, this.x2, this.y2);

            var res1 = getCollisionLineRect(this.x1, this.y1, this.x2, this.y2, this.class1.x, this.class1.y, this.class1.width, this.class1.height);
            let length = 50;
            let angleOfUnit = Math.atan2(unit.y, unit.x);
            let angle = PI / 6;

            fill(0);
            stroke(0);
            beginShape();
            vertex(res1.x, res1.y);
            vertex(res1.x + Math.cos(angleOfUnit + angle) * length / 2, res1.y + Math.sin(angleOfUnit + angle) * length / 2);
            vertex(res1.x + unit.x * length, res1.y + unit.y * length);
            vertex(res1.x + Math.cos(angleOfUnit - angle) * length / 2, res1.y + Math.sin(angleOfUnit - angle) * length / 2);
            endShape(CLOSE);
        } else if (this.type == INHERITANCE) {
            line(this.x1, this.y1, this.x2, this.y2);

            var res1 = getCollisionLineRect(this.x1, this.y1, this.x2, this.y2, this.class1.x, this.class1.y, this.class1.width, this.class1.height);
            let length = 70;
            let angleOfUnit = Math.atan2(unit.y, unit.x);
            let angle = PI / 6;

            fill(255);
            stroke(0);
            beginShape();
            vertex(res1.x, res1.y);
            vertex(res1.x + Math.cos(angleOfUnit + angle) * length / 2, res1.y + Math.sin(angleOfUnit + angle) * length / 2);
            vertex(res1.x + Math.cos(angleOfUnit - angle) * length / 2, res1.y + Math.sin(angleOfUnit - angle) * length / 2);
            endShape(CLOSE);
        }
    }

    draw2() {
        fill(255, 0, 0);
        noStroke();
        var res1 = getCollisionLineRect(this.x1, this.y1, this.x2, this.y2, this.class1.x, this.class1.y, this.class1.width, this.class1.height);
        ellipse(res1.x, res1.y, 20, 20);
        var res2 = getCollisionLineRect(this.x1, this.y1, this.x2, this.y2, this.class2.x, this.class2.y, this.class2.width, this.class2.height);
        ellipse(res2.x, res2.y, 20, 20);
    }

    getCardinalityByPos(x, y) {

    }

    getNameByPos(x, y) {

    }

    markAllTags(marked) {
        this.cadinality1.marked = marked;
        this.cadinality2.marked = marked;
        this.name1.marked = marked;
        this.name2.marked = marked;
    }
}

class RelationTag {
    constructor() {
        this.name = "";
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }

    calculatePosition() {

    }

    checkHitbox(x, y) {
        return hitbox(x, y, this.x, this.y, this.width, this.height);
    }
}

function dottedLine(x1, y1, x2, y2) {
    let length = 50;
    let gap = 20;
    let vec = createVector(x2 - x1, y2 - y1);
    let count = round((vec.mag() + length) / (length + gap));
    let unit = vec.normalize();
    for (let i = 0; i < count; i++) {
        line(x1 + i * unit.x * (length + gap), y1 + i * unit.y * (length + gap),
            x1 + unit.x * (i * (length + gap) + length), y1 + unit.y * (i * (length + gap) + length));
    }
}

function getCollisionLineRect(x1, y1, x2, y2, rectX, rectY, rectWidth, rectHeight) {
    var res = getCollisionLineLine(x1, y1, x2, y2, rectX, rectY, rectX + rectWidth, rectY);
    if (res.x != -1 && res.y != -1) {
        return res;
    }
    res = getCollisionLineLine(x1, y1, x2, y2, rectX, rectY, rectX, rectY + rectHeight);
    if (res.x != -1 && res.y != -1) {
        return res;
    }
    var res = getCollisionLineLine(x1, y1, x2, y2, rectX, rectY + rectHeight, rectX + rectWidth, rectY + rectHeight);
    if (res.x != -1 && res.y != -1) {
        return res;
    }
    res = getCollisionLineLine(x1, y1, x2, y2, rectX + rectWidth, rectY, rectX + rectWidth, rectY + rectHeight);
    if (res.x != -1 && res.y != -1) {
        return res;
    }
    return { x: -1, y: -1 }
}

function getCollisionLineLine(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));

    var onLine1 = false;
    if (a > 0 && a < 1) {
        onLine1 = true;
    }
    var onLine2 = false;
    if (b > 0 && b < 1) {
        onLine2 = true;
    }

    // if line1 is a segment and line2 is infinite, they intersect if:
    if (onLine1 && onLine2) {
        return result;
    }

    result.x = -1;
    result.y = -1;
    return result;
}
