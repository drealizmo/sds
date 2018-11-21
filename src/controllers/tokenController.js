import Eos from 'eosjs';

const eos = Eos({ keyProvider: ["5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"],
httpEndpoint: 'http://127.0.0.1:8888',
chainId: "4c9c536366159df1815c6262fb4a99e7d57c940c663fe10e2afdad066df3c558",
expireInSeconds: 60,
broadcast: true,
debug: false,
sign: true
});
const json = true;

class tokenController {

// SECTION
    async createSection(req) {
            try {
                const data = {
                    "id": req.body.id,
                    "name": req.body.name,
                    "size": req.body.size,
                    "created_at": req.body.created_at,
                    "updated_at": 0,
                    "user_id": req.body.user_id,
                    "key": req.body.key
                }
                let contract = await eos.contract('section');
                let result = await contract.add(data, { authorization: ["eosio@active"]});
                return result.processed.action_traces[0].act.data;
            } catch (err) {
                return err
            }
    }

    async getSection(req) {
        try {
            let result = await eos.getTableRows({ code: "section", json: json, scope: "section", table: "sections", lower_bound: req.params.id, upper_bound: req.params.id + 1 })
            return result.rows;
        } catch (err) {
            return err;
        }
    }

    async getSections() {
        try {
          let result = await eos.getTableRows({ code: "section", json: json, scope: "section", table: "sections"});
          return result.rows;
        } catch (err) {
            return err;
        }
    }



    async mofidySection(req) {
            try {
                let contract = await eos.contract('section');
                const data = {
                    "id": req.body.id,
                    "name": req.body.name,
                    "size": req.body.size,
                    "created_at": req.body.created_at,
                    "updated_at": req.body.updated_at,
                    "user_id": req.body.user_id,
                    "key": req.body.key
                }
                let result = await contract.update(data, { authorization: ["eosio@active"]});
                return result.processed.action_traces[0].act.data;
            } catch (err) {
                return err
            }
    }

    async deleteSection(req) {
        let id = req.params.id;
        if (isNaN(parseInt(id))) throw new Error("Params are missing!")
        else
          try {
            let contract = await eos.contract('section');
            let result = await contract.erase(id, { authorization: ["eosio@active"]})
            return true;
          } catch (err) {
              return err;
          }
    }


// SHARE

async shareSection(req) {
      try {
          const data = {
              "share_id": req.body.share_id,
              "section_id": req.body.section_id,
              "user_id": req.body.user_id,
              "username": req.body.username,
              "wallet": req.body.wallet,
              "key": req.body.key
          }
          let share = await eos.contract('share');
          let shared = await share.add(data, { authorization: ["eosio@active"]});
          return shared.rows;
      } catch (err) {
          return err
      }
}

async getShareBySectionId(req) {
  try {
      let result = await eos.getTableRows({ code: "share", json: json, scope: "share", table: "shares", lower_bound: req.params.id, upper_bound: req.params.id + 1 })
      return result;
  } catch (err) {
      return err;
  }
}

async deleteShare(req) {
  let id = req.params.id;
  if (isNaN(parseInt(id))) throw new Error("Params are missing!")
  else
    try {
      let contract = await eos.contract('share');
      let result = await contract.erase(id, { authorization: ["eosio@active"]})
      return true;
    } catch (err) {
        return err;
    }
}

// CONTENT

async createContent(req) {
      try {
          const data = {
              "id": req.body.id,
              "section_id": req.body.section_id,
              "name": req.body.name,
              "created_at": req.body.created_at,
              "updated_at": 0,
              "user_id": req.body.user_id,
              "tags": req.body.tags,
              "content": req.body.content
          }
          let contract = await eos.contract('content');
          let result = await contract.add(data, { authorization: ["eosio@active"]});
          return result.processed.action_traces[0].act.data;
      } catch (err) {
          return err
      }
}

async getContent(req) {
  try {
      let result = await eos.getTableRows({ code: "content", json: json, scope: "content", table: "cont", lower_bound: req.params.id, upper_bound: req.params.id + 1 })
      return result.rows;
  } catch (err) {
      return err;
  }
}

async getContentList(req) {
  try {
    let result = await eos.getTableRows({ code: "content", json: json, scope: "content", table: "cont", index_position: 2, key_type: "i64", lower_bound: req.params.id, upper_bound: req.params.id+1});
    return result.rows;
  } catch (err) {
      return err;
  }
}



async modifyContent(req) {
      try {
          let contract = await eos.contract('content');
          const data = {
              "id": req.body.id,
              "section_id": req.body.section_id,
              "name": req.body.name,
              "created_at": req.body.created_at,
              "updated_at": req.body.updated_at,
              "user_id": req.body.user_id,
              "tags": req.body.tags,
              "content": req.body.content
          }
          let result = await contract.update(data, { authorization: ["eosio@active"]});
          return result.processed.action_traces[0].act.data;
      } catch (err) {
          return err
      }
}

async deleteContent(req) {
  let id = req.params.id;
  if (isNaN(parseInt(id))) throw new Error("Params are missing!")
  else
    try {
      let contract = await eos.contract('content');
      let result = await contract.erase(id, { authorization: ["eosio@active"]})
      return true;
    } catch (err) {
        return err;
    }
}

// FILE

async createFile(req) {
  try {
      const data = {
          "id": req.body.id,
          "section_id": req.body.section_id,
          "name": req.body.name,
          "extension": req.body.extension,
          "size": req.body.size,
          "created_at": req.body.created_at,
          "updated_at": 0,
          "hash": req.body.hash,
          "user_id": req.body.user_id,
          "size_real": req.body.size_real,
          "tags": req.body.tags,
          "content": req.body.content
      }
      let contract = await eos.contract('file');
      let result = await contract.add(data, { authorization: ["eosio@active"]});
      return result.processed.action_traces[0].act.data;
  } catch (err) {
      return err
  }
}

async deleteFile(req) {
  let id = req.params.id;
  if (isNaN(parseInt(id))) throw new Error("Params are missing!")
  else
    try {
      let contract = await eos.contract('file');
      let result = await contract.erase(id, { authorization: ["eosio@active"]})
      return true;
    } catch (err) {
        return err;
    }
}

async getFile(req) {
  try {
      let result = await eos.getTableRows({ code: "file", json: json, scope: "file", table: "files", lower_bound: req.params.id, upper_bound: req.params.id + 1 })
      return result.rows;
  } catch (err) {
      return err;
  }
}

async getFiles(req) {
  try {
    let result = await eos.getTableRows({ code: "file", json: json, scope: "file", table: "files", index_position: 2, key_type: "i64", lower_bound: req.params.id, upper_bound: req.params.id+1});
    return result.rows;
  } catch (err) {
      return err;
  }
}



}

export default new tokenController();
