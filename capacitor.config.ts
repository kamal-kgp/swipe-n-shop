import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.swipeandshop.app',
  appName: 'swipe and shop',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
