/* =========================================
   1. CONSTANTS 
   ========================================= */
const SK_LP = "list_produk";
const SK_RE = "detail_produk";

/* =========================================
   2. STATE VARIABLES 
   ========================================= */
let isEditing = false;     
let editIndex = null;       

/* =========================================
   3. DOM ELEMENTS 
   ========================================= */
const sec_inputLp       = document.querySelector('#inputLp'); // INDEX
const formLp            = document.querySelector('#formLp'); 
const input_dateLp      = document.querySelector('#dateLp');
const input_nameLp      = document.querySelector('#nameLp');
const input_unitLp      = document.querySelector('#unitLp');
const input_minstockLp  = document.querySelector('#min_stockLp');
const input_qtyLp       = document.querySelector('#qtyLp');
const input_priceLp     = document.querySelector('#priceLp');
const tbodyLp           = document.querySelector("#tbodyLp");

const sec_inputRe       = document.querySelector('#inputRe'); // RESTOCK
const formRe            = document.querySelector('#formRe'); 
const input_dateRe      = document.querySelector('#dateRe');
const input_typeRe      = document.querySelector('#typeRe');
const input_qtyRe       = document.querySelector('#qtyRe');
const input_priceRe     = document.querySelector('#priceRe');
const input_notesRe     = document.querySelector('#notesRe');
const tbodyRe           = document.querySelector("#tbodyRe");

/* =========================================
   4. FUNCTIONS 
   ========================================= */
const formatRupiah = (angka) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
}).format(Number(angka));

const createTd = (item) => {
    const td = document.createElement('td');
    td.textContent = item;
    return td;
}

const renderTable = () => {
    if (formLp) {
        const storageLp = JSON.parse(localStorage.getItem(SK_LP)) || [];
        tbodyLp.textContent = '';

        storageLp.forEach(item => {
            const tr = document.createElement('tr');

            tr.append(
                createTd(item.id),
                createTd(item.name),
                createTd(item.unit),
                createTd(item.min_stock),
                createTd(item.qty),
                createTd(formatRupiah(item.price))
            )

            const td_btnLp = document.createElement('td');
            td_btnLp.innerHTML = `
            <button id='deleteLp'>Delete</button>
            <button id='editLp'>Edit</button>
            <button id='detaLp'>Detail</button>`;

            tr.appendChild(td_btnLp);
            tbodyLp.appendChild(tr);
        });
    } else if (formRe) {
        
    }
}

const simpanDataLp = (data) => {
    if (isEditing) {
        return alert("Not Yet")
    }
    localStorage.setItem(SK_LP, JSON.stringify(data));
}

const simpanDataRe = (data) => {
    if (isEditing) {
        return alert("Not Yet")
    }
    
    localStorage.setItem(SK_RE, JSON.stringify(data));
}
/* =========================================
   5. LISTENERS (Interaksi User)
   ========================================= */
if (formLp) {  
    formLp.addEventListener("submit", (e) => {
        e.preventDefault();

        const storageLp       = JSON.parse(localStorage.getItem(SK_LP)) || [];
        const storageRe       = JSON.parse(localStorage.getItem(SK_RE)) || [];
        const new_dateLp      = input_dateLp.value;
        const new_nameLp      = input_nameLp.value.trim();
        const new_unitLp      = input_unitLp.value;
        const new_minstockLp  = input_minstockLp.value;
        const new_qtyLp       = input_qtyLp.value;
        const new_priceLp     = input_priceLp.value;

        if (Number(new_unitLp) < 0 || Number(new_minstockLp) < 0 || Number(new_qtyLp) < 0 || Number(new_priceLp) < 0 ) {
            alert("Input Can't Be Lower Than 0!");
            return;
        }

        const double_nameLp = storageLp.some(item => {
            return item.name.toLowerCase() === new_nameLp.toLowerCase();
        })

        if (double_nameLp) {
            alert('Name Already Used!');
            return;
        }

        const new_dataRe = {
            id: Date.now(),
            id_product: Date.now(),
            date: new_dateLp,
            type: "IN",
            qty: new_qtyLp,
            price: new_priceLp,
            balance_qty: new_qtyLp,
            notes: "Add Product"
        };
        
        const new_dataLp = {
            id: Date.now(),
            name: new_nameLp,
            unit: new_unitLp,
            min_stock: new_minstockLp,
            qty: new_qtyLp,
            price: new_priceLp
        };

        storageLp.push(new_dataLp);
        storageRe.push(new_dataRe);

        simpanDataRe(storageRe);
        simpanDataLp(storageLp);

        renderTable();
        formLp.reset();
    });
}
/* =========================================
   6. INITIALIZATION 
   ========================================= */
renderTable();     
console.log("Aplikasi Siap! 🚀");