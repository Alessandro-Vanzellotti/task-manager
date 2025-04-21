import { useParams } from "react-router-dom";
import { TaskType } from "../../types";

type MyParams = {
    id: string
}

type Props = {
    taskList: TaskType[]
}
  
export const TaskDetails: React.FC<Props> = ({taskList}) => {

    const { id } = useParams<MyParams>();

    const detailedTask = taskList.find((task: TaskType) => 
        task.id === id);
    

    return (
        <>
            <p>Task details</p>
            <p>{id}</p>
        </>
    )
}