$.ajax({
	url: 'getAlbumList',
	method: 'get',
	dataType: 'json',
	success: function(data) {
		var albumList = $('#album_list');
		for (var i = 0; i < data.length; i ++) {
			var album = data[i];
			albumList.append('<option value="' + album.ALBUM_ID + '">' + album.ALBUM_NAME + '</option>');
		}
	}
});
$.ajax({
	url: 'getMediaList',
	method: 'get',
	dataType: 'json',
	success: function(data) {
		var mediaList = $('#media_list');
		for (var i = 0; i < data.length; i ++) {
			var media = data[i];
			var mediaName;
			if (media.MEDIA_TYPE == 0) {
				mediaName = media.MEDIA_NAME;
			}
			else {
				mediaName = 'id:' + media.MEDIA_ID + ', 专辑:' + media.MEDIA_ALBUM + ', 序号:' + media.MEDIA_ALBUM_INDEX;
			}
			mediaList.append('<option value="' + media.MEDIA_ID + '">' + mediaName + '</option>');
		}
	}
});