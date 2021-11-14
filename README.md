# OpenAuthenticator
A simple open-source, cross-platform, TOTP-based Authenticator for desktop that even your grandma could use :)

- [Features](#features)
- [Install and test](#install)
- [Packaging for production](#package)
- [Demo Video](https://drive.google.com/file/d/1Ngh5IQ8PMsGNVn14lzE2ks3s8VZbOnJO/view)
- [Our Team](#team)

## Adding an account
![adding an account](https://media.giphy.com/media/nvZd2DK3WOdIASduC7/giphy.gif)
## Generating a key
![generating a key](https://media.giphy.com/media/llkly8SemUloQRgSj7/giphy.gif)


## <a name="features">Features</a>
- [x] Addition and deletion of authenticator tokens
- [x] Copy to clipboard for ease of use
- [x] Fetching favicons for each service
- [x] Automatically refreshes keys  

## <a name="install">Install and test</a>
First, clone the repo via git and install dependencies:

```bash
git clone https://github.com/arshxyz/OpenAuthenticator/
cd OpenAuthenticator
npm install
npm start
```
## <a name="package"> Packaging for Production </a>

To package OpenAuthenticator for your local platform:

```bash
npm run package
```
## [Demo Video](https://drive.google.com/file/d/1Ngh5IQ8PMsGNVn14lzE2ks3s8VZbOnJO/view)

## <a name="team">Our Team</a>
- Aaryak Garg
- Arsh Kohli
- Paarth Chhabra
- Pranit Chadda

## Attributions
- [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) for setting up the environment
- [otplib](https://github.com/yeojz/otplib) for cryptographically generating authentication tokens
