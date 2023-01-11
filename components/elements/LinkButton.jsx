export default function LinkButton(props) {
  const { href, target, children } = props;
  return (
    <a
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow block w-fit"
      href={href}
      target={target ? target : "_self"}>
      {children}
    </a>
  );
}
