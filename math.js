function tambah(a, b) {
    if (a == null || b == null || isNaN(a) || isNaN(b)) {
        throw new Error('input tidak valid');
    }
        return Number(a) + Number (b);
} 

function kali(a, b) {
    if (a == null || b == null || isNaN(a) || isNaN(b)) {
        throw new Error('Input tidak valid');
    }
    return Number(a) * Number(b);
}

function kurang(a,b) {
    return a - b;
}
function bagi(a,b) {
    if (b === 0){
        throw new Error("Tidak bisa membagi dengan nol")
    }
    const result = a/b

    //Akan mengembalikan hasil dengan aturan positif/negatif
    if ((a< 0 && b>0) || (a > 0 && b < 0)) {
        return -Math.abs(result); // Negatif jika salah satu input negatif
    }
    return Math.abs(result); // Positif jika keduanya negatif atau keduanya positif
}

module.exports = {
    tambah,
    kali,
    kurang,
    bagi
}