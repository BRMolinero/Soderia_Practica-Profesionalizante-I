/* TIPO DE CLIENTE */
async function cargarTiposCliente(action, cliente = null) {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/tipo-cliente');
        const selectTipoCliente = document.querySelector('#tipoCliente');

        selectTipoCliente.innerHTML = '<option value="" selected disabled>Seleccione un tipo</option>';
        response.data.forEach(tipoCliente => {
            const option = document.createElement('option');
            option.value = tipoCliente.idTipoCliente;
            option.textContent = tipoCliente.nombre;

            // Si se trata de edición, seleccionar el tipo correspondiente
            if (action === 'editar' && cliente && cliente.tipoCliente === tipoCliente.nombre) {
                option.selected = true;
            }

            selectTipoCliente.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los tipos de cliente:', error);
    }
}


/* ZONA */
async function cargarZonas(idLocalidadSeleccionada, action, cliente = null) {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/zona');
        const selectZona = document.querySelector('#zona');

        // Si no hay cliente o acción de creación, se vacía la zona
        selectZona.innerHTML = '<option value="" selected disabled>Seleccione una zona</option>';
        if (action === 'editar' && cliente) {
            // Si es una edición, filtrar por la zona del cliente
            const zonasFiltradas = response.data.filter(zona => zona.idLocalidad == idLocalidadSeleccionada);
            zonasFiltradas.forEach(zona => {
                const option = document.createElement('option');
                option.value = zona.idZona;
                option.textContent = zona.zona;

                // Seleccionar la zona correspondiente al cliente
                if (cliente.zona === zona.zona) {
                    option.selected = true;
                }
                selectZona.appendChild(option);
            });
        } else {
            const zonasFiltradas = response.data.filter(zona => zona.idLocalidad == idLocalidadSeleccionada);
            zonasFiltradas.forEach(zona => {
                const option = document.createElement('option');
                option.value = zona.idZona;
                option.textContent = zona.zona;
                selectZona.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error al cargar las zonas:', error);
    }
}

/* LOCALIDAD */
let localidadesMap = {};
async function cargarLocalidades(action, cliente = null) {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/localidad');
        const selectLocalidad = document.querySelector('#ciudad');
        selectLocalidad.innerHTML = '<option value="" selected disabled>Seleccione una localidad</option>';

        response.data.forEach(localidad => {
            const option = document.createElement('option');
            option.value = localidad.idLocalidad;
            option.textContent = localidad.localidad;

            // Seleccionar la localidad correspondiente al cliente
            if (action === 'editar' && cliente && cliente.localidad === localidad.localidad) {
                option.selected = true;
            }
            selectLocalidad.appendChild(option);
            localidadesMap[localidad.localidad] = localidad.idLocalidad;
        });

        // Deshabilitar el select de zona inicialmente
        const selectZona = document.querySelector('#zona');
        selectZona.disabled = true;

        // Habilitar y cargar las zonas cuando se selecciona una localidad
        selectLocalidad.addEventListener('change', function () {
            const idLocalidadSeleccionada = this.value;
            if (idLocalidadSeleccionada) {
                cargarZonas(idLocalidadSeleccionada, action, cliente); // cargar zonas con el contexto actual
                selectZona.disabled = false;
            } else {
                selectZona.innerHTML = '<option value="" selected disabled>Seleccione una zona</option>';
                selectZona.disabled = true;
            }
        });

        // Verificar si  modo de edición
        if (action === 'editar' && cliente) {
            // Establecer la localidad seleccionada
            const idLocalidadSeleccionada = localidadesMap[cliente.localidad];
            if (idLocalidadSeleccionada) {
                selectLocalidad.value = idLocalidadSeleccionada; // Establecer la localidad seleccionada
                const event = new Event('change'); // Crear un evento de cambio
                selectLocalidad.dispatchEvent(event); // ejecutar el evento de cambio
            } else {
                console.warn('No se encontró el ID para la localidad:', cliente.localidad);
            }
        }

    } catch (error) {
        console.error('Error al cargar las localidades:', error);
    }
}

/* CONDICIÓN FISCAL */
async function cargarCondicionFiscal(action, cliente = null) {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/condicion-fiscal');
        const selectCondicionFiscal = document.querySelector('#condicionFiscal');
        selectCondicionFiscal.innerHTML = '<option value="" selected disabled>Seleccione Cond. Fiscal</option>';

        response.data.forEach(condicionFiscal => {
            const option = document.createElement('option');
            option.value = condicionFiscal.idCondicionFiscal;
            option.textContent = condicionFiscal.condicionFiscal || 'Sin Nombre';

            // Seleccionar la condición fiscal correspondiente al cliente
            if (action === 'editar' && cliente && cliente.condicionFiscal === condicionFiscal.condicionFiscal) {
                option.selected = true;
            }
            selectCondicionFiscal.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las condiciones fiscales:', error);
    }
}

/* Frecuencia */

async function cargarFrecuencia(action, pedido = null) {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/frecuencia');
        
        const selectElement = document.getElementById('frecuenciaSelect');
        selectElement.innerHTML = ''; // Limpiar las opciones actuales del select

        const FrecuenciasActivas = response.data.filter(frecuencia => frecuencia.estado === 1);

        FrecuenciasActivas.forEach(frecuencia => {
            const option = document.createElement('option');
            option.value = frecuencia.idFrecuencia;
            option.textContent = frecuencia.frecuencia;
            selectElement.appendChild(option);

            if (action === 'editar' && pedido && pedido.idFrecuencia === frecuencia.idFrecuencia) {
                option.selected = true;
            }

        });
    } catch (error) {
        console.error('Error al cargar las frecuencias:', error);
    }
}

/* Estado Pedido */
async function cargarEstadoPedido(action, pedido = null) {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/estado-pedido');
        
        const selectElement = document.getElementById('estadoSelect');
        selectElement.innerHTML = ''; // Limpiar las opciones actuales del select

        response.data.forEach(estadoPedido => {
            const option = document.createElement('option');
            option.value = estadoPedido.idEstadoPedido;
            option.textContent = estadoPedido.estadoPedido;
            selectElement.appendChild(option);

            if (action === 'editar' && pedido && pedido.idEstadoPedido === estadoPedido.idEstadoPedido) {
                option.selected = true;
            }

        });
    } catch (error) {
        console.error('Error al cargar los estados de pedido:', error);
    }
}

/* DiaEntrega */

async function cargarDiaDeEntrega(action, pedido = null) {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/dia');
        
        const selectElement = document.getElementById('diaPedido');
        selectElement.innerHTML = ''; // Limpiar las opciones actuales del select

        const DiasDeEntregaActivos = response.data.filter(diaEntrega => diaEntrega.estado === 1);

        DiasDeEntregaActivos.forEach(diaEntrega => {
            const option = document.createElement('option');
            option.value = diaEntrega.idDiaEntrega;
            option.textContent = diaEntrega.diaEntrega;
            selectElement.appendChild(option);

            if (action === 'editar' && pedido && pedido.idDiaEntrega === diaEntrega.idDiaEntrega) {
                option.selected = true;
            }

        });
    } catch (error) {
        console.error('Error al cargar los días de entrega:', error);
    }
}

