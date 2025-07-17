"use client";
import { useEffect } from "react";
import { NextPage } from "next";

const Home: NextPage = () => {
  useEffect(() => {
    window.location.href = "http://3.109.209.16";
  }, []);

  return <p>Redirecting to 3.109.209.16...</p>;
};

export default Home;
