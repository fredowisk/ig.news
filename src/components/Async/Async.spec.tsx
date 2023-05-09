import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Async } from ".";

describe("Async component", () => {
  it("should render correctly", async () => {
    render(<Async />);

    await waitFor(
      () => {
        return expect(screen.getByText("Button")).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );

    fireEvent.click(screen.getByText("Button"));

    await waitForElementToBeRemoved(screen.queryByText("Button"), {
      timeout: 2000,
    });
  });
});
