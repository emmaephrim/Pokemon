import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/logo.png";

export default function List() {
  return (
    <>
      <div>
        <div className="flex justify-between p-2 shadow-xl">
          <div className="hidden sm:flex items-center">
            <img
              src={logo}
              alt="Pokemon Logo"
              // width={"80px"}
              className="mx-2 w-28"
              style={{ marginBottom: "-30px" }}
            />
            <div className="font-bold text-lg">
              <span className="clashFont">Poké</span>
              <span className="interFont text-primary">book</span>
            </div>
          </div>
          <div>
            <form
              action=""
              className="flex rounded-s-full rounded-e-full border-2 border-themeBorder shadow-2xl"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-magnifying-glass"
                className="text-white p-3 w-3.5 h-3.5   mr-3"
              />
              <input
                type="search"
                name="search"
                id=""
                placeholder="Enter pokemon name"
                className="w-28 sm:w-auto my-2 me-1 bg-transparent focus:outline-none"
              />
            </form>
          </div>
          <div>
            <button className="border-2 border-themeBorder rounded-full">
              <div className="theme bg-primary h-7 w-7 rounded-full m-1"></div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
