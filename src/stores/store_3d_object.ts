import { create } from "zustand";
import { v4 as  uuidv4} from "uuid";

export type ObjectType = {
    id: string,
    position: [number, number, number], // x, y, z
    color: string,
    projectId: string

}

interface ObjectStore{
    //! slectedObj нужен для сохранение состояния и id для выделения объекта 
    selectedObjId: string | null,
    setSel: (id: string | null) => void,
    objects: ObjectType[];
    addObject:(newObj: Omit<ObjectType, 'id'>) => void;
    removeObject: (id: string) => void;
    updatePosition: (id: string, axis: 'x' | 'y'| 'z', value: number) => void
}



export const useObjectStore = create <ObjectStore>((set, get) => ({
    objects:[],
    selectedObjId: null,
    
    addObject: (newObjDate) => set((state) =>
        ({...state, objects: [...state.objects, {...newObjDate, id: uuidv4() }]})),
    setSel: (id) => set({selectedObjId: id}),
    removeObject: (id) =>set((state) => ({
        objects: state.objects.filter((object) => object.id !== id),
        selectedObjId: state.selectedObjId === id ? null : state.selectedObjId
    })),
    updatePosition:(id, axis, value) => set((state) => {


        // if(value){
        //     const movedObj = state.objects.find(e => e.id === id)
        //     if (movedObj === undefined) {
        //         console.warn('cannot find movable obj in updatePosition. Id is: ', id)
        //         return
        //     }
            const axis_to_coords_mapping = {
                x: 0,
                y: 1,
                z: 2
            }
            const currentAxisCoordIndex = axis_to_coords_mapping[axis]


            return{
                objects: state.objects.map((obj) =>{ 
                    if(obj.id === id){
                        const newObjPosition = [...obj.position] as [number,number,number];
                        newObjPosition[currentAxisCoordIndex] = value;
                        return{...obj, position: newObjPosition}
                    
                    }
                    return obj
                })
            }
        //     const currentAxisCoordValue = movedObj.position[currentAxisCoordIndex]
        //     if(currentAxisCoordValue !== value){
        //          const newObjPosition = [...movedObj.position]
        //          newObjPosition[currentAxisCoordIndex] = value
        //          return {objects:[...state.objects.filter(el => el.id !== id), {...movedObj, position: newObjPosition}]}
        //     }            
        // }
        // return state
    })

}))
//todo v4 uuidv4 - это генерация рандомного id


