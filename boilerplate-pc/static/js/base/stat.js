;(function() {
	/**
	 * 固定统计类别和动作参数
	 * @param  {string} category 类别
	 * @param  {string} action   动作
	 * @return {function}          统计函数
	 */
	window._curryStat = function(category, action) {
		window._hmt = window._hmt || [];
		window.ga = window.ga || function() {};
			
		return function(label, url) {
			if (url) setTimeout(function() { window.location.href=url }, 100)
			// 百度统计
			window._hmt.push(['_trackEvent', category, action, label]);
			// google统计
		 window.ga('send', 'event', category, action, label);
		}
	}

	/**
	 * 加载百度统计和Google统计脚本
	 */
	function loadStatistics() {
		setTimeout(function() {
		  var hm = document.createElement("script");
		  hm.src = "//hm.baidu.com/hm.js?258b16a347a85b76f0811b9c6c533dda";
		  var s = document.getElementsByTagName("script")[0];
		  s.parentNode.insertBefore(hm, s);

		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  window.ga('create', 'UA-251384-16', 'auto');
		  window.ga('send', 'pageview');

		}, 100)
	}

	/**
	 * 为了防止被墙导致webview一直显示在加载，统计脚本在load事件后延迟100毫秒进行加载
	 */
	if (typeof addEventListener === 'function') {
		window.addEventListener('load', loadStatistics, false);
	} else if (typeof attachEvent === 'function') {
		window.attachEvent('onload', loadStatistics);
	} else {
		window.onload = loadStatistics;
	}

})();
