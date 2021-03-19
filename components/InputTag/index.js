import React from 'react';
import Downshift from 'downshift';
import deburr from 'lodash/deburr';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import { getApiLink } from '../../utils';

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.title) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.title}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.title}
    </MenuItem>
  );
}

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function getSuggestions(value, suggestions = []) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  if (value === '') {
    return suggestions;
  }

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.title.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

class InputTag extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      inputValue: '',
      selectedItem: props.value ? props.value.map(e => e.title) : [],
      tags: [],
      isOpen: true,
    };
  }

  async componentDidMount() {
    await fetch(getApiLink('tag_group'))
      .then(res => res.json())
      .then(res => this.props.tagGroup ? res.filter(group => group.title === this.props.tagGroup) : res)
      .then(body => this.setState({tags: body.reduce((x, y) => x.concat(y.tag), [])}));
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
    }

    this.setState({
      inputValue: '',
      selectedItem,
    }, this.updateParent());
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    }, this.updateParent());
  };

  updateParent = () => () => {
    if (this.props.onChange) {
      this.props.onChange(
        this.state.selectedItem
        .map(a => this.state.tags.filter(b => b.title === a)[0])
      );
    }
  }

  render() {
    const { classes } = this.props;
    const { inputValue, selectedItem, tags } = this.state;

    return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedItem}
        isOpen={this.state.menuIsOpen}
        onOuterClick={() => this.setState({menuIsOpen: false})}
        initialIsOpen={true}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onBlur: this.handleInputChange,
                onFocus: () => this.setState({menuIsOpen: true}),
                onKeyDown: this.handleKeyDown,
                placeholder: 'Select multiple tags',
              }),
              label: 'Select tags',
            })}
            {isOpen ? (
              <Paper className={classes.paper} style={{maxHeight: 220, overflowY: 'auto'}} square>
                {getSuggestions(inputValue2, tags).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.title }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(InputTag);