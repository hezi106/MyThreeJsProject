import { Group } from 'three';
import Cube from './Cube/Cube.js';
import Arm from './Arm/Arm.js';


export default class SeedScene extends Group {
  constructor(scene , camera , renderer) {
    super();

    const cube = new Cube();
    const arm = new Arm(scene , camera , renderer);
    
    this.add(cube);
    this.add(arm);
  }
}