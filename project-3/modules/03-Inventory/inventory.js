const form_np = document.querySelector(".new_product");
const date = document.querySelector("#date");
const name_p = document.querySelector("#name");
const unit = document.querySelector("#unit");
const min_stock = document.querySelector("#min_stock");
const qty = document.querySelector("#qty");
const price = document.querySelector("#price");
const rupiah = (x) => new Intl.NumberFormat('id-ID', {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
}).format(Number(x));


// FUNCTION
const action_button = () => {
    const hapus = document.querySelector('#delete');
    const edit = document.querySelector('#edit');
    const detail = document.querySelector('#detail');
    if (hapus) {
        hapus.addEventListener("click", (e)=> {
            const tr_hapus = e.target.closest('tr');
            const id_product_hapus = tr_hapus.getAttribute("index");

            let list_p_hapus = JSON.parse(localStorage.getItem("list_p"));
            let list_p_baru = list_p_hapus.splice(Number(id_product_hapus), 1);
            let detail_p_hapus = JSON.parse(localStorage.getItem("detail_p"));
            let detail_p_baru = detail_p_hapus.filter(item => item.id_product !== Number(id_product_hapus));
            localStorage.setItem("list_p", JSON.stringify(list_p_baru));
            localStorage.setItem("detail_p", JSON.stringify(detail_p_baru));
            renderlp();
        })
    }
}   

const createTD = (isi) => {
    const td = document.createElement("td");
    td.textContent = isi;
    return td;
}

const renderlp = () => {
    let list_p = JSON.parse(localStorage.getItem("list_p")) || [];
    let tbody = document.querySelector(".table_lp table tbody");

    tbody.textContent = "";


    list_p.forEach((item,i) => {
        const tr = document.createElement("tr");

        tr.setAttribute("index", i);

        tr.append(
            createTD(i),
            createTD(item.name),
            createTD(item.unit),
            createTD(item.min_stock),
            createTD(item.current_qty),
            createTD(rupiah(item.avg_price))
        )

        const td_action = document.createElement("td");
        td_action.innerHTML = "<button id='delete'>Delete</button><button id='edit'>Edit</button><button id='detail'>Detail</button>";

        tr.appendChild(td_action);
        tbody.appendChild(tr);
        action_button();
    });
}
// FUNCTION

// LISTENER
if (form_np) {
    form_np.addEventListener("submit", (e) => {
        e.preventDefault();

        let list_p = JSON.parse(localStorage.getItem("list_p")) || [];
        let detail_p = JSON.parse(localStorage.getItem("detail_p")) || [];

        let table_lp = {
            name: name_p.value,
            unit: unit.value,
            min_stock: min_stock.value,
            current_qty: qty.value,
            avg_price: price.value,
        }

        list_p.push(table_lp); 

        localStorage.setItem("list_p", JSON.stringify(list_p));

        let table_dp = {
            id_product: list_p.length - 1,
            date: date.value,
            type: "IN",
            qty: qty.value,
            price: price.value,
            balance_qty: qty.value,
            notes: "Add New Products",
        }

        detail_p.push(table_dp);

        localStorage.setItem("detail_p", JSON.stringify(detail_p));

        renderlp();
        action_button();
        form_np.reset();
    })
}
// LISTENER

renderlp()
action_button()