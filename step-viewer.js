import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const OCCT_BASE =
  "https://cdn.jsdelivr.net/npm/occt-import-js@0.0.23/dist/";
const canvas = document.querySelector("#step-canvas");
const viewer = document.querySelector("#step-viewer");
const status = document.querySelector("#step-viewer-status");
const loading = document.querySelector("#step-loading");
const error = document.querySelector("#step-error");
const resetButton = document.querySelector("#step-reset");
const gltfLoader = new GLTFLoader();

let renderer;
let scene;
let camera;
let controls;
let modelRoot;
let viewerActive = false;
let occtPromise;
let currentProjectId = "";
let defaultCameraPosition = new THREE.Vector3(9, 7, 10);

function setStatus(message) {
  status.textContent = message;
}

function setLoading(isLoading) {
  loading.hidden = !isLoading;
}

function setError(message = "") {
  error.textContent = message;
  error.hidden = !message;
}

function loadScript(source) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${source}"]`);
    if (existing) {
      if (window.occtimportjs) resolve();
      else existing.addEventListener("load", resolve, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = source;
    script.onload = resolve;
    script.onerror = () => reject(new Error("The STEP parser could not be loaded."));
    document.head.appendChild(script);
  });
}

async function getOcct() {
  if (!occtPromise) {
    occtPromise = (async () => {
      await loadScript(`${OCCT_BASE}occt-import-js.js`);
      return window.occtimportjs({
        locateFile: (fileName) => `${OCCT_BASE}${fileName}`,
      });
    })();
  }
  return occtPromise;
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0xe8edf0, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe8edf0);

  camera = new THREE.PerspectiveCamera(34, 1, 0.01, 10000);
  camera.position.copy(defaultCameraPosition);

  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.65;
  controls.enablePan = true;
  controls.minDistance = 0.2;
  controls.maxDistance = 5000;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x71808a, 2.4));

  const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
  keyLight.position.set(7, 10, 8);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xf2c230, 1.1);
  fillLight.position.set(-8, 3, -5);
  scene.add(fillLight);

  modelRoot = new THREE.Group();
  scene.add(modelRoot);
  createDemoBoard();

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(viewer);
  animate();
}

function disposeObject(object) {
  object.traverse((child) => {
    child.geometry?.dispose();
    if (Array.isArray(child.material)) {
      child.material.forEach((material) => material.dispose());
    } else {
      child.material?.dispose();
    }
  });
}

function clearModel() {
  while (modelRoot.children.length) {
    const child = modelRoot.children[0];
    modelRoot.remove(child);
    disposeObject(child);
  }
  modelRoot.rotation.set(0, 0, 0);
  modelRoot.position.set(0, 0, 0);
  modelRoot.scale.set(1, 1, 1);
}

function addBox(group, size, position, material, radius = 0) {
  const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.radius = radius;
  group.add(mesh);
  return mesh;
}

function createDemoBoard() {
  clearModel();

  const group = new THREE.Group();
  const boardMaterial = new THREE.MeshStandardMaterial({
    color: 0x115fa7,
    roughness: 0.58,
    metalness: 0.08,
  });
  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0xf2c230,
    roughness: 0.45,
    metalness: 0.18,
  });
  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x20272b,
    roughness: 0.42,
    metalness: 0.24,
  });
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0xc8cdd0,
    roughness: 0.28,
    metalness: 0.78,
  });

  addBox(group, [7.2, 0.26, 4.2], [0, 0, 0], boardMaterial);
  addBox(group, [6.7, 0.08, 0.08], [0, 0.18, -1.75], edgeMaterial);
  addBox(group, [6.7, 0.08, 0.08], [0, 0.18, 1.75], edgeMaterial);
  addBox(group, [1.8, 0.42, 1.35], [0.65, 0.36, 0.1], darkMaterial);
  addBox(group, [1.2, 0.38, 0.8], [-2.1, 0.34, -0.85], darkMaterial);
  addBox(group, [1.45, 0.48, 0.9], [-1.9, 0.39, 1.05], metalMaterial);
  addBox(group, [0.72, 0.58, 0.72], [2.45, 0.44, -1.05], darkMaterial);
  addBox(group, [0.95, 0.7, 0.95], [2.35, 0.5, 1.02], metalMaterial);

  for (let index = 0; index < 9; index += 1) {
    const x = -2.7 + index * 0.68;
    addBox(group, [0.32, 0.16, 0.2], [x, 0.25, -1.45], metalMaterial);
  }

  modelRoot.add(group);
  fitCameraToModel();
  setStatus("Interactive 3D preview");
  setError();
}

function meshColor(colorValues) {
  if (!colorValues || colorValues.length < 3) return new THREE.Color(0x6e8390);
  const maximum = Math.max(colorValues[0], colorValues[1], colorValues[2]);
  const divisor = maximum > 1 ? 255 : 1;
  return new THREE.Color(
    colorValues[0] / divisor,
    colorValues[1] / divisor,
    colorValues[2] / divisor,
  );
}

