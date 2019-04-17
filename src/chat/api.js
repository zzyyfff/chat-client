import apiUrl from '../apiConfig'
import axios from 'axios'

export const getMessages = function (user, chatId) {
  return axios({
    url: apiUrl + '/messages',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      message: {
        chat: chatId
      }
    }
  })
}

export const getMessage = function (user, id) {
  return axios({
    url: apiUrl + '/messages/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createMessage = function (user, body, chatId) {
  return axios({
    url: `${apiUrl}/messages`,
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      message: {
        body: body,
        chat: chatId
      }
    }
  })
}

export const updateMessage = function (user, messageId, body) {
  return axios({
    url: `${apiUrl}/messages/${messageId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      message: {
        body: body
      }
    }
  })
}
