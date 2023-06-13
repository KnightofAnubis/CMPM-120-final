class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        menuConfig.fontSize = '28px',
    
        menuConfig.color = '#706553',
        //congrats message
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, "You Have Journeyed Through Oz", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, "You have completed the game!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.3 - borderUISize - borderPadding, "You found " + score + " Munchkins!", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.8 - borderUISize - borderPadding, "Press SPACE to return to the Menu", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1 - borderUISize - borderPadding, "Press the C arrow for Credits.", menuConfig).setOrigin(0.5);

          
        //input for moving to next scene
        this.cursors = this.input.keyboard.createCursorKeys();
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
         //moving to next scene...
         if(this.cursors.space.isDown){
            this.scene.start('menuScene');
        }
        //credits
        if(keyC.isDown){
            this.scene.start('creditScene');
        }

        
    }
}