import {
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
  WebGPUEngine,
} from "@babylonjs/core";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new WebGPUEngine(canvas);
await engine.initAsync();
const scene = new Scene(engine);
const camera = new ArcRotateCamera(
  "camera",
  Math.PI / 2,
  Math.PI / 4,
  10,
  Vector3.Zero(),
  scene,
);
camera.attachControl(canvas, true);

const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
light.intensity = 0.7;
const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
sphere.position.y = 1;
engine.runRenderLoop(() => {
  scene.render();
});
window.addEventListener("resize", () => {
  engine.resize();
});
