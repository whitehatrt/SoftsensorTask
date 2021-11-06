import { useEffect } from "react";
import "../styles/globals.css";


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    typeof window !== undefined ? require("../public/assets/js/navbar.js") : "";
  }, []);
  return (
 
      <Component {...pageProps} />
   
  );
}

export default MyApp;
