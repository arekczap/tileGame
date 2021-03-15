const createjs = window.createjs

export default class Pipe extends createjs.Shape {
constructor(game) {
    super()
    this.game = game




}
pipeShape(action , posX, posY, type = 'cross', site = 1) {
    // vertical - pionowa kreska
    // horizontal - pozioma kreska
    // knee - kolanko
    // site - ćwiartka
    //      1 | 2
    //     -------
    //      3 | 4

    action === 'add'
        ? this.graphics.beginStroke('black').setStrokeStyle(5)
        : this.graphics.beginStroke('white').setStrokeStyle(6)

    switch (type) {
        case 'cross':
            this.graphics
                .moveTo(posX + 29, posY)
                .lineTo(posX - 29, posY)
                .moveTo(posX, posY)
                .lineTo(posX, posY + 29)
                .moveTo(posX, posY)
                .lineTo(posX, posY - 29)
            break
        case 'vertical':
            this.graphics
                .moveTo(posX + 29, posY)
                .lineTo(posX - 29, posY)
            break
        case 'horizontal':
            this.graphics.moveTo(posX, posY)
                .lineTo(posX, posY + 30)
                .moveTo(posX, posY)
                .lineTo(posX, posY - 30)
            break
        case 'knee':
            if ( site  === 1) {
                this.graphics.arc(posX - 30,  posY - 30, 30, 0 * Math.PI/180,  90 * Math.PI/180)
            } else if (site  === 2) {
                this.graphics.arc(posX + 30,  posY - 30, 30, 90 * Math.PI/180,  180 * Math.PI/180)
            } else if (site  === 3) {
                this.graphics.arc(posX + 30,  posY + 30, 30, 180 * Math.PI/180,  270 * Math.PI/180)
            } else {
                this.graphics.arc(posX - 30,  posY + 30, 30, 270 * Math.PI/180,  360 * Math.PI/180)
            }
            break
    }
}

removePipe() {

}


}