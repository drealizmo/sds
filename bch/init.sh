#!/bin/bash
set -m
cmd="nodeos --contracts-console --config /root/contracts/config.ini --genesis-json /root/contracts/genesis.json --replay-blockchain"

$cmd &

if [ ! -f /root/init_blockchain ]; then
    echo "---- CREATE ACCOUNTS ----"
    
    PUBLIC_KEY="EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"
    sleep 5

    cleos wallet create --to-console | grep -o -E [a-zA-Z0-9]{53} >> key.txt && PASSWORD=$(<key.txt) && echo "$PASSWORD\n" \
    cleos wallet open
    cleos wallet list

    #cleos wallet unlock --password $PASSWORD
    cleos wallet import --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
    
    # create necessary accounts 
    cleos create account eosio eosio.msig $PUBLIC_KEY
    cleos create account eosio eosio.bpay $PUBLIC_KEY
    cleos create account eosio eosio.names $PUBLIC_KEY
    cleos create account eosio eosio.ram $PUBLIC_KEY
    cleos create account eosio eosio.ramfee $PUBLIC_KEY
    cleos create account eosio eosio.saving $PUBLIC_KEY
    cleos create account eosio eosio.stake $PUBLIC_KEY
    cleos create account eosio eosio.token $PUBLIC_KEY
    cleos create account eosio eosio.vpay $PUBLIC_KEY
    cleos create account eosio section $PUBLIC_KEY
    cleos create account eosio content $PUBLIC_KEY
    cleos create account eosio file $PUBLIC_KEY
    cleos create account eosio share $PUBLIC_KEY
    
    # set contracts
    cleos set contract eosio.token /root/eos/build/contracts/eosio.token
    cleos set contract eosio.msig /root/eos/build/contracts/eosio.msig
    cleos set contract section /root/contracts/section
    cleos set contract file /root/contracts/file
    cleos set contract content /root/contracts/content
    cleos set contract share /root/contracts/share

    # mark init as done
    touch /root/init_blockchain
fi

fg
