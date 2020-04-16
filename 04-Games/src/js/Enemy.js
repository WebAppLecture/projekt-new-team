import { GameObject } from "./GameObject.js"

export class Enemy {

    constructor(x, y, target, color, radius, startAngle, endAngle, anticlockwise, speed, lives) {
        //super (x, y, 0, 0, color);
        //super(x, y, 0, 0, color);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.target = target;
        this.color = color;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
        this.speed = speed;
        this.lives = lives;
        //this.boolvar = true;
    }

    update(ctx) {
        this.borderCollision(ctx); 
        this.move();
    }

    move() {
        //if(this.boolvar)
        //{
            /*console.log(this.target.x);
            console.log(this.x);
            console.log(this.target.y);
            console.log(this.y);*/
            let dx = -(this.x - (this.target.x + 15)); // was - wohin = dx bzw. dy
            let dy = -(this.y - (this.target.y + 15));
            //console.log("dx", dx);
            //console.log("dy", dy);
            let scale = Math.sqrt(dx * dx + dy * dy);
            this.vx = (dx / scale) * this.speed;
            this.vy = (dy / scale) * this.speed;
            this.x += this.vx;
            this.y += this.vy;
        //}
    }

    moveBackwards() {
        /*console.log(this.target.x);
            console.log(this.x);
            console.log(this.target.y);
            console.log(this.y);*/
            let dx = -(this.x - (this.target.x + 15)); // was - wohin = dx bzw. dy
            let dy = -(this.y - (this.target.y + 15));
            //console.log("dx", dx);
            //console.log("dy", dy);
            let scale = Math.sqrt(dx * dx + dy * dy);
            this.vx = (dx / scale) * this.speed;
            this.vy = (dy / scale) * this.speed;
            this.x -= this.vx;
            this.y -= this.vy;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
        ctx.fillStyle = this.color;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
    }

    borderCollision(ctx) {
        if(this.y - this.radius < 0) { // Top border
            this.y = 0;
            //this.vy = -this.vy;
        } 
        if(this.y + this.radius > ctx.canvas.height) { // bottom border
            this.y = ctx.canvas.height - this.radius;
            //this.vy = -this.vy;
        }
        if(this.x - this.radius < 0) { // left border
            this.x = 0;
            //this.vx = -this.vx;
        } 
        if(this.x + this.radius > ctx.canvas.width) { // right border
            this.x = ctx.canvas.width - this.radius;
            //this.vx = -this.vx;
        }
    }

    static criclecricleCollision(circ1, circ2) {
        let dx = circ1.x - circ2.x;
        let dy = circ1.y - circ2.y;
        /*console.log(dx)
        console.log(dy)
        console.log(circ1.radius)
        console.log(circ2.radius)*/
        return (circ1.radius + circ2.radius) > Math.sqrt(dx * dx + dy * dy);
    }

    static criclerectngleCollision(rect1, circ1) { //http://www.jeffreythompson.org/collision-detection/circle-rect.php
        let cx = circ1.x;
        let cy = circ1.y;
        let rx = rect1.x;
        let ry = rect1.y;
        let rw = rect1.width;
        let rh = rect1.height;
        let testX = cx;
        let testY = cy;

        // which edge is closest?
        if (cx < rx) 
        {
            testX = rx;
        }   // test left edge
        else if (cx > rx+rw) 
        {
            testX = rx+rw;   
        }   // right edge
        if (cy < ry)         
        {
            testY = ry;  
        }   // top edge
        else if (cy > ry+rh) 
        {
            testY = ry+rh;
        }   // bottom edge

        // get distance from closest edges
        let distX = cx-testX;
        let distY = cy-testY;
        let distance = Math.sqrt( (distX * distX) + (distY * distY) );

        // if the distance is less than the radius, collision!
        if (distance <= circ1.radius) 
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
}
