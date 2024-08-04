import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export const useActivity = () => {
    const context = useContext(ActivityContext)
    if(!context) {
        throw new Error('el hook use activityContext debe ser utilizado en un ActivityProvider')
    }
    return context
}