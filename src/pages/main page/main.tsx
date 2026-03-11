import './main.css'
import { projectsStore } from "../../stores/projectsStore";
import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import Context, { MenuContext } from './context.tsx';

function Main() {

  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);

  const [expendedCardId, setExpendedCardId] = useState<string | null>(null);

  const {filter, allProjects} = projectsStore(useShallow(state => ({filter: state.filter, allProjects: state.projects})));
  const [searchString, setSearchString] = useState<string>("")
  const projects = useMemo(() => {
    if (searchString.length === 0) {return allProjects}
    return filter({name: searchString})
  }, [searchString, filter, allProjects])


  return (
    <div className='feel'>
        <div className="header">
          <button className='createProject' onClick={() => setShowContextMenu(!showContextMenu)}>
            Create Project
          </button>
          <input className="search" onChange={e => setSearchString(e.target.value)}/>
          <div className='avatar'></div>
        </div>
        <div className="content">
          <div className="cardsContainer">

            <MenuContext.Provider value={showContextMenu}>
             <Context />
            </MenuContext.Provider>

            {projects ? projects.map(project => (
              <>
              <div className="cardColision" style={{width: '200px', height: '150px'}}>
              <div 
                className={`card ${expendedCardId === project.id ? 'activeCard' : ''}`}
                key={project.id}
                onClick={() => setExpendedCardId(prev => prev === project.id ? null : project.id)}
              >
                {expendedCardId === project.id ? (
                  <>
                    <span className="close-icon">×</span>

                    <h3 >{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="card-actions">
                      <button 
                        className='rename'
                        onClick={(e) => { e.stopPropagation(); /* тут твоя логика кнопки */ }}>
                          Rename
                      </button>
                      <button
                        className='delete'
                        onClick={(e) => { e.stopPropagation(); projectsStore.getState().delete(project.id) }}>
                        Delete
                      </button>
                      <button 
                        className='open'
                        onClick={(e) => { e.stopPropagation(); /* тут твоя логика кнопки */ }}>
                        Open
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                  </>
                )}
              </div>
              </div>
            </>
            )) : <p>No projects found</p>}
          </div>
        </div>
    </div>
  )
}

export default Main
