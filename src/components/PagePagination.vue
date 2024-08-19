<template>
    <ul class="pagination">
      <li class="pagination-item">
        <button
          type="button"
          :disabled="isInFirstPage"
          @click="onClickFirstPage"
        >
          First
        </button>
      </li>
  
      <li class="pagination-item">
        <button
          type="button"
          :disabled="isInFirstPage"
          @click="onClickPreviousPage"
        >
          Previous
        </button>
      </li>
  
      <!-- Visible Buttons Start -->
  
      <li
        v-for="page in pages"
        :key="page.name"
        class="pagination-item"
      >
        <button
          type="button"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name) }"
          @click="onClickPage(page.name)"
        >
          {{ page.name }}
        </button>
      </li>
  
      <!-- Visible Buttons End -->
  
      <li class="pagination-item">
        <button
          type="button"
          :disabled="isInLastPage"
          @click="onClickNextPage"
        >
          Next
        </button>
      </li>
  
      <li class="pagination-item">
        <button
          type="button"
          :disabled="isInLastPage"
          @click="onClickLastPage"
        >
          Last
        </button>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    name: "PagePagination", // useful for debugging purposes,
    props: {
      maxVisibleButtons: {
        type: Number,
        required: false,
        default: 10
      },    
      totalPages: {
        type: Number,
        required: true
      },
      perPage: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      }
    },
    emits: [ // events emitted by this component
      "pagechanged"
    ],
    computed: {
      startPage() {
        // When on the first page
        if (this.currentPage === 1) {
          return 1;
        }

        // When on the last page
        if (this.currentPage === this.totalPages) {
          return this.totalPages - this.maxVisibleButtons;
        }

        // When inbetween
        return this.currentPage - 1;
      },
      pages() {
        const range = [];

        for (
          let i = this.startPage;
          i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
          i++
        ) {
          range.push({
            name: i,
            isDisabled: i === this.currentPage
          });
        }

        return range;
      },
      isInFirstPage() {
        return this.currentPage === 1;
      },
      isInLastPage() {
        return this.currentPage === this.totalPages;
      },
    },
    methods: {
      onClickFirstPage() {
        this.$emit('pagechanged', 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onClickPreviousPage() {
        this.$emit('pagechanged', this.currentPage - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onClickPage(page) {
        this.$emit('pagechanged', page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onClickNextPage() {
        this.$emit('pagechanged', this.currentPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onClickLastPage() {
        this.$emit('pagechanged', this.totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isPageActive(page) {
        return this.currentPage === page;
      }
    }
  };
  </script>

<style>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4AAE9B;
  color: #ffffff;
}
</style>