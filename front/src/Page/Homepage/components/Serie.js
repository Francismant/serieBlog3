import { useContext, useState } from "react";
import styles from "./Serie.module.scss";
import { ApiContext } from "../../../context/ApiContext";

export default function Serie({
  serie,
  updateSeries,
  isDeleted,
  deleteSerie,
}) {
  const { id, title, image, likes } = serie;
  const BASE_API_URL = useContext(ApiContext);

  const handleClick = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/series/likedOne`, {
        method: "PATCH",
        body: JSON.stringify({ ...serie, likes: !likes }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Youpi");
        const updatedSerieFromBack = await response.json();
        updateSeries(updatedSerieFromBack);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDelete = async () => {
  //     try {
  //         const response = await fetch(`${BASE_API_URL}/series/deletedOne`, {
  //             method: "DELETE",
  //             body: JSON.stringify(isDeleted),
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //         });
  //         if (response.ok) {
  //             deletedSerie(deletedSerie)
  //         }
  //     } catch (error) {

  //     }
  // }

  async function handleDelete(e) {
    e.stopPropagation();
    try {
      const response = await fetch(`${BASE_API_URL}/series/deleteSerie/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        deleteSerie(id)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`${styles.serie}`} onClick={handleClick}>
      <i class={`fa-solid fa-trash`} onClick={handleDelete}></i>
      <div className={`${styles.imgContainer}`}>
        {/* <img src={s.image} alt={s.title} /> */}
        <img src={image} alt="oneSerie" />
      </div>
      <div
        className={`${styles.title} d-flex justify-content-between align-items-center`}
      >
        <h3 className="m10">{title}</h3>
        <div className="mr10">
          {/* <i class={`fa-solid fa-trash p20 ${styles.delete}` } onClick={handleDelete}></i> */}
          <i className={`fas fa-heart ${likes ? "text-error" : ""}`}></i>
        </div>
      </div>
    </div>
  );
}
