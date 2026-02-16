const SK_RC = 'receivable';
const SK_DRC = 'detail_rc';

let index_tr = null;
let status_edit = false;
let id_tr = null;

const main_rc = document.querySelector('#main_receivable');
const sec_input_rc = document.querySelector('#input_rc');
const form_rc = document.querySelector('#form_rc');
const input_descRc = document.querySelector('#desc_rc');
const input_typeRc = document.querySelector('#type_rc');
const input_amountRc = document.querySelector('#amount_rc');
const input_interestRc = document.querySelector('#interest_rc');
const input_termRc = document.querySelector('#term_rc');
const sec_tableRc = document.querySelector('#table_rc');
const tbody_rc = document.querySelector('#tbody_rc');

const save_rc = (data) => {
    localStorage.setItem(SK_RC, JSON.stringify(data))
};

const save_drc = (data) => {
    localStorage.setItem(SK_DRC, JSON.stringify(data))
};

const formatRupiah = (data) => new Intl.NumberFormat('id-ID', {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
}).format(Number(data));

const submit_rc = () => {
    const v_desc = input_descRc.value;
    const v_type = input_typeRc.value;
    const v_amount = input_amountRc.value;
    const v_interest = input_interestRc.value;
    const v_term = input_termRc.value;

    const storage_rc = JSON.parse(localStorage.getItem(SK_RC)) || [];

    const new_data = {
        id: Date.now(),
        desc: v_desc,
        type: v_type,
        amount: v_amount,
        interest: v_interest,
        term: v_term,
        status: "Unpayed"
    };

    storage_rc.push(new_data);

    save_rc(storage_rc);
};

const action_button = () => {
    tbody_rc.addEventListener('click', (e) => {
        switch (true) {
            case e.target.classList.contains('deleteRc'):
                const storage_rc = JSON.parse(localStorage.getItem(SK_RC)) || [];
                const del_storageRc = storage_rc.filter(item => item.id !== Number(e.target.dataset.id));

                save_rc(del_storageRc);
                renderTable();
                break;
            case e.target.classList.contains('editRc'):

                break;
            case e.target.classList.contains('detailRc'):

                break;
        }
    })
};

const createTd = (data) => {
    const td = document.createElement('td');
    td.textContent = data;
    return td;
};

const renderTable = () => {
    const storage_rc = JSON.parse(localStorage.getItem(SK_RC)) || [];
    tbody_rc.textContent = '';

    storage_rc.forEach(item => {
        const tr = document.createElement('tr');

        tr.append(
            createTd(item.id),
            createTd(item.desc),
            createTd(item.type),
            createTd(formatRupiah(item.amount)),
            createTd(item.interest),
            createTd(item.term),
            createTd(item.status)
        )

        const act_button = document.createElement('td');
        act_button.innerHTML = `
        <button class='deleteRc' data-id='${item.id}'>Delete</button>
        <button class='editRc' data-id='${item.id}'>Edit</button>
        <button class='detailRc' data-id='${item.id}'>Detail</button>`;

        tr.appendChild(act_button);
        tbody_rc.appendChild(tr);
    })
}

form_rc.addEventListener('submit', (e) => {
    e.preventDefault();

    submit_rc();
    renderTable();
    action_button();
    form_rc.reset();
});

renderTable();
action_button();