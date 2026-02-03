// for general (more than 1)
const back_general = document.querySelector('#back');
const createTD = (value) => {
    const td = document.createElement("td");
    td.textContent = value;
    return td;
}

if (back_general) {
    back_general.addEventListener("click", ()=>{
        window.location.href = "index.html"
    })
}

const rupiah = (x) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
}).format(Number(x));

// for index
const aset_button_index = document.querySelector('.aset');
const form_button_index = document.querySelector('.form-table');

if (form_button_index) {
    form_button_index.addEventListener('click', () => {
        window.location.href ="table.html"
    })
    aset_button_index.addEventListener('click', () => {
        window.location.href ="detail.html"
    })
}

// for detail
const assetLink_detail = document.querySelector('#add_asset');
const list_asset = document.querySelector("#list_asset");

if (assetLink_detail) {
    assetLink_detail.addEventListener("click", ()=>{
        window.location.href = "table.html";
    });

    const data = JSON.parse(localStorage.getItem("f_asset")) || [];

    data.forEach( (item, i) =>{
        const li = document.createElement('li');
        li.id = "button-detail";
        li.setAttribute("index", i)
        li.textContent = item.desc;
        list_asset.appendChild(li);
    })

    const button_detail = document.querySelectorAll("#button-detail");


    if (button_detail) {
        button_detail.forEach(item => {
            item.addEventListener("click", (e)=>{
                const tbody = document.querySelector("tbody");
                tbody.textContent = "";
                let index = e.target.getAttribute("index");

                let Month = Number(data[index].lifetime);
                let acum_depre = 0;
                let x = 1
                let date = new Date(data[index].tgl); 

                while (x <= Month) {
                    let tahun = date.getFullYear();
                    let bulan = String(date.getMonth()+1).padStart(2, '0');
                    let hari = String(date.getDate()).padStart(2, '0');
                    let tgl_baru = `${tahun}-${bulan}-${hari}`;

                    let desc = data[index].desc;
                    let cost = data[index].cost;
                    let depresiasi = (Number(data[index].cost) - Number(data[index].salvage))/Month;
                    acum_depre += depresiasi;
                    let book_value = Number(data[index].cost) - acum_depre;

                    const tr = document.createElement("tr");

                    tr.append(
                        createTD(tgl_baru),
                        createTD(desc),
                        createTD(rupiah(cost)),
                        createTD(rupiah(depresiasi)),
                        createTD(rupiah(acum_depre)),
                        createTD(rupiah(book_value))
                    )

                    tbody.append(tr);
                    date.setMonth(date.getMonth()+1) ;
                    x++;
                }
            })
        });

    }
}

// for table & insert
const form_insert = document.getElementById('form_insert');
const form_edit = document.getElementById('form_edit');
const sec_edit = document.querySelector('#sec_edit');
const sec_insert = document.querySelector('#form');
const pdate_insert = document.querySelector('#date');
const desc_insert = document.querySelector('#desc');
const cost_insert = document.querySelector('#cost');
const salvage_insert = document.querySelector('#salvage');
const lifetime_insert = document.querySelector('#lifetime');



if (form_insert) {
    renderTable();
    action();
    form_insert.addEventListener("submit", (e)=>{
        e.preventDefault();
        let data = JSON.parse(localStorage.getItem("f_asset")) || [];

        let data_new = {
            tgl: pdate_insert.value,
            desc: desc_insert.value,
            cost: cost_insert.value,
            salvage: salvage_insert.value,
            lifetime: lifetime_insert.value
        }

        data.push(data_new);

        localStorage.setItem("f_asset", JSON.stringify(data));

        renderTable();

        form_insert.reset();
    });

    // Table
    function renderTable() {
        const tbody = document.querySelector('tbody');
        tbody.textContent="";

        let data = JSON.parse(localStorage.getItem("f_asset")) || [];

        data.forEach((item, i) => {
            const tr = document.createElement('tr');
            tr.setAttribute("index", i)

            tr.append(
                createTD(i),
                createTD(item.tgl),
                createTD(item.desc),
                createTD(rupiah(item.cost)),
                createTD(rupiah(item.salvage)),
                createTD(item.lifetime + " Month")
            );            

            const td_button_d = document.createElement("td");
            td_button_d.innerHTML = "<button id='del' class='del'>Delete</button><button id='edit' class='edit'>Edit</button>";
            
            tr.appendChild(td_button_d);
            tbody.appendChild(tr);
        });


    }

    function action() {
        const tbody = document.querySelector('tbody');
        tbody.addEventListener("click", (e) => {
            if (e.target.classList.contains('del')) {
                const row = e.target.closest('tr');
                let index = row.getAttribute("index");

                let data = JSON.parse(localStorage.getItem("f_asset")) || [];

                data.splice(index);

                localStorage.setItem("f_asset", JSON.stringify(data));
                renderTable();
                alert("Delete Succes");
            } else if (e.target.classList.contains('edit')) {
                const row = e.target.closest('tr');
                let index = row.getAttribute("index");
                sec_edit.setAttribute("index", index);

                sec_edit.style.display = "grid";
                sec_insert.style.display = "none";

                let data = JSON.parse(localStorage.getItem("f_asset")) || [];
                let data_edit = data[index];

                document.querySelector('#dateD').value = data_edit.tgl;
                document.querySelector('#descD').value = data_edit.desc;
                document.querySelector('#costD').value = data_edit.cost;
                document.querySelector('#salvageD').value = data_edit.salvage;
                document.querySelector('#lifetimeD').value = data_edit.lifetime; 
            } 
        })
    }

    // EDIT 
    form_edit.addEventListener("submit", (e)=>{
        e.preventDefault();
        let index = sec_edit.getAttribute("index");
        let data = JSON.parse(localStorage.getItem("f_asset")) || [];

        let data_new = {
            tgl: document.querySelector('#dateD').value,
            desc: document.querySelector('#descD').value,
            cost: document.querySelector('#costD').value,
            salvage: document.querySelector('#salvageD').value,
            lifetime: document.querySelector('#lifetimeD').value
        }

        data[index] = data_new;

        localStorage.setItem("f_asset", JSON.stringify(data));

        renderTable();
        sec_edit.style.display = "none";
        sec_insert.style.display = "grid";
        form_edit.reset();
        alert("Edit Succes");
    });
}
