<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="app-list bg-light rounded">
        <ListItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          :class="selected === item.id ? 'border-primary shadow-sm' : ''"
          @selected="selected = item.id"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <button
        class="btn btn-primary btn-sm"
        :class="!isAbleToAdd ? 'disabled' : ''"
        @click="insert()"
      ><i class="fas fa-plus"></i></button>
      <button
        class="btn btn-primary btn-sm ms-2"
        :class="!selected || !isAbleToMove ? 'disabled' : ''"
        @click="move()"
      >Move</button>
      <button
        class="btn btn-primary btn-sm ms-2"
        :class="!selected ? 'disabled' : ''"
        @click="remove()"
      >Delete</button>
      <button
        class="btn btn-primary btn-sm ms-2"
        :class="!selected || !isAbleToAdd ? 'disabled' : ''"
        @click="copy()"
      >Copy</button>
      <button
        class="btn btn-primary btn-sm ms-2"
        :class="!selected || !isAbleToAdd ? 'disabled' : ''"
        @click="reference()"
      >Reference</button>
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

  data: () => ({
    selected: null
  }),

  computed: {
    items() {
      return this.$store.getters.list(this.isPrimaryList);
    },

    isAbleToAdd() {
      return this.$store.getters.isAbleToAdd(this.isPrimaryList);
    },

    isAbleToMove() {
      return this.$store.getters.isAbleToMoveFrom(this.isPrimaryList);
    }
  },

  watch: {
    items() {
      if (this.selected && !this.items.map((i) => i.id).includes(this.selected)) {
        this.selected = null;
      }
    }
  },

  methods: {
    insert() {
      this.$store.commit('insert', { isPrimaryList: this.isPrimaryList });
    },

    remove() {
      this.$store.commit('remove', this.selected);
    },

    copy() {
      this.$store.commit('copy', this.selected);
    },

    reference() {
      this.$store.commit('reference', this.selected);
    },

    move() {
      this.$store.commit('move', this.selected);
    }
  }
}
</script>
