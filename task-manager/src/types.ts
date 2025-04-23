import { priorityLevelsEnum, progressEnum } from "./components/TaskEditingForm/TaskEditingForm"

export type TaskType = {
    id?: string,
    title: string,
    description?: string, 
    priorityLevel: priorityLevelsEnum,
    progress: progressEnum,
    beingEdited: boolean
}