
//Токен: dd2287e8-e249-46eb-befd-737a64b52f05
//Идентификатор группы: wff-cohort-5

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-5',
    headers: {
      authorization: 'dd2287e8-e249-46eb-befd-737a64b52f05',
      'Content-Type': 'application/json'
    }
  }
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

