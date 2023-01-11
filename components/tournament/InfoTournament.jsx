import { localeDateString, getTextColor } from "../../lib/utils";

export default function InfoTournament(props) {
  const { torneo } = props;

  const backgroundColor = torneo.casinos.color;
  const textColor = getTextColor(backgroundColor);

  const date = new Date(torneo.date);

  return (
    <div
      className="w-100 flex justify-between p-5 items-center"
      style={{ backgroundColor: backgroundColor, color: textColor }}>
      <div className="flex gap-10 items-center">
        <div className="casino">
          <a href={"/casino/" + torneo.casinos.slug}>
            <img
              src={torneo.casinos.logo}
              title={torneo.casinos.name}
              width="80"
            />
          </a>
        </div>
        <div className="flex flex-col text-xs w-60">
          <div>{torneo.casinos.name}</div>
          <div>{localeDateString(date)}</div>
          <div>
            <strong>{torneo.hour}</strong>
          </div>
        </div>
        <div className="name">
          <a href={"/torneo/" + torneo.id}>{torneo.name}</a>
        </div>
      </div>
      {torneo.price && torneo.price > 0 && (
        <div className="price font-bold">{torneo.price}€</div>
      )}
    </div>
  );
}
