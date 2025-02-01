export class ImageProcessor {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d')!;
    }

    async processFile(file: File, pixelSize: number): Promise<boolean[][]> {
        const imageData = await this.loadImage(file);
        return this.convertToPixelArray(imageData, pixelSize);
    }

    private async loadImage(file: File): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }

    private convertToPixelArray(img: HTMLImageElement, pixelSize: number): boolean[][] {
        // Ustawiamy rozmiar canvasu
        const size = Math.floor(Math.min(img.width, img.height) / pixelSize);
        this.canvas.width = size * pixelSize;
        this.canvas.height = size * pixelSize;

        // Rysujemy i skalujemy obraz
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

        const pixels: boolean[][] = [];

        // Konwertujemy na tablicę booleanów
        for (let y = 0; y < size; y++) {
            pixels[y] = [];
            for (let x = 0; x < size; x++) {
                const data = this.ctx.getImageData(
                    x * pixelSize,
                    y * pixelSize,
                    1,
                    1
                ).data;

                // Obliczamy jasność piksela (0-255)
                const brightness = (data[0] * 0.299 + data[1] * 0.587 + data[2] * 0.114);
                // Konwertujemy na boolean (true dla ciemnych pikseli)
                pixels[y][x] = brightness < 128;
            }
        }

        return pixels;
    }
} 