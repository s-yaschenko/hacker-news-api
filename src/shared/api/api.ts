import { makeRequest } from "./makeRequest"

export const getNewStoriesIds = async (limit = 100) => {
  try {
    const response = await makeRequest<number[]>({ url: '/newstories.json' });

    if (response.data.length <= limit) {
      return response.data;
    };

    return response.data.slice(0, limit);
  } catch (error) {
    console.warn((error as Error).message);
    throw error;
  }
}

export const getItemById = async (id: number) => {
  try {
    const response = await makeRequest({ url: `/item/${id}.json` });
    return response.data;
  } catch (error) {
    console.warn((error as Error).message);
    throw error;
  }
}

export const getItemsByIds = async (ids: number[]) => {
  try {
    const itemsPromise = ids.map((id) => getItemById(id));
    return Promise.all(itemsPromise);
  } catch (error) {
    console.warn((error as Error).message);
    throw error;
  }
}
