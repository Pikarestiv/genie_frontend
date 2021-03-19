import React from "react";
import Footer from "../../components/Footer";
import Link from "next/link";

import "./styles.scss";

const Contact = () => {
  return (
    <div>
      <div className="holding_header">
        <a href="/">
          <div className="holding_logo" />
        </a>
        <div className="holding_menu">
          {/* <p>About</p> */}
          <p>
            <Link href="/contact">Contact</Link>
          </p>
          <p className="holding_menu-signup">Sign up</p>
        </div>
      </div>
      <div class="faq" style={{ padding: "100px" }}>
        <h3 class="faq_title">About us</h3>
        <p>
          GiNiE is a public grant navigation, information and education portal
          and service. GiNiE assists users to simplify the navigation through,
          and search for, available grants from various funding sources. GiNiE
          also keeps its’ members kept fully aware of the latest funding
          opportunities.
        </p>
        <p>
          When grant funding information is updated, or new grant funding
          opportunities become available, email alerts are delivered to our
          subscribed users. Alerts are automatically configured to the user
          based on information supplied and previous interest, tailoring the
          service and delivering direct to your inbox. Presently GiNiE is
          focussed on the rural economy but will be expanding
        </p>
        <span class="contact">
          Any questions? Please get in touch via email{" "}
          <span style={{ color: "#eb613d" }}>info@ginie.co.uk</span> or give us
          a call on <span style={{ color: "#eb613d" }}>0762873633</span>
        </span>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
