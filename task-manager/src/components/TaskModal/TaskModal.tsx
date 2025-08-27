import "./TaskModal.scss";
import { TaskType } from "../../types";
import { Dispatch, SetStateAction } from "react";
import { TaskDetails } from "../TaskDetails/TaskDetails";
import { TaskEditingForm } from "../TaskEditingForm/TaskEditingForm";

type Props = {
  modal: boolean;
  toggleModal: () => void;
  task: TaskType;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setTaskList: Dispatch<SetStateAction<TaskType[]>>;
};

export const TaskModal: React.FC<Props> = ({
  modal,
  toggleModal,
  task,
  isEditing,
  setIsEditing,
  setTaskList,
}) => {
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
    setIsEditing(false);
  }

  return (
    <div className={"task-modal"}>
      <div className={"task-modal__overlay"} onClick={toggleModal}></div>
      {isEditing ? (
        <TaskEditingForm
          modal={modal}
          toggleModal={toggleModal}
          task={task}
          setIsEditing={setIsEditing}
          setTaskList={setTaskList}
        />
      ) : (
        <TaskDetails
          modal={modal}
          toggleModal={toggleModal}
          task={task}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};
