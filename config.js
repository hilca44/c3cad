var HOM ="/home/ch/cad10"
const CAD = HOM + "/public/cad"

var hsatz = 50  // Stundensatz
var msatz = hsatz / 60  // Minutensatz
const WUG = 0.2
const verschn = 1.3
var pdf = 0


var briefk = ` 
Schreinermeister Carsten Hilbert, Mobil: 0178-5514814, carsten.hilbert@gmail.com

KOSTENVORANSCHLAG

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
    "alu2": [5, 15, anz, "St", ""],  // aluwi
    "aluw": [45, 45, anz, "St", ""],  // aluwi
    "anub": [12, 25, anz, "St", ""],  // anuba haustuerband
    "apau": [0, 60, anz, "St", "Arbeitsplattenausschnitt"],  // cnc, einpressen
    "apum": [3, 20, anz, "St", "Umleimer f. Arbeitspl."],  // cnc, einpressen
    "apvb": [6, 60, anz, "St", "Verbindungsfräsung einschl. Verbinder"],  // cnc, einpressen
    "aufh": [6, 5, anz, "St", "Schrankaufhänger"],  // schrankaufhänger
    "ausk": [0, 45, anz, "St", ""],  // ausklinkung
    "bo08": [0, 1, anz, "St", ""],  // cnc bohr 18
    "bo18": [0, 3, anz, "St", ""],  // cnc bohr 18
    "botr": [0.2, 1, anz, "St", "Bodenträger 5mm"],  // bodentr
    "cncm": [0, 1.5, anz, "min", "CNC-Bearbeitungen"],  // cnc bearbeitung minuten
    "db12": [0.2, 4, anz, "St", ""],  // duebel 12mm
    "db8h": [0.2, 1, anz, "St", "Dübelverbindung"],  // duebel 8mm
    "euki": [15, 15, anz, "St", ""],  // eurokiste
    "fase": [0, 1.5, umf, "St", "Fase fräsen"],  // fase berechnet kantenlaenge
    "falz": [0, 1.5, laenge, "m", "Falz fräsen"],  // falz berechnet kantenlaenge
    "foli": [17, 15, anz, "St", ""],  // folie
    "geha": [0, 20, anz, "St", "Leiste auf Gehrung sägen"],  // gehrung
    "gehb": [0, 5, anz, "St", "Laengsseite auf Gehrung sägen"],  // gehrung
    "gele": [0, 5, anz, "St", "Gehrung"],  // Gehrung Leiste
    "gitt": [65, 45, anz, "St", ""],  // luftgitter
    "glal": [10, 0, umf, "m", "Glasleisten,"],  // frei pos mat
    "glei": [2, 5, anz, "St", "Möbelgleiter"],  // gleiter moebel
    "hobl": [0, 2, anz, "St", ""],  // hobeln je meter
    "htdi": [2, 15, anz, "St", ""],  // haustuer dichtung, meter angeben
    "htfa": [0, 25, anz, "St", ""],  // haustuer falz, meter angeben
    "htsb": [10, 25, anz, "St", ""],  // haustuer schliesblech
    "kabr": [0, 0.9, umf, "m", "Kanten brechen"],  // haustuer dichtung, meter angeben
    "klha": [9, 15, anz, "St", ""],  // kleiderhaken 3 haken
    "kloz": [1, 15, anz, "St", ""],  // haustuer dichtung, meter angeben
    "lack": [20, 180, qm, "qm", "lackieren"],  // lackieren je m2
    "leif": [0, 12, qm, "qm", ""],  // leimen flaeche pro m2
    "leim": [0.5, 12, anz, "St", ""],  // leimen je meter, mittelwert aus l und h
    "lero": [7, 15, anz, "St", ""],  // Lenkrolle bh 128
    "lore": [0, 2, laenge, "m", "Lochreihe, Bohrungen 5mm"],  // lochreihe min pro m, n wird errechnet
    "mate": [1, 0, qm, "qm", ""],  // frei pos mat
    "nute": [0, 2, laenge, "St", ""],  // nuten je m
    "oele": [10, 90, qm, "qm", "oelen"],  // oelen je m2
    "rwec": [0, 3, anz, "St", "Rückwand ausklinken"],  // rw ausklinkung
    "schf": [1, 15, qm, "qm", "schleifen"],  // schleifen aus l und h
    "schi": [65, 45, anz, "St", ""],  // laufschiene je meter
    "schl": [18, 30, anz, "St", ""],  // schloss
    "sctu": [33, 60, anz, "St", ""],  // schiebetuerbeschlag je garnitur
    "sili": [0.5, 1.5, anz, "St", ""],  //
    "socl": [0.5, 5, anz, "St", ""],  // sockelclipse, 0.5 Euro je Stueck, 5 min montage
    "sofu": [2, 5, anz, "St", "Möbelfüße, Kunst., höhenverstellbar"],  // sockelfuss, anreissen festschr
    "ta40": [0, 3, anz, "St", ""],  // cnc tasche 40x30x40
    "topf": [5, 5, anz, "St", "Topfscharniere"],  // topfscharnier
    "umle": [0.5, 1.5, umf, "m", "ABS-Umleimer"],  // umleimer
    "verb": [0.5, 4, anz, "St", "Verbinder"],  // cnc, einpressen
    "zeit": [0, 1, anz, "St", "Sonderarbeit (min)"],  // frei pos zeit
    "zusc": [0, 2, umf, "m", "Zuschnitt"],  // zuschnitt 4 min oder beck
}

// module.exports = {
// diwo,
// getwor,
// briefk,
// WUG,
// HOM,
// CAD
// }