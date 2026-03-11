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
              <div 
                className='card'
                key={project.id}
                onClick={() => setExpendedCardId(prev => prev === project.id ? null : project.id)}
              >
                {expendedCardId === project.id ? (
                  <>
                    <h2>{project.name}</h2>
                  </>
                ) : (
                  <>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                  </>
                )}
              </div>
            )) : <p>No projects found</p>}
          </div>
        </div>
    </div>
  )
}

export default Main
