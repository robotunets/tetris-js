export default class View {
    static colors = {
        '1': '#00FFFF',
        '2': '#1B5BD5',
        '3': '#FF740A',
        '4': '#FFF000',
        '5': '#16AA16',
        '6': '#BE00BE',
        '7': '#AF0000'
    };

    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.playfieldBorderWidth = 4;
        this.playfielX = this.playfieldBorderWidth;
        this.playfielY = this.playfieldBorderWidth;
        this.playfieldWidth = this.width * 2 / 3;
        this.playfieldHeight = this.height;
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldInnerHeight / rows;

        this.panelX = this.playfieldWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;

        this.element.appendChild(this.canvas);
    }

    renderMainScreen(state) {
        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state);
    }


    renderStartScreen() {
        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to Start', this.width / 2, this.height / 2);
    }

    renderPauseScreen() {
        this.context.fillStyle = 'rgba(0,0,0, 0.75)';
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to Start', this.width / 2, this.height / 2);
    }

    renderEndScreen({ score }) {
        this.clearScreen();

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('GameOver', this.width / 2, this.height / 2 - 48);
        this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
        this.context.fillText('Press ENTER to Restart', this.width / 2, this.height / 2 + 48);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    renderPlayfield({ playfield }) {
        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                const block = playfield[y][x];

                if (block) {
                    this.renderBlock(
                        this.playfielX + (x * this.blockWidth),
                        this.playfielY + (y * this.blockHeight),
                        this.blockWidth,
                        this.blockHeight,
                        View.colors[block]
                    );
                }
            }
        }

        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.playfieldBorderWidth;
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
    }

    renderPanel({ level, score, lines, nextPiece }) {
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '14px "Press Start 2P"';

        this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 0);
        this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 24);
        this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
        this.context.fillText('Next:', this.panelX, this.panelY + 96);

        for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];

                if (block) {
                    this.renderBlock(
                        this.panelX + (x * this.blockWidth * 0.5),
                        this.panelY + 100 + (y * this.blockHeight * 0.5),
                        this.blockWidth * 0.5,
                        this.blockHeight * 0.5,
                        View.colors[block]
                    );
                }
            }
        }
    }

    renderBlock(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.strokeStyle = '#0B0836';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height);
        this.context.strokeRect(x, y, width, height);

    }
}