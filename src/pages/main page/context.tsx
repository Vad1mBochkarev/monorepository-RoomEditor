import { useContext, createContext } from 'react';

export const MenuContext = createContext<boolean>(false);

function Context() {
  const isMenuOpen = useContext(MenuContext);


  if (!isMenuOpen) return null;


  return (
    <div className="context">
      <div className="create-project">
        <input
          type="text"
          placeholder="Project Name"
        />
        <textarea
          placeholder="Project Description"
        />
        <button>Create Project</button>
      </div>
    </div>
  );
}

export default Context;