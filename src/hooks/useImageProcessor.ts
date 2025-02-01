import { useState, useCallback } from 'react';
import { ImageProcessor } from '../services/imageProcessor';

export const useImageProcessor = () => {
    const [pixelData, setPixelData] = useState<boolean[][]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const processImage = useCallback(async (file: File, pixelSize: number) => {
        setIsProcessing(true);
        setError(null);

        try {
            const processor = new ImageProcessor();
            const data = await processor.processFile(file, pixelSize);
            setPixelData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd podczas przetwarzania obrazu');
        } finally {
            setIsProcessing(false);
        }
    }, []);

    return {
        pixelData,
        isProcessing,
        error,
        processImage
    };
}; 