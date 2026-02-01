const aset_button = document.querySelector('.aset');
const form_button = document.querySelector('.form-table');
const back = document.querySelector('#back');
const assetLink = document.querySelector('#add_asset');

if (form_button) {
    form_button.addEventListener('click', () => {
        window.location.href ="table.html"
    })
    aset_button.addEventListener('click', () => {
        window.location.href ="detail.html"
    })
}

if (back) {
    back.addEventListener("click", ()=>{
        window.location.href = "index.html"
    })
}

if (assetLink) {
    assetLink.addEventListener("click", ()=>{
        window.location.href = "table.html"
    })
}