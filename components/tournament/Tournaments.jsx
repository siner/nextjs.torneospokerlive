import { useState } from "react";
import RowTournament from "./RowTournament";

export default function Tournaments(props) {
  const { torneos, casinos } = props;
  let casinosid = casinos.map(({ id }) => id.toString());
  let filteredTournaments = torneos;

  const isChecked = (casinoid) => {
    return checked.includes(casinoid.toString());
  };
  const [checked, setChecked] = useState(casinosid);

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);

    filteredTournaments = torneos.filter((item) =>
      updatedList.includes(item.casinos.id.toString())
    );
  };

  return (
    <div className="w-full mt-10">
      <div>
        <form>
          <div className="mb-4 grid grid-cols-2 md:grid-cols-5">
            {casinos.map((casino) => (
              <div key={casino.id}>
                <input
                  type="checkbox"
                  name="casino"
                  value={casino.id}
                  checked={isChecked(casino.id) ? "checked" : ""}
                  onChange={handleCheck}
                />{" "}
                {casino.name}
              </div>
            ))}
          </div>
        </form>
        <div className="space-y-0.5">
          {torneos
            .filter((torneo) => checked.includes(torneo.casinos.id.toString()))
            .map((torneo) => (
              <RowTournament
                key={torneo.id}
                torneo={torneo}
                casino="true"
                className={"casino-" + torneo.casinos.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
