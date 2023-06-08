class projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, angle) {
        super(scene, x, y, texture)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.onOverlap = true;
        this.body.isCircle = true;
        this.scene = scene;
        this.body.drag = 0;
        this.body.setVelocity(Math.cos(angle * Math.PI / 180) * 20,  Math.sin(angle * Math.PI / 180)*20)
    }
    update() {
        if(this.y > game.config.height + this.body.height / 2){
            this.destroy();
        }

    }
}