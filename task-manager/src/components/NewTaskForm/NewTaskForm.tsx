import { TaskType } from "../../types";
import { IoMdAdd } from "react-icons/io";
import "./NewTaskForm.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { NewTaskModal } from "../NewTaskModal/NewTaskModal";

type Props = {
  taskList: TaskType[];
  setTaskList: Dispatch<SetStateAction<TaskType[]>>;
};

export const NewTaskForm: React.FC<Props> = ({ taskList, setTaskList }) => {
  
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => setModal(!modal);
  
  return (
    <div className={"wrapper"}>
        {modal && (<NewTaskModal modal={modal} toggleModal={toggleModal} taskList={taskList} setTaskList={setTaskList} />)}

        <div className={"new-task"}>

        <h2 className={"new-task__title"}>Create a new task</h2>

        <p className={`new-task__progress`}> - </p>

        <p className={`new-task__priority-level`}> - </p>

        <div className={"new-task__buttons"}>
          <button className={"new-task__buttons-add"} type="submit" onClick={toggleModal}>
            <IoMdAdd className={"add-icon"} />
          </button>
        </div>
    </div>
    </div>
  );
};
