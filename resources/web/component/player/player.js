Vue.component('player', {

	props: ['url'],

	data: function() {

		return {

			// video元素
			video: null,
			// 是否正在播放
			playing: false,
			// 是否可以开始播放
			canPlay: false,
			// 总时长
			totalDuration: 0,
			// 当前播放时间
			currentTime: 0,
			// 是否显示控制条
			showControl: false,
			// 是否显示正在加载icon
			showLoading: true,
			// 显示播放按钮
			showPlayButton: true,
			// 进度条距页面左边距的距离，用于拖拽、点击时计算触摸点的位置
			processLeftOffset: 120,
			// 进度控制拖拽的位置
			processDragPos: 0,
			// 已缓冲区域宽度百分比
			bufferedPercent: 0
		};
	},

	methods: {

		// 格式化时间
		_formatTime: function(secTime) {

			var min = Math.floor(secTime / 60);
			var sec = Math.floor(secTime % 60);
			if (min < 10) {
				min = '0' + min;
			}
			if (sec < 10) {
				sec = '0' + sec;
			}
			return min + ':' + sec;
		},

		tlog: function(a) {
			var logDiv = document.querySelector('.logs');
			logDiv.innerHTML = logDiv.innerHTML + '<p>' + a + '</p>';
			console.log(a);
		},

		// 播放
		play: function() {
			this.video.play();
		},
		// 暂停
		pause: function() {
			this.video.pause();
		},

		// 全屏
		enterFullScreen: function() {
			this.video.webkitEnterFullscreen();
		},

		// 切换控制条显示状态
		toggleControl: function() {
			this.showControl = !this.showControl;
		},

		// 点击进度条时跳转进度
		moveProgress: function(e) {
			var processList = this.$el.querySelector('.player-process-list');
			var processListWidth = processList.clientWidth || processList.offsetWidth;
			this.currentTime = this.totalDuration * e.offsetX / processListWidth;
			this.video.currentTime = this.currentTime;
		},
		// 触摸进度条按钮时暂停播放
		touchStart: function(e) {
			this.pause();
		},
		touchMove: function(e) {
			var offsetLeft = this.processLeftOffset;
			var processList = this.$el.querySelector('.player-process-list');
			var processListWidth = processList.clientWidth || processList.offsetWidth;
			var processEnd = e.targetTouches[0].pageX || e.targetTouches[0].clientX;
			processEnd = Math.max(offsetLeft, processEnd);
			processEnd = Math.min(processListWidth + offsetLeft, processEnd);
			this.processDragPos = processEnd;
			this.currentTime = (processEnd - offsetLeft) * this.totalDuration / processListWidth;
		},
		touchEnd: function(e) {
			this.video.currentTime = this.currentTime;
			this.play();
		}
	},

	computed: {

		// 当前播放时间(格式化用于显示)
		formatCurrentTime: function() {

			return this._formatTime(this.currentTime);
		},
		// 视频总时长(格式化用于显示)
		formatTotalDuration: function() {

			return this._formatTime(this.totalDuration);
		},
		// 当前播放百分比
		playedPercent: function() {

			var percent = this.currentTime / this.totalDuration;
			if (percent !== percent) {
				percent = 0;
			}
			return percent * 100 + '%';
		}
	},

	template: '\
		<div class="player-box">\
			<video class="player-video" type="application/x-mpegURL" webkit-playsinline="isiPhoneShowPlaysinline" playsinline="isiPhoneShowPlaysinline" x-webkit-airplay preload="preload"></video>\
			<div class="player-layer" @click="toggleControl"></div>\
			<div class="player-control-wrap" v-show="showControl">\
				<div class="player-control-bar" :style="{paddingLeft: processLeftOffset + \'px\'}">\
					<div class="player-btn-wrap">\
						<a class="player-btn-play" v-show="!playing" @click="play">\
							<svg viewBox="0 0 56 56" width="100%" height="100%">\
								<path style="fill:#fff" d="M14.569 13.867s-.563 1.42-.563 14.059.563 14.188.563 14.188a1.925 1.925 0 0 0 2.8 1.677s2.938-.442 14.763-6.211 13.8-7.914 13.8-7.914a1.859 1.859 0 0 0 0-3.352s-3.24-2.875-13.8-8.095c-10.444-5.165-14.767-6.029-14.767-6.029a1.924 1.924 0 0 0-2.796 1.677z"></path>\
							</svg>\
						</a>\
						<a class="player-btn-pause" v-show="playing" @click="pause">\
							<svg viewBox="0 0 56 56" width="100%" height="100%">\
								<path style="fill:#fff" d="M39 49a4 4 0 0 1-4-4V11a4 4 0 0 1 4-4 4 4 0 0 1 4 4v34a4 4 0 0 1-4 4zm-22 0a4 4 0 0 1-4-4V11a4 4 0 0 1 4-4 4 4 0 0 1 4 4v34a4 4 0 0 1-4 4z"></path>\
							</svg>\
						</a>\
					</div>\
					<div class="player-time-wrap">{{formatCurrentTime + \'/\' + formatTotalDuration}}</div>\
					<div class="player-process-wrap">\
						<div class="player-process-list" @click="moveProgress">\
							<div class="player-process-load" :style="{width: bufferedPercent}"></div>\
							<div class="player-process-play" :style="{width: playedPercent}"></div>\
						</div>\
						<div class="player-process-btn" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" :style="{left: playedPercent}">\
							<a class="player-process-indicator"></a>\
						</div>\
					</div>\
					<div class="player-full-wrap">\
						<a class="player-btn-enterfull" @click="enterFullScreen">\
							<svg viewBox="0 0 48 48" width="100%" height="100%">\
								<path style="fill:#fff" d="M9.5 37h10a1.5 1.5 0 0 1 0 3h-10a1.5 1.5 0 0 1 0-3zm0-10a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-3 0v-10A1.5 1.5 0 0 1 9.5 27zM8.43 37.353L19.353 26.43a1.545 1.545 0 1 1 2.185 2.184L10.614 39.538a1.545 1.545 0 1 1-2.184-2.185zM28.5 8h10a1.5 1.5 0 0 1 0 3h-10a1.5 1.5 0 0 1 0-3zm10 0A1.5 1.5 0 0 1 40 9.5v10a1.5 1.5 0 0 1-3 0v-10A1.5 1.5 0 0 1 38.5 8zM26.43 19.354L37.353 8.43a1.545 1.545 0 0 1 2.185 2.184L28.614 21.538a1.545 1.545 0 0 1-2.184-2.184z"></path>\
							</svg>\
						</a>\
					</div>\
				</div>\
			</div>\
			<div class="player-button-wrap" v-show="showPlayButton">\
				<a class="player-button" @click="play">\
					<svg viewBox="0 0 56 56" width="100%" height="100%">\
						<path style="fill:#fff" d="M14.569 13.867s-.563 1.42-.563 14.059.563 14.188.563 14.188a1.925 1.925 0 0 0 2.8 1.677s2.938-.442 14.763-6.211 13.8-7.914 13.8-7.914a1.859 1.859 0 0 0 0-3.352s-3.24-2.875-13.8-8.095c-10.444-5.165-14.767-6.029-14.767-6.029a1.924 1.924 0 0 0-2.796 1.677z"></path>\
					</svg>\
				</a>\
			</div>\
			<div class="player-loading" v-show="showLoading"><div class="player-loading-icon"></div></div>\
		</div>\
	',

	mounted: function() {

		var _self = this;
		// loading动画
		var pos = 0;
		var loading = function() {
			var offset = (-15 * pos) + 'px';
			var loadingIcon = _self.$el.querySelector('.player-loading-icon');
			loadingIcon.style.backgroundPositionY = offset;
			setTimeout(function() {
				pos = (pos + 1) % 30;
				loading();
			}, 30);
		};
		loading();
	},

	watch: {

		url: function(url) {
	
			var _self = this;

			if (url) {

				_self.video = _self.$el.querySelector('video.player-video');

				// 判断是否支持hls
				if (Hls.isSupported()) {
					var hls = new Hls();
					hls.attachMedia(_self.video);
					hls.on(Hls.Events.MEDIA_ATTACHED, function () {
						hls.loadSource(_self.url);
					});
				}
				else {
					_self.video.setAttribute('src', _self.url);
				}

				// 绑定事件
				// 视频就绪
				_self.video.oncanplaythrough = function() {
					_self.canPlay = true;
					_self.showLoading = false;
				};
				// 时长变化
				_self.video.ondurationchange = function() {
					_self.totalDuration = Math.floor(_self.video.duration);
				};
				// 播放
				_self.video.onplay = function() {
					_self.playing = true;
					_self.showPlayButton = false;
				};
				// 暂停
				_self.video.onpause = function() {
					_self.playing = false;
				};
				// 播放进度发生变化
				_self.video.ontimeupdate = function() {
					_self.currentTime = Math.floor(_self.video.currentTime);
				};
				_self.video.onwaiting = function() {
					_self.showLoading = true;
				};
				_self.video.onseeking = function() {
					_self.showLoading = true;
				};

				_self.video.onerror = function() {
					_self.tlog('error');
				};
				_self.video.onstalled = function() {
					_self.tlog('网速失速');
				};
				_self.video.onended = function() {
					_self.tlog('ended');
				};

				// 更新已缓冲区域
				var updateBuffered = function() {
					setInterval(function() {
						var pos = 0;
						var buffered = _self.video.buffered;
						var currentTime = _self.video.currentTime;
						// 计算当前播放时间在第几段缓冲区域内，并取该段区域的结束位置作为计算已缓冲区域百分比的节点
						for (var i = 0; i < buffered.length; i ++) {
							var bufferedStart = buffered.start(i), bufferedEnd = buffered.end(i);
							if (currentTime >= bufferedStart && currentTime <= bufferedEnd) {
								_self.bufferedPercent = (bufferedEnd * 100 / _self.totalDuration) + '%';
								break;
							}
						}
					}, 500);
				};
				updateBuffered();
			}
		}
	}
});