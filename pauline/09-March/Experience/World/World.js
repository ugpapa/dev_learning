import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Room from "./Room.js";
import Person from "./Person.js";
import Item from "./Item.js";
import { objectSettings } from "../constant.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.room = new Room();
      const items = [
        this.resources.items.women1Painting,
        this.resources.items.women2Painting,
        this.resources.items.women3Painting,
        this.resources.items.foldingScreen,
        this.resources.items.food
      ];
      // let nextAnimation = 0;
      const itemArr = items.map((_, i)=>{
        this.item = new Item(items[i], objectSettings[i]);
        // this.item.on('next',()=>{
        //   console.log(nextAnimation);
        // })
        return this.item;
      });
      itemArr.push(new Person());
    

      this.environment = new Environment();
    });
  }
}
