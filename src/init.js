/**
 * Created by ken.xu on 14-1-27.
 */
module.exports = function(root) {
	return {
		date : require(root + '/core/function/date'),
		encode : require(root + '/core/function/encode'),
		bizData : require(root + '/core/function/data'),
		math : require(root + '/core/function/math'),
		string : require(root + '/core/function/string'),
        array : require(root + '/core/function/array'),
		hashmap : require(root + '/core/function/hashmap'),
		validate : require(root + '/core/function/validate'),
		file : require(root + '/core/function/file')
	}
}