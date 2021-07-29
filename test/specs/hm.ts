import api from '../../src/api/likesApi';
import RatingPage from '../../src/pageObjects/RatingPage';
import allureReporter from '@wdio/allure-reporter';

function equal(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      return false;
    }
  }
  return true;
}

let receivedLikes: number[] = [];
let validLikes: number[] = [];
let receivedDislikes: number[] = [];
let validDislikes: number[] = [];

describe('Проверка сортировки топа рейтинга', async () => {
  before(async () => {
    console.log('Начало тестирования');
    console.info('⚠ Запрашиваем','Запрашиваем список топов рейтинга у API');
    validLikes = await api.getLikesRating();
    validDislikes = await api.getDisikesRating();
  });
  beforeEach(async () => {
    await RatingPage.open();
  });
  after(() => {
    console.log('Завершение тестирования, ознакомьтесь с отчетом');
  });


  it('1. Проверка сортировки топа лайков', async () => {
    console.info('Тест 1 ☑', 'Получаем элементы с данными о топе лайков со страницы рейтинга и парсим его');
    const values = await RatingPage.LikesRating;

    for (const like of values) {
      receivedLikes.push(Number(await like.getText()));
    }
    console.debug('Тест 1 ☑', `Проверяем сортировку со страницы рейтинга, по возрастанию, результат: ${equal(receivedLikes)}`);

    allureReporter.startStep('Проверяем сортировку лайков');
    allureReporter.addAttachment('Ожидаемое значение', JSON.stringify(validLikes), 'text/plain');
    allureReporter.addAttachment('Фактическое значение', JSON.stringify(receivedLikes), 'text/plain');
    // // Проверка по данным с API
    // expect(validLikes).toEqual(receivedLikes);
    // Проверка по сортировке
    expect(equal(receivedLikes));
    allureReporter.endStep();
  });

  it('2. Проверка сортировки топа дизлайков', async () => {
    console.info('Тест 2 ☑', 'Получаем элементы с данными о топе дизлайков со страницы рейтинга и парсим его');
    const values = await RatingPage.DisikesRating;

    for (const dislike of values) {
      receivedDislikes.push(Number(await dislike.getText()));
    }
    console.debug('Тест 2 ☑', `Проверяем сортировку со страницы рейтинга, по возрастанию, результат: ${equal(receivedLikes)}`);

    allureReporter.startStep('Проверяем сортировку дизлайков');
    allureReporter.addAttachment('Ожидаемое значение', JSON.stringify(validDislikes), 'text/plain');
    allureReporter.addAttachment('Фактическое значение', JSON.stringify(receivedDislikes), 'text/plain');
    // // Проверка по данным с API
    // expect(validDislikes).toEqual(receivedDislikes);
    // Проверка по сортировке
    expect(equal(receivedDislikes));
    allureReporter.endStep();
  });
});