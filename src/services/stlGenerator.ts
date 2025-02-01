import { primitives, transforms, booleans } from '@jscad/modeling';
import { stlSerializer } from '@jscad/stl-serializer';

interface STLGeneratorConfig {
    baseSize: number;
    height: number;
    baseHeight: number;
    pixelSize: number;
}

export class STLGenerator {
    generateSTL(pixelData: boolean[][], config: STLGeneratorConfig): Blob {
        const { baseSize, height, baseHeight, pixelSize } = config;
        const size = pixelData.length;
        const scale = baseSize / size;

        // Tworzymy podstawę
        const base = primitives.cuboid({
            size: [baseSize, baseSize, baseHeight],
            center: [baseSize / 2, baseSize / 2, baseHeight / 2]
        });

        // Tworzymy wypukłe elementy dla każdego piksela
        const pixels = pixelData.flatMap((row, y) =>
            row.map((pixel, x) => {
                if (!pixel) return null;

                return primitives.cuboid({
                    size: [scale * 0.9, scale * 0.9, height],
                    center: [
                        (x + 0.5) * scale,
                        (y + 0.5) * scale,
                        baseHeight + height / 2
                    ]
                });
            }).filter(Boolean)
        );

        // Łączymy wszystkie elementy
        const model = booleans.union([base, ...pixels]);

        // Konwertujemy na STL
        const rawData = stlSerializer.serialize({}, model);
        return new Blob([rawData], { type: 'application/octet-stream' });
    }
} 