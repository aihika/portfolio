// ******************** Sizes ******************** //
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ******************** Scene ******************** //
const scene = new THREE.Scene();

//******************** Particles ******************** //
// Material
const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 2.5;
particlesMaterial.sizeAttenuation = true;

// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const countParticles = 4000;
const distance = 2000;

const positions = new Float32Array(countParticles * 3); // Multiply by 3 because each position is composed of 3 values (x, y, z)

for (
  let i = 0;
  i < countParticles * 3;
  i++ // Multiply by 3 for same reason
) {
  const randomAbsolute = 1 - Math.random() * Math.random();  // 大きい数字を多出させる乱数を生成
  const randomNumber = i % 2 === 0 ? randomAbsolute : randomAbsolute * -1;　// 生成した乱数をそれぞれ50%の確率で正負を付与

  positions[i] =
    // 3で割り切れる（X座標）には大きい数字を多出した乱数を使用
    i % 3 === 0 ? randomNumber * distance : (Math.random() - 0.5) * distance; // Math.random() - 0.5 to have a random value between -0.5 and +0.5
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
); // Create the Three.js BufferAttribute and specify that each information is composed of 3 values
const particles1 = new THREE.Points(particlesGeometry, particlesMaterial);
const particles2 = new THREE.Points(particlesGeometry, particlesMaterial);
particles2.rotation.y = Math.PI * 0.5;
scene.add(particles1, particles2);

// ******************** Meshes ******************** //

// Geometries
const planeGeometry = new THREE.PlaneBufferGeometry(60, 30, 20, 20);
const torusGeometry = new THREE.TorusBufferGeometry(300, 0.5, 16, 100);

// Materials
const materialBasic = new THREE.MeshBasicMaterial();
materialBasic.doubleSided = true;
materialBasic.transparent = true;
materialBasic.opacity = 0.4;

const materialNormal = new THREE.MeshNormalMaterial();
// materialNormal.wireframe = true;
materialNormal.transparent = true;
materialNormal.opacity = 0.8;


// Meshes

// Toruses
const toruses = [];

for (let i = 0; i < 12; i++) {
  toruses.push(new THREE.Mesh(torusGeometry, materialNormal));
}

const torusesGroups = [];
for (let i = 0; i < 3; i++) {
  torusesGroups.push(new THREE.Group());
}

const torusGroup = new THREE.Group();

torusesGroups[0].add(toruses[0], toruses[1], toruses[2], toruses[3]);
torusesGroups[1].add(toruses[4], toruses[5], toruses[6], toruses[7]);
torusesGroups[2].add(toruses[8], toruses[9], toruses[10], toruses[11]);
torusGroup.add(torusesGroups[0], torusesGroups[1], torusesGroups[2]);

toruses[1].rotation.y = Math.PI * 0.5;
toruses[2].rotation.y = Math.PI * 0.25;
toruses[3].rotation.y = -Math.PI * 0.25;

toruses[5].rotation.y = Math.PI * 0.5;
toruses[6].rotation.y = Math.PI * 0.25;
toruses[7].rotation.y = -Math.PI * 0.25;

toruses[9].rotation.y = Math.PI * 0.5;
toruses[10].rotation.y = Math.PI * 0.25;
toruses[11].rotation.y = -Math.PI * 0.25;

torusesGroups[0].rotation.x = Math.PI * 0.5;
torusesGroups[1].rotation.z = Math.PI * 0.5;

scene.add(torusGroup);


// ******************** Keyboard ******************** //
const heightOfGeometryKey = 0.2
const geometryKey = new THREE.BoxBufferGeometry(3, heightOfGeometryKey, 3);
geometryKey.translate(0, 0.1, 0); // 高さを足すときに正方向のみに足されるように、Y座標の基準点を変更

let count = ""; // keyの数
let margin = ""; // keyの余白

// 1st row
const keys1stRow = [];
margin = 0;
count = 12;
for (let i = 0; i <= count; i++) {
  // let hue = i * (360 / count)
  // let myColor = new THREE.Color("hsl(" + hue + ", 100%, 70%)");
  const materialKey = new THREE.MeshBasicMaterial({ color: 0xffffff });
  materialKey.transparent = true;
  materialKey.opacity = 0.5;

  keys1stRow.push(new THREE.Mesh(geometryKey, materialKey));

  // Position
  keys1stRow[i].position.x = -52 / 2 + i + margin;
  keys1stRow[i].position.z = -6;

  keys1stRow[i].rotation.y = Math.PI;
  margin += 3;

  scene.add(keys1stRow[i]);
}

