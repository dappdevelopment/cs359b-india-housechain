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

export const getContract = (data) => {
  return {
    type: 'CONTRACT',
    data
  }
}
