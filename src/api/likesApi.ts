import got from 'got';

const addLikes = async (id: number, data: {like: boolean; dislike: boolean}) => {
  const response = await got.post(`https://meowle.qa-fintech.ru/api/likes/cats/${id}/likes`, {
    json: data,
    responseType: 'json',
  });
  return response.body;
}

const getLikesRating = async () => {
  const response = await got.get('https://meowle.qa-fintech.ru/api/likes/cats/likes-rating');
  return response.body;
}

const getDisikesRating = async () => {
  const response = await got.get('https://meowle.qa-fintech.ru/api/likes/cats/dislikes-rating');
  return response.body;
}

const getRating = async () => {
  const response = await got.get('https://meowle.qa-fintech.ru/api/likes/cats/rating');
  return response.body;
}



const api = {
  addLikes,
  getDisikesRating,
  getLikesRating,
  getRating
};
export default api;
