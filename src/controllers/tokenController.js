import _ from 'lodash';
import config from "../../config";
import Eos from 'eosjs';

const eos = Eos(config);

class tokenController {

// SECTION
    async createSection(req, res) {
        if (!req.body.name || req.body.name.length == 0 || !req.body.key || req.body.key.length == 0 || isNan(parseInt(req.body.user_id))) res.sendStatus(400);
        else
            try {
                let name = req.body.name;
                let key = req.body.key;
                let user_id = req.body.user_id;
                let contract = await eos.contract('section');
                let result = await contract.add(name, 0, new Date().getTime(), 0, user_id, key)
                return result;
            } catch (err) {
                return err
            }
    }

    // // eos.getTableRows({ code: contractName.toString(),
    //  json: json, limit: limit, lower_bound: encodedName.toString(),
    //   scope: contractName.toString(), table: tableName.toString(),
    //    upper_bound: encodedName.plus(1).toString()})

    async getSection() {
        try {
          let result = await eos.getTableRows({ code: "section", json: json, scope: "section", table: "sections" });
          return result;
        } catch (err) {
            return err
        }
    }

    async mofidySection(req, res) {
        if (!req.body.name || req.body.name.length == 0 || isNan(parseInt(req.body.id))) res.sendStatus(400);
        else
            try {
                let id = req.body.id;
                let name = req.body.name;
                let contract = await eos.contract('section');
                let result = await contract.update(id, name, new Date().getTime())
                return result;
            } catch (err) {
                res.sendStatus(500);
            }
    }

    async cloneSection(req, res) {
        let id = req.params.id;
        if (isNan(parseInt(id))) res.sendStatus(404);
        else
          try {
            let result = [];
            let section = await eos.getTableRows({ code: "section", json: json, limit: 1, lower_bound: id, scope: "section", table: "sections", upper_bound: id+1});
            if (section) {
                result = await contract.add(section.name, section.size, section.created_at, new Date().getTime(), section.user_id, section.key)
            }
            else {
                res.sendStatus(404);
            }
            return result;
          } catch (err) {
          }
    }

    async deleteSection(req, res) {
        let id = req.params.id;
        if (isNan(parseInt(id))) res.sendStatus(404);
        else
          try {
            let contract = await eos.contract('section');
            let result = await contract.erase(id)            
            return result;
          } catch (err) {
          }
    }


// SHARE    

}

export default new tokenController();