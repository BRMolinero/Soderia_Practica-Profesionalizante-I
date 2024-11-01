async function cargarProductosTabla(filter = null) {
    try {
        let response;
        if (filter) {
            response = await axios.get('http://localhost:3000/api/producto', {
                params: filter // Pasamos los filtros como parámetros de la URL
            });
        } else {
            response = await axios.get('http://localhost:3000/api/producto');
        }

        const tbody = document.querySelector('#productosTable tbody');

        // Limpiar el contenido del tbody antes de agregar nuevos datos
        tbody.innerHTML = '';

        // Ordenar los productos primero por estado y luego por nombre
        const productosOrdenados = response.data.sort((a, b) => {
            // Ordenar por estado (1 para activos primero)
            if (a.estado !== b.estado) {
                return b.estado - a.estado; // productos activos (estado = 1) primero
            }
            // Si tienen el mismo estado, ordenar por nombre alfabéticamente
            return a.nombre.localeCompare(b.nombre);
        });

        productosOrdenados.forEach(producto => agregarFilaProducto(tbody, producto));
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function agregarFilaListaPrecio(tbody, producto) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${producto.codigoInterno}</td>
        <td>${producto.nombre}</td>
        <td>${producto.tipoCliente}</td>
        <td>${producto.precio}</td>
    `;
    tbody.appendChild(fila);
}


function agregarFilaProducto(tbody, producto) {
    const fila = document.createElement('tr');

    // Asignar una clase de Bootstrap para diferenciar productos activos de inactivos
    if (producto.estado === 0) {
        fila.classList.add('table-secondary');
    }

    // Crear y agregar las celdas directamente
    let celda = document.createElement('td');
    celda.textContent = producto.codigoInterno;
    celda.classList.add('codigo-interno');
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.nombre;
    celda.classList.add('nombre');
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.tipoProducto;
    celda.classList.add('tipo-producto');
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.proveedor;
    celda.classList.add('proveedor');
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.presentacion;
    celda.classList.add('presentacion');
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.precioMayorista;
    celda.classList.add('precio-mayorista');
    celda.style.display = 'none';
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.precioMinorista;
    celda.classList.add('precio-minorista');
    celda.style.display = 'none';
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = formatearFecha(producto.fechaActualizacion);
    celda.classList.add('fecha-actualizacion');
    celda.style.display = 'none';
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.stockMinimo;
    celda.classList.add('stock-minimo');
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.stock;
    celda.classList.add('stock');
    fila.appendChild(celda);

    celda = document.createElement('td');
    celda.textContent = producto.estado === 1 ? 'Activo' : 'Inactivo';
    celda.classList.add('estado');
    fila.appendChild(celda);

    // Crear celda de acciones
    const celdaAcciones = document.createElement('td');
    celdaAcciones.classList.add('fixed-column');

    // Crear el contenedor para los botones
    const divBotones = document.createElement('div');
    divBotones.classList.add('d-flex', 'align-items-center');

    // Crear botón Modificar
    const botonModificar = document.createElement("button");
    botonModificar.classList.add('btn', 'btn-sm', 'btn-outline-primary', 'me-1');
    botonModificar.setAttribute('type', 'button');
    botonModificar.setAttribute('title', 'Editar');
    botonModificar.setAttribute('data-bs-toggle', 'modal');
    botonModificar.setAttribute('data-bs-target', '#productoModal');

    // Añadir el icono de Bootstrap dentro del botón Modificar
    const iconoModificar = document.createElement("i");
    iconoModificar.classList.add('bi', 'bi-pencil-square');
    botonModificar.appendChild(iconoModificar);

    // Añadir el evento de clic para modificar
    botonModificar.addEventListener("click", function () {
        document.getElementById('productoModalLabel').innerHTML = '<i class="bi bi-box-seam p-1"></i> Editar Producto';
        document.getElementById('productoModal').setAttribute('data-action', 'editar');
        document.getElementById('productoId').value = producto.idProducto;
        modificarDatosProducto(producto);
    });

    // Crear botón Eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add('btn', 'btn-sm', 'btn-outline-danger');
    botonEliminar.setAttribute('title', 'Deshabilitar');

    // Añadir el icono de Bootstrap dentro del botón Eliminar
    const iconoEliminar = document.createElement("i");
    iconoEliminar.classList.add('bi', 'bi-trash');
    botonEliminar.appendChild(iconoEliminar);

    // Si el producto está inactivo, ajustar el comportamiento del botón eliminar
    if (producto.estado === 0) {
        botonEliminar.setAttribute('title', 'Edite para Activarlo');
        botonEliminar.style.opacity = '0.5';
        botonEliminar.style.cursor = 'default';
        botonEliminar.addEventListener("click", function (e) {
            e.preventDefault();
        });
    } else {
        botonEliminar.addEventListener("click", function () {
            deshabilitarProducto(producto.idProducto);
        });
    }

    // Agregar los botones al div contenedor
    divBotones.appendChild(botonModificar);
    divBotones.appendChild(botonEliminar);

    // Añadir el contenedor de botones a la celda de acciones
    celdaAcciones.appendChild(divBotones);

    // Añadir la celda de acciones a la fila
    fila.appendChild(celdaAcciones);

    // Finalmente, agregar la fila al tbody
    tbody.appendChild(fila);
}

// Función para mostrar u ocultar la columna de Fecha de Actualización según visibilidad de precios
function actualizarVisibilidadFecha() {
    const encabezadoFechaActualizacion = document.getElementById('thFechaActualizacion');
    const columnasFechaActualizacion = document.querySelectorAll('.fecha-actualizacion');

    const mostrarFecha =
        document.getElementById('thPrecioMayorista').style.display !== 'none' ||
        document.getElementById('thPrecioMinorista').style.display !== 'none';

    // Mostrar u ocultar la columna de Fecha de Actualización
    encabezadoFechaActualizacion.style.display = mostrarFecha ? '' : 'none';
    columnasFechaActualizacion.forEach(columna => {
        columna.style.display = mostrarFecha ? '' : 'none';
    });
}

// Función para alternar visibilidad de la columna de Precio Mayorista
function togglePrecioMayorista() {
    const encabezadoColumnaMayorista = document.getElementById('thPrecioMayorista');
    const columnasMayorista = document.querySelectorAll('.precio-mayorista');

    // Alternar visibilidad de la columna de Precio Mayorista
    const mostrar = encabezadoColumnaMayorista.style.display === 'none';
    encabezadoColumnaMayorista.style.display = mostrar ? '' : 'none';
    columnasMayorista.forEach(columna => {
        columna.style.display = mostrar ? '' : 'none';
    });

    // Actualizar visibilidad de la Fecha de Actualización
    actualizarVisibilidadFecha();
    actualizarVisibilidadCamposSecundarios();
}

function actualizarVisibilidadCamposSecundarios() {
    const encabezadosSecundarios = [
        document.getElementById('thTipo'),
        document.getElementById('thProveedor'),
        document.getElementById('thPresentacion'),
        document.getElementById('thStockMinimo'),
        document.getElementById('thStock')
    ];

    const columnasSecundarias = document.querySelectorAll('.tipo-producto, .proveedor, .presentacion, .stock-minimo, .stock');

    // La visibilidad depende de que ambas columnas de precios estén ocultas
    const mostrarSecundarios =
        document.getElementById('thPrecioMayorista').style.display === 'none' &&
        document.getElementById('thPrecioMinorista').style.display === 'none';

    // Mostrar u ocultar los encabezados y columnas secundarias
    encabezadosSecundarios.forEach(encabezado => {
        encabezado.style.display = mostrarSecundarios ? '' : 'none';
    });
    columnasSecundarias.forEach(columna => {
        columna.style.display = mostrarSecundarios ? '' : 'none';
    });
}

// Función para alternar visibilidad de la columna de Precio Minorista
function togglePrecioMinorista() {
    const encabezadoColumnaMinorista = document.getElementById('thPrecioMinorista');
    const columnasMinorista = document.querySelectorAll('.precio-minorista');

    // Alternar visibilidad de la columna de Precio Minorista
    const mostrar = encabezadoColumnaMinorista.style.display === 'none';
    encabezadoColumnaMinorista.style.display = mostrar ? '' : 'none';
    columnasMinorista.forEach(columna => {
        columna.style.display = mostrar ? '' : 'none';
    });

    // Actualizar visibilidad de la Fecha de Actualización
    actualizarVisibilidadFecha();
    actualizarVisibilidadCamposSecundarios();
}

document.getElementById('botonPrecioMayorista').addEventListener('click', togglePrecioMayorista);
document.getElementById('botonPrecioMinorista').addEventListener('click', togglePrecioMinorista);

let botonNuevoProducto = document.getElementById("botonNuevoProducto");
botonNuevoProducto.addEventListener("click", function (event) {
    document.getElementById('productoModalLabel').innerHTML = '<i class="bi bi-person-plus p-1"></i> Nuevo Producto';
    limpiarModal();
    cargarTiposProducto('crear');
    cargarProveedor('crear');
});

/* Modal producto - Precio */
document.getElementById('precioMayoristaSwitch').addEventListener('change', function () {
    let precioMayoristaDiv = document.getElementById('precioMayoristaDiv');
    precioMayoristaDiv.style.display = this.checked ? 'block' : 'none';
});

document.getElementById('precioMinoristaSwitch').addEventListener('change', function () {
    let precioMinoristaDiv = document.getElementById('precioMinoristaDiv');
    precioMinoristaDiv.style.display = this.checked ? 'block' : 'none';
});

cargarProductosTabla();

function modificarDatosProducto(producto) {
    //console.log(cliente);
    // cargarLocalidades('editar', cliente);
    // cargarTiposCliente('editar', cliente);
    // cargarCondicionFiscal('editar', cliente);
    precargarDatosProducto(producto);
    cargarTiposProducto('editar', producto);
    cargarProveedor('editar', producto);
}

function precargarDatosProducto(producto) {
    document.getElementById('codigoInterno').value = producto.codigoInterno;
    document.getElementById('nombreProducto').value = producto.nombre;
    document.getElementById('presentacionProducto').value = producto.presentacion;
    document.getElementById('stockMinimoProducto').value = producto.stockMinimo;
    document.getElementById('stockProducto').value = producto.stock;
    document.getElementById('estadoProducto').value = producto.estado,
        fechaActualizacion = formatearFecha(producto.fechaActualizacion);
    document.getElementById('fechaActualizacion').value = fechaActualizacion;
    //Ver si esto funciona
    const precioMayoristaCheckbox = document.getElementById('precioMayoristaSwitch');
    const precioMayoristaInput = document.getElementById('precioMayorista');
    let precioMayoristaDiv = document.getElementById('precioMayoristaDiv');

    if (producto.precioMayorista) {
        precioMayoristaCheckbox.checked = true;
        precioMayoristaInput.value = parseInt(producto.precioMayorista);
        precioMayoristaDiv.style.display = 'block';
    } else {
        precioMayoristaCheckbox.checked = false;
        precioMayoristaInput.value = '';
        precioMayoristaDiv.style.display = 'none'; // Ocultar el input si no hay precio
    }

    // Checkbox y campo de precio de minorista
    const precioMinoristaCheckbox = document.getElementById('precioMinoristaSwitch');
    const precioMinoristaInput = document.getElementById('precioMinorista');
    let precioMinoristaDiv = document.getElementById('precioMinoristaDiv');
    if (producto.precioMinorista) {
        precioMinoristaCheckbox.checked = true;
        precioMinoristaInput.value = parseInt(producto.precioMinorista);
        precioMinoristaDiv.style.display = 'block';
    } else {
        precioMinoristaCheckbox.checked = false;
        precioMinoristaInput.value = '';
        precioMinoristaDiv.style.display = 'none'; // Ocultar el input si no hay precio
    }
}

function limpiarModal() {
    document.getElementById('codigoInterno').value = '';
    document.getElementById('nombreProducto').value = '';
    document.getElementById('presentacionProducto').value = '';
    document.getElementById('stockMinimoProducto').value = '';
    document.getElementById('stockProducto').value = '';
    document.getElementById('fechaActualizacion').value = '';

    // Reset para precio mayorista
    const precioMayoristaCheckbox = document.getElementById('precioMayoristaSwitch');
    const precioMayoristaInput = document.getElementById('precioMayorista');
    let precioMayoristaDiv = document.getElementById('precioMayoristaDiv');
    precioMayoristaCheckbox.checked = false;
    precioMayoristaInput.value = '';
    precioMayoristaDiv.style.display = 'none'; // Ocultar el input de precio

    // Reset para precio minorista
    const precioMinoristaCheckbox = document.getElementById('precioMinoristaSwitch');
    const precioMinoristaInput = document.getElementById('precioMinorista');
    let precioMinoristaDiv = document.getElementById('precioMinoristaDiv');
    precioMinoristaCheckbox.checked = false;
    precioMinoristaInput.value = '';
    precioMinoristaDiv.style.display = 'none'; // Ocultar el input de precio
}

function formatearFecha(fecha) {
    // Convertimos la fecha al formato YYYY-MM-DD
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0, así que sumamos 1
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}


async function nuevoProducto() {
    const apiUrl = `http://localhost:3000/api/producto`;
    const productoData = obtenerDatosFormularioProducto();

    if (!validacionCamposProducto()) return;

    // Primero, consulta si el Producto ya existe
    const consultaUrl = `${apiUrl}?nombre=${encodeURIComponent(productoData.nombre)}&codigoInterno=${encodeURIComponent(productoData.codigoInterno)}`;

    try {
        const response = await axios.get(consultaUrl);
        if (response.data.length > 0) {
            // Si hay resultados, el Producto ya existe
            Swal.fire({
                icon: 'warning',
                title: 'Producto ya existente',
                text: 'Ya existe un producto con los mismos datos.',
                confirmButtonText: 'Entendido'
            });
        } else {
            // Si no existe, procede a guardar el nuevo Producto
            const saveResponse = await axios.post(apiUrl, productoData);
            if (saveResponse.status === 200 || saveResponse.status === 201) {
                console.log('Producto guardado:', saveResponse.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Producto Guardado',
                    text: 'El producto se ha guardado correctamente.',
                    confirmButtonText: 'Entendido'
                }).then(() => {
                    location.reload();
                });
            } else {
                throw new Error('Error al guardar el producto: ' + saveResponse.status);
            }
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error.response ? error.response.data : error.message);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.',
            confirmButtonText: 'Entendido'
        });
    }
}

