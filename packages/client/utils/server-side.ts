/* eslint no-param-reassign: off */

import { NextPageContext } from 'next'
import { waitFor } from 'redux-wait-for-ssr'
import { get, identity, concat } from 'lodash/fp'
import { REQUEST_FAILURE } from '../redux/definitions'

interface Arguments {
  context: NextPageContext
  waitForActions: string | string[]
  statusLocation: string[]
}

export const setServerResponseStatusCode = async ({
  context,
  waitForActions,
  statusLocation,
}: Arguments) => {
  const { store } = context

  const keyPath = concat(statusLocation, ['status'])
  const keyPathStatusCode = concat(statusLocation, ['statusCode'])
  const statusKeyPath = keyPath.filter(identity)
  const statusCodeKeyPath = keyPathStatusCode.filter(identity)

  try {
    // Wait for a response on the request.
    await store.dispatch(waitFor(waitForActions))

    // Get the updated store state.
    const updatedState = store.getState()

    // Get the updated request status.
    const updatedStatus = get(statusKeyPath, updatedState)
    const updatedStatusCode = get(statusCodeKeyPath, updatedState)

    // Set HTTP status code to 404 if the request failed.
    if (updatedStatus && updatedStatus === REQUEST_FAILURE && context.res) {
      context.res.statusCode = updatedStatusCode || 404
    } else {
      context.res.statusCode = 200
    }
  } catch (e) {
    if (context.res) {
      context.res.statusCode = 500
    }
  }
}
