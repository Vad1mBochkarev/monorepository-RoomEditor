import { useGLTF } from '@react-three/drei'

//* Функция для того чтобы пропсы дошли до модели такие как position scale rotation
export function Scene({ path, ...props }: { path: string, [key: string]: any }) {
    const gltf = useGLTF(path)
    return (
        <group {...props} dispose={null}>
            <primitive object={gltf.scene.clone()} />
        </group>
    )
}