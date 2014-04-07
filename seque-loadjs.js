
// 全局js列表
var jsArray = {};
/*
*
*	动态顺序加载JS
*
*	var jsList = [
* 			  		    "xxxx.js",
*			  		      ['xxxx.js',function,params],
*              ];
*	Test 1:      
*	loadJS(jsList);//加载jsList  
* 
*	Test 2:      
*	loadJS(jsList,function);//加载jsList,回调function  
*
*	Test 3:
*	loadJS(jsList,function,param1,param2);//加载jsList,回调function(param1,param2)
*
*	Test 4:
*	loadJS("xxxx.js");//加载单个JS
*
*	Test 5:
*	loadJS("xxxx.js",function);//加载单个JS,回调function()
*
*	Test 6:
*	loadJS("xxxx.js",function,param1,param2);//加载单个JS,回调function(param1,param2)
*/
loadJS = function(scriptList, callback) {
	var args = Array.prototype.slice.call(arguments);
	var len = scriptList.length;
	var len_inc = 0;
	if (scriptList instanceof Array) {
		return seque_load_js();
	} else if (typeof (scriptList) == "string") {
		return loadScript(scriptList, tmp_callback);
	}

	function tmp_callback() {
		if(callback){
			callback.apply(null, args.slice(2));
		}
	}
	// 批配二维数组
	function tmp_callback2(callback, func, args) {
		if (func) {
			func.apply(null, args);
		}
		if (callback) {
			callback();
		}
	}

	//
	function seque_load_js() {
		if (len_inc < len) {
			loadScript(scriptList[len_inc++], seque_load_js);
		} else if (callback) {
			callback.apply(null, args.slice(2));
		}
	}

	// load
	function loadScript(scriptName, callback) {

		if (typeof (scriptName) !== "undefined" && scriptName instanceof Array) {
			callback = tmp_callback2(callback, scriptName[1], scriptName
					.slice(2));
			scriptName = scriptName[0];
		}
		//cached
		if (typeof (scriptName) !== "undefined" && !jsArray[scriptName]) {
			jsArray[scriptName] = true;

			var body = document.getElementsByTagName('body')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = scriptName;

			if (script.readyState) {// 兼容IE
				script.onreadystatechange = function() {
					if (script.readyState === "loaded"
							|| script.readyState === "complete") {
						script.onreadystatechange = null;
						if (callback) {
							callback();
						}
					}
				};
			} else {
				script.onload = callback;
			}

			body.appendChild(script);
		} else if (callback) {
			callback();
		}
	}
}
