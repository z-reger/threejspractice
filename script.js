const section = document.querySelector('section.photo')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
section.appendChild( renderer.domElement );

const ambient = new THREE.AmbientLight(0x222222);
scene.add( ambient );
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 0, 6);
scene.add(light)

const loader = new THREE.TextureLoader()

const urls = [
    'edge.png', 'spine.png', 'top.png', 'bottom.png', 'front.png', 'back1.png'
]

const materials = urls.map(url => {
    return new THREE.MeshLambertMaterial({
    map: loader.load (url) 
    })
})


const geometry = new THREE.BoxGeometry(4, 5, 1);
// const material = new THREE.MeshLambertMaterial( { map: loader.load('front.png') } );
const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

camera.position.z = 6;

let currentTimeLine = window.pageYOffset / 3000;
let aimTimeLine = window.pageYOffset / 3000;



function animate() {
	requestAnimationFrame( animate );
    // cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
// const currentTimeLine = window.pageYOffset / 3000

currentTimeLine += (aimTimeLine - currentTimeLine) * 0.1

const rx = currentTimeLine * -0.5 + 0.5
const ry = (currentTimeLine * 0.9 + 0.1) * Math.PI * 2
cube.rotation.set(rx, ry, 0)


	renderer.render( scene, camera );
}
animate();

window.addEventListener('scroll', function() {
    aimTimeLine = window.pageYOffset / 3000;
})