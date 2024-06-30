// ==UserScript==
// @name         校园网自动登录
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  校园网快速登录
// @author       You
// @match        http://login.bfa.edu.cn/
// @match        http://login.bfa.edu.cn/a79.htm
// @match        http://loginwifi.bfa.edu.cn/
// @grant        none
// @license MIT
// ==/UserScript==
//更新后记得把学号和密码改成你们自己的！！！
// 如果有bug请及时反馈

// user_account、user_password 分别是账号和密码，账号是你的学号（10位），密码不是身份证后六位了，和统一认证登陆一样了
var user_account='2007';
var user_password='060524';


// 获取当前时间，并截取周的单位和小时的单位
var curr_time=new Date();
var curr_Day=curr_time.getDay();
var curr_Hours=curr_time.getHours();
console.log('当前时间为 '+curr_time);
console.log('当前为第 '+curr_Day+' 周');
console.log('当前时间为 '+curr_time+' 时');

// 各个控件的 selector
var boxOfLogin='#edit_body > div:nth-child(3) > div.edit_loginBox.normal_box.random.loginuse.loginuse_pc.ui-resizable-autohide > form';
var inputOfAccount='#edit_body > div:nth-child(3) > div.edit_loginBox.normal_box.random.loginuse.loginuse_pc.ui-resizable-autohide > form > input:nth-child(4)';
var inputOfPassword='#edit_body > div:nth-child(3) > div.edit_loginBox.normal_box.random.loginuse.loginuse_pc.ui-resizable-autohide > form > input:nth-child(5)';
var buttonOfLogin='#edit_body > div:nth-child(3) > div.edit_loginBox.normal_box.random.loginuse.loginuse_pc.ui-resizable-autohide > form > input:nth-child(2)';
var buttonOfBack='#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > input';
// 注销按钮暂时用不上，还是旧的，没改
var buttonOfLogout='#edit_body > div:nth-child(2) > div > form > input';

// 登录函数
function login()
{
    console.log("正在进行登录操作");
    // 自动填写账号密码到输入框
    document.querySelector(inputOfAccount).value=user_account;
    document.querySelector(inputOfPassword).value=user_password;
    // 自动点击登录按钮
    window.setTimeout(function(){document.querySelector(buttonOfLogin).click()},200);
}

//输出完整时间
(function()
{
    'use strict';
    // Your code here..
    window.setTimeout(function()
    {
        //判断输入框是否存在
        if( $(boxOfLogin).length == 1 )
        {
            /* 注释掉时间判定，学校不再断网
            //判断是否在登录的时间段，周一至周五早上0-6点不能登录
            if(!(curr_Day>0&&curr_Day<6&&curr_Hours>5||curr_Day==6||curr_Day==0))
            {
                //不在登录时间范围
                console.log("不在登录时间内");alert("不在登录时间内！")
                return;
            }
            */
                console.log("登录框存在");
                login();
                window.setTimeout(function()
                {
                    //有返回按钮存在
                    if(document.querySelector(buttonOfBack).value=="返  回")
                    {
                        document.querySelector(buttonOfBack).click()
                        console.log("存在返回按钮，立即返回，并执行登录操作")
                        login();
                    };
                    console.log("登录成功")
                    window.close();
                }, 1000);
        }
        else
        {
            //输入框不存在
            window.setTimeout(function()
            {
                console.log("登录框不存在");
                //判断注销按钮是否存在
                if(document.querySelector(buttonOfLogout).value=="注  销")
                {
                    console.log("注销按钮存在")
                    window.close();
                }else
                {
                    var choose=confirm("登录框似乎不存在，是否刷新页面重试？");
                    window.setTimeout(function()
                    {
                        if (choose)
                        {
                            console.log("刷新页面")
                            window.setTimeout(function()
                            {
                                location.reload();
                            },1000)
                        }
                        else
                        {
                            console.log("用户取消了刷新")
                        };
                    },3000);
                    console.log(choose);
                };
            },1000)
        };
    },300)
})();