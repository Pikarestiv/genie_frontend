import React from "react";
import Footer from "../../components/Footer";
import Link from "next/link";

import "./styles.scss";

const FAQ = () => {
  return (
    <div>
      <div className="holding_header">
        <a href="/">
          <div className="holding_logo" />
        </a>
        <div className="holding_menu">
          {/* <p>About</p> */}
          <p>
            <Link href="/contact"><a title="Contact">Contact</a></Link>
          </p>
          <p className="holding_menu-signup">Sign up</p>
        </div>
      </div>
      <div class="faq">
        <h3 class="faq_title">FAQs</h3>
        <h4>What is GiNiE?</h4>
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
        <p>
          Subscribers will receive, on a weekly basis, an recap email. This
          summarises the most searched for funding opportunities, the latest
          grants and other points of interest from the GiNiE database over the
          last week.
        </p>
        <h4>How do I enable the email alert service?</h4>
        <p>
          The basic email alert service is activated upon registering on the
          GiNiE site. Subscribed members will receive the premium alerts service
          containing more expansive information and the ability to further
          tailor the email delivery cycle and content.
        </p>
        <h4>How do I find grants?</h4>
        <p>
          The GiNiE website has a large database with an intuitive search.
          Currently featuring grants from government bodies and it’s agencies.
        </p>
        <p>
          The interactive search firstly identifies possible grants of interest
          based on user details such as region and land use, but also allows a
          focussed search based on keywords for areas of interest (Fencing,
          Conservation, etc.).
        </p>
        <h4>Can I see/receive information that is only relevant to me?</h4>
        <p>
          Yes, the GiNiE alerts system will note your preferences and will
          “learn” the areas of interest to you. Simply indicate which grants you
          are not interested in seeing and subsequent notifications will tailor
          to your choices. This can also be customised on your account. This
          feature is available to all our subscribed users.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
