import { GameTemplate } from "./GameTemplate.js"
import { GameObject, MovableGameObject, Ball, Mode } from "../GameObject.js";
import { Pong, Paddle } from "../games/Pong.js";

export class FallingStones extends GameTemplate {

    start() 
    {
        this.gameOver = false;
        //this.playerSpeed = 5;
        //ctx.canvas.hight 
        this.player = new Paddle(175, 440, 50, 50, 8); //border collision
        //this.player = new Ball(200, 450, 50, 50, "#6bd26b", 8, 0);
        this.bullets = [];
        this.stones = [];
        this.points = 0;
        this.lives = 5;
        this.spawnIntervalStones = 0;
        this.spawnIntervalBullets = 0;
    }

    bindControls() 
    {
        this.inputBinding = {
            "left" : this.player.left.bind(this.player), 
            "right" : this.player.right.bind(this.player), 
            "up" : this.shoot.bind(this),
        };
    }

    update(ctx) // einmal pro frame
    {
        this.player.update(ctx);
        this.checkBullets(ctx);
        this.checkStones(ctx);
        ctx.font = "30px Verdana";
        //ctx.fillStyle = "#000000";
        ctx.fillText(this.lives, this.player.x, this.player.y);
        if(this.lives === 0)
        {
            this.gameOver = true;
        }
    }

    draw(ctx) 
    {
        this.player.draw(ctx);
        this.bullets.forEach(bullets => bullets.draw(ctx));
        this.stones.forEach(stones => stones.draw(ctx));
        this.drawPoints(ctx);
    }

    shoot()
    {
        if(this.spawnIntervalBullets > 10)
        {
            this.bullets.push(new Ball(this.player.x, this.player.y, 20, 20, "#6bd26b", 0, -8));
            this.spawnIntervalBullets = 0;
        }
    }

    checkBullets(ctx)
    {
        if(this.spawnIntervalBullets <= 10)
        {
            this.spawnIntervalBullets = this.spawnIntervalBullets + 1;
        }
        for(let i = 0; i < this.bullets.length; i++) // for each bessser weil sonst abfrage auf bereits gelöschte elemente
        {
            this.bullets[i].update(ctx);
            if(this.bullets[i].y < 0)
            {
                this.bullets.splice(i, 1);
            }
            for(let j = 0; j < this.stones.length; j++)
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
                this.lives = this.lives - 1;
            }
        }
        if(this.spawnIntervalStones > 30)
        {
            this.stones.push(new Ball((Math.random()*300)+25, 0, 50, 100, "#6bd26b", 0, 6));
            this.spawnIntervalStones = 0;
        }
        else
        {
            this.spawnIntervalStones = this.spawnIntervalStones + 1;
        }
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

    static get NAME()
    {
        return "Falling Stones";
    }
}
