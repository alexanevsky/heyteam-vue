<template>
  <div class="app-list-item border rounded p-2 d-flex align-items-center" :style="{backgroundColor: color}" @click="$emit('selected')">
    <input v-model="color" type="text" class="form-control form-control-sm w-100" placeholder="Color">
    <button class="app-list-item-remove btn btn-danger btn-sm" @click="remove()"><i class="fas fa-times"></i></button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  computed: {
    color: {
      get() {
        return this.item.color;
      },
      set(value) {
        this.$store.commit('changeColor', { id: this.item.id, color: value });
      }
    }
  },

  methods: {
    remove() {
      this.$store.commit('remove', this.item.id);
    }
  }
}
</script>
