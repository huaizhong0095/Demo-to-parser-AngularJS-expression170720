/**
 * Created by Administrator on 2016/7/20.
 */
angular.module("6nd",[])
    .controller("6nd",function($scope,$parse,$interpolate){
        $scope.$watch("expr",function(newValue,oldValue,scope){
            if(newValue!=oldValue){
                var parseFun=$parse("expr");
                $scope.parsedValue=parseFun(scope);
            }
        });
        $scope.$watch("emailBody",function(newValue){
            if(newValue){
                var template=$interpolate(newValue);
                $scope.previewText=template({to:$scope.to});
            }
        })

    });
/*
* 编写一个模块
* 在模块中重新配置表达式符号
* 注册一个EmailParser 服务
* 在服务中返回逻辑处理方法
* */
angular.module("emailParser",[])
    .config(["$interpolateProvider",function($interpolateProvider){
        $interpolateProvider.startSymbol("__");
        $interpolateProvider.endSymbol("__");
    }])
    .factory("EmailParser",["$interpolate",function($interpolate){
        return{
            parse:function(text,context){
                var tempalte=$interpolate(text);
                return tempalte(context);
            }
        }
    }]);
/*
* 注册一个angular 模块 ，并将前面的emailparser 模块
*  注册控制器时 注入前面注册的Emailparser服务
* */
angular.module("ng6-2",["emailParser"])
    .controller("ng6-2Controllr",["$scope","EmailParser",function($scope,EmailParser){
        //设置监听
        $scope.$watch("emailBody",function(newValue){
            if(newValue){
                $scope.previewText=EmailParser.parse(newValue,{to:$scope.to})
            }
        })
    }])
