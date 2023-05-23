class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        //congrats message
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "You Have Journeyed Through Oz", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, "You have completed the game!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.5 - borderUISize - borderPadding, "Press SPACE to return to the Menu", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1 - borderUISize - borderPadding, "Press the UP arrow for Credits.", menuConfig).setOrigin(0.5);

          
        //input for moving to next scene
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
         //moving to next scene...
         if(this.cursors.space.isDown){
            this.scene.start('menuScene');
        }
        //credits
        if(this.cursors.up.isDown){
            this.scene.start('creditScene');
        }
        
    }
}