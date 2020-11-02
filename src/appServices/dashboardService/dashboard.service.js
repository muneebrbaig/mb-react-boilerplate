import { api } from "@mb";

const dashboardService = {
  getBasicProfile: async () => api.get(`api/profile/basic`),

  getNotifications: async (filter) =>
    api.post(`api/notification/fetch`, filter),
};

export default dashboardService;
