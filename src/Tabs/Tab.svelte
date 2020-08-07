<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { tabsContextKey } from "./context";

  const {
    activeTabId,
    getPanelId,
    getTabId,
    changeTabFocus,
    register,
    unregister,
  } = getContext(tabsContextKey);

  export let id: string;

  let el: HTMLElement;

  onMount(() => {
    register(id, el);

    return () => {
      unregister(id);
    };
  });

  const handleClick = () => ($activeTabId = id);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      changeTabFocus(id, -1);
    }
    if (event.key === "ArrowRight") {
      changeTabFocus(id, 1);
    }
  };

  const handlers = (node: HTMLElement) => {
    el = node;
    node.addEventListener("click", handleClick);
    node.addEventListener("keydown", handleKeyDown);

    return {
      destroy: () => {
        node.removeEventListener("click", handleClick);
        node.removeEventListener("keydown", handleKeyDown);
      },
    };
  };

  $: active = $activeTabId === id;
</script>

<slot
  {handlers}
  {active}
  tabAttributes={{ role: 'tab', id: getTabId(id), 'aria-selected': active, 'area-controls': getPanelId(id), tabindex: active ? 0 : -1 }} />
