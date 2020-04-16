import { GameObject, Ball} from "./GameObject.js"
import { Covid } from "./games/Covid.js"

export class Enemy {

    constructor(x, y, target, type, color, radius, startAngle, endAngle, anticlockwise, speed, lives, walls) {
        //super (x, y, 0, 0, color);
        //super(x, y, 0, 0, color);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.target = target;
        this.type = type;
        this.color = color;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.anticlockwise = anticlockwise;
        this.speed = speed;
        this.lives = lives;
        this.bullets = [];
        this.spawnIntervalBullets = 0;
        this.hit = false;
        this.walls = walls;
        //this.boolvar = true;
    }

    update(ctx) {
        this.borderCollision(ctx); 
        this.move();
        let dx = -(this.x - (this.target.x + 15)); // was - wohin = dx bzw. dy
        let dy = -(this.y - (this.target.y + 15));
        let distance = Math.sqrt(dx * dx + dy * dy);
        if(this.type === 1 && distance < 250) 
        {
            this.shoot();
            //console.log(this.spawnIntervalBullets)
        }
        this.checkBullets(ctx);
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
        if(this.type === 0)
        {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
            ctx.fillStyle = this.color;
            //ctx.setLineDash([5, 15]);
            ctx.stroke();
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
        else if(this.type === 1)
        {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
            ctx.fillStyle = this.color;
            ctx.fill();
            //ctx.setLineDash([5, 15]);
            ctx.stroke();
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
        this.bullets.forEach(bullets => bullets.draw(ctx));
    }

    shoot()
    {
        //console.log(ctx);
        let dx = ((this.target.x + 15) - this.x);
        let dy = ((this.target.y + 15) - this.y);
        let scale = Math.sqrt(dx * dx + dy * dy); //???
        if(this.spawnIntervalBullets > 60)
        {
            this.bullets.push(new Ball(this.x, this.y, 10, 10, "#6bd26b", (dx / scale) * 5, (dy / scale) * 5));
            //console.log(e.x-rect.left);
            //console.log(e.y-rect.top);
            this.spawnIntervalBullets = 0;
            // to do: speed variable
            //this.bullets[this.bulletId] = new Bullet(this.player.x, this.player.y, 10, 10, "#6bd26b", 0, -8, this.bulletId, -8, e.x, e.y);
            //this.bulletId += 1;
        }
    }

    checkBullets(ctx)
    {
        this.hit = false;
        //console.log(this.bullets.length)
        if(this.spawnIntervalBullets <= 60)
        {
            this.spawnIntervalBullets = this.spawnIntervalBullets + 1;
        }
        for(let i = 0; i < this.bullets.length; i++) // for each bessser weil sonst abfrage auf bereits gelöschte elemente -> i--
        {
            // Auch andere Ränder betrachen -> Border
            this.bullets[i].update(ctx);
            if(this.bullets[i] != undefined && this.bullets[i].x < 0 || this.bullets[i].x > ctx.canvas.width || this.bullets[i].y < 0 || this.bullets[i].y > ctx.canvas.height)
            {
                this.bullets.splice(i, 1);
            }
            if(this.bullets[i] != undefined && GameObject.rectangleCollision(this.bullets[i], this.target))
            {
                this.bullets.splice(i, 1);
                this.hit = true;
                //Covid.lives--;
            }
            /*for(let j = 0; j < this.stones.length; j++)
            {
                /*if(this.bullets[i].x === this.stones[j].x && this.bullets[i].y === this.stones[j].y)
                {

                    this.bullets.splice(i, 1);
                    this.stones.splice(j, 1);
                    console.log(this.bullets[i].y+10);
                }*/
                /*if(GameObject.rectangleCollision(this.bullets[i], this.stones[j])) {
                    this.bullets.splice(i, 1);
                    this.stones.splice(j, 1);
                    this.points = this.points + 1;
                }*/
                /*if(GameObject.rectangleCollision(this.walls[j], this.bullets[i])) {
                    this.bullets.splice(i, 1);
                    //this.walls.splice(j, 1);
                }*/
            //}
            for(let j = 0; j < this.walls.length; j++)
            {
                if(this.bullets[i] != undefined && GameObject.rectangleCollision(this.walls[j], this.bullets[i])) {
                    this.bullets.splice(i, 1);
                    //this.walls.splice(j, 1);
                }
            }
            /*this.stones.forEach(this.stones => {
                if(GameObject.rectangleCollision(this.bullets[i], paddle)) {
                    this.handleHit(ctx, paddle);
                }
            });*/
        }
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

    static handleEnemyCollision(player, enemy1, enemy2) {
        let dx1 = Math.abs(enemy1.x - player.x),
            dy1 = Math.abs(enemy1.y - player.y),
            dx2 = Math.abs(enemy2.x - player.x),
            dy2 = Math.abs(enemy2.y - player.y),
            d1 = Math.sqrt(dx1 ** 2 + dy1 ** 2),
            d2 = Math.sqrt(dx2 ** 2 + dy2 ** 2);
    
        if(d1 > d2) {
            enemy1.x -= enemy1.vx;
            enemy1.y -= enemy1.vy;
        } else {
            enemy2.x -= enemy2.vx;
            enemy2.y -= enemy2.vy;
        }
    }

}
