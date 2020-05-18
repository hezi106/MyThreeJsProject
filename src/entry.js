import { WebGLRenderer, PerspectiveCamera, Scene , GridHelper } from 'three';
import Gizmo from './objects/Gizmo.js';
import {GREY} from './constants'

const scene = new Scene();
const camera = new PerspectiveCamera( 50, window.innerWidth / window.innerHeigh, 0.01, 30000 );
const renderer = new WebGLRenderer({antialias: true});
const gizmo = new Gizmo(scene , camera , renderer);

// scene
scene.add(gizmo);
scene.add( new GridHelper( 100, 100 ) );

// camera
camera.position.set( 20, 5, 20 );
camera.lookAt(0, 0, 0 );

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(GREY , 1);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  gizmo.update && gizmo.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);


// resize
const windowResizeHandler = () => { 
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};



windowResizeHandler();
window.addEventListener('resize', windowResizeHandler);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );

