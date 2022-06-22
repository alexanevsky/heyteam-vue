import Vue from 'vue';
import Vuex from 'vuex';
import { v4 as uuid } from 'uuid';

Vue.use(Vuex);

const MAX_ITEMS_PER_LIST = 6;

export default new Vuex.Store({
  state: {
    items: []
  },

  getters: {
    all(state) {
      return state.items;
    },

    list: (state) => (list) => {
      return state.items.filter((i) => i.list === list);
    },

    item: (state) => (id) => {
      return state.items.find((i) => i.id === id) || null;
    },

    isAbleToAdd: (state) => (list) => {
      return state.items.filter((i) => i.list === list).length < MAX_ITEMS_PER_LIST;
    },

    isAbleToMoveFrom: (state) => (list) => {
      return state.items.filter((i) => i.list === (list === 1 ? 2 : 1)).length < MAX_ITEMS_PER_LIST;
    }
  },

  mutations: {
    insert(state, data) {
      if (![1, 2].includes(data.list)) {
        throw new Error('Cannot insert new item because list number is incorrect');
      }

      state.items.push({
        id:     uuid(),
        list:   data.list,
        color:  data.color || '#fff',
        ref:    null
      });
    },

    copy(state, id) {
      const item = state.items.find((i) => i.id === id);

      if (!item) {
        throw new Error('Cannot copy item with given id because it is not found');
      }

      state.items.push({
        ...item,
        id:   uuid(),
        ref:  null
      });
    },

    reference(state, id) {
      const item = state.items.find((i) => i.id === id);

      if (!item) {
        throw new Error('Cannot copy by reference item with given id because it is not found');
      }

      state.items.push({
        ...item,
        id:   uuid(),
        ref:  item.ref || item.id
      });
    },

    remove(state, id) {
      state.items = state.items.filter((i) => i.id !== id && i.ref !== id);
    },

    move(state, id) {
      const item = state.items.find((i) => i.id === id);

      if (!item) {
        throw new Error('Cannot move item with given id because it is not found');
      }

      item.list = item.list === 1 ? 2 : 1;
    },

    changeColor(state, payload) {
      const id = payload.id;
      const color = payload.color || '';
      const item = state.items.find((i) => i.id === id);

      if (!item) {
        throw new Error('Cannot change color of item with given id because it is not found');
      }

      item.color = color;

      state.items.filter((i) => i.ref === id).forEach((i) => {
        i.color = color;
      });

      if (item.ref) {
        state.items.filter((i) => i.id === item.ref || i.ref === item.ref).forEach((i) => {
          i.color = color;
        });
      }
    }
  }
});
