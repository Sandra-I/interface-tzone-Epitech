/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export interface DataMessage<T> {
  msg: MessageType
  tabId: number
  data: T
}

export enum MessageType {
  NOTIFICATION = 'NOTIFICATION',
  API_ERROR = 'API_ERROR',
  API_SUCCESS = 'API_SUCCESS',
  SHOW_PREVIEW = 'SHOW_PREVIEW',
  SHOW_PREVIEW_WITH_TRANSLATION = 'SHOW_PREVIEW_WITH_TRANSLATION',
  SCREENSHOT_SELECTION = 'SCREENSHOT_SELECTION',
  SCREENSHOT_SELECTION_RESULT = 'SCREENSHOT_SELECTION_RESULT',
  OPTIONS_REQUEST = 'OPTIONS_REQUEST',
  OPTIONS_UPDATE = 'OPTIONS_UPDATE'
}
