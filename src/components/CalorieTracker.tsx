import { useMemo } from "react"
import type { Activity } from "../types"
import { CalorieDisplay } from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"

export const CalorieTracker = () => {

    const { caloriesConsumed, caloriesBurned, caloriesTotal } = useActivity()



    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Quemadas"
                />
                <CalorieDisplay
                    calories={caloriesTotal}
                    text="Diferencia"
                />
            </div>
        </>
    )
}
