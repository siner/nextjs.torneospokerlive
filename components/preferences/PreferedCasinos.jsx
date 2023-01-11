import Spinner from "../elements/Spinner";
import { useState } from "react";
import { updateMyCasinos } from "../../lib/api";

export default function PreferedCasinos({ user_id, allcasinos, user_casinos }) {
  const [checked, setChecked] = useState(user_casinos);

  const [status, setStatus] = useState({
    error: "",
    success: false,
    isLoading: false,
  });

  const isChecked = (casinoid) => {
    return checked.includes(casinoid.toString());
  };

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const handleSave = async () => {
    setStatus({ error: "", success: false, isLoading: true });
    const result = await updateMyCasinos(user_id, checked);
    if (result?.error?.message) {
      setStatus(() => ({
        error: result.error.message,
        success: false,
        isLoading: false,
      }));
    } else {
      setStatus({ error: "", success: true, isLoading: false });
      window.location.reload(false);
    }
  };

  return (
    <div className="w-full mt-10">
      <ul>
        {allcasinos.map((casino) => (
          <li key={casino.id}>
            <input
              type="checkbox"
              value={casino.id}
              checked={isChecked(casino.id) ? "checked" : ""}
              onChange={handleCheck}
            />
            {casino.name}
          </li>
        ))}
      </ul>
      <div className="pt-3 relative">
        <button
          disabled={status.isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded focus:outline-none focus:shadow-outline flex flex-row justify-center items-center align-center w-32"
          type="button"
          onClick={handleSave}>
          {status.isLoading && <Spinner />} Guardar
        </button>
      </div>
    </div>
  );
}
