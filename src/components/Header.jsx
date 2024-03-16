import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ContentContext } from "./App";

export default function Header() {
  const { setThemeModel } = useContext(ContentContext);
  const searchInputREf = useRef();
  const navigate = useNavigate();

  async function handleSearch(event) {
    event.preventDefault();
    const query = searchInputREf.current.value;
    try {
      navigate(`/lists/${query}`);
    } catch (error) {
      console.log("Search Error From Home component: " + error.message);
    }
  }

  return (
    <div className="flex justify-between p-3 shadow-xl">
      <Link to={"/"}>
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
      </Link>
      <div>
        <form
          action=""
          className="flex rounded-s-full rounded-e-full border-2 border-themeBorder shadow-2xl"
          onSubmit={handleSearch}
        >
          <button type="submit">
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              className=" p-3 w-3.5 h-3.5   mr-3"
            />
          </button>
          <input
            type="search"
            name="search"
            id=""
            placeholder="Enter pokemon name"
            className="w-28 sm:w-auto my-2 me-1 bg-transparent focus:outline-none"
            ref={searchInputREf}
          />
        </form>
      </div>
      <div>
        <button
          className="border-2 border-themeBorder rounded-full"
          onClick={() => setThemeModel(true)}
        >
          <div className="theme bg-primary h-7 w-7 rounded-full m-1"></div>
        </button>
      </div>
    </div>
  );
}
