import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import {v4 as uuidv4} from 'uuid' //libreria para crear ids unicos

import { categories } from "../data/categories"
import type { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reducer"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

const initiaState : Activity = {
    id : uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export const Form = ({dispatch}: FormProps) => {
    const [activity, setActivity] = useState<Activity>(initiaState)

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        
        setActivity({
            ...activity,//lo que hace es escribir en el campo de id y mantenemos lo q tien eel state previamente
            [e.target.id] : isNumberField ? +e.target.value : e.target.value//el + convierte a numero
        })
    }

    const isValidActivity = () => {
        const {name, calories} = activity 
        return name.trim() !== '' && calories > 0 
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        dispatch({ type: 'save-activity', payload: { newActivity: activity} })

        setActivity({
            ...initiaState,
            id: uuidv4() //hace q el id sea unico con la libreria
        })
    }

    return (
        <div>
            <form
                className="space-y-5 bg-white shadow p-10 rounded-lg"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 gap-3">

                    <label htmlFor="category" className="font-bold">Categorias:</label>
                    <select
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                        name="category" 
                        id="category"
                        value={activity.category}
                        onChange={handleChange}
                        >
                        {categories.map(category =>
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        )}
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-3">

                    <label htmlFor="name" className="font-bold">Actividad:</label>
                    <input
                        id="name"
                        type="text"
                        className="border-slate-300 p-2 rounded-lg"
                        placeholder="Ej. Comida, jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta "
                        value={activity.name}
                        onChange={handleChange}
                    />

                </div>

                <div className="grid grid-cols-1 gap-3">

                    <label htmlFor="calories" className="font-bold">Calorias:</label>
                    <input
                        id="calories"
                        type="number"
                        className="border-slate-300 p-2 rounded-lg"
                        placeholder="Calorias ej. 300 o 500 "
                        value={activity.calories}
                        onChange={handleChange}
                    />

                </div>

                <input type="submit"
                    className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                    value={activity.category === 1 ? 'Guardar comida' : "Guardar ejercicio"}
                    disabled={!isValidActivity()}
                />

            </form>
        </div>
    )
}
