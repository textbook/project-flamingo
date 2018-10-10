import React, { Component, Fragment } from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";

import ReportListComponent from "./ReportListComponent";
import HeaderComponent from "./HeaderComponent";
import type { Report } from "./models";

export type Props = {
  classes: any,
  logout: () => void,
  loadReports: () => void,
  reports: ?(Report[])
};

type State = {
  anchorEl: any
};

const styles = theme => ({
  rowContainer: {
    marginTop: theme.spacing.unit * 4
  }
});

export class HomeComponent extends Component<Props, State> {
  componentWillMount() {
    this.props.loadReports();
  }

  render() {
    const { classes, logout, reports } = this.props;
    return (
      <Fragment>
        <HeaderComponent logout={logout} />

        <Grid container className={classes.rowContainer}>
          <Grid item xs={1} />
          <Grid item container xs={10} justify="center">
            <Typography variant="display2" data-test-id="page-title">
              Monthly Report
            </Typography>
          </Grid>
        </Grid>

        <Grid container className={classes.rowContainer}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Typography variant="display1">Incomplete Reports</Typography>
          </Grid>
        </Grid>

        <Grid container className={classes.rowContainer}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            {reports && <ReportListComponent reports={reports} />}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(HomeComponent);
