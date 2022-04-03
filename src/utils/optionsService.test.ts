import { waitFor } from '@testing-library/react';
import { MessageType } from '../models/DataMessage';
import OptionsService from './optionsService';

describe('Options Service test', () => {
  it('should add listener', () => {
    chrome.runtime.onMessage.addListener = jest.fn();
    OptionsService.init();
    expect(chrome.runtime.onMessage.addListener).toHaveBeenCalledWith(OptionsService.messageListener);
  });

  it('should call callback function', () => {
    const callback = jest.fn();
    /** @ts-ignore */
    OptionsService.messageListener({ msg: MessageType.OPTIONS_REQUEST }, null, callback);
    expect(callback).toHaveBeenCalled();
  });

  it('should add option in storage', () => {
    localStorage.setItem = jest.fn();
    const data = { data: 'test' };
    /** @ts-ignore */
    OptionsService.messageListener({ msg: MessageType.OPTIONS_UPDATE, data }, null, null);
    expect(localStorage.setItem).toHaveBeenCalledWith('options', JSON.stringify(data));
  });

  it('should return option directly', () => {
    const optionObject = { option: 'test' };
    /** @ts-ignore */
    OptionsService.isBackground = true;
    /** @ts-ignore */
    OptionsService.options = optionObject;
    OptionsService.getOptions().then((result) => expect(result).toBe(optionObject));
  });

  it('should return option via chrome.runtime.sendMessage', async () => {
    /** @ts-ignore */
    OptionsService.isBackground = false;
    chrome.runtime.sendMessage = jest.fn();
    OptionsService.getOptions();
    await waitFor(() => expect(chrome.runtime.sendMessage).toHaveBeenCalled());
  });

  it('should update option in storage', () => {
    const optionObject = { option: 'test' };
    /** @ts-ignore */
    OptionsService.isBackground = true;
    localStorage.setItem = jest.fn();
    /** @ts-ignore */
    OptionsService.updateOptions(optionObject);
    expect(localStorage.setItem).toHaveBeenCalledWith('options', JSON.stringify(optionObject));
  });

  it('should emit message to chrome', () => {
    const optionObject = { option: 'test' };
    /** @ts-ignore */
    OptionsService.isBackground = false;
    chrome.runtime.sendMessage = jest.fn();
    /** @ts-ignore */
    OptionsService.updateOptions(optionObject);
    const emitObject = { msg: MessageType.OPTIONS_UPDATE, data: optionObject, tabId: null };
    expect(chrome.runtime.sendMessage).toHaveBeenCalledWith(emitObject);
  });
});
