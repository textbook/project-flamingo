import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  withStyles
} from "@material-ui/core";
import moment from "moment";

import type { Report } from "../report/models";
import theme from "../theme";

const styles = themes => ({
  reportStatus: {
    borderLeft: "1px solid #d9d9d9",
    paddingLeft: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2
  },
  notFullWidth: {
    width: "initial"
  },
  cardContent: {
    // required to override :last-child rule on CardContent
    paddingBottom: `${theme.spacing.unit * 2}px !important`
  },
  dueDateLabel: {
    color: "#757c80"
  },
  dueDateOutlined: {
    borderColor: "#757c80"
  }
});

type Props = {
  classes: any,
  report: Report,
  updateReport: (report: Report) => void
};

export class ReportCardComponent extends Component<Props> {
  unsubmitReport = () => {
    this.props.updateReport({
      ...this.props.report,
      completed: false,
      submissionDate: undefined
    });
  };

  renderReportStatus(report: Report, classes: any) {
    const dueDate = moment(report.dueDate);
    const delta = dueDate.diff(moment(), "days");
    let status: string;

    if (report.completed && report.submissionDate) {
      status = moment(report.submissionDate).format("DD/MM/YYYY");
    } else if (delta < 0) {
      status = `${dueDate.fromNow(true)} late`;
    } else if (delta < 8) {
      status = `Due in ${dueDate.fromNow(true)}`;
    } else {
      status = moment(report.dueDate).format("DD/MM/YYYY");
    }
    const chipClasses = {
      label: classes.dueDateLabel,
      outlined: classes.dueDateOutlined
    };

    return (
      <Chip
        label={status}
        classes={chipClasses}
        variant="outlined"
        data-test-id="report-status"
      />
    );
  }

  render() {
    const { report, classes } = this.props;

    return (
      <Card data-test-id="report">
        <CardContent className={classes.cardContent}>
          <Grid container justify="space-between">
            <Grid
              item
              container
              direction="column"
              xs={3}
              className={classes.notFullWidth}
            >
              <Typography color="textSecondary" variant="caption">
                Grant
              </Typography>
              <Typography data-test-id="grant-name">{report.grant}</Typography>
            </Grid>
            <Grid item container xs={9} justify="flex-end">
              <Grid
                item
                container
                direction="column"
                className={classes.notFullWidth}
              >
                <Typography color="textSecondary" variant="caption">
                  Period
                </Typography>
                <Typography data-test-id="report-period">
                  {moment(report.reportPeriod).format("MMMM YYYY")}
                </Typography>
              </Grid>
              <Grid
                item
                container
                className={`${classes.reportStatus} ${classes.notFullWidth}`}
                alignItems="center"
              >
                {this.renderReportStatus(report, classes)}
                {report.completed && (
                  <Button
                    data-test-id="report-unsubmit-button"
                    color="primary"
                    onClick={() => this.unsubmitReport()}
                  >
                    Undo
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ReportCardComponent);
