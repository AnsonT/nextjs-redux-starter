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
    const language = 'javascript'
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: 'test' })
    })
    return store.dispatch(repoActions.getTopRepos(language)).then(() => {
      const expectedActions = [
        { type: repoActions.GET_TOP_REPOS },
        { type: repoActions.GET_TOP_REPOS_SUCCESS, payload: 'test' }
      ]
      expect(mockAxios.get).toBeCalledWith(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`)
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
