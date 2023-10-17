import styles from "./Homepage.module.scss";
import Serie from "./components/Serie";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { ApiContext } from "../../context/ApiContext";
import SearchBar from "../../components/Search/SearchBar";
import useFetchData from "../../hooks/useFetchData";

export default function Homepage() {
  const [filter, setFilter] = useState("");
  const BASE_API_URL = useContext(ApiContext);
  const [isDeleted, setIsDeleted] = useState([]);

  const [[series, setSeries], isLoading] = useFetchData(
    BASE_API_URL,
    "series/getSeries"
  );

  function updateSeries(updateSeries) {
    setSeries(series.map((s) => (s.id === updateSeries.id ? updateSeries : s)));
  }

  // const deleteSerie = (deletedSerie) => {
  //   setIsDeleted(series.filter((s) => (s.id === deletedSerie.id ? deletedSerie : s)))
  // }

  function deleteSerie(id) {
    setSeries(series.filter((s) => s.id !== id));
  }

  return (
    <div className="flex-fill container d-flex flex-column p20">
      <h1 className="my30">Découvrez nos dernières critiques</h1>
      <div
        className={`card p20 d-flex flex-column mb20 flex-fill ${styles.contentCard}`}
      >
        <SearchBar setFilter={setFilter} />
        {isLoading ? (
          <Loading />
        ) : (
          <div className={`${styles.grid}`}>
            {series
              .filter((s) => s.title.toLowerCase().includes(filter))
              // .filter((s)=>s.title.toLowerCase().startsWith(filter))
              .map((serie) => (
                <Serie
                  key={serie.id}
                  serie={serie}
                  updateSeries={updateSeries}
                  isDeleted={isDeleted}
                  deleteSerie={deleteSerie}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
