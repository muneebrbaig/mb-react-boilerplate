import { api } from "@mb";

const mediaService = {
  submitMedia: async (entityId, formData) => api.postToFileUpload(formData),
};

export default mediaService;
