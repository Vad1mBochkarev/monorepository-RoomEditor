// import { useGLTF } from '@react-three/drei'

// export default function Model_rendering() {
//   // Хук useGLTF сам создаст лоадер, загрузит файл и обработает ошибки.
//   // Путь '/models/Boombox/Boombox.gltf' будет искаться в папке public (или static, если настроено)
//   const { scene } = useGLTF('/static/models/Boombox/BoomBox.gltf')

//   return (
//     <primitive 
//       object={scene} 
//       scale={1} 
//       position={[0, 0, 0]} 
//     />
//   )
// }

// // Предзагрузка модели, чтобы она не "мигала" при переходе на страницу
// useGLTF.preload('static/models/Boombox/BoomBox.gltf')