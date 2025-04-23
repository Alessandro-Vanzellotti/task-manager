import { priorityLevelsEnum, progressEnum } from "./enums"


export type TaskType = {
    _id: string,
    title: string,
    description?: string, 
    priorityLevel: priorityLevelsEnum,
    progress: progressEnum
}