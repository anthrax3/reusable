(function() {

	var R = {};
	var W = window;
	W.R = R;

	R.$version = '';
	R.$language = '';

	W.setTimeout2 = function(name, fn, timeout, limit) {
		var key = ':' + name;
		if (limit > 0) {
			var key2 = key + ':limit';
			if (MAN.others[key2] >= limit)
				return;
			MAN.others[key2] = (MAN.others[key2] || 0) + 1;
			MAN.others[key] && clearTimeout(MAN.others[key]);
			return MAN.others[key] = setTimeout(function() {
				MAN.others[key2] = undefined;
				fn && fn();
			}, timeout);
		}

		MAN.others[key] && clearTimeout(MAN.others[key]);
		return MAN.others[key] = setTimeout(fn, timeout);
	};

	W.clearTimeout2 = function(name) {
		var key = ':' + name;

		if (MAN.others[key]) {
			clearTimeout(MAN.others[key]);
			MAN.others[key] = undefined;
			MAN.others[key + ':limit'] && (MAN.others[key + ':limit'] = undefined);
			return true;
		}

		return false;
	};
})();