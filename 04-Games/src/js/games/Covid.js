import { GameTemplate } from "./GameTemplate.js"
import { GameObject, MovableGameObject, Ball, Mode, Bullet, StrokedObject } from "../GameObject.js";
import { Pong, Paddle } from "../games/Pong.js";
import { Enemy } from "../Enemy.js";

export class Covid extends GameTemplate {

    start() 
    {
        //to do: globale variablen
        //to do: Pathfinding
        // to do: Komentare einfügen
        // to do: einheitliche Formatierung
        // to do: Randomness
        // to do: Bug fixing
        // to do: Methoden richtig einteilen
        // to do: Allgemein: Aufräumen
        // to do: for -- || undifined
        // to do: Enemy types
        // to do: wall gliches
        // to do: healign
        // to do: points draw
        // to do: spawnpont
        this.gameOver = false;
        //this.playerSpeed = 5;
        //ctx.canvas.height;
        this.canvas = document.querySelector(".screen")
        //this.canvas.onmousedown = shoot();
        //console.log(this.canvas);
        this.canvas.addEventListener("mousedown",(e) => this.shoot(e)); // shoot true wenn dauerfeuer
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Paddle(185, 235, 30, 30, 2); //border collision
        //this.player = new Ball(200, 450, 50, 50, "#6bd26b", 8, 0);
        //document.querySelector(".canvas")
        this.bullets = [];
        this.stones = [];
        this.walls = [];
        this.enemies = [];
        this.maps = [];
        this.points = 0;
        this.lives = 5;
        this.spawnIntervalStones = 0;
        this.spawnIntervalBullets = 0;
        this.bulletId = 0;
        this.wallsSize = 50;
        this.spawnEnemy();
        this.buildMap();
        //this.player.addEventListener("mousedown", event => this.shoot(event));
        //this.screen =  
    }

    bindControls() 
    {
        this.inputBinding = {
            "up" : this.player.up.bind(this.player),
            "down" : this.player.down.bind(this.player), 
            "left" : this.player.left.bind(this.player), 
            "right" : this.player.right.bind(this.player), 
            "primary" : this.shoot.bind(this),
        };
    }

    set lives(value) {
        this.__lives = value * 1;
        if(this.__lives <= 0) {
            this.gameOver = true;
        }
    }

    get lives() {
        return this.__lives * 1;
    }

    update(ctx) // einmal pro frame
    {
        this.player.update(ctx);
        this.checkBullets(ctx);
        //this.checkStones(ctx)
        this.checkWalls();
        this.drawPoints(ctx);
        this.checkEnemies(ctx);
        ctx.font = "30px Verdana";
        //ctx.fillStyle = "#000000";
        ctx.fillText(this.lives, this.player.x, this.player.y);
        if(this.enemies.length === 0)
        {
            this.spawnEnemy();
            this.buildMap();
        }
        //console.log(this.findQuadrant(315,209)[0]);

    }

    draw(ctx) 
    {
        this.player.draw(ctx);
        this.bullets.forEach(bullets => bullets.draw(ctx));
        this.stones.forEach(stones => stones.draw(ctx));
        this.walls.forEach(walls => walls.draw(ctx));
        this.enemies.forEach(enemies => enemies.draw(ctx));   
    }

