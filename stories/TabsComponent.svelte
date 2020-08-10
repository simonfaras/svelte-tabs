<script lang="ts" context="module">
  const allItems = [];
</script>

<script lang="ts">
  import { Tabs, Tab } from "../src/index";

  export let items: Array<{
    title: string;
    content: string;
    id: string;
  }>;

  export let test: string;

  const baseItems = items;

  const getItemById = (id: string) => items.find((item) => item.id === id);
</script>

<div class="wrapper">
  <div class="controls">
    <button
      on:click={() => {
        if (items.length > 1) {
          items = baseItems.slice(0, items.length - 1);
        }
      }}>
      Remove Item
    </button>
    <button on:click={() => (items = baseItems.slice(0, items.length + 1))}>
      Add Item
    </button>
  </div>
  <div class="tabs">
    <Tabs
      id="tabs"
      defaultTabId={items[0].id}
      let:activeTabId
      let:getTabsAttributes
      let:getContentAttributes>
      <nav class="nav" {...getTabsAttributes()}>
        {#each items as item (item.id)}
          <Tab id={item.id} let:active let:handlers let:tabAttributes>
            <button
              class="nav-item"
              class:active
              use:handlers
              {...tabAttributes}>
              {item.title}
            </button>
          </Tab>
        {/each}
      </nav>
      <div class="content" {...getContentAttributes(activeTabId)}>
        {getItemById(activeTabId).content}
      </div>
    </Tabs>
  </div>
</div>

<style>
  :global(body) {
    padding: 0;
  }

  *:focus {
    outline: 2px dashed red;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .tabs {
    display: block;
    width: 640px;
  }

  .nav {
    padding: 0;
    margin: 0;
    display: flex;
    border-bottom: 1px solid;
  }

  .nav-item {
    border: none;
    background-color: inherit;
    border-radius: 0;
    margin: 0;
    padding: 0.5em 0.5em;
    cursor: pointer;
  }

  .nav-item:active {
    background-color: inherit;
  }

  .nav-item.active {
    background-color: #bab5ab;
    color: white;
  }

  .content {
    padding: 1.5em 1em;
  }
</style>
