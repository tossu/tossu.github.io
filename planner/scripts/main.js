function init() {

    Chart.register(ChartDataLabels);

    const planned = {
        "Kiinteä": (655 / 2) + 25 + 8 + 10,
        "Ravintola": 30,
        "Ruoka": 250,
        "Terveys": 10
    };

    const expenses = {
        "Kiinteä": [
            { value: 655 / 2, info: "Vuokra" },
            { value: 25, info: "Vesi" },
            { value: 8, info: "Puhelin" },
            { value: 10, info: "Sähkö" }
        ],
        "Ravintola": [

        ],
        "Ruoka": [

        ],
        "Terveys": [
            { value: 10, info: "Lääke" }
        ]
    }

    function buildChartData(planned, expenses) {

    }


    const ctx = document.getElementById('myChart');

    const data = [
        {
            label: "Budjetoitu",
            data: [250, 100, 0, 10],
            backgroundColor: "#f3f3f3",
            barThickness: 20,
        },
        {
            label: "Toteutunut",
            data: [250, 100, 0, 10],
            backgroundColor: "pink",
            barThickness: 20,
        },
    ];

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Ruoka", "Terveys", "Ravintola", "Sähkö"],
            datasets: data,
        },
        options: {
            indexAxis: 'y',
            elements: {
                bar: {
                    borderWidth: 0,
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
                title: {
                    display: false
                },
                datalabels: {
                    display: function (context) {
                        const index = context.dataIndex;
                        const value = context.dataset.data[index];
                        return value !== 0;
                    },
                    formatter: function (value) {
                        if (value.negative) {
                            return `-${value.value}`;
                        }
                        return value.value;
                    }
                },
            },
            scales: {
                x: {
                    stacked: false,
                    grid: {
                        display:false,
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                    }
                },
                y: {
                    stacked: false,
                    grid: {
                        display:false,
                        drawBorder: false
                    }   
                }
            }
        },
    });
}

window.onload = () => {
    init();
};