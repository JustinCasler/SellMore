import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    req.headers.authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

// Define the type for a post
export interface Popup {
  message?: string;
  color?: string;
  corner?: string;
  user: string;
  website: string;
  published: boolean;
  id?: string
}
export interface Site {
  url: string;
  user: string;
  name: string;
  id?: string;
}

export const fetchPopups = (websiteId: string): Promise<{ data: Popup[] }> => API.get(`/popups/get-popups/${websiteId}`);
export const createPopup = (newPopup: Popup): Promise<{ data: Popup }> => API.post('/popups/create-popups', newPopup);
export const updatePopup = (id: string, updatedPopup: Popup): Promise<{ data: Popup }> => API.put(`/popups/update-popup/${id}`, updatedPopup);

export const fetchSites = (userId: string): Promise<{ data: Site[] }> => API.get(`/sites/get-sites/${userId}`);
export const createSite = (newSite: Site): Promise<{ data: Site }> => API.post('/sites/create-sites', newSite);