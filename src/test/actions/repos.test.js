import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockAxios from 'axios'

import * as repoActions from '../../actions/repos'

const mockStore = configureStore([thunk])
const store = mockStore()

describe('repo_actions', () => {
  beforeEach(() => {
    store.clearActions()
  })
  test('dispatches the correct action and payload', () => {
    mockAxios.get.mockImplementationOnce(() => {
      console.log('mock Axios')
      return Promise.resolve({ data: 'testa' })
    })
    return store.dispatch(repoActions.getTopRepos('javascript')).then(() => {
      console.log(store.getActions())
      const expectedActions = [
        { type: repoActions.GET_TOP_REPOS },
        { type: repoActions.GET_TOP_REPOS_SUCCESS, payload: 'testa' }
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
