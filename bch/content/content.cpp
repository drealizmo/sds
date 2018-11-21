#include "eosiolib/eosio.hpp"
#include "eosiolib/print.hpp"

using namespace eosio;
using namespace std; 

class [[eosio::contract]] content : public eosio::contract {

public:
  using contract::contract;
  
  content(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  [[eosio::action]]
  void add(uint64_t id, uint64_t section_id, string name, uint64_t created_at, uint64_t updated_at, uint64_t user_id, string tags, string content) 
  {
    content_index cont(_code, _code.value);
    cont.emplace("eosio"_n, [&]( auto& row ) {
          row.id = id;
          row.name = name;
          row.section = section_id;
          row.created_at = created_at;
          row.updated_at = updated_at;
          row.user_id = user_id;
          row.tags = tags;
          row.content = content;
    });
  }

  [[eosio::action]]
  void update(uint64_t id, uint64_t section_id, string name, uint64_t created_at, uint64_t updated_at, uint64_t user_id, string tags, string content) 
  {
    content_index cont(_code, _code.value);
    auto iterator = cont.find(id);
    if( iterator != cont.end() )
    {
      cont.modify(iterator, "eosio"_n, [&]( auto& row ) {
          row.name = name;
          row.section = section_id;
          row.created_at = created_at;
          row.updated_at = updated_at;
          row.user_id = user_id;
          row.tags = tags;
          row.content = content;
      });
    }
    else {
      eosio_assert(iterator == cont.end(), "Content does not exist");
    }
  }

  [[eosio::action]]
  void erase(uint64_t id) {
    content_index cont(_code, _code.value);
    auto iterator = cont.find(id);
    if (iterator != cont.end()) {
      cont.erase(iterator);
    }
    else {
      eosio_assert(iterator != cont.end(), "content does not exist");
    }
  }

private:
  struct [[eosio::table]] cont {
    uint64_t id;
    uint64_t section;
    string name;
    uint64_t created_at;
    uint64_t updated_at;
    uint64_t user_id;
    string tags;
    string content;
    uint64_t primary_key() const { return id; }
    uint64_t by_section() const { return section; }
  };
  typedef multi_index<"cont"_n, cont, indexed_by<"section"_n, const_mem_fun<cont, uint64_t, &cont::by_section>>> content_index;

};

EOSIO_DISPATCH( content, (add)(update)(erase));
