let graph = null;

const renderGrafik = () => {
    let data = JSON.parse(localStorage.getItem("f_asset")) || [];
    let new_data = [];
    let time = Number(data[0].lifetime);
    let date = new Date(data[0].tgl);
    let akum_depre = 0;
    let x = 1;
    while(x <= time){
        let tahun = date.getFullYear();
        let bulan = String(date.getMonth()+1).padStart(2, '0');
        let tgl = String(date.getDate()).padStart(2, '0');

        let new_date = `${tahun}-${bulan}-${tgl}`;
        let cost = data[0].cost;
        let depresiasi = (Number(cost) - Number(data[0].salvage))/time;
        akum_depre += depresiasi
        let book_value = Number(cost) - akum_depre;
        let pre_data = {
            tgl: new_date,
            book_value: book_value
        }
        new_data.push(pre_data);
        date.setMonth(date.getMonth()+1);
        x++;
    }

    const list_tgl = new_data.map(item => (item.tgl));
    const list_bv = new_data.map(item => Number(item.book_value));
    const ctx = document.getElementById("graphic");

    if (graph) {
        graph.destroy();
    }

    graph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: list_tgl,
            datasets: [{
                label: 'Book Values ' + data[0].desc,
                data: list_bv,
                borderColor:'rgb(0, 172, 0)',
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 100000,
                        color: '#ffffff',
                        callback: function(value) {
                            return 'Rp ' + value.toLocaleString('id-ID');
                        }
                    },
                    grid: {color: 'rgba(255, 255, 255, 0.1)'}
                },
                x: {
                    ticks: { color: '#ffffff'},
                    grid: { display: false}
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    titleColor: '#000',
                    bodyColor: '#000'
                }
            }
        }
    })
}

renderGrafik();