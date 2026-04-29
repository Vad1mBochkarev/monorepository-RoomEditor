import './main.css';
import { projectsStore } from "../../stores/projectsStore";
import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import Context, { MenuContext } from './context.tsx';

const ProjectCard = ({ project, isExpanded, onToggle }: { project: { id: string; name: string; description: string }; isExpanded: boolean; onToggle: () => void}) => {
  const deleteProject = projectsStore(state => state.delete);

  const [isedited, setIsEdited] = useState(false);
  const [editedName, setEditedName] = useState('новое имя');
  const [editedDescription, setEditedDescription] = useState('новое описание');

  const handleEdit = () => {
    if (editedName.length === 0 && editedDescription.length === 0) {
      alert('введите имя и описание проекта');
      return;
    }
    projectsStore.getState().update(project.id, { name: editedName, description: editedDescription });
    setIsEdited(false);
  }

  return (
    <div className="cardColision" style={{ width: '200px', height: '150px' }}>
      <div 
        className={`card ${isExpanded ? 'activeCard' : ''}`}
        onClick={() => {onToggle();}}
      >
        {isExpanded && <span className="close-icon">×</span>}
        
        <h3>{project.name}</h3>
        <p className={isExpanded ? 'full-text' : 'truncated-text'}>
          {project.description}
        </p>

{isExpanded && (
          <>
            {isedited && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input 
                  type="text" 
                  value={editedName} 
                  onClick={(e) => e.stopPropagation()} 
                  onChange={(e) => setEditedName(e.target.value)} 
                />
                <textarea 
                  value={editedDescription} 
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setEditedDescription(e.target.value)} 
                />
                <button onClick={(e) => { // кнопка сохранения изменений
                  e.stopPropagation();
                  handleEdit();
                  setIsEdited(false);
                }}
                  style={{ padding: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '13px', cursor: 'pointer' }}
                  >
                  Save
                </button>
              </div>
            )}
          <div className="card-actions">
            <button onClick={(e) =>{ setIsEdited(!isedited); e.stopPropagation() } }>Rename</button>
            <button 
              className='delete' 
              onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }}
            >
              Delete
            </button>
            <button className='open' onClick={(e) => e.stopPropagation() }>Open</button>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

function Main() {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [searchString, setSearchString] = useState("");

  // 2. Optimized Store Selection
  const { filter, allProjects } = projectsStore(
    useShallow((state) => ({ filter: state.filter, allProjects: state.projects }))
  );

  // 3. Memoized Search Logic
  const filteredProjects = useMemo(() => {
    if (!searchString.trim()) return allProjects;
    return filter({ name: searchString });
  }, [searchString, filter, allProjects]);

  return (
    <div className='feel'>
      <header className="header">
        <button className='createProject' onClick={() => {
          setExpandedCardId(null);
          setShowContextMenu(!showContextMenu);
        }}>
          Create Project
        </button>
        <input 
          className="search" 
          placeholder="Search projects..."
          onChange={e => setSearchString(e.target.value)}
        />
        <div className='avatar' />
      </header>

      <main className="content">
        <div className="cardsContainer">
          <MenuContext.Provider value={showContextMenu}>
            <Context />
          </MenuContext.Provider>

          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                isExpanded={expandedCardId === project.id}
                onToggle={() => setExpandedCardId(prev => prev === project.id ? null : project.id)}
              />
            ))
          ) : (
            <p>No projects found</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Main;