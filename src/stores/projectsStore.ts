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
    filter: (filters: Partial<Project>) => Project[]
}

export const projectsStore = create<ProjectsStoreInterface>((set, get) => ({
    projects: [
        {
            id: "1",
            name: "Living Room",
            description: "Modern living room design"
        },
        {
            id: "2",
            name: "Bedroom",
            description: "Cozy bedroom layout"
        },
        {
            id: "3",
            name: "Kitchen",
            description: "Contemporary kitchen renovation"
        }
    ],

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
    filter: (filters) => {
        const { projects } = get();
        return projects.filter(project => {
            return Object.entries(filters).every(([key, value]) => {return project[key as keyof Project] === value})
        })
    } 
}))