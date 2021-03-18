
const createjs = window.createjs

const neighborPositions = [
    { site: 'n', row: -1, column: 0 },
    { site: 'w', row: 0, column: -1 },
    { site: 's', row: 1, column: 0 },
    { site: 'e', row: 0, column: 1 },
]

export default class Pipe extends createjs.Shape {
constructor(grid,row,column,code) {
    super()
    this.game = grid.game
    this.grid = grid

    this.row = row
    this.column = column
    this.code = code

    // this.game.stage.addChild(this)
    this.grid.on('pipeChanged', this.refreshPipe, this)
}

    removePipe() {
        this.grid.off('pipeChanged', this.refreshPipe, this)

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

        this.drawPipe(pipeCode)
    }

    getPipeAngle(code){
        switch (code) {
            case 'wn':
                return 0
            case 'n':
            case 's':
            case 'wns':
            case 'ne':
            case 'we':
                return 90
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

    drawPipe(code){
        if(!code) code = 'wnes'
        if(code ==='n' || code === 's') code = 'ns'
        if(code === 'w' || code === 'e') code = 'we'

        console.log(this.column, this.row, code)
        switch (code) {
            case 'wes':
            case 'nes':
            case 'wns':
            case 'wne':
                this.addImage('tee')
                return
            case 'es':
            case 'ne':
            case 'wn':
            case 'ws':
                this.addImage('knee')
                return
            case 'we':
            case 'ns':
                this.addImage('line')
                return
            case 'wnes':
                this.addImage('cross')
                return

        }
    }

    addImage(name) {

        this.image = this.game.images[name].clone()

        this.image.set({
            // rotate: this.angle,
            x : this.column * 60 + 30,
            y : this.row * 60 + 30,
            regX: 30,
            regY: 30
        })

        this.game.stage.addChild(this.image)
        // this.game.stage.update()


    }
}