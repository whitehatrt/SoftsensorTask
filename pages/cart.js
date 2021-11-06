import Link from "next/link";
import Head from "next/head";
const cart = () => {
  return (
    <>
      <Head>
        <title>Store App | Cart</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div id="navbar">
        <Link href="/">
          <a>Back</a>
        </Link>
      </div>
      <p>Cart</p>
    </>
  );
};

export default cart;
