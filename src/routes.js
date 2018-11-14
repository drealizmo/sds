import { Router } from 'express';
import config from "../config";
import tokenController from './controllers/tokenController';
const routes = Router();

const runAction = (action, req, res) =>  {
    console.log('here')
    action(req, res)
      .then(data => {
        console.log("Data : " + data);
        res.status(200).send(data);
        return;
      })
      .catch(err => {
        console.log("Router: " + err);
        res
          .status(err.status || 400)
          .send({
            err: err.name ? err.name : "Error",
            message: err.message
          });
        return;
      });
};


// SECTION

routes.post('/api/section', (req, res) => runAction(tokenController.modifySection, req, res));
routes.post('/api/section/:id', (req, res) => runAction(tokenController.cloneSection, req, res));
routes.get('/api/section/list', (req, res) => runAction(tokenController.getSection, req, res));
routes.put('/api/section', (req, res) => runAction(tokenController.createSection, req, res));
routes.delete('/api/section/:id', (req, res) => runAction(tokenController.deleteSection, req, res));

// SHARE

routes.get('/api/share/list/:id', (req, res) => runAction(tokenController.getShareBySectionId, req, res));
routes.put('/api/share', (req, res) => runAction(tokenController.shareSection, req, res));
routes.delete('/api/section/:id', (req, res) => runAction(tokenController.deleteShare, req, res));

// CONTENT

routes.post('/api/content', (req, res) => runAction(tokenController.modifyContent, req, res));
routes.get('/api/content/list/:id', (req, res) => runAction(tokenController.getContentList, req, res));
routes.get('/api/content/:id', (req, res) => runAction(tokenController.getContent, req, res));
routes.put('/api/content', (req, res) => runAction(tokenController.createContent, req, res));
routes.delete('/api/content/:id', (req, res) => runAction(tokenController.deleteContent, req, res));

// FILE

routes.get('/api/file/:id', (req, res) => runAction(tokenController.getContentList, req, res));
routes.get('/api/file/list/:id', (req, res) => runAction(tokenController.getContent, req, res));
routes.put('/api/content', (req, res) => runAction(tokenController.createContent, req, res));
routes.delete('/api/file/:id', (req, res) => runAction(tokenController.deleteContent, req, res));


export default routes;
