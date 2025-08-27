import { IFormInput, TaskType } from "../../types";
import "./TaskEditingForm.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAllTasks, updateTask } from "../../api/api";
import { Dispatch, SetStateAction } from "react";

type Props = {
  task: TaskType;
  modal: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  toggleModal: () => void;
  setTaskList: Dispatch<SetStateAction<TaskType[]>>;
};

export const TaskEditingForm: React.FC<Props> = ({
  task,
  modal,
  setIsEditing,
  toggleModal,
  setTaskList,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      title: task.title,
      description: task.description,
      priorityLevel: task.priorityLevel,
      progress: task.progress,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (
    data: IFormInput
  ): Promise<void> => {
    const editedTask: TaskType = {
      _id: task._id,
      title: data.title,
      description: data.description,
      priorityLevel: data.priorityLevel,
      progress: data.progress,
    };

    try {
      await updateTask(task._id, editedTask);
      const newTaskList = await getAllTasks();
      setTaskList(newTaskList);
      toggleModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
    setIsEditing(false);
  }

  return (
    <>
      <form className={"edit-form"} onSubmit={handleSubmit(onSubmit)}>
        <header className={"edit-form__header"}>
          <div className={"edit-form__title"}>
            <label htmlFor="title">Title</label>
            <input
              className={"edit-form__title-input"}
              type="text"
              id="item"
              {...register("title", {
                required: {
                  value: true,
                  message: "*Title is required",
                },
              })}
            />
            <p role="alert" className={"error"}>
              {errors.title?.message}
            </p>
          </div>
        </header>

        <section className={"edit-form__description"}>
          <label htmlFor="title">Description</label>
          <textarea
            maxLength={100}
            className={"edit-form__description-text"}
            {...register("description")}
            placeholder="Type a description"
          ></textarea>
        </section>

        <section className={"edit-form__tags"}>
          <div>
            <label htmlFor="progress">Progress: </label>
            <select id="progress" {...register("progress")}>
              <option value="Pending">Pending</option>
              <option value="In progress">In progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div>
            <label htmlFor="priorityLevel">Priority Level: </label>
            <select id="priority-levels" {...register("priorityLevel")}>
              <option value="None">None</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </section>
        <footer className={"edit-form__footer"}>
          <button type="submit">DONE</button>
          <button onClick={toggleModal}>CLOSE</button>
        </footer>
      </form>
    </>
  );
};
