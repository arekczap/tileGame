import Preload from '../Preload'

const createjs = window.createjs

const neighborPositions = [
    { site: 'w', row: -1, column: 0 },
    { site: 'n', row: 0, column: -1 },
    { site: 'e', row: 1, column: 0 },
    { site: 's', row: 0, column: 1 },
]

export default class Pipe extends createjs.Shape {
constructor(grid,row,column,code) {
    super()
    this.game = grid.game
    this.grid = grid

    this.row = row
    this.column = column
    this.code = code
    this.x = this.row * 60 + 30
    this.y = this.column * 60 + 30


    this.game.stage.addChild(this)

    this.grid.on('pipeChanged', this.refreshPipe, this)


}


    removePipe() {
        this.grid.off('pipeChanged', this.refreshPipe, this)
        this.graphics
            .clear()
    }
    checkNeighbors() {
        return neighborPositions.reduce((code, {site, row, column}) => {
            const neighborCode = (this.row + row) + 'x' + (this.column + column)
            if (this.grid.data[neighborCode]) {
                code += site
            }
            return code
        }, '')
    }

    refreshPipe(){
        const pipeCode = this.checkNeighbors()
        this.angle = this.getPipeAngle(pipeCode)
        this.drawPipe(this.graphics, pipeCode)
    }

    getPipeAngle(code){
        switch (code) {
            case 'wn':
                return 0
            case 'ne':
            case 'ns':
            case 'n':
            case 's':
            case 'wns':
                return 90
            case 'w':
            case 'es':
            case 'wne':
                return  180
            case 'ws':
            case 'nes':
                return 270
            default:
                return 0
        }
    }

    drawPipe(graphics, code){
        graphics
            .clear()
            .beginStroke('black')
            .setStrokeStyle(4)

        if(!code) code = 'wnes'
        if(code ==='n' || code === 's') code = 'ns'
        if(code === 'w' || code === 'e') code = 'we'

        this.set({rotation: this.angle})

        switch (code) {
            case 'wes':
            case 'nes':
            case 'wns':
            case 'wne':
                this.drawTee()
                return
            case 'es':
            case 'ne':
            case 'wn':
            case 'ws':
                this.drawElbow()
                return
            case 'we':
            case 'ns':
                this.drawLine()
                return
            case 'wnes':
                this.drawCross()
                // this.addPipeImage('cross')
                return
        }
    }

    drawCross() {
        this.graphics
            .moveTo(-30, 0)
            .lineTo(30, 0)
            .moveTo(0, -30)
            .lineTo(0, 30)
    }
    drawLine() {
        this.graphics
            .moveTo(-30, 0)
            .lineTo(30, 0)
    }
    drawElbow() {
        this.graphics
            .arc( -30,  -30, 30, 0,  Math.PI/2)
    }
    drawTee() {
        this.graphics
            .moveTo(-30, 0)
            .lineTo(30, 0)
            .moveTo(0, 0)
            .lineTo(0, 30)
    }

}