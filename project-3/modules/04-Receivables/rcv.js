const SK_RC = 'receivable';
const SK_DRC = 'detail_rc';

let index_tr = null;
let status_edit = false;
let id_tr = null;

// INDEX.HTML
const main_rc = document.querySelector('#main_receivable');
const sec_input_rc = document.querySelector('#input_rc');
const input_h2_rc = document.querySelector('#input_rc h2');
const form_rc = document.querySelector('#form_rc');
const input_dateRc = document.querySelector('#date_rc');
const input_descRc = document.querySelector('#desc_rc');
const input_typeRc = document.querySelector('#type_rc');
const input_amountRc = document.querySelector('#amount_rc');
const input_interestRc = document.querySelector('#interest_rc');
const input_termRc = document.querySelector('#term_rc');
const input_dateRcL = document.querySelector('#date_rcL');
const input_descRcL = document.querySelector('#desc_rcL');
const input_typeRcL = document.querySelector('#type_rcL');
const input_amountRcL = document.querySelector('#amount_rcL');
const input_interestRcL = document.querySelector('#interest_rcL');
const input_termRcL = document.querySelector('#term_rcL');
const sec_tableRc = document.querySelector('#table_rc');
const tbody_rc = document.querySelector('#tbody_rc');

// DETAIL.HTML
const back_drc = document.querySelector('#back');
const sec_input_drc = document.querySelector('#input_dt');
const input_h2_drc = document.querySelector('#input_dt h2');
const form_drc = document.querySelector('#form_dt');
const input_date_drc = document.querySelector('#date_dt');
const input_desc_drc = document.querySelector('#desc_dt');
const input_type_drc = document.querySelector('#type');
const input_amount_drc = document.querySelector('#amount_dt');
const sec_table_drc = document.querySelector('#table_dt');
const tbody_drc = document.querySelector('#tbody_dt');

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
    if (form_rc) {
        const v_date = input_dateRc.value;
        const v_desc = input_descRc.value;
        const v_type = input_typeRc.value;
        const v_amount = input_amountRc.value;
        const v_interest = input_interestRc.value;
        const v_term = input_termRc.value;

        const storage_rc = JSON.parse(localStorage.getItem(SK_RC)) || [];
        const storage_drc = JSON.parse(localStorage.getItem(SK_DRC)) || [];

        const total_amount = (Number(v_amount) * (Number(v_interest)/100)) + Number(v_amount); 

        const new_data = {
            id: Date.now(),
            desc: v_desc,
            type: v_type,
            amount: v_amount,
            interest: v_interest,
            term: v_term,
            status: "Unpayed"
        };

        const new_data_drc = {
            id: Date.now(),
            id_rc: new_data.id,
            date: v_date,
            desc: 'Init',
            type: 'CREDIT',
            amount: total_amount
        };

        if (status_edit) {
            const index_drc = storage_drc.findIndex(item => item.id_rc === id_tr);
            const status = storage_rc[index_tr].status;

            new_data.id = id_tr;
            new_data.status = status;

            new_data_drc.id = storage_drc[index_drc].id;
            new_data_drc.id_rc = id_tr;

            storage_drc[index_drc] = new_data_drc;
            storage_rc[index_tr] = new_data;

            input_h2_rc.textContent = 'Add Receivables';

            input_typeRc.style.display = 'block';
            input_amountRc.style.display = 'block';
            input_interestRc.style.display = 'block';
            input_termRc.style.display = 'block';

            input_typeRcL.style.display = 'block';
            input_amountRcL.style.display = 'block';
            input_interestRcL.style.display = 'block';
            input_termRcL.style.display = 'block';

            status_edit = false;
            id_tr = null;
            index_tr = null;
        } else {
            storage_rc.push(new_data);
            storage_drc.push(new_data_drc);
        }

        save_drc(storage_drc);
        save_rc(storage_rc);
    } else {
        const v_date = input_date_drc.value;
        const v_desc = input_desc_drc.value;
        const v_type = input_type_drc.value;
        const v_amount = input_amount_drc.value;

        const storage_drc = JSON.parse(localStorage.getItem(SK_DRC)) || [];

        const new_data_drc = {
            id: Date.now(),
            id_rc: id_tr,
            date: v_date,
            desc: v_desc,
            type: v_type,
            amount: v_amount
        };

        storage_drc.push(new_data_drc)

        save_drc(storage_drc)
    }
};

