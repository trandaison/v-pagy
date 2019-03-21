export default {
  template: `<nav :class="[navClass]">
    <ul class="pagination" :class="[ulClass]">
      <li v-if="showFirst" :class="[liClass, { 'disabled' : internalCurrentPage <= 1 }]" class="page-item first">
        <a class="page-link" href="#" v-if="internalCurrentPage <= 1">
          <span aria-hidden="true">
            <slot name="first-el">{{ config.firstText }}</slot>
          </span>
        </a>
        <a class="page-link" href="#" v-if="internalCurrentPage > 1" :aria-label="config.ariaFirst" @click.prevent="changePage(1)">
          <span aria-hidden="true">
            <slot name="first-el">{{ config.firstText }}</slot>
          </span>
        </a>
      </li>
      <li v-if="showPrevious" :class="[liClass, { 'disabled' : internalCurrentPage <= 1 }]" class="page-item prev">
        <a class="page-link" href="#" v-if="internalCurrentPage <= 1">
          <span aria-hidden="true">
            <slot name="prev-el">{{ config.previousText }}</slot>
          </span>
        </a>
        <a class="page-link" href="#" v-if="internalCurrentPage > 1" :aria-label="config.ariaPrevious" @click.prevent="changePage(internalCurrentPage - 1)">
          <span aria-hidden="true">
            <slot name="prev-el">{{ config.previousText }}</slot>
          </span>
        </a>
      </li>
      <li v-for="num in array" :class="[liClass, { 'active': num === internalCurrentPage }]" class="page-item">
        <a class="page-link" href="#" @click.prevent="changePage(num)">{{ num }}</a>
      </li>
      <li v-if="showNext" :class="[liClass, { 'disabled' : internalCurrentPage === lastPage || lastPage === 0 }]" class="page-item next">
        <a class="page-link" href="#" v-if="internalCurrentPage === lastPage || lastPage === 0">
          <span aria-hidden="true">
            <slot name="next-el">{{ config.nextText }}</slot>
          </span>
        </a>
        <a class="page-link" href="#" v-if="internalCurrentPage < lastPage" :aria-label="config.ariaNext" @click.prevent="changePage(internalCurrentPage + 1)">
          <span aria-hidden="true">
            <slot name="next-el">{{ config.nextText }}</slot>
          </span>
        </a>
      </li>
      <li v-if="showLast" :class="[liClass, { 'disabled' : internalCurrentPage === lastPage || lastPage === 0 }]" class="page-item last">
        <a class="page-link" href="#" v-if="internalCurrentPage === lastPage || lastPage === 0">
          <span aria-hidden="true">
            <slot name="last-el">{{ config.lastText }}</slot>
          </span>
        </a>
        <a class="page-link" href="#" v-if="internalCurrentPage < lastPage" :aria-label="config.ariaLast" @click.prevent="changePage(lastPage)">
          <span aria-hidden="true">
            <slot name="last-el">{{ config.lastText }}</slot>
          </span>
        </a>
      </li>
    </ul>
  </nav>`,

  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    callback: {
      type: Function,
    },
    options: {
      type: Object,
    },
    navClass: {
      type: String,
      default: '',
    },
    ulClass: {
      type: String,
      default: '',
    },
    liClass: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      internalCurrentPage: 1,
    };
  },

  watch: {
    currentPage: {
      immediate: true,
      handler(val) {
        this.internalCurrentPage = val;
      },
    },
  },

  computed: {
    _total() {
      return this.total;
    },
    _pageSize() {
      return this.pageSize;
    },
    lastPage() {
      const _total = this._total / this._pageSize;
      if (_total < 1) return 1;

      if (_total % 1 !== 0) return parseInt(_total + 1, 10);

      return _total;
    },
    array() {
      let _from = this.internalCurrentPage - this.config.offset;
      if (_from < 1) _from = 1;

      let _to = _from + (this.config.offset * 2);
      if (_to >= this.lastPage) _to = this.lastPage;

      const _arr = [];
      while (_from <= _to) {
        _arr.push(_from);
        _from += 1;
      }

      return _arr;
    },
    config() {
      return Object.assign({
        offset: 2,
        ariaNext: 'Next',
        ariaPrevious: 'Previous',
        ariaLast: 'Last',
        ariaFirst: 'First',
        previousText: '‹',
        nextText: '›',
        firstText: '«',
        lastText: '»',
        alwaysShowPrevNext: true,
        alwaysShowFirstLast: true,
        first: true,
        last: true,
        prev: true,
        next: true,
      }, this.options);
    },
    showPrevious() {
      return this.config.prev &&
        (this.config.alwaysShowPrevNext || this.internalCurrentPage > 1);
    },
    showNext() {
      return this.config.next &&
        (this.config.alwaysShowPrevNext || this.internalCurrentPage < this.lastPage);
    },
    showFirst() {
      return this.config.first &&
        (this.config.alwaysShowFirstLast || this.internalCurrentPage > 1);
    },
    showLast() {
      return this.config.last &&
        (this.config.alwaysShowFirstLast || this.internalCurrentPage < this.lastPage);
    },
  },

  methods: {
    changePage(page) {
      if (this.internalCurrentPage === page) return;
      this.internalCurrentPage = page;
      this.callback(page);
      this.$emit('change-page', page);
    },
  },
};
