// Fungsi untuk halaman konsumen
function bookRoom(roomType) {
    alert(`Anda akan memesan ${roomType}. Silahkan isi form pemesanan di bawah.`);
    document.getElementById('roomType').value = roomType;
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// Form Pemesanan
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const roomType = document.getElementById('roomType').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const fullName = document.getElementById('fullName').value;
    
    // Simulasi validasi data
    if (!roomType || !checkIn || !checkOut || !fullName) {
        alert('Harap lengkapi semua field!');
        return;
    }
    
    // Enkripsi sederhana (simulasi)
    const encryptedData = btoa(JSON.stringify({
        room: roomType,
        checkIn: checkIn,
        checkOut: checkOut,
        name: fullName,
        timestamp: new Date().toISOString()
    }));
    
    alert(`Pemesanan berhasil!\n\nDetail:\nKamar: ${roomType}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nNama: ${fullName}\n\nData telah diamankan dengan enkripsi.`);
    
    // Reset form
    this.reset();
});

// Fungsi untuk halaman admin
let isAdminLoggedIn = false;

// Login Admin
document.getElementById('adminLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Validasi sederhana (dalam implementasi nyata harus dengan backend)
    if (username === 'admin' && password === 'admin123') {
        isAdminLoggedIn = true;
        
        // Sembunyikan form login, tampilkan dashboard
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        
        // Tampilkan menu sidebar
        document.querySelectorAll('.sidebar .nav-link').forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.opacity = '1';
        });
        
        alert('Login berhasil! Selamat datang Admin.');
        
        // Simpan session (simulasi)
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminUser', username);
    } else {
        alert('Username atau password salah!');
    }
});

// Navigation admin
document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!isAdminLoggedIn && !this.classList.contains('text-warning')) {
            alert('Silahkan login terlebih dahulu!');
            return;
        }
        
        const targetId = this.getAttribute('href').substring(1);
        
        // Sembunyikan semua section
        document.querySelectorAll('[id^="manage"], #dashboard, #bookings, #payments').forEach(section => {
            section.style.display = 'none';
        });
        
        // Tampilkan section yang dipilih
        if (targetId && document.getElementById(targetId)) {
            document.getElementById(targetId).style.display = 'block';
        }
    });
});

// Logout function
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        isAdminLoggedIn = false;
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUser');
        
        // Reset tampilan
        document.getElementById('loginSection').style.display = 'block';
        document.querySelectorAll('[id^="manage"], #dashboard, #bookings, #payments').forEach(section => {
            section.style.display = 'none';
        });
        
        // Reset form
        document.getElementById('adminLoginForm').reset();
        
        alert('Logout berhasil.');
    }
}

// Add room function
function addRoom() {
    const roomName = prompt('Masukkan nama kamar baru:');
    if (roomName) {
        alert(`Kamar "${roomName}" telah ditambahkan.`);
        // Dalam implementasi nyata, akan menambahkan baris ke tabel
    }
}

// Check session on page load
window.addEventListener('DOMContentLoaded', function() {
    // Untuk halaman admin
    if (window.location.pathname.includes('admin.html')) {
        const loggedIn = sessionStorage.getItem('adminLoggedIn');
        if (loggedIn === 'true') {
            isAdminLoggedIn = true;
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
        }
    }
    
    // Set min date untuk check-in (hari ini)
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput) {
        checkInInput.min = today;
        checkInInput.value = today;
        
        checkInInput.addEventListener('change', function() {
            if (checkOutInput) {
                checkOutInput.min = this.value;
                if (checkOutInput.value < this.value) {
                    checkOutInput.value = this.value;
                }
            }
        });
    }
    
    if (checkOutInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOutInput.min = tomorrow.toISOString().split('T')[0];
        checkOutInput.value = tomorrow.toISOString().split('T')[0];
    }
});