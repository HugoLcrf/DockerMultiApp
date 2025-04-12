"use client";
import Link from "next/link";
import "./nav.css";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/tableau">
            Gérer réservations
          </Link>
        </li>
        <li>
          <Link href="/statistiques">
            Statistiques
          </Link>
        </li>
        {/* <li>
          <Link href="/form">
            Formulaire
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}
