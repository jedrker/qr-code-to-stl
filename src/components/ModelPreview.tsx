import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ModelConfig } from './ModelParameters';

interface ModelPreviewProps {
    pixelData: boolean[][];
    config: ModelConfig;
}

export const ModelPreview: React.FC<ModelPreviewProps> = ({ pixelData, config }) => {
    const { baseSize, height, baseHeight } = config;
    const size = pixelData.length;
    const scale = baseSize / size;

    return (
        <div className="w-full h-[400px] border rounded-lg">
            <Canvas camera={{ position: [baseSize, baseSize, baseSize], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                {/* Podstawa */}
                <mesh position={[baseSize / 2, baseSize / 2, baseHeight / 2]}>
                    <boxGeometry args={[baseSize, baseSize, baseHeight]} />
                    <meshStandardMaterial color="#cccccc" />
                </mesh>

                {/* Wypukłe elementy */}
                {pixelData.map((row, y) =>
                    row.map((pixel, x) => {
                        if (!pixel) return null;
                        return (
                            <mesh
                                key={`${x}-${y}`}
                                position={[
                                    (x + 0.5) * scale,
                                    (y + 0.5) * scale,
                                    baseHeight + height / 2
                                ]}
                            >
                                <boxGeometry args={[scale * 0.9, scale * 0.9, height]} />
                                <meshStandardMaterial color="#666666" />
                            </mesh>
                        );
                    })
                )}

                <OrbitControls />
                <gridHelper args={[baseSize * 2, 20]} />
            </Canvas>
        </div>
    );
}; 