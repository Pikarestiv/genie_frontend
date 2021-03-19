import React from "react";
import Link from "next/link";

import "./style.scss";

const Footer = () => (
  <div className="footer">
    <div className="footer_background" />
    <div className="footer_socials">
      <div className="footer_socials-facebook" />
      <div className="footer_socials-linkedin" />
      <div className="footer_socials-twitter" />
    </div>
    <ul className="footer_menu">
      <li>
        <Link href="/contact">Contact</Link>
      </li>
      <li>
        <Link href="/FAQ">FAQs</Link>
      </li>
      <li>
        <Link href="/privacy">Privacy Policy</Link>
      </li>
    </ul>
  </div>
);

export default Footer;
