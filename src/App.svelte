<script lang="ts" context="module">
  const allItems = [
    { title: "First", content: "First Tab", id: "one" },
    { title: "Second", content: "Second Tab", id: "two" },
    { title: "Third", content: "Third Tab", id: "three" },
    { title: "Fourth", content: "Fourth Tab", id: "four" },
    { title: "Fifth", content: "Fifth Tab", id: "five" },
    { title: "Sixth", content: "Sixth Tab", id: "six" },
    { title: "Seventh", content: "Seventh Tab", id: "seven" },
    { title: "Eight", content: "Eight Tab", id: "eight" },
    { title: "Ninth", content: "Ninth Tab", id: "nine" },
  ];
</script>

<script lang="ts">
  import Tabs from "./Tabs/Tabs.svelte";
  import Tab from "./Tabs/Tab.svelte";

  let items: Array<{
    title: string;
    content: string;
    id: string;
  }> = allItems.slice(0, 3);

  const getItemById = (id: string) => items.find((item) => item.id === id);
</script>

<div class="wrapper">
  <div class="controls">
    <button
      on:click={() => {
        if (items.length > 1) {
          items = allItems.slice(0, items.length - 1);
        }
      }}>
      Remove Item
    </button>
    <button on:click={() => (items = allItems.slice(0, items.length + 1))}>
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
          <Tab id={item.id} let:active let:handlers let:tab>
            <button class="nav-item" class:active use:handlers {...tab}>
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
