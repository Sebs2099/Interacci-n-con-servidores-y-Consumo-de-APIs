# Inventario Inteligente - Gestión de Productos

## Visión General

"Inventario Inteligente" es una aplicación web diseñada para la gestión sencilla de un inventario de productos. Permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de los productos. Este proyecto sirve como demostración del uso de la API Fetch para interactuar con un backend simulado (JSON Server) y manipular el DOM para una interfaz de usuario dinámica.

## Características

*   **Añadir Productos:** Permite agregar nuevos productos al inventario con detalles como ID, nombre, precio, categoría y cantidad.
*   **Ver Productos:** Muestra una lista de todos los productos existentes en una tabla.
*   **Editar Productos:** Permite modificar los detalles de un producto existente.
*   **Eliminar Productos:** Permite eliminar productos del inventario.
*   **Validación de Datos:** Incluye validación en el lado del cliente para campos obligatorios, valores numéricos y para evitar IDs o nombres de producto duplicados.
*   **Notificaciones al Usuario:** Proporciona retroalimentación al usuario sobre el resultado de las operaciones (éxito o error) mediante alertas.

## Tecnologías Utilizadas

*   **Frontend:**
    *   HTML5
    *   CSS3
    *   JavaScript (Vanilla)
    *   Fetch API (para comunicación con el servidor)
*   **Backend (Simulado):**
    *   JSON Server (para simular una API RESTful)
*   **Desarrollo:**
    *   Git (Control de versiones)

## Estructura del Proyecto

```
Interacción con servidores y Consumo de APIs/
├── index.html                # Archivo principal HTML (interfaz de usuario)
├── package.json              # Definiciones del proyecto y dependencias (ej. json-server)
├── package-lock.json         # Lockfile de dependencias
├── db/
│   └── db.json               # (Asumido) Archivo JSON usado por JSON Server como base de datos
├── public/
│   └── vite.svg              # Activo estático (posiblemente de una configuración anterior con Vite)
├── src/
│   ├── css/
│   │   └── style.css         # Estilos CSS para la aplicación
│   └── js/
│       ├── alerts.js         # (Asumido) Módulo para mostrar alertas al usuario
│       └── gestion_datos.js  # Lógica principal de la aplicación (CRUD, DOM, validaciones)
└── ... (otros archivos como .gitignore, LICENSE, README.md)
```

## Cómo Ejecutar el Proyecto

1.  **Clonar el Repositorio:**
    ```bash
    git clone <url-del-repositorio>
    cd <directorio-del-proyecto>/Interacción con servidores y Consumo de APIs
    ```

2.  **Instalar Dependencias:**
    Asegúrate de tener Node.js y npm instalados. Luego, instala `json-server` (si no está listado como dependencia de desarrollo, puedes instalarlo globalmente o localmente):
    ```bash
    # Si json-server está en package.json
    npm install
    # O para instalarlo globalmente
    # npm install -g json-server
    ```

3.  **Iniciar JSON Server:**
    Desde el directorio `Interacción con servidores y Consumo de APIs`, si tienes un archivo `db.json` (crea uno si no existe, con una estructura como `{"appointments": []}`), ejecuta:
    ```bash
    json-server --watch db.json
    ```
    Esto iniciará un servidor (generalmente en `http://localhost:3000`). La aplicación espera que el endpoint de los productos sea `/appointments`.

4.  **Abrir la Aplicación:**
    Abre el archivo `index.html` en tu navegador web.

## Posibles Mejoras Futuras

*   **Interfaz de Usuario:**
    *   Mejorar el sistema de notificaciones (evitar `alert()` nativos).
    *   Añadir indicadores de carga durante operaciones asíncronas.
    *   Confirmación antes de eliminar productos.
    *   Corregir la renderización de la tabla para usar `<tr>` y `<td>` en lugar de `<li>`.
*   **Funcionalidad:**
    *   Ordenar y filtrar la lista de productos.
    *   Paginación para listas largas de productos.
*   **Código y Técnicas:**
    *   Refactorizar `gestion_datos.js` en módulos más pequeños.
    *   Añadir pruebas unitarias.
*   **Backend:**
    *   Migrar a una solución de backend más robusta para producción.

---

Este `README.md` proporciona una descripción completa del proyecto, su configuración y posibles vías de desarrollo.
