var vm = new Vue({

	el: '#albums',

	data: {

		editMode: false,
		albumList: [],
		albumAddData: {
			name: '',
			length: ''
		},
		albumEditData: {
			id: '',
			name: '',
			length: 0,
			cover: '',
			title: ''
		}
	},

	beforeMount: function() {

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

	methods: {

		deleteAlbum: function(e) {

			if (confirm('确定删除？')) {
				return true;
			}
			else {
				e.preventDefault();
				return false;
			}
		},
		showEdit: function(album) {

			this.editMode = true;
			this.albumEditData.id = album.ALBUM_ID;
			this.albumEditData.name = album.ALBUM_NAME;
			this.albumEditData.length = album.ALBUM_LENGTH;
			this.albumEditData.cover = album.ALBUM_COVER;
			this.albumEditData.title = album.ALBUM_TITLE;
		},
		cancelEdit: function() {

			this.editMode = false;
		},
		checkAddForm: function(e) {

			if (this.albumAddData.name && this.albumAddData.length) {
				return;
			}
			alert('name and length required');
			e.preventDefault();
			return false;
		},
		checkEditForm: function(e) {

			if (this.albumEditData.name && this.albumEditData.length) {
				return;
			}
			alert('name and length required');
			e.preventDefault();
			return false;
		}
	},

	filters: {

		createTimeFilter: function(t) {

			var time = new Date(t);
			return time.toLocaleString();
		},

		albumStatusFilter: function(status) {

			var list = ['未完结', '已完结'];
			return list[status];
		},

		albumPublishedFilter: function(status) {

			var list = ['未发布', '已发布'];
			return list[status];
		}
	}
});