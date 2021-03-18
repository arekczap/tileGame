import EventEmmiter from 'eventemitter3'
import Grid from './components/Grid'
import Preload from './Preload'

const createjs = window.createjs

export default class Game extends EventEmmiter {
  constructor() {
    super()
    this.canvas = null
    this.stage = null
    this.prepareCanvas()
  }

  prepareCanvas() {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)

    this.canvas.width = 600
    this.canvas.height = 600

    Object.assign(this.canvas.style, {
      width: this.canvas.width + 'px',
      height: this.canvas.height + 'px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '3px solid black'
    })

    new Preload(this)
    this.stage = new createjs.Stage(this.canvas)

    this.stage.enableMouseOver()
    createjs.Touch.enable(this.stage)
    this.update()

  }

  buildGame() {
    this.grid = new Grid(this)

  }

  update = () => {
    this.stage.update()
    window.requestAnimationFrame(this.update)
  }
}
