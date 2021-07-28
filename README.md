<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!--
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->

<p align="center">
  <a href="https://github.com/Don-Cryptus/echat">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">eChat</h3>

  <p align="center">
    Find some fun people to play with and have a good time.
    <br />
    <a href="#about-the-project"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://aktoryes.de/">View Demo</a>
    ·
    <a href="https://github.com/Don-Cryptus/echat/issues">Report Bug</a>
    ·
    <a href="https://github.com/Don-Cryptus/echat/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started-development">Getting Started Development</a>
      <ul>
        <li><a href="#prerequisites-development">Prerequisites Development</a></li>
        <li><a href="#installation-development">Installation Development</a></li>
      </ul>
    </li>
        <li>
      <a href="#getting-started-production">Getting Started Production</a>
      <ul>
        <li><a href="#prerequisites-production">Prerequisites Production</a></li>
        <li><a href="#installation-production">Installation Production</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

# About The Project

This Project will be something between epal.gg or battlebuddy.gg

## Built With

- Server

  - [postgres](https://www.npmjs.com/package/pg)
  - [graphql](https://www.npmjs.com/package/graphql)
  - [typescript](https://www.npmjs.com/package/typescript)
  - [express](https://www.npmjs.com/package/express)
  - [apollo-server-express](https://www.npmjs.com/package/apollo-server-express)
  - [type-graphql](https://www.npmjs.com/package/type-graphql)
  - [typeorm](https://www.npmjs.com/package/typeorm)
  - [nodemailer](https://www.npmjs.com/package/nodemailer)
  - [cloudinary](https://www.npmjs.com/package/cloudinary)

- Web
  - [typescript](https://www.npmjs.com/package/typescript)
  - [react](https://www.npmjs.com/package/react)
  - [tailwindcss](https://www.npmjs.com/package/tailwindcss)
  - [graphql](https://www.npmjs.com/package/graphql)
  - [@apollo/client](https://www.npmjs.com/package/@apollo/client)
  - [next](https://www.npmjs.com/package/next)

<!-- GETTING STARTED DEVELOPMENT  -->

# Getting Started Development

This is an example of setting up your project locally.
To get a local copy up and running follow these simple example steps.

## Prerequisites Development

This project requires NodeJS (version 14 or later), Postgres and Yarn. Node and Postgres are really easy to install. To make sure you have them available on your machine, try running the following command.

- node

  ```sh
  node -v
  v16.5.0
  ```

- postgres

  ```sh
  psql -help
  ```

  (!important) To install yarn type **npm i yarn -g**

- yarn
  ```sh
  npm i yarn -g
  ```

(Optional) You will need to have a SMPT Email and a Cloudinary account to use the API for Emails & Images

## Installation Development

- Clone the repo

  ```sh
  git clone https://github.com/Don-Cryptus/echat/
  cd echat/
  code .
  ```

  ```diff
  + Run 2 Terminals at the same time, one for Server & one for Web
  ```

### Server Development

1. create `./server/.env` environment file

   ```diff
   - Be sure too create `.env` file as explained in the `.env.development`
   ```

2. from root `echat/` folder, run server.

   ```sh
   yarn server
   ```

3. got to your Browser to your Graphql Server URL & PORTS
   like for example `http://localhost:4001/graphql`
   ```sh
   Graphql Server URL & PORTS
   ```

### Web Development

1. `./web/src/constants.ts` graphql server url port

   ```diff
   - change GRAPHQL_SERVER_URL to your specified port in the ./server/.env file
   ```

2. `./web/codegen.yml` change schema url to your server like in `constants.ts`

   ```diff
   - change schema to your specified url in the ./server/.env file
   ```

3. from root `echat/` folder, run web.

   ```sh
   yarn web
   ```

# Getting Started Production

This is an example of setting up your project on the web.
To get the local copy up and running on the web follow these simple example steps.

## Prerequisites Production

This project requires preferrably a Ubuntu Linux VPS (version 20 or later), nginx, nodejs, postgres, github actions, docker. We will be going over each step individually.

- node

  ```sh
  cd ~
  curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh && sudo bash nodesource_setup.sh
  sudo apt install nodejs
  node -v
  ```

  - some node global dependecies
    ```sh
    sudo npm i pm2 yarn typescript nodemon ts-node -g
    ```

- postgres

  ```sh
  sudo apt install postgresql postgresql-contrib
  ```

  - (optional) Configure PostgreSQL to allow remote connection

    - find postgress config
      ```sh
      $ find / -name "postgresql.conf"
      /var/lib/pgsql/9.4/data/postgresql.conf
      ```
    - Open `postgresql.conf` file and replace line:

      `listen_addresses = 'localhost'`

      with

      `listen_addresses = '*'`

    - restart postgres
      ```sh
      sudo systemctl restart nginx
      ```

  - (optional) Create db example
    ```sh
    sudo -u postgres createdb -O USERNAME DATABASE
    ```

- nginx

  ```sh
  sudo apt install nginx
  sudo ufw app list
  sudo ufw allow 'Nginx HTTP'
  systemctl status nginx
  ```

  - (optional) restart nginx
    ```sh
    sudo systemctl restart nginx
    ```
  - (optional) test the config
    ```sh
    sudo nginx -t
    ```

- docker (will be using it only for github actions .env file creation)

  ```sh
  sudo apt install apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
  sudo apt install docker-ce

  #Docker with sudo
  sudo usermod -aG docker ${USER}
  su - ${USER}

  ```

## Installation Production

1. First of all you need to setup [github action secrets](https://github.com/Don-Cryptus/echat/settings/secrets/actions) from `./server/.env`
2. set up `./web/src/constants.ts` graphql server url port
3. set up `./web/codegen.yml` change schema url to your server
4. set up your workflows in like in `./.github/workflows/node.js.yml`
5. set up action runner as shown [here](https://github.com/Don-Cryptus/echat/settings/actions/runners/new)

   while still beeing in the action-runner folder run this:(this will setup background process for the actions)

   ```sh
   sudo ./svc.sh install
   sudo ./svc.sh start
   ```

- nginx setup (use your site-name.com)

  ```sh
  sudo nano /etc/nginx/sites-available/site-name.com.conf
  ```

  paste this config

  ```
    server {

    root /var/www/html;
    client_max_body_size 200M;
    index index.html index.htm index.nginx-debian.html;

    #DONT FORGET TO CHANGE DOMAIN NAME
    server_name site-name.com www.site-name.com;

    location / {
      #DONT FORGET TO CHANGE TO YOUR CLIENT PORT
      proxy_pass http://localhost:3000;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
      proxy_redirect off;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      client_max_body_size 200M;

    }

    location /graphql {
      #DONT FORGET TO CHANGE TO YOUR SERVER PORT
      proxy_pass http://localhost:4001/graphql;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
      proxy_redirect off;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      client_max_body_size 200M;
    }
    }
  ```

  ```diff
  - Dont forget to change site-name.com, http://localhost:3000, http://localhost:4001/graphql
  ```

  copy config to enabled sites and test the config & restart nginx

  ```sh
  sudo ln -s /etc/nginx/sites-available/site-name.com.conf /etc/nginx/sites-enabled/
  nginx -t
  sudo service nginx restart
  ```

- SSL (choose your site-name.com)
  ```sh
  sudo apt install python3-certbot-nginx
  sudo certbot --nginx -d site-name.com -d www.site-name.com
  ```

<!-- USAGE EXAMPLES -->

# Usage

Register, Login chat with a gamer, book them and play with them.

_For more examples, please refer to the [FAQ](https://aktoryes.de/)_

<!-- ROADMAP -->

# Roadmap

See the [open issues](https://github.com/Don-Cryptus/echat/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

# Contributing

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

# License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

# Contact

Your Email - don.cryptus@gmail.com

Project Link: [https://github.com/Don-Cryptus/echat/](https://github.com/Don-Cryptus/echat/)
