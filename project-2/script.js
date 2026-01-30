const burger = document.querySelector('.burger');
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const link = document.querySelectorAll('nav ul li a');


burger.addEventListener("click", function () {
    header.classList.toggle('active');
    nav.classList.toggle('active');
})

link.forEach(element => {
    element.addEventListener("click", function () {
        header.classList.toggle('active');
        nav.classList.toggle('active');
    })
});

/* LOGIKA FORM & TABEL */
const desc = document.getElementById('description');
const amount = document.getElementById('total');
const type = document.getElementById('type');
const form = document.querySelector('form');

form.addEventListener(("submit"), function (e) {
    e.preventDefault();
    
    var desc_v = desc.value;
    var amount_v = amount.value;
    var type_v = type.value;
    
    if (desc_v == "" || amount_v == "" || type_v == "") {
        return alert('Input Harus Terisi!');
    } else {
        const template = document.querySelector('#trans-row');
        const tbody = document.querySelector('#data-table');
        const clone = template.content.cloneNode(true);

        clone.querySelector('.col-desc').textContent = desc_v;
        clone.querySelector('.col-am').textContent = `Rp. ${amount_v.toLocaleString()}`;
        clone.querySelector('.col-type').textContent = type_v;
        clone.querySelector('.col-act').textContent = 'Delete';
        const btnHapus = clone.querySelector('.col-act');
        btnHapus.addEventListener('click', function(e) {
        // Cari elemen <tr> terdekat dari tombol yang diklik, lalu hapus
        e.target.closest('tr').remove();
    });
        tbody.appendChild(clone);
    }

});
