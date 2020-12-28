# Quasi-Bound

Quasi-Bound is a 3d card game experience that will allow someone to create their own cards based on a self-taught image recognition AI which will determine the stats based on that image.

# How To Start Up Quasi QuasiBound

1. Fork down from [Quasi Bound repository]("https://github.com/Quasi-Devs/Quasi-Bound.git")
2. Do git clone to clone down your forked repo into your local environment.
3. npm install in order to install all of the necessary dependencies for the repo.
4. Create a .env file that will contain all necessary information for the repo and install the dotenv package. (You can find all the necessary info for the .env below in the ENV section.)
5. npm run build in order to run webpack and build out the project.
6. npm run start will begin your server.

# .env Variables

1. DB_USER - serves as your username for your database.
2. DB_PASS = password for the database.
3. DB_HOST - host name for the database
4. DB_DB - actual database name
5. DISCORD_CLIENT_ID - your unique ID for Discord
6. DISCORD_CLIENT_SECRET - unique password that should not be shared with anyone.
7. DISCORD_REDIRECT - redirect route for after authentication has been complemented

# How to Find .env Variables

1. For all database related environment variables above, you can use any cloud-based SQL database that you desired and create an account. **Note: we used ElephantSQL**
2. For all Discord related environment variables above visit [HERE](https://discord.com/developers/applications), create an account for yourself, then head over to the Applications tab in the left sidebar, create a new application for the app, and all necessary environment variables will be given to you.

## Dependencies

```javascript
"dependencies": {
    "@material-ui/core": "^4.11.2",
    "@material-ui/icons": "^4.11.2",
    "@material-ui/lab": "^4.0.0-alpha.57",
    "@material-ui/styles": "^4.11.2",
    "axios": "^0.21.0",
    "clsx": "^1.1.1",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "drei": "^2.2.12",
    "electron": "^11.1.0",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "filepond": "^4.25.1",
    "filepond-plugin-image-exif-orientation": "^1.0.9",
    "filepond-plugin-image-preview": "^4.6.4",
    "formidable": "^1.2.2",
    "gsap": "^3.5.1",
    "http": "0.0.1-security",
    "husky": "^4.3.6",
    "ml5": "^1.0.0",
    "nodemon": "^2.0.6",
    "passport": "^0.4.1",
    "passport-discord": "^0.1.4",
    "pg": "^8.5.1",
    "pg-promise": "^10.8.1",
    "prop-types": "^15.7.2",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-filepond": "^7.1.0",
    "react-router-dom": "^5.2.0",
    "react-three-fiber": "^5.3.10",
    "regenerator-runtime": "^0.13.7",
    "socket.io": "^3.0.4",
    "three": "^0.123.0",
    "underscore": "^1.12.0",
    "webpack": "^5.11.0",
    "webpack-cli": "^4.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "@babel/preset-react": "^7.12.10",
    "babel-loader": "^8.2.2",
    "concurrently": "^5.3.0",
    "css-loader": "^5.0.1",
    "electron-is-dev": "^1.2.0",
    "eslint": "^7.16.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-react": "^7.21.5",
    "eslint-plugin-react-hooks": "^4.2.0",
    "file-loader": "^6.2.0",
    "gltf-webpack-loader": "^1.0.6",
    "lint-staged": "^10.5.3",
    "style-loader": "^2.0.0",
    "wait-on": "^5.2.0"
  }
```
