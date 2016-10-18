/**
 * Author: 
 * Date: 14-6-4 上午11:52
 */

/**
 * @returns {*}
 */
module.exports = function(data, err) {

	var bizData = {};

	bizData.data = data;
	bizData.err = typeof err === "undefined" ? "" : err;

	return bizData;
}