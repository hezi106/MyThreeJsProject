import { Group , MeshBasicMaterial , DoubleSide , Color } from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BLUE } from '../../constants';

export default class Arm extends Group {

  constructor(scene , camera , renderer) {
    const loader = new FBXLoader();
    
    super();

    loader.load('assets/arm_rig.fbx', (mesh) => {
      mesh.rotation.z = 0.5 * Math.PI;

      const skeleton = mesh.getObjectByName("armMesh_geo");
      skeleton.material = new MeshBasicMaterial({color : BLUE});
      skeleton.material.needsUpdate = true;
      skeleton.material.skinning = true;
      const joint = mesh.getObjectByName("elbow_jnt");

      const orbit = new OrbitControls( camera, renderer.domElement );
      orbit.update();
      orbit.addEventListener( 'change', render );

      const control = new TransformControls( camera, renderer.domElement );
      control.addEventListener( 'change', render );
      control.addEventListener( 'dragging-changed', function ( event ) {
        orbit.enabled = ! event.value;
      } );

      control.attach( joint );
      control.setMode("rotate")
      scene.add( control );
      this.add(mesh);
    });

    function render() {

      renderer.render( scene, camera );
    
    }
  }
}


