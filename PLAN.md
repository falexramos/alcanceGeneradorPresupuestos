# Plan de Implementación: Generador de Presupuestos

## Resumen del Proyecto
Aplicación web para generar presupuestos de consultoría, con funcionamiento offline (IndexedDB), generación de PDF y diseño responsivo.

## Especificaciones Técnicas

### 1. Stack Tecnológico
*   **Gestor de Paquetes**: `pnpm`
*   **Frontend**: React + TypeScript (Vite)
*   **Estilos**: Tailwind CSS (Diseño Responsive / Mobile First)
*   **Almacenamiento**: `Dexie.js` (IndexedDB)
    *   *Nota*: Todo el almacenamiento ocurre en el navegador del usuario.
    *   Permite guardar imágenes y presupuestos sin servidor backend.
5.  [ ] Implementación de generación de PDF.
