import { Image as ImageIcon, X } from 'lucide-react';

interface ImagePreview {
    id: string;
    url: string;
}

interface BudgetImageGalleryProps {
    images: ImagePreview[];
    onRemoveImage: (id: string) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BudgetImageGallery({ images, onRemoveImage, onImageUpload }: BudgetImageGalleryProps) {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 md:p-6 mb-24 md:mb-6">
            <h3 className="text-lg font-semibold leading-none tracking-tight mb-2">Imágenes del Proyecto</h3>
            <p className="text-sm text-muted-foreground mb-4">
                Estas imágenes aparecerán al final del documento PDF.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-4">
                {images.map(img => (
                    <div key={img.id} className="relative aspect-square border rounded-lg overflow-hidden group bg-muted">
                        <img src={img.url} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={() => onRemoveImage(img.id)}
                                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        {/* Mobile remove button always visible but subtle */}
                        <button
                            onClick={() => onRemoveImage(img.id)}
                            className="md:hidden absolute top-1 right-1 h-6 w-6 rounded-full bg-black/50 text-white flex items-center justify-center"
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}

                <label className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors bg-muted/10">
                    <ImageIcon size={24} className="mb-2 opacity-50" />
                    <span className="text-[10px] uppercase font-bold text-center px-1">Agregar Foto</span>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={onImageUpload}
                        className="hidden"
                    />
                </label>
            </div>
        </div>
    );
}
