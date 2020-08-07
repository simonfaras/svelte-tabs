<script lang="ts">
  // We need to create a wrapper for the headless component in order to be able to test it
  // Since svelte components is defined as a stand alone file we can not define this in the test file
  import Tabs from "../Tabs.svelte";
  import Tab from "../Tab.svelte";

  export let items: Array<{ id: string; title: string; content: string }>;
  export let getDefaultItemId = () => items[0].id;

  const getItemById = (id: string) => items.find((item) => item.id === id);
</script>

<Tabs
  id="tabs"
  defaultTabId={getDefaultItemId()}
  let:activeTabId
  let:getTabsAttributes
  let:getContentAttributes>

  <nav {...getTabsAttributes()}>
    {#each items as item (item.id)}
      <Tab id={item.id} let:active let:handlers let:tabAttributes>
        <button use:handlers {...tabAttributes}>
          {item.title} [{active ? 'active' : 'inactive'}]
        </button>
      </Tab>
    {/each}
  </nav>
  <div {...getContentAttributes(activeTabId)}>
    {getItemById(activeTabId).content}
  </div>
</Tabs>
