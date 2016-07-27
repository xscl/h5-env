var express = require('express');
var router = express.Router();
var dao = require('../db');
var fetch = require('node-fetch');

var account = {
    'wx_site_id': 'wx888048ccfc4491c8',
    //'wx_site_id': 'wx33d08e69c778a80d',
    'wx_site_secret': '1565883b49446084b16ab295f5830984'
    //'wx_site_secret': '94f4eebca8cd83dd4ff34a38aeb2e6b6'
};
var appid = account['wx_site_id'];
var base_redirect_uri = encodeURIComponent('http://cf.starnet-social.teakki.top');
var baseRedirectUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + base_redirect_uri
    + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
/* GET home page. */
router.get('/fetchCDK', function(req, res, next) {
    var openId = req.query.openId;
    if (openId && req.cookies.wx) {
        dao.getCDKByOpenId(openId, function (err, cdk) {
            if (err) {
                res.json({err: err});
            }
            else {
                if (cdk.key) {
                    res.json({success: true, cdk: cdk.key});
                }
                else {
                    res.json({success: true, msg: cdk});
                }
            }
        });
    }
    else {
        res.json({msg: 'no openId'});
    }
});
router.get('/', function (req, res) {
    var code = req.query.code;
    if (!code) {
        res.render('index.ejs', {baseRedirectUri: baseRedirectUri, openId: false});
    }
    else {
        var accessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + account['wx_site_id']
            + '&secret=' + account['wx_site_secret'] + '&code=' + code + '&grant_type=authorization_code';
        fetch(accessTokenUrl).then(function(res2) {
            return res2.json();
        }).then(function(json) {
            var openId = json.openid;
            if (openId) {
                res.render('index.ejs', {openId: openId, baseRedirectUri: false});
            }
            else if (req.cookies.wx) {
                res.render('index.ejs', {baseRedirectUri: baseRedirectUri, openId: false});
            }
            else {
                res.render('empty.ejs');
            }
        });
    }
});
module.exports = router;
