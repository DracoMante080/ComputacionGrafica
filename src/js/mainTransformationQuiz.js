import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f9fa);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

const house = new THREE.Group();

const base = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
base.position.y = 1.25;
house.add(base);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3, 2, 4),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
roof.position.y = 3.5;
roof.rotation.y = Math.PI / 4;
house.add(roof);

const door = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 1.5, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x000000 })
);
door.position.set(0, 0.75, 2.05);
house.add(door);

const windowGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.1);
const windowMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
window1.position.set(-1.2, 1.5, 2.05);

const window2 = window1.clone();
window2.position.x = 1.2;

house.add(window1, window2);

scene.add(house);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(6, 5, 8);
camera.lookAt(0, 1, 0);

function animate(time) {

  house.rotation.y = time / 2000;

  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

const size = 20;
const divisions = 20;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}