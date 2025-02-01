import { useState, useCallback } from 'react';
import { STLGenerator } from '../services/stlGenerator';
import type { ModelConfig } from '../components/ModelParameters';

export const useSTLGenerator = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateSTL = useCallback(async (pixelData: boolean[][], config: ModelConfig) => {
        setIsGenerating(true);
        setError(null);

        try {
            const generator = new STLGenerator();
            const stlBlob = generator.generateSTL(pixelData, config);

            // Tworzymy link do pobrania
            const url = URL.createObjectURL(stlBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'model.stl';
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Błąd podczas generowania STL');
        } finally {
            setIsGenerating(false);
        }
    }, []);

    return {
        isGenerating,
        error,
        generateSTL
    };
}; 