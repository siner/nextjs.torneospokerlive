export default function RowCasino({ casino }) {
  const backgroundColor = casino.color;

  return (
    <div className="rowcasino flex text-white bg-stone-500 hover:bg-stone-700">
      <div
        className="colorstick"
        style={{ backgroundColor: backgroundColor }}></div>
      <div className="w-full flex flex-col gap-4 md:flex-row justify-between p-5 py-2 items-center">
        <div className="font-bold text-3xl md:text-xl w-100 text-center md:text-right">
          {casino.name}
        </div>
      </div>
    </div>
  );
}
