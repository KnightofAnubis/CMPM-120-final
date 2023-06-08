class UI extends Phaser.Scene {
    // code developed from https://youtu.be/HSP7xwacX7c
    constructor()
    {
        super("UIScene");
    }
   
    create(){
        let textConfig = {
            fontFamily: "Georgia",
            fontSize: '28px',
            //backgroundColor: '#008080',
            color: '#FC4C4E',
            opacity: 0.5,
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //Ui score for munchkin scene
        this.add.rectangle(game.config.width/20, game.config.height/12, game.config.width*2, 35, 0xF699CD, 0.5).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/12, "Those flowers look interesting...", textConfig).setOrigin(0.5);
        this.scoreText = this.add.text(game.config.width/20, game.config.height/12, score, textConfig).setOrigin(0.5);
        //this.scoreText.setScrollFactor(0,0);
       
        sceneEvents.on('collectFlowers', () => {
            score += 1;
            console.log(score);
        });
    }
    update(){
        this.scoreText.text = score;
    }
}