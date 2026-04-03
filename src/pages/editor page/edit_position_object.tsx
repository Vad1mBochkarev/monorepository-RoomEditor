
// import {useEffect, useState} from 'react'
// import {Style_html} from "./page_layout_3d_obj"
// import { Camera_and_scene} from './edit_psge'
// import { Canvas, type ThreeEvent } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { useObjectStore, type ObjectType } from '../../stores/store_3d_object'
// import { useShallow } from 'zustand/shallow'
import { useEffect, useState, Suspense } from 'react' // 1. Добавил Suspense в импорты
import { Style_html } from "./page_layout_3d_obj"
import { Camera_and_scene } from './edit_psge'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei' // 2. Добавил useGLTF
import { useObjectStore } from '../../stores/store_3d_object'
import { useShallow } from 'zustand/shallow'

// // todojjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
// // --- НОВЫЙ КОМПОНЕНТ ДЛЯ БУМБОКСА ---
// function BoomBoxModel({ position }: { position: [number, number, number] }) {
//     const { scene } = useGLTF('/static/models/Boombox/BoomBox.gltf')
//     return <primitive object={scene} position={position} scale={100} />
// }
// useGLTF.preload('/static/models/Boombox/BoomBox.gltf')
// // --//todo ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//! прописываем конкретные типы для useState чтобы инпуты принимали промежуточные строки типа точки или минус
interface PositionState{
    x: number | string;
    y: number | string;
    z: number | string;
}






export const Cube = ({id}:{id:string}) =>{

    const {selectedObjId, setSel  } = useObjectStore(useShallow((state) => ({
        objects: state.objects,
        selectedObjId: state.selectedObjId,
        setSel: state.setSel,
        updatePosition: state.updatePosition
    })));

    const isSelected = selectedObjId === id
const objData = useObjectStore((state) => state.objects.find((o) => o.id === id));
    // const objData = useEffect(() => {
    //     const obj = objects.find(obj => obj.id === id)
    //     return obj
    // }, [id])

    console.log(console.log(`Cube ID: ${id} | Selected: ${isSelected}`))

    if (!objData) {
        return null
    }



//     const handelClick = ( e: ThreeEvent<MouseEvent>, objId: string) =>{
// e.stopPropagation();
// const nextId = selectedObjId === objId ? null : objId;
// setSel(nextId)
// }


    return(
            <mesh position={objData.position}
            onClick={(e) => {e.stopPropagation(); setSel(isSelected ? null: id)} }
            > 
                <boxGeometry args ={[1,1,1]}/>
                 <meshStandardMaterial color={isSelected ? "red" : "royalblue" }/>
                
            </mesh>
            
    )
}


export default function Position_model (){
    const { objects, selectedObjId,updatePosition, setSel  } = useObjectStore(useShallow((state) => ({
        objects: state.objects,
        selectedObjId: state.selectedObjId,
        setSel: state.setSel,
        updatePosition: state.updatePosition
    })));
    
    //    const [isActive, setActive] = useState<boolean>(false);

        const [position, setPosition] = useState <PositionState> ({x: 0, y: 0, z: 0});
        useEffect(() => {
        if (selectedObjId) {
            const activeObj = objects.find(obj => obj.id === selectedObjId);
            if (activeObj) {
                setPosition({
                    x: activeObj.position[0],
                    y: activeObj.position[1],
                    z: activeObj.position[2],
                });
            }
        } else {
            setPosition({ x: 0, y: 0, z: 0 });
        }
    }, [selectedObjId]);

        const updatePos = (axis:'x' | 'y' | 'z', value:string)=> {
                             setPosition(prev => ({ ...prev, [axis]: value }));
                            //? Было: const num = parseFloat(value) || 0;
                            //?       setPosition(prev => ({ ...prev, [axsis]: num }));

                            //todo мы изменили код на if чтобы ts дал нам возможность вписывать в input минусовые зн 


                        //? ParseFloat: это функция которая превращает строку в число с плавающей точкой
                        const num = parseFloat(value);
         if (selectedObjId && !isNaN(num) && value !== '' && value !== '-' && !value.endsWith('.')) {
            updatePosition(selectedObjId, axis, num);
        }
                        //     const num = parseFloat(value);
                        // if (!isNaN(num) && value !== '' && value !== '-' && selectedObjId !== null)  {
                        //     updatePosition( selectedObjId, axis, num);
                        // }
            };
            
// const handelClick = ( e: ThreeEvent<MouseEvent>, objId: string) =>{
// e.stopPropagation();
// const nextId = selectedObjId === objId ? null : objId;
// setSel(nextId)
// }



return(
    //todo возвращает сцену с объектом 
        //! В будующем нужно разобраться с добавление объкта через отделюню функцию  
    <div style={{ width:'100vw', height:'100vh', overflow:'hidden', zIndex:'0', backgroundColor: '#3D3D3D'}}>
        <Style_html position = {position} updatePos = {updatePos} disabled={!selectedObjId}/>
        <Canvas dpr={[1, 2]} gl={{antialias: true}}>
        <Camera_and_scene/>
        {objects.map((obj) =>(
            <Cube
            key={obj.id}
            id ={obj.id}
            
            />
            
    ))}
        <Suspense fallback={null}>
                <BoomBoxModel position={[2, 0, 0]} /> 
            </Suspense>

            <directionalLight color="white" position={[0, 0, 5]} intensity={0.4} />
            <ambientLight intensity={0}/>
                <OrbitControls
                    maxPolarAngle={1.5}
                    minDistance={5}
                    maxDistance={100}
                    makeDefault/>
        </Canvas>
    </div>
)
}

