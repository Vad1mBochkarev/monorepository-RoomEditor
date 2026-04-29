import './page_layout.css'
import { useObjectStore} from '../../stores/store_3d_object';
import { useShallow } from 'zustand/shallow';
import { useState } from 'react';
interface StyleHtmlProps{
    position:{x: number | string; y: number | string; z: number | string};
    updatePos: (axsis:'x' | 'y' | 'z', value:string) => void;
    disabled?: boolean;

}





export const List_obj = () =>{
const odd = useObjectStore((state) => state.objects);
const sell = useObjectStore((state) => state.setSel)
const selectedId = useObjectStore((state) => state.selectedObjId)
return(
    <div style={{
        display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxHeight: '600px', 
            overflowY: 'auto',   
            overflowX: 'hidden', 
            paddingRight: '10px' 
    }}>
   {odd.map((obj, index) => (<div key={obj.id} onClick={() =>sell(obj.id)} style={{width:'100px', minHeight: '30px',cursor: 'pointer', background: selectedId === obj.id ? '#A462E5' : '#444',flexShrink: 0, borderRadius:'13px', margin:'10px'}}>
    Model {index + 1}
   </div>))}
    </div>
)
}



export function Style_html({position, updatePos}: StyleHtmlProps){
    const [card_import, setCard_import] = useState(false);

    const{ addObject} = useObjectStore(useShallow((state) => ({
        objects: state.objects,
        addObject: state.addObject,
        removeObject: state.removeObject,

    })));


    const Create_card_import_obj = () =>{
    setCard_import(!card_import);
        };

    
//^ Значение импортируемой модели
    const importObj = () =>{
         addObject({
            position: [0, 0, 0],
            color: '#3498db',
            projectId: '1',
            modelPath: '/static/models/Duck/Duck.gltf'
        })
        setCard_import(false)
    };
      
//^ Дефолт значение созданного объекта
    const objCreateLol = () => {
         addObject({
            position: [0, 0, 0],
            color: '#3498db',
            projectId: '1',
            modelPath:''
        })
        // addObject()

    }
    return(
        <>
        <div className="famili_conteiner">
                                {card_import && (
                        <div className='class_card'>
                            <h3 style={{ color: 'white' }}>Import Menu</h3>
                            <p style={{ color: '#ccc' }}>Контент для импорта моделей...</p>
                            <button className="button" onClick={importObj} > <h1 style={{fontSize:'15px', margin:'0'}}>Boombox</h1></button>


                            <button className="button" onClick={objCreateLol} > <h1 style={{fontSize:'15px', margin:'0'}}>Create import</h1></button>

                        </div>
                    )}
             <div className="dash_bord_rigth">
                <h2>Object Name</h2>
                <div style={{width:'100%', height:'7%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <button className="button" onClick={objCreateLol} > <h1 style={{fontSize:'15px', margin:'0'}}>Create object</h1></button>
                <button className={`button ${card_import ? 'active_style' : ''}` } onClick={Create_card_import_obj} ><h1 style={{fontSize:'15px', margin:'0'}}>Import Modell</h1></button>
                </div>

                <h2>list object</h2>
                <div style={{}}></div>
                <List_obj/>
             </div>
                <div className="dash_bord_left">
                    <h1 className='osi' >axis_x</h1>
                    <input className='axis_x' id='x' type='number' value={position.x} onFocus={(e)=> e.target.select() } onChange={(e)=> updatePos('x', e.target.value)}/> 
                    <h1 className='osi'>axis_y</h1>
                    <input className='axis_y' id='y' type='number' value={position.y} onFocus={(e)=> e.target.select() } onChange={(e)=> updatePos('y', e.target.value)}></input>
                    <h1 className='osi'>axis_z</h1>
                    <input className='axis_z' id='z' type='number' value={position.z} onFocus={(e)=> e.target.select() } onChange={(e)=> updatePos('z', e.target.value)}></input>
              </div>


        </div>
        
        </>
    )
}