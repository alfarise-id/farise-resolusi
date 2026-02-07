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
let detail_id =  null;      

/* =========================================
   3. DOM ELEMENTS 
   ========================================= */
const sec_inputLp       = document.querySelector('#inputLp'); // INDEX
const h2_inputLp        = document.querySelector('#inputLp h2');
const formLp            = document.querySelector('#formLp'); 
const input_dateLp      = document.querySelector('#dateLp');
const input_nameLp      = document.querySelector('#nameLp');
const input_unitLp      = document.querySelector('#unitLp');
const input_minstockLp  = document.querySelector('#min_stockLp');
const input_qtyLp       = document.querySelector('#qtyLp');
const input_priceLp     = document.querySelector('#priceLp');
const tbodyLp           = document.querySelector("#tbodyLp");

const sec_inputRe       = document.querySelector('#inputRe'); // RESTOCK
const h2_inputRe        = document.querySelector('#inputRe h2');
const formRe            = document.querySelector('#formRe'); 
const input_dateRe      = document.querySelector('#dateRe');
const input_typeRe      = document.querySelector('#typeRe');
const input_qtyRe       = document.querySelector('#qtyRe');
const input_priceRe     = document.querySelector('#priceRe');
const input_notesRe     = document.querySelector('#notesRe');
const tbodyRe           = document.querySelector("#tbodyRe");
const backRe            = document.querySelector('#back');

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
            <button class='deleteLp' data-id='${item.id}'>Delete</button>
            <button class='editLp' data-id='${item.id}'>Edit</button>
            <button class='detaLp' data-id='${item.id}'>Detail</button>`;

            tr.appendChild(td_btnLp);
            tbodyLp.appendChild(tr);
            action_button();
        });
    } else if (formRe) {
        const param = new URLSearchParams(window.location.search);
        detail_id = Number(param.get('id'));
        const storageRe = JSON.parse(localStorage.getItem(SK_RE)) || [];
        const storageLp = JSON.parse(localStorage.getItem(SK_LP)) || [];
        editIndex = storageLp.findIndex(item => item.id === detail_id);
        const detail_storageRe = storageRe.filter(item => item.id_product === detail_id);
        tbodyRe.textContent = '';

        detail_storageRe.forEach(item => {
            const tr = document.createElement('tr');

            tr.append(
                createTd(item.id),
                createTd(item.id_product),
                createTd(item.date),
                createTd(item.type),
                createTd(item.qty),
                createTd(formatRupiah(item.price)),
                createTd(item.balance_qty),
                createTd(item.notes)
            )

            const td_btnRe = document.createElement('td');
            td_btnRe.innerHTML = `
            <button class='deleteRe' data-id='${item.id}'>Delete</button>
            <button class='editRe' data-id='${item.id}'>Edit</button>`;

            tr.appendChild(td_btnRe);
            tbodyRe.appendChild(tr);
        });
    }
}

// LISTENER UNTUK BUTTON ACTION
const action_button = () => {
    if (tbodyLp) {
        tbodyLp.addEventListener('click', (e)=>{
            switch (true) {
                case e.target.classList.contains('deleteLp'):
                    console.log("test")
                    const storageLp = JSON.parse(localStorage.getItem(SK_LP)) || [];
                    const storageRe = JSON.parse(localStorage.getItem(SK_RE)) || [];

                    const del_id_product = Number(e.target.dataset.id);
                    const del_indexLp = storageLp.filter(item => item.id !== del_id_product);
                    const storageRe_del = storageRe.filter(item => item.id_product !== del_id_product);

                    simpanDataLp(del_indexLp);
                    simpanDataRe(storageRe_del);
                    renderTable();
                    break;
                case e.target.classList.contains('editLp'):
                    isEditing = true;
                    const storageLp_edit = JSON.parse(localStorage.getItem(SK_LP)) || [];
                    const edit_id_product = Number(e.target.dataset.id);
                    editIndex = storageLp_edit.findIndex(item => item.id === edit_id_product);
                    detail_id = edit_id_product;

                    h2_inputLp.textContent = 'Edit Product';

                    input_dateLp.disabled = true;
                    input_qtyLp.disabled = true;
                    input_priceLp.disabled= true;

                    input_dateLp.removeAttribute('required');
                    input_qtyLp.removeAttribute('required');
                    input_priceLp.removeAttribute('required');

                    input_nameLp.value = storageLp_edit[editIndex].name;
                    input_unitLp.value = storageLp_edit[editIndex].unit;
                    input_minstockLp.value = storageLp_edit[editIndex].min_stock;
                    break;
                case e.target.classList.contains('detaLp'):
                    const detail_id_product = Number(e.target.dataset.id);
                    detail_id = detail_id_product;
                    window.location.href = `detail.html?id=${detail_id}`;
                    break;
            }
        })
    } else if (tbodyRe) {
        tbodyRe.addEventListener('click', (e)=>{
            switch (true) {
                case e.target.classList.contains('deleteRe'):
                    const id_barisRe = Number(e.target.dataset.id);
                    const storageRe = JSON.parse(localStorage.getItem(SK_RE)) || [];
                    const filter_stgRe = storageRe.filter(item => item.id !== id_barisRe);

                    simpanDataRe(filter_stgRe);
                    renderTable();
                    break;
                case e.target.classList.contains('editRe'):
                    const id_editRe = Number(e.target.dataset.id);
                    isEditing = true;
                    const storageRe_edit = JSON.parse(localStorage.getItem(SK_RE)) || [];

                    const filter_edit_stgRe = storageRe_edit.filter(item => item.id = id_editRe);

                    h2_inputRe.textContent = "Edit Detail Product";
                    input_dateRe.value = filter_edit_stgRe.date;
                    input_typeRe.value = filter_edit_stgRe.type;
                    input_qtyRe.value = filter_edit_stgRe.qty;
                    input_priceRe.value = filter_edit_stgRe.price;
                    input_notesRe.value = filter_edit_stgRe.notes;
                    break;
            }
        })
    }
}

const simpanDataLp = (data) => {
    localStorage.setItem(SK_LP, JSON.stringify(data));
}

const simpanDataRe = (data) => {
    localStorage.setItem(SK_RE, JSON.stringify(data));
}
/* =========================================
   5. LISTENERS
   ========================================= */
if (formLp) {  
    formLp.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (isEditing) {
            const storageLp       = JSON.parse(localStorage.getItem(SK_LP)) || [];
            const storageRe       = JSON.parse(localStorage.getItem(SK_RE)) || [];
            const edit_namelp     = input_nameLp.value.trim();
            const edit_unitlp     = input_unitLp.value;
            const edit_minstockLp = input_minstockLp.value;
            input_dateLp.disabled = false;
            input_qtyLp.disabled = false;
            input_priceLp.disabled= false;
            input_dateLp.setAttribute('required', '');
            input_qtyLp.setAttribute('required', '');
            input_priceLp.setAttribute('required', '');
            if (edit_unitlp < 0 || edit_minstockLp < 0 ) {
                alert("Input Can't Be Lower Than 0!");
                return;
            } 

            const filter_storageLp = storageLp.filter(item => item.id !== detail_id);
            const checkdb = filter_storageLp.some(item => item.name.toLowerCase() === edit_namelp.toLowerCase());
            if (checkdb) {
                alert("Name Already Used!");
                return;
            }

            storageLp[editIndex].name = edit_namelp;
            storageLp[editIndex].unit = edit_unitlp;
            storageLp[editIndex].min_stock = edit_minstockLp;

            h2_inputLp.textContent = "Add New Products";
            simpanDataLp(storageLp);
            simpanDataRe(storageRe);
            renderTable();
            isEditing = false;
            formLp.reset();
        } else {
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
            
            if (input_minstockLp > input_qtyLp) {
                alert("Min Stock Can't Be Higher Than Qty!");
                return;
            }

            const new_storageRe = {
                id: Date.now(),
                id_product: Date.now(),
                date: new_dateLp,
                type: "IN",
                qty: new_qtyLp,
                price: new_priceLp,
                balance_qty: new_qtyLp,
                notes: "Add Product"
            };
            
            const new_storageLp = {
                id: Date.now(),
                name: new_nameLp,
                unit: new_unitLp,
                min_stock: new_minstockLp,
                qty: new_qtyLp,
                price: new_priceLp
            };

            storageLp.push(new_storageLp);
            storageRe.push(new_storageRe);

            simpanDataRe(storageRe);
            simpanDataLp(storageLp);

            renderTable();
            formLp.reset();
        }
    });
} else if (formRe) {
    formRe.addEventListener('submit', (e)=>{
        e.preventDefault();

        if (isEditing) {
            
        } else {
            const storageRe = JSON.parse(localStorage.getItem(SK_RE)) || [];
            const storageLp = JSON.parse(localStorage.getItem(SK_LP)) || [];

            const new_dateRe      = input_dateRe.value;
            const new_typeRe      = input_typeRe.value;
            const new_qtyRe       = input_qtyRe.value;
            const new_priceRe     = input_priceRe.value;
            const new_notesRe     = input_notesRe.value;

            // LOGIKA BALANCE QTY UNTUK DETAIL
            const blc_product = storageLp.find(item => item.id === Number(detail_id)) || [];
            const qtyNew = Number(new_qtyRe) || 0;
            const qtyLast = Number(blc_product.qty) || 0;

            if (new_typeRe === 'IN') {
                blc_product.qty = qtyLast + qtyNew;
            } else if (new_typeRe === 'OUT') {
                blc_product.qty = qtyLast - qtyNew;
            }            
            
            // LOGIKA AVG PRICE UNTUK LIST
            const avg_product = storageRe.filter(item => item.id_product === detail_id);
            const index_avg = storageLp.findIndex(item => item.id === detail_id);
            let avg_price = Number(new_priceRe) || 0;
            let count = 1;
            avg_product.forEach((item)=>{
                const type_product = item.type;
                const price_product = Number(item.price) || 0;

                if (type_product === 'IN') {
                    avg_price += price_product;
                    count++;
                } else {
                    avg_price += 0;
                }
            })
            const hasil_avg = avg_price/count;
            storageLp[index_avg].price = hasil_avg;
            storageLp[index_avg].qty = blc_product.qty;

            const new_storageRe = {
                id: Date.now(),
                id_product: detail_id,
                date: new_dateRe,
                type: new_typeRe,
                qty: new_qtyRe,
                balance_qty: blc_product.qty,
                price: new_priceRe,
                notes: new_notesRe
            }

            storageRe.push(new_storageRe)

            simpanDataRe(storageRe);
            simpanDataLp(storageLp);
            formRe.reset();
            renderTable();
        }
    });
    backRe.addEventListener('click', ()=>{
        window.location.href = "index.html";
        detail_id = null;
    });
    action_button();
}
/* =========================================
   6. INITIALIZATION 
   ========================================= */
renderTable();     
console.log("Aplikasi Siap! 🚀");