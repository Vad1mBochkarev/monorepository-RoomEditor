import { create } from "zustand";
import { v4 as  uuidv4} from "uuid";

export type ObjectType = {
    id: string,
    position: [number, number, number],
    color: string,
    projectId: string
}

interface ObjectStore{
    //! slectedObj нужен для сохранение состояния и id для выделения объекта 
    selectedObjId: string | null,
    setSel: (id: string | null) => void,
    objects: ObjectType[];
    addObject:(newObj: ObjectType) => void;
    removeObject: (id: string) => void;
}


export const useObjectStore = create <ObjectStore>((set) => ({
    objects:[],
    selectedObjId: null,
    addObject: (newObjDate) => set((state) =>
        ({...state, objects: [...state.objects, {...newObjDate, id: uuidv4() }]})),
    setSel: (id) => set({selectedObjId: id}),
    removeObject: (id) =>set((state) => ({
        objects: state.objects.filter((object) => object.id !== id),
        selectedObjId: state.selectedObjId === id ? null : state.selectedObjId
    }))
}))
//todo v4 uuidv4 - это генерация рандомного id


