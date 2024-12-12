import axios from 'axios'

const errorStatus = [ 500]
const notHas404Label = ['data', 'page', 'org', 'folder']

export function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const { types, callAPI, required = [], payload = {} } = action

    if (!types) {
      return next(action)
    }

    if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    if (required.some(v => !v)) {
      return
    }

    const [requestType, successType, failureType] = types

    dispatch(
      Object.assign({}, payload, {
        type: requestType,
      })
    )

    return callAPI()
      .then(response => {
        return dispatch(
          Object.assign({}, payload, {
            data: response ? response.data : null,
            type: successType,
            status: response.status,
          })
        )
      })
      .catch(error => {
          console.log(error)
        if (axios.isCancel(error)) {
          return
        }
        const err = error.response?.data;
        return dispatch(
          Object.assign({}, payload, {
            error: String(err?.message),
            type: failureType,
            status: error.status,
          })
        )
        // Notification.=
      })
  }
}