// 2nd row
const keys2ndRow = [];
margin = 0;
count = 11;
for (let i = 0; i <= count; i++) {
  const materialKey = new THREE.MeshBasicMaterial({ color: 0xffffff });
  materialKey.transparent = true;
  materialKey.opacity = 0.5;

  keys2ndRow.push(new THREE.Mesh(geometryKey, materialKey));

  // Position
  keys2ndRow[i].position.x = -48 / 2 + i + margin;
  keys2ndRow[i].position.z = -2;

  keys2ndRow[i].rotation.y = Math.PI;
  margin += 3;

  scene.add(keys2ndRow[i]);
}

// 3rd row
const keys3rdRow = [];
margin = 0;
count = 11;
for (let i = 0; i <= count; i++) {
  const materialKey = new THREE.MeshBasicMaterial({ color: 0xffffff });
  materialKey.transparent = true;
  materialKey.opacity = 0.5;

  keys3rdRow.push(new THREE.Mesh(geometryKey, materialKey));

  // Position
  keys3rdRow[i].position.x = -44 / 2 + i + margin;
  keys3rdRow[i].position.z = 2;
  margin += 3;

  scene.add(keys3rdRow[i]);
}

// 4th row
const keys4thRow = [];
count = 10; // cubeの数
margin = 0;
for (let i = 0; i <= count; i++) {
  const materialKey = new THREE.MeshBasicMaterial({ color: 0xffffff });
  materialKey.transparent = true;
  materialKey.opacity = 0.5;

  keys4thRow.push(new THREE.Mesh(geometryKey, materialKey));

  // Position
  keys4thRow[i].position.x = -40 / 2 + i + margin;
  keys4thRow[i].position.z = 6;
  margin += 3;

  // Color
  scene.add(keys4thRow[i]);
}

const keyboard = {
  1: keys1stRow[0],
  2: keys1stRow[1],
  3: keys1stRow[2],
  4: keys1stRow[3],
  5: keys1stRow[4],
  6: keys1stRow[5],
  7: keys1stRow[6],
  8: keys1stRow[7],
  9: keys1stRow[8],
  0: keys1stRow[9],
  "-": keys1stRow[10],
  "^": keys1stRow[11],
  "¥": keys1stRow[12],
  q: keys2ndRow[0],
  w: keys2ndRow[1],
  e: keys2ndRow[2],
  r: keys2ndRow[3],
  t: keys2ndRow[4],
  y: keys2ndRow[5],
  u: keys2ndRow[6],
  i: keys2ndRow[7],
  o: keys2ndRow[8],
  p: keys2ndRow[9],
  "@": keys2ndRow[10],
  "[": keys2ndRow[11],
  a: keys3rdRow[0],
  s: keys3rdRow[1],
  d: keys3rdRow[2],
  f: keys3rdRow[3],
  g: keys3rdRow[4],
  h: keys3rdRow[5],
  j: keys3rdRow[6],
  k: keys3rdRow[7],
  l: keys3rdRow[8],
  ";": keys3rdRow[9],
  ":": keys3rdRow[10],
  "]": keys3rdRow[11],
  z: keys4thRow[0],
  x: keys4thRow[1],
  c: keys4thRow[2],
  v: keys4thRow[3],
  b: keys4thRow[4],
  n: keys4thRow[5],
  m: keys4thRow[6],
  ",": keys4thRow[7],
  ".": keys4thRow[8],
  "/": keys4thRow[9],
  _: keys4thRow[10],
};

// それぞれのキーのhueの値
const keyColor = {
  1: 285,
  2: 290.3,
  3: 295.6,
  4: 300.9,
  5: 306.2,
  6: 311.5,
  7: 316.8,
  8: 322.1,
  9: 327.4,
  0: 332.7,
  "-": 338,
  "^": 343.3,
  "¥": 348.6,
  q: 190,
  w: 195.8,
  e: 201.6,
  r: 207.4,
  t: 213.2,
  y: 219,
  u: 224.8,
  i: 230.6,
  o: 236.4,
  p: 242.2,
  "@": 248,
  "[": 253.8,
  a: 95,
  s: 100.8,
  d: 106.6,
  f: 112.4,
  g: 118.3,
  h: 124,
  j: 129.8,
  k: 135.6,
  l: 141.4,
  ";": 147.2,
  ":": 153,
  "]": 158.8,
  z: 0,
  x: 6.35,
  c: 6.35 * 2,
  v: 6.35 * 3,
  b: 6.35 * 4,
  n: 6.35 * 5,
  m: 6.35 * 6,
  ",": 6.35 * 7,
  ".": 6.35 * 8,
  "/": 6.35 * 9,
  _: 6.35 * 10,
};


