define( 'ObservableMixin', function ( require ) {
	function g() {
		this.__observableEvents = {};
	}
	g.prototype = {
		inform: function (h) {
			var i = Array.prototype.slice.call(arguments, 1),
				j = Array.prototype.slice.call(this.getSubscribers(h));
			for (var k = 0; k < j.length; k++) {
				if (j[k] === null) continue;
				try {
					j[k].apply(this, i);
				} catch (l) {
					setTimeout(function () {
						throw l;
					}, 0);
				}
			}
			return this;
		},
		getSubscribers: function (h) {
			return this.__observableEvents[h] || (this.__observableEvents[h] = []);
		},
		clearSubscribers: function (h) {
			if (h) this.__observableEvents[h] = [];
			return this;
		},
		clearAllSubscribers: function () {
			this.__observableEvents = {};
			return this;
		},
		subscribe: function (h, i) {
			var j = this.getSubscribers(h);
			j.push(i);
			return this;
		},
		unsubscribe: function (h, i) {
			var j = this.getSubscribers(h);
			for (var k = 0; k < j.length; k++)
				if (j[k] === i) {
					j.splice(k, 1);
					break;
				}
			return this;
		},
		monitor: function (h, i) {
			if (!i()) {
				var j = ES5(function (k) {
					if (i.apply(i, arguments)) this.unsubscribe(h, j);
				}, 'bind', true, this);
				this.subscribe(h, j);
			}
			return this;
		}
	};
	return g;
} );