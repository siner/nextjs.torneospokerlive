/* eslint-disable @next/next/no-img-element */
export default function CardTourOpengraph({ tour }: { tour: any }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        margin: 0,
        padding: 0,
      }}
    >
      <figure
        style={{
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "60%",
        }}
      >
        <img
          style={{ display: "block", margin: "auto" }}
          width={300}
          height={250}
          src={`https://wsrv.nl/?url=${tour.logo}&w=300&h=250&fit=contain`}
          alt={tour.nombre}
        />
      </figure>
      <div
        style={{
          height: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          fontSize: "3.5rem",
          fontWeight: "bold",
          backgroundColor: "#ffffff",
        }}
      >
        <p style={{ display: "flex" }}>{tour.name}</p>
      </div>
    </div>
  );
}
