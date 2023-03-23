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
        this.resources.items.food,
      ];
      let nextAnimation = 0;
      this.itemArr = items.map((_, i) => {
        this.item = new Item(items[i], objectSettings[i], nextAnimation);
        return this.item;
      });
      var i = 0;
      this.setMovingObjects(i);

      // itemArr.push(new Person());

      this.environment = new Environment();
    });
  }

  setMovingObjects(i) {
    setTimeout(() => {
      this.itemArr[i].setMovement();
      i++;
      if (i < 5) {
        this.setMovingObjects(i);
      } else {
        this.experience.isManual = true;
      }
    }, 2000);
  }
}
