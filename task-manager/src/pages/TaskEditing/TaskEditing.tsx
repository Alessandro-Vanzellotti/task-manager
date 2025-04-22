import { useParams } from "react-router-dom";
import { TaskType } from "../../types";
import { Task } from "../../components/Task/Task";
import { useEffect, useState } from "react";
import { useTaskListContext } from "../../TaskListContext";

type MyParams = {
    id: string
}

type Props = {
    removeTask: (task: TaskType) => void;
    editTask: (task: TaskType) => void;
}
  
export const TaskEditing: React.FC<Props> = ({removeTask, editTask}) => {

    const {taskList, setTaskList} = useTaskListContext();

    const { id } = useParams<MyParams>();
    const [detailedTask, setDetailedTask] = useState<TaskType>(() => {
        const currentTask = taskList.find(task => task.id === id);
        if (currentTask) {
            return currentTask;
        } else {
            return {
                id: "",
                title: "",
                description: "",
                priorityLevel: "",
                progress: "",
                beingEdited: false
            }
        }
    })

    useEffect(() => {
        /* const thisTask = taskList.find((task: TaskType) => task.id === id);
        if (!thisTask) return;
        setDetailedTask(thisTask); */
        console.log(detailedTask);
    }, []);
    

    return (
        <>
            <Task 
                task={detailedTask} 
                removeTask={removeTask} 
                editTask={editTask}
            />
        </>
    )
}