<script lang="ts">
  import { writable } from "svelte/store";
  import { setContext } from "svelte";
  import { tabsContextKey } from "./context";

  export let id: string = "default-tab-id"; // Should be uuid
  // TODO $activeTabId will be null for the first update so we need to provide a default tab
  //			Figure out a way to make sure $activeTabId always has a value by default instead
  export let defaultTabId: string;

  interface ITab {
    id: string;
    node: HTMLElement;
  }

  let getTabId = (tabId: string): string => `${id}-tab-${tabId}`;
  let getPanelId = (tabId: string): string => `${id}-panel-${tabId}`;

  const activeTabId = writable<string>(null);

  let tabs: Array<ITab> = [];

  setContext(tabsContextKey, {
    getTabId,
    getPanelId,
    changeTabFocus: (fromId: string, direction: 1 | -1) => {
      let target: ITab;
      const fromIndex = tabs.findIndex((tab) => tab.id === fromId);
      const tabCount = Object.values(tabs).length;
      if (fromIndex === 0 && direction === -1) {
        // first -> last
        target = tabs[tabCount - 1];
      } else if (fromIndex === tabCount - 1 && direction === 1) {
        // last -> first
        target = tabs[0];
      } else {
        target = tabs[fromIndex + direction];
      }

      target.node.focus();
    },
    register: (id: string, node: HTMLElement) => {
      const exists = !!tabs.find((tab) => tab.id === id);
      if (!exists) {
        tabs = [...tabs, { id, node }];
      }
    },
    unregister: (id: string) => {
      const index = tabs.findIndex((tab) => tab.id === id);
      tabs = [...tabs.slice(0, index), ...tabs.slice(index + 1)];
    },
    activeTabId,
  });

  const getTabsAttributes = () => ({
    role: "tablist",
  });

  const getContentAttributes = (tabId: string) => ({
    id: getPanelId(tabId),
    role: "tabpanel",
    tabindex: 0,
    "area-labeled-by": getTabId(tabId),
  });

  // Make sure activeTabId is assigned to a tab that currently exists
  $: if (!$activeTabId || !tabs.some((tab) => tab.id === $activeTabId)) {
    $activeTabId = tabs.length ? tabs[0].id : defaultTabId;
    
  }
</script>

<slot activeTabId={$activeTabId} {getTabsAttributes} {getContentAttributes} />
