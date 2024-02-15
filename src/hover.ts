import * as THREE from 'three';
import gsap from 'gsap';

export interface Options {
    parent: HTMLElement;
    displacementImage: string;
    image1: string;
    image2: string;
    imagesRatio?: number;
    intensity?: number;
    intensity1?: number;
    intensity2?: number;
    angle?: number;
    angle1?: number;
    angle2?: number;
    speed?: number;
    speedIn?: number;
    speedOut?: number;
    hover?: boolean;
    easing?: string;
    video?: boolean;
}

type LastDefined<T> = [...(T | undefined)[], T];

class HoverEffect {
    constructor(opts: Options) {
        // please respect authorship and do not remove
        console.log(
            "%c Hover effect by Robin Delaporte: https://github.com/robin-dela/hover-effect ",
            "color: #bada55; font-size: 0.8rem"
        );

        function firstDefined<T>(...args: LastDefined<T>): T {
            for (let i = 0; i < args.length - 1; i++) {
                if (args[i] !== undefined) return (args[i] as T);
            }
            return args[args.length - 1] as T;
        }

        const parent = opts.parent;
        const dispImage = opts.displacementImage;
        const image1 = opts.image1;
        const image2 = opts.image2;
        const imagesRatio = firstDefined(opts.imagesRatio, 1.0);
        const intensity1 = firstDefined(opts.intensity1, opts.intensity, 1);
        const intensity2 = firstDefined(opts.intensity2, opts.intensity, 1);
        const commonAngle = firstDefined(opts.angle, Math.PI / 4); // 45 degrees by default, so grayscale images work correctly
        const angle1 = firstDefined(opts.angle1, commonAngle);
        const angle2 = firstDefined(opts.angle2, commonAngle ? -commonAngle * 3 : undefined);
        const speedIn = firstDefined(opts.speedIn, opts.speed, 1.6);
        const speedOut = firstDefined(opts.speedOut, opts.speed, 1.2);
        const userHover = firstDefined(opts.hover, true);
        const easing = firstDefined(opts.easing, "expo.out");
        const video = firstDefined(opts.video, false);
        const vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

        const fragment = `
varying vec2 vUv;

uniform float dispFactor;
uniform float dpr;
uniform sampler2D disp;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float angle1;
uniform float angle2;
uniform float intensity1;
uniform float intensity2;
uniform vec4 res;
uniform vec2 parent;

mat2 getRotM(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

void main() {
  vec4 disp = texture2D(disp, vUv);
  vec2 dispVec = vec2(disp.r, disp.g);

  vec2 uv = 0.5 * gl_FragCoord.xy / (res.xy) ;
  vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);


  vec2 distortedPosition1 = myUV + getRotM(angle1) * dispVec * intensity1 * dispFactor;
  vec2 distortedPosition2 = myUV + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);
  vec4 _texture1 = texture2D(texture1, distortedPosition1);
  vec4 _texture2 = texture2D(texture2, distortedPosition2);
  gl_FragColor = mix(_texture1, _texture2, dispFactor);
}
`;

        if (!parent) {
            console.warn("Parent missing");
            return;
        }

        if (!(image1 && image2 && dispImage)) {
            console.warn("One or more images are missing");
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
            parent.offsetWidth / -2,
            parent.offsetWidth / 2,
            parent.offsetHeight / 2,
            parent.offsetHeight / -2,
            1,
            1000
        );

        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: true
        });

        renderer.setPixelRatio(2.0);
        renderer.setClearColor(0xffffff, 0.0);
        renderer.setSize(parent.offsetWidth, parent.offsetHeight);
        parent.appendChild(renderer.domElement);

        const render = function () {
            // This will be called by the TextureLoader as well as Gsap.
            renderer.render(scene, camera);
        };

        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "";

        const disp = loader.load(dispImage, render);
        disp.magFilter = disp.minFilter = THREE.LinearFilter;

        let a1: number, a2: number;
        const imageAspect = imagesRatio;
        if (parent.offsetHeight / parent.offsetWidth < imageAspect) {
            a1 = 1;
            a2 = parent.offsetHeight / parent.offsetWidth / imageAspect;
        } else {
            a1 = (parent.offsetWidth / parent.offsetHeight) * imageAspect;
            a2 = 1;
        }

        const getTexture = () : [THREE.Texture, THREE.Texture] => {
            if (video) {
                const animate = function () {
                    requestAnimationFrame(animate);

                    renderer.render(scene, camera);
                };
                animate();

                const video = document.createElement("video");
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.src = image1;
                video.load();

                const video2 = document.createElement("video");
                video2.autoplay = true;
                video2.loop = true;
                video2.muted = true;
                video2.src = image2;
                video2.load();

                let videoTexture1 = new THREE.VideoTexture(video);
                let videoTexture2 = new THREE.VideoTexture(video2);
                videoTexture1.magFilter = videoTexture2.magFilter = THREE.LinearFilter;
                videoTexture1.minFilter = videoTexture2.minFilter = THREE.LinearFilter;

                video2.addEventListener(
                    "loadeddata",
                    function () {
                        video2.play();

                        videoTexture2 = new THREE.VideoTexture(video2);
                        videoTexture2.magFilter = THREE.LinearFilter;
                        videoTexture2.minFilter = THREE.LinearFilter;

                        mat.uniforms.videoTexture2.value = videoTexture2;
                    },
                    false
                );

                video.addEventListener(
                    "loadeddata",
                    function () {
                        video.play();

                        videoTexture1 = new THREE.VideoTexture(video);

                        videoTexture1.magFilter = THREE.LinearFilter;
                        videoTexture1.minFilter = THREE.LinearFilter;

                        mat.uniforms.texture1.value = videoTexture1;
                    },
                    false
                );

                return [videoTexture1, videoTexture2];
            } else {
                const texture1 = loader.load(image1, render);
                const texture2 = loader.load(image2, render);

                texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
                texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

                return [texture1, texture2];
            }
        }

        const [texture1, texture2] = getTexture();

        const mat = new THREE.ShaderMaterial({
            uniforms: {
                intensity1: { value: intensity1 },
                intensity2: { value: intensity2 },
                dispFactor: { value: 0.0 },
                angle1: { value: angle1 },
                angle2: { value: angle2 },
                texture1: { value: texture1 },
                texture2: { value: texture2 },
                disp: { value: disp },
                res: { value: new THREE.Vector4(parent.offsetWidth, parent.offsetHeight, a1, a2) }
            },

            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            opacity: 1.0
        });

        const geometry = new THREE.PlaneGeometry(
            parent.offsetWidth,
            parent.offsetHeight,
            1
        );
        const object = new THREE.Mesh(geometry, mat);
        scene.add(object);

        function transitionIn() {
            gsap.to(mat.uniforms.dispFactor, {
                duration: speedIn,
                value: 1,
                ease: easing,
                onUpdate: render,
                onComplete: render
            });
        }

        function transitionOut() {
            gsap.to(mat.uniforms.dispFactor, {
                duration: speedOut,
                value: 0,
                ease: easing,
                onUpdate: render,
                onComplete: render
            });
        }

        if (userHover) {
            parent.addEventListener("mouseenter", transitionIn);
            parent.addEventListener("touchstart", transitionIn);
            parent.addEventListener("mouseleave", transitionOut);
            parent.addEventListener("touchend", transitionOut);
        }

        window.addEventListener("resize", function () {
            if (parent.offsetHeight / parent.offsetWidth < imageAspect) {
                a1 = 1;
                a2 = parent.offsetHeight / parent.offsetWidth / imageAspect;
            } else {
                a1 = (parent.offsetWidth / parent.offsetHeight) * imageAspect;
                a2 = 1;
            }
            object.material.uniforms.res.value = new THREE.Vector4(
                parent.offsetWidth,
                parent.offsetHeight,
                a1,
                a2
            );
            renderer.setSize(parent.offsetWidth, parent.offsetHeight);

            render();
        });

        this.next = transitionIn;
        this.previous = transitionOut;
    }

    next!: () => void;
    previous!: () => void;

}

export default HoverEffect;


