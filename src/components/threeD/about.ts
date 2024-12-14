import * as THREE from "three";

const screen = document.getElementById("screen")!;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfffffff);
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(300, 300);
screen.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
