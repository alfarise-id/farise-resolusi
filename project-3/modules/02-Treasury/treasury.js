const select_modul = document.getElementById('switch');
const sub_judul = document.querySelector('.outer h2');
const button_reim = document.querySelector('#reimburse');
const sect_balance = document.querySelector('.balance');
const sect_input = document.querySelector('.input');
const sect_table = document.querySelector('.table');
const container = document.querySelector('.container');
const form = document.querySelector('form');
form.addEventListener(('submit'), (e) => {
    e.preventDefault();
})


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

function p_submit(x = '#desc') {
    let localData = JSON.parse(localStorage.getItem('transaction_petty')) || [];

    const newData = {
        dateTrans: document.querySelector('#date').value,
        desc: document.querySelector(x).value,
        amount: document.querySelector('#amount').value,
        type: document.querySelector('#type').value
    }

    localData.push(newData);
    localStorage.setItem('transaction_petty', JSON.stringify(localData));
}

function renderTable(column = 'desc') {
    const localData = JSON.parse(localStorage.getItem('transaction_petty')) || [];
    const tbody = document.querySelector('tbody');

    tbody.textContent = "";

    localData.forEach((x,i) => {
        const row = document.createElement('tr');

        row.setAttribute('data_index', i)

        const td_date = document.createElement('td');
        td_date.textContent = x.dateTrans;

        const td_desc = document.createElement('td');
        td_desc.textContent = x.column;

        const td_amount = document.createElement('td');
        td_amount.textContent = x.amount;

        const td_type = document.createElement('td');
        td_type.textContent = x.type;

        const td_act = document.createElement('td');
        td_act.textContent = 'Delete';
        td_act.classList.add('del');

        row.appendChild(td_date);
        row.appendChild(td_desc);
        row.appendChild(td_amount);
        row.appendChild(td_type);
        row.appendChild(td_act);

        tbody.appendChild(row);
    });
}

function remove() {
    const col_act = document.querySelector('.del');

    col_act.addEventListener("click", (e) => {
        const baris = e.target.closest('tr');
        const index = baris.getAttribute('data-index');
        
        let localData = JSON.parse(localStorage.getItem('transaction_petty'));

            localData.splice(index, 1); // Buang data di urutan tersebut
            
            localStorage.setItem('transaction_petty', JSON.stringify(localData));
            
            renderTable(); // Gambar ulang tabel

    })
}



p_submit();
renderTable();
remove();

select_modul.addEventListener('change', () => {
    const sel_value = select_modul.value;

    switch (sel_value) {
        case 'p-flu':
            sect_balance.style.display = "block"; 
            container.style['grid-template-areas'] = "'outer outer' 'balance table' 'input table";
            sub_judul.textContent = 'Petty Cash (Fluctuating)';
            renderFlu();
            var form = document.querySelector('form');
            form.addEventListener(('submit'), (e) => {
                e.preventDefault();
                p_submit();
                document.querySelector('#date').value = "";
                document.querySelector('#desc').value = "";
                document.querySelector('#amount').value = "";
            })
            renderTable();
            remove();
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
                p_submit();
                document.querySelector('#date').value = "";
                document.querySelector('#desc').value = "";
                document.querySelector('#amount').value = "";
            })
            renderTable();
            remove();
            break;
        default:
            sect_balance.style.display = "none";
            container.style['grid-template-areas'] = "'outer outer' 'input table'";
            sub_judul.textContent = 'Bank Reconciliation';
            renderRecon();
            var form = document.querySelector('form');
            form.addEventListener(('submit'), (e) => {
                e.preventDefault();
                p_submit('#acc');
                document.querySelector('#date').value = "";
                document.querySelector('#acc').value = "";
                document.querySelector('#amount').value = "";
            })
            renderTable(acc);
            remove();
            break;
    }
})


