#!/bin/bash
# stop all server
sudo pm2 stop all
sudo pm2 delete all

## change the ip
sudo sed -i "s/<public-ip>/$(curl -s http://checkip.amazonaws.com)/g" /home/ubuntu/se-project/frontend/src/axios.js

# run backend
cd /home/ubuntu/se-project/backend/ && sudo npm run deploy
# run frontend
cd /home/ubuntu/se-project/frontend/ && sudo npm run deploy
