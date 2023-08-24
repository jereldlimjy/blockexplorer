import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="h-full">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-4xl mb-10">Oops! :(</h1>
        <p className="text-2xl mb-10">Sorry, an unexpected error has occurred.</p>
        <p className="text-2xl text-slate-500">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}