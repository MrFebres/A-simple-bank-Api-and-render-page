const bankWeb = {
    init: () => {
        bankWeb.enableButton();
    },

    enableButton: () => {
        const sel = document.getElementById('user-select');
        const but = document.getElementById('submit-btn');

        addEventListener('change', () => {
            if (parseInt(sel.value) === -1) {
                but.disabled = true;
                but.setAttribute('cursor', 'not-allowed');
            } else {
                but.disabled = false;
                but.setAttribute('cursor', 'pointer');
                bankWeb.showButton(sel.value);
            }
        })
    },

    showButton: (val) => {
        const but = document.getElementById('submit-btn');

        but.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Haz clickeado el boton');
            bankWeb.callApi(val);
        })
    },

    callApi: async (id) => {
        const callApi = await fetch(`https://jsonmock.hackerrank.com/api/transactions?userId=${id}`)
            .then(response => {
                return response.json();
            });
        // console.log(callApi);
        bankWeb.calculateAccBalance(callApi);
        // bankWeb.renderObj(callApi);
    },

    calculateAccBalance: (obj) => {
        let items = [];
        let accBalance = 0;
        let debit = 0;
        let credit = 0;
        items.push(obj)
        const data = items[0].data;

        data.forEach(element => {
            let amount = element.amount.slice(1);
            // console.log(amount);
            element.txnType == 'debit' ?
                debit = debit + parseFloat(amount)
                : credit = credit + parseFloat(amount);
        });
        
        accBalance = debit - credit;
        // console.log(accBalance);
        bankWeb.renderObj(data, accBalance);
    },

    renderObj: (data, accBalance) => {
        const loader = document.querySelector('.loader-container');
        bankWeb.clearObjs(loader);
            if (data !== null || empty) {
                loader.style.display = 'none';
                document.querySelector('#user-name').innerHTML = `${data[0].userName}`;
                document.querySelector('#user-balance').innerHTML = `$ ${accBalance}`;
                data.forEach(element => {
                    document.querySelector('#monthly-statements').innerHTML += 
                    `<div id="${element.timestamp}" class="statement-card">${element.timestamp}
                        <p>${element.location.address}</p>
                        <p>${element.location.city}</p>
                        <p>${element.location.zipCode}</p>
                    </div>`;
                    if (element.txnType === 'debit') {
                        document.getElementById(`${element.timestamp}`).innerHTML += 
                            `<div class="monthly-debit">${element.amount}</div>`
                    } else {
                        document.getElementById(`${element.timestamp}`).innerHTML += 
                            `<div class="monthly-credit">${element.amount}</div>`
                    }
                });
            } else {
                loader.style.display = 'flex';
            }
    },

    clearObjs: (loader) => {
        loader.display = 'flex';
        document.querySelector('#monthly-statements').innerHTML = '';
    }
}

bankWeb.init();