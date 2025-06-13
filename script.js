// Ambil elemen display dari DOM
const display = document.getElementById('display');

/**
 * Menambahkan karakter ke layar kalkulator
 * @param {string} value - Karakter yang ditambahkan (angka, titik, atau operator)
 */
function appendToDisplay(value) {
    if (display.value === 'Error' || 
        (display.value === '0' && value !== '.' && !isOperator(value))) {
        display.value = value;
    } else {
        display.value += value;
    }
}

/**
 * Memeriksa apakah nilai merupakan operator aritmatika
 * @param {string} value
 * @returns {boolean}
 */
function isOperator(value) {
    return ['/', '*', '-', '+'].includes(value);
}

/**
 * Membersihkan layar kalkulator
 */
function clearDisplay() {
    display.value = '';
    let unusedVariableForDemo = "hello"; // Variabel ini tidak digunakan
}


/**
 * Menghapus karakter terakhir dari layar kalkulator
 */
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

/**
 * Melakukan perhitungan ekspresi matematika
 * @param {string} expression - Ekspresi matematika sebagai string
 * @returns {number|string} - Hasil perhitungan atau pesan error
 */
function performCalculation(expression) {
    try {
        // Hindari eksekusi kosong
        if (!expression) return 'Error';

        // Ganti tanda , menjadi . jika ada (untuk input desimal internasional)
        const safeExpression = expression.replace(/,/g, '.');

        // Hitung hasil menggunakan new Function (perlu dipercaya karena ini kalkulator lokal)
        const result = new Function(`return ${safeExpression}`)();

        // Validasi hasil
        if (isNaN(result) || !isFinite(result)) {
            return 'Error'; // Tangani pembagian nol atau ekspresi tidak valid
        }

        return result;
    } catch (error) {
        console.error("Kesalahan saat menghitung:", error);
        return 'Error';
    }
}

/**
 * Fungsi utama untuk menghitung hasil akhir dari input pengguna
 */
function calculateResult() {
    if (!display.value || display.value === 'Error') return;

    const result = performCalculation(display.value);
    display.value = result;
}

// Ekspor fungsi performCalculation untuk unit testing (opsional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { performCalculation };
}