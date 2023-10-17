import styles from "../../Page/Homepage/Homepage.module.scss"

function SearchBar({setFilter}) {
    

    const handleInput = (e) => {
        const search = e.target.value;
        setFilter(search.trim().toLowerCase());
      };

    return (
      <div
            className={`d-flex justify-content-center align-items-center my30 ${styles.search}`}
          >
            <i className="fas fa-magnifying-glass mr10"></i>
            <input onInput={handleInput} className="flex-fill" type="text" placeholder="Rechercher" />
          </div>
    )
  }
  
  export default SearchBar