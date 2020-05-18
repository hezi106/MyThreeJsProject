import { Group  , MeshBasicMaterial , Color } from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import { RED } from '../../constants';

export default class Cube extends Group {
  constructor() {
    const loader = new FBXLoader();
    
    super();

    loader.load("./assets/cube_rig.fbx", (mesh)=>{
      mesh.rotation.z = 1*Math.PI;

      const cube = mesh.getObjectByName("cube_mesh_geo");
      cube.material = new MeshBasicMaterial({ color : RED})
      
      this.add(mesh);
    });
  }
}