function obtenerDatosFormularioProducto() {
    return {
        codigoInterno: parseInt(document.getElementById('codigoInterno').value, 10),
        nombre: document.getElementById('nombreProducto').value,
        presentacion: document.getElementById('presentacionProducto').value,
        stockMinimo: parseInt(document.getElementById('stockMinimoProducto').value, 10),
        stock: parseInt(document.getElementById('stockProducto').value, 10),
        idTipoProducto: parseInt(document.getElementById('tipoProducto').value, 10),
        idProveedor: parseInt(document.getElementById('proveedorProducto').value, 10),
        estado: parseInt(document.getElementById('estadoProducto').value, 10),
        // Captura de precios opcionales
        precioMayorista: document.getElementById('precioMayoristaSwitch').checked ?
            parseFloat(document.getElementById('precioMayorista').value) : null,
        precioMinorista: document.getElementById('precioMinoristaSwitch').checked ?
            parseFloat(document.getElementById('precioMinorista').value) : null
    };
}
console.log(obtenerDatosFormularioProducto());

let botonGuardarProducto = document.getElementById("BotonGuardarProducto");

botonGuardarProducto.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Botón de guardar presionado");

    const productoId = document.getElementById('productoId').value;

    if (productoId) {
        editarProducto(productoId); // tengo id entonces existe
    } else {
        nuevoProducto();
    }

});

