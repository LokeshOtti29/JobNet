import React, { useEffect } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Categorycarousel from "./Categorycarousel";
import Latestjobs from "./Latestjobs";
import Footer from "./Footer";
import useGetalljob from "../hooks/useGetalljob";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetalljob();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role == "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <Categorycarousel />
      <Latestjobs />
      <Footer />
    </div>
  );
};

export default Home;