function buildImportedModel(result) {
  clearModel();
  const imported = new THREE.Group();

  result.meshes.forEach((meshData) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(meshData.attributes.position.array, 3),
    );
    if (meshData.attributes.normal) {
      geometry.setAttribute(
        "normal",
        new THREE.Float32BufferAttribute(meshData.attributes.normal.array, 3),
      );
    } else {
      geometry.computeVertexNormals();
    }
    geometry.setIndex(meshData.index.array);

    const material = new THREE.MeshStandardMaterial({
      color: meshColor(meshData.color),
      roughness: 0.55,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    imported.add(mesh);

    if (geometry.attributes.position.count < 50000) {
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry, 35),
        new THREE.LineBasicMaterial({
          color: 0x162b3a,
          transparent: true,
          opacity: 0.14,
        }),
      );
      imported.add(edges);
    }
  });

  imported.rotation.x = -Math.PI / 2;
  modelRoot.add(imported);
  fitCameraToModel();
}

function fitCameraToModel() {
  modelRoot.updateMatrixWorld(true);
  const initialBox = new THREE.Box3().setFromObject(modelRoot);
  if (initialBox.isEmpty()) return;

  const center = initialBox.getCenter(new THREE.Vector3());
  modelRoot.position.sub(center);
  modelRoot.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(modelRoot);
  const size = box.getSize(new THREE.Vector3());
  const maximum = Math.max(size.x, size.y, size.z, 0.1);
  const distance = maximum * 1.35;

  defaultCameraPosition = new THREE.Vector3(distance, distance * 0.72, distance);
  camera.near = Math.max(maximum / 1000, 0.001);
  camera.far = Math.max(maximum * 100, 100);
  camera.updateProjectionMatrix();
  resetView();
}

function resetView() {
  camera.position.copy(defaultCameraPosition);
  controls.target.set(0, 0, 0);
  controls.autoRotate = true;
  controls.update();
}

async function loadStepBuffer(buffer, label) {
  setLoading(true);
  setError();
  setStatus(`Loading ${label}`);

  try {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const occt = await getOcct();
    const result = occt.ReadStepFile(new Uint8Array(buffer), {
      linearUnit: "millimeter",
      linearDeflectionType: "bounding_box_ratio",
      linearDeflection: 0.001,
      angularDeflection: 0.35,
    });

    if (!result.success || !result.meshes?.length) {
      throw new Error("This STEP file did not contain readable mesh geometry.");
    }

    buildImportedModel(result);
    setStatus(`${label} | ${result.meshes.length} mesh${result.meshes.length === 1 ? "" : "es"}`);
  } catch (loadError) {
    createDemoBoard();
    setStatus("Interactive 3D preview");
    setError(loadError.message || "The STEP model could not be opened.");
  } finally {
    setLoading(false);
  }
}

async function loadStepUrl(url) {
  const fileName = url.split("/").pop() || "STEP model";
  setLoading(true);
  setError();
  setStatus(`Loading ${fileName}`);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`The configured STEP file returned ${response.status}.`);
    await loadStepBuffer(await response.arrayBuffer(), fileName);
  } catch (loadError) {
    createDemoBoard();
    setError(loadError.message || "The configured STEP model could not be opened.");
    setLoading(false);
  }
}

async function loadGlbUrl(url) {
  const fileName = url.split("/").pop() || "3D model";
  setLoading(true);
  setError();
  setStatus(`Loading ${fileName}`);

  try {
    const gltf = await gltfLoader.loadAsync(url);
    clearModel();
    gltf.scene.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
    });
    modelRoot.add(gltf.scene);
    fitCameraToModel();
    setStatus("Interactive 3D model");
  } catch (loadError) {
    createDemoBoard();
    setError(loadError.message || "The optimized 3D model could not be opened.");
  } finally {
    setLoading(false);
  }
}

function resize() {
  if (!renderer) return;
  const width = Math.max(viewer.clientWidth, 1);
  const height = Math.max(viewer.clientHeight, 1);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  if (!viewerActive) return;
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("portfolio:project-open", (event) => {
  viewerActive = true;
  resize();
  requestAnimationFrame(resize);

  const project = event.detail;
  if (!project) return;
  if (project.id === currentProjectId) {
    resetView();
    return;
  }

  currentProjectId = project.id;
  createDemoBoard();
  if (project.modelFile) {
    loadGlbUrl(project.modelFile);
  } else if (project.stepFile) {
    loadStepUrl(project.stepFile);
  } else {
    setStatus(`${project.title} | 3D model slot`);
  }
});

window.addEventListener("portfolio:project-close", () => {
  viewerActive = false;
});

resetButton.addEventListener("click", resetView);

try {
  createRenderer();
} catch (rendererError) {
  setStatus("3D preview unavailable");
  setError("WebGL is unavailable in this browser.");
}
