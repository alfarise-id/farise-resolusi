const select_modul = document.getElementById('switch');
const sub_judul = document.querySelector('.outer h2');
const button_reim = document.querySelector('#reimburse');
const sect_balance = document.querySelector('.balance');
const sect_input = document.querySelector('.input');
const sect_table = document.querySelector('.table');
const container = document.querySelector('.container');
const form = document.querySelector('form');
const sect_edit = document.querySelector('.input.edit');
const sect_bank = document.querySelector('.input.e-bank');



const rupiah = (x) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
}).format(Number(x));

const createTD = (text) => {
    const td = document.createElement('td');
    td.textContent= text;
    return td;
}

function renderTable(modul = 'p_fluk') {
    let data = JSON.parse(localStorage.getItem(modul)) || [];

    const tbody = document.querySelector('tbody');
    tbody.textContent="";

    data.forEach((item, i) => {
        const row = document.createElement('tr');

        row.setAttribute('data-index', i);

        row.append(
            createTD(item.tgl),
            createTD(item.desc),
            createTD(rupiah(item.amount)),
            createTD(item.type),
        );

        const tdHapus = document.createElement('td');
        if (modul === 'p_recon') {
            tdHapus.innerHTML = 
            `<button class='btn-hapus'>Delete</button>
            <button class='btn-edit'>Edit</button>
            <input type="checkbox">`;
            row.appendChild(tdHapus);
            action_button('p_recon');
            tbody.appendChild(row);
        } else {
            tdHapus.innerHTML = `<button class='btn-hapus'>Delete</button>`;
            row.appendChild(tdHapus);
            action_button(modul);
            tbody.appendChild(row);
        }
    });
}

function action_button(modul = 'p_fluk') {
    const tbody = document.querySelector('tbody');

    tbody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-hapus')) {
            if(!confirm("Delete?")) return;

            const baris = e.target.closest('tr');
            const index = baris.getAttribute('data-index');

            let data = JSON.parse(localStorage.getItem(modul)) || [];

            data.splice(index, 1);

            localStorage.setItem(modul , JSON.stringify(data));

            renderTable(modul);
            balanceUpdate(modul);
        } else if (e.target.classList.contains('btn-edit')) {
            const baris = e.target.closest('tr');
            let indexEdit = baris.getAttribute('data-index');
            let data = JSON.parse(localStorage.getItem(modul)) || [];

            sect_input.style.display = "none";
            sect_edit.style.display = "grid";
            sect_edit.setAttribute('data-edit',indexEdit);

            document.querySelector('#dateEd').value = new Date(data[indexEdit].tgl).toLocaleDateString('sv-SE');
            document.querySelector('#accEd').value = data[indexEdit].desc;
            document.querySelector('#amountEd').value = data[indexEdit].amount;
            document.querySelector('#typeEd').value = data[indexEdit].type;

        } 
    })
}

const balanceUpdate = (modul = 'p_fluk') => {
    let data = JSON.parse(localStorage.getItem(modul));

    let totalReimburse = 0;
    let totalExpense = 0;

    if (modul === 'p_fluk' || modul === 'p_imp') {
        data.forEach(item => {
            if(item.type === 'Reimburse'){
                totalReimburse = totalReimburse + item.amount;
            } else {
                totalExpense = totalExpense + item.amount;
            }
        });

        document.querySelector('#balance').textContent = rupiah(totalReimburse - totalExpense);
        document.querySelector('#expense').textContent = rupiah(totalExpense);
    } else if (modul === 'p_recon') {
        data.forEach(item => {
            if(item.type === 'Debit'){
                totalReimburse = totalReimburse + item.amount;
            } else {
                totalExpense = totalExpense + item.amount;
            }
        });

        document.querySelector('#account_balance').textContent = rupiah(totalReimburse - totalExpense);

        let dataBalance = localStorage.getItem("bank_balance") || "Rp. 0,-";

        document.querySelector('#bank_balance').textContent = dataBalance;
    }
}

