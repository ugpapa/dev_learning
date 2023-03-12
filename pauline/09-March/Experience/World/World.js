import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Room from "./Room.js";
import Person from './Person.js'
import Item from "./Item.js";
import objectSettings from "../constant.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.room = new Room();
      this.women1Painting = new Item(this.resources.items.women1Painting, objectSettings.women1);
      this.women2Painting = new Item(this.resources.items.women2Painting, objectSettings.women2);
      this.women3Painting = new Item(this.resources.items.women3Painting, objectSettings.women3);
      this.foldingScreen = new Item(this.resources.items.foldingScreen, objectSettings.foldingScreen);
      this.food = new Item(this.resources.items.food, objectSettings.food);
      this.person = new Person();
      this.environment = new Environment();
    });
  }
}
