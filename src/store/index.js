import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuid } from 'uuid';

Vue.use(Vuex);

const MAX_ITEMS_PER_LIST = 6;

export default new Vuex.Store({
  state: {
    items:    [],
    selected: null
  },

  getters: {
    list: (state) => (isPrimaryList) => {
      return state.items.filter((i) => i.isPrimaryList === isPrimaryList);
    },

    item: (state) => (id) => {
      return state.items.find((i) => i.id === id) || null;
    },

    isAbleToAdd: (state) => (isPrimaryList) => {
      return state.items.filter((i) => i.isPrimaryList === isPrimaryList).length < MAX_ITEMS_PER_LIST;
    },

    selected(state) {
      return state.items.find((i) => i.id === state.selected) || null;
    }
  },

  mutations: {
    insert(state, data) {
      state.items.push({
        id:             uuid(),
        isPrimaryList:  data.isPrimaryList,
        color:          data.color || '#fff'
      });
    },

    copy(state, id) {
      let item = state.items.find((i) => i.id === id);

      if (item.ref) {
        item = state.items.find((i) => i.id === item.ref);
      }

      if (!item) {
        throw new Error('Cannot copy item with given id because it is not found');
      }

      state.items.push({
        ...item,
        id: uuid()
      });
    },

    reference(state, id) {
      const item = state.items.find((i) => i.id === id);

      if (!item) {
        throw new Error('Cannot copy by reference item with given id because it is not found');
      }

      state.items.push({
        id:             uuid(),
        isPrimaryList:  item.isPrimaryList,
        ref:            item.ref || item.id
      });
    },

    remove(state, id) {
      state.items = state.items.filter((i) => i.id !== id && i.ref !== id);

      if (state.selected === id) {
        state.selected = null;
      }
    },

    move(state, id) {
      const item = state.items.find((i) => i.id === id);

      if (!item) {
        throw new Error('Cannot move item with given id because it is not found');
      }

      item.isPrimaryList = !item.isPrimaryList;
    },

    changeColor(state, payload) {
      const id = payload.id;
      const color = payload.color || '';
      const item = state.items.find((i) => i.id === id);

      if (!item || typeof item.color === 'undefined') {
        throw new Error('Cannot change color of item with given id because it is not found');
      }

      item.color = color;
    },

    select(state, id) {
      state.selected = id;
    },

    deselect(state) {
      state.selected = null;
    }
  }
});
