var vm = new Vue({

	el: '#medias',

	data: {

		albumId: '',
		mediaType: 0,
		editMode: false,
		albumList: [],
		mediaList: [],
		mediaAddData: {
			type: 0,
			name: '',
			albumIndex: '',
			crambUrl: ''
		},
		mediaEditData: {
			type: 0,
			mediaId: '',
			name: '',
			cover: '',
			title: '',
			albumId: '',
			albumIndex: ''
		}
	},

	beforeMount: function() {

		var self = this;
		var data = {};
		var albumId = self._getParam('album_id');
		var mediaType = self._getParam('media_type');
		if (albumId) {
			self.albumId = albumId;
		}
		if (mediaType) {
			self.mediaType = parseInt(mediaType);
			self.mediaAddData.type = parseInt(mediaType);
		}
		self._getMediaList();
		self._getAlbumList();
	},

	methods: {

		_getMediaList: function() {

			var self = this;
			$.ajax({
				url: 'api/getMediaList',
				method: 'get',
				dataType: 'json',
				success: function(data) {
					self.mediaList = data;
				}
			});
		},
		_getAlbumList: function() {

			var self = this;
			$.ajax({
				url: 'api/getAlbumList',
				method: 'get',
				dataType: 'json',
				success: function(data) {
					self.albumList = data;
				}
			});
		},
		// 从地址栏获取参数
		_getParam: function(name) {

			var params = {};
			var str = window.location.search.substr(1);
			if (str) {
				var arr = str.split('&');
				for (var i = 0; i < arr.length; i ++) {
					var pair = arr[i];
					var pos = pair.indexOf('=');
					if (pos >= 0) {
						var key = pair.substring(0, pos);
						var value = pair.substr(pos + 1);
						params[key] = value;
					}
				}
			}
			return params[name];
		},

		// 专辑id映射到专辑name
		getAlbumName: function(id) {
			for (var i = 0; i < this.albumList.length; i ++) {
				if (this.albumList[i].ALBUM_ID == id) {
					return this.albumList[i].ALBUM_NAME;
				}
			}
			return id;
		},

		deleteMedia: function(e) {

			if (confirm('确定删除？')) {
				return true;
			}
			else {
				e.preventDefault();
				return false;
			}
		},
		showEdit: function(media) {

			this.editMode = true;
			this.mediaEditData.type = media.MEDIA_TYPE;
			this.mediaEditData.mediaId = media.MEDIA_ID;
			this.mediaEditData.name = media.MEDIA_NAME;
			this.mediaEditData.cover = media.MEDIA_COVER;
			this.mediaEditData.title = media.MEDIA_TITLE;
			this.mediaEditData.albumId = media.MEDIA_ALBUM;
			this.mediaEditData.albumIndex = media.MEDIA_ALBUM_INDEX;
		},
		cancelEdit: function() {

			this.editMode = false;
		},
		checkAddForm: function(e) {

			if (this.mediaAddData.crambUrl) {
				if (parseInt(this.mediaAddData.type) === 0) {
					if (this.mediaAddData.name) {
						return;
					}
				}
				else {
					if (this.mediaAddData.albumIndex != '') {
						return;
					}
				}
			}
			alert('column required');
			e.preventDefault();
			return false;
		},
		checkEditForm: function(e) {

			if (parseInt(this.mediaEditData.type) === 0) {
				if (this.mediaEditData.name) {
					return;
				}
			}
			else {
				if (this.mediaEditData.albumIndex != '') {
					return;
				}
			}
			alert('column required');
			e.preventDefault();
			return false;
		}
	},

	computed: {

		mediaListShow: function() {

			var arr = [];
			if (parseInt(this.mediaType) === 0) {
				for (var i = 0; i < this.mediaList.length; i ++) {
					if (this.mediaList[i].MEDIA_TYPE === 0) {
						arr.push(this.mediaList[i]);
					}
				}
			}
			else {
				if (this.albumId) {
					for (var j = 0; j < this.mediaList.length; j ++) {
						if (this.mediaList[j].MEDIA_ALBUM == this.albumId) {
							arr.push(this.mediaList[j]);
						}
					}
				}
				else {
					for (var k = 0; k < this.mediaList.length; k ++) {
						if (this.mediaList[k].MEDIA_TYPE === 1) {
							arr.push(this.mediaList[k]);
						}
					}
				}
			}
			return arr;
		}
	},

	filters: {

		createTimeFilter: function(t) {

			var time = new Date(t);
			return time.toLocaleString();
		},

		mediaPublishedFilter: function(status) {

			var list = ['未发布', '已发布'];
			return list[status];
		}
	}
});