import { GameEngine } from "./GameEngine.js";
import { SkinChanger } from "./SkinChanger.js";

window.gameEngine = new GameEngine(
    document.querySelector(".controls"), 
    document.querySelector(".screen"),
    document.querySelector(".menu"));


let skinStyle = document.querySelector("#skin"),
    skins = ["futur", "gold","peach","basic","win95", "mech"];

window.skinChanger = new SkinChanger(skinStyle, skins, "../css/");

document.querySelector(".next").addEventListener("click", () => skinChanger.next());
document.querySelector(".previous").addEventListener("click", () => skinChanger.previous());

skinChanger.activeSkin = "futur";