const reimburse = () => {
    document.querySelector('#reimburse').addEventListener('click', () => {
        let data = JSON.parse(localStorage.getItem('p_imp')) || [];
        let totalReimburse = 0;
        let totalExpense = 0;
        let total = 0;

        data.forEach(item => {
            if(item.type === 'Reimburse'){
                totalReimburse = totalReimburse + item.amount;
            } else {
                totalExpense = totalExpense + item.amount;
            }
        });
        let balance = totalReimburse - totalExpense;

        if(totalReimburse == 0) {
            total = 2000000;
        } else {
            total = 2000000 - balance;
        };

        if (balance >=0 && balance < 2000000) {
            let tanggal = new Date;
            let form_tanggal = tanggal.toLocaleDateString('sv-SE', {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }).replaceAll('/', '-');

            const data_baru = {
                tgl: form_tanggal,
                desc: 'Reimburse',
                amount: total,
                type: 'Reimburse'
            }

            data.push(data_baru);

            localStorage.setItem('p_imp', JSON.stringify(data));
            renderTable('p_imp');
            balanceUpdate('p_imp');
        } else {
            return
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
    balanceUpdate();
    form.reset();
});


const renderFlu = () => {
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

const renderImp = () => {
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

const renderRecon = () => {
    sect_balance.innerHTML = `
                <h3>Account Balance</h3>
                <h4 id="account_balance">Rp. 0,-</h4>
                <h3>Bank Balance</h3>
                <h4 id="bank_balance">Rp. 0,-</h4>
                <button class='btn-editBalance'>Edit Bank Balance</button>
    `;

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
            sub_judul.textContent = 'Petty Cash (Fluctuating)';
            renderFlu();
            renderTable();
            balanceUpdate();
            const form = document.querySelector('form');
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
                balanceUpdate();
                form.reset();
            });
            break;
        case 'p-imp':
            sub_judul.textContent = 'Petty Cash (Imprest)';
            renderImp();
            reimburse();
            renderTable('p_imp');
            balanceUpdate('p_imp');
            const type = document.querySelector('#type');
            type.tabIndex = -1;
            type.style['pointer-events'] = "none";
            const form_imp = document.querySelector('form');
            form_imp.addEventListener(('submit'), (e) => {
                e.preventDefault();
                let data = JSON.parse(localStorage.getItem('p_imp')) || [];

                const data_baru = {
                    tgl: document.querySelector('#date').value,
                    desc: document.querySelector('#desc').value,
                    amount: Number(document.querySelector('#amount').value),
                    type: document.querySelector('#type').value
                };

                data.push(data_baru);

                localStorage.setItem('p_imp', JSON.stringify(data));

                renderTable('p_imp');
                balanceUpdate('p_imp');
                reimburse();
                form_imp.reset();
            })
            break;
        default:
            sub_judul.textContent = 'Bank Reconciliation';
            renderRecon();
            renderTable('p_recon');
            balanceUpdate('p_recon');
            const form_recon = document.querySelector('form');
            form_recon.addEventListener(('submit'), (e) => {
                e.preventDefault();
                let data = JSON.parse(localStorage.getItem('p_recon')) || [];

                const data_baru = {
                    tgl: document.querySelector('#date').value,
                    desc: document.querySelector('#acc').value,
                    amount: Number(document.querySelector('#amount').value),
                    type: document.querySelector('#type').value
                };

                data.push(data_baru);

                localStorage.setItem('p_recon', JSON.stringify(data));

                renderTable('p_recon');
                balanceUpdate('p_recon');
                form_recon.reset();
            });
            document.querySelector(".form-edit").addEventListener('submit', (e)=> {
                e.preventDefault();
                let data = JSON.parse(localStorage.getItem('p_recon')) || [];
                let data_edit = sect_edit.getAttribute('data-edit');

                let new_data = {
                    tgl: document.querySelector('#dateEd').value,
                    desc: document.querySelector('#accEd').value,
                    amount: Number(document.querySelector('#amountEd').value),
                    type: document.querySelector('#typeEd').value
                }

                data[data_edit] = new_data;

                localStorage.setItem('p_recon', JSON.stringify(data));
                renderTable('p_recon');
                document.querySelector(".form-edit").reset();
                balanceUpdate('p_recon');
                sect_input.style.display = "grid";
                sect_edit.style.display = "none";
                alert('Edit Succes!');
            });
            document.querySelector(".btn-editBalance").addEventListener('click', () => {
                sect_input.style.display = "none";
                sect_bank.style.display = "grid";
            });
            document.querySelector(".form-edit-bank").addEventListener("submit", (e)=> {
                e.preventDefault();
                let data = localStorage.getItem('bank_balance') || "";
                data = rupiah(document.querySelector('#amountEbank').value);

                document.querySelector('#bank_balance').textContent = data;

                localStorage.setItem("bank_balance", data);
                sect_input.style.display = "grid";
                sect_bank.style.display = "none";
                document.querySelector(".form-edit-bank").reset();
            })
            break;
    }
})


document.addEventListener('DOMContentLoaded', () => {
    renderTable(); 
    balanceUpdate();
});