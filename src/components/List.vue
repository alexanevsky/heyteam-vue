<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="app-list bg-light rounded">
        <ListItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          :class="selected && selected.id === item.id ? 'border-primary shadow-sm' : ''"
        />
        <button
          class="app-list-add btn btn-primary btn-sm"
          :class="!isAbleToAdd ? 'disabled' : ''"
          @click="insert()"
        ><i class="fas fa-plus"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue';

export default {
  components: {
    ListItem
  },

  props: {
    isPrimaryList: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    items() {
      return this.$store.getters.list(this.isPrimaryList);
    },

    selected() {
      return this.$store.getters.selected;
    },

    isAbleToAdd() {
      return this.$store.getters.isAbleToAdd(this.isPrimaryList);
    }
  },

  methods: {
    insert() {
      this.$store.commit('insert', { isPrimaryList: this.isPrimaryList });
    }
  }
}
</script>
