import { StrictMode, useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home";
import App from "./App";
import Products from "./Products";
import ChefClub from "./ChefClub";
import Awards from "./Awards";
import Contact from "./Contact";
import type { NavRoute } from "./components/NavBar";

function parseRoute(): NavRoute {
  const hash = window.location.hash.replace("#/", "");
  if (hash === "about") return "about";
  if (hash === "products") return "products";
  if (hash === "chef-club") return "chef-club";
  if (hash === "awards") return "awards";
  if (hash === "contact") return "contact";
  return "home";
}

const HASH: Record<NavRoute, string> = {
  home: "",
  about: "/about",
  products: "/products",
  "chef-club": "/chef-club",
  awards: "/awards",
  contact: "/contact",
};

function Root() {
  const [route, setRoute] = useState<NavRoute>(parseRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const onNavigate = useCallback((next: NavRoute) => {
    window.location.hash = HASH[next];
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  if (route === "about") return <App key="about" active="about" onNavigate={onNavigate} />;
  if (route === "products") return <Products key="products" active="products" onNavigate={onNavigate} />;
  if (route === "chef-club") return <ChefClub key="chef-club" active="chef-club" onNavigate={onNavigate} />;
  if (route === "awards") return <Awards key="awards" active="awards" onNavigate={onNavigate} />;
  if (route === "contact") return <Contact key="contact" active="contact" onNavigate={onNavigate} />;
  return <Home key="home" active="home" onNavigate={onNavigate} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