    shoot(e)
    {
        //console.log(ctx);
        let rect = this.canvas.getBoundingClientRect();
        let scaleX = this.canvas.width / rect.width;    // relationship bitmap vs. element for X
        let scaleY = this.canvas.height / rect.height;
        let dx = ((e.x-rect.left)*scaleX - this.player.x);
        let dy = ((e.y-rect.top)*scaleY - this.player.y);
        let scale = Math.sqrt(dx * dx + dy * dy); //???
        if(this.spawnIntervalBullets > 10)
        {
            this.bullets.push(new Ball(this.player.x + 15, this.player.y + 15, 10, 10, "#6bd26b", (dx / scale) * 10, (dy / scale) * 10));
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
        //console.log(this.bullets.length)
        if(this.spawnIntervalBullets <= 10)
        {
            this.spawnIntervalBullets = this.spawnIntervalBullets + 1;
        }
        for(let i = this.bullets.length - 1; i >= 0; i--) // for each bessser weil sonst abfrage auf bereits gelöschte elemente -> i--
        {
            // Auch andere Ränder betrachen -> Border
            this.bullets[i].update(ctx);
            if(this.bullets[i].x < 0 || this.bullets[i].x > ctx.canvas.width || this.bullets[i].y < 0 || this.bullets[i].y > ctx.canvas.height)
            {
                this.bullets.splice(i, 1);
            }
            for(let j = this.stones.length - 1; j >= 0; j--)
            {
                /*if(this.bullets[i].x === this.stones[j].x && this.bullets[i].y === this.stones[j].y)
                {

                    this.bullets.splice(i, 1);
                    this.stones.splice(j, 1);
                    console.log(this.bullets[i].y+10);
                }*/
                if(GameObject.rectangleCollision(this.bullets[i], this.stones[j])) {
                    this.bullets.splice(i, 1);
                    this.stones.splice(j, 1);
                    this.points = this.points + 1;
                }
                /*if(GameObject.rectangleCollision(this.walls[j], this.bullets[i])) {
                    this.bullets.splice(i, 1);
                    //this.walls.splice(j, 1);
                }*/
            }
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

    checkStones(ctx)
    {
        for(let j = 0; j < this.stones.length; j++)
        {
            this.stones[j].update(ctx);
            if(this.stones[j].y > 500)
            {
                this.stones.splice(j, 1);
                //this.lives = this.lives - 1;
            }
        }
        if(this.spawnIntervalStones > 30)
        {
            this.stones.push(new Ball((Math.random()*300)+25, 0, 50, 100, "#6bd26b", 0, 1));
            this.spawnIntervalStones = 0;
        }
        else
        {
            this.spawnIntervalStones = this.spawnIntervalStones + 1;
        }
    }

    checkWalls() //besser Obstacles -> Kugelhitboxen
    {
        let playerQuadr = this.findQuadrant(this.player.x, this.player.y, 40);
        for(let i = 0; i < this.walls.length; i++) // for each bessser weil sonst abfrage auf bereits gelöschte elemente
        {
            let dx = this.player.x - this.walls[i].x;
            let dy = this.player.y - this.walls[i].y;
            let pitch = dy / dx;
            if(GameObject.rectangleCollision(this.player, this.walls[i])) {
                let wallQuadr = this.findQuadrant(this.walls[i].x, this.walls[i].y, 40);
                //console.log("Hallo");
                let index =  i;
                // Problem: Wenn collision dann wird erst das oberste überprüft alternativ: vx und vy >< 0
                // Nicht alle Bedingung nötig
                // < || <=
                // to do : add pitch 
                console.log(pitch)
                //console.log(this.walls[index].x + 40)
                if(playerQuadr[0] > wallQuadr[0] )// this.player.x < this.walls[index].x  + 40 && this.player.x > this.walls[index].x && this.player.y < this.walls[index].y + 40 && this.player.y > this.walls[index].y - 30 && this.player.vx < 0)// && pitch >= -0.5 && pitch <= 0.5) //this.player.x < this.walls[index].x + 40 && this.player.x > this.walls[index].x)
                {
                    //right
                    let yRight = this.player.y;
                    console.log("right");
                    //console.log(this.player.x)
                    //console.log(this.walls[index].x)
                    this.player.x = this.player.x -this.player.vx;//this.walls[index].x + 50;
                }
                else if(playerQuadr[0] < wallQuadr[0] )// this.player.x > this.walls[index].x - 30 && this.player.y < this.walls[index].y + 40 && this.player.y > this.walls[index].y - 30 && this.player.vx > 0) //this.player.x > this.walls[index].x)
                {
                    //left
                    console.log("left");
                    this.player.x = this.walls[index].x - 30;
                }
                else if(playerQuadr[1] > wallQuadr[1] )// this.player.y < this.walls[index].y + 40 && this.player.x < this.walls[index].x + 40 && this.player.x > this.walls[index].x - 30 && this.player.vy < 0 )
                {
                    //under
                    console.log("under");
                    this.player.y = this.walls[index].y + 50;
                }
                else if(playerQuadr[1] < wallQuadr[1]  )// this.player.y > this.walls[index].y - 30 && this.player.vy > 0)
                {
                    //over
                    console.log("over");
                    //console.log(this.player.y)
                    //console.log(this.walls[index].y)
                    this.player.y = this.walls[index].y - 30;
                }
                
            }
            /*for(let j = 0; j < this.bullets.length; j++)
            {
                if(GameObject.rectangleCollision(this.walls[i], this.bullets[j])) {
                    this.bullets.splice(i, 1);
                    //this.walls.splice(j, 1);
                }
            }*/
        }
    }
    
    checkEnemies(ctx)
    {
        let set = false;
        for(let i = 0; i < this.enemies.length; i++) // for each bessser weil sonst abfrage auf bereits gelöschte elemente -> i--
        {
            
            if(this.enemies[i].hit === true)
            {
                this.lives--;
            }
            for(let j = 0; j < this.enemies.length; j++) // for each bessser weil sonst abfrage auf bereits gelöschte elemente -> i--
            {
                if(i != j && Enemy.criclecricleCollision(this.enemies[i], this.enemies[j]) && set === false) { // warum nicht while
                    console.log("Treffer");
                    Enemy.handleEnemyCollision(this.player, this.enemies[i], this.enemies[j]);
                }
            }
            this.enemies[i].update(ctx);
            // to do: Collision Reatiction
            for(let k = 0; k < this.walls.length; k++) 
            {
                //console.log("Wand");
                if(Enemy.criclerectngleCollision(this.walls[k], this.enemies[i]))
                {
                    console.log("Wand");
                    // to do: Pathfinding
                }
            }
            if(Enemy.criclerectngleCollision(this.player, this.enemies[i]))
            {
                {
                    this.lives--;
                    this.enemies.splice(i, 1);
                }
            }
            for(let p = 0; p < this.bullets.length; p++) 
            {
                if(Enemy.criclerectngleCollision(this.bullets[p], this.enemies[i]))
                {
                    this.points++;
                    this.enemies.splice(i, 1);
                    this.bullets.splice(p, 1);
                    // to do: spawn new enemies bzw. map
                }
            }
        }
    }

    buildMap() 
    {
        this.walls.splice(0, this.walls.length);
        let wallPostition = [];
        let map = Math.round(Math.random() * 5);
        // 0 -> No Obstacle | 1 -> Obstacle
        this.maps[0] = [0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 1, 0, 0, 0, 0, 1, 0,       
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 1, 0, 0, 0, 0, 1, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0]
        this.maps[1] = [0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 1, 0, 0, 0, 0, 1, 0,       
                        0, 0, 1, 0, 0, 1, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 1, 0, 0, 1, 0, 0, 
                        0, 1, 0, 0, 0, 0, 1, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0]
        this.maps[2] = [0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 1, 0, 0, 0, 0, 1, 0,       
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 1, 1, 0, 0, 0,  
                        0, 0, 0, 1, 1, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 1, 0, 0, 0, 0, 1, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0]
        this.maps[3] = [0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0,       
                        0, 1, 0, 0, 0, 0, 1, 0,  
                        0, 1, 1, 0, 0, 1, 1, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 1, 1, 0, 0, 1, 1, 0,  
                        0, 1, 0, 0, 0, 0, 1, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0]
        this.maps[4] = [0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 1, 0, 0, 0, 0, 1, 0,       
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 1, 0, 1, 1, 0, 1, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0,  
                        0, 1, 0, 1, 1, 0, 1, 0,  
                        0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 1, 0, 0, 0, 0, 1, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0]
        this.maps[5] = [0, 0, 0, 0, 0, 0, 0, 0, 
                        0, 1, 1, 0, 0, 1, 1, 0,       
                        0, 1, 0, 0, 0, 0, 1, 0,  
                        0, 0, 0, 1, 1, 0, 0, 0,  
                        0, 0, 1, 1, 1, 1, 0, 0,  
                        0, 0, 1, 1, 1, 1, 0, 0,  
                        0, 0, 0, 1, 1, 0, 0, 0,  
                        0, 1, 0, 0, 0, 0, 1, 0, 
                        0, 1, 1, 0, 0, 1, 1, 0, 
                        0, 0, 0, 0, 0, 0, 0, 0]
                         
        let mapWidth = this.canvas.width / this.wallsSize;
        for(let i = 0; i < this.maps[map].length; i++)
        {
            let yPos = 0;
            let xPos = 0;
            if(this.maps[map][i] != 0)
            {
                yPos = Math.floor(i / mapWidth);
                xPos = i - (yPos * mapWidth);
                /*if(this.player.x - this.wallsSize <= xPos)
                {
                    this.player.x = this.player.x + 50;
                }
                if(this.player.y - this.wallsSize <= yPos)
                {
                    this.player.y = this.player.y + 50;
                }*/
                /*console.log(i);
                console.log(xPos);
                console.log(yPos);*/
                wallPostition.push([this.wallsSize*xPos, this.wallsSize*yPos]);
            }
        }
        //let wallPostition = [[50,50], [50,410], [310,50], [310,410]];
        for(let j = 0; j < wallPostition.length; j++)
        {
            this.walls.push(new StrokedObject(wallPostition[j][0],  wallPostition[j][1], this.wallsSize, this.wallsSize, "#6bd26b", 5));
            //console.log(wallPostition[i][0]);
            //this.food = new StrokedObject(50, 50, 25, 25, "#6bd26b", 5);
        }
    }

    spawnEnemy()
    {
        this.enemies.push(new Enemy(50, 250, this.player, 0,"6bd26b", 15, 0, 2 * Math.PI, false, 1, 1, this.walls));
        this.enemies.push(new Enemy(350, 250, this.player, 0, "6bd26b", 15, 0, 2 * Math.PI, false, 1, 1, this.walls));
        this.enemies.push(new Enemy(200, 50, this.player, 1, "6bd26b", 15, 0, 2 * Math.PI, false, 0.5, 3, this.walls));
        this.enemies.push(new Enemy(200, 550, this.player, 1, "6bd26b", 15, 0, 2 * Math.PI, false, 0.5, 3, this.walls));
    }

    drawPoints(ctx) {
        ctx.fillStyle = "#6bd26b";
        ctx.font = "30px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(this.points, 200, 15);
    }

    gameOverScreen(ctx) {
        this.drawPoints(ctx);
        super.gameOverScreen(ctx);
    }

    findQuadrant(x, y, quadrantSice) {
        let xQuadr = Math.ceil(x / quadrantSice); // oder +1 da bei 0 anfängt
        let yQuadr = Math.ceil(y / quadrantSice);
        return [xQuadr, yQuadr];
    }

    static get NAME()
    {
        return "Covid";
    }
}
