import "./Loader.css";
import loader from "../../../assets/images/loading.gif";

export function Loader() {
  return (
    <div className="loader">
      <img id="loading" src={loader} alt="loader" />
    </div>
  );
}
