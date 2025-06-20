import React, { Dispatch, SetStateAction, useState } from "react";
import { TaskType } from "../../types";
import "./Task.scss";
import { useNavigate } from "react-router-dom";
import { deleteTask, getAllTasks } from "../../api/api";
import { DetailsModal } from "../DetailsModal/DetailsModal";
import { priorityLevelsEnum, progressEnum } from "../../enums";
import { OptionsDropdown } from "../OptionsDropdown/OptionsDropdown";

type Props = {
  task: TaskType;
  setTaskList: Dispatch<SetStateAction<TaskType[]>>;
};

export const Task: React.FC<Props> = ({ task, setTaskList }) => {

  const navigate = useNavigate();

  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => setModal(!modal);

  const handleTaskRemoval = async (): Promise<void> => {
    await deleteTask(task._id);
    const newTaskList = await getAllTasks();
    setTaskList(newTaskList);
  };

  const handleTaskEditing = (): void => {
    navigate(`/tasks/${task._id}`);
  };

  const getPriorityClass = () => {
    switch (task.priorityLevel) {
      case priorityLevelsEnum.none: return 'priority-none';
      case priorityLevelsEnum.low: return 'priority-low';
      case priorityLevelsEnum.medium: return 'priority-medium';
      case priorityLevelsEnum.high: return 'priority-high';
        
    }
  }

    const getProgressClass = () => {
    switch (task.progress) {
      case progressEnum.pending: return 'progress-pending';
      case progressEnum.inProgress: return 'progress-inProgress';
      case progressEnum.done: return 'progress-done';
        
    }
  }

  return (
      <div className={"wrapper"} >
          {modal && (<DetailsModal modal={modal} toggleModal={toggleModal} task={task} handleTaskEditing={handleTaskEditing} />)}

          <div className={"task"}>

          <h2 className={"task__title"} onClick={toggleModal} > {task.title} </h2>

          <p className={`task__progress ${getProgressClass()}`}> {task.progress} </p>

          <p className={`task__priority-level ${getPriorityClass()}`} > {task.priorityLevel} </p>

          <OptionsDropdown toggleModal={toggleModal} />
          </div>


      </div>
  );
};
