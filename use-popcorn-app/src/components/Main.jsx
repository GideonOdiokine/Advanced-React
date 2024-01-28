import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";

const Main = ({ watched, tempMovieData }) => {
  return (
    <main className="main">
      <ListBox movies={tempMovieData} />
      <WatchedBox watched={watched} />
    </main>
  );
};

export default Main;
