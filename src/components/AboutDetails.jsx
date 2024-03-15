import { v4 as uniqId } from "uuid";

function AboutDetails({ item }) {
  return (
    <>
      <div className="text-xl font-bold p-1">About</div>
      <div
        className="w-56 mx-auto"
        style={{
          background: `linear-gradient(270deg, #FFFFFF -20%, rgba(217, 217, 217, 0.27) 45.3%, #FFFFFF 102.92%)`,
        }}
      >
        <table className="table-fixed ">
          <tbody>
            <tr>
              <td>Height</td>
              <th>{(item?.height / 10).toFixed(1)}m</th>
            </tr>
            <tr className="border border-spacing-x-0">
              <td>Weight</td>
              <th>{(item?.weight / 10).toFixed(1)}kg</th>
            </tr>
            <tr>
              <td className="pb-6">Abilities</td>
              <th className="px-6 pt-2">
                {item?.abilities.map((element, index) => (
                  <li key={uniqId()}>{element?.ability?.name}</li>
                ))}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AboutDetails;
