export interface DataMessage<T> {
    msg: MessageType
    tabId: number
    data: T
}

export enum MessageType {
    NOTIFICATION,
    API_ERROR,
    API_SUCCESS,
    SHOW_PREVIEW,
    SHOW_PREVIEW_WITH_TRANSLATION,
    SCREENSHOT_SELECTION,
    SCREENSHOT_SELECTION_RESULT,
    OPTIONS_REQUEST,
    OPTIONS_UPDATE
}