import apiUrl from '../apiConfig'
import axios from 'axios'

export const getChats = function (user) {
  return axios({
    url: apiUrl + '/chats',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const getChat = function (user, id) {
  return axios({
    url: apiUrl + '/chats/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createChat = function (withUsername, user) {
  return axios({
    url: `${apiUrl}/chats`,
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      chat: {
        with: withUsername
      }
    }
  })
}
