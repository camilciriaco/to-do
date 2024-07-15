import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ionic.demo',
  appName: 'To Do Task',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
