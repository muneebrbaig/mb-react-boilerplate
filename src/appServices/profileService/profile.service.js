import { api } from "@mb";

const profileService = {
  getMyProfile: async () => api.get(`api/profile/me`),

 
};

export default profileService;
