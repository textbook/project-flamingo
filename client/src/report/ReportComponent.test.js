import React from "react";
import { shallow } from "enzyme";

import { ReportComponent } from "./ReportComponent";
import HeaderComponent from "../home/HeaderComponent";

describe("ReportComponent", () => {
  let wrapper;
  let mockSaveReport;
  let mockLogout;

  beforeEach(() => {
    mockSaveReport = jest.fn();
    mockLogout = jest.fn();
    wrapper = shallow(
      <ReportComponent
        saveReport={mockSaveReport}
        logout={mockLogout}
        classes={{}}
      />
    );
  });

  it("renders a header component and passes the logout method to it", () => {
    wrapper.find(<HeaderComponent logout={mockLogout} />);
  });

  it("calls save report action when clicking the save button", () => {
    const overview = "text for report progress";

    wrapper
      .find('[data-test-id="report-progress-input"]')
      .simulate("change", { target: { value: overview } });

    wrapper.find('[data-test-id="report-save-button"]').simulate("click");

    expect(mockSaveReport).toHaveBeenCalledWith({ overview });
  });
});
