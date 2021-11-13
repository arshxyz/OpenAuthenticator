// Fix for electron ipc
// Found after looking through issues on electron-react-boilerplate github
// https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/2955#issuecomment-907397111

declare global {
  interface Window {
    electron: any;
  }
}

export {};
