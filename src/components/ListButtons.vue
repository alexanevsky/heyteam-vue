<template>
  <div class="d-flex justify-content-center">
    <button
      class="btn btn-primary btn-sm ms-2"
      :class="!isAbleToMove ? 'disabled' : ''"
      @click="move(selected.id)"
    >Move</button>
    <button
      class="btn btn-primary btn-sm ms-2"
      :class="!isAbleToRemove ? 'disabled' : ''"
      @click="remove(selected.id)"
    >Delete</button>
    <button
      class="btn btn-primary btn-sm ms-2"
      :class="!isAbleToCopy ? 'disabled' : ''"
      @click="copy(selected.id)"
    >Copy</button>
    <button
      class="btn btn-primary btn-sm ms-2"
      :class="!isAbleToReference ? 'disabled' : ''"
      @click="reference(selected.id)"
    >Reference</button>
  </div>
</template>

<script>
export default {
  computed: {
    selected() {
      return this.$store.getters.selected;
    },

    isAbleToMove() {
      return !!this.selected && this.$store.getters.isAbleToAdd(!this.selected.isPrimaryList);
    },

    isAbleToCopy() {
      return !!this.selected && this.$store.getters.isAbleToAdd(this.selected.isPrimaryList);
    },

    isAbleToReference() {
      return this.isAbleToCopy;
    },

    isAbleToRemove() {
      return !!this.selected;
    }
  },

  methods: {
    move(id) {
      this.$store.commit('move', id);
    },

    remove(id) {
      this.$store.commit('remove', id);
    },

    copy(id) {
      this.$store.commit('copy', id);
    },

    reference(id) {
      this.$store.commit('reference', id);
    },
  }
}
</script>
