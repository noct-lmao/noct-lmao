import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.181.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.181.1/examples/jsm/controls/OrbitControls.js";

const canvas = document.getElementById("webgl");

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambient);

const box = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({ color: 0x7936C9 })
);
scene.add(box);

box.position.set(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = false;

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function toggleDebug() {
  document.getElementById("html-content").classList.toggle("debug-hide");
}

window.addEventListener("keydown", (e) => {
  if (e.key === "d") {
    toggleDebug();
  }
});
