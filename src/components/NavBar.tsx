import Link from "next/link";

function NavBar() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <Link
        className="btn btn-ghost normal-case text-xl"
        href="/"
        aria-label="Homepage"
      >
        The Movie App
      </Link>
    </div>
  );
}

export default NavBar;
