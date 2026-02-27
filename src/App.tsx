import { memo } from 'react'
import './App.css'

import { Canvas } from '@react-three/fiber'


export const MainPage = memo(() => {
  return (
    <div style={{height: "100vh", width: "100vw", }}>
      {/* <nav style={{height: "100%", width: "300px", borderRadius: 13, background: "black"}}>
      </nav> */}
      <div id="canvas-container">
        <Canvas>
          <mesh>
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <boxGeometry args={[2, 2, 2]}/>
          <meshStandardMaterial />
          </mesh>
        </Canvas>
      </div>
    </div>
  )
})

function App() {
  console.log('it renders')
  return (
    <>
      <MainPage/>
    </>
  )
}
  export default App
