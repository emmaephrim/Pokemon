import { v4 as uniqId } from "uuid";

function StatsDetails({ item }) {
  return (
    <div key={uniqId()}>
      <div className="text-xl font-bold p-1">Stats</div>
      <div
        className="w-full"
        style={{
          background: `linear-gradient(270deg, #FFFFFF -20%, rgba(217, 217, 217, 0.27) 45.3%, #FFFFFF 102.92%)`,
        }}
      >
        <table>
          <tbody>
            {item?.stats.map((element, index) => (
              <tr key={uniqId}>
                <td className="text-end p-0 sm:pr-7">
                  {(element?.stat?.name).charAt(0).toUpperCase() +
                    (element?.stat?.name).slice(1)}
                </td>
                <td>
                  <progress
                    className="progress progress-primary rounded-none"
                    value={element?.base_stat}
                    max="100"
                  ></progress>
                </td>
                <td className="p-0 sm:pl-7">{element?.base_stat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatsDetails;
