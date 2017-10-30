import { AffiliTestAPI, Devices } from '../src/main';

describe('API', () => {
  let api;

  beforeAll(() => {
    api = new AffiliTestAPI();
  });

  // Assert if setTimeout was called properly
  it('Should login', async () => {
    const data = await api.login({
      email: 'nestor@britez.me',
      password: '123456abc'
    });
    expect(JSON.parse(data)).toEqual({ data: 'Successfuly logged in!', error: null });
  });

  xit('Shout make an appInfo call', async () => {
    try {
      const info = await api.appInfo(
        'https://itunes.apple.com/us/app/whatsapp-messenger/id310633997?mt=8'
      );
      console.info('info', info);
    } catch (err) {
      console.error('error', err);
    }
  });

  it('Should have a test method', async () => {
    try {
      const test = await api.test(
        'https://itunes.apple.com/us/app/whatsapp-messenger/id310633997?mt=8',
        'us',
        Devices.IPHONE
      );
      console.info('test', test);
    } catch (err) {
      console.error('error test()', err);
    }
  });
});
