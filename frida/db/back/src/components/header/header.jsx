import "./header.css";
import Link from "next/link";
import Deconnexion from "../connexion/Deconnexion";

export default function Header() {
  return (
<header>
<Link href="/">
<img src="LogoFrida.svg" alt="" />
          </Link>
    <Deconnexion></Deconnexion>
</header>
  );
}