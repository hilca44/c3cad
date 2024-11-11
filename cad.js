import { } from "./config.js";
var s = {}
var pp = "public/cad/"
var regcomma = /[,]/
const PARTS = "lrgtfbcve"
const PMETER1 = "xyzwdhmg"
const CHARS = "_.,@"

var sess = {
    'rr': "first value",
    'ro': "",
    'rr1': "",
    'rr2': "",
    'err': "",
    'err2': "",
    'erro': "",
    m2: 9,
    'lastinsertid': -2,
    'aid': 0,
    'oid': 10,
    rowsadr: [],
    ords: [{}],
    men: "",
    hmen: "",
    'sw': "",
    'ii': {},
    'filter': "",
    url: [],
    cmdhis: []
}

class Ses {
    constructor() {
        this.aid = -9
        this.oid = 9
        this.cid = -9
        this.id = 2
        this.t = 'ord'
        this.cmd = 'xxx'
        this.fil
        this.filter = ""
        this.sw = ""
        this.db = "fakt3curr.db"
    }
}

var se = new Ses


function dd(pp) {
    let rr = JSON.stringify(pp)
    console.log(rr)
    // rr = rr.replace(/\s/igm, "<br>")
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

/////////////////////////////////////
export class Proj {
    constructor(inn) {
        this.inn = inn
        this.scr = ""
        this.line = ""
        this.inntest = []
        this.kkkkkk = []
        this.fn = ""
        this.sess = {
            eee: ""
        }
        this.omat = {}
        this.ovar = {}
        this.lpa = []
        this.lms = []  // list of mat
        this.lparts = []
        this.lbes = []  // list beschlag
        this.kosc = ""
        this.hol = "ko pa amou W D H kw kd kh\n"
        this.eur = 0
        this.m2 = {}
        this.qa = 8
        this.angtex = ""
        this.lastko = ""
        this.vs = {} // all obj key=first entry
        this.matlegend = ""
        this.ogs = {}
        this.oosc = {}
        this.ok = {}
        this.oks = {}
        this.ovs = {}
        this.oinko = {}
        this.stl = []
        this.out = ""
        this.lws = []  // list angrb test
        this.opas = {}
        this.mod = 0  // 1 klammer is open
        this.lins = []
        this.sess.err = ""
        this.sess.erro = ""
        this.allRowsToVar()
        try {
            let eee = this.createListMaKoPaVaFromInn()
            if (eee == 0) { return this }

        } catch (error) {
            // this.sess.err = error.stack
            alert(error + "\n" + error.stack)
            this.sess.err = this.sess.err + error.stack
        }
    }

    getall() {
        return this
    }

    createListMaKoPaVaFromInn(kopa) {
        var ko
        this.matlegend = "Verwendete Materialien:: "
        // alert(dd(this.vs))

        let linn = this.inn.trim().split("\n")
        if (/^!m/.test(linn[0])) {
            this.newMat("m0 2 ei 22 2 #eiche")
        }
        for (var m of linn) {
            // alert(m)
            m = m.trim()
            if (/^[># ]/.test(m)) {
                continue
            } else if (/^m\d /.test(m)) {
                this.newMat(m)

                // innput for korp
            } else if (/^[a-z]/.test(m)) {
                this.line = m
                ko = this.new__Korp(m)
                if (ko == 0) { return 0 }

                this.oks[ko.nme] = { ...ko }
                this.out += "\n" + ko.osc
                // this.lastko = ko.nme
            }
        }


        // var exec = require('child_process').exec;

        // exec("echo '" + this.hol + "' > " + cf.HOM+"/pali/111222hl.txt",
        //     function (error, stdout, stderr) {
        //         console.log('stdout: ' + stdout);
        //         console.log('stderr: ' + stderr);
        //         if (error !== null) {
        //             console.log('exec error: ' + error);
        //         }
        //     });
        // exec("python3 "+cf.HOM+"/pali/partslist2tcn.py '" + this.hol.trim("\n").trim("\r") + "' " + this.fn,
        //     function (error, stdout, stderr) {
        //         console.log('stdout: ' + stdout);
        //         console.log('stderr: ' + stderr);
        //         if (error !== null) {
        //             console.log('exec error: ' + error);
        //         }
        // });
    }




    allRowsToVar() {
        let linn = this.inn.trim().split("\n")

        for (var m of linn) {
            // // all rows to vs
            // let m2=this.replVars(m)
            let kv = m.trim().split(" ")
            this.ovs[kv[0].toUpperCase()] = kv.slice(1).join(" ")
        }
        for (var m in this.ovs) {
            this.ovs[m] = this.replVars(this.ovs[m])
        }
    }

    // calcm2mat moved to mod2

    newMat(m) {
        m = this.trimInput(m)  // mk blocks
        var lbs = this.makeblocks(m) // mk blocksv
        let i, sho
        i = lbs
        if (/#/.test(m)) {

            var d = m.trim().split("#")
            sho = d[1]
        } else {
            sho = m.slice(0, 2)
        }
        var mat
        // for(var i of lmi){
        mat = {
            nme: i[0][1],
            s: Number(i[1]),
            co: i[2],
            p: i[3],
            v: i[4],
            ma: sho,
            uml: 0,  // umleimer
            m2: 0,
            short: i[2] + i[1].replace(".", ""),
            wor: []
        }
        // for (let w of lbs) {
        //     if (Object.keys(cf.diwo).includes(w.slice(0, 4))) {
        //         mat.wor.push([w.slice(0, 4), w.slice(4)])
        //     }
        // }
        this.matlegend += " " + mat.short + ": "
            + mat.ma + " " + mat.s + " cm / "
        this.lms.push(mat)
        let naam = ("m" + mat.nme).toUpperCase()
        // this.ovs[naam] = mat.s


    }


    mv(r) {
        let a = r.split("mv")[1].trim().split(" ")
        return "translate([" + a[0] + "," + a[1] + "," + a[2] + "])"
    }


    newGroup(ro) {
        let ou = ""
        ou += " {"
        let li = ro.split(" ")[1].trim()
        for (let k of li) {
            ou += this.oks[k].osc
        }
        ou += " } "
        this.ogs[ro[1]] = ou
        return ou
    }
    ///////////////////////////////////////////////////////



    new__Korp(innk) {
        // this.sess.err = ""
        // this.sess.check=[]
        var ko = {
            x: 0,  // offset x
            y: 0,
            z: 0,
            nme: "sw",
            nx: [1, 0],
            ny: [1, 0],
            nz: [1, 0],
            co: "bu",  // cupboard 0-9 od [], fachboden
            d: 0,  // depth
            xx: 0.05,  // gap
            xy: 0.05,  // gap
            xz: 0.05,  // gap
            h: 0,
            innk: innk, // input
            j: "",
            lbs: [],  // list of blocks
            m: 0,  // material
            ox: 0,  // rotate x
            oy: 0,  // rotate y
            oz: 0,  // rotate z
            s: 2,
            w: 0,  // width
            xx: 0,  // zero point of korp
            yy: 0,  // zero point of korp
            zz: 0,  // zero point of korp
            pats: {}
        }

        // this.sess.err2 = ""
        ko.innk = this.replVars(ko.innk)
        ko.innk = this.replVars(ko.innk)
        ko.lbs = this.makeblocks(ko.innk)  // mk blocks
        this.wdh(ko)
        this.makeKom(ko)
        this.makeKoxyz(ko)
        let eee = this.markwrong(ko)
        if (eee == 0) { return 0 }
        this.makeParts_step1(ko)
        this.setMtoParts(ko)
        this.makeParts_step2(ko)
        this.makeKoRow(ko)
        this.makePaRow(ko)

        this.connect(ko)
        this.makePaxyz(ko)
        this.makeKoxyz(ko)
        this.cutFront(ko)
        this.spreadPa(ko)
        this.pushpullset(ko)  // before cutFront
        this.pushpulldo(ko)  // before cutFront
        this.makePaN(ko)
        this.makeKoN(ko)
        this.createN(ko)
        this.createNparts(ko)
        this.dividePa(ko)
        /// NN ///////////////////
        // let cps=this.createN(ko,this.oks )
        // for(let e of cps){
        //     this.oks[e.nme]={...e}
        // }

        function rou(li) {
            let nu = 0.0
            for (let e of li) {
                nu += Number(e)
            }

            return String(nu)
        }
        return ko
    } //

    makeblocks(inn) {
        inn = inn.trim()
        inn = inn.replace("  ", " ")
        return inn.split(" ")

    }
    wdh(ko) {
        ko.nme = ko.lbs[0]
        ko.j = ko.lbs[1]
        ko.w = Number(ko.lbs[2])
        ko.d = Number(ko.lbs[3])
        ko.h = Number(ko.lbs[4])

    }
    markwrong(ko) {

        let mark, com, re
        let bs = ko.lbs
        for (let e of bs[1]) {
            let re = new RegExp("[" + PARTS + "]+")
            if (!re.test(e)) {
                mark = bs[1].replace(e, "<mark>" + e + "</mark>")
                com = " second block: only parts"
                this.sess.eee = mark + com
                return 0
            }
        }
        // w
        re = new RegExp('[^0-9.]')
        if (re.test(bs[2])) {
            alert(bs[2])
            mark = "<mark>" + bs[2] + "</mark>"
            com = " 3. block: only numbers"
            this.sess.eee = mark + com
            return 0
        }
        // d
        re = new RegExp('[^0-9.]')
        if (re.test(bs[3])) {
            mark = "<mark>" + bs[3] + "</mark>"
            let com = " 4. block: only numbers"
            this.sess.eee = mark + com
            return 0
        }
        // h
        re = new RegExp('[^0-9.]')
        if (re.test(bs[4])) {
            mark = "<mark>" + bs[4] + "</mark>"
            com = " 5. block: only numbers"
            this.sess.eee = mark + com
            return 0
        }
        if (!/m[0-9]/.test(bs[5])) {
            mark = "<mark>" + bs[2] + "</mark>"
            let com = " 3. block: only numbers"
            this.sess.eee = mark + com
            return 0
        }

    }

    makeParts_step1(ko) {
        for (var pp of PARTS) {
            // if (PARTS.includes(pp)) {
            ko.pats[pp] = {
                s: ko.s,
                co: ko.co
            }

            // }
        }

    }


    setMtoParts(ko) {
        // set korpus material
        // if (1) {
        // set mat to parts
        // console.log(lpa, 'lpa')
        // ko.mid = block
        for (let e of ko.lbs) {
            let re = new RegExp("[" + ko.j + "]m[0-9]")
            if (re.test(e)) {
                ko.pats[e[0]].s = this.lms[Number(e[2])]["s"]
                ko.pats[e[0]].co = this.lms[Number(e[2])].co
                ko.pats[e[0]].m = e[2]
            }
        }
        var v
        var v2
        try {
            for (var pat in ko.pats) {
                if (ko.pats[pat]["m"] == null) {
                    v = ko.m

                } else {

                    v = ko.pats[pat]["m"]
                }
                if ("lrv".includes(pat)) {
                    ko.pats[pat]["w"] = this.lms[v]["s"]

                } else if ("gcet".includes(pat)) {
                    ko.pats[pat]["h"] = this.lms[v]["s"]
                } else if ("fb".includes(pat)) {
                    ko.pats[pat]["d"] = this.lms[v]["s"]
                }

                ko.pats[pat]["co"] = this.lms[v]["co"]
                ko.pats[pat]["m"] = this.lms[v]["nme"]
                ko.pats[pat]["s"] = this.lms[v]["s"]
            }

            // correct tx
            // if (ko.t) {

            //     ko.t.z -= ko.t.h
            // }
            if (ko.b) {
                ko.b.y -= ko.b.d
            }
        } catch (error) {
            console.log(error.stack)
        }
        // }
    }

    makeKom(ko) {
        // let i, m
        // i = 0
        // for (let e of ko.lbs.slice(2)) {
        //     // if (/^m.{0,11}[^_]/.test(e)) {
        //         if (/^m[0-9]/.test(e)) {
        //         m = Number(this.splita1(ko, ko, e)[1])
        //         i++
        //     }
        // }
        // if (i > 0) {

        //     ko.m = Number(m)
        // } else {
        //     ko.m = 0
        // }
        let nu = Number(/[ ]m[0-9]/.exec(ko.innk)[0][1]) || 0
        ko.s = this.lms[nu].s
        ko.co = this.lms[nu].co

    }



    makeParts_step2(ko) {
        var s = {
            l: 0,
            r: 0,
            g: 0,
            t: 0,
            c: 0,
            e: 0,
            b: 0,
            f: 0,
            v: 0,
            a: 0
        }

        function getp(pp, s) {
            var p = {
                l: {
                    w: ko.pats["l"].s,
                    d: ko.d,
                    h: ko.h - s.t - s.g,
                    x: -ko.xx,
                    y: s.f,
                    z: s.g
                },
                r: {
                    w: ko.s,
                    d: ko.d,
                    h: ko.h - s.t - s.g,
                    x: ko.w - ko.pats.r.s + ko.xx,
                    y: s.f,
                    z: s.g
                },
                g: {
                    w: ko.w - s.l - s.r,
                    d: ko.d - s.f - s.b,
                    h: ko.pats.g.s,
                    x: s.l,
                    y: s.f,
                    z: -ko.xz
                },
                t: {
                    w: ko.w - s.l - s.r,
                    d: ko.d - s.f - s.b,
                    h: ko.s,
                    x: s.l,
                    y: s.f,
                    z: ko.h + ko.xz - ko.pats.t.s
                },
                c: {
                    w: ko.w - s.l - s.r,
                    d: ko.d - s.b - s.f,
                    h: ko.pats.c.s,
                    x: s.l,
                    y: s.f,
                    z: ko.h / 2
                },
                e: {
                    w: ko.w,
                    d: ko.d - s.f - s.b,
                    h: ko.s,
                    x: ko.xx,
                    y: s.f,
                    z: ko.h / 2
                },
                b: {
                    w: ko.w - s.l - s.r,
                    d: ko.s,
                    h: ko.h - s.g - s.t,
                    x: s.l,
                    y: ko.d - s.b + s.f + ko.xy,
                    z: s.g
                },
                f: {
                    w: ko.w - s.l - s.r,
                    h: ko.h - s.g - s.t,
                    x: s.l,
                    d: ko.pats.f.s,
                    y: -ko.xy,
                    z: s.g
                    // it: 1,
                    // ir: 1,
                    // ig: 1,
                    // il: 1
                },
                v: {
                    w: ko.s,
                    d: ko.d - s.f - s.b,
                    h: ko.h - s.t - s.g,
                    x: ko.w / 2 - s.v / 2,
                    y: s.f,
                    z: s.g
                },
                a: {
                    w: ko.w,
                    d: ko.d,
                    h: ko.s,
                    x: 0,
                    y: 0,
                    z: ko.h
                }
            }
            return p[pp]
        }

        this.hol += ko.nme + " - - - - - " + eval(cc(ko.w) * 10) + " " + ko.d * 10 + " " + ko.h * 10 + "\n"
        var arra = []
        for (var pp of ko.j) {
            let o = getp(pp, s)
            s[pp] = ko.pats[pp].s
            ko.pats[pp] = Object.assign(ko.pats[pp], o)
            let v = ko.pats[pp]
            //ko.pats[pp]=Object.assign(ko.pats[pp], ko.k)
        }
    }


    // makeDIS(ko) {
    //     let w, k, v, lv, i
    //     i = 0
    //     for (let e of ko.lbs.slice(2)) {
    //         if (/[_].+[_]/.test(v)) {
    //             let f = this.poi(e, ko)
    //             ko[f[1]] = f[2]
    //         }
    //     }
    // }
    makeKoxyz(ko) {
        let f, i
        i = 0
        for (let e of ko.lbs.slice(2)) {
            let re = new RegExp("[" + PMETER1 + "][xyz]?[-@]{0,1}[0-9.]")
            if (re.test(e)) {
                f = this.splita1(ko, e)
                if (f[1][0] == "@") {
                    let v2 = f[1].slice(1)
                    ko[f[0]] = ko[f[0]] + Number(v2)
                } else {

                    ko[f[0]] = Number(f[1])
                }
            }
        }
    }

    makePaxyz(ko) {
        let i
        i = 0
        for (let e of ko.lbs.slice(2)) {
            let re = new RegExp("[" + PARTS + "][" + PMETER1 + "][=@]?[-+/*]?[0-9.]+")
            if (re.test(e)) {
                if (/@/.test(e)) {
                    let f = e.split("@")
                    let v2 = Number(f[1])
                    ko.pats[e[0]][e[1]] = ko.pats[e[0]][e[1]] + v2
                } else {
                    let f = this.poi(ko, e)

                    ko.pats[e[0]][e[1]] = f[2]
                }
            }
        }
        this.setMtoParts(ko)
    }

    spreadPa(ko){
        let re = new RegExp("[v][0-9][,]?[0-9]*")
        for (let e of ko.lbs.slice(2)) {
        if (re.test(e)) {
            var f=this.poi(ko, e)
            var  d=(ko.w-ko.pats.l.w)/f[2]
            for(let i=0; i<f[2]; i++){
                if(i>0){
                    var nm="c"+String(i)
                    ko.pats[nm]={...ko.pats.v}
                    ko.pats[nm].x=i*d
                }else{
                    ko.pats.v.x=d
                }
            }
        }
    }
    }

    dividePa(ko) {
        let i
        i = 0
        for (let e of ko.lbs.slice(2)) {
            let re = new RegExp("[" + PARTS + "]d[xyz][0-9][,]?[0-9]*")
            if (re.test(e)) {
                // alert(e)
                var f =this.poi(ko, e)
                let di
                if (f[1][1] == "x") {
                    di = "w"
                } else if (f[1][1] == "y") {
                    di = "d"
                } else if (f[1][1] == "z") {
                    di = "h"
                }

                
                
                if (/,/.test(e)) {
                    ko.pats[e[0]][di] = (ko.pats[e[0]][di] -f[2][1]*(f[2][0]-1))   / f[2][0]
                    for (let i = 0; i < f[2][0]; i++) {
                        ko.pats[nm] = { ...ko.pats[e[0]] }
                        ko.pats[nm][e[2]] = ko.pats[nm][e[2]] + (ko.pats[nm][di] + f[2][1]) * i 
                    }
                } else {
                    ko.pats[e[0]][di] = ko.pats[e[0]][di] / f[2]
                    for (let i = 0; i < f[2]; i++) {
                        var nm=e[0] + String(i)
                    ko.pats[nm] = { ...ko.pats[e[0]] }
                        ko.pats[nm][e[2]] = ko.pats[nm][e[2]] + ko.pats[nm][di] * i
                    }

                }

            }
        }
        this.setMtoParts(ko)
    }

    makeKoRow(ko) {
        for (let e of ko.lbs.slice(2)) {
            let re = new RegExp("^[xyz][0-9-]+[,]")
            if (re.test(e)) {
                let f = this.poi(ko, e)
                ko[e[0]] = f[2][0]
                for (let i = 1; i < f[2].length; i++) {
                    let nnm = ko.nme + "_" + String(i)

                    this.oks[nnm] = { ...ko }
                    this.oks[nnm][e[0]] = f[2][i]
                }
            }
        }
    }
    makePaRow(ko) {
        for (let e of ko.lbs.slice(2)) {
            let re = new RegExp("[" + PARTS + "][xyz][0-9-]+[,]")
            if (re.test(e)) {
                let f = this.poi(ko, e)
                ko.pats[e[0]][e[1]] = f[2][0]
                for (let i = 1; i < f[2].length; i++) {
                    let nnm = e[0] + "_xxxxxxxxxxxxxx" + String(i)

                    ko.pats[nnm] = { ...ko.pats[e[0]] }
                    ko.pats[nnm][e[1]] = this.makeValue(f[2][i])
                }
            }
        }
    }

    connect(ko) {
        for (let e of ko.lbs.slice(2)) {
            if (/[_][0-9]/.test(e)) {
                ko = this.alignToKorp(ko, e)
            }
        }
    }
    makeKoN(ko) {
        for (let e of ko.lbs.slice(2)) {
            if (/^n[xyz][0-9][,]?/.test(e)) {
                var f = this.poi(ko, e)
                if (/[,]/.test(e)) {
                    ko[f[1]] = f[2]
                } else {
                    let di
                    if (f[1][1] == "x") {
                        di = ko.w
                    } else if (f[1][1] == "y") {
                        di = ko.d
                    } else if (f[1][1] == "z") {
                        di = ko.h
                    }
                    let a = [f[2], 0]
                    ko[f[1]] = a
                }
            }
        }
    }
    makePaN(ko) {
        for (let e of ko.lbs.slice(2)) {
            let re = new RegExp("[" + PARTS + "]n[xyz][0-9]")
            if (re.test(e)) {
                var f = this.poi(ko, e)
                if (/[,]/.test(e)) {
                    ko.pats[f[0]][f[1]] = f[2]
                } else {
                    let di
                    if (f[1][1] == "x") {
                        di = ko.pats[f[0]].w
                    } else if (f[1][1] == "y") {
                        di = ko.pats[f[0]].d
                    } else if (f[1][1] == "z") {
                        di = ko.pats[f[0]].h
                    }
                    let a = [f[2], di]
                    ko.pats[f[0]][f[1]] = a

                }
            }
        }
    }


    pushpullset(ko) {
        var def2 = {
            b: "trgl",
            f: "trgl",
            l: "wx",
            r: "w",
            g: "hz",
            t: "h",
        }
        let re, ar

        // set all i3
        re = RegExp("[" + PARTS + "][_]*[0-9]*i[,-.0-9]+", "g")
        ar = ko.innk.match(re)
        if (ar != null) {
            for (let e of ar) {
                let f = this.poi(ko, e)
                if (Array.isArray(f[2])) {

                } else {
                    for (let ee of def2[f[0]]) {
                        ko.pats[f[0]]["i" + ee] = f[2]
                    }
                }
            }
        }
        re = RegExp("[" + PARTS + "]i[lrgtbf][-.0-9]+", "g")
        ar = ko.innk.match(re)
        if (ar != null) {
            for (let e of ar) {
                let f = this.poi(ko, e)
                ko.pats[f[0]][f[1]] = f[2]
            }
        }
        for (let e in ko.pats) {
            if (/[f]_/.test(e)) {
                for (let f of ["it", "ir", "ig", "il"]) {
                    ko.pats[e][f] = ko.pats.f[f]
                }
            }
        }
    }
    pushpulldo(ko) {
        var pushpullpa = {
            b: "d",
            f: "dy", // change d and y
            l: "wx",
            r: "w",
            g: "hz",
            t: "h",
        }
        for (let e in ko.pats) {
            for (let f in ko.pats[e]) {
                if (/i[lrgtbf]/.test(f)) {
                    for (let ff of pushpullpa[f[1]]) {
                        if (/[wdh]/.test(ff)) {
                            ko.pats[e][ff] -= ko.pats[e][f]
                        } else {
                            ko.pats[e][ff] += ko.pats[e][f]
                        }
                    }
                }
            }
        }
    }


    poi(ko, e) {
        let koo = 0
        let p2 = 0 // part
        let k2  // key
        let v2 = [] // value
        let ee = this.splita1(ko, e)
        let k = ee[0]
        let v = ee[1]
        if (/[,]/.test(v)) {
            let t = v.split(",")
            for (let ee of t) {
                v2.push(Number(ee))
            }


        } else if (/@/.test(v)) {
            return v
        } else {
            v2 = Number(v)
        }

        let p
        // key
        if (/[.]/.test(k)) {
            var lk = k.split(".")
            koo = lk[0]
            p2 = lk[1][0]
            k2 = lk[1].slice(2)
        } else {
            // 2222222222222222222222
            if (k.length == 1) {
                k2 = k
            } else if (k.length == 2) {
                if (/[gtlrvcf]/.test(k[0])) {
                    p2 = k[0]
                    k2 = k.slice(1)
                } else {

                    k2 = k
                }
            } else if (k.length == 3) {
                p2 = k[0]
                k2 = k.slice(1)
            }
        }

        let res = [p2, k2, v2, koo]
        for (let er of res) {
            if (er == null) {
                this.sess.err = this.sess.err + "  error in::" + e
            }
        }
        console.log("fff" + JSON.stringify(res))
        return res
    }

    getDist(bl, di) {
        if (/=/.test(bl)) {
            let startend = bl.split("=")
            let p0 = this.getxyzfromcorner(startend[0], di)
            let p1 = this.getxyzfromcorner(startend[1], di)
            if (p0[0] > p1[0]) {
                return Math.abs(Number(p0[0]) - Number(p1[1]))
            } else {
                return Math.abs(Number(p0[1]) - Number(p1[0]))
            }
        } else {

            if (/[.]+[a-z]+/.test(bl)) {
                let ee = bl.split(".")
                return this.oks[ee[0]][ee[1]][ee[2]]
            } else {

                return bl
            }
        }
    }


    getxyzfromcorner(left, di) {
        let coo = [3, 4, 1]
        let start = left.split(".")
        let partcorn = this.splita1(ko, start[1])
        let h0 = this.cornersPart(this.oks[start[0]],
            start[1], 0)
        let h1 = this.cornersPart(this.oks[start[0]],
            start[1], coo[di])
        return [h0[di], h1[di]]
    }


    addToParent(ko) {
        if (/[\.]/.test(ko.nme)) {
            var paren = ko.nme.split(".")[0]
            var chil = ko.nme.split(".")[1]

            for (let kk in ko.pats) {
                // copy korpus to parent
                // if (paren == kk) {
                ko.pats[kk].z += ko.zz
                this.oks[paren].pats[chil + kk] = ko.pats[kk]
                // alert(dd(this.oks[paren]["pats"]))
                // }
            }
        }

        return ko
    }


    cutFront(ko) {
        // this.angtex+=ko.n+" St. "+ko.nme+" B"+ko.w+" T "+ko.h+" H"+ko.h+" H"+ko.d+" cm\n"
        for (let e of ko.lbs.slice(2)) {
            try {

                //front
                let re = new RegExp("[lrbfv][hw][0-9.-]+[,]")
                if (re.test(e)) {
                    console.log("cuut")
                    // if (/[lfrbv]/.test(e[0]) && /[.][hw]/.test(e)
                    //     && /[,]/.test(e)) {
                    let f = this.poi(ko, e)

                    let di  // direction
                    if (e[1] == "h") {
                        di = "z"
                    } else if (e[1] == "w") {
                        di = "x"
                    }
                    let max = ko[e[1]]
                    max = ko[e[1]]
                    let zzz = 0
                    let nnm
                    for (let i = 0; i < f[2].length; i++) {
                        if (f[2][i] > 0) {
                            if (i == 0) {
                                nnm = e[0]
                            } else {
                                nnm = e[0] + "____________" + i

                                ko.pats[nnm] = { ...ko.pats[e[0]] }
                            }
                            ko.pats[nnm][di] = zzz
                            if (f[2][i] == 1) {
                                ko.pats[nnm][e[1]] = max - zzz
                                return
                            }
                            zzz = zzz + f[2][i]
                            ko.pats[nnm][e[1]] = f[2][i]

                        } else {

                            zzz = zzz + f[2][i] * -1
                        }
                    }
                }

            } catch (err) {
                console.log(err)
            }
        }

        return ko
    }


    trimInput(ko) {
        ko = ko.trim()
        ko = ko.replace("  ", " ")
        return ko
    }

    /**
     *
     * @param {*} ko
     * @param {*} k
     * @param {*} v
     * @param {*} p
     * @returns
     */
    fx(ko, p, k, v) {
        if (p == 0) {
            ko[k] = this.makeValue2(v)
        } else {

            // for(let e of p[0]){
            ko.pats[p][k] = this.makeValue2(v)
            // }
        }
        return ko
    }


    createN(ko) {
        if (eval(ko.nx[0] + ko.ny[0] + ko.nz[0]) > 3) {
            for (var j = 0; j < ko.nx[0]; j++) {
                for (var jj = 0; jj < ko.ny[0]; jj++) {
                    for (let jjj = 0; jjj < ko.nz[0]; jjj++) {
                        var nn = String(ko.nme + j + jj + jjj)
                        let se = {}
                        // alert(nn+"-"+jjj)
                        let kk = { ...ko }
                        kk.x = ko.x + j * (ko.nx[1] + ko.w)
                        kk.y = ko.y + jj * (ko.ny[1] + ko.d)
                        kk.z = ko.z + jjj * (ko.nz[1] + ko.h)
                        kk["nx"] = [1, 0]
                        kk["ny"] = [1, 0]
                        kk["nz"] = [1, 0]
                        kk["nme"] = nn

                        this.oks[nn] = kk
                    }
                } // end nz korp
            } // end ny korp
        } // end n korp
        // if(k.nz[0]>1){
        return ko
    }  // end createK

    createNparts(ko, pa) {
        for (pa in ko.pats) {
            var nx = ko.pats[pa].nx || [1, 0]
            var ny = ko.pats[pa].ny || [1, 0]
            var nz = ko.pats[pa].nz || [1, 0]
            if (eval(nx[0] + ny[0] + nz[0]) > 3) {
                for (var j = 0; j < nx[0]; j++) {
                    for (var jj = 0; jj < ny[0]; jj++) {
                        for (let jjj = 0; jjj < nz[0]; jjj++) {
                            var nn = String(pa + j + jj + jjj)
                            // alert(nn+"-"+jjj)
                            let kk = { ...ko.pats[pa] }
                            kk.x = ko.pats[pa].x + j * (nx[1] + ko.pats[pa].w)
                            kk.y = ko.pats[pa].y + jj * (ny[1] + ko.pats[pa].d)
                            kk.z = ko.pats[pa].z + jjj * (nz[1] + ko.pats[pa].h)
                            kk["nx"] = [1, 0]
                            kk["ny"] = [1, 0]
                            kk["nz"] = [1, 0]
                            kk["nme"] = nn

                            ko.pats[nn] = kk
                        } // end nz korp
                    } // end ny korp
                } // end n korp
            }
        }
        // if(k.nz[0]>1){
        return ko
    }  // end createK




    set1mToPart(ko, p, v) {
        // set korpus material
        // if (1) {
        // set mat to parts
        // console.log(lpa, 'lpa')
        // ko.mid = block
        // for (var pz in ko.pats) {
        ko.pats[p]["s"] = cc(this.lms[v]["s"])  // lms[0], lms[1], ...
        ko.pats[p]["co"] = this.lms[v]["co"]
        ko.pats[p]["m"] = this.lms[v]["nme"]
        // }
        // }
        return ko
    }


    /**
     * always: trglfb
     * positive value shrinks
     * negative value grows
     * one value: 3 = margin all sides
     * 2 values: 3,10 = top/bottom and left/right
     * @param {*} p part
     * @param {*} v value
     */
    setMargin(k, v, p) {
        if (!Array.isArray(v)) {
            v = [v]
        }
        // alert("value: " + v + '; len: ' + v.length)
        let a = {
            l: { 1: ["tgfb"], 2: ["tg", "fb"], 4: ["t", "f", "g", "b"] },
            r: { 1: ["tgfb"], 2: ["tg", "fb"], 4: ["t", "f", "g", "b"] },
            v: { 1: ["tgfb"], 2: ["tg", "fb"], 4: ["t", "f", "g", "b"] },
            t: { 1: ["lrfb"], 2: ["lr", "fb"], 4: ["r", "l", "f", "b"] },
            g: { 1: ["lrfb"], 2: ["lr", "fb"], 4: ["r", "l", "f", "b"] },
            c: { 1: ["lrfb"], 2: ["lr", "fb"], 4: ["r", "l", "f", "b"] },
            e: { 1: ["lrfb"], 2: ["lr", "fb"], 4: ["r", "l", "f", "b"] },
            f: { 1: ["tlgr"], 2: ["tg", "lr"], 4: ["t", "r", "g", "l"] },
            b: { 1: ["tlgr"], 2: ["tg", "lr"], 4: ["t", "r", "g", "l"] },
        }
        let iiii = {
            t: 0,
            r: 0,
            g: 0,
            l: 0,
            f: 0,
            b: 0,
        }
        let j = 0
        for (let aa of a[p][v.length]) {  // ["r", "l", "f", "b"]
            for (let jj = 0; jj < aa.length; jj++) {
                iiii[aa[jj]] = cc(v[j])
                k.pats[p]["i" + [aa[jj]]] = cc(v[j])
            }
            j++
        }

        var e = k.pats[p]
        e.w = e.w - e["il"] - e["ir"]
        e.d = e.d - e["if"] - e["ib"]
        e.h = e.h - e["ig"] - e["it"]
        e.x = e.x + e["il"]
        e.y = e.y + e["if"]
        e.z = e.z + e["ig"]
        return k // [3,3,3,3]
    }


    makeValue2(s, prop, part = "l") {
        try {
            if (s.length > 1) {
                return s
            } else {
                return eval(s[0])
            }

        } catch (error) {
            this.sess.err = this.sess.err + "false value: " + s + " in line: " + this.line
        }
    }

    makeValue(s, prop, part = "l") {
        try {
            let ss = []
            if (/@/.test(s)) {
                return s
            }
            if (regcomma.test(s)) {

                ss = s.split(",")
                if (ss == null) {
                    return 4.4
                }
                let anum = []
                for (let e of ss) {
                    anum.push(cc(e))
                }
                return anum
            } else {
                return cc(s)
            }

        } catch (error) {
            this.sess.err = this.sess.err + "false value: " + s + " in line: " + this.line
        }
    }



    // VARI 55 search for VARI replace 55
    replVars(r) {

        // for (var e in this.vs) {
        //   let rea = new RegExp("[\$]" + e, "g")
        //   if (rea.test(r)) {
        //     r = r.replace(rea, this.vs[e])

        //   }

        // }
        for (var e in this.ovs) {
            let re = new RegExp("(?<![A-Z])" + e + "(?![A-Z])", "g")
            // let re = new RegExp("(?<!^)" + e, "g")
            r = r.replace(re, this.ovs[e])
            // console.log(re + ":" + this.ovs[e] + " hee")
        }
        return r
    }


    // search (a.b.w)
    replForeignParams(k) {
        // let lpams =r.trim().replace("  ", " ").split(" ")
        // for (var e of lpams) {
        let lo = /(?<=[(])[^)]*(?=[)])/g.exec(k.innk)
        // alert(dd(lo))
        if (lo == null) return k
        for (let e of lo) {
            let par = e.split(".")
            // if(this.iserr( lo,r,"partsval"+r)) continue
            if (par.length == 2) {
                k.innk = k.innk.replace("(" + e + ")", this.oks[par[0]][par[1]])
            } else if (par.length == 3) {
                // alert(dd(lo))
                k.innk = k.innk.replace("(" + e + ")", this.oks[par[0]]["pats"][par[1]][par[2]])
            }
        }
        return k
    }


    alignToKorp(ko, v) {
        // < =   align to korp
        /////////////////////////////////
        /*///////////////////////////////
        5 --- 6
        /.  / |
        1 --- 2  |
        | 4 . |. 7
        |.  | /
        0 --- 3
        /////////////////////////////////
        /////////////////////////////////
        */
        var korp, part, np, co, p
        var li
        //  = v.split(/(?<=[a-z])(?![a-z\.])/)
        li = v.split("_")
        p = li[0]
        co = li[1]
        // 3d3 select corner of current
        if (/[\.]/.test(p)) {
            if (co > 9) {
                let lpa = p.split(".")
                let a = co[0]
                let b = lpa[0]
                let c = co[1]
                np = this.corners(b, c)
                korp = this.oks[lpa[0]]
                np = this.cornersPart(korp, lpa[1], co)
                let curr = this.cor(ko, a)
                console.log("jjjj")
                ko.x = np[0] + curr[0]
                ko.y = np[1] + curr[1]
                ko.z = np[2] + curr[2]
            } else {

                let lpa = p.split(".")
                korp = this.oks[lpa[0]]
                np = this.cornersPart(korp, lpa[1], co)
                ko.x = np[0]
                ko.y = np[1]
                ko.z = np[2]
            }

        } else if (co > 9) {
            let a = co[0]
            let b = this.oks[p]
            let c = co[1]
            np = this.corners(b, c)
            let curr = this.cor(ko, a)
            console.log("jjjj")
            ko.x = np[0] + curr[0]
            ko.y = np[1] + curr[1]
            ko.z = np[2] + curr[2] + b.z // todo dont know why only here b.z

        } else {
            korp = this.oks[p]
            np = this.corners(korp, co)
            ko.x = np[0]
            ko.y = np[1]
            ko.z = np[2]
        }
        console.log("lill")
        return ko
    }




    splita1(ko, s) {
        if (/[\=]/.test(s)) {
            let f = s.trim().split("=")
            if (/[lrgtbf][xyzwdhs][\+\-/\*]?[0-9]*/.test(f[1])) {
                f[1] = String(ko.pats[f[1][0]][f[1][1]]) + f[1].slice(2)
                return [f[0], eval(f[1])]
            }
        } else {
            return s.split(/(?<=[a-z])(?![a-z])/)
        }
    }



    corners(k, corner) {
        let a = k.oz * Math.PI / 180
        let c = 90 * Math.PI / 180
        var b = Math.atan(k.d / k.w)
        var dia = k.w / Math.cos(b)
        var cs = [
            // 0
            [k.x,
            k.y,
            k.z
            ],  // np
            // 1
            [
                k.x,
                k.y,
                k.z + k.h],  // left top
            // 2
            [
                k.x + k.w * Math.cos(a),
                k.y + k.w * Math.sin(a),
                k.z + k.h
            ],  // right top
            // 3
            [
                k.x + k.w * Math.cos(a),
                k.y + k.w * Math.sin(a),
                k.z
            ],  // right bottom
            // 4
            [
                k.x + k.d * Math.cos(a + c),
                k.y + k.d * Math.sin(a + c),
                k.z],  // bac bott left bottom

            // 5
            [
                k.x + k.d * Math.cos(a + c),
                k.y + k.d * Math.sin(a + c),
                k.z + k.h],  // bac bott left bottom

            // 6
            [
                k.x + (dia) * Math.cos(a + b),
                k.y + (dia) * Math.sin(a + b),
                k.z + k.h],  // bac bott left bottom
            //  7
            [
                k.x + (dia) * Math.cos(a + b),
                k.y + (dia) * Math.sin(a + b),
                k.z],  // bac bott left bottom

        ]

        return cs[corner]
    }


    cornersPart(k, pa, corner) {
        let p = k.pats[pa]
        let a = k.oz * Math.PI / 180
        let c = 90 * Math.PI / 180
        let ir = p.ir || 0
        var corners = [
            // 0
            [k.x,
            k.y
                , p.z
            ],  // np
            // 1
            [
                p.x,
                p.y,
                p.z + p.h],  // left top
            // 2
            [
                p.x + p.w,
                0,
                p.z + p.h
            ],  // right top
            // 3
            [p.x + p.w - ir,
            p.y,
            p.z
            ],  // right bottom
            // 4
            [p.x, p.y + p.d, p.z],  // bac bott left bottom

            // 5
            [
                p.x,
                p.d,
                p.z + p.h],  // bac bott left bottom

            // 6
            [
                p.w,
                p.d,
                k.z + k.h],  // bac bott left bottom
            //  7
            [
                k.x + (dia) * Math.cos(a),
                k.y + (dia) * Math.sin(a),
                k.z],  // bac bott left bottom

        ]
        // return corners[corner]
        let px = corners[corner][0]
        let py = corners[corner][1]
        let f = [0, 0, 0]
        if (px == 0) {
            f = [
                k.x + p.y * Math.cos(a + c),
                k.y + p.y * Math.sin(a + c),
                k.z + corners[corner][2]]
        } else {

            var b = Math.atan(py / px)
            var dia = px / Math.cos(b)
            //  var dia=Math.sqrt((px*px+py*py))
            f = [
                k.x + (dia) * Math.cos(a + b),
                k.y + (dia) * Math.sin(a + b),
                k.z + corners[corner][2]]
        }
        return f
    }

    cor(k, corner) {
        let a = k.oz * Math.PI / 180
        let c = 90 * Math.PI / 180
        var b = Math.atan(k.d / k.w)
        var dia = k.w / Math.cos(Math.atan(k.d / k.w))
        var corners = [
            // 0
            [0, 0, 0],  // np
            // 1
            [
                0,
                0,
                // -k.w*Math.cos(a+c),
                -k.h],  // left top
            // 2
            [
                -k.w * Math.cos(a),
                -k.w * Math.sin(a + c),
                -k.h
            ],  // right top
            // 3
            [
                -k.w * Math.cos(a),
                -k.w * Math.sin(a),
                0
            ],  // right bottom
            // 4
            [
                -k.d * Math.cos(a + c),
                -k.d * Math.sin(a + c),
                k.z],  // bac bott left bottom

            // 5
            [
                -k.d * Math.cos(a + c),
                -k.d * Math.sin(a + c),
                -k.h],  // bac bott left bottom

            // 6
            [
                k.x + (dia) * Math.cos(a + b),
                k.y + (dia) * Math.sin(a + b),
                k.z + k.h],  // bac bott left bottom
            //  7
            [
                -dia * Math.cos(a + b),
                -dia * Math.sin(a + b),
                -k.z],  // bac bott left bottom

        ]

        return corners[corner]
    }



    calcKorpM2(ko) {
        ko.m2 = {}
        ko.uml = 0
        // dd(ko,"ttt")
        for (var e in ko.pats) {
            //// dd(e.m2, "korp calcm2 e.m2")
            if (ko.p[e.nme + "s"] == 0 || ko.p[e.nme] == 0) {
                continue
            }

            if (!ko.m2[ko.opas[e].mid]) {
                ko.m2[ko.opas[e].mid] = 0
            }
            ko.m2[ko.opas[e].mid] += ko.opas[e].m2
        }
        return ko
    }



}  // end class
// exports.Proj
