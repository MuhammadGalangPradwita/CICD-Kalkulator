// tests/calculator.test.js

/**
 * Fungsi performCalculation sederhana untuk tujuan pengujian.
 * Ini adalah versi mock/fungsi asli yang bisa diganti dengan import sebenarnya jika tersedia.
 *
 * @param {string} expression - Ekspresi matematika dalam bentuk string.
 * @returns {number|string} - Hasil perhitungan atau 'Error'.
 */
function performCalculation(expression) {
    try {
        if (!expression) return 'Error';

        // Ganti koma dengan titik untuk input desimal internasional
        const safeExpression = expression.replace(/,/g, '.');

        const result = new Function('return ' + safeExpression)();
        
        if (isNaN(result) || !isFinite(result)) {
            return 'Error';
        }

        return result;
    } catch (error) {
        return 'Error';
    }
}

/**
 * Fungsi utilitas untuk mengevaluasi hasil tes.
 * @param {boolean} condition - Kondisi tes yang diharapkan.
 * @param {string} message - Pesan tes.
 */
function assert(condition, message) {
    if (condition) {
        console.log(`✅ LULUS: ${message}`);
        testsPassed++;
    } else {
        console.error(`❌ GAGAL: ${message}`);
        testsFailed++;
        process.exitCode = 1; // Set exit code untuk CI/CD
    }
}

/**
 * Menjalankan semua tes unit.
 */
function runTests() {
    console.log("--- Memulai Tes Unit Kalkulator ---\n");

    // Tes dasar operasi aritmatika
    assert(performCalculation("2+2") === 4, "Penjumlahan: 2+2 harusnya 4");
    assert(performCalculation("5-3") === 2, "Pengurangan: 5-3 harusnya 2");
    assert(performCalculation("4*3") === 12, "Perkalian: 4*3 harusnya 12");
    assert(performCalculation("10/2") === 5, "Pembagian: 10/2 harusnya 5");

    // Tes urutan operasi
    assert(performCalculation("3+5*2-1") === 12, "Urutan operasi: 3+5*2-1 harusnya 12");

    // Tes pembagian dengan nol
    assert(performCalculation("1/0") === 'Error', "Pembagian dengan nol: 1/0 harusnya Error");

    // Tes nilai desimal
    assert(performCalculation("10/4") === 2.5, "Pembagian desimal: 10/4 harusnya 2.5");
    assert(performCalculation("3,5+1,5") === 5, "Input desimal dengan koma: 3,5+1,5 harusnya 5");

    // Tes ekspresi tidak valid
    assert(performCalculation("sqrt(4)") === 'Error', "Fungsi tidak didukung: sqrt(4) harusnya Error");
    assert(performCalculation("abc+123") === 'Error', "Input tidak valid: abc+123 harusnya Error");

    console.log("\n--- Tes Unit Selesai ---");
    console.log(`Total Tes: ${testsPassed + testsFailed}, Lulus: ${testsPassed}, Gagal: ${testsFailed}`);

    if (testsFailed > 0) {
        console.error("⚠️ Beberapa tes unit gagal!");
    } else {
        console.log("🎉 Semua tes unit berhasil!");
    }
}

// Inisialisasi counter
let testsPassed = 0;
let testsFailed = 0;

// Jalankan tes
runTests();