import { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ModelConfig, ModelParameters } from '../components/ModelParameters';
import { ModelPreview } from '../components/ModelPreview';
import { useImageProcessor } from '../hooks/useImageProcessor';
import { useSTLGenerator } from '../hooks/useSTLGenerator';

export default function Home() {
    const [config, setConfig] = useState<ModelConfig>({
        baseSize: 100,
        height: 2,
        baseHeight: 1,
        pixelSize: 2
    });

    const { pixelData, isProcessing, error, processImage } = useImageProcessor();
    const { isGenerating, error: stlError, generateSTL } = useSTLGenerator();

    const handleFileSelect = async (file: File) => {
        await processImage(file, config.pixelSize);
    };

    const handleGenerateSTL = () => {
        if (pixelData.length > 0) {
            generateSTL(pixelData, config);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        SVG/PNG to STL Converter
                    </h1>
                    <p className="text-lg text-gray-600">
                        Transform your 2D files into 3D printable models
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Upload File
                                </h2>
                                <FileUpload onFileSelect={handleFileSelect} />
                                {isProcessing && <LoadingSpinner text="Processing image..." />}
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Model Parameters
                                </h2>
                                <ModelParameters config={config} onChange={setConfig} />
                            </div>
                        </div>

                        {pixelData.length > 0 && (
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                        3D Preview
                                    </h2>
                                    <div className="relative rounded-lg overflow-hidden">
                                        <ModelPreview pixelData={pixelData} config={config} />
                                        {isGenerating && (
                                            <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                                                <LoadingSpinner text="Generating STL model..." />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        onClick={handleGenerateSTL}
                                        disabled={isGenerating}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md disabled:opacity-50 transition-colors"
                                    >
                                        Generate STL
                                    </button>
                                    {stlError && <p className="text-red-500 ml-4">{stlError}</p>}
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                        Data Preview
                                    </h2>
                                    <div className="border rounded-lg p-2 bg-white">
                                        <div className="grid grid-cols-[repeat(auto-fill,minmax(4px,1fr))] gap-px bg-gray-200">
                                            {pixelData.map((row, y) =>
                                                row.map((pixel, x) => (
                                                    <div
                                                        key={`${x}-${y}`}
                                                        className={`aspect-square ${pixel ? 'bg-black' : 'bg-white'}`}
                                                    />
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 