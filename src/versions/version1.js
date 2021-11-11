import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import tailVertex from './shaders1/tail/vertex.glsl'
import tailFragment from './shaders1/tail/fragment.glsl'
import firefliesVertexShader from './shaders1/fireflies/vertex.glsl'
import firefliesFragmentShader from './shaders1/fireflies/fragment.glsl'
import vertices from './lines.json'
import xVertexShader from './shaders1/xdirection/vertex.glsl'
import xFragmentShader from './shaders1/xdirection/fragment.glsl'
import yVertexShader from './shaders1/ydirection/vertex.glsl'
import yFragmentShader from './shaders1/ydirection/fragment.glsl'
import eyeVertex from './shaders1/eyes/vertex.glsl'
import eyeFragment from './shaders1/eyes/fragment.glsl'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'




const m = {}
m.spacing = 0.75
m.offset = m.spacing * 2


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const renderTarget = new THREE.WebGLRenderTarget(
    800,
    600,
    {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding
    }
)

// Fox Blend Model
const textureLoader = new THREE.TextureLoader()
const gltfLoader = new GLTFLoader()
const bakedTexture = textureLoader.load('bakedFox3.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
gltfLoader.load(
    'FoxDeliv3.glb',
    (gltf) =>
    {
        scene.add(gltf.scene)
        gltf.scene.traverse((child) =>
        {
            child.material = bakedMaterial
        })
        console.log(gltf.scene.children[0])
        gltf.scene.children[0].position.y = 16.103713989257812

    }
)
    
    
// Tail
const sphereGeo = new THREE.SphereGeometry(1, 100, 100)
let materialArray = []
for (let i = 0; i < 5; i++) {
    const sphereMat = new THREE.ShaderMaterial({
        vertexShader: tailVertex,
        fragmentShader: tailFragment,
        uniforms: {
            index: { value: i },
            uTime: { value: 0 },
            uReactiveLength: { value: 0 }
        },
        transparent: true
    })
    materialArray.push(sphereMat)
    const sphere = new THREE.Mesh(sphereGeo, materialArray[i])
    sphere.position.x = - 2
    sphere.position.y = 1
    sphere.position.z = m.spacing * i - m.offset
    console.log(sphere.position.z)
    scene.add(sphere)
}

// Fireflies
const firefliesGeometry = new THREE.BufferGeometry()
const firefliesCount = 200
const positionArray = new Float32Array(firefliesCount * 3)
const scaleArray = new Float32Array(firefliesCount)
for( let i = 0; i < firefliesCount; i++) 
{
    positionArray[i * 3 + 0] = ((Math.random() - 0.5) * 100)
    positionArray[i * 3 + 1] = Math.random() * 50
    positionArray[i * 3 + 2] = ((Math.random() - 0.5) * 100)
    scaleArray[i] = Math.random() * 15
}
firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))
const firefliesMaterial = new THREE.ShaderMaterial({ 
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    uniforms: 
    {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 100 },
        uTime: { value: 0 },
        uReactiveLength: { value: 0 }
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
})
const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
scene.add(fireflies)

//eyes
const eyeGeo = new THREE.SphereGeometry(0.5, 20, 20)
const eyeMat = new THREE.ShaderMaterial({
    vertexShader: eyeVertex,
    fragmentShader: eyeFragment,
    uniforms: {
        uTime: { value: 0 },
        uReactiveLength: { value: 0 }
    },
    transparent: true
})
for (let i = 0; i < 2; i++) {
    const eye = new THREE.Mesh(eyeGeo, eyeMat)
    eye.position.z = 2 * i - 1
    eye.position.x = 6
    eye.position.y = 16
    scene.add(eye)
}


