const burger = document.getElementById('burger');
const nav = document.querySelector('nav');
const body = document.body;

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    body.classList.toggle('no-scroll');
});

const link = document.querySelectorAll('nav ul li a');
link.forEach((a) => {
    a.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});
