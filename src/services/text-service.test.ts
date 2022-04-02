import axios from 'axios';
import TextService from './text-service';
import * as config from '../../app.config.json';

jest.mock('axios');

describe('Text service test', () => {
  it('should call axios.post on specific route', () => {
    TextService.getTextFromImage('data:image/png;base64,123').then(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${config.backendurldev}/upload`, { img: '123' },
      );
    });
  });

  it('should call axios.post on specific route', () => {
    TextService.getTextFromImageWithTraduction('data:image/png;base64,123', 'fr').then(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${config.backendurldev}/upload-with-translation`, { img: '123', language: 'fr' },
      );
    });
  });
});
