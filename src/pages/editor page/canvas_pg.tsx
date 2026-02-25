import{Canvas} from "@react-three/fiber"
import './edit.css'
export default function Page3D(){
    return(
        <Canvas>
            <mesh>
                <boxGeometry args={[2, 3,5]}/>
                <meshPhongMaterial/>
            </mesh>
            <ambientLight intensity={0.1}/>
            <directionalLight position={[0, 0, 5]}/>
        </Canvas>
    )
}