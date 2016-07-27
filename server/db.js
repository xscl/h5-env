/**
 * Created by tingkl on 16/7/17.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '139.196.175.145',
    user: 'test',
    password: 'abc123',
    database: 'chamber'
});
module.exports = {
    getCDKByOpenId: function (openId, callback) {
        pool.getConnection(function (err, connection) {
            connection.query('select * from cdk2 where openId = ?', openId, function (err, result) {
                if (err) {
                    connection.release();
                    callback(err);
                }
                else {
                    if (result.length > 0) {
                        connection.release();
                        callback(null, result[0]);
                    }
                    else {
                        connection.beginTransaction(function (err) {
                            if (err) {
                                connection.release();
                                callback(err);
                            }
                            else {
                                connection.query('select * from cdk2 where openId = \'\' limit 0,1', function (err, result) {
                                    if (err) {
                                        connection.release();
                                        callback(err);
                                    }
                                    else {
                                        if (result.length > 0) {
                                            var theOne = result[0];
                                            connection.query('update cdk2 set openId = ? where id = ?', [openId, theOne.id], function (err, result) {
                                                if (err) {
                                                    return connection.rollback(function () {
                                                        connection.release();
                                                        callback(err);
                                                    });
                                                }
                                                connection.commit(function (err) {
                                                    if (err) {
                                                        return connection.rollback(function () {
                                                            connection.release();
                                                            callback(err);
                                                        });
                                                    }
                                                    else {
                                                        connection.release();
                                                        callback(null, theOne);
                                                    }

                                                });
                                            });
                                        } else {
                                            connection.release();
                                            callback(null, 'no more cdk');
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
            });
        });
    },
	getCDKByOpenIdDynamic: function (appId, openId, callback) {
		pool.getConnection(function (err, connection) {
			connection.query('select * from ' + appId +' where openId = ?', openId, function (err, result) {
				if (err) {
					connection.release();
					callback(err);
				}
				else {
					if (result.length > 0) {
						connection.release();
						callback(null, result[0]);
					}
					else {
						connection.beginTransaction(function (err) {
							if (err) {
								connection.release();
								callback(err);
							}
							else {
								connection.query('select * from ' + appId + ' where openId = \'\' limit 0,1', function (err, result) {
									if (err) {
										connection.release();
										callback(err);
									}
									else {
										if (result.length > 0) {
											var theOne = result[0];
											connection.query('update ' + appId + ' set openId = ? where id = ?', [openId, theOne.id], function (err, result) {
												if (err) {
													return connection.rollback(function () {
														connection.release();
														callback(err);
													});
												}
												connection.commit(function (err) {
													if (err) {
														return connection.rollback(function () {
															connection.release();
															callback(err);
														});
													}
													else {
														connection.release();
														callback(null, theOne);
													}

												});
											});
										} else {
											connection.release();
											callback(null, 'no more cdk');
										}
									}
								});
							}
						});
					}
				}
			});
		});
	}
};