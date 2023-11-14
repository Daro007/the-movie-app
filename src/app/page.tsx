import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="hero min-h-screen relative overflow-hidden">
        <Image
          src="https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg"
          alt="Background"
          fill={true}
          className="brightness-50" 
        />
        <div className="hero-overlay bg-black bg-opacity-40 absolute inset-0"></div>
        <div className="hero-content text-center text-neutral-content relative z-10">
          <div className="max-w-md mx-auto">
            <h1 className="mb-5 text-5xl font-bold text-white">Welcome to the Movie App</h1>
            <Link aria-label="Browse Movies" href="/search">
              <button className="btn btn-primary m-2">Browse here</button>
            </Link>
            <Link aria-label="Browse Movies" href="/mylist">
              <button className="btn btn-neutral">Rated movies</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

