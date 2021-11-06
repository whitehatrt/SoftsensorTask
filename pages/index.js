import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import axios from "axios";
import truncateString from "../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";

import { useEffect, useRef, useState } from "react";
export default function Home() {
  const [products, setProducts] = useState([{}]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchData();
    } else {
      fetchMoreData();
    }
  }, [page]);

  const fetchData = async () => {
    const response = await axios.get(`/api/products?limit=${5}`);

    setProducts(response.data);
    setTotalResults(parseInt(response.data.length));
  };
  const fetchMoreData = async () => {
    let res = totalResults + 5;
    const response = await axios.get(`/api/products?limit=${res}`);

    setTotalResults(res);
    setProducts((prod) => {
      return prod?.concat(
        response.data?.filter((resd, i) => {
          return resd.id !== prod[i]?.id;
        })
      );
    });
  };
  return (
    <>
      <Head>
        <title>Store App | Home </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div id="navbar">
        <a href="#home">Home</a>
      </div>
      <div className={styles.container}>
        <main className={styles.main}>
          <InfiniteScroll
            dataLength={products?.length}
            next={() => {
              setPage((page) => {
                return page + 1;
              });
            }}
            hasMore={products?.length === totalResults}
            loader={
              <p style={{ textAlign: "center" }}>
                <h1>Loading...</h1>
              </p>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have Caught it all</b>
              </p>
            }
          >
            <div className={styles.grid}>
              {products?.map((pd, i) => {
                return (
                  <div className={styles.card} key={i}>
                    <h3 className={styles.title}>
                      {truncateString(pd.title, 30)}
                    </h3>
                    <div
                      className={styles.imgDiv}
                      style={{ backgroundImage: `url('${pd.image}')` }}
                    >
                      {/* <img
                        src={pd.image}
                        className={styles.image}
                        loading="lazy"
                      /> */}
                    </div>
                    <p className={styles.description}>
                      {truncateString(pd.description, 100)}
                    </p>
                    <div className={styles.flexOuter}>
                      <div className={styles.flex}>
                        <span className={styles.price}>{pd.price}</span>
                        <span className={styles.category}>{pd.category}</span>
                      </div>
                      <Link href="/cart">
                        <button as="a" className={styles.btn}>
                          Add to Cart
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </main>
      </div>
    </>
  );
}
