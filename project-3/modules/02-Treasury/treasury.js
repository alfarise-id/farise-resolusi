const select_modul = document.getElementById('switch');
const sub_judul = document.querySelector('.outer h2');
const button_reim = document.querySelector('#reimburse');
const sect_balance = document.querySelector('.balance');
const sect_input = document.querySelector('.input');
const sect_table = document.querySelector('.table');
const container = document.querySelector('.container');
const form = document.querySelector('form');


const createTD = (text) => {
    const td = document.createElement('td');
    td.textContent= text;
    return td;
}

function renderTable() {
    let data = JSON.parse(localStorage.getItem('p_fluk')) || [];

    const tbody = document.querySelector('tbody');
    tbody.textContent="";

    data.forEach((item, i) => {
        const row = document.createElement('tr');

        const rupiah = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(Number(item.amount));

        row.setAttribute('data-index', i);

        row.append(
            createTD(item.tgl),
            createTD(item.desc),
            createTD(rupiah),
            createTD(item.type),
        );

        const tdHapus = document.createElement('td');
        tdHapus.innerHTML = `<button class='btn-hapus'>Delete</button>`;
        row.appendChild(tdHapus);

        tbody.appendChild(row);
    });
}

function del_data() {
    const tbody = document.querySelector('tbody');

    tbody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-hapus')) {
            if(!confirm("Delete?")) return;

            const baris = e.target.closest('tr');
            const index = baris.getAttribute('data-index');

            let data = JSON.parse(localStorage.getItem('p_fluk')) || [];

            data.splice(index, 1);

            localStorage.setItem('p_fluk', JSON.stringify(data));

            renderTable();
        }
    })
}


form.addEventListener(('submit'), (e) => {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem('p_fluk')) || [];

    const data_baru = {
        tgl: document.querySelector('#date').value,
        desc: document.querySelector('#desc').value,
        amount: Number(document.querySelector('#amount').value),
        type: document.querySelector('#type').value
    };

    data.push(data_baru);

    localStorage.setItem('p_fluk', JSON.stringify(data));

    renderTable();
    del_data();
    form.reset();
});




function renderFlu() {
    sect_balance.innerHTML = `
                <h3>Balance</h3>
                <h4 id="balance">Rp. 0,-</h4>
                <h3>Expense</h3>
                <h4 id="expense">Rp. 0,-</h4>
    `;
    
    sect_input.innerHTML = `
                <h3>Input</h3>
                <form>
                    <label for="date">Date</label>
                    <input type="date" name="date" id="date" required>

                    <label for="desc">Description</label>
                    <input type="text" id="desc" placeholder="Description" required>

                    <label for="amount">Amount</label>
                    <input type="number" id="amount" placeholder="Rp. 0,-" required>

                    <label for="type">Type</label>
                    <select name="type" id="type">
                        <option value="Expense">Expense</option>
                        <option value="Reimburse">Reimburse</option>
                    </select>

                    <button type="submit">Save</button>
                </form>
    `;
    
    sect_table.innerHTML = `
                <h3>Table</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Desc</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
    `;
}

function renderImp() {
    sect_balance.innerHTML = `
                <h3>Balance</h3>
                <h4 id="balance">Rp. 0,-</h4>
                <button id="reimburse">Reimburse</button>
                <h3>Expense</h3>
                <h4 id="expense">Rp. 0,-</h4>
    `;
    
    sect_input.innerHTML = `
                <h3>Input</h3>
                <form>
                    <label for="date">Date</label>
                    <input type="date" name="date" id="date" required>

                    <label for="desc">Description</label>
                    <input type="text" id="desc" placeholder="Description" required>

                    <label for="amount">Amount</label>
                    <input type="number" id="amount" placeholder="Rp. 0,-" required>

                    <label for="type">Type</label>
                    <select name="type" id="type">
                        <option value="Expense" selected>Expense</option>
                        <option value="Reimburse">Reimburse</option>
                    </select>

                    <button type="submit">Save</button>
                </form>
    `;
    
    sect_table.innerHTML = `
                <h3>Table</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Desc</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
    `;
}

function renderRecon() {
    sect_input.innerHTML = `
                <h3>Add Transaction</h3>
                <form>
                    <label for="date">Date</label>
                    <input type="date" name="date" id="date" required>

                    <label for="acc">Account</label>
                    <input type="text" id="acc" placeholder="Account" required>

                    <label for="amount">Amount</label>
                    <input type="number" id="amount" placeholder="Rp. 0,-" required>

                    <label for="type">Type</label>
                    <select name="type" id="type">
                        <option value="Debit">Debit</option>
                        <option value="Credit">Credit</option>
                    </select>

                    <button type="submit">Save</button>
                </form>
    `;
    
    sect_table.innerHTML = `
                <h3>Table</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Account</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
    `;
}

select_modul.addEventListener('change', () => {
    const sel_value = select_modul.value;

    switch (sel_value) {
        case 'p-flu':
            sect_balance.style.display = "block"; 
            container.style['grid-template-areas'] = "'outer outer' 'balance table' 'input table";
            sub_judul.textContent = 'Petty Cash (Fluctuating)';
            renderFlu();
            renderTable();
            var form = document.querySelector('form');
            form.addEventListener(('submit'), (e) => {
                e.preventDefault();
                let data = JSON.parse(localStorage.getItem('p_fluk')) || [];

                const data_baru = {
                    tgl: document.querySelector('#date').value,
                    desc: document.querySelector('#desc').value,
                    amount: Number(document.querySelector('#amount').value),
                    type: document.querySelector('#type').value
                };

                data.push(data_baru);

                localStorage.setItem('p_fluk', JSON.stringify(data));

                renderTable();
                del_data();
                form.reset();
            });
            break;
        case 'p-imp':
            sect_balance.style.display = "block"; 
            container.style['grid-template-areas'] = "'outer outer' 'balance table' 'input table";
            sub_judul.textContent = 'Petty Cash (Imprest)';
            renderImp();
            const type = document.querySelector('#type');
            type.tabIndex = -1;
            type.style['pointer-events'] = "none";
            var form = document.querySelector('form');
            form.addEventListener(('submit'), (e) => {
                e.preventDefault();
                document.querySelector('#date').value = "";
                document.querySelector('#desc').value = "";
                document.querySelector('#amount').value = "";
            })
            break;
        default:
            sect_balance.style.display = "none";
            container.style['grid-template-areas'] = "'outer outer' 'input table'";
            sub_judul.textContent = 'Bank Reconciliation';
            renderRecon();
            var form = document.querySelector('form');
            form.addEventListener(('submit'), (e) => {
                e.preventDefault();
                document.querySelector('#date').value = "";
                document.querySelector('#acc').value = "";
                document.querySelector('#amount').value = "";
            })
            break;
    }
})


document.addEventListener('DOMContentLoaded', () => {
    renderTable(); 
});