import React, { Dispatch, SetStateAction, useState } from "react";
import { TaskType } from "../../types";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import "./Task.scss";
import { useNavigate } from "react-router-dom";
import { deleteTask, getAllTasks } from "../../api/api";
import { Modal } from "../Modal/Modal";
import { priorityLevelsEnum } from "../../enums";

type Props = {
  task: TaskType;
  setTaskList: Dispatch<SetStateAction<TaskType[]>>;
};

export const Task: React.FC<Props> = ({ task, setTaskList }) => {

  const navigate = useNavigate();

  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => setModal(!modal);
  const [priorityColor, setPriorityColor] = useState<string>('');
    
  const priorityColors = {
    high: '#fe50bc',
    medium: '#4b8ffa',
    low: '#00c068',
    none: '#bdbdbd',
  }

  const handleTaskRemoval = async (): Promise<void> => {
    await deleteTask(task._id);
    const newTaskList = await getAllTasks();
    setTaskList(newTaskList);
  };

  const handleTaskEditing = (): void => {
    navigate(`/tasks/${task._id}`);
  };

  const getPriorityColor = () => {
    switch (task.priorityLevel) {
      case priorityLevelsEnum.none: return '#bdbdbd';
      case priorityLevelsEnum.low: return '#00c068';
      case priorityLevelsEnum.medium: return '#4b8ffa';
      case priorityLevelsEnum.high: return '#fe50bc';
        
    }
  }

  

  return (
      <div className={"wrapper"} >
          {modal && (<Modal modal={modal} toggleModal={toggleModal} task={task} handleTaskEditing={handleTaskEditing} />)}

          <div className={"task"} onClick={toggleModal}>

          <h2 className={"task__title"}> {task.title} </h2>

          <p className={'task__progress'}> {task.progress} </p>

          <p className={'task__priority-level'} style={{backgroundColor: `${getPriorityColor()}`}}> {task.priorityLevel} </p>

          <div className={"task__buttons"}>
            <button
              className={"task__edit-button button"}
              onClick={() => handleTaskEditing()}
            >
              <MdOutlineEdit />
            </button>
            <button
              className={"task__delete-button button"}
              onClick={() => handleTaskRemoval()}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
          </div>


      </div>
  );
};
