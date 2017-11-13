/**
 * New node file
 */
var request = require('request'), express = require('express'), assert = require("assert"), http = require("http");

describe('http tests', function() {

	it('should return the login if the url is correct', function(done) {
		http.get('http://localhost:9000/home', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});



	it('should login', function(done) {
		request.post('http://localhost:9000/login', {
			form : {
				email : 'qmilan@sjsu.edu',
				password : '1234'
			}
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
    });
    
    it('should signup', function(done) {
		request.post('http://localhost:9000/signup', {
			form : {
				email : 'paradi@gmail.com',
                password : '1234',
                firstname:'Aditya',
                lastname:'Parmar'
			}
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
    });

    it('List Activities', function(done) {
		request.post('http://localhost:9000/activitylog', {
			form : {
				userid : "5a0684a5f3099e49db4be07c"
			}
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
    });
    
    it('Load Folder', function(done) {
		request.post('http://localhost:9000/folder/load', {
			form : {
			
                    userid:"5a0684a5f3099e49db4be07c",
                    parentfolderid:"5a0683baf3099e49db4be077"
            }   
			
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
        });
    });


    
    
});