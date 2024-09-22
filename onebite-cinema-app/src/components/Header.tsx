import Link from "next/link";
export default function Header() {
  return (
    <header className="py-5">
      <h1>
        <Link className="text-xl font-bold text-obRed" href="/">
          ONEBITE CINEMA
        </Link>
      </h1>
    </header>
  );
}
