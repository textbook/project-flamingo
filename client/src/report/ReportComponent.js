import React, { Component, Fragment } from "react";
import HeaderComponent from "../home/HeaderComponent";
import {
  Button,
  Grid,
  Paper,
  withStyles,
  OutlinedInput
} from "@material-ui/core";
import type { Report } from "./models";

type Props = {
  classes: any,
  logout: () => void,
  saveReport: (report: Report) => void
};

const styles = themes => ({
  pagePaper: {
    padding: themes.spacing.unit * 4,
    boxShadow: "none"
  },
  outerContainer: {
    height: "100vh",
    margin: "5%"
  },
  headerText: {
    color: "#404040"
  },
  fontFamily: {
    fontFamily: "open Sans",
    margin: themes.spacing.unit * 0.5,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal"
  }
});

interface State {
  report: Report;
}

export class ReportComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      report: {
        overview: ""
      }
    };
  }

  saveReport = () => {
    this.props.saveReport(this.state.report);
  };

  changeProgressReport = (event: Event) => {
    this.setState({
      report: {
        overview: (event.target: window.HTMLInputElement).value
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <HeaderComponent logout={this.props.logout} />
        <Grid
          container
          spacing={24}
          direction="column"
          className={classes.outerContainer}
        >
          <Grid container justify="center">
            <Grid item xs={6}>
              <Paper justify="center" className={classes.pagePaper}>
                <Grid container direction="column" spacing={32}>
                  <Grid item>
                    <h1
                      data-test-id="report-details-title"
                      className={[classes.fontFamily, classes.headerText].join(
                        " "
                      )}
                    >
                      Grant progress
                    </h1>
                  </Grid>
                  <Grid item>
                    <OutlinedInput
                      data-test-id="report-progress-input"
                      className={classes.overviewInput}
                      fullWidth={true}
                      id="component-outlined"
                      placeholder="Please add an overview"
                      multiline
                      rows={10}
                      rowsMax={100}
                      labelWidth={0}
                      onChange={event => this.changeProgressReport(event)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      data-test-id="report-save-button"
                      color="primary"
                      variant="outlined"
                      disabled={this.state.report.overview === ""}
                      fullWidth={false}
                      onClick={() => this.saveReport()}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ReportComponent);
