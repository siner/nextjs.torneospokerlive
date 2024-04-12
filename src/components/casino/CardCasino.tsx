/* eslint-disable @next/next/no-img-element */
export default function CardCasino({ casino }: { casino: any }) {
  const bg = casino.color;
  return (
    <a href={"/casinos/" + casino.slug}>
      <div className="card w-full bg-base-100 shadow-xl">
        <figure className="h-32 md:h-40" style={{ backgroundColor: bg }}>
          <img
            className="mx-auto"
            src={`https://wsrv.nl/?url=${casino.logo}&w=200&h=150&fit=contain`}
            alt={casino.nombre}
          />
        </figure>
        <div className="card-body items-center justify-center text-center p-4 md:p-8">
          <h2 className="card-title">{casino.name}</h2>
        </div>
      </div>
    </a>
  );
}
