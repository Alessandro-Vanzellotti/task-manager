import { priorityLevelsEnum, progressEnum } from "./components/TaskEditingForm/TaskEditingForm"

export type TaskType = {
    _id?: string,
    title: string,
    description?: string, 
    priorityLevel: priorityLevelsEnum,
    progress: progressEnum
}