seque_load_js
=============

automatic seque load .js files
动态顺序加载JS文件。

什么地方可以使用？
=============
当你想动态顺序加载JS文件时就可以使用了。
例如你的代码为:
xxxloadJS("xxx_1.js",a);
function a(){
//TODO
  xxxloadJS("xxx_2.js",b);
}

function b(){
//TODO
xxxloadJS("xxx_3.js",xxx);
}

function xxxloadJS(jsfile,callback){
//TODO
}
这时你就可以使用loadJS替代了,替代后的代码为:
var jsList = [
                         "xxx_1.js",
                         "xxx_2.js",
                         "xxx_3.js",
                  ];
loadJS(jsList );
非常干净整洁，你认为呢？

怎样使用?
=============
<script src="seque-loadjs.js"></script>
<script type="text/javascript">

function test1(name){
	//TODO
}

function test2(target, data){
	//TODO
}

function test3(){
	//TODO
}

var jsList = [
			  "test_01.js",
			  ['test_02.js',test1,"name"],
                          ['test_03.js',test2,"target","data"]
              ];

/**
* jsList支持两种类型
* 一、字符串xxxx.js
*	"xxxx.js"
* 二、数组含回调
*	["xxxx.js",function,params,...]
*
*/
	
//例1:      
loadJS(jsList);//加载jsList   
//例2:      
loadJS(jsList,test3);//加载jsList,回调test3   
//例3:
loadJS(jsList,test1,"target","data");//加载jsList,回调test1("target","data")
//例4:
loadJS("test_02.js");//加载单个JS
//例5:
loadJS("test_02.js",test3);//加载单个JS,回调
//例6:
loadJS("test_01.js",test1,"target","data");//加载单个JS,回调test1("target","data")
</script>
