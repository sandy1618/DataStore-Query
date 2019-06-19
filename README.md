# DataQuery Application & DataStore (Backend)

MongoDB &amp; Node.js data store backend for cryptoping application.

## Ubuntu Node.js

```
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Install and Run

Download latest ```mongodb``` database software and install for your specific machine.

[MonogDB Download](https://www.mongodb.com/download-center/community?jmp=docs)

Open directory where ```repository``` is saved and open ```command prompt/terminal``` there. 

```bash
$ sudo npm install
$ sudo npm start
```

Open Chrome http://localhost:8080

Install certificate from certificates folder of the repository. if you need ```https```.


### Install MongoDB

Error : /data/db not found.

```bash
$ cd /
$ sudo mkdir data
$ cd data
$ sudo mkdir db
$ cd ..
$ sudo mongod --dbpath /data/db --port 27012
```
