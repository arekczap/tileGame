import EventEmitter from 'eventemitter3'
import Pipe from './Pipe'
import Preload from '../Preload'
const createjs = window.createjs

export default class Grid extends EventEmitter{
  constructor(game) {
    super()

    this.game = game
    this.distanceX = 60
    this.distanceY = 60

    this.data = {}
    this.pipes = {}

    this.grid = this.makeGrid()
    this.game.stage.addChild(this.grid)

    this.game.stage.on('stagemousedown', this.clickedGrille, this)
  }

  makeGrid() {
    const grid = new createjs.Shape()

    grid.graphics
        .beginStroke('black')
        .setStrokeStyle(2)

    for (let i = 1; i < 10; i++) {
      grid.graphics
          .moveTo(0, i * this.distanceX)
          .lineTo(this.game.canvas.width, i * this.distanceX)
    }

    for (let j = 1; j < 10; j++) {
      grid.graphics
          .moveTo(j * this.distanceY, 0)
          .lineTo(j * this.distanceY, this.game.canvas.width)
    }
    return grid
  }

  clickedGrille(evt) {
    this.column = Math.floor(evt.stageY / this.distanceY)
    this.row = Math.floor(evt.stageX / this.distanceX)
    const code = `${this.row}x${this.column}`

    if (this.data[code]) {
      delete this.data[code]
      this.pipes[code].removePipe()
      delete this.pipes[code]
    } else {
      this.data[code] = true
      this.pipes[code] = new Pipe(this, this.row, this.column, code)
    }
    this.emit('pipeChanged')
  }



}