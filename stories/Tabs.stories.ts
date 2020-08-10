import Tabs from "./TabsComponent.svelte";

export default {
  title: "Tabs",
  component: Tabs,
};

export const withTabs = () => ({
  Component: Tabs,
  props: {
    items: [
      { title: "First", content: "First Tab", id: "one" },
      { title: "Second", content: "Second Tab", id: "two" },
      { title: "Third", content: "Third Tab", id: "three" },
      { title: "Fourth", content: "Fourth Tab", id: "four" },
      { title: "Fifth", content: "Fifth Tab", id: "five" },
      { title: "Sixth", content: "Sixth Tab", id: "six" },
      { title: "Seventh", content: "Seventh Tab", id: "seven" },
      { title: "Eight", content: "Eight Tab", id: "eight" },
      { title: "Ninth", content: "Ninth Tab", id: "nine" },
    ]
  },
});
