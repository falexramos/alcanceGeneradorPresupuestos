# Contexto Técnico del Proyecto (Gemini Context)

## Nombre del Proyecto: Generador de Presupuestos (Client-Side)

## 1. Visión Técnica
Aplicación Single Page Application (SPA) construida con React, diseñada para funcionar totalmente en el navegador (Offline-First) utilizando IndexedDB para persistencia. No depende de un backend tradicional.

## 2. Tecnologías (Stack Core)
-   **Runtime/Build**: Vite (+ React + TypeScript).
-   **Package Manager**: `pnpm`.
    -   Dev: `pnpm dev`
    -   Build: `pnpm build`
-   **Estilos**: Tailwind CSS v3.
    -   Uso de clases utilitarias para diseño rápido y consistente.
    -   Diseño **Mobile First** y totalmente responsivo.
    -   Estética "Premium" (sombras suaves, bordes redondeados, tipografía limpia).
-   **Base de Datos**: `Dexie.js` (Wrapper para IndexedDB).
    -   Los datos viven en `window.indexedDB`.
-   **Despliegue**: GitHub Pages (Archivos estáticos).

## 3. Arquitectura de Carpetas (Propuesta)
```
/src
  /assets        # Imágenes estáticas, fuentes
  /components    # Componentes UI reutilizables (Button, Input, Card)
  /db            # Configuración de Dexie y modelos de datos
  /features      # Módulos funcionales (BudgetEditor, PDFDesigner)
  /layouts       # Estructuras de página (MainLayout, PrintLayout)
  /styles        # Variables globales, reset, utilidades
  /styles        # Variables globales, reset, utilidades
  /utils         # Helpers (formateo de moneda, fechas)
  App.tsx        # Rutas principales
  main.tsx       # Punto de entrada

## 4. Requerimiento Adicional: Datos de Contacto
-   El nombre del comercial y teléfono/WhatsApp deben ser editables por presupuesto y no hardcodeados.
```

## 4. Convenciones de Código
-   **Componentes**: Funcionales con Hooks.
-   **Estado**: React Context para estado global de UI, Dexie para datos persistentes.
-   **Tipado**: Estricto (TypeScript). Interfaces para todos los modelos de datos.
-   **Performance**: Lazy loading para rutas pesadas si es necesario.

## 5. Reglas Críticas
1.  **Cero Dependencia de Backend**: Toda lógica debe resolverse en el cliente.
2.  **Manejo de Imágenes**: Las imágenes subidas por el usuario se convierten a `Blob` o `Base64` y se guardan en IndexedDB. Optimizar tamaño antes de guardar si es posible.
3.  **PDF**: La generación de PDF debe ser fiel a la vista previa. Usar `@media print` para asegurar que el contenido se vea bien en papel/PDF.
