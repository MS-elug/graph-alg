import "./index.css";
import { Tileset } from "./Tileset";

window.addEventListener("load", () => {

    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const tileset = new Tileset();
    tileset.loadImage()
        .then(() => {
            const map = [
                ["S", " ", " ", " ", " ", " "],
                ["X", "X", "X", "X", " ", " "],
                [" ", " ", " ", " ", " ", " "],
                [" ", "X", " ", "X", "X", " "],
                [" ", "E", " ", " ", " ", " "],
            ];

            ctx.canvas.width = map[0].length * Tileset.TILE_SIZE;
            ctx.canvas.height = map.length * Tileset.TILE_SIZE;

            map.forEach((row, rowIndex) => {
                row.forEach((cell, columnIndex) => {
                    let tileIndex = -1;
                    const tile = cell;
                    switch (tile) {
                        case " ":
                        case "S":
                        case "E":
                            tileIndex = 10;
                            break;
                        case "X":
                            tileIndex = 2;
                            break;
                    }
                    tileset.drawTile(ctx, columnIndex, rowIndex, tileIndex);
                });
            });

        });
});