// ******************** Camera ******************** //
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.y = 15;
camera.position.z = 20;
const initCameraPosition = function () {
  controls.reset();
}

// ******************** Renderer ******************** //
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000020, 1);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

// ******************** Controls ******************** //
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();
const rotateCamera = function () {
  if( isPlaying ) {
    controls.autoRotate = true; 
  } else {
    controls.autoRotate = false;
  }
} 

// ******************** Make clones ******************** //
const keys = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "^", "¥",
  "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "@", "[",
  "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", ":", "]",
  "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "_"
]

const keyMap = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  0: false,
  "-": false,
  "^": false,
  "¥": false,
  q: false,
  w: false,
  e: false,
  r: false,
  t: false,
  u: false,
  i: false,
  o: false,
  p: false,
  "@": false,
  "[": false,
  a: false,
  s: false,
  d: false,
  f: false,
  g: false,
  h: false,
  j: false,
  k: false,
  l: false,
  ";": false,
  ":": false,
  "]": false,
  z: false,
  x: false,
  c: false,
  v: false,
  b: false,
  n: false,
  m: false,
  ",": false,
  ".": false,
  "/": false,
  _: false,
};

const clones = {};
const removeClonesFromScene = function() {
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]

    if(clones[key].length) {
      // クローンのキーの中のmeshを全て取り除く
      for (let i = 0; i < clones[key].length; i++) {
        scene.remove(clones[key][i]);
      }
    }
  }
}
const emptyClones = function() {
  for (let i = 0; i < keys.length; i++) {
    clones[keys[i]] = [];
  }
 }
 emptyClones();




// meshのカラーを変更
const changeColor = function (mesh, hue) {
  mesh.material.color.setHSL(hue / 360, 1, 0.7);
};


// 生成下クローンのscaleをcloneScaleのキーに入れる
const getScale = function(key) {
  let scale = clones[key][clones[key].length - 1].scale.y; //生成されたクローンのscale.y
  cloneScale_down[key].push(scale);
  cloneScale_up[key].push(scale);
}

const createClone = function (key) {
  const material = new THREE.MeshBasicMaterial();
  const mesh = new THREE.Mesh(geometryKey, material)

  clones[key].push(mesh); //生成したクローンをclonesのキーに入れる
  clones[key][clones[key].length - 1].position.copy(keyboard[key].position); //生成されたクローンのポジションをキーのポジションを同じにする

  changeColor(clones[key][clones[key].length - 1], keyColor[key]); //生成したクローンをキーのhue情報に合わせて色を変更する
  scene.add(clones[key][clones[key].length - 1]); //生成したクローンをシーンに追加
  nowPlayingCount[key] += 1;
};




// ******************** Animation ******************** //

// 押し出し
const extrusionSpeed = 0.2;

const extrude = function () {
  for (let i = 0; i < keys.length; i++) {
    // あるキーが押されたら生成されたばかりクローンの高さを変更
    if (keyMap[keys[i]]) clones[keys[i]][clones[keys[i]].length - 1].scale.y += extrusionSpeed;
  }  
};


// 生成されたクローン以外のポジションを変更

let isPlaying = false;
let playingDownwards = false;
let playingUpwards = false;

let movingClones = false;
const startMovingClones = function () {
  movingClones = true;
};
const stopMovingClones = function () {
  if ( !keysPressedWhileMovingClones.length ) {
    movingClones = false;
    isPlaying = false;
  }
};

let areClonesMoving = false;

const moveClones = function () {
  areClonesMoving = true;
  let direction = playingDownwards === false? 1 : -1;
  const movementSpeed = extrusionSpeed * heightOfGeometryKey * direction;

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]; // iが以下のループで上書きされるので変数に入れる
    if (clones[key].length) {
      if (keyMap[key]) {
        for (let i = 0; i < clones[key].length - 1; i++) {
          clones[key][i].position.y += movementSpeed;
        }
      } else {
        for (let i = 0; i < clones[key].length; i++) {
          clones[key][i].position.y += movementSpeed;
        }
      }
    }
  } 
};





