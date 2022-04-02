import { waitFor } from '@testing-library/react';
import PopupMock from '../tests/popup-mock';
import Popup from './popup';

describe('Popup test', () => {
  let popup: Popup;

  describe('Test popup with options', () => {
    beforeEach(() => { popup = PopupMock(); });

    afterEach(() => { document.body.innerHTML = ''; });

    it('should render popup', async () => {
      popup.show();
      /** @ts-ignore */
      await waitFor(() => { expect(document.getElementById(popup.id)).toBeTruthy(); });
    });

    it('should not render the popup', async () => {
      popup.show();
      popup.hide = jest.fn();
      /** @ts-ignore */
      popup.options!.timeout = 1;
      popup.show();
      await new Promise((res) => setTimeout(res, 1000));
      expect(popup.hide).toHaveBeenCalled();
    });

    it('should hide the popup', async () => {
      popup.show();
      /** @ts-ignore */
      popup.options!.fadeTime = 1;
      popup.hide();
      /** @ts-ignore */
      await waitFor(() => { expect(document.getElementById(popup.id)).toBeFalsy(); });
    });
  });
});
