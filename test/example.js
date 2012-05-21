var should = require('should'),
  request = require('request'),
  qs = require('querystring'),
  zlib = require('zlib');

describe('Qiupu APIs: /qiupu', function() {
  before(function() {
    //console.log('Before: /qiupu');
  });

  describe('/app/all', function() {
    before(function() {
      //console.log('Before: /app/all');
    });

    it('show all apps.', function(done) {
      request.get({
        url: 'http://api.borqs.com/qiupu/app/all',
        encoding: null,
        headers: { 'accept-encoding': 'gzip,deflate'}
      }, function(err, resp, body) {
        resp.should.be.ok;
        resp.should.status(200);
        resp.should.have.header('content-encoding', 'gzip');
        zlib.unzip(body, function(err, buffer) {
          should.not.exist(err);
          should.exist(buffer);
          var json = JSON.parse(buffer);
          json.should.not.be.empty;
          json.should.be.an.instanceof(Array);
          json.length.should.be.above(0);
          json[0].should.have.property('package');
          json[0].should.have.property('app_name');
          json[0].should.have.property('app_liked_users').and.be.an.instanceof(Array);
          done();
        });
      });
    });
  });
});

describe('Account APIs', function() {
  before(function() {
    //console.log('before: Account APIs');
  });

  describe('/user/show', function() {
    before(function() {
      //console.log('before: /user/show');
    });
    beforeEach(function() {
      //console.log('beforeEach: /user/show');
    });
    after(function() {
      //console.log('after: /user/show');
    });
    afterEach(function() {
      //console.log('afterEach: /user/show');
    });

    it('Show user 10000.', function(done) {
      request.get({
        url: 'http://api.borqs.com/user/show?users=10000',
        encoding: null,
        headers: { 'accept-encoding': 'gzip,deflate'}
      }, function(err, resp, body) {
        resp.should.be.ok;
        resp.should.status(200);
        resp.should.have.header('content-encoding', 'gzip');
        zlib.unzip(body, function(err, buffer) {
          should.not.exist(err);
          should.exist(buffer);
          var json = JSON.parse(buffer);
          json.should.not.be.empty;
          json.should.be.an.instanceof(Array);
          json.should.have.length(1);
          json[0].should.have.property('user_id').and.eql(10000);
          json[0].should.have.property('shared_count').and.be.a('object').and.have.property('shared_apk');
          done();
        });
      });
    });

    it('Show user 10001.', function(done) {
      request.get({
        url: 'http://api.borqs.com/user/show?users=10001',
        encoding: null,
        headers: { 'accept-encoding': 'gzip,deflate'}
      }, function(err, resp, body) {
        resp.should.be.ok;
        resp.should.status(200);
        resp.should.have.header('content-encoding', 'gzip');
        zlib.unzip(body, function(err, buffer) {
          should.not.exist(err);
          should.exist(buffer);
          var json = JSON.parse(buffer);
          json.should.not.be.empty;
          json.should.be.an.instanceof(Array);
          json.should.have.length(1);
          json[0].should.have.property('user_id').and.eql(10001);
          json[0].should.have.property('shared_count').and.be.a('object').and.have.property('shared_apk').and.be.above(-1);
          json[0].shared_count.should.have.property('shared_text').and.be.above(-1);
          json[0].shared_count.should.have.property('shared_photo').and.be.above(-1);
          json[0].shared_count.should.have.property('shared_book').and.be.above(-1);
          json[0].shared_count.should.have.property('shared_link').and.be.above(-1);
          done();
        });
      });
    });

    it('Show two users.', function(done) {
      request.get({
        url: 'http://api.borqs.com/user/show?users=10000,10001',
        encoding: null,
        headers: { 'accept-encoding': 'gzip,deflate'}
      }, function(err, resp, body) {
        resp.should.be.ok;
        resp.should.status(200);
        resp.should.have.header('content-encoding', 'gzip');
        zlib.unzip(body, function(err, buffer) {
          should.not.exist(err);
          should.exist(buffer);
          var json = JSON.parse(buffer);
          json.should.not.be.empty;
          json.should.be.an.instanceof(Array);
          json.should.have.length(2);
          done();
        });
      });
    });

    it('Show user -1 (empty).', function(done) {
      request.get({
        url: 'http://api.borqs.com/user/show?users=-1',
        encoding: null,
        headers: { 'accept-encoding': 'gzip,deflate'}
      }, function(err, resp, body) {
        resp.should.be.ok;
        resp.should.status(200);
        resp.should.have.header('content-encoding', 'gzip');
        zlib.unzip(body, function(err, buffer) {
          should.not.exist(err);
          should.exist(buffer);
          var json = JSON.parse(buffer);
          json.should.be.empty;
          json.should.be.an.instanceof(Array);
          done();
        });
      });
    });

    it('Show user error.', function(done) {
      request.get({
        url: 'http://api.borqs.com/user/show',
        encoding: null,
        headers: { 'accept-encoding': 'gzip,deflate'}
      }, function(err, resp, body) {
        resp.should.be.ok;
        resp.should.status(200);
        resp.should.have.header('content-encoding', 'gzip');
        zlib.unzip(body, function(err, buffer) {
          should.not.exist(err);
          should.exist(buffer);
          var json = JSON.parse(buffer);
          json.should.be.a('object').and.have.property('error_code');
          json.should.have.property('error_msg');
          json.error_msg.should.equal("Missing parameter 'users'");
          done();
        });
      });
    });
  });
});
