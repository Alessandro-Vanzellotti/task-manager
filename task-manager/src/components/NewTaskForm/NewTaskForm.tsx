import { IFormInput, TaskType } from "../../types";
import { IoMdAdd } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import "./NewTaskForm.scss";
import { createNewTask, getAllTasks } from "../../api/api";
import { priorityLevelsEnum, progressEnum } from "../../enums";
import { Dispatch, SetStateAction } from "react";

type Props = {
  taskList: TaskType[];
  setTaskList: Dispatch<SetStateAction<TaskType[]>>;
};

export const NewTaskForm: React.FC<Props> = ({ taskList, setTaskList }) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      title: "",
      description: "",
      priorityLevel: priorityLevelsEnum.none,
      progress: progressEnum.pending,
    },
  });

  const addNewTask = async (newTask: TaskType): Promise<void> => {
    const trimmedTitle = newTask.title.trim();
    let existingTask: boolean = false;

    taskList.forEach((task) => {
      if (task.title.match(trimmedTitle)) existingTask = true;
    });

    if (existingTask) {
      alert("The task is already on the list");
      return;
    }

    try {
      await createNewTask(newTask);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (
    data: IFormInput
  ): Promise<void> => {
    const task: TaskType = {
      _id: "",
      title: data.title,
      description: data.description,
      priorityLevel: data.priorityLevel,
      progress: data.progress,
    };

    try {
      await addNewTask(task);
      const newTaskList = await getAllTasks();
      setTaskList(newTaskList);
      reset({ ...getValues });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={"new-form"} onSubmit={handleSubmit(onSubmit)}>
      <header className={"new-form__header"}>
        <div className={"new-form__title"}>
          <label htmlFor="title">Title:</label>
          <input
            className={"new-form__title-input"}
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

      <section className={"new-form__description"}>
        <label htmlFor="description">Description:</label>
        <textarea
          maxLength={100}
          className={"new-form__description-text"}
          {...register("description")}
          placeholder="Type a description"
        ></textarea>
      </section>

      <footer className={"new-form__footer"}>
        <div>
          <label htmlFor="progress">Progress: </label>
          <select id="progress" {...register("progress")}>
            <option value="Pending">Pending</option>
            <option value="In progress">In progress</option>
            <option value="Complete">Complete</option>
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
        <button className={"new-form__add-button"} type="submit">
          <IoMdAdd className={"new-form__add-icon"} />
        </button>
      </footer>
    </form>
  );
};
