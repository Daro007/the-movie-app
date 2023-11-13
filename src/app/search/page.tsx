import SearchClientComponent from "./page.context";
import Head from "next/head";

export const metadata = {
  title: "Search Movies",
  description: "Find your favorite movies here.",
};

const SearchPage = () => {
  return (
    <>
      <Head>
        <meta
          property="og:title"
          content={metadata.title as string}
          key="title"
        />
        <meta
          property="og:description"
          content={metadata.description as string}
          key="description"
        />
      </Head>
      <SearchClientComponent />;
    </>
  );
};

export default SearchPage;
