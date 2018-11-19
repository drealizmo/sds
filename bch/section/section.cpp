#include "eosiolib/eosio.hpp"
#include "eosiolib/print.hpp"

using namespace eosio;
using namespace std; 

class [[eosio::contract]] section : public eosio::contract {

public:
  using contract::contract;
  
  section(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  [[eosio::action]]
  void add(uint64_t id, string name, uint64_t size, uint64_t created_at, uint64_t updated_at, uint64_t user_id, string key) {
    section_index sections(_code, _code.value);
    sections.emplace("eosio"_n, [&]( auto& row ) {
      row.section_id = id;
      row.name = name;
      row.created_at = created_at;
      row.updated_at = updated_at;
      row.user_id = user_id;
      row.size = size;
      row.key = key;
    }); 
  }

  [[eosio::action]]
  void update(uint64_t id, string name, uint64_t size, uint64_t created_at, uint64_t updated_at, uint64_t user_id, string key) {
    section_index sections(_code, _code.value);
    auto iterator = sections.find(id);
    if( iterator != sections.end() )
    {
      sections.modify(iterator, "eosio"_n, [&]( auto& row ) {
        row.name = name;
        row.created_at = created_at;
        row.updated_at = updated_at;
        row.user_id = user_id;
        row.size = size;
        row.key = key;
      });
    }
    else {
        eosio_assert(iterator == sections.end(), "Section does not exist");
    }
  }

  [[eosio::action]]
  void erase(uint64_t section_id) {
    section_index sections(_self, _code.value);
    auto iterator = sections.find(section_id);
    if (iterator != sections.end()) {
      sections.erase(iterator);
    }
    else {
      eosio_assert(iterator == sections.end(), "Section does not exist");
    }
    
  }

private:
  struct [[eosio::table]] sections {
        uint64_t section_id;
        string name;
        uint64_t size;
        uint64_t created_at;
        uint64_t updated_at;
        uint64_t user_id;
        string key;
        uint64_t primary_key() const { return section_id; }
  };
  typedef multi_index<"sections"_n, sections> section_index;

};

EOSIO_DISPATCH( section, (add)(update)(erase))