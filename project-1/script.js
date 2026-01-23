const button = document.querySelector('.button');
const nav = document.querySelector('nav');
const navlist = document.querySelectorAll('nav a');
const header = document.querySelector('header');
const body = document.body;
const judul = document.querySelector('header h1');

button.addEventListener("click", function(){
    button.classList.toggle("active");
    nav.classList.toggle('active');
    header.classList.toggle('active');
    body.classList.toggle('active');
    if (judul.textContent == "Farise") {
        judul.textContent = "Menu Navigasi";
        judul.classList.add('active');
    } else {
        judul.textContent="Farise";
        judul.classList.remove('active');
    };
});

navlist.forEach( (e) => {
    e.addEventListener("click", () => {
        button.classList.toggle("active");
        nav.classList.toggle("active");
        header.classList.toggle("active");
        body.classList.toggle("active");
        judul.textContent="Farise";
        judul.classList.remove('active');
    })
})