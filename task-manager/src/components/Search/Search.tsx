import "./Search.scss";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export const Search: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <div className={"search"}>
      <label className={"search__label"}>Search</label>
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
