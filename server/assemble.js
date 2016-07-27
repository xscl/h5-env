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
	assemble2: function (router, appId) {
		var base_redirect_uri = encodeURIComponent('http://cf.starnet-social.teakki.top/' + appId);
		var baseRedirectUri = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + account['wx_site_id'] + '&redirect_uri=' + base_redirect_uri
			+ '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
		router.get('/', this.indexUserInfo(appId, baseRedirectUri));
	},
	indexUserInfo: function (appId, baseRedirectUri) {
		var ejs = appId + '.ejs';
		return function (req, res) {
			var code = req.query.code;
			if (!code) {
				res.redirect(baseRedirectUri);
			}
			else {
				var accessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + account['wx_site_id']
					+ '&secret=' + account['wx_site_secret'] + '&code=' + code + '&grant_type=authorization_code';
				fetch(accessTokenUrl).then(function(openIdRet) {
					return openIdRet.json();
				}).then(function(openIdObj) {
					if (!openIdObj['access_token']) {
						res.redirect(baseRedirectUri);
					}
					else {
						var openId = openIdObj['openid'];
						if (openId) {
							// 获取userinfo
							var userUri = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + openIdObj['access_token'] + '&openid=' + openId + '&lang=zh_CN';
							fetch(userUri).then(function(userRet) {
								return userRet.json();
							}).then(function(userObj) {
								res.render(ejs, {
									openId: openId,
									userInfo: {
										nickname: userObj.nickname,
										unionId: userObj.unionid,
										headImgUrl: userObj.headimgurl,
										title: userObj['title'] || '',
										desc: userObj['desc'] || ''
									}
								});
							});
						}
						else if (req.cookies.wx) {
							res.redirect(baseRedirectUri);
						}
						else {
							res.render('empty.ejs');
						}
					}
				});
			}
		};
	},
	_index: function (appId) {
		var ejs = appId + '.ejs';
		return function (req, res) {
			res.render(ejs, {openId: 'openId'});
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
				res.redirect(baseRedirectUri);
			}
			else {
				var accessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + account['wx_site_id']
					+ '&secret=' + account['wx_site_secret'] + '&code=' + code + '&grant_type=authorization_code';
				fetch(accessTokenUrl).then(function(res2) {
					return res2.json();
				}).then(function(json) {
					var openId = json.openid;
					if (openId) {
						res.render(ejs, {openId: openId});
					}
					else if (req.cookies.wx) {
						res.redirect(baseRedirectUri);
					}
					else {
						res.render('empty.ejs');
					}
				});
			}
		};
	}
};
