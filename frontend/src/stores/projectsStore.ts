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
            id: v4(),
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
        },
        {
            id: "4",
            name: "Bathroom",
            description: "Spa-like bathroom retreat"
        },
        {
            id: "5",
            name: "Home Office",
            description: "Productive work environment"
        },
        {
            id: "6",
            name: "Dining Room",
            description: "Elegant dining space"
        },
        {
            id: "7",
            name: "Garage",
            description: "Organized storage and workshop"
        },
        {
            id: "8",
            name: "Nursery",
            description: "Comfortable baby room"
        },
        {
            id: "9",
            name: "Home Gym",
            description: "Fitness training space"
        },
        {
            id: "10",
            name: "Game Room",
            description: "Entertainment and leisure area"
        },
        {
            id: "11",
            name: "Library",
            description: "Quiet reading space"
        },
        {
            id: "12",
            name: "Laundry Room",
            description: "Efficient laundry facility"
        },
        {
            id: "13",
            name: "Walk-in Closet",
            description: "Spacious clothing storage"
        },
        {
            id: "14",
            name: "Home Theater",
            description: "Cinema-style viewing room"
        },
        {
            id: "15",
            name: "Garden Room",
            description: "Indoor plant sanctuary"
        },
        {
            id: "16",
            name: "Patio",
            description: "Outdoor living space"
        },
        {
            id: "17",
            name: "Sunroom",
            description: "Bright and airy relaxation area"
        },
        {
            id: "18",
            name: "Mudroom",
            description: "Functional entryway storage"
        },
        {
            id: "19",
            name: "Wine Cellar",
            description: "Climate-controlled wine storage"
        },
        {
            id: "20",
            name: "Craft Room",
            description: "Creative workspace for hobbies"
        },
        {
            id: "21",
            name: "Music Room",
            description: "Soundproofed space for musicians"
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