const cloneScale_down = {};
const emptyCloneScale_down = function() {
  for (let i = 0; i < keys.length; i++) {
    cloneScale_down[keys[i]] = [];
  }
}
emptyCloneScale_down();

const cloneScale_up = {};
const emptyCloneScale_up = function() {
  for (let i = 0; i < keys.length; i++) {
    cloneScale_up[keys[i]] = [];
  }
}
emptyCloneScale_up();


const clonePosition_down = {};
const emptyClonePosition_down = function () {
  for (let i = 0; i < keys.length; i++) {
    clonePosition_down[keys[i]] = [];
  }
}
emptyClonePosition_down();

const clonePosition_up = {};
const emptyClonePosition_up = function () {
  for (let i = 0; i < keys.length; i++) {
    clonePosition_up[keys[i]] = [];
  }
}
emptyClonePosition_up();

const nowPlayingCount = {};
const emptynowPlayingCount = function () {
  for (let i = 0; i < keys.length; i++) {
    nowPlayingCount[keys[i]] = 0;
  }
}
emptynowPlayingCount();


const willPlayKeyNote = {}
const initWillPlayKeyNote = function() {
  for (let i = 0; i < keys.length; i++) {
    willPlayKeyNote[keys[i]] = false;
  }
}
initWillPlayKeyNote();


const isPlayingKey = {};
const initIsPlayingKey = function() {
  for (let i = 0; i < keys.length; i++) {
    isPlayingKey[keys[i]] = false;
  }
}
initIsPlayingKey();


const keyNoteMap = {
  1: "C4",
  2: "D4",
  3: "E4",
  4: "F4",
  5: "G4",
  6: "A4",
  7: "B4",
  8: "C5",
  9: "D5",
  0: "E5",
  "-": "F5",
  "^": "G5",
  "¥": "A5",
  q: "C3",
  w: "D3",
  e: "E3",
  r: "F3",
  t: "G3",
  y: "A3",
  u: "B3",
  i: "C4",
  o: "D4",
  p: "E4",
  "@": "F4",
  "[": "G4",
  a: "C3",
  s: "D3",
  d: "E3",
  f: "F3",
  g: "G3",
  h: "A3",
  j: "B3",
  k: "C4",
  l: "D4",
  ";": "E4",
  ":": "F4",
  "]": "G4",
  z: "C4",
  x: "D4",
  c: "E4",
  v: "F4",
  b: "G4",
  n: "A4",
  m: "B4",
  ",": "C5",
  ".": "D5",
  "/": "E5",
  "_": "F5",
};

// const clonesOnZero = []


// const check = function(key) {
//   if(clonePosition_down[key][nowPlayingCount[key] - 1] < 0)  willPlayKeyNote[key] = true;
// }

const checkPosition_down = function(key) {
  if(clonePosition_down[key][nowPlayingCount[key] - 1] < 0)  willPlayKeyNote[key] = true;
}

const checkPosition_up = function(key) {
  let position = clonePosition_up[key][nowPlayingCount[key]] + cloneScale_up[key][nowPlayingCount[key]] * heightOfGeometryKey; // ノーマライズされているのを戻す
  if( position > 0 )  willPlayKeyNote[key] = true;
}

const countDuration = function(key) {
  if( playingDownwards ) {
    cloneScale_down[key][nowPlayingCount[key] - 1] -= extrusionSpeed; 
  }
  if( playingUpwards ) {
    cloneScale_up[key][nowPlayingCount[key]] -= extrusionSpeed;
  }
}

const stopPlayingKeyViolin = function(key) {
  if ( playingDownwards ) {
    if(cloneScale_down[key][nowPlayingCount[key] - 1] <= 0) {
      stopViolin(keyNoteMap[key]);
      willPlayKeyNote[key] = false;
      isPlayingKey[key] = false;
      if( playingDownwards) nowPlayingCount[key] -= 1;
    }
  }
  if ( playingUpwards ) {
    if(cloneScale_up[key][nowPlayingCount[key]] <= 0) {
      stopViolin(keyNoteMap[key]);
      willPlayKeyNote[key] = false;
      isPlayingKey[key] = false;
      if( playingUpwards ) nowPlayingCount[key] += 1;
    }
  }
}

