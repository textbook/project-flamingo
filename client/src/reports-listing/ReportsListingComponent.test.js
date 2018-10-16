import React from "react";
import { shallow } from "enzyme";

import { ReportsListingComponent } from "./ReportsListingComponent";

describe("ReportsListingComponent", () => {
  let wrapper;

  describe("with no reports", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ReportsListingComponent
          classes={{}}
          account={undefined}
          logout={() => {}}
          reports={[]}
        />
      );
    });

    it("displays a message if there are no completed reports", () => {
      expect(
        wrapper
          .find('[data-test-id="no-reports-title"]')
          .render()
          .text()
      ).toContain("No submitted reports yet!");
      expect(
        wrapper
          .find('[data-test-id="no-reports-message"]')
          .render()
          .text()
      ).toContain("Once you’ve a completed report it will appear here.");
    });
  });

  describe("with reports", () => {
    const reports = [
      {
        id: 1,
        completed: true,
        overview: "Mitchell Overview completed",
        grant: "Grant Mitchell",
        reportPeriod: "2018-10-01T00:00:00.000Z",
        submissionDate: "2018-09-15T03:24:00.000Z"
      },
      {
        id: 2,
        completed: false,
        overview: "Jone Overview",
        grant: "Jone Grace",
        reportPeriod: "2018-09-01T00:00:00.000Z"
      }
    ];
    beforeEach(() => {
      wrapper = shallow(
        <ReportsListingComponent
          classes={{}}
          account={undefined}
          logout={() => {}}
          reports={reports}
        />
      );
    });

    it("displays a list of completed reports", () => {
      expect(
        wrapper.find(
          '[data-test-id="submitted-reports"] [data-test-id="report"]'
        )
      ).toHaveLength(1);
      const firstReport = wrapper
        .find('[data-test-id="submitted-reports"] [data-test-id="report"]')
        .first();
      expect(
        firstReport
          .find('[data-test-id="report-grant"]')
          .render()
          .text()
      ).toContain(reports[0].grant);

      expect(
        firstReport
          .find('[data-test-id="report-period"]')
          .render()
          .text()
      ).toContain("October 2018");
      expect(
        firstReport
          .find('[data-test-id="report-submitted"]')
          .render()
          .text()
      ).toContain("15/09/2018");
    });
  });
});
