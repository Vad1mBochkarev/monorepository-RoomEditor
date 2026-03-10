import { memo } from 'react'
import './App.css'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import {Camera_and_scene} from './pages/editor page/edit_psge'
// import { EffectComposer, Outline } from '@react-three/postprocessing'
import{Style_html} from './pages/editor page/page_layout_3d_obj'
import Main from './pages/main page/main'

export const Model_render = memo(() => {
  return (
    <div style={{height: "100vh", width: "100vw"}}>
      {/* <nav style={{height: "100%", width: "300px", borderRadius: 13, background: "black"}}>
      </nav> */}
         <Style_html/>
      <div id="canvas-container" style={{overflow:'hidden',width:'100%', height:'100%', zIndex:'0', backgroundColor: '#3D3D3D'}}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <Camera_and_scene/>
            <OrbitControls/>
            <mesh>
            <boxGeometry args={[2, 2, 2]} />
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
    <Main/>
      <Model_render/>
    </>
  )
}
  export default App
