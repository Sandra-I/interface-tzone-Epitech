import { Selection } from '../models/Selection';
import { describe, expected } from '../custom-test';
import ImageCropper from '../components/ImageCropper';

describe('imageCropper', async () => {
  const imgUrl = 'data:image/png;base64,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';
  const croppedImgUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAAAXNSR0IArs4c6QAAAfVJREFUOE+V0k9I02EYwPHvm8v5JyKXkdEyiTTqYNCPYMUOIUkd+iNjEER16NJhv0ryVziNSYtpjllRT+TJ04KwSUQFBiLhDhoNyiIqW95io0JDMMkN3xh1+XmI9l4fPs/zvM/zqMfDQ/pcPEM+DusF9vKZycwvjA07cGNS+lV4MgiHzAywFiilKhBAIX6NmaCYt+WuLsCDGnO4GAc8ReEQTd60QavBIjY1Tac04eIbTtbxYrGLjKOZ7JTm7Yr7qLaVovtydphKpTCMGmAeaID4ATj+DKJAOyQBFRbRIdMOkw978bZc+tPFaBJ30xj9Ukvk7EnGNby/fhglftFmwg5P1VnMta5is6OCN7kyJj7lOf2llIFmiHg8XDAMlOwWbb60w39N6sxlof9qACVh0Wbo/6GIECjs8aYV1K2xHlsRX4VFeTTHvel6xAkjlbfZP7oPfD/xeM5j1BqotuqQ7vsetsHui9AR1XQfheCjD8B2GMjA60m4NcZgLIKyRHRs2VT94ykeeAxQgAYW5llTXsk70mxkKxRCnSI6sgxaLotNjXUsbZthsWSJO+lq3Eeg8e9me5/7UNLepc1rV4o6ucKBKJe/R88kgkXBEx0jhV+ktHgn4BWwB7ItMJSdZWdNFd5CujkTVpeQ/ljGwuwxfjh3caPex28y0reZV3t/wAAAAABJRU5ErkJggg==';
  const cropSelection: Selection = {
    x: 18, y: 17, w: 14, h: 16,
  };
  const croppedImgResult = await ImageCropper.cropImage(imgUrl, cropSelection);
  expected(croppedImgResult).toBe(croppedImgUrl);
});
