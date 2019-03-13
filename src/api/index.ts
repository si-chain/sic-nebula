/*
 * @Author: jhd
 * @Date: 2019-01-14 17:05:59
 * @Description: api file
 */

import * as api from './api'
import * as wechatBase from './wechatBase'
import * as article from './article'
import * as hr from './hr'

export default {
  ...api,
  ...wechatBase,
  ...article,
  ...hr
}

