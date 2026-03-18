import './page_layout.css'
import { useObjectStore, type ObjectType } from '../../stores/store_3d_object';
import { useShallow } from 'zustand/shallow';

interface StyleHtmlProps{
    position:{x: number | string; y: number | string; z: number | string};
    updatePos: (axsis:'x' | 'y' | 'z', value:string) => void;

}



export function Style_html({position, updatePos}: StyleHtmlProps){
    const{ addObject} = useObjectStore(useShallow((state) => ({
        objects: state.objects,
        addObject: state.addObject,
        removeObject: state.removeObject
    })));


    const objCreateLol = () => {
        const newObj: ObjectType = {
            id: '',
            position: [0, 0, 0],
            color: '#3498db',
            projectId: '1'
        }
        addObject(newObj)
    }
    return(
        <>
        <div className="famili_conteiner">
             <div className="dash_bord_rigth">
                <h2>Object Name</h2>
                <button className="button" onClick={objCreateLol} >Create object</button>

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