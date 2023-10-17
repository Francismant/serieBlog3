import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError()
    console.log(error);
  return (
    <div>
      <h1>ErrorPage</h1>
      <p>{error.status} | {error.statusText} </p>
    </div>
  );
}

export default ErrorPage;