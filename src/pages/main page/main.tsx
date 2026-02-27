import './main.css'
import { projectsStore } from "../../stores/projectsStore";
import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';

function Main() {

  const {filter, allProjects} = projectsStore(useShallow(state => ({filter: state.filter, allProjects: state.projects})));
  const [searchString, setSearchString] = useState<string>("")
  const projects = useMemo(() => {
    if (searchString.length === 0) {return allProjects}
    return filter({name: searchString})
  }, [searchString, filter])

  return (
    <div className='feel'>
        <div className="header">
          <button className='createProject'>
            Create Project
          </button>
          <input className="search" onChange={e => setSearchString(e.target.value)}/>
        </div>
        <div className="content">
          <div className="cardsContainer">
          {projects ? projects.map(project => (
            <div className='card' key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          )) : <p>No projects found</p>}
          </div>
        </div>
    </div>
  )
}
export default Main