let botonFiltrar = document.getElementById("btnFiltrar");
botonFiltrar.addEventListener("click", function (event) {
    filter = obtenerDatosFiltro();
    cargarProductosTabla(filter);
});

function obtenerDatosFiltro() {
    const codigoInterno = document.getElementById('filtroCodigoInterno').value;
    const nombre = document.getElementById('filtroNombre').value;


    // Retornamos un objeto con los valores de los filtros
    return {
        nombre: nombre || '',
        codigoInterno: codigoInterno || '',
    };
}

let botonResetFiltrar = document.getElementById("btnResetFiltrar");
botonResetFiltrar.addEventListener("click", function (event) {
    document.getElementById("filtroCodigoInterno").value = "";
    document.getElementById("filtroNombre").value = "";
});


function editarProducto(productoId) {
    // Mostrar una alerta de confirmación antes de proceder
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas guardar los cambios realizados?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar cambios',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, proceder con la actualización del producto
            const apiUrl = `http://localhost:3000/api/producto/${productoId}`;
            const productoData = obtenerDatosFormularioProducto();

            axios.put(apiUrl, productoData)
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Producto actualizado',
                            text: 'El producto ha sido actualizado con éxito.',
                            confirmButtonText: 'Entendido'
                        }).then(() => {
                            location.reload();
                        });
                    }
                })
                .catch(error => {
                    console.error("Error al actualizar el producto:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar',
                        text: 'No se pudo actualizar el producto. Intenta nuevamente.',
                        confirmButtonText: 'Entendido'
                    });
                });
        }
    });
}

