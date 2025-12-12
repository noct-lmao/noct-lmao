import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById("webgl");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// 光源
const light = new THREE.DirectionalLight(0xffffff, 2); // 明るめ
light.position.set(3, 3, 3);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 1.0));

// 光沢立方体
const box = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({
    color: 0x4AEBF0,
    metalness: 1.0,  // 金属感
    roughness: 0.5   // ツヤツヤ
  })
);
scene.add(box);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = false;

// Dキーで HTML UI を非表示/表示
window.addEventListener("keydown", (e) => {
  if(e.key.toLowerCase() === "d") {
    const html = document.getElementById("html-content");
    html.style.display = html.style.display === "none" ? "block" : "none";
  }
});

// アニメーション
function animate() {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// リサイズ対応
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});
