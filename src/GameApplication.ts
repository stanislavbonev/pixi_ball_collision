import * as PIXI from 'pixi.js';
import { Button } from './Button';
import { Button1 } from './Button1';
import { Button2 } from './Button2';

export class GameApplication extends PIXI.Application {


    public static STAGE_WIDTH: number = 800;
    public static STAGE_HEIGHT: number = 600;

    private static app: GameApplication;

    private mainContainer: PIXI.Container;

    private ball: PIXI.Sprite;
    private myTicker: PIXI.Ticker;
    private velocity_x: number = 1;
    private velocity_y: number = 1;
    private velocity: number = 3;
    private scaleVelocity: number = 0.05;

    private btn1Down: boolean = false;
    private btn2Down: boolean = false;

    private hitRight: boolean = false;
    private hitDown: boolean = false;

    constructor() {
        super(GameApplication.getAppOptions());
        this.init();
    }

    public static getApp(): GameApplication {
        return this.app;
    }

    private init() {



        GameApplication.app = this;
        this.mainContainer = new PIXI.Container();
        this.loader = new PIXI.Loader();
        this.loader.onComplete.add(this.onLoadComplete, this);



        window.onload = () => {
            this.myTicker = new PIXI.Ticker();
            this.myTicker.add(this.onTick, this);
            this.myTicker.start();

            const gameContainer: HTMLCanvasElement = document.getElementById("gameContainer") as HTMLCanvasElement;
            gameContainer.appendChild(this.view);
            this.stage.addChild(this.mainContainer);

            this.resizeCanvas();
            this.createBall();
            this.loadAssets();
            this.showText();
            this.createButton();
            this.createContainers();


            this.view.style.position = 'absolute';
            this.view.style.left = '50%';
            this.view.style.top = '50%';
            this.view.style.transform = 'translate3d( -50%, -50%, 0 )';
        };
    }

    private static getAppOptions() {
        return {
            backgroundColor: 0x989c99,
            width: GameApplication.STAGE_WIDTH,
            height: GameApplication.STAGE_HEIGHT,
        }
    }

    private resizeCanvas(): void {
        this.onResize();

        window.addEventListener('resize', this.onResize);
    }

    private onResize() {
        this.renderer.resize(GameApplication.STAGE_WIDTH, GameApplication.STAGE_HEIGHT);
    }

    private createBall() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x00ff00);
        gfx.drawCircle(0, 0, 25);
        gfx.endFill();

        const texture: PIXI.Texture = this.renderer.generateTexture(gfx);

        this.ball = new PIXI.Sprite(texture);

        this.ball.x = 62;
        this.ball.y = 95;
        this.mainContainer.addChild(this.ball);

    }



    private createButton() {
        const btn1: Button1 = new Button1('Run');
        const btn2: Button2 = new Button2('Scale');

        btn1.getDispatcher().addListener('btn1up', this.onBtn1Up, this)
        btn1.getDispatcher().addListener('btn1down', this.onBtn1Down, this)
        btn2.getDispatcher().addListener('btn2up', this.onBtn2Up, this)
        btn2.getDispatcher().addListener('btn2down', this.onBtn2Down, this)

        btn1.x = 150;
        btn1.y = this.view.height - this.ball.height;
        btn2.x = 400;
        btn2.y = this.view.height - this.ball.height;

        this.mainContainer.addChild(btn1);
        this.mainContainer.addChild(btn2);

    }


    private onTick(delta: number) {

        // if (this.ball.x + this.velocity_x > this.view.width - this.ball.width || this.ball.x + this.velocity_x < 0) {
        //     this.velocity_x = -this.velocity_x;
        // }
        // if (this.ball.y + this.velocity_y > this.view.height - this.ball.width || this.ball.y + this.velocity_y < 0) {
        //     this.velocity_y = -this.velocity_y;
        // }

        // this.ball.x += this.velocity_x;
        // this.ball.y += this.velocity_y;

        if (this.btn1Down) {

            if (this.ball.x < this.view.width - this.ball.width && !this.hitRight) {
                this.ball.x += this.velocity;
            } else {
                //this.ball.x = this.view.width - this.ball.width;
                this.hitRight = true;
            }
            if (this.ball.x > 0 && this.hitRight) {
                this.ball.x -= this.velocity;
            } else {
                this.hitRight = false;
            }
            if (this.ball.y < this.view.height - this.ball.width && !this.hitDown) {
                this.ball.y += this.velocity;
            } else {
                this.hitDown = true;
            }
            if (this.ball.y > 0 && this.hitDown) {
                this.ball.y -= this.velocity;
            } else {
                this.hitDown = false;
            }
            console.log(`'x: '${this.ball.x} 'y: '${this.ball.y}`)


        }
        if (this.btn2Down) {
            const scale: number = this.ball.scale.x += this.scaleVelocity;
            this.ball.scale.set(scale);
        }
    }

    private onBtn1Up() {
        this.btn1Down = false;
    }

    private onBtn1Down() {
        this.btn1Down = true;

    }

    private onBtn2Up() {
        this.btn2Down = false;
        console.log('up')
    }

    private onBtn2Down() {
        this.btn2Down = true;
        console.log('down')

    }


    private loadAssets() {

    }

    private showText() {

    }

    private createContainers() {

    }


    private onLoadComplete() {

    }

}





