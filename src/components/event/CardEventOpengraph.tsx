/* eslint-disable @next/next/no-img-element */
import { getSimpleDate } from "@/lib/utils";

export default function CardEventOpengraph(props: {
  event: any;
  showCasino: boolean;
}) {
  var evento = props.event;
  var showCasino = props.showCasino;
  let datestringfrom = getSimpleDate(evento.from);
  let datestringto = getSimpleDate(evento.to);
  const bg = evento.casino.color;

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
          <img
            src={`https://wsrv.nl/?url=${evento.tour.logo}&w=300&h=300&fit=contain&mask=circle`}
            width={200}
            height={200}
            style={{ display: "block", margin: "auto" }}
            alt={evento.name}
          />
          {showCasino && (
            <img
              style={{ display: "block", margin: "auto" }}
              src={`https://wsrv.nl/?url=${evento.casino.logo}&w=300&h=300&fit=contain&mask=circle`}
              width={200}
              height={200}
              alt={evento.casino.name}
            />
          )}
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
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              fontSize: "1.3rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                style={{
                  marginLeft: "0.5rem",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              <div>{datestringfrom}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>{datestringto}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                style={{
                  marginRight: "0.5rem",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2.5rem",
            }}
          >
            <p style={{ fontWeight: "bold" }}>{evento.name}</p>
            <p style={{ fontSize: "1.5rem" }}>{evento.casino.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
