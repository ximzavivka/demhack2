export const state = () => ({
    templates: [],
    images: []

})
export const mutations = {
    STORE_TEMPLATES: (state, payload) => {
        state.templates = payload;
    },
    ADD_NEW_TEMPLATE: (state, payload) => {
        state.templates.push(payload);
    },
    STORE_IMAGES: (state, payload) => {
        state.images = payload;

    },
    ADD_NEW_IMAGE: (state, payload) => {
        state.images.unshift(payload);
    },

}

////////////////
//// GETTERS //
//////////////
export const getters = {
    GET_TEMPLATES(state) {
        return state.templates;
    },
    GET_IMAGES(state) {
        return state.images;
    },
};

export const actions = {}
