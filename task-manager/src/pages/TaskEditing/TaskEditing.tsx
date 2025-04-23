import { useParams } from "react-router-dom";
import { TaskType } from "../../types";
import { useEffect, useState } from "react";
import { useTaskListContext } from "../../TaskListContext";
import { priorityLevelsEnum, progressEnum, TaskEditingForm } from "../../components/TaskEditingForm/TaskEditingForm";
import { getTaskById } from "../../api/api";

type MyParams = {
    _id: string
}

type Props = {
    removeTask: (task: TaskType) => void;
    editTask: (task: TaskType) => void;
}
  
export const TaskEditing: React.FC<Props> = ({}) => {

    const { _id } = useParams<MyParams>();

    const [detailedTask, setDetailedTask] = useState<TaskType>();

    useEffect(() => {
        const getTask = async (id: string | undefined) => {
            try {
                const returnedTask = await getTaskById(id);
                setDetailedTask(returnedTask);
            } catch (error) {
                console.error(error);
            }
        };
        getTask(_id);
    }, []);
    

    return (
        <>
            {detailedTask ? <TaskEditingForm 
                task={detailedTask}
            /> : <p>Task not found</p>}
        </>
    )
}