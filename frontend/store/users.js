export const state = () => ({
    users: [],
    groups: []
})
export const mutations = {
    STORE_USERS: (state, payload) => {
        state.users = payload;
    },
    STORE_GROUPS: (state, payload) => {
        state.groups = payload;
    },
    DELETE_GROUP: (state, payload) => {
        if (!!payload)
            state.groups = state.groups.filter(group => group.id.toString() !== payload.toString());
    },
    ADD_NEW_USER: (state, payload) => {
        state.users.push(payload);
    },
    UPDATE_USER: (state, payload) => {
        let index = state.users.findIndex(function (user, i) {
            return user.email.toString() !== payload.email.toString();
        });
        state.users = [
            ...state.users.slice(0, index),
            payload,
            ...state.users.slice(index + 1)
        ]
    },
    ADD_NEW_GROUP: (state, payload) => {
        state.groups.push(payload);
    }

}

////////////////
//// GETTERS //
//////////////
export const getters = {
    GET_USERS(state) {
        return state.users;
    },
    GET_GROUPS(state) {
        return state.groups;
    },
    GET_USER_BY_EMAIL: (state) => (email) => {
        if (!!email) {
            let user = (state.users && state.users.length) ? state.users.find(user => {
                return user.email.toString() === email.toString()
            }) : null;
            return user;
        }
        return null
    },

};

export const actions = {
    // async ({commit}, payload) {
    //     if (payload.unmuted) {
    //         await this.$axios.delete(`/chat/mute/${payload.chatId}`);
    //     } else {
    //         await this.$axios.post(`/chat/mute/${payload.chatId}`);
    //     }
    //     commit('TOGGLE_NOTIFICATIONS', payload)
    // },


}
