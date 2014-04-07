seque_load_js
=============

automatic seque load .js files
动态顺序加载JS文件。

什么地方可以使用？
=============
当你想动态顺序加载JS文件时就可以使用了。

例如你的代码为:

xxxloadJS("xxx_1.js",a);

function a(){<br/>
    //TODO<br/>
　　xxxloadJS("xxx_2.js",b);
  
}
<br/>
function b(){<br/>
    //TODO<br/>
　　xxxloadJS("xxx_3.js",xxx);<br/>
}<br/>

function xxxloadJS(jsfile,callback){<br/>
//TODO<br/>
}<br/>
这时你就可以使用loadJS替代了,替代后的代码为:<br/>
var jsList = [<br/>
                     "xxx_1.js",<br/>
                     "xxx_2.js",<br/>
                     "xxx_3.js",<br/>
                  ];<br/>
loadJS(jsList );<br/>
非常干净整洁，你认为呢？

怎样使用?
=============
< script src="seque-loadjs.js">< / script><br/>
< script type="text/javascript"><br/>

function test1(name){<br/>
	//TODO<br/>
}
<br/>
function test2(target, data){<br/>
	//TODO<br/>
}<br/>

function test3(){<br/>
	//TODO<br/>
}
<br/>
var jsList = [<br/>
			  "test_01.js",<br/>
			  ['test_02.js',test1,"name"],<br/>
                          ['test_03.js',test2,"target","data"]<br/>
              ];<br/>

/**
* jsList支持两种类型
* 一、字符串xxxx.js
*	"xxxx.js"
* 二、数组含回调
*	["xxxx.js",function,params,...]<br/>
*<br/>
*/
	
//例1:<br/>      
loadJS(jsList);//加载jsList   <br/>
//例2:<br/>
loadJS(jsList,test3);//加载jsList,回调test3   <br/>
//例3:<br/>
loadJS(jsList,test1,"target","data");//加载jsList,回调test1("target","data")<br/>
//例4:<br/>
loadJS("test_02.js");//加载单个JS<br/>
//例5:<br/>
loadJS("test_02.js",test3);//加载单个JS,回调<br/>
//例6:<br/>
loadJS("test_01.js",test1,"target","data");//加载单个JS,回调test1("target","data")<br/>
</ script><br/>

尝试一下吧:)~
=============
在控制台你会看到js文件是顺序加载的。
