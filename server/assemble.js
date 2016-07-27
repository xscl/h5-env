var dao = require('./db');
var fetch = require('node-fetch');
var account = {
	'wx_site_id': 'wx888048ccfc4491c8',
	'wx_site_secret': '1565883b49446084b16ab295f5830984'
};
module.exports = {
	assemble: function (router, appId) {
		var base_redirect_uri = encodeURIComponent('http://cf.starnet-social.teakki.top/' + appId);
		var baseRedirectUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + account['wx_site_id'] + '&redirect_uri=' + base_redirect_uri
			+ '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
		router.get('/', this.index(appId, baseRedirectUri));
		router.get('/test', this._index(appId));
		router.get('/fetchCDK', this.fetchCDK(appId));
	},
	_index: function (appId) {
		var ejs = appId + '.ejs';
		return function (req, res) {
			res.render(ejs, {openId: 'openId', baseRedirectUri: false});
		}
	},
	fetchCDK: function (appId) {
		return function(req, res) {
			var openId = req.query.openId;
			if (openId && req.cookies.wx) {
				dao.getCDKByOpenIdDynamic(appId, openId, function (err, cdk) {
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
		}
	},
	index: function (appId, baseRedirectUri) {
		var ejs = appId + '.ejs';
		return function (req, res) {
			var code = req.query.code;
			if (!code) {
				res.render(ejs, {baseRedirectUri: baseRedirectUri, openId: false});
			}
			else {
				var accessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + account['wx_site_id']
					+ '&secret=' + account['wx_site_secret'] + '&code=' + code + '&grant_type=authorization_code';
				fetch(accessTokenUrl).then(function(res2) {
					return res2.json();
				}).then(function(json) {
					var openId = json.openid;
					if (openId) {
						res.render(ejs, {openId: openId, baseRedirectUri: false});
					}
					else if (req.cookies.wx) {
						res.render(ejs, {baseRedirectUri: baseRedirectUri, openId: false});
					}
					else {
						res.render('empty.ejs');
					}
				});
			}
		};
	}
};
