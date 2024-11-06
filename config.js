var HOM ="~/c3cad"
const CAD = HOM + "/public/cad"

var hsatz = 50  // Stundensatz
var msatz = hsatz / 60  // Minutensatz
const WUG = 0.2
const verschn = 1.3
var pdf = 0


var briefk = ` 
Schreiner

`

var dmat = {
    "leim38eike": [38, 115, "Leimholz Eiche, keilgezinkt"],
    "daem10": [10, 12, "Dämmplatte natur"],
}

function anz(o, n){
    return n
}

function laenge(o){
    return o.w
}

function umf(o,n){
    var m =0
    m +=2*o.w
    m +=2*o.h
    return m/100
}


function qm(o,n){
    var m =0
    m +=2*o.w
    m +=2*o.h
    return o.w*o.h/10000
}

function getwor(arr, o, n){
    var di={}
    di.europrost=arr[0]
    di.nm=arr[1]
    di.n=arr[2](o, n)
    di.uni=arr[3]
    di.geg=arr[4]
    di.ep=di.europrost+di.n*di.nm*hsatz/60
    di.gp=di.n*di.ep
    // di.row= di.n+" "+arr[3]+"  "+arr[4]+" a "+di.nm+" Euro/"+arr[3]+" = "+di.eu
    return [di.n,di.uni,di.geg,di.ep.toFixed(2),di.gp.toFixed(2)]
}
/**
 * euro/stueck, min, function amount, unit, description
 */
var diwo = {
    "3fac": [200, 150, anz, "St", ""],  // 3fach verriegelung incl. pz und garnitur
    "zeit": [0, 1, anz, "St", "Sonderarbeit (min)"],  // frei pos zeit
    "zusc": [0, 2, umf, "m", "Zuschnitt"]  // zuschnitt 4 min oder beck
}
