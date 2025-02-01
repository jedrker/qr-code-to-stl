import React from 'react';

export interface ModelConfig {
    baseSize: number;
    height: number;
    baseHeight: number;
    pixelSize: number;
}

interface ModelParametersProps {
    config: ModelConfig;
    onChange: (config: ModelConfig) => void;
}

export const ModelParameters: React.FC<ModelParametersProps> = ({ config, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({
            ...config,
            [name]: parseFloat(value),
        });
    };

    return (
        <div className="space-y-4">
            {[
                { name: 'baseSize', label: 'Base Size (mm)', min: 10, max: 200 },
                { name: 'height', label: 'Element Height (mm)', min: 0.1, max: 10 },
                { name: 'baseHeight', label: 'Base Thickness (mm)', min: 0.1, max: 5 },
                { name: 'pixelSize', label: 'Pixel Size (mm)', min: 0.1, max: 10 },
            ].map(({ name, label, min, max }) => (
                <div key={name} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                    <input
                        type="number"
                        name={name}
                        value={config[name as keyof ModelConfig]}
                        onChange={handleChange}
                        min={min}
                        max={max}
                        step="0.1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                </div>
            ))}
        </div>
    );
}; 