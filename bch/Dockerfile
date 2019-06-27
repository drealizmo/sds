FROM ubuntu:18.04
RUN apt-get update \
  && apt-get install -y wget libcurl4-openssl-dev libusb-1.0-0-dev libicu60 libcurl3-gnutls\
  && rm -rf /var/lib/apt/lists/* \ 
  && wget https://github.com/eosio/eos/releases/download/v1.7.4/eosio_1.7.4-1-ubuntu-18.04_amd64.deb \
  && apt install ./eosio_1.7.4-1-ubuntu-18.04_amd64.deb -y -f\
  && rm -rf ./eosio_1.7.4-1-ubuntu-18.04_amd64.deb
COPY config.ini /root/.local/share/eosio/nodeos/config/config.ini
COPY genesis.json /root/.local/share/eosio/nodeos/config/genesis.json
