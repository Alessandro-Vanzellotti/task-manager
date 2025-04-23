import { useParams } from "react-router-dom";
import { TaskType } from "../../types";
import { useEffect, useState } from "react";
import { useTaskListContext } from "../../TaskListContext";
import { TaskEditingForm } from "../../components/TaskEditingForm/TaskEditingForm";
import { getTaskById } from "../../api/api";

type MyParams = {
    _id: string
}
  
export default function TaskEditing() {

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