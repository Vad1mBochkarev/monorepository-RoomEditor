import { memo } from 'react'
import './App.css'
import Position_model from './pages/editor page/edit_position_object'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import {Camera_and_scene} from './pages/editor page/edit_psge'
// import { EffectComposer, Outline } from '@react-three/postprocessing'
// import{Style_html} from './pages/editor page/page_layout_3d_obj'
import Main from './pages/main page/main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export const Model_render = memo(() => {
  return (
    <Position_model/>
  )
})

function App() {
  console.log('it renders')
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        
        <Route path="/editor" element={<Model_render />} />
      </Routes>
    </Router>
  )
}
  export default App
