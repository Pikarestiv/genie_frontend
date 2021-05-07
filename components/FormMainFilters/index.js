import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import "react-input-range/lib/css/index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import InputUnit from "../InputUnit";
import { getApiLink, snakeCaseToText, tagToText } from "../../utils";
import Link from '@material-ui/core/Link'

import "./styles.scss";

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  notchedOutline: {
    borderWidth: 0,
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.17)",
    borderRadius: "15px",
    width: "100%"
  },
  advSearch: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: '#eb613d',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 32,
    padding: '0 30px',
    "&:focus": {
      outline: 'none',
    }
  },
  advSearchBox: {
    width: '100%',
  }
});
const inputTheme = createMuiTheme({});
inputTheme.overrides = {
  MuiOutlinedInput: {
    root: {
      "&$focused $notchedOutline": {
        boxShadow: "0 0 100px rgba(0, 0, 0, 0.17)",
        border: "none",
        borderRadius: "15px",
        padding: 10,
        width: "100%"
      }
    }
  }
};

class FormMainFilters extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      selectedUnit: "",
      tag_groups: [],
      tag_groups_values: {}
    };
  }

  async componentDidMount() {
    await fetch(getApiLink("tag_group"))
      .then(res => res.json())
      .then(json => {
        this.setState({
          tag_groups: json
        });
      })
      .catch(err => console.error(err));
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes, onSubmit } = this.props;
    const { title, body, tag_groups, tag_groups_values } = this.state;

    return (
      <Paper
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
          opacity: 0.8,
        }}
        className="main-filters"
      >
        <h1>Search for Grants</h1>
        
      <div className="search">
        <MuiThemeProvider theme={inputTheme}>
          <TextField
            tabIndex="0"
            className="search_input"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline
              }
            }}
            placeholder=" enter keywords"
            // value={title}
            // onChange={this.handleChange("title")}
            value={body}
            onChange={this.handleChange("body")}
            autoFocus={true}
            disableunderline="true"
            variant={"outlined"}
            onKeyDown={e => { e.key === "Enter" && onSubmit(this.state) }}
          />
        </MuiThemeProvider>
        <input
          className="search_button"
          type="button"
          value="SEARCH"
          onClick={() => onSubmit(this.state)}
        />
      </div>

        <div className={classes.advSearchBox}>
          <Link
            onClick={() => {
              let advSearchEl = document.getElementById('advanced-search');
              advSearchEl.style.display = advSearchEl.style.display != "none"?"none":"block";
            }}
            >
              <button className={classes.advSearch}>Advanced Search</button>
          </Link>
        </div>

        <div id="advanced-search" style={{display: 'none'}}>
          {/* <div className="filters-block">
            <TextField
              id="search-title"
              label="Search in title"
              value={title}
              onChange={this.handleChange('title')}
            />
            <TextField
              id="search-body"
              label="Search in body"
              value={body}
              onChange={this.handleChange('body')}
            />
          </div> */}

          <div className="filters-block">
            <InputUnit classes={classes} onChange={selectedUnit => this.setState({ selectedUnit })} />
            {
              tag_groups && tag_groups.length > 0 && (
                tag_groups.map(tag_group =>
                  tag_group.tag && tag_group.tag.length > 0 &&
                  <FormControl key={tag_group.id} className={classes.formControl}>
                    <InputLabel htmlFor={`selected-${tag_group.title}`}>
                      {snakeCaseToText(tag_group.title)}
                    </InputLabel>
                    <Select
                      value={tag_groups_values[tag_group.title] || ''}
                      onChange={(e) =>
                        this.setState({
                          tag_groups_values: { ...tag_groups_values, [tag_group.title]: e.target.value }
                        })}
                      input={<Input name={`selected-${tag_group.title}`} id={`selected-${tag_group.title}`} />}
                    >
                      <MenuItem value="">
                        <em>Not specified</em>
                      </MenuItem>
                      {tag_group.tag
                        .sort((a, b) => a.title > b.title ? 1 : -1)
                        .map(e => <MenuItem key={e.title} value={e.id}>{tagToText(e.title)}</MenuItem>)}
                    </Select>
                  </FormControl>
                )
              )
            }
          </div>
          <div className="btn-wrapper">
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSubmit(this.state)}
            >
              Search
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(FormMainFilters);
