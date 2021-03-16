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

    this.regX = 30
    this.regY = 30

    window.shape = this


    this.x = this.row * 60
    this.y = this.column * 60



    this.game.stage.addChild(this)
    this.grid.on('pipeChanged', this.refreshPipe, this)
}

remove(pipeToRemove) {
    this.grid.off('pipeChanged', this.refreshPipe, this)
    // console.log(pipeToRemove)
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
        this.drawPipe(this.graphics, pipeCode)
        this.angle = this.getPipeAngle(pipeCode)
    }

    getPipeAngle(code){
        return 30
    }


    drawPipe(graphics, code){

        graphics
            .clear()
            .beginStroke('black')
            .setStrokeStyle(4)


        console.log(code)

        switch (code.length) {
            case 1:
                graphics
                    .moveTo(-30, 0)
                    .lineTo(30, 0)

                return
            case 2:





                return
            case 3:
                console.log('trojnik')
                return
            default:
                console.log(this.x,this.y)


                this.graphics.arc( 30,  30, 30, 0,  Math.PI/2)
                    this.set({rotation:  90})



                return
        }
    }




// pipeShape(action , posX, posY, type = 'cross', site = 1) {
//
//
//     action === 'add'
//         ? this.graphics.beginStroke('black').setStrokeStyle(5)
//         : this.graphics.beginStroke('white').setStrokeStyle(6)
//
//     switch (type) {
//         case 'cross':
//             this.graphics
//                 .moveTo(posX + 29, posY)
//                 .lineTo(posX - 29, posY)
//                 .moveTo(posX, posY)
//                 .lineTo(posX, posY + 29)
//                 .moveTo(posX, posY)
//                 .lineTo(posX, posY - 29)
//             break
//         case 'vertical':
//             this.graphics

//             break
//         case 'horizontal':
//             this.graphics.moveTo(posX, posY)
//                 .lineTo(posX, posY + 30)
//                 .moveTo(posX, posY)
//                 .lineTo(posX, posY - 30)
//             break
//         case 'knee':
//             if ( site  === 1) {
//                 this.graphics.arc(posX - 30,  posY - 30, 30, 0 * Math.PI/180,  90 * Math.PI/180)
//             } else if (site  === 2) {
//                 this.graphics.arc(posX + 30,  posY - 30, 30, 90 * Math.PI/180,  180 * Math.PI/180)
//             } else if (site  === 3) {
//                 this.graphics.arc(posX + 30,  posY + 30, 30, 180 * Math.PI/180,  270 * Math.PI/180)
//             } else {
//                 this.graphics.arc(posX - 30,  posY + 30, 30, 270 * Math.PI/180,  360 * Math.PI/180)
//             }
//             break
//     }
// }



}