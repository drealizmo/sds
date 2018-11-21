#include "eosiolib/eosio.hpp"
#include "eosiolib/print.hpp"

using namespace eosio;
using namespace std;

class [[eosio::contract]] share : public eosio::contract {

public:
  using contract::contract;

  share(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  [[eosio::action]]
  void add(uint64_t share_id, uint64_t section_id, uint64_t user_id, string username, string wallet, string key) {
    share_index shares(_code, _code.value);
    shares.emplace("eosio"_n, [&]( auto& row ) {
      row.share_id = share_id;
      row.section = section_id;
      row.user_id = user_id;
      row.username = username;
      row.wallet = wallet;
      row.key = key;
    });
  }

  [[eosio::action]]
  void erase(const uint64_t share_id) {
    share_index shares(_self, _code.value);
    auto iterator = shares.find(share_id);
    eosio_assert(iterator != shares.end(), "share does not exist");
    if (iterator != shares.end()) {
      shares.erase(iterator);
    }
    else {
      eosio_assert(iterator != shares.end(), "share does not exist");
    }
  }

private:
  struct [[eosio::table]] shares {
        uint64_t share_id;
        uint64_t section;
        uint64_t user_id;
        string username;
        string wallet;
        string key;
        uint64_t primary_key() const { return share_id; }
        uint64_t by_section() const { return section; }
  };
  typedef multi_index<"shares"_n, shares, indexed_by<"section"_n, const_mem_fun<shares, uint64_t, &shares::by_section>>> share_index;

};

EOSIO_DISPATCH( share, (add)(erase))
