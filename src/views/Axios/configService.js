import axios from 'axios';
import { API_URL } from '../Constant/Static';

let config = null;

export async function loadApiConfig() {
    if (!config) {
        try {
            // Unauthenticated request
            const response = await axios.get(`${API_URL}/common/config`);

            const data = response.data;

            if (data.success === 1) {
                config = data.data;
            } else {
                throw new Error(data.message || 'Failed to load config');
            }
        } catch (error) {
            console.error("Error loading API config:", error);
            throw error;
        }
    }
    return config;
}