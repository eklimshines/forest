JSON.clone = function(obj){
	return JSON.parse(JSON.stringify(obj));
};

exports.makeDefault = function (obj){
	return function () {
		if(!obj) return {};
		return JSON.clone(obj);
	};
};
