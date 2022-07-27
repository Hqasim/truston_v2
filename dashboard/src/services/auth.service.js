import { API_PATH } from '../constants';
import { get } from './http.service'

const INFO_URL = API_PATH + '/info';

const UNIQUE_CALLERS_URL = INFO_URL + '/callers';
const TOKEN_COUNT_URL = INFO_URL + '/volume';

const user_info = async(params) => get(INFO_URL, params)
const unique_callers = async(params) => get(UNIQUE_CALLERS_URL, params)
const token_count = async(params) => get(TOKEN_COUNT_URL, params)

export {
  user_info,
  unique_callers,
  token_count
}
