#include "eosiolib/eosio.hpp"
#include "eosiolib/print.hpp"

using namespace eosio;
using namespace std; 

class [[eosio::contract]] file : public eosio::contract {

public:
  using contract::contract;
  
  file(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  [[eosio::action]]
  void add(uint64_t section_id, string name, string extension, uint64_t size, uint64_t created_at, uint64_t updated_at, string hash, uint64_t user_id, uint64_t size_real, string tags) 
  {
    file_index files(_code, _code.value);
    files.emplace("eosio"_n, [&]( auto& row ) {
      row.id = files.available_primary_key();
      row.section = section_id;
      row.name = name;
      row.extension = extension;
      row.size = size;
      row.created_at = created_at;
      row.updated_at = updated_at;
      row.hash = hash;
      row.user_id = user_id;
      row.size_real = size_real;
      row.tags = tags;
    });
  }


  [[eosio::action]]
  void erase(const uint64_t id) {
    file_index files(_self, _code.value);
    auto iterator = files.find(id);
    eosio_assert(iterator == files.end(), "File does not exist");
    files.erase(iterator);
  }

private:
  struct [[eosio::table]] files {
        uint64_t id;
        uint64_t section;
        string name;
        string extension;
        uint64_t size;
        uint64_t created_at;
        uint64_t updated_at;
        string hash;
        uint64_t user_id;
        uint64_t size_real;
        string tags;
        uint64_t primary_key() const { return id; }
        uint64_t by_section() const { return section; }
  };
  typedef multi_index<"files"_n, files, indexed_by<"section"_n, const_mem_fun<files, uint64_t, &files::by_section>>> file_index;

};

EOSIO_DISPATCH( file, (add)(erase))