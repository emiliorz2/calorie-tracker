import { Activity } from "../types"

export type ActivityActions =
                        { type: 'save-activity', payload: { newActivity: Activity } } |
                        { type: 'set-activeId', payload: { id: Activity['id'] } } |
                        { type: 'delete-activity', payload: { id: Activity['id'] } } 

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

export const initialState: ActivityState = {
    activities : [],
    activeId : ''
}

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityActions
    ) => {
    
    if(action.type === 'save-activity') {
        //maneja la logica para actualizar el state

        // generamos u state vacio 
        let updatedActivities: Activity[] = []

        if(state.activeId) { //se valida y actualiza un objeto de la lista
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity)

            
        } else { //se crea un nuevo objeto
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: '' //esto hace q cada vez q se crea una actividad nueva o se actualiza se reinicia el active id
        }
        
    }

    if(action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if( action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id )
        }
    }

    return state
}