const { expect } = require('chai');
const { tambah, kali, kurang, bagi } = require('./math');

describe('Pengujian Fungsi Matematika', function () {
    //TAMBAH
    it('seharusnya mengembalikan error saat menambahkan dengan null', function() {
        expect(() => tambah(2, null)).to.throw('Input tidak valid');
    });
    
    it('seharusnya mengembalikan error saat menambahkan string non-angka', function() {
        expect(() => tambah("abc", 4)).to.throw('Input tidak valid');
    });

    //kali
    it('seharusnya mengembalikan error saat mengalikan dengan null', function() {
        expect(() => kali(20, null)).to.throw('Input tidak valid');
    });    
    
    it('seharusnya mengembalikan 0 saat mengalikan string kosong dengan angka', function() {
        expect(kali("", 3)).to.equal(0);
    }); 
    
    //KURANG
    it('seharusnya mengembalikan positif saat mengurangkan 10 -(-5)', function() {
        expect(kurang(10, -5)).to.equal(15);
    });
    
    it('seharusnya mengembalikan negatif saat mengurangkan 5 - 10', function() {
        expect(kurang(5, 10)).to.equal(-5);
    });

    //BAGI
    it('seharusnya mengembalikan hasil positif saat membagi dua angka negatif', function() {
        expect(bagi(-10, -2)).to.equal(5);
    });

    it('seharusnya mengembalikan hasil positif saat membagi dua angka positif', function() {
        expect(bagi(10, 2)).to.equal(5);
    });
    
    
});