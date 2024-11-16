import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';
import { Proj } from "./cad.js";

// 
function dd(pp) {
    var rr
    rr = JSON.stringify(pp)
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
    // return sks.replace(/[ ]/g, "&").replace(/\n/g, "&&").replace(/#/g, "vvv")
    return encodeURI(sks)
}
// 
function decodeqs(sks) {
    // return sks.replace(/&&/g, "\n").replace(/&/g, " ").replace(/vvv/g, "#")
return decodeURI(sks)
}
var deb = 0
var unitfaktor = 10
var faktorm2 = 1000000
var faktorm = 1000
var g8
// session
var s = {}
var regcomma = /[,]/
/////////////////////////////////////////
let gui;
var container, stats, controls, light, ligh = 1;
var camera, scene, renderer, labelRenderer;
let theta = 0;
var radius = 0;
var bb = { x: 0, y: 0, z: 0 }
var explodeKorp = 1
var lgeos = {}
var mess = []

var group = new THREE.Group();
const loader = new THREE.TextureLoader();

const resTracker = new ResourceTracker();

const track = resTracker.track.bind(resTracker);
var colors = {
    fi: "cornsilk",
    wh: "white",
    bu: "wheat",
    gr: "snow",
    bl: "cornflowerblue",
    ei: "burlywood"
}
var mat = new THREE.MeshLambertMaterial({ color: '#336633' });
let edgmat = new THREE.LineBasicMaterial({ color: 0x000000 });
let edg, mes, wir
var koall = new THREE.Group()

///////
// new Proj(vorl, fn3).getall(function (pr) {

var pppp = []
var paarr = []
var meshgroup1 = {}
var holi = ""
/////////////////////////////////////////////////


export function magie(kkk = "") {


    if (kkk == "") {
        kk = $("#inn").val()
    } else {
        kk = kkk
        $("#inn").val(kk)
    }

    if (kk == "") {
        kk = decodeqs(kkk)
        $("#inn").val(kk)

    }
    if (kk == "") {

        kk = "m0 1.9 wh\nm1 2 ei\na lrgtbc 22 22 22 m0 bm1\n"
        $("#inn").val(kk)
    }
    // alert(kk)
    let s = kk
    // s = s.replace(/\n\n$/g, "\n")
    // s = s.replace(/[ ]{2,9}/g, " ")
    // let zuu = encodeqs(s)
    // let bbb = window.location.href.split("?")
    // // alert(bbb[0])
    // let uuu = bbb[0] + "?" + zuu
    // $("#save").attr("href", uuu)

    try {
        init(kk);
        animate();
    } catch (error) {
        alert(error + ":::" + error.stack)
    }
    let m2 = ""
    let i = 0
}

