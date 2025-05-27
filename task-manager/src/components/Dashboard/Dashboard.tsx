import { useEffect, useState } from "react";
import { TaskType } from "../../types";
import './Dashboard.scss';

type Props = {
    taskList: TaskType[]
}

export const Dashboard: React.FC<Props> = ({ taskList }) => {
  
    const [taskProgress, setTaskProgress] = useState({pending: 0, inProgress: 0, done: 0});

    const getTaskProgress = () => {
      let isPending = 0;
      let isInProgress = 0;
      let isDone = 0;

      taskList.forEach((task: TaskType) => {
        switch(task.progress) {
          case 'Pending':
            isPending++;
            break;
          case 'In progress':
            isInProgress++;
            break;
          case 'Done':
            isDone++;
            break;
      }
    });
      setTaskProgress({pending: isPending, inProgress: isInProgress, done: isDone});
    }

    useEffect(() => {
      getTaskProgress();
  }, [taskList.length]);

    return (
        <div className={"dashboard"}>
            <p>{`All: ${taskList.length}`}</p>
            <p>{`Pending: ${taskProgress.pending}`}</p>
            <p>{`In progress: ${taskProgress.inProgress}`}</p>
            <p>{`Done: ${taskProgress.done}`}</p>
        </div>
    );
};