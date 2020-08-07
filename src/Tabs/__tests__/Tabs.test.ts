import "@testing-library/jest-dom";
import { render, fireEvent, act } from "@testing-library/svelte";
import _userEvent from "@testing-library/user-event";
import Tabs from "./TabsTestComponent.svelte";

// TODO Figure out a if there is a good way to test accessibility

const items = [
  { id: "1", title: "title 1", content: "First Tab Content" },
  { id: "2", title: "title 2", content: "Second Tab Content" },
  { id: "3", title: "title 3", content: "Third Tab Content" },
];

// Focus is handled wierdly by "fireEvent" so we use the "userEvent" module for those
// and wrap it in an "act" to be sure we can wait for svelte to flush all pending
// state changes.
const userEvent = async (event: string, ...args) => {
  await act(() => {
    _userEvent[event](...args);
  });
};

it("should renders tabs", () => {
  const { getAllByText } = render(Tabs, {
    items,
  });

  expect(getAllByText("title", { exact: false }).length).toBe(3);
});

it("should render a tab as active by default", () => {
  const { getByText } = render(Tabs, {
    items,
    getDefaultItemId: () => "1",
  });

  expect(getByText("title 1 [active]")).toBeInTheDocument();
});

it("should render content", () => {
  const { getByText } = render(Tabs, {
    items: items,
    getDefaultItemId: () => "1",
  });

  expect(getByText("First Tab Content")).toBeInTheDocument();
});

it("should update active item when tab is clicked", async () => {
  const { getByText } = render(Tabs, {
    items,
    getDefaultItemId: () => "1",
  });

  // Check for default active tab
  expect(getByText("title 1 [active]")).toBeInTheDocument();
  expect(getByText("First Tab Content")).toBeInTheDocument();

  await fireEvent.click(getByText("title 2", { exact: false }));

  expect(getByText("title 2 [active]")).toBeInTheDocument();
  expect(getByText("Second Tab Content")).toBeInTheDocument();
});

it("should gracefully handle when the active tab is removed", async () => {
  const { getByText, component } = render(Tabs, {
    items,
    getDefaultItemId: () => "1",
  });

  // Activate third tab
  await userEvent("click", getByText("title 3", { exact: false }));
  expect(getByText("title 3 [active]")).toBeInTheDocument();

  await act(() =>
    component.$set({
      items: items.slice(0, 2),
      getDefaultItemId: () => "1",
    }),
  );

  expect(getByText("title 1 [active]")).toBeInTheDocument();
});

it("should make tabs accessable by roles", () => {
  const { getByRole } = render(Tabs, { items });

  const tabList = getByRole("tablist");

  expect(tabList).toBeInTheDocument();
  expect(tabList.querySelectorAll("[role=tab]").length).toBe(3);
});

it("should shift focus from a tab to content when the 'Tab' key is pressed", async () => {
  const { getByText } = render(Tabs, { items });

  const firstTab = getByText("title 1", { exact: false });
  await userEvent("click", firstTab);
  expect(firstTab).toHaveFocus();

  // Tab to content
  await userEvent("tab");
  expect(getByText("First Tab Content")).toHaveFocus();

  // Tab back to active tab
  await userEvent("tab", { shift: true });
  expect(firstTab).toHaveFocus();
});

it("should cycle through tabs with arrow keys", async () => {
  const { getAllByText } = render(Tabs, { items });
  const tabs = getAllByText("title", { exact: false });

  const moveLeft = async () =>
    await fireEvent.keyDown(document.activeElement, { key: "ArrowLeft" });
  const moveRight = async () =>
    await fireEvent.keyDown(document.activeElement, { key: "ArrowRight" });

  // Set focus on first tab
  await userEvent("click", tabs[0]);

  // Move to second tab
  await moveRight();
  expect(tabs[1]).toHaveFocus();

  // Move to third tab
  await moveRight();
  expect(tabs[2]).toHaveFocus();

  // Overflow back to first tab
  await moveRight();
  expect(tabs[0]).toHaveFocus();

  // Overflow to last tab
  await moveLeft();
  expect(tabs[2]).toHaveFocus();

  // Move to second tab
  await moveLeft();
  expect(tabs[1]).toHaveFocus();

  // Move to first tab
  await moveLeft();
  expect(tabs[0]).toHaveFocus();
});
