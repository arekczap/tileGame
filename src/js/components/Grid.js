const createjs = window.createjs

export default class Grid extends createjs.Shape {
  constructor(game) {
    super()

    this.game = game
    this.distanceX = 60
    this.distanceY = 60
    this.clickedTiles = {}
    this.centerOfClickedTile = {x : 0, y: 0}
    this.prevClickedTile =  {x: 0, y: 0, key : ''}

    this.prepareGrid()
    this.game.stage.on('stagemousedown', this.clickedGrille, this)
  }

  prepareGrid = () => {
    this.graphics
        .beginStroke('black')
        .setStrokeStyle(2)

    for (let i = 1; i < 10; i++) {
      this.graphics
          .moveTo(0, i * this.distanceX)
          .lineTo(this.game.canvas.width, i * this.distanceX)
    }

    for (let j = 1; j < 10; j++) {
      this.graphics
          .moveTo(j * this.distanceY, 0)
          .lineTo(j * this.distanceY, this.game.canvas.width)
    }

  }

  generateNeighbors(tile) {
    let splittedXArray = tile.split('x')
    return {
      left: `${splittedXArray[0] - 1}x${splittedXArray[1]}`,
      right: `${parseInt(splittedXArray[0]) + 1}x${splittedXArray[1]}`,
      top: `${splittedXArray[0]}x${splittedXArray[1] - 1}`,
      down: `${splittedXArray[0]}x${parseInt(splittedXArray[1]) + 1}`
    }
  }

  removePrevTile() {
    this.game.pipe.pipeShape('remove',this.prevClickedTile.x, this.prevClickedTile.y)
  }

  addPrevPipe(type, site = 1) {
    this.game.pipe.pipeShape('add' ,this.prevClickedTile.x, this.prevClickedTile.y, type, site)
  }


  checkNeighbor(prevTile) {
    let neighbors = this.generateNeighbors(prevTile)
    this.removePrevTile()

    if (this.clickedTiles[neighbors.right] === true && this.clickedTiles[neighbors.top] === true) {
      this.addPrevPipe('knee', 2)
    } else if (this.clickedTiles[neighbors.left] === true && this.clickedTiles[neighbors.top] === true) {

      this.addPrevPipe('knee', 1)
    } else if (this.clickedTiles[neighbors.right] === true && this.clickedTiles[neighbors.down] === true) {

      this.addPrevPipe('knee', 3)
    } else if (this.clickedTiles[neighbors.left] === true && this.clickedTiles[neighbors.down] === true) {

      this.addPrevPipe('knee', 4)
    } else if (this.clickedTiles[neighbors.left] === true) {

      this.addPrevPipe('vertical')
    } else if (this.clickedTiles[neighbors.right] === true) {

      this.addPrevPipe('vertical')
    } else if (this.clickedTiles[neighbors.down] === true) {

      this.addPrevPipe('horizontal')
    } else if (this.clickedTiles[neighbors.top] === true) {

      this.addPrevPipe('horizontal')
    }





    console.log(this.clickedTiles)
    console.log(this.clickedTiles[neighbors.left], this.clickedTiles[neighbors.right], this.clickedTiles[neighbors.top], this.clickedTiles[neighbors.down])

  }

  pushColumnAndRowToObject(key) {

    //jeżeli nie ma rury to dodaj  lub dodaj po wczesniejszym usunięciu
    if (this.clickedTiles[key] === undefined || this.clickedTiles[key] === false) {
      this.clickedTiles[key] = true
    }

    //dodanie czwornika czwornika
    this.game.pipe.pipeShape('add',this.centerOfClickedTile.x, this.centerOfClickedTile.y)

    //sprawdzenie sąsiada okreslonej kratki
    this.checkNeighbor(this.prevClickedTile.key)

  }

  checkIfTileIsClicked(key) {
    if (this.clickedTiles[key] === true ) {
      this.clickedTiles[key] = false

      // this.game.pipe.pipeShape('remove',this.centerOfClickedTile.x, this.centerOfClickedTile.y)
    }
  }

  clickedGrille(evt) {
    let startXElem = 0
    let startYElem = 0
    const endXElem = 60
    let column = 0
    let row = 0

    for (let i = 1 ; i < 11; i++) {
      if ( evt.stageX > startXElem * i && evt.stageX < endXElem * i) {
        column = i
        startXElem += endXElem
        this.centerOfClickedTile.x = startXElem * i - endXElem / 2
      }
      if (evt.stageY > startYElem * i && evt.stageY < endXElem * i){
        row = i
        startYElem += endXElem
        this.centerOfClickedTile.y = startYElem * i - endXElem / 2
      }
    }
    const generateKey = `${column}x${row}`


    //dodawanie nowej rury
    this.clickedTiles[generateKey]
        ? this.checkIfTileIsClicked(generateKey)
        : this.pushColumnAndRowToObject(generateKey)


    this.prevClickedTile.x = this.centerOfClickedTile.x
    this.prevClickedTile.y = this.centerOfClickedTile.y
    this.prevClickedTile.key = generateKey
  }



}