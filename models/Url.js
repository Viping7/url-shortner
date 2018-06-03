const shortid = require('shortid');
const connection = require('../config/datasource');
const mysql = require('mysql');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const operations = {};

operations.checkAndCreate = (url) => {
    return new Promise((resolve, reject) => {
        operations.checkUrlExists(url).then((result) => {
            if (result.length > 0) {
                resolve(result);
            } else {
                operations.create(url).then((result) => {
                    operations.get(result.insertId).then((result) => {
                        resolve(result);
                    })
                }).catch((err) => {
                    reject(err);
                });
            }
        }).catch((err) => {

        });
    });
};

operations.create = (url) => {
    let tinyid = shortid.generate();
    let data = {
        'shortid': tinyid,
        'original_url': url,
    };
    let query = `INSERT INTO tinyurl set ?`;
    let sql = mysql.format(query, data);
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err)
                reject(err);
            resolve(result);
        });
    });
};

operations.get = (id) => {
    let query = `select * from tinyurl where id = ?`;
    let sql = mysql.format(query, [id]);
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err)
                reject(err);
            resolve(result);
        });
    });
};

operations.getUrl = (shortid) => {
    let query = `select * from tinyurl where shortid = ?`;
    let sql = mysql.format(query, [shortid]);
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err)
                reject(err);
            resolve(result);
        });
    });
}

operations.checkUrlExists = (url) => {
    let query = `select * from tinyurl where original_url = ?`;
    let sql = mysql.format(query, [url]);
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err)
                reject(err);
            resolve(result);
        });
    });
}

module.exports = operations;