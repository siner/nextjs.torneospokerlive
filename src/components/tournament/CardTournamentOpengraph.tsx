/* eslint-disable @next/next/no-img-element */
import { formatFullDate } from "@/lib/utils";

export default function CardTournamentOpengraph({
  tournament,
  event,
  casino,
}: {
  tournament: any;
  event: any;
  casino: any;
}) {
  const bg = casino.color;

  let datetorneo = new Date(tournament.date);
  let datestring = formatFullDate(datetorneo);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          margin: 0,
          padding: 0,
        }}
      >
        <figure
          style={{
            backgroundColor: bg,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "50%",
          }}
        >
          {event && (
            <img
              src={`https://wsrv.nl/?url=${event.tour.logo}&w=300&h=300&fit=contain&mask=circle`}
              width={200}
              height={200}
              style={{ display: "block", margin: "auto" }}
              alt={event.name}
            />
          )}
          <img
            style={{ display: "block", margin: "auto" }}
            src={`https://wsrv.nl/?url=${casino.logo}&w=300&h=200&fit=contain`}
            width={300}
            height={200}
            alt={casino.name}
          />
        </figure>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "2rem",
            alignItems: "center",
            textAlign: "center",
            height: "50%",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.8rem",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "4rem",
                fontSize: "2.5rem",
              }}
            >
              <div style={{ display: "flex" }}>{tournament.name}</div>
              {tournament.buyin && (
                <div style={{ display: "flex", fontWeight: "bold" }}>
                  {tournament.buyin + "€"}
                </div>
              )}
            </div>
            <div style={{ display: "flex" }}>
              {datestring}
              {tournament.time ? " - " + tournament.time.substring(0, 5) : ""}
            </div>
            <p style={{ fontSize: "1.5rem" }}>{casino.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
