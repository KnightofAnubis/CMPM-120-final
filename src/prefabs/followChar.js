class followChar extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene
        //add to scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onOverlap = true;
        this.body.onCollide = true;
        this.body.setCollideWorldBounds(true);
        this.follow = null;
        //create anims
        const tags = this.anims.createFromAseprite(texture);
        this.isMotion = false;
        this.lastVelocityX = 0;
        this.lastVelocityY = 0;
        this.currentPress = keyW;
        this.lockMove = false;
        this.VEL = 100;
        
    }

    create() {}

    update() {
        //movement
        this.xDIFF = this.follow.x - this.x;
        this.yDIFF = this.follow.y - this.y;
        if(Math.abs(this.xDIFF) > Math.abs(this.yDIFF)){
            if(this.xDIFF > 0){
                this.body.setVelocity(this.VEL,0);
            }else{
                this.body.setVelocity(-this.VEL,0);
            }
        }else{
            if(this.yDIFF > 0){
                this.body.setVelocity(0,this.VEL);
            }else{
                this.body.setVelocity(0,-this.VEL);
            }
        }

        if(this.lastVelocityX != this.body.velocity.x || this.lastVelocityY != this.body.velocity.y){
            this.lastVelocityY = this.body.velocity.y;
            this.lastVelocityX = this.body.velocity.x;
            if(this.body.velocity.y > 0){
                this.anims.play({ key: 'charDOWN', repeat: -1 });
            }
            if(this.body.velocity.y < 0){
                this.anims.play({ key: 'charUP', repeat: -1 });
            }
            if(this.body.velocity.x > 0){
                this.anims.play({ key: 'charRIGHT', repeat: -1 });
            }
            if(this.body.velocity.x < 0){
                this.anims.play({ key: 'charLEFT', repeat: -1 });
            }

        }


    }
}
