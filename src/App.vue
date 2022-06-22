<template>
  <div id="app" class="py-5">
    <div class="container">
      <ListButtons class="mb-3" />
      <div class="row">
        <div class="col-md-5 offset-md-1">
          <List :is-primary-list="true" />
        </div>
        <div class="col-md-5 mt-4 mt-md-0">
          <List :is-primary-list="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/List.vue';
import ListButtons from '@/components/ListButtons.vue';

const DEMO_DATA = [
  {
    isPrimaryList:  true,
    color:          '#198754'
  },
  {
    isPrimaryList:  false,
    color:          '#ffc107'
  }
];

export default {
  components: {
    List,
    ListButtons
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