// lines
let left1 = [];
for (var i = 0; i < vertices.left1.length - 1; i++) {
    let x = vertices.left1[i][0];
    let y = vertices.left1[i][1];
    let z = vertices.left1[i][2];

    left1.push(new THREE.Vector3(x, y, z));
}
let right1 = [];
for (var i = 0; i < vertices.right1.length - 1; i++) {
    let x = vertices.right1[i][0];
    let y = vertices.right1[i][1];
    let z = vertices.right1[i][2];

    right1.push(new THREE.Vector3(x, y, z));
}
let left2 = [];
for (var i = 0; i < vertices.left2.length - 1; i++) {
    let x = vertices.left2[i][0];
    let y = vertices.left2[i][1];
    let z = vertices.left2[i][2];

    left2.push(new THREE.Vector3(x, y, z));
}
let right2 = [];
for (var i = 0; i < vertices.right2.length - 1; i++) {
    let x = vertices.right2[i][0];
    let y = vertices.right2[i][1];
    let z = vertices.right2[i][2];

    right2.push(new THREE.Vector3(x, y, z));
}

const tubeFloorMaterial = new THREE.ShaderMaterial({
    vertexShader: xVertexShader,
    fragmentShader: xFragmentShader,
    transparent: true,
    uniforms: {
        uTime: { value: 0 },
        uReactiveLength: { value: 0 }
    }
})

const tubeFoxMaterial = new THREE.ShaderMaterial({
    vertexShader: yVertexShader,
    fragmentShader: yFragmentShader,
    transparent: true,
    uniforms: {
        uReactiveLength: { value: 0 },
        uTime: { value: 0 }
    }
})

const left1Geometry = new THREE.TubeGeometry( new THREE.CatmullRomCurve3(left1), 100, 0.1, 8, false );
const left1Mesh = new THREE.Mesh( left1Geometry, tubeFloorMaterial );
scene.add( left1Mesh );
const right1Geometry = new THREE.TubeGeometry( new THREE.CatmullRomCurve3(right1), 100, 0.1, 8, false );
const right1Mesh = new THREE.Mesh( right1Geometry, tubeFloorMaterial );
scene.add( right1Mesh );
const left2Geometry = new THREE.TubeGeometry( new THREE.CatmullRomCurve3(left2), 100, 0.1, 8, false );
const left2Mesh = new THREE.Mesh( left2Geometry, tubeFoxMaterial );
scene.add( left2Mesh );
const right2Geometry = new THREE.TubeGeometry( new THREE.CatmullRomCurve3(right2), 100, 0.1, 8, false );
const right2Mesh = new THREE.Mesh( right2Geometry, tubeFoxMaterial );
scene.add( right2Mesh );


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    composer.setSize(sizes.width, sizes.height)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(65.54621018174777, 43.11691274392165, 20.8022647507004255)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.autoClear = false
renderer.outputEncoding = THREE.sRGBEncoding

const composer = new EffectComposer( renderer, renderTarget )
composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
composer.setSize(sizes.width, sizes.height)

const renderScene = new RenderPass(scene, camera)
composer.addPass( renderScene )

const unrealBloomPass = new UnrealBloomPass()
unrealBloomPass.strength = 0.5
unrealBloomPass.radius = 1
unrealBloomPass.threshold = 0.05
composer.addPass( unrealBloomPass )

let scrollY, clientHeights
window.addEventListener('scroll', function() {
    scrollY = window.scrollY;
    clientHeights = window.document.body.clientHeight;
})




/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    for(let i = 0; i < materialArray.length; i++ )
    {
        materialArray[i].uniforms.uTime.value = elapsedTime
        materialArray[i].uniforms.uReactiveLength.value = ((scrollY / clientHeights) * 75.0)
    }

    firefliesMaterial.uniforms.uTime.value = elapsedTime
    firefliesMaterial.uniforms.uReactiveLength.value = ((scrollY / clientHeights) * 75.0)
    tubeFoxMaterial.uniforms.uTime.value = elapsedTime
    tubeFoxMaterial.uniforms.uReactiveLength.value = ((scrollY / clientHeights) * 75.0);
    tubeFloorMaterial.uniforms.uTime.value = elapsedTime
    tubeFloorMaterial.uniforms.uReactiveLength.value = ((scrollY / clientHeights) * 75.0);
    eyeMat.uniforms.uTime.value = elapsedTime
    eyeMat.uniforms.uReactiveLength.value = ((scrollY / clientHeights) * 75.0);

    // console.log(scrollY)
    console.log(((scrollY / clientHeights) * 75.0))
    
    controls.update()

    composer.render()

    window.requestAnimationFrame(tick)
}

tick()