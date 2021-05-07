import React, { PureComponent } from 'react';
import Link from "next/link";

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import './style.scss';

const styles = {
  media: {
    height: 140,
  },
  root: {
    backgroundColor: 'red'
  }
};

class GrantsCard extends PureComponent {

  render() {
    const { classes, grants = [], show } = this.props;

    return (
      <Paper
        className="grant-cards-wrapper"
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', padding: 0 }}
      >
        {grants.length ? grants.slice(0, 4).map(grant =>
          <Card key={grant.id} className="card" style={{ backgroundColor: 'rgba(248, 236, 220, 0.8)', boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, .1)' }}>
            <Link href={`/grant/${grant.id}`}>
              <CardActionArea style={{ width: '80%', margin: '0 auto' }}>
                <CardContent>
                  <Typography gutterBottom style={{ fontSize: '18px', color: '#1B1F29', fontWeight: 'bold' }}>
                    {grant.title}
                  </Typography>
                  {/* <Typography gutterBottom variant="body1" component="p">
                    {grant.raw_price}
                  </Typography> */}
                </CardContent>
              </CardActionArea>
            </Link>
            <CardActions style={{ padding: '0' }}>
              <div size="small" className="card_details">
                <Link href={`/grant/${grant.id}`}>
                  <a title="See Details">See details</a>
                </Link>
              </div>
              {/* <Button size="small" color="primary">
                <a href={grant.web_link} target="_blank" rel="noopener noreferrer">
                  Original
                </a>
              </Button> */}
            </CardActions>
          </Card>
        ) : null
        }
        {show && <h3> No result </h3>}
      </Paper>
    );
  }
}

export default withStyles(styles)(GrantsCard);