function deshabilitarProducto(productoId) {
    // Mostrar una alerta de confirmación antes de proceder
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas deshabilitar este producto?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, deshabilitar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, proceder con la deshabilitación del producto
            const apiUrl = `http://localhost:3000/api/producto/deshabilitar/${productoId}`;
            const productoData = { estado: 0 };

            axios.put(apiUrl, productoData)
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Producto deshabilitado',
                            text: 'El producto ha sido deshabilitado con éxito.',
                            confirmButtonText: 'Entendido'
                        }).then(() => {
                            location.reload();
                        });
                    }
                })
                .catch(error => {
                    console.error("Error al deshabilitar el producto:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al deshabilitar',
                        text: 'No se pudo deshabilitar el producto. Intenta nuevamente.',
                        confirmButtonText: 'Entendido'
                    });
                });
        }
    });
}

async function getProductosPedido(selectId = 'productoSelect0') {
    try {
        const response = await axios.get('http://localhost:3000/api/secundarias/producto');
        console.log(response.data);

        const selectElement = document.getElementById(selectId);
        selectElement.innerHTML = '<option value="" disabled selected>Seleccione Producto</option>'; // Limpiar las opciones actuales del select

        response.data.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.idProducto;
            option.textContent = producto.nombre;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function validacionCamposProducto() {
    let codigoInterno = document.getElementById('codigoInterno').value;
    let nombre = document.getElementById('nombreProducto').value;
    let presentacion = document.getElementById('presentacionProducto').value;
    let stockMinimo = document.getElementById('stockMinimoProducto').value;
    let stock = document.getElementById('stockProducto').value;
    let idTipoProducto = document.getElementById('tipoProducto').value;
    let idProveedor = document.getElementById('proveedorProducto').value;
    let estado = document.getElementById('estadoProducto').value;
    let precioMayorista = document.getElementById('precioMayoristaSwitch').checked ? document.getElementById('precioMayorista').value : null;
    let precioMinorista = document.getElementById('precioMinoristaSwitch').checked ? document.getElementById('precioMinorista').value : null;

    let error = false;
    let mensajesError = "";
    let camposObligatoriosFaltantes = [];

    // Validaciones para cada campo
    if (codigoInterno === "") {
        camposObligatoriosFaltantes.push("Código Interno");
        error = true;
    } else if (isNaN(codigoInterno) || parseInt(codigoInterno) <= 0) {
        mensajesError += "El Código Interno debe ser un número mayor que 0.<br>";
        error = true;
    }

    if (nombre === "") {
        camposObligatoriosFaltantes.push("Nombre");
        error = true;
    } else if (nombre.length > 40) {
        mensajesError += "El Nombre no debe superar los 40 caracteres.<br>";
        error = true;
    } else {
        let regex = /^[A-Za-zÀ-ÿ\s]+$/;
        if (!regex.test(nombre)) {
            mensajesError += "El Nombre solo debe contener letras y espacios.<br>";
            error = true;
        }
    }

    if (presentacion === "") {
        camposObligatoriosFaltantes.push("Presentación");
        error = true;
    } else if (presentacion.length > 50) {
        mensajesError += "La Presentación no debe superar los 50 caracteres.<br>";
        error = true;
    } else {
        let regex = /^[A-Za-zÀ-ÿ0-9\s]+$/;
        if (!regex.test(presentacion)) {
            mensajesError += "La Presentación solo puede contener letras, números y espacios.<br>";
            error = true;
        }
    }

    if (stockMinimo === "" || isNaN(stockMinimo) || parseInt(stockMinimo) < 0) {
        mensajesError += "El Stock Mínimo debe ser un número no negativo.<br>";
        camposObligatoriosFaltantes.push("Stock mínimo");
        error = true;
    }

    if (stock === "" || isNaN(stock) || parseInt(stock) < 0) {
        mensajesError += "El Stock debe ser un número no negativo.<br>";
        camposObligatoriosFaltantes.push("Stock");
        error = true;
    }

    if (idTipoProducto === "") {
        camposObligatoriosFaltantes.push("Tipo de Producto");
        error = true;
    }

    if (idProveedor === "") {
        camposObligatoriosFaltantes.push("Proveedor");
        error = true;
    }

    if (estado === "") {
        camposObligatoriosFaltantes.push("Estado");
        error = true;
    }

    if (precioMayorista !== "" && (isNaN(precioMayorista) || parseFloat(precioMayorista) < 0)) {
        mensajesError += "El Precio Mayorista debe ser un número no negativo.<br>";
        error = true;
    }

    if (precioMinorista !== "" && (isNaN(precioMinorista) || parseFloat(precioMinorista) < 0)) {
        mensajesError += "El Precio Minorista debe ser un número no negativo.<br>";
        error = true;
    }


    if (camposObligatoriosFaltantes.length > 0) {
        mensajesError += "Ingrese datos en: " + camposObligatoriosFaltantes.join(", ") + ".<br>";
    }


    // Mostrar alertas de error si es necesario
    if (error) {
        Swal.fire({
            icon: 'error',
            title: 'Campos obligatorios faltantes o con errores',
            html: mensajesError,
            confirmButtonText: 'Entendido'
        });
    }

    return !error; // Retorna false si hay errores
}
