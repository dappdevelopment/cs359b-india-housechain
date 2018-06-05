export const connectUport = (data) => {
  return {
    type: 'CONNECT_UPORT',
    data
  }
}

export const getUserAccount = (text) => {
  return {
    type: 'USER_ACCOUNT',
    text
  }
}

export const isLoggedIn = (data) => {
  return {
    type: 'LOGGED_IN',
    data
  }
}

export const addCurrentAddress = (text) => {
  return {
    type: 'CURRENT_ADDRESS',
    text
  }
}