/* ModoPago */

async function cargarModoPago(action, pedido = null) {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/modo-pago');
        
        const selectElement = document.getElementById('medioPagoSelect');
        selectElement.innerHTML = ''; // Limpiar las opciones actuales del select

        const ModoPagoActivos = response.data.filter(cliente => cliente.estado === 1);

        ModoPagoActivos.forEach(modoPago => {
            const option = document.createElement('option');
            option.value = modoPago.idModoPago;
            option.textContent = modoPago.modoPago;
            selectElement.appendChild(option);

            // Si se trata de edición, seleccionar el tipo correspondiente
            if (action === 'editar' && pedido && pedido.idModoPago === modoPago.idModoPago) {
                option.selected = true;
            }

        });
    } catch (error) {
        console.error('Error al cargar los modos de pago:', error);
    }
}


/* TIPO DE PRODUCTO */
async function cargarTiposProducto(action, producto = null) {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/tipo-producto');
        const selectTipoProducto = document.querySelector('#tipoProducto');

        selectTipoProducto.innerHTML = '<option value="" selected disabled>Seleccione un tipo</option>';
        response.data.forEach(tipoProducto => {
            const option = document.createElement('option');
            option.value = tipoProducto.idTipoProducto;
            option.textContent = tipoProducto.tipoProducto;

            // Si se trata de edición, seleccionar el tipo correspondiente
            if (action === 'editar' && producto && producto.tipoProducto === tipoProducto.tipoProducto) {
                option.selected = true;
            }

            selectTipoProducto.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los tipos de producto:', error);
    }
}

/* PROVEEDOR */
async function cargarProveedor(action, producto = null) {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/proveedor');
        const selectProveedor = document.querySelector('#proveedorProducto');

        selectProveedor.innerHTML = '<option value="" selected disabled>Seleccione un proveedor</option>';
        response.data.forEach(proveedor => {
            const option = document.createElement('option');
            option.value = proveedor.idProveedor;
            option.textContent = proveedor.razonSocial;

            // Si se trata de edición, seleccionar el tipo correspondiente
            if (action === 'editar' && producto && producto.idProveedor === proveedor.idProveedor) {
                option.selected = true;
            }

            selectProveedor.appendChild(option);
        });
        //console.log(response.data)
    } catch (error) {
        console.error('Error al cargar los proveedores:', error);
    }
}



