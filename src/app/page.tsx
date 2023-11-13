import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to the Movie App</h1>
            <Link aria-label="Browse Movies" href="/search"><button className="btn btn-primary m-2">Browse here</button></Link>
            <Link aria-label="Browse Movies" href="/mylist"><button className="btn btn-neutral">Rated movies</button></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
