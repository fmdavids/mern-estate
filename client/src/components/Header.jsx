import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-sm">
      <div className="flex justify-between items-center p-3 max-w-6xl mx-auto">
        <h1>
          <span className="text-slate-400">Estate</span>
          <span className="text-slate-600">Header</span>
        </h1>
        <form className="bg-transparent p-3 rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className=" focus:outline-none w-24 sm:w-64 "
          />
        </form>
        <ul className="flex items-center gap-4">
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-700 hover:underline underline-offset-4">Home</li>
          </Link>
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-700 hover:underline underline-offset-2">About</li>
          </Link>
          <Link to={"/"}>
            <li className=" sm:inline text-slate-700 hover:underline underline-offset-2">SignIn</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