const stopPlayingKeyCello = function(key) {
  if ( playingDownwards ) {
    if(cloneScale_down[key][nowPlayingCount[key] - 1] <= 0) {
      stopCello(keyNoteMap[key]);
      willPlayKeyNote[key] = false;
      isPlayingKey[key] = false;
      if( playingDownwards) nowPlayingCount[key] -= 1;
    }
  }
  if ( playingUpwards ) {
    if(cloneScale_up[key][nowPlayingCount[key]] <= 0) {
      stopCello(keyNoteMap[key]);
      willPlayKeyNote[key] = false;
      isPlayingKey[key] = false;
      if( playingUpwards ) nowPlayingCount[key] += 1;
    }
  }
}

const stopPlayingKeyPiano = function(key) {
  if ( playingDownwards ) {
    if(cloneScale_down[key][nowPlayingCount[key] - 1] <= 0) {
      stopPiano(keyNoteMap[key]);
      willPlayKeyNote[key] = false;
      isPlayingKey[key] = false;
      if( playingDownwards) nowPlayingCount[key] -= 1;
    }
  }
  if ( playingUpwards ) {
    if(cloneScale_up[key][nowPlayingCount[key]] <= 0) {
      stopPiano(keyNoteMap[key]);
      willPlayKeyNote[key] = false;
      isPlayingKey[key] = false;
      if( playingUpwards ) nowPlayingCount[key] += 1;
    }
  }
}

const stopPlayingKeyFlute = function(key) {
  if ( playingDownwards ) {
    if(cloneScale_down[key][nowPlayingCount[key] - 1] <= 0) {
      stopFlute(keyNoteMap[key]);
      willPlayKeyNote[key] = false;
      isPlayingKey[key] = false;
      if( playingDownwards) nowPlayingCount[key] -= 1;
    }
  }
  if ( playingUpwards ) {
    if(cloneScale_up[key][nowPlayingCount[key]] <= 0) {
      stopFlute(keyNoteMap[key]);
      willPlayKeyNote[key] = false;
      isPlayingKey[key] = false;
      if( playingUpwards ) nowPlayingCount[key] += 1;
    }
  }
}


const playKeyViolin = function(key) {
  if( playingDownwards ) checkPosition_down(key);
  if( playingUpwards ) checkPosition_up(key);

  if( willPlayKeyNote[key] && !isPlayingKey[key]) {
    playViolin(keyNoteMap[key]);
    isPlayingKey[key] = true
  }

  if( isPlayingKey[key] ) {
    countDuration(key);
    stopPlayingKeyViolin(key);
  }  
}

const playKeyCello = function(key) {
  if( playingDownwards ) checkPosition_down(key);
  if( playingUpwards ) checkPosition_up(key);

  if( willPlayKeyNote[key] && !isPlayingKey[key]) {
    playCello(keyNoteMap[key]);
    isPlayingKey[key] = true
  }

  if( isPlayingKey[key] ) {
    countDuration(key);
    stopPlayingKeyCello(key);
  }  
}

const playKeyPiano = function(key) {
  if( playingDownwards ) checkPosition_down(key);
  if( playingUpwards ) checkPosition_up(key);


  if( willPlayKeyNote[key] && !isPlayingKey[key]) {
    playPiano(keyNoteMap[key]);
    isPlayingKey[key] = true
  }

  if( isPlayingKey[key] ) {
    countDuration(key);
    stopPlayingKeyPiano(key);
  }
}

const playKeyFlute = function(key) {
  if( playingDownwards ) checkPosition_down(key);
  if( playingUpwards ) checkPosition_up(key);

  if( willPlayKeyNote[key] && !isPlayingKey[key]) {
    playFlute(keyNoteMap[key]);
    isPlayingKey[key] = true
  }

  if( isPlayingKey[key] ) {
    countDuration(key);
    stopPlayingKeyFlute(key);
  }  
}



const play = function() {
  for(let i = 0; i < keysViolin.length; i++) {
    playKeyViolin(keysViolin[i]);
  }
  for(let i = 0; i < keysCello.length; i++) {
    playKeyCello(keysCello[i]);
  }
  for(let i = 0; i < keysPiano.length; i++) {
    playKeyPiano(keysPiano[i]);
  }
  for(let i = 0; i < keysFlute.length; i++) {
    playKeyFlute(keysFlute[i]);
  }
}



