import { put, get } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth'
import { setUserScore } from '../redux/gameSlice';
import { FunctionComponentElement } from 'react';

export const ENDPOINT = 'https://ewymuwm8cd.execute-api.us-east-1.amazonaws.com/dev'

export async function getUserScore(dispatch: Function) {
    try {
      const user = await getCurrentUser()
      const restOperation = get({ 
        apiName: 'apiBtc',
        path: '/score',
        options: {
            headers: {
              'Content-Type': 'application/json',
            },
            queryParams: {
                userId: user.userId
            }
        }
      });
      const response = await restOperation.response;
      const data : any = await response.body.json();
      dispatch(setUserScore(data.score))
    } catch (e) {
      console.log('GET call failed: ', e);
    }
}

export async function postUserScore(score: number) {
    try {
      const user = await getCurrentUser()
      const restOperation = put({
        apiName: 'apiBtc',
        path: '/score',
        options: {
            body: {
                userId: user.userId,
                score: score
            },
            headers: {
              'Content-Type': 'application/json',
            },
        }
      });
      await restOperation.response;
    } catch (e) {
        debugger
      console.log('POST call failed: ', e);
    }
  }