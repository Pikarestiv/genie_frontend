import React, { Component } from "react";
const publicIp = require("public-ip");
import Link from "next/link";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

import FormMainFilters from "../FormMainFilters";
import GrantCards from "../GrantCards";
import "../Popup/styles.scss";
import FormDialog from "../Popup";
import { getApiLink } from "../../utils";

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

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grants: [],
      open: false,
      show: false
    };
  }

  handleSearch = async ({
    title,
    body,
    selectedUnit,
    selectedPriceRange,
    tag_groups_values
  }) => {
    const pr = selectedPriceRange;
    const userIp = await publicIp.v4();
    fetch(
      getApiLink(
        `grant?${title.length ? `title=${title}&` : ""}${
          body.length ? `body=${body}&` : ""
        }` +
          `${selectedUnit.length ? `units=${selectedUnit}&` : ""}` +
          // `${pr.min && pr.max ? `minPrice=${pr.min}&maxPrice=${pr.max}&` : ''}` +
          `tags=${JSON.stringify(
            Object.values(tag_groups_values).filter(tag => tag.length > 0)
          )}` +
          `&ip=${userIp}`
      )
    )
      .then(res => res.json())
      .then(resp => {
        window.scroll({
          top: 500,
          behavior: 'smooth',
        })
        if (!resp.searchAllowed) {
          this.setState({ open: true });
        } else {
          this.setState({ grants: resp.items });
          if (resp.items.length === 0) {
            this.setState({ show: true });
          } else {
            this.setState({ show: false });
          }
        }
      })
      .catch(err => console.error(err));
  };
  closePopup = e => {
    this.setState({ open: false });
  };

  openPopup = e => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <div
        className={`App ${classes.root}`}
        style={{ width: "100%", background: "none" }}
      >
        <FormMainFilters onSubmit={this.handleSearch} />
        {/* {this.state.grants.length !== 0 && <FormNewSubscriber result={this.state.grants} />} */}
        <GrantCards grants={this.state.grants} show={this.state.show} />
        {this.state.grants.length !== 0 && (
          <p
            onClick={this.openPopup}
            style={{
              marginTop: "45px",
              fontSize: "23px",
              paddingLeft: "3px",
              color: "#eb613d",
              cursor: "pointer"
            }}
          >
            Want to get more?
          </p>
        )}
        {/* <Link href="/new/grant">
          <a>
            <Fab className={classes.fab} color={'primary'}>
              <AddIcon />
            </Fab>
          </a>
        </Link> */}
        {this.state.open && <FormDialog close={this.closePopup} />}
      </div>
    );
  }
}

export default withStyles(styles)(SearchPage);
