export default class Game {
  score = 0;
  lines = 0;
  level = 0;
  playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  activePiace = {
    x: 0,
    y: 0,
    get blocks() {
      return this.rotations[this.rotationIndex];
    },
    blocks: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ]
  };

  movePieceLeft() {
    this.activePiace.x -= 1;

    if (this.hasCollision()) {
      this.activePiace.x += 1;
      this.lockPiece();
    }
  }

  movePieceRight() {
    this.activePiace.x += 1;

    if (this.hasCollision()) {
      this.activePiace.x -= 1;
      this.lockPiece();
    }
  }

  movePieceDown() {
    this.activePiace.y += 1;

    if (this.hasCollision()) {
      this.activePiace.y -= 1;
      this.lockPiece();
    }
  }

  rotatePiece() {
    this.rotateBlocks();

    if (this.hasCollision()) {
      this.rotateBlocks(false);
    }
  }

  rotateBlocks(clockwise = true) {
    const blocks = this.activePiace.blocks;
    const length = blocks.length;
    const x = Math.floor(length / 2);
    const y = length - 1;

    for (let i = 0; i < x; i++) {
      for (let j = i; j < y - i; j++) {
        const temp = blocks[i][j];

        if (clockwise) {
          blocks[i][j] = blocks[y - j][i];
          blocks[y - j][i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[j][y - i];
          blocks[j][y - i] = temp;
        } else {
          blocks[i][j] = blocks[j][y - i];
          blocks[j][y - i] = blocks[y - i][y - j];
          blocks[y - i][y - j] = blocks[y - j][i];
          blocks[y - j][i] = temp;
        }
      }
    }
  }

  hasCollision() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiace;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          blocks[y][x] &&
          ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) ||
            this.playfield[pieceY + y][pieceX + x])
        ) {
          return true;
        }
      }
    }

    return false;
  }

  lockPiece() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiace;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
  }
}
