import "./Search.scss";
import { HiMagnifyingGlass } from "react-icons/hi2";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export const Search: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <div className={"search"}>
      <HiMagnifyingGlass />
      <input
        type="text"
        className={"search__input"}
        placeholder="Search a task"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
