<template>
  <div id="app" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-5 offset-md-1">
          <List :list="1" />
        </div>
        <div class="col-md-5 mt-4 mt-md-0">
          <List :list="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/List.vue';

const DEMO_DATA = [
  {
    list:   1,
    color:  '#198754'
  },
  {
    list:   2,
    color:  '#ffc107'
  }
];

export default {
  components: {
    List
  },

  mounted() {
    DEMO_DATA.forEach((d) => {
      this.$store.commit('insert', d)
    });
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
</style>
