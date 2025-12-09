# Generador de Presupuestos para Consultores

Aplicación web moderna y diseñada para funcionar offline-first, que permite a consultores generar presupuestos profesionales, gestionarlos localmente y exportarlos a PDF.

## 🚀 Características

*   **Offline-First**: Funciona sin internet. Todos los datos (presupuestos, templates, imágenes) se guardan en tu navegador usando IndexedDB.
*   **Generación PDF**: Exportación limpia y profesional lista para imprimir o guardar.
*   **Gestión de Templates**: Crea tus propias plantillas para reutilizar estructuras de presupuesto.
*   **Personalización**: Sube tu logo, define tu información comercial (nombre, teléfono) en cada presupuesto.
*   **Métodos de Pago**: Incluye enlaces de pago y visualización de métodos aceptados.

## 🛠️ Stack Tecnológico

*   **Core**: React + TypeScript + Vite
*   **Base de Datos**: Dexie.js (IndexedDB Wrapper)
*   **Estilos**: Tailwind CSS (Diseño Responsivo)
*   **PDF**: react-to-print

## 💻 Desarrollo Local

Sigue estos pasos para correr el proyecto en tu máquina:

1.  **Clonar e Instalar**:
    ```bash
    git clone <tu-repo-url>
    cd alcanceGeneradorPresupuestos
    pnpm install
    # o si no tienes pnpm: npm install
    ```

2.  **Iniciar Servidor de Desarrollo**:
    ```bash
    pnpm dev
    ```
    Abre `http://localhost:5173` en tu navegador. Los cambios que hagas en el código se reflejarán instantáneamente (HMR).

## 📦 Compilación y Producción

Para preparar la aplicación para subirla a internet:

1.  **Compilar (Build)**:
    ```bash
    pnpm build
    ```
    Esto generará una carpeta `dist/` con todos los archivos estáticos optimizados.

2.  **Previsualizar Producción (Local)**:
    Antes de subirlo, puedes probar cómo se comportará la versión compilada:
    ```bash
    pnpm preview
    ```
    Esto levanta un servidor local sirviendo la carpeta `dist`.

## 🌐 Despliegue (GitHub Pages)

Esta aplicación es **estática**, por lo que se puede desplegar gratuitamente en GitHub Pages, Vercel o Netlify.

### Opción Rápida (GitHub Pages Manual)
1.  Corre `pnpm build`.
2.  Sube el contenido de la carpeta `dist/` a la rama `gh-pages` de tu repositorio (o configura tu repo para servir desde ahí).

### Opción Automática (GitHub Actions)
Este proyecto está listo para GitHub Pages. Solo asegúrate de que tu repositorio en GitHub tenga activado GitHub Pages apuntando a la fuente correcta (GitHub Actions).

## 📋 Estructura decarpetas

*   `src/db`: Configuración de la base de datos local.
*   `src/components`: Componentes UI y el documento PDF (`BudgetDocument`).
*   `src/pages`: Vistas principales (`BudgetEditor`, `NewBudget`, `Dashboard`).
*   `src/utils`: Helpers y datos estáticos.

---
Desarrollado con ❤️ para agilizar tu consultoría.
