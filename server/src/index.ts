import "./index.css";
import { Tileset } from "./Tileset";

window.addEventListener("load", () => {

    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const tileset = new Tileset();
    tileset.drawTile(ctx, 0, 0, 1);
});
