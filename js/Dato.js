
let tipo = '';
let descripcion = '';
let valor = '';
let PocentajeTotal = '';

let ingresos = [];
let egresos = [];

function cargarCabecero() {
    document.getElementById('forma').addEventListener('submit', function(event) {
        event.preventDefault();

        tipo = document.getElementById('tipo').value;
        descripcion = document.getElementById('descripcion').value;
        valor = parseFloat(document.querySelector('.agregar_valor').value) || 0;

        let transaccion = {
            tipo: tipo,
            descripcion: descripcion,
            valor: valor
        };

        console.log(transaccion);

        if (valor > 0) {
            if (tipo === 'ingreso') {
                ingresos.push(valor);
            } else if (tipo === 'egreso') {
                egresos.push(valor);
            }

            agregarElemento(transaccion);
            calcularPresupuesto();
        }

        document.getElementById('forma').reset();
    });
}

function calcularPresupuesto() {
    let totalIngresos = ingresos.reduce((sum, ingreso) => sum + ingreso, 0);
    let totalEgresos = egresos.reduce((sum, egreso) => sum + egreso, 0);
    let presupuesto = totalIngresos - totalEgresos;

    Ingresos(totalIngresos);
    Egresos(totalEgresos);
    PresupuestoDisponible(presupuesto);
    Porcentaje(totalIngresos, totalEgresos);

    console.log("Ingresos:", ingresos);
    console.log("Egresos:", egresos);
}

function Ingresos(i) {
    document.querySelector('.presupuesto_ingreso--valor').textContent = `+ $ ${i.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
    console.log("Total Ingresos:", i);
}

function Egresos(i) {
    document.querySelector('.presupuesto_egreso--valor').textContent = `+ $ ${i.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
    console.log("Total Egresos:", i);
}

function PresupuestoDisponible(i) {
    document.querySelector('.presupuesto_valor').textContent = `+ $ ${i.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
    console.log("Presupuesto disponible:", i);
}

function Porcentaje(i, e) {
    PocentajeTotal = i > 0 ? (e / i) * 100 : 0;
    document.querySelector('.presupuesto_egreso--porcentaje').textContent = `${PocentajeTotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} %`;
}

function agregarElemento(transaccion) {
    let contenedor = transaccion.tipo === 'ingreso'
        ? document.querySelector('.lista_ingresos')
        : document.querySelector('.lista_egresos');

    let div = document.createElement('div');
    div.classList.add('elemento', 'limpiarEstilos');
    div.innerHTML = `
        <div class="elemento_descripcion">${transaccion.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${transaccion.tipo === 'ingreso' ? '+' : '-'} $ ${transaccion.valor.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar_btn">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>`;

    div.querySelector('.elemento_eliminar_btn').addEventListener('click', function () {
        div.remove();

        if (transaccion.tipo === 'ingreso') {
            const index = ingresos.indexOf(transaccion.valor);
            if (index !== -1) ingresos.splice(index, 1);
        } else {
            const index = egresos.indexOf(transaccion.valor);
            if (index !== -1) egresos.splice(index, 1);
        }

        calcularPresupuesto();
    });

    contenedor.appendChild(div);
}

cargarCabecero();
