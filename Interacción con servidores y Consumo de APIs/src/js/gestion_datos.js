import { alertError, alertSuccess } from "./alerts"; // Importa funciones para mostrar alertas

// Referencias a elementos del DOM
const endpointAppoinments = "http://localhost:3000/appointments"; // URL de la API
const form = document.getElementById('product-form'); // Formulario de productos
const listaProductos = document.getElementById('product-table'); // Lista de productos
const id = document.getElementById('id'); // Campo de ID
const nombreProducto = document.getElementById('product-name'); // Campo de nombre
const categoriaProducto = document.getElementById('product-category'); // Campo de categoría
const precioProducto = document.getElementById('product-price'); // Campo de precio
const productActions = document.getElementById('product-list'); 
const cantidadProducto = document.getElementById('cantidad');

// Importa las alertas si no están ya importadas
// import { alertError, alertSuccess } from "./alerts"; // Ya está importado arriba

// Validación para evitar productos con el mismo nombre o id
async function isDuplicateProduct(idValue, nombreValue) {
    try {
        let response = await fetch(endpointAppoinments, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const appointments = await response.json();
        return appointments.some(
            appt => appt.id === idValue || appt.nombre.toLowerCase() === nombreValue.toLowerCase()
        );
    } catch (error) {
        alertError('Error al validar duplicados');
        console.log(error.message);
        return false;
    }
}

// Muestra u oculta los botones de acciones según si hay productos
function showProductActions(show) {
    productActions.style.display = show ? 'block' : 'none';
}

// Renderiza productos y agrega botones de editar y eliminar solo si hay productos
function renderAppointments(appointments) {
    listaProductos.innerHTML = '';
    if (appointments.length === 0) {
        showProductActions(false);
        alertError('No hay productos para mostrar');
        return;
    }
    showProductActions(true);
    appointments.forEach(appointment => {
        const item = document.createElement('li');
        item.innerHTML = `
            ID: ${appointment.id} | Nombre: ${appointment.nombre} | Categoría: ${appointment.categoria} | Precio: ${appointment.precio} | Cantidad: ${appointment.cantidad}
            <button class="btn-editar" data-id="${appointment.id}">Editar</button>
            <button class="btn-eliminar" data-id="${appointment.id}">Eliminar</button>
        `;
        listaProductos.appendChild(item);
    });

    // Delegación de eventos para los botones
    listaProductos.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const appointment = appointments.find(a => a.id == btn.getAttribute('data-id'));
            if (appointment) {
                id.value = appointment.id;
                nombreProducto.value = appointment.nombre;
                categoriaProducto.value = appointment.categoria;
                precioProducto.value = appointment.precio;
                cantidadProducto.value = appointment.cantidad;
                form.setAttribute('data-editing', appointment.id);
                alertSuccess('Producto listo para editar');
            }
        });
    });

    listaProductos.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            deleteAppointment(btn.getAttribute('data-id'));
        });
    });
}

// Renderiza y muestra/oculta acciones según haya productos
async function renderAndToggleActions() {
    try {
        let response = await fetch(endpointAppoinments, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error(response.statusText);
        const appointments = await response.json();
        renderAppointments(appointments);
    } catch (error) {
        alertError('Error al cargar productos');
        console.log(error.message);
        renderAppointments([]);
    }
}

// Eliminar producto por ID
async function deleteAppointment(productId) {
    try {
        let response = await fetch(`${endpointAppoinments}/${productId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(response.statusText);
        alertSuccess('Producto eliminado correctamente');
        renderAndToggleActions();
    } catch (error) {
        alertError('Error al eliminar el producto');
        console.log(error.message);
    }
}

// Actualizar producto por ID
async function updateAppointment(productId, updatedData) {
    try {
        let response = await fetch(`${endpointAppoinments}/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) throw new Error(response.statusText);
        alertSuccess('Producto actualizado correctamente');
        renderAndToggleActions();
    } catch (error) {
        alertError('Error al actualizar el producto');
        console.log(error.message);
    }
}

// Crear producto
async function createAppointment() {
    const newAppointment = {
        id: id.value,
        nombre: nombreProducto.value,
        categoria: categoriaProducto.value,
        precio: precioProducto.value,
        cantidad: cantidadProducto.value
    }
    if (
        id.value === '' ||
        nombreProducto.value === '' ||
        categoriaProducto.value === '' ||
        precioProducto.value === '' ||
        cantidadProducto.value === ''
    ) {
        alertError('Por favor, complete todos los campos');
        return;
    }
    if (await isDuplicateProduct(id.value, nombreProducto.value)) {
        alertError('El ID o el nombre del producto ya existen');
        return;
    }
    try {
        let response = await fetch(endpointAppoinments, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAppointment)
        });
        if (!response.ok) {
            alertError('Lo siento, reintente más tarde');
            throw new Error(response.statusText);
        } else {
            alertSuccess('Producto añadido correctamente');
        }
    } catch (error) {
        alertError('Error al añadir el producto');
        console.log(error.message);
    }
}

// Único manejador de submit para crear o actualizar productos
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const editingId = form.getAttribute('data-editing');
    if (editingId) {
        const updatedData = {
            id: id.value,
            nombre: nombreProducto.value,
            categoria: categoriaProducto.value,
            precio: precioProducto.value,
            cantidad: cantidadProducto.value
        };
        if (
            id.value === '' ||
            nombreProducto.value === '' ||
            categoriaProducto.value === '' ||
            precioProducto.value === '' ||
            cantidadProducto.value === ''
        ) {
            alertError('Por favor, complete todos los campos');
            return;
        }
        // Si el id o nombre cambian, verifica duplicados
        if (
            (editingId !== id.value || nombreProducto.value !== updatedData.nombre) &&
            await isDuplicateProduct(id.value, nombreProducto.value)
        ) {
            alertError('El ID o el nombre del producto ya existen');
            return;
        }
        await updateAppointment(editingId, updatedData);
        form.removeAttribute('data-editing');
        form.reset();
    } else {
        await createAppointment();
    }
    renderAndToggleActions();
    form.reset();
});

// Carga inicial de productos
document.addEventListener('DOMContentLoaded', () => {
    renderAndToggleActions();
    form.reset();
    showProductActions(false);
});
[nombreProducto, categoriaProducto, precioProducto, cantidadProducto, id].forEach(input => {
    input.addEventListener('input', () => {
        if (
            (input === precioProducto || input === cantidadProducto || input === id) &&
            input.value !== '' &&
            !isNaN(input.value) &&
            Number(input.value) < 0
        ) {
            alertError('Por favor, ingrese un valor valido');
            input.value = '';
        }
    });
});

[nombreProducto, categoriaProducto].forEach(input => {
    input.addEventListener('input', () => {
        if (input.value !== '' && !isNaN(input.value)) {
            alertError('El campo no puede ser un número');
            input.value = '';
        }
    });
});