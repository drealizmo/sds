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
        if (!req.body.id || !req.body.name || !req.body.created_at || !req.body.size || !req.body.user_id || !req.body.key) throw new Error("Params are missing!");
        else
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
            return result;
        } catch (err) {
            return err;
        }
    }

    async getSections() {
        try {
          let result = await eos.getTableRows({ code: "section", json: json, scope: "section", table: "sections"});
          return result;
        } catch (err) {
            return err;
        }
    }



    async mofidySection(req) {
        if (!req.body.id || !req.body.name || !req.body.created_at || !req.body.size || !req.body.user_id || !req.body.key) throw new Error("Params are missing!");
        else
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
            return result.processed.action_traces[0].act.data;
          } catch (err) {
              return err;
          }
    }


// SHARE    

}

export default new tokenController();