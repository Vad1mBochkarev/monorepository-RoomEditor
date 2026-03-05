import './edit.css'

// import { createRoot } from 'react-dom/client'
// import { Model_render } from '../../App'

// function  Page3D() {
//     return(
//       <div id ="canvas-container">
        
//       </div>
//     )
// }
// export default Page3D



// Файл: src/pages/editor page/edit_psge.tsx
// import * as THREE from 'three';
//     const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
//     const rer = camera.position.z = 1;
// export function Dd() { // Называем с большой буквы, так как это компонент
//   return (
//     rer
//   );
// }





// Файл: src/pages/editor page/edit_psge.tsx
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
// import * as THREE from 'three'

export function Camera_and_scene() {
  const { camera } = useThree(); // Получаем камеру из контекста Canvas

  useEffect(() => {
    camera.position.set(camera.position.x, 15, 20) 
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <>
    {/* сдесь мы отрисовываем сеточную сцену в центре нашего canvas, с размерами 10 на 10 */}
    <gridHelper args={[20,40]}/> 
    {/* ниже мы задаем цвет тени объекту на сцене */}
    <ambientLight intensity={0.4} color={0xffffff}/>
    </>
  ); 
}