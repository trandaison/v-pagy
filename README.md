# v-pagy

Server-side paging component in vue, template based on bootstrap

- Vue.js (tested with 2.x)
- Bootstrap CSS (tested with 4.x)

## Installation
```sh
npm install v-pagy
```
or via yarn
```sh
yarn add v-pagy
```

## Example
```vue
<template lang="html">
  <pagination
    :total="total"
    :page-size="pageSize"
    :current-page="page"
    :options="options"
    @page-change="onPageChangedHandler"
    nav-class="padding-10"
    ul-class="bg-color-red"
    li-class="txt-color-blue"
  />
</template>

<script>
import pagination from 'v-pagy';

export default {
  components: {
    pagination,
  },
  props: {
    page: Number,
  },
  data() {
    return {
      total: 1000,
      pageSize: 20,
      options: { // Optional
        offset: 2,
        previousText: 'Prev',
        nextText: 'Next',
        alwaysShowPrevNext: true,
      },
    },
  },
  methods: {
    onPageChangedHandler(page) {
      console.log(page);
      // Exec your response to server passing 'page' params as clicked button paging
    },
  },
});
</script>
```

If you want to use HTML content for the first, last, previous and next button, there is some named slots. Here is an example:

```html
<pagination
  :total="total"
  :page-size="pageSize"
  :current-page="page"
  :options="options"
  @page-change="onPageChangedHandler"
  nav-class="padding-10"
  ul-class="bg-color-red"
  li-class="txt-color-blue"
>
  <template slot="first-el">
    <span title="go first">◄◄</span>
  </template>
  <template slot="last-el">
    <span title="go last">►►</span>
  </template>
</pagination>
```

### props
| Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `total` | Number | Yes |  | Total items from server side |
| `pageSize` | Number | Yes |  | Number of items per page |
| `callback` | Function | Yes |  | The callback to be called on page changes |
| `currentPage` | Number |  | 1 | The current page from the URL params |
| `options` | Object |  |  | Configurations |
| `navClass` | String |  | `''` | Class will be include in nav element |
| `ulClass` | String |  | `''` | Class will be include in ul element |
| `liClass` | String |  | `''` | Class will be include in all li element |

### options
| Name | Type | Default | Description |
|---|---|---|---|
| `offset` | Number | 2 | Left and right offset of pagination numbers to display |
| `ariaNext` | String | `'Next'` | Change default aria next text |
| `ariaPrevious` | String | `'Previous'` | Change default aria previous text |
| `ariaLast` | String | `'Last'` | Change default aria last text |
| `ariaFirst` | String | `'First'` | Change default aria first text |
| `previousText` | String | `'‹'` | Change default previous button text |
| `nextText` | String | `'›'` | Change default next button text |
| `firstText` | String | `'«'` | Change default first button text |
| `lastText` | String | `'»'` | Change default last button text |
| `alwaysShowPrevNext` | Boolean | `true` | Show the prev/next button even if on the first/last page |
| `alwaysShowFirstLast` | Boolean | `true` | Show first/last button even if on first/last page |
| `first` | Boolean | `true` | Set `false` to hide the first button |
| `last` | Boolean | `true` | Set `false` to hide the last button |
| `prev` | Boolean | `true` | Set `false` to hide the previous button |
| `next` | Boolean | `true` | Set `false` to hide the next button |

### slots
Useful in case you want to custom the UI of the first, last, previous and next buttons by HTML elements instead of using a text.

| Name | Description |
|---|---|
| `first-el` | Custom slot for the first link |
| `prev-el` | Custom slot for the previous link |
| `next-el` | Custom slot for the next link |
| `last-el` | Custom slot for the last link |