export function init(sks = "") {
    function sendsavebtn(sks) {
        // let sks = $("#inn").val()
        let s = sks.replace(/[ ]{2,9}/g, " ")
        let zuu = encodeqs(s)
        let bbb = window.location.href.split("?")
        // alert(bbb[0])
        let uuu = bbb[0] + "?" + zuu
        $("#save").attr("href", uuu)
    }

    if (sks == 1) {
        sks = $("#inn").val()
sendsavebtn(sks)
        up(sks)
        return
    }
    let qs = "?" + encodeqs(sks)
    let pr
    camera = new THREE.PerspectiveCamera(50, 700 / 500, 1, 100000);
    camera.up.set(0, 0, 1);

    camera.layers.enable(0); // enabled by default
    // camera.layers.enable(1);
    var light = new THREE.PointLight(0xffffff, 2.5, 0, 0);
    camera.add(light);

    camera.layers.enable(2);
    camera.layers.enable(3);
    camera.layers.enable(4);
    camera.layers.enable(5);
    camera.layers.enable(6);

    scene = new THREE.Scene();
    scene.background = new THREE.Color("ivory");
    scene.background = new THREE.Color("#666");

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


    const geometry = new THREE.BoxGeometry();
    ////////////////////////////////////
    ///////////////////////////////////////



    let tra, ee

    meshgroup1 = new THREE.Group("cc")

    var koarr = []
    //
    function up(s) {
        for (const cube of mess) {
            scene.remove(cube);
        }
        mess.length = 0;  // clears the cubes array

        resTracker.dispose()
        let pr = prr(s)
        proj(pr)
        // animate()
        // gu(s)
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
        },
        'downl': function () {
            exportToObj()
        }
    };

    var myObject
    function gu(sks) {
        var aks = sks.split("\n")

        // Init gui
        // var gui = new GUI({ container: document.getElementById('gu'), injectStyles: true });
        var gui = new GUI({ width: 60, injectStyles: true });
        if (sks != "") {
            myObject = {}
            for (let i = 0; i < aks.length; i++) {
                myObject["z" + i] = aks[i];

            }
        }




        if (sks != "") {

        } else {
            gui.add(myObject, 'krr0');   // Text Field
        }
        // gui.add(layers, 'update');

        ////////////////////////
        gui.add(layers, 'labl');
        gui.add(layers, 'dime');
        gui.add(layers, 'downl');
        // gui.add(layers, 'wire');
        // gui.add(layers, 'korp');
        // gui.add(layers, 'back');
        gui.add(layers, 'fron');
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
        $("#ddc").html(dd(pr))
    }
    ////////////////////////
    ////////////////////////

    /**
     *
     * @param {*} k
     * @returns
     */
    function createK(k, nme) {
        var g = new THREE.Group()
        // korpus parts ///////////
        for (let e1 in k.pats) {
            if(k.pats[e1].w==0){
                continue
            }
            let n = makeM(k, e1, k.pats[e1])
            g.add(n)
        }  // end korpus parts
        return g
    }  // end createK


    ////////////////////////
    // korpus //////////////////////
    function proj(pr) {
        if (pr.sess.eee.length > 1) {
            $("#err").html(pr.sess.eee)
            $("#wrong").html("Wrong input:")

        } else {
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
            g8.position.set(cc(k.x), cc(k.y), cc(k.z))
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

    var a = Math.PI / 180

    //////////////////////////////////
    function makeM(k, e1, e) {
      
        var g2 = new THREE.Group()
        let lay = 2
        if (e1 == "b") {
            lay = 3
        } else if (e1 == "f") {
            lay = 4
        }

        var w = Number(e.w)
        let d = Number(e.d)
        let h = Number(e.h)
        let x = Number(e.x)
        let y = Number(e.y)
        let z = Number(e.z)

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
            x: Number((w * offset) + x),
            y: Number((d * offset) + y),
            z: Number((h * offset) + z)
        }
        let holir = e1 + " " + (e.w * 10).toFixed(0) + " " + (e.d * 10).toFixed(0)
        holir += " " + (e.h * 10).toFixed(0)
        let plab
        // plab = makeLabel(holir, 1 + po.x, 0, 0)
        // plab.layers.set(1);

        g2.add(mes)

// alert(po.x +e1)
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
    var wx=400
    var wy=600
    //////////////////////////////////
    container = document.getElementById('canvas');
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(wx,wy);
    renderer.setSize(window.innerWidth, window.innerHeight * 0.6);

    renderer.domElement.style.position = 'absolute';
    container.appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(wx,wy);
    labelRenderer.setSize(window.innerWidth, window.innerHeight * 0.6);
    labelRenderer.domElement.style.position = 'absolute';
    container.appendChild(labelRenderer.domElement);
    /////
    controls = new OrbitControls(camera, renderer.domElement, labelRenderer.domElement);
    const controls2 = new OrbitControls(camera, labelRenderer.domElement);

    const pointer = new THREE.Vector2();
    var ax = new THREE.AxesHelper(bb.x)
    ax.position.set(-bb.x / 2, -bb.y / 2, -bb.z / 2)
    scene.add(ax);
    
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);
    // camera.fov=100.0
    camera.position.y = Number(-(bb.x + bb.z))
    camera.position.x = Number(-bb.x * 1.2)
    camera.position.z = Number(bb.z / 4)

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
function makeLabel(tx, x = 2, y = 2, z = 2, s = "20px") {
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
    labl.position.set(Number(x), y, z);

    // labl.layers.set(0);
    // labl.center.set(0, 0);
    return labl
}

function animate() {

    requestAnimationFrame(animate, renderer.domElement);
    controls.update();
    // stats.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

window.magie = magie
window.init = init

let kk
let qs = window.location.href.split("?")[1] || ""
if (qs.length > 5) {
    // alert(qs)
    kk = decodeqs(qs)
} else {
    kk = ""
}
magie(kk)
