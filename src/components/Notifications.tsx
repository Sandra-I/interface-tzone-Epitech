import * as React from 'react';

export const Notifications = () => {
  chrome.runtime.sendMessage('', {
    type: 'notification',
    options: {
      message: 'Copié dans le presse papier',
      iconUrl: '/icon48.png',
      title: 'T-zone',
      type: 'basic',
    },
  });
};
