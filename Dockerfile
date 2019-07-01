FROM ubuntu:18.04

COPY ./bch /root/contracts

RUN apt-get update \
  && apt-get install -y wget libcurl4-openssl-dev libusb-1.0-0-dev libicu60 libcurl3-gnutls\
  && rm -rf /var/lib/apt/lists/* \ 
  && wget https://github.com/eosio/eos/releases/download/v1.8.0/eosio_1.8.0-1-ubuntu-18.04_amd64.deb \
  && apt install ./eosio_1.8.0-1-ubuntu-18.04_amd64.deb -y -f\
  && rm -rf ./eosio_1.7.4-1-ubuntu-18.04_amd64.deb\
  # && mv /root/contracts/config.ini /root/.local/share/eosio/nodeos/config/config.ini \
  # && mv /root/contracts/genesis.json /root/.local/share/eosio/nodeos/config/genesis.json \
  && mv /root/contracts/init.sh /run.sh

# COPY ./bch/config.ini /root/.local/share/eosio/nodeos/config/config.ini
# COPY ./bch/genesis.json /root/.local/share/eosio/nodeos/config/genesis.json
#ADD ./bch/init.sh /run.sh

RUN chmod +x /run.sh && ls -am /root/contracts

CMD ["/run.sh"]
