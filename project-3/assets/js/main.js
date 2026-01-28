const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const aside = document.querySelector('aside');
const body = document.body;

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    aside.classList.toggle('active');
    body.classList.toggle('active');
})

const modul_loc = '../project-3/modules/';

function clickCard(card, location) {
    document.querySelector(card).addEventListener('click', () => {
        window.location.href = location;
    });
}

clickCard('.fixed-asset', modul_loc+'01-Fixed-Asset')
clickCard('.treasury', modul_loc+'02-Treasury')
clickCard('.inventory', modul_loc+'03-Inventory')
clickCard('.receivables', modul_loc+'04-Receivables')
clickCard('.about', 'about.html')