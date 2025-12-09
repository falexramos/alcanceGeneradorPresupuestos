# Agente y Definición Funcional (Agents Context)

## 1. Rol del Agente
Actuar como **Arquitecto y Desarrollador Senior**. El objetivo es construir una herramienta que empodere a consultores para crear propuestas profesionales sin fricción técnica.

## 2. Usuario Objetivo (Persona)
-   **Perfil**: Consultor de negocios o freelance.
-   **Necesidad**: Enviar presupuestos rápidos, bonitos y modificables.
-   **Dolor**: Word/Excel son tediosos y feos. Las apps SaaS son caras o complejas.
-   **Entorno**: Usa tanto laptop como celular. Necesita acceder a sus presupuestos anteriores.

## 3. Requerimientos Funcionales Detallados

### A. Gestión de Presupuestos (CRUD)
-   **Crear**: Iniciar desde cero o desde una plantilla (e.g., "Consultoría Marketing", "Desarrollo Web").
-   **Editar**: Modificar líneas de items, precios, descripciones.
-   **Guardar**: Auto-guardado o guardado manual en el navegador.
-   **Listar**: Ver historial de presupuestos creados ordenados por fecha.

### B. Personalización
-   **Carga de Assets**: El usuario puede subir su Logo y una imagen de "Cover" para el presupuesto.
-   **Datos de Empresa**: Configurar su nombre, email, teléfono una sola vez (guardado en DB).
-   **Datos de Comercial**: Editar nombre y teléfono de contacto para cada presupuesto específico (e.g. Hans Latorre).

### C. Generación de Artefactos (PDF)
-   El sistema debe "renderizar" una vista limpia del presupuesto.
-   Botón "Descargar PDF" o "Imprimir".
-   El PDF debe incluir: Logo, Datos Cliente, Tabla de Items, Total Calculado, Notas al pie.

## 4. Flujos de Usuario (Workflows)

### Flujo: Nuevo Presupuesto
1.  Usuario abre la app -> Click "Nuevo Presupuesto".
2.  Selecciona Tipo (e.g., "Web").
3.  App precarga items típicos de ese servicio (e.g., "Web estatica - $500").
4.  Usuario ajusta precios y añade un item extra.
5.  Usuario hace click en "Vista Previa".
6.  Usuario descarga PDF.

## 5. Comportamiento Esperado del Agente
-   **Proactividad**: Sugerir mejoras de UX (ej: "¿Deberíamos agregar un campo de 'Válido hasta' en el presupuesto?").
-   **Validación**: Asegurar que los cálculos matemáticos (Suma de items + Impuestos) sean exactos.
-   **Estética**: Priorizar siempre la belleza visual. Si funciona pero se ve mal, está mal.
-   **Herramientas**: Usar exclusivamente `pnpm` para gestión de paquetes.
-   **Estilos**: Usar **Tailwind CSS** para todo el estilado. Evitar CSS inline o archivos .css puros salvo para configuración global.
