import got from 'got';

const addLikes = async (id: number, data: { like: boolean; dislike: boolean }) => {
  const response = await got.post(`https://meowle.qa-fintech.ru/api/likes/cats/${id}/likes`, {
    json: data,
    responseType: 'json',
  });
  return response.body;
};

const getLikesRating = async () => {
  const response = await got.get('https://meowle.qa-fintech.ru/api/likes/cats/likes-rating');
  let likes: number[] = [];
  const resp = response.body.split(/({"\w+":\d+,"\D+)/gmi);
  for (let i = 2; i < resp.length; i += 2) {
    likes.push(Number(resp[i].split('}')[0]));
  }
  return likes;
};

const getDisikesRating = async () => {
  const response = await got.get('https://meowle.qa-fintech.ru/api/likes/cats/dislikes-rating');
  let dislikes: number[] = [];
  const resp = response.body.split(/({"\w+":\d+,"\D+)/gmi);
  for (let i = 2; i < resp.length; i += 2) {
    dislikes.push(Number(resp[i].split('}')[0]));
  }
  return dislikes;
};

const getRating = async () => {
  const response = await got.get('https://meowle.qa-fintech.ru/api/likes/cats/rating');
  return response.body;
};


const api = {
  addLikes,
  getDisikesRating,
  getLikesRating,
  getRating,
};
export default api;
