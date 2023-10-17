import styles from "./SerieForm.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { ApiContext } from "../../../../context/ApiContext";

export default function SerieForm() {

  const BASE_API_URL = useContext(ApiContext)
  const defaultValues = {
    title: "",
    poster: null,
    year: null,
    synopsis: "",
  };

  const MAX_FILE_SIZE = 5000000;
  const serieSchema = yup.object({
    title: yup.string().required("Ce champ doit être renseigné"),
    poster: yup
      .mixed()
      .nullable(false, "Vous devez télécharger une image")
      .required("Vous devez télécharger une image")
      .test("is-valid-type", "Ce doit être un format d'image", (value) => {
        if (!value) return false;
        if (value[0] && value[0].name) {
          return (
            ["jpg", "png", "jpeg", "avif", "webp"].indexOf(
              value[0].name.toLowerCase().split(".").pop()
            ) > -1
          );
        }
        return false;
      })
      .test(
        "is-valid-size",
        "Max allowed size is 5MO",
        (value) =>
          value && value[0] && value[0].size && value[0].size <= MAX_FILE_SIZE
      ),
    year: yup
      .number()
      .typeError("Le champ doit contenir un nombre")
      .test(
        "is-four-digits",
        "Le nombre doit contenir exactement quatre chiffres",
        (value) => {
          return /^[0-9]{4}$/.test(value);
        }
      )
      .required("Le champ est requis"),
    synopsis: yup.string().required("Ce champ doit être renseigné"),
  });

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
    clearErrors,
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(serieSchema),
  });

  const convertBlobTobase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function submit(values) {
    console.log(values);
    try {
      // Convertion en base 64
      let newPoster = values.poster[0];
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(newPoster);
      fileReader.onload = async () => {
        const buffer = fileReader.result;
        const blob = new Blob([buffer], { type: newPoster.type });
        const base64 = await convertBlobTobase64(blob);
        values.poster = base64;
        console.log(values);
        clearErrors()
        const response = await fetch(`${BASE_API_URL}/series/insertSerie`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values)
        })
        if (response.ok) {
          reset(defaultValues)
        }
      };
    } catch (error) {
      console.error(error);
    }
    reset(defaultValues);
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column card p20 ${styles.form}`}
    >
      <h2 className="mb20">Ajouter une série</h2>
      <div className="d-flex flex-column mb20">
        <label htmlFor="title">Titre de la série</label>
        <input {...register("title")} type="text" id="title" />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>
      <div className="d-flex flex-column mb20">
        <label htmlFor="poster">Poster</label>
        <input {...register("poster")} type="file" id="poster" />
        {errors.poster && <p className="form-error">{errors.poster.message}</p>}
      </div>
      <div className="d-flex flex-column mb20">
        <label htmlFor="year">Année de sortie</label>
        <input {...register("year")} type="number" id="year" />
        {errors.year && <p className="form-error">{errors.year.message}</p>}
      </div>
      <div className="d-flex flex-column mb20">
        <label htmlFor="synopsis">Synopsis</label>
        <textarea
          {...register("synopsis")}
          cols={200}
          rows={10}
          id="synopsis"
        />
        {errors.synopsis && (
          <p className="form-error">{errors.synopsis.message}</p>
        )}
      </div>
      <div>
        <button disabled={isSubmitting} className="btn btn-primary">
          Sauvegarder
        </button>
      </div>
    </form>
  );
}