const getPositions = function() {
  if( playingDownwards ) {
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if(clones[key].length) {
        for (let i = 0; i < clones[key].length; i++) {
          clonePosition_down[key][i] = clones[key][i].position.y;
        }
      }
    }
  }

  if( playingUpwards ) {
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if(clones[key].length) {
        for (let i = 0; i < clones[key].length; i++) {
          let position = clones[key][i].position.y
          clonePosition_up[key][i] = position;
        }
      }
    }
  }
}

const getScales = function() {
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if(clones[key].length) {
      for (let i = 0; i < clones[key].length; i++) {
        cloneScale_down[key][i] = clones[key][i].scale.y;
        cloneScale_up[key][i] = clones[key][i].scale.y;
      }
    }  
  } 
}


// ******************** Key event ******************** //
canUserPlay = true;

let keysCount = []; // 
const countKeys = function(key) {
  let keyCode = key;
  keysCount.push(keyCode);
}

const stopPlaying = function() {
  let scale = clones[keysCount[0]][0].scale.y * 0.2 + 2; // ノーマライズされてるのを元に戻す + 余白/余韻
  let position_down = clonePosition_down[keysCount[0]][0] + scale

  if( playingDownwards && position_down < 0 ) {
    isPlaying === false;
    stopMovingClones();
    isReadyToPlayUp = true;
  }

  // クローンの最後に入力されたキーのポジションが0になれば止まる
  let lastkey = keysCount[keysCount.length - 1];
  let scale_up = clones[lastkey][clones[lastkey].length - 1].scale.y * 0.2 + 1; // ノーマライズされてるのを元に戻す + 余白/余韻
  let position_up = clonePosition_up[lastkey][clones[lastkey].length - 1] - scale_up;
  
  if( playingUpwards && position_up > 0 ) {
    isPlaying === false;
    isReadyToPlayUp = true;
    stopMovingClones();
  }
}

const seeWhichKeyPressed = function (key) {
  if (!keyMap[key]) {
    keyMap[key] = true;
  } else {
    keyMap[key] = false;
  }
};

const keysPressed = [];
const isOtherKeysPressed = function () {
  if( keysPressed.length ) return true;
}

const keysPressedWhileMovingClones = [];
const removeKeysWhileMovingClones = function() {
  keysPressedWhileMovingClones.shift();
}


addEventListener("keydown", (e) => {
  let keyCode = e.key;
  if( keys.includes(keyCode) && canUserPlay ) startMovingClones(); // repeatでtrueになるように

  if ( keys.includes(keyCode) && !e.repeat && !isPlaying && canUserPlay ) {
    isAnyKeyPressed = true;
    keysPressed.push(keyCode);
    keysPressedWhileMovingClones.push(keyCode)
    seeWhichKeyPressed(keyCode);
    startMovingClones(); // repeatでtrueになるように
    createClone(keyCode);
  }

  if ( keyCode === "Enter" && isAnyKeyPressed  ) {
    isPlaying = true;
    playingDownwards = true;
    canUserPlay = false;
    startMovingClones();
  }
});

addEventListener("keyup", (e) => {
  let keyCode = e.key;
  if( keys.includes(keyCode) && !isPlaying && canUserPlay ) {
    getScale(keyCode);

    seeWhichKeyPressed(keyCode);
    keysPressed.shift();
    setTimeout(removeKeysWhileMovingClones, 800);
    if( !isOtherKeysPressed() ) setTimeout(stopMovingClones, 800);
    countKeys(keyCode);
  }
});





// Animate
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  // Play用
  if( movingClones && isPlaying ) getPositions();
  // if( !isPlaying ) getScales();
  if( isPlaying ) play();
  if( keysCount.length && isPlaying ) stopPlaying();


  // キー操作用
  extrude();
  if ( movingClones ) moveClones();
  

  // Controls
  controls.update();
  rotateCamera();

  // Renderer
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
animate();



// ******************** Tone.js ******************** //
document.addEventListener("click", () => {
  const btn = document.getElementById("title-wrapper");
  const backGround = document.getElementById("backGround");
  if (btn !== null) {
    btn.remove();
    backGround.remove();
    clicked = true;
  }
  iconRedo.classList.remove("hidden");
  iconPlay.classList.remove("hidden");
  iconPlayback.classList.remove("hidden");
});

const notesViolin = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A6",];
const notesCello = [ "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4",];
const notesPiano = [ "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4",];
const notesFlute = [ "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5",];

const keysViolin = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "^", "¥"];
const keysCello = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "@", "["];
const keysPiano = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", ":", "]"];
const keysFlute = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "_"];



