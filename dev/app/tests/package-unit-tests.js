"use strict";

/*
 'use strict';

 var mongoose = require('mongoose'),
 Promise = require('bluebird'),
 Content = mongoose.model('Content'),
 ContentOffering = mongoose.model('ContentOffering'),
 Package = mongoose.model('PackageModel'),
 debug = require('debug')('fropcorn:package-unit-test');

 var packageFriends,
 packageSeason1,
 contentEpisode1,
 contentEpisode1Offering;

 describe('Package APIs', function () {
 this.timeout(5000);

 before(function (done) {
 contentEpisode1 = new Content({
 _id: '54621aefe944efd83300c8a2',
 title: 'Episode1',
 synopsis: 'Must Watch',
 releasedOn: new Date(),
 tags: ['Friends', 'Season1', 'Episode1'],
 type: 'tvseries',
 offerings: [],
 uid: 'UMvPGQcLi3',
 sellIndividually: false
 });

 contentEpisode1Offering = new ContentOffering({
 _id: '54621aefe944efd83300c8a3',
 content: '54621aefe944efd83300c8a2',
 type: 'rent',
 rentalPeriodInSecs: 10,
 rentalCost: 100
 });

 packageFriends = new Package({
 _id: '54621aefe944efd83300c8a4',
 title: 'Friends',
 imageName: 'Friends.jpg',
 packages: ['54621aefe944efd83300c8a5'],
 contents: [],
 types: [
 'tvseries'
 ],
 tags: [
 'friends'
 ]
 });

 packageSeason1 = new Package({
 _id: '54621aefe944efd83300c8a5',
 title: 'Season-1',
 imageName: 'FriendsSeason1.jpg',
 packages: [],
 contents: ['54621aefe944efd83300c8a2'],
 types: [
 'tvseries'
 ],
 tags: [
 'friends',
 'season1'
 ]
 });

 // BUG: Getting unhandled promise error
 // contentEpisode1.save();

 Promise.join(contentEpisode1Offering.saveAsync(), packageFriends.saveAsync(), packageSeason1.saveAsync()).then(function () {
 done();
 }).error(function (e) {
 debug('error:', e);
 });
 });
 /!*
 describe('GET /packages/:packageId', function () {

 it('should return the package with given packageId', function (done) {
 request
 .get('/packages/' + packageFriends._id)
 .end(function (err, res) {
 should.not.exist(err);
 res.should.have.property('statusCode', 200);
 res.body.should.have.property('title', 'Friends');
 res.body.should.have.property('imageName', 'Friends.jpg');
 res.body.types.should.eql(['tvseries']);
 res.body.tags.should.have.length(1);
 done();
 });
 });
 });

 describe('GET /packages', function () {

 it('should have 2 contents', function (done) {
 request
 .get('/packages')
 .end(function (err, res) {
 should.not.exist(err);
 res.should.have.property('statusCode', 200);
 res.headers['content-type'].should.match(/json/);
 res.body.should.have.length(2);
 done();
 });
 });
 });
 *!/
 after(function (done) {
 // contentEpisode1.remove();
 Promise.join(contentEpisode1Offering.removeAsync(), packageFriends.removeAsync(), packageSeason1.removeAsync()).then(function () {
 done();
 }).error(function (e) {
 debug('error:', e);
 });
 });
 });

 */
//# sourceMappingURL=package-unit-tests.js.map
