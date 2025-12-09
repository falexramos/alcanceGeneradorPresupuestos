import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generate PDF from HTML element using jsPDF and html2canvas
 * This is more reliable on mobile browsers than react-to-print
 */
export async function generatePDF(
    element: HTMLElement,
    filename: string = 'document.pdf'
): Promise<void> {
    try {
        // Show loading state
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'pdf-loading';
        loadingDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
            font-size: 18px;
            font-family: sans-serif;
        `;
        loadingDiv.innerHTML = `
            <div style="text-align: center;">
                <div style="margin-bottom: 16px;">Generando PDF...</div>
                <div style="font-size: 14px; opacity: 0.8;">Esto puede tomar unos segundos</div>
            </div>
        `;
        document.body.appendChild(loadingDiv);

        // A4 dimensions in mm
        const a4Width = 210;


        // Create PDF
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        // Get all child divs (pages) - filter out page breaks and empty divs
        const allChildren = Array.from(element.children) as HTMLElement[];
        const pages = allChildren.filter(child => {
            // Skip if it's a page break div (height 0 or very small)
            if (child.offsetHeight < 10) return false;

            // Skip if it has pageBreakAfter style
            const style = child.getAttribute('style') || '';
            if (style.includes('pageBreakAfter') || style.includes('page-break-after')) return false;

            // Skip if it's empty
            if (!child.textContent?.trim() && !child.querySelector('img')) return false;

            return true;
        });

        console.log(`Generating PDF with ${pages.length} pages`);

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];

            // Capture page as canvas
            const canvas = await html2canvas(page, {
                scale: 2, // Higher quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: 794, // A4 width in pixels at 96 DPI
                height: 1123 // A4 height in pixels at 96 DPI
            });

            // Validate canvas
            if (!canvas || canvas.width === 0 || canvas.height === 0) {
                console.error(`Failed to capture page ${i + 1}`);
                continue;
            }

            // Convert canvas to image
            const imgData = canvas.toDataURL('image/jpeg', 0.95);

            // Add new page if not first
            if (i > 0) {
                pdf.addPage();
            }

            // Calculate dimensions to fit A4 (maintaining aspect ratio)
            const imgWidth = a4Width;
            const pageAspectRatio = canvas.height / canvas.width;
            const imgHeight = a4Width * pageAspectRatio;

            // Ensure dimensions are valid
            if (!isFinite(imgWidth) || !isFinite(imgHeight) || imgWidth <= 0 || imgHeight <= 0) {
                console.error(`Invalid dimensions for page ${i + 1}: ${imgWidth}x${imgHeight}`);
                continue;
            }

            // Add image to PDF
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        }

        // Remove loading
        document.body.removeChild(loadingDiv);

        // Save PDF
        pdf.save(filename);

    } catch (error) {
        console.error('Error generating PDF:', error);

        // Remove loading if it exists
        const loadingDiv = document.getElementById('pdf-loading');
        if (loadingDiv) {
            document.body.removeChild(loadingDiv);
        }

        // Show error to user
        alert('Error al generar el PDF. Por favor, intenta nuevamente.');
        throw error;
    }
}
