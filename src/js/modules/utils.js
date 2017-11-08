import storage from './storage'
export const Storage = storage

export const formatTime = function(value) {
  var sec = Number(value);
  var min = 0;
  var hour = 0;
  //alert(sec);
  if(sec > 60) {
    min = Number(sec/60);
    sec = Number(sec%60);
    //alert(min+"-"+sec);
    if(min > 60) {
      hour = Number(min/60);
      min = Number(sec%60);
    }
  }
  var secTemp =  String( parseInt(sec));
  if(secTemp.length==1)
    secTemp = "0"+secTemp;

  var result = secTemp;
  var minTemp = String( parseInt(min));
  if(minTemp.length==1)
    minTemp = "0"+minTemp;
  result = minTemp+":"+result;

  if(hour > 0) {
    result = ""+parseInt(hour)+":"+result;
  }
  return result;
};

export function sleep(ms = 0) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

// -- open popup window -- start
var _bg_view = null ;
function getBackgroundView() {
	if (!_bg_view) {
		_bg_view = chrome.extension.getBackgroundPage();
		if (!_bg_view) {
			var views = chrome.extension.getViews({});
			for (var i = 0, l = views.length; i < l; i++) {
				var view = views[i];
				if (view.theViewName && view.theViewName === 'background') {
					_bg_view = view;
					break;
				}
			}
		}
	}
	return _bg_view;
}

function decodeForm(form) {
				var list = [];
				var nvps = form.split('&');
				for (var n = 0; n < nvps.length; ++n) {
						var nvp = nvps[n];
						if (nvp == '') {
								continue;
						}
						var equals = nvp.indexOf('=');
						var name;
						var value;
						if (equals < 0) {
								name = OAuth.decodePercent(nvp);
								value = null;
						} else {
								name = OAuth.decodePercent(nvp.substring(0, equals));
								value = OAuth.decodePercent(nvp.substring(equals + 1));
						}
						list.push([name, value]);
				}
				return list;
		}

function _getWindowId(callback) {
	var params = decodeForm(window.location.search);
	if (params.windowId) {
		callback(params.windowId);
	} else {
		chrome.tabs.getSelected(null , function(tab) {
			callback(tab.windowId);
		});
	}
}

export function openPopupInNewWin(windowId) {
	_getWindowId(function(windowId) {
		// initOnUnload();
		// var settings = Settings.get();
		// var args_str = _get_open_window_args(settings.popupWidth, settings.popupHeight);
		window.theViewName = 'not_popup';
		var url = 'popup.html?is_new_win=true';
		if (windowId) {
			url += '&windowId=' + windowId;
		}
		getBackgroundView().new_win_popup.window = window.open(url, '163music', 'width=410,height=660' );
	});
}
// -- open popup window -- end
