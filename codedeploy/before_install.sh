#!/bin/bash

# Install LTS Node
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
sudo apt install -y npm
# Install pm2
sudo npm install pm2 -g
# make project directory
mkdir -p /home/ubuntu/se-project
