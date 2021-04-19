export const state = () => ({
    campaignsCorporate: [],
    campaignsPersonal: [],
    userCampaigns: [],


})
export const mutations = {
    STORE_CAMPAIGN_CORPORATE: (state, payload) => {
        state.campaignsCorporate = payload;
    },

    ADD_NEW_CAMPAIGN_CORPORATE: (state, payload) => {
        state.campaignsCorporate.push(payload);
    },

    STORE_CAMPAIGN_PERSONAL: (state, payload) => {
        state.campaignsPersonal = payload;
    },

    STORE_USER_CAMPAIGN: (state, payload) => {
        state.userCampaigns = payload;
    },


    ADD_NEW_CAMPAIGN_PERSONAL: (state, payload) => {
        state.campaignsPersonal.push(payload);
    }

}

////////////////
//// GETTERS //
//////////////
export const getters = {
    GET_CAMPAIGNS_CORPORATE(state) {
        return state.campaignsCorporate;
    },
    GET_CAMPAIGNS_PERSONAL(state) {
        return state.campaignsPersonal;
    },
    GET_USER_CAMPAIGNS(state) {
        return state.userCampaigns;
    }


};

export const actions = {}