let violin = SampleLibrary.load({
  instruments: "violin"
});
violin.toDestination();
  
let cello = SampleLibrary.load({
  instruments: "cello"
});
cello.toDestination();
  
let piano = SampleLibrary.load({
  instruments: "piano"
});
piano.toDestination();

let flute = SampleLibrary.load({
  instruments: "flute"
});
flute.toDestination();


const playViolin = function(note) {
  violin.triggerAttack(note);
}
const stopViolin = function(note) {
  violin.triggerRelease(note);
}

const playCello = function(note) {
  cello.triggerAttack(note);
}
const stopCello = function(note) {
  cello.triggerRelease(note);
}

const playPiano = function(note) {
  piano.triggerAttack(note);
}
const stopPiano = function(note) {
  piano.triggerRelease(note);
}

const playFlute = function(note) {
  flute.triggerAttack(note);
}
const stopFlute = function(note) {
  flute.triggerRelease(note);
}

// Violin
document.addEventListener("keydown", (e) => {
  if (!e.repeat) {
    for(let i = 0; i < keysViolin.length; i++) {
      switch(keysViolin[i]) {
        case e.key:
          playViolin(notesViolin[i]);
      }
    }
  }
});

document.addEventListener("keyup", (e) => {
  for(let i = 0; i < keysViolin.length; i++) {
    switch(keysViolin[i]) {
      case e.key:
        stopViolin(notesViolin[i]);
    }
  }
});


// Cello
document.addEventListener("keydown", (e) => {
  if (!e.repeat) {
    for(let i = 0; i < keysCello.length; i++) {
      switch(keysCello[i]) {
        case e.key:
          playCello(notesCello[i]);
      }
    }
  }
});

document.addEventListener("keyup", (e) => {
  for(let i = 0; i < keysCello.length; i++) {
    switch(keysCello[i]) {
      case e.key:
        stopCello(notesCello[i]);
    }
  }
});


// Piano
document.addEventListener("keydown", (e) => {
  if (!e.repeat) {
    for(let i = 0; i < keysPiano.length; i++) {
      switch(keysPiano[i]) {
        case e.key:
          playPiano(notesPiano[i]);
      }
    }
  }
});

document.addEventListener("keyup", (e) => {
  for(let i = 0; i < keysPiano.length; i++) {
    switch(keysPiano[i]) {
      case e.key:
        stopPiano(notesPiano[i]);
    }
  }
});


// Flute
document.addEventListener("keydown", (e) => {
  if (!e.repeat) {
    for(let i = 0; i < keysFlute.length; i++) {
      switch(keysFlute[i]) {
        case e.key:
          playFlute(notesFlute[i]);
      }
    }
  }
});

document.addEventListener("keyup", (e) => {
  for(let i = 0; i < keysFlute.length; i++) {
    switch(keysFlute[i]) {
      case e.key:
        stopFlute(notesFlute[i]);
    }
  }
});




let isReadyToPlayUp = false;

const iconPlay = document.getElementById("icon-play");
iconPlay.addEventListener("click", () => {
  if ( !isReadyToPlayUp && isAnyKeyPressed ) {
    isPlaying = true;
    playingDownwards = true;
    startMovingClones();
    canUserPlay = false;
  }
});

const iconPlayback = document.getElementById("icon-playback");
iconPlayback.addEventListener("click", () => {
  if( isReadyToPlayUp ) {
    isPlaying = true;
    playingDownwards = false;
    playingUpwards = true;
    startMovingClones();
    canUserPlay = false;
  }
})





const init = function() {
  removeClonesFromScene(); // ＊先にクローンを取り除かないとcloneオブジェクトが空になる
  emptyClones();
  emptyCloneScale_down();
  emptyCloneScale_up();
  emptyClonePosition_down();
  emptyClonePosition_up();
  emptynowPlayingCount();
  initWillPlayKeyNote();
  initIsPlayingKey();
  initCameraPosition();

  keysCount = []; 
  isAnyKeyPressed = false;
  isPlaying = false;
  playingDownwards = false;
  playingUpwards = false;
  isReadyToPlayUp = false;
  canUserPlay = true;
}

const iconRedo = document.getElementById("icon-redo");
iconRedo.addEventListener("click", () => {
  init();
})

// ユーザーが捜査を開始したか判定
let isAnyKeyPressed = false;

// ユーザーがクリックしたか判定
let clicked = false;