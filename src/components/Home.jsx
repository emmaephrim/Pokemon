import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
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
    <main data-theme={localStorage.getItem("theme")}>
      <div className="flex justify-center flex-col items-center h-screen p-1 themeBg">
        <img
          src={logo}
          alt="logo"
          className="w-56"
          style={{ marginTop: -60 }}
        />
        <div className="font-black text-3xl m-5 ">
          <span className="clashFont">Poké</span>
          <span className="interFont text-primary">book</span>
        </div>
        <p className="generalSans text-center">
          Largest Pokémon index with information
          <br />
          about every Pokemon you can think of.
        </p>
        <div>
          <form
            className="bg-white border-4 rounded-e-full rounded-s-full px-3 py-1 border-primary m-6 flex items-center justify-between"
            onSubmit={handleSearch}
          >
            <input
              type="search"
              name="search"
              className="w-24 sm:w-64 h-10 focus:outline-none generalSans"
              id=""
              placeholder="Enter pokemon name "
              ref={searchInputREf}
            />
            <button type="submit">
              <FontAwesomeIcon
                icon="fa-solid fa-magnifying-glass"
                className="text-white p-3 w-3.5 h-3.5 bg-primary rounded-full  ml-1"
              />
            </button>
          </form>
        </div>
        <Link to={"lists"} className="underline">
          View All
        </Link>
      </div>
    </main>
  );
}
