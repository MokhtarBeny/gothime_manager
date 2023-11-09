import axios from "axios";
import { Vite_API_URL } from "../url";

export function formatClock(data) {
  const formData = {
    clock: {},
  };
  formData.clock.id = data.id || null;
  formData.clock.time = data.time;
  formData.clock.status = data.status;
  formData.clock.user_id = data.user_id;

  return formData;
}
export async function createClock(data, callbacks = [], error_callbacks = []) {
  try {
    const response = await axios.post(Vite_API_URL + "clocks", data);
    callbacks.forEach((callback) => callback(response));
  } catch (error) {
    error_callbacks.forEach((callback) => callback(error));
  }
}

export async function updateClock(data, callbacks = [], error_callbacks = []) {
  try {
    const response = await axios.put(
      Vite_API_URL + `clocks/${data.clock.id}`,
      data
    );
    callbacks.forEach((callback) => callback(response));
  } catch (error) {
    error_callbacks.forEach((callback) => callback(error));
  }
}

export async function deleteClock(data, callbacks = [], error_callbacks = []) {
  try {
    const response = await axios.delete(
      Vite_API_URL + `clocks/${data.clock.id}`,
      data
    );
    callbacks.forEach((callback) => callback(response));
  } catch (error) {
    error_callbacks.forEach((callback) => callback(error));
  }
}
