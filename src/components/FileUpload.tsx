import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/svg+xml': ['.svg'],
            'image/png': ['.png'],
        },
        multiple: false,
    });

    return (
        <div
            {...getRootProps()}
            className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                transition-colors duration-200
                ${isDragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }
            `}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p className="text-blue-500">Drop file here...</p>
            ) : (
                <p className="text-gray-600">
                    Drag and drop SVG or PNG file, or click to select
                </p>
            )}
        </div>
    );
}; 