/* eslint-disable @next/next/no-img-element */
export default function CardCasinoOpengraph({ casino }: { casino: any }) {
  const bg = casino.color;
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
          backgroundColor: bg,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "60%",
        }}
      >
        <img
          style={{ display: "block", margin: "auto" }}
          width={200}
          height={150}
          src={`https://wsrv.nl/?url=${casino.logo}&w=200&h=150&fit=contain`}
          alt={casino.nombre}
        />
      </figure>
      <div
        style={{
          height: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          fontSize: "2.5rem",
          fontWeight: "bold",
        }}
      >
        <p style={{ display: "flex" }}>{casino.name}</p>
      </div>
    </div>
  );
}