const action_button = () => {
    if (tbody_rc) {
        tbody_rc.addEventListener('click', (e) => {
            switch (true) {
                case e.target.classList.contains('deleteRc'):
                    const storage_rc = JSON.parse(localStorage.getItem(SK_RC)) || [];
                    const storage_drc = JSON.parse(localStorage.getItem(SK_DRC)) || [];
                    const del_storageRc = storage_rc.filter(item => item.id !== Number(e.target.dataset.id));
                    const del_storagedRc = storage_drc.filter(item => item.id_rc !== Number(e.target.dataset.id));

                    save_drc(del_storagedRc);
                    save_rc(del_storageRc);
                    renderTable();
                    break;
                case e.target.classList.contains('editRc'):
                    const id_edit = Number(e.target.dataset.id);
                    const storage_rcE = JSON.parse(localStorage.getItem(SK_RC)) || [];
                    const storage_drcE = JSON.parse(localStorage.getItem(SK_DRC)) || [];
                    const data_edit = storage_rcE.find(item => item.id === id_edit);
                    const data_editDrc = storage_drcE.find(item => item.id_rc === id_edit);

                    input_dateRc.value = data_editDrc.date;
                    input_descRc.value = data_edit.desc;
                    input_typeRc.value = data_edit.type;
                    input_amountRc.value = data_edit.amount;
                    input_interestRc.value = data_edit.interest;
                    input_termRc.value = data_edit.term;

                    input_typeRc.style.display = 'none';
                    input_amountRc.style.display = 'none';
                    input_interestRc.style.display = 'none';
                    input_termRc.style.display = 'none';

                    input_typeRcL.style.display = 'none';
                    input_amountRcL.style.display = 'none';
                    input_interestRcL.style.display = 'none';
                    input_termRcL.style.display = 'none';

                    input_h2_rc.textContent = 'Edit';
                    index_tr = storage_rcE.findIndex(item => item.id === id_edit);
                    id_tr = id_edit;
                    status_edit = true;
                    break;
                case e.target.classList.contains('detailRc'):
                    const id_detail = e.target.dataset.id;
                    window.location.href = `detail.html?id=${id_detail}`;
                    break;
            }
        })        
    } else {
        tbody_drc.addEventListener('click', (e) => {
            if (e.target.classList.contains('deletedrc')) {
                const storage_rc = JSON.parse(localStorage.getItem(SK_RC)) || [];
                const storage_drc = JSON.parse(localStorage.getItem(SK_DRC)) || [];
                
                const del_storagedRc = storage_drc.filter(item => item.id !== Number(e.target.dataset.id));
                const find_storagedRc = del_storagedRc.find(item => item.id_rc === id_tr);

                if (!find_storagedRc) {
                    const del_storageRc = storage_rc.filter(item => item.id !== id_tr);   
                    save_rc(del_storageRc); 
                    save_drc(del_storagedRc);                    
                } else {
                    save_drc(del_storagedRc);                    
                }
                renderTable();
            }
        })
    }

};

const createTd = (data) => {
    const td = document.createElement('td');
    td.textContent = data;
    return td;
};

const renderTable = () => {
    if (form_rc) {
        const storage_rc = JSON.parse(localStorage.getItem(SK_RC)) || [];
        tbody_rc.textContent = '';

        storage_rc.forEach(item => {
            const tr = document.createElement('tr');

            tr.append(
                createTd(item.id),
                createTd(item.desc),
                createTd(item.type),
                createTd(formatRupiah(item.amount)),
                createTd(item.interest + '%'),
                createTd(item.term + ' Month'),
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
    } else {
        const param = new URLSearchParams(window.location.search);
        id_tr = Number(param.get('id'));
        const storage_rc = JSON.parse(localStorage.getItem(SK_RC)) || [];
        const storage_drc = JSON.parse(localStorage.getItem(SK_DRC)) || [];

        const filter_detail_str_drc = storage_drc.filter(item => item.id_rc === id_tr);
        tbody_drc.textContent = '';
        filter_detail_str_drc.forEach(item => {
            const tr = document.createElement('tr');

            tr.append(
                createTd(item.id),
                createTd(item.id_rc),
                createTd(item.date),
                createTd(item.desc),
                createTd(item.type),
                createTd(formatRupiah(item.amount))
            )

            const act_button = document.createElement('td');
            act_button.innerHTML = `<button class='deletedrc' data-id='${item.id}'>Delete</button>`;

            tr.appendChild(act_button);
            tbody_drc.appendChild(tr);
        })
    }

}

if (form_rc) {
    form_rc.addEventListener('submit', (e) => {
        e.preventDefault();

        submit_rc();
        renderTable();
        action_button();
        form_rc.reset();
    });
} else {
    back_drc.addEventListener('click', () => {
        window.location.href = 'index.html'
    });
    form_drc.addEventListener('submit', (e) => {
        e.preventDefault();

        submit_rc();
        renderTable()
        action_button();
        form_drc.reset();
    })
}

renderTable();
action_button();