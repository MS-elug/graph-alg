
// Use https://webpack.js.org/loaders/url-loader/ instead
const tileSet = require("./assets/tileset.png");

export class Tileset {
    public static readonly TILE_SIZE: number = 32;
    private width: number;
    private height: number;
    private readonly image: HTMLImageElement;
    constructor() {
        this.image = new Image();
    }

    public loadImage(): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (err: Error) => void) => {
            this.image.addEventListener("load", () => {
                if (!this.image.complete) {
                    reject(new Error("Can't load tileset: \"" + tileSet + "\"."));
                }
                this.width = this.image.width / Tileset.TILE_SIZE;
                this.height = this.image.height / Tileset.TILE_SIZE;
                resolve();
            }, false);

            this.image.src = tileSet;
        });
    }

    /**
     *
     *
     * @param {CanvasRenderingContext2D} context
     * @param {number} x
     * @param {number} y
     * @param {number} tileIndex
     * @memberof Tileset
     */
    public drawTile(context: CanvasRenderingContext2D, x: number, y: number, tileIndex: number) {
        let xIndexSource = tileIndex % this.width;
        if (xIndexSource === 0) { xIndexSource = this.width; }
        const yIndexSource = Math.ceil(tileIndex / this.width);

        const xSource = (xIndexSource - 1) * Tileset.TILE_SIZE;
        const ySource = (yIndexSource - 1) * Tileset.TILE_SIZE;

        context.drawImage(this.image, xSource, ySource, Tileset.TILE_SIZE, Tileset.TILE_SIZE, x * Tileset.TILE_SIZE, y * Tileset.TILE_SIZE, Tileset.TILE_SIZE, Tileset.TILE_SIZE);

    }
}
