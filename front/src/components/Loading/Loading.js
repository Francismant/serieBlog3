import styles from "./Loading.module.scss"

function Loading() {
  return (
    <div className="d-flex justify-content-center align-itemscenter flexx-fill">
        <i className={`fas fa-spinner ${styles.spinner}`}></i>
    </div>
  )
}

export default Loading