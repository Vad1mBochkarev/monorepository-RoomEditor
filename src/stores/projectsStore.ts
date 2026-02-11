import { v4 } from "uuid";
import { create } from "zustand";


export type Project = {
    id: string
    name: string
    description: string
} 

export interface ProjectsStoreInterface {
    projects: Project[],
    add: (data: Omit<Project, "id">) => Promise<string>,
    update: (id: string, payload: Partial<Omit<Project, "id">>) => Promise<void>,
    delete: (id: string, ) => Promise<void>,
    filter: (filters: Partial<Project>) => Promise<Project[]>
}

export const projectsStore = create<ProjectsStoreInterface>((set, get) => ({
    projects: [],

    add: async (data) => {
        const newObjId = v4();
        set(state => ({...state, projects: [...state.projects, {id: newObjId, ...data}]}))
        return newObjId
    },
    update: async (id, payload) => {
        set(state => ({...state, projects: state.projects.map(proj => proj.id===id ? {...proj, ...payload} : proj)}))
    },
    delete: async (id) => {
        set(state => ({...state, projects: state.projects.filter(project => project.id !== id)}))
    },
    filter: async (filters) => {
        set(state => ({...state, projects: state.projects.filter(project =>)}))
    } 
}))