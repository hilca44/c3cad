
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

export function pali(pr){
    var hol =""
    var arra          
}
