import React, { Fragment } from "react";
import { Footer, Header } from "../Components";
import { Hero } from "../Pages";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Hero />
      <Footer />
    </Fragment>
  );
}
