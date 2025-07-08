import { IFormInput, TaskType } from "../../types";
import "./TaskEditingForm.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { updateTask } from "../../api/api";
import { Dispatch, SetStateAction } from "react";

type Props = {
  task: TaskType;
  toggleModal: () => void;
  modal: boolean;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const TaskEditingForm: React.FC<Props> = ({ task, toggleModal, modal, isEditing, setIsEditing }) => {
  //const navigate = useNavigate();

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

    await updateTask(task._id, editedTask);
    //navigate(`/`);
  };

  if(modal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
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
              placeholder="Type a title"
            />
            <p role="alert" className={"error"}>
              {errors.title?.message}
            </p>
          </div>
        </header>

        <section className={"edit-form__description"}>
          <textarea
            maxLength={100}
            className={"form__description-text"}
            {...register("description")}
            placeholder="Type a description"
          ></textarea>
        </section>

        <footer className={"edit-form__footer"}>
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
          <button className={"edit-form__add-button"} type="submit">
            Done
          </button>
        </footer>
      </form>
    </>
  );
};
