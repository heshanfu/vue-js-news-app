import axios from "../plugins/axios"

export const state = () => ({
  users: [],
  items: []
})

export const mutations = {
  setIds(state, ids) {
    state.ids = ids
  },

  setItems(state, items) {
    state.items = items
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const response = await axios.get("topstories.json")
    const ids = response.data
    const tenIds = ids.slice(0, 10)
    const itemsPromises = tenIds.map((id) => axios.get(`item/${id}.json`))
    const itemResponses = await Promise.all(itemsPromises)
    const items = itemResponses.map((response) => response.data)

    commit("setItems", items)
  }
}