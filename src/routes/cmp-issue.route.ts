import { Response, Request, NextFunction } from 'express';
const MyRouter = require('./base.route');
import CmpIssueCtrl from '../controllers/cmp-issue.controller';
import { cmpIssueDB } from '../models';
const db = cmpIssueDB;

const defaultRoutes = [
    'insert',
    'update'
];

const router = new MyRouter(cmpIssueDB, defaultRoutes);
module.exports = router;

// region auth
import { userAuthMid } from '../middlewares/user-auth.middleware';
userAuthMid(router);
// endregion

router.route('/')
    .get((req: Request, res: Response, next: NextFunction) => {
        if(req.query.pageSize === undefined) {
            req.query.pageSize = 25;
        }
        else {
            req.query.pageSize = parseInt(req.query.pageSize);
        }
        if(req.query.pageNum === undefined) {
            req.query.pageNum = 1;
        }
        else {
            req.query.pageNum = parseInt(req.query.pageNum);
        }
        
        CmpIssueCtrl.findByPage({
            pageSize: req.query.pageSize,
            pageNum: req.query.pageNum
        })
            .then(rst => {
                res.locals.resData = rst;
                res.locals.template = {};
                res.locals.succeed = true;
                return next();
            })
            .catch(next);
    });

router.route('/:id')
    .get((req: Request, res: Response, next: NextFunction) => {
        CmpIssueCtrl.getIssueDetail(req.params.id)
            .then(rst => {
                res.locals = {
                    resData: rst,
                    template: {},
                    succeed: true
                };
                return next();
            })
            .catch(next);
    });