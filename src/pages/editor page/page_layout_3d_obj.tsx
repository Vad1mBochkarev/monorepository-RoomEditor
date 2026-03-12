import './page_layout.css'
interface StyleHtmlProps{
    position:{x: number | string; y: number | string; z: number | string};
    updatePos: (axsis:'x' | 'y' | 'z', value:string) => void;

}

export function Style_html({position, updatePos}: StyleHtmlProps){
    return(
        <>
        <div className="famili_conteiner">
             <div className="dash_bord_rigth">
                <button className="button"><>Create object</></button>
                            {/* <h1 className='osi'>axis_x</h1>
                        <input className='axis_x'></input>
                            <h1 className='osi'>axis_y</h1>
                        <input className='axis_y'></input>
                            <h1 className='osi'>axis_z</h1>
                        <input className='axis_z'></input> */}
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