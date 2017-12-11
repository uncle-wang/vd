$.ajax({
	url: 'getAlbumList',
	method: 'get',
	dataType: 'json',
	success: function(data) {
		var albumList = $('#album_list');
		for (var i = 0; i < data.length; i ++) {
			albumList.append('<option value="' + data[i].ALBUM_ID + '">' + data[i].ALBUM_NAME + '</option>');
		}
	}
});