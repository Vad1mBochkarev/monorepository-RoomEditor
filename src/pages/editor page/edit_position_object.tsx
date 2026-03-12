
import {useState} from 'react'
import {Style_html} from "./page_layout_3d_obj"
import { Camera_and_scene} from './edit_psge'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

//! прописываем конкретные типы для useState чтобы инпуты принимали промежуточные строки типа точки или минус
interface PositionState{
    x: number | string;
    y: number | string;
    z: number | string;
}
export default function Position_model (){
const [position, setPosition] = useState <PositionState> ({x: 0, y: 0, z: 0});
const updatePos = (axsis:'x' | 'y' | 'z', value:string) => {

//? Было: const num = parseFloat(value) || 0;
//?       setPosition(prev => ({ ...prev, [axsis]: num }));

//todo мы изменили код на if чтобы ts дал нам возможность вписывать в input минусовые зн 
    if (value === '' || value === '-') {
        setPosition(prev => ({ ...prev, [axsis]: value })); 
        return;
    }

//? ParseFloat: это функция которая превращает строку в число с плавающей точкой
    const num = parseFloat(value);
    if (!isNaN(num)) {
        setPosition(prev => ({ ...prev, [axsis]: num }));
    }
};
return(
    <div style={{ width:'100vw', height:'100vh', overflow:'hidden', zIndex:'0', backgroundColor: '#3D3D3D'}}>
        <Style_html position = {position} updatePos = {updatePos}/>
        <Canvas dpr={[1, 2]} gl={{antialias: true}}>
        <Camera_and_scene/>
        <mesh position={[Number(position.x), Number(position.y), Number(position.z)]}>
            <boxGeometry args={[2, 2, 2]}/>
            <meshStandardMaterial color="hotping"/>

        </mesh>
            {/* <ambientLight intensity={0.7} /> */}
            <directionalLight color="red" position={[0, 0, 5]} />
          <OrbitControls
                    maxPolarAngle={1.5}
                    minDistance={5}
                    maxDistance={100}
                    makeDefault/>
        </Canvas>
    </div>
)
}

