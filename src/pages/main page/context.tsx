import { useContext, createContext, useState } from 'react';
import { projectsStore } from '../../stores/projectsStore';

export const MenuContext = createContext<boolean>(false);

function Context() {
  const isMenuOpen = useContext(MenuContext);

  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");

  const handleCreateProject = () => {
    if (projectName.length === 0 && projectDescription.length === 0) {
      alert('введите имя и описание проекта');
      return;
    }
    projectsStore.getState().add({ name: projectName, description: projectDescription });
    setProjectName("");
    setProjectDescription("");

  };

  if (!isMenuOpen) return null;

  return (
    <div className="context">
      <div className="create-project">
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          placeholder="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <button className="create-project-button" onClick={handleCreateProject}>
          Create Project
        </button>
      </div>
    </div>
  );
}




export default Context;