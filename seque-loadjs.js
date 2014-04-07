/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
 
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
