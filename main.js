import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { BoxGeometry } from 'three';
import { BufferGeometry } from 'three';

import { Proj } from "./cad.js";

// 
function dd(pp) {
    var rr 
    rr= JSON.stringify(pp)
    rr = rr.replace(/[<]/igm, "gt")
    return rr

}

// number evaluation /
function cc(ii, fi = 2) {
    let r
    if (Array.isArray(ii) && ii.length > 1) {
        r = []
        for (let e of ii) {
            r.push(parseFloat(eval(e)))
        }
    } else {
        r = parseFloat(eval(ii))
    }
    return r
}

class ResourceTracker {
    constructor() {
        this.resources = new Set();
    }

    track(resource) {
        if (resource.dispose || resource instanceof THREE.Object3D) {
            this.resources.add(resource);
        }
        return resource;
    }

    untrack(resource) {
        this.resources.delete(resource);
    }

    dispose() {
        for (const resource of this.resources) {


            if (resource instanceof THREE.Object3D) {
                if (resource.parent) {
                    resource.parent.remove(resource);
                }
            }
            if (resource.dispose) {
                resource.dispose();
            }

        }
        this.resources.clear();
    }
}
// 
function encodeqs(sks) {
    return sks.replace(/[ ]/g, "&").replace(/\n/g, "&&").replace(/#/g, "vvv")

}
// 
function decodeqs(sks) {
    return sks.replace(/&&/g, "\n").replace(/&/g, " ").replace(/vvv/g, "#")

}
var deb = 0
var unitfaktor = 10
var faktorm2 = 1000000
var faktorm = 1000
var g8
// session
var s = {}
var regcomma = /[,]/
/////////////////////////////////////////////////


export function magie(kkk = "") {
    let gui;

    var container, stats, controls, light, ligh = 1;
    var camera, scene, renderer, labelRenderer;
    let theta = 0;
    var radius = 0;
    var bb = { x: 0, y: 0, z: 0 }
    var explodeKorp = 1
    var lgeos = {}
    var mess = []
    ///////
    // new Proj(vorl, fn3).getall(function (pr) {

    var pppp = []
    var paarr = []
    var meshgroup1 = {}
    var holi = ""
    if (kkk == "") {
        kk= $("#inn").val()
    }else{
        kk=kkk
        $("#inn").val(kk)
    }
    
    if (kk == "") {
        kk = decodeqs(kkk)
        $("#inn").val(kk)
        
    } 
    if (kk == "") {
        
        kk = "m0 1.9 wh\nm1 2 ei\na lrgtbc 22 22 22 m0\n"
        $("#inn").val(kk)
    } 
    // alert(kk)
    let s = kk
    // s = s.replace(/\n\n$/g, "\n")
    s = s.replace(/[ ]{2,9}/g, " ")
    let zuu = encodeqs(s)
    let bbb = window.location.href.split("?")
    // alert(bbb[0])
    let uuu = bbb[0] + "?" + zuu
    $("#save").attr("href", uuu)

    try {
        init(kk);
        animate();
    } catch (error) {
        alert(error + ":::" + error.stack)
    }
    let m2 = ""
    let i = 0
    // for (let e of pr.lms) {
    //     let t = e
    //     m2 += "<p>m" + t.nme + ", " + t.s + " cm ="
    //         + t.m2.toFixed(2) + " m2 (Uml " + t.uml.toFixed(0) +
    //         "m ) <br>= " + cc(t.m2 * t.p).toFixed(2) + "Eur platten + " + cc(t.uml * 0.6).toFixed(2) + "Eur Umleimer =" + cc(t.m2 * t.p + t.uml * 0.6).toFixed(2) + " Euro</p>"
    //     i++
    // }

    // $("#mm2").html(m2)
    // $("#bb").html("Bounding Box" + dd(bb))
    // $("#prt").html("Bounding Box" + dd(pr))

    // $("#angtex").html("Anb" + pr.angtex)


    function init(sks = "") {
        let qs = "?" + encodeqs(sks)
        let pr
        camera = new THREE.PerspectiveCamera(50, 700 / 500, 1, 100000);
        camera.up.set(0, 0, 1);

        camera.layers.enable(0); // enabled by default
        // camera.layers.enable(1);
        var light = new THREE.PointLight(0xffffff, 2.5, 0, 0);
        camera.add(light);

        var group = new THREE.Group();
        // group.position.y = 50;
        const loader = new THREE.TextureLoader();
        // const texture = loader.load('textures/uv_grid_opengl.jpg');
        // var texture 
        // texture.colorSpace = THREE.SRGBColorSpace;

        // it's necessary to apply these settings in order to correctly display the texture on a shape geometry

        // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        // texture.repeat.set(0.008, 0.008);


        const resTracker = new ResourceTracker();

        const track = resTracker.track.bind(resTracker);

        camera.layers.enable(2);
        camera.layers.enable(3);
        camera.layers.enable(4);
        camera.layers.enable(5);
        camera.layers.enable(6);

        scene = new THREE.Scene();
        scene.background = new THREE.Color("ivory");

        scene.add(group);
        light = new THREE.PointLight(0xffffff, 3, 0, 0);
        const light2 = new THREE.PointLight(0xffffff, -3, 0, 0);
        //  light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1 );
        light.layers.set(6)
        light.layers.enable(0);
        // light.layers.enable(1);
        light.layers.enable(2);
        light.layers.enable(3);
        light.layers.enable(4);
        light.layers.enable(5);
        light.layers.enable(6);

        scene.add(camera);
        camera.add(light);
        // camera.add(light2);

        var colors = {
            fi: "cornsilk",
            wh: "white",
            bu: "wheat",
            gr: "snow",
            bl: "cornflowerblue",
            ei: "burlywood"
        }
        const geometry = new THREE.BoxGeometry();
        ////////////////////////////////////
        ///////////////////////////////////////

        var mat = new THREE.MeshLambertMaterial({ color: '#336633' });
        let edgmat = new THREE.LineBasicMaterial({ color: 0x000000 });
        let edg, mes, wir

        let tra, ee

        meshgroup1 = new THREE.Group("cc")

        var koarr = []
        var koall = new THREE.Group()
        //
        function up(s) {
            for (const cube of mess) {
                scene.remove(cube);
            }
            mess.length = 0;  // clears the cubes array

            resTracker.dispose()
            let pr=prr(s)
            proj(pr)
            animate()
            gu(s)
            // magie(s)
    }

    const layers = {
        'labl': function () {
            camera.layers.toggle(0);
        },
        'dime': function () {
            camera.layers.toggle(1);
        },
        'wire': function () {
            camera.layers.toggle(5);
        },
        'korp': function () {
            camera.layers.toggle(2);
        },
        'back': function () {
            camera.layers.toggle(3);
        },
        'fron': function () {
            camera.layers.toggle(4);
        },
        'B': function () {
            camera.position.set(0, bb.x, bb.z / 2);
            controls.update()
        },
        'F': function () {
            camera.position.set(0, -bb.x, bb.z / 2);
            controls.update()
        },
        'R': function () {
            camera.position.set(-bb.x, -bb.y, bb.z / 2);
            controls.update()
        },
        'expl': function () {
            explodeKorp = 22
            controls.update()

        },

        'update': function () {
            let s = myObject.join("\n")
            s = s.replace(/\n\n$/g, "\n")

            magie(s)
            // pr=prr(myObject.mat+"\n"+myObject.z)
            // proj(pr)
            // animate()
            // controls.update()

        },
        'downl': function () {
            exportToObj()
        }
    };

    var myObject
    function gu(sks){
        var aks = sks.split("\n")

        // Init gui
        // var gui = new GUI({ container: document.getElementById('gu'), injectStyles: true });
        var gui = new GUI({width: 60, injectStyles:true});
        if (sks != "") {
            myObject = {}
            for (let i = 0; i < aks.length; i++) {
                myObject["z" + i] = aks[i];

            }
        }
        



        if (sks != "") {
            
            // for (let i = 0; i < aks.length; i++) {
            //     // gui.add( myObject, 'z'+i );   // Text Field
            //     gui.add(myObject, 'z' + i)
            //     .name('z' + i)
            //     .onFinishChange(value => {
            //         $("#gu").html("")
                    
            //         let s = ""
            //         for (let e in myObject) {
            //             s = s + myObject[e] + "\n"
            //         }
            //         s = s.replace(/\n\n$/g, "\n")
            //         s = s.replace(/[ ]{2,9}/g, " ")
            //         let zuu = encodeqs(s)
            //         let bbb = window.location.href.split("?")
            //         // alert(bbb[0])
            //         let uuu = bbb[0] + "?" + zuu
            //         $("#save").attr("href", uuu)
            //         // return window.location.href=uuu
            //         up(s)
            //         // magie(s)
            //         proj(prr(s))
            //     });
            // }
        } else {
            gui.add(myObject, 'krr0');   // Text Field
        }
        // gui.add(layers, 'update');
        
        ////////////////////////
        // gui.add(layers, 'labl');
        // gui.add(layers, 'dime');
        // gui.add(layers, 'downl');
        // gui.add(layers, 'wire');
        // gui.add(layers, 'korp');
        // gui.add(layers, 'back');
        // gui.add(layers, 'fron');
        // gui.add(layers, 'B');
        // gui.add(layers, 'F');
        // gui.add(layers, 'R');
        // gui.add(layers, 'expl', 2, 4, 22);
        // gui.add( myObject, 'mat' );   // Text Field
    }
    gu(sks)
        ////////////////////////
        ////////////////////////
        ////////////////////////

        function prr(s) {
            return new Proj(s).getall()
        }
        let s = ""
        for (let e in myObject) {
            s = s + myObject[e] + "\n"
        }
        pr = prr(s)

        if (deb == 1) {
            $("#mm2").html(dd(pr))
        }
        ////////////////////////
        ////////////////////////

        /**
         *
         * @param {*} k
         * @returns
         */
        function createK(k) {
            var g = new THREE.Group()
            // korpus parts ///////////
            for (var e1 in k.pats) {
                var e = Object.assign({}, k.pats[e1])
                let n = makeM(k, e1, e)
                g.add(n)
            }  // end korpus parts
            return g
        }  // end createK


        ////////////////////////
        // korpus //////////////////////
        function proj(pr) {
            if(pr.sess.eee.length > 1){
                $("#err").html(pr.sess.eee)
                $("#wrong").html("Wrong input:")
                
            }else{
                $("#err").html("")
                $("#wrong").html("")

            }

            var kk = {}
            for (var k1 in pr.oks) {
                var g7 = new THREE.Group()
                g8 = new THREE.Group()

                var k = Object.assign({}, pr.oks[k1])
                // alert(k.nme)
                if (/\./.test(k1)) {
                    continue
                }

                // n korpus ////////

                var rr, rrr
                let k2 = []
                rr = createK(k, k1)
                let label = makeLabel(k1, 4, 0, 2)
                label.layers.set(0);
                g8.add(rr)
                g8.add(label)
                // rr.add(label);
                g8.position.set(k.x, k.y, k.z)
                // g8.add(rr)

                //
                g8.rotation.x = k.ox * Math.PI / 180
                g8.rotation.y = k.oy * Math.PI / 180
                g8.rotation.z = k.oz * Math.PI / 180
                // moveK(k, g7, g8)
                koall.add(g8)

                koall.position.set(-bb.x / 2, -bb.y / 2, -bb.z / 2)
                scene.add(koall);

            }  // end korpus

        } // end proj
        proj(pr)


        function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {

            // flat shape with texture
            // note: default UVs generated by THREE.ShapeGeometry are simply the x- and y-coordinates of the vertices

            let geometry = new THREE.ShapeGeometry(shape);

            let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                map: texture
            }));
            mesh.position.set(x, y, z - 175);
            mesh.rotation.set(rx, ry, rz);
            mesh.scale.set(s, s, s);
            group.add(mesh);

            // flat shape

            geometry = new THREE.ShapeGeometry(shape);

            mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color, side: THREE.DoubleSide }));
            mesh.position.set(x, y, z - 125);
            mesh.rotation.set(rx, ry, rz);
            mesh.scale.set(s, s, s);
            group.add(mesh);

            // extruded shape

            geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

            mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color }));
            mesh.position.set(x, y, z - 75);
            mesh.rotation.set(rx, ry, rz);
            mesh.scale.set(s, s, s);
            group.add(mesh);

            addLineShape(shape, color, x, y, z, rx, ry, rz, s);

        }

        function addLineShape(shape, color, x, y, z, rx, ry, rz, s) {

            // lines

            shape.autoClose = true;

            const points = shape.getPoints();
            const spacedPoints = shape.getSpacedPoints(50);

            const geometryPoints = new THREE.BufferGeometry().setFromPoints(points);
            const geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints(spacedPoints);

            // solid line

            let line = new THREE.Line(geometryPoints, new THREE.LineBasicMaterial({ color: color }));
            line.position.set(x, y, z - 25);
            line.rotation.set(rx, ry, rz);
            line.scale.set(s, s, s);
            group.add(line);

            // line from equidistance sampled points

            line = new THREE.Line(geometrySpacedPoints, new THREE.LineBasicMaterial({ color: color }));
            line.position.set(x, y, z + 25);
            line.rotation.set(rx, ry, rz);
            line.scale.set(s, s, s);
            group.add(line);

            // vertices from real points

            let particles = new THREE.Points(geometryPoints, new THREE.PointsMaterial({ color: color, size: 4 }));
            particles.position.set(x, y, z + 75);
            particles.rotation.set(rx, ry, rz);
            particles.scale.set(s, s, s);
            group.add(particles);

            // equidistance sampled points

            particles = new THREE.Points(geometrySpacedPoints, new THREE.PointsMaterial({ color: color, size: 4 }));
            particles.position.set(x, y, z + 125);
            particles.rotation.set(rx, ry, rz);
            particles.scale.set(s, s, s);
            group.add(particles);

        }

        var a = Math.PI / 180

        // const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        // const triangleShape = new THREE.Shape()
        //           .moveTo( 0, 0 )
        //           .lineTo( 160, 0 )
        //           .lineTo( 160, 80 )
        //           .lineTo( 100, 80 )
        //           .lineTo( 0, 10 )
        //           .lineTo( 0, 0 ); // close path
        //           addShape( triangleShape, extrudeSettings,
        //             0x8080f0, 0, 0, 0, 0, 0, 0, 1 );
        //         group.rotateX(90*a)

        // scene.add(group)


        //////////////////////////////////
        function makeM(k, e1, e) {
            var g2 = new THREE.Group()
            let lay = 2
            if (e1 == "b") {
                lay = 3
            } else if (e1 == "f") {
                lay = 4
            }

            let w = e.w
            let d = e.d
            let h = e.h
            let x = e.x
            let y = e.y
            let z = e.z

            let ox = e.ox || 0
            let oy = e.oy || 0
            let oz = e.oz || 0

            let nnmm = k.nme + e1
            lgeos[nnmm] = track(new THREE.BoxGeometry(w, d, h,));
            //////////////////////
            let mat
            mat = track(new THREE.MeshLambertMaterial({
                color: colors[e.co],
                opacity: 0.95,
                transparent: true
            }))
            ///////////////////////
            mes = track(new THREE.Mesh(lgeos[nnmm], mat));
            edg = new THREE.EdgesGeometry(lgeos[nnmm]);
            wir = new THREE.LineSegments(edg, edgmat);
            wir.layers.set(lay)
            mes.add(wir);
            mess.push(mes)

            // position and rotation
            let offset = 0.5
            let po = {
                x: ((w * offset) + x),
                // y: ((d * offset) + y + k.g + ny[1]),
                y: ((d * offset) + y),
                z: ((h * offset) + z)
            }
            let holir = String("-".concat("x", e1, w, d, h));
            let plab
            plab = makeLabel(holir, 1 + po.x, 0, 0)
            plab.layers.set(1);

            g2.add(mes)


            mes.rotateX(ox)
            mes.rotateY(oy)
            mes.rotateZ(oz)
            // mes.rotateOnAxis(new THREE.Vector3(e.x, e.y, 1), e.oz * Math.PI / 180)
            g2.position.set(po.x, po.y, po.z)

            // layer
            mes.layers.set(lay)

            // bounding box
            let mmax = cc(w + k.x + (k.nx[0]) * k.nx[1])
            // mmax=cc(k.xx+po.x+w)
            let mmay = cc(d + k.y + (k.ny[0]) * k.ny[1])
            let mmaz = cc(h + k.z + (k.nz[0]) * k.nz[1])
            // alert(dd(e)+mmax)
            if (mmax > bb.x) {
                radius = mmax
            }

            if (mmax > bb.x) {
                bb.x = mmax
            }
            if (mmay > bb.y) {
                bb.y = mmay
            }
            if (mmaz > bb.z) {
                bb.z = mmaz
            }

            // label
            let arr = [
                Number(e.w),
                Number(e.d),
                Number(e.h)
            ]

            arr.sort(function (a, b) {
                return b - a;
            });
            // alert(e.m)
            e.m = Number(e.m)
            g2.add(plab)
            return g2
        }
     
        //////////////////////////////////
        container = document.getElementById('canvas');
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, 500);
        // renderer.setSize(window.innerWidth,window.innerWidth);
        
        renderer.domElement.style.position = 'absolute';
        container.appendChild(renderer.domElement);
        
        labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(window.innerWidth, 500);
        // labelRenderer.setSize(window.innerWidth,window.innerWidth);
        labelRenderer.domElement.style.position = 'absolute';
        container.appendChild(labelRenderer.domElement);
        /////
        controls = new OrbitControls(camera, renderer.domElement, labelRenderer.domElement);
        // controls = new TrackballControls( camera, renderer.domElement );
        // stats = new Stats();
        // document.body.appendChild(stats.dom);
        const controls2 = new OrbitControls(camera, labelRenderer.domElement);
        window.addEventListener('resize', onWindowResize);
        // var inp = document.getElementById("ccc")
        // inp.addEventListener("click", up)
        // var ta = document.getElementById("cadi")
        // ta.addEventListener("click", up)


        const pointer = new THREE.Vector2();
        var ax = new THREE.AxesHelper(bb.x)
        ax.position.set(-bb.x / 2, -bb.y / 2, -bb.z / 2)
        camera.position.z = bb.z / 4
        scene.add(ax);

        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);
        // camera.fov=100.0
        camera.position.y = -(bb.x + bb.y)
        camera.position.x = -bb.x * 1.2

        function exportToObj() {
            const exporter = new OBJExporter();
            const result = exporter.parse(scene);
            saveString(result, 'object.obj');
        }

        function save(blob, filename) {
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        }

        function saveString(text, filename) {
            save(new Blob([text], { type: 'text/plain' }), filename);
        }

    }  // init
    function makeLabel(tx, x = 2, y = 2, z = 2, s = "14px") {
        var divlabl = document.createElement('div');
        divlabl.className = 'label';
        divlabl.textContent = tx
        // divlabl.style.backgroundColor = 'transparent';
        divlabl.style.fontSize = s
        // divlabl.style.textOverflow="wrap"
        divlabl.style.height = "122px"
        divlabl.style.width = "200px"
        divlabl.style.color = "#333333"

        var labl = new CSS2DObject(divlabl);
        labl.position.set(x, y, z);

        // labl.layers.set(0);
        // labl.center.set(0, 0);
        return labl
    }

    function onWindowResize() {
        // camera.aspect = window.innerWidth / window.innerHeight;
        // camera.updateProjectionMatrix();
        // renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {

        requestAnimationFrame(animate, renderer.domElement);
        controls.update();
        // stats.update();
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
    }
}

window.magie=magie

let kk
let qs = window.location.href.split("?")[1] || ""
if (qs.length > 5) {
    // alert(qs)
    kk = decodeqs(qs)
} else {
    kk = ""
}
magie(kk)
// Bind a change handler to the window location.
// $(window.location).bind(
//     "change",
//     function () {
//         let kk
//         let qs = window.location.href.split("?")[1] || ""
//         if (qs.length > 5) {
//             // alert(qs)
//             kk = qs.replace(/_[+]_/g, "\n").replace(/__/g, " ")
//         } else {
//             kk = ""
//         }
//         magie(kk)
//     }
// );
