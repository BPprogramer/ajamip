(function(){
    document.addEventListener("DOMContentLoaded", function(){
        const caja = document.querySelector('#cajas');
    if(caja){
        const subscriptores = document.querySelector('#subscriptores');
        const subscriptoresVigentes = document.querySelector('#subscriptoresVigentes');
        const subscriptoresInactivos = document.querySelector('#subscriptoresInactivos');
        const pagosVigentes = document.querySelector('#pagosVigentes');
        const fecha = document.querySelector('#fecha');
        const ingreso = document.querySelector('#ingreso');
        const ingresosMensuales = document.querySelector('#ingresosMensuales');
        const totalPagos = document.querySelector('#totalPagos');
        const selectYear = document.querySelector('#year');
        const selectMes = document.querySelector('#mes');

        const contenedor_estratos = document.querySelector('#estratos');
        const btnImprimirFacturasFiltradas = document.querySelector('#btnImprimirFacturasFiltradas');


        

        selectYear.addEventListener('change',leerInputs);
        selectMes.addEventListener('change',leerInputs);



        informacionUsuario();
        fechaActual();
        leerInputs();
        consultarEstratos();


        btnImprimirFacturasFiltradas.addEventListener('click',function(e){
            const estratoId = contenedor_estratos.value;
            if(estratoId==0){
                Swal.fire({
                    icon: 'error',
        
                    text: 'Porfavor seleccione un estrato'
                })
            }else{
                const url = `/api/facturas?estratos-key=${btoa(estratoId)}`
                //const url = `${location.origin}/api/facturas`
                window.open(url, '_blank');
            }
        })

        fecha.addEventListener('change',function(e){
            const fechaSeleccionada = e.target.value;
            consultarIngresosFecha(fechaSeleccionada)
        })
     
        async function consultarEstratos(){
            const url = `${location.origin}/api/estratos-all`;
            try {
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                mostrarEstratos(resultado);
            } catch (error) {
                console.log(error)
            }
        }

        function mostrarEstratos(estratos){
            console.log(estratos)
            estratos.forEach(estrato => {
                const option = document.createElement('OPTION');
                option.value=estrato.id
                option.textContent = estrato.estrato
                contenedor_estratos.appendChild(option)
            });
        }

        function leerInputs(){
            const year = selectYear.value;
            const mes = selectMes.value;
            const fecha = year+"-"+mes;
            consultarIngresosMensuales(fecha);
        }

        async function consultarIngresosMensuales(fecha){
            const datos = new FormData();
            datos.append('fecha', fecha);
            const url = '/api/inicio/ingresos-mensuales';
            try {
                const respuesta = await fetch(url, {
                    body:datos,
                    method:'POST'
                });
                const resultado = await respuesta.json();
                ingresosMensuales.textContent = '$'+resultado;

            } catch (error) {
                
            }
        }

        async function informacionUsuario(){
            try {
                const respuesta = await fetch('/api/inicio/registrados');
                const resultado = await respuesta.json();
                mostrarResultados(resultado);
            } catch (error) {
                
            }
        }

        function mostrarResultados(resultado){
            const {registrados, registrados_activos, registrados_inactivos, pagos_vigentes, ingresos} = resultado;
            subscriptores.textContent = registrados;
            subscriptoresVigentes.textContent = registrados_activos;
            subscriptoresInactivos.textContent = registrados_inactivos;
            pagosVigentes.textContent = pagos_vigentes;
            totalPagos.textContent = '$'+ingresos

        }
        

        function fechaActual(){
            const fechaActual = new Date().toISOString().slice(0, 10);
            fecha.value = fechaActual;
            consultarIngresosFecha(fechaActual);
        }
        async function consultarIngresosFecha(fecha){
            const datos = new FormData();
            datos.append('fecha', fecha);
       
            try {
                const respuesta = await fetch('/api/inicio/fecha', {
                    body:datos,
                    method:'POST'
                });
                const resultado = await respuesta.json();
                mostrarIngresos(resultado);
            } catch (error) {
                
            }
        }
        function mostrarIngresos(resultado){
            ingreso.textContent = '$'+resultado
        }
        
    }
    })
    

})();