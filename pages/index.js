import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import SearchPage from "../components/SearchPage";
import FormNewSubscriber from "../components/FormNewSubscriber";
import "../components/Popup/styles.scss";
import FormDialog from "../components/Popup";
import Footer from "../components/Footer";
import Featured from "../components/Featured";
import Link from "next/link";

import "./style.scss";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: "relative"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class Holding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      show: false
    };
  }
  
  closePopup = e => {
    this.setState({ open: false });
  };

  openPopup = e => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="holding_page">
        <div className="holding_header">
          <a href="/">
            <div className="holding_logo" />
          </a>
          <div className="holding_menu">
            {/* <p>About</p> */}
            <p>
              <Link href="/contact">Contact</Link>
            </p>
            <p 
              className="holding_menu-signup"
              onClick={this.openPopup}
              >Sign up</p>
              {this.state.open && <FormDialog close={this.closePopup} />}
          </div>
          {/* <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            Continue
          </Button> */}
        </div>
        <div className="holding_description">
          <h2>
            Connecting you <br /> with your grants.
          </h2>
          <p className="holding_text">
            The UK government has all kinds of grants available which can offer
            payment for taking care of your environment and rural community. But
            finding the right grants for you can be difficult.{" "}
            <strong>We’re here to help.</strong>
          </p>
          <div className="holding_description-image" />
          {/* <img src="/static/img/village.svg" alt="landscape" />
          <div className="holding_description_next">
            <Button
              className="button"
              variant="contained"
              color="primary"
              onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })}
            >
              Get started
            </Button>
          </div> */}
          <SearchPage />
        </div>
        <Featured />
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(Holding);
