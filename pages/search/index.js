import React, { Component } from 'react';
import Link from 'next/link';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import FormMainFilters from '../../components/FormMainFilters';
import GrantCards from '../../components/GrantCards';

import { getApiLink } from '../../utils';


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
});

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grants: []
    }
  }

  handleSearch = async ({title, body, selectedUnit, tag_groups_values}) => {

    fetch(
    getApiLink(`grant?${title.length ? `title=${title}&` : ''}${body.length ? `body=${body}&` : ''}` +
    `${selectedUnit.length ? `units=${selectedUnit}&` : ''}` +
    `tags=${JSON.stringify(Object.values(tag_groups_values).filter(tag => tag.length > 0))}`
    ))
      .then(res => res.json())
      .then(grants => this.setState({grants}))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.handleSearch({title: '', body: '', selectedUnit: '', tag_groups_values: {}});
  }

  render() {
    const { grants } = this.state;
    const { classes } = this.props;

    return (
      <div className={`App ${classes.root}`}>
        <FormMainFilters
          onSubmit={this.handleSearch}
        />
        <GrantCards grants={grants}/>
        <Link href="/new/grant">
          <a>
            <Fab className={classes.fab} color={'primary'}>
              <AddIcon/>
            </Fab>
          </a>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(SearchPage);