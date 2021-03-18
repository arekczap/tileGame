const createjs = window.createjs

export default class Preload extends createjs.LoadQueue{
    constructor(game) {
        super(true, null, true)
        this.game = game
        this.installPlugin(createjs.Sound)
        this.setMaxConnections(16)
        this.on('complete', this.handleComplete, this)
        // this.on('fileload', this.handleFileLoad, this)

        this.loadManifest([
            {id: 'cross', src:'./assets/cross.png', type: createjs.Types.IMAGE},
            {id: 'knee', src:'./assets/knee.png', type: createjs.Types.IMAGE},
            {id: 'line', src:'./assets/line.png', type: createjs.Types.IMAGE},
            {id: 'tee', src:'./assets/tee.png', type: createjs.Types.IMAGE},
        ])
    }

    handleFileLoad = evt => {
return
    }


    handleComplete() {
        this.game.buildGame()
    }



}