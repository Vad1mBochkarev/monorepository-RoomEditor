import './page_layout.css'


export function Style_html(){
    return(
        <>
        <div className="conteiner_style">
            <div className="dash_bord_rigth">
                <button className="button"><>Bottom</></button>
                            <h1 className='osi'>axis_x</h1>
                        <input className='axis_x'></input>
                            <h1 className='osi'>axis_y</h1>
                        <input className='axis_y'></input>
                            <h1 className='osi'>axis_z</h1>
                        <input className='axis_z'></input>
            </div>
        </div>
        </>
    )
}