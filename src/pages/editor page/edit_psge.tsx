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
import { Grid } from '@react-three/drei';

export function Camera_and_scene() {
  const { camera } = useThree(); // Получаем камеру из контекста Canvas

  useEffect(() => {
    camera.position.set(camera.position.x, 15, 20) 
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <>
    {/* сдесь мы отрисовываем сеточную сцену в центре нашего canvas, с размерами 10 на 10 */}
      <Grid
      args={[100, 100]}
      
        infiniteGrid = {true}
        fadeDistance = {50}
        fadeStrength={2}  // Сила затухания
        cellSize={1}      // Размер мелкой клетки
        sectionSize={5}   // Размер крупных секций
        sectionColor="#ff0000"
        cellColor="#ffffff"
        position={[0, -1.01, 0]}
      />
    {/* ниже мы задаем цвет тени объекту на сцене */}
    <ambientLight intensity={0.7} />
    <pointLight position={[10, 10, 10]} intensity={2}/>
    </>
  ); 
}