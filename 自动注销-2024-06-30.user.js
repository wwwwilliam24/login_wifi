// ==UserScript==
// @name         自动注销
// @namespace    http://tampermonkey.net/
// @version      2024-06-30
// @description  try to take over the world!
// @author       You
// @match        http://query.bfa.edu.cn/dashboard
// @match        http://query.bfa.edu.cn/
// @match        http://query.bfa.edu.cn/login/?302=LI
// @match        http://query.bfa.edu.cn/login/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bfa.edu.cn
// @grant        none
// ==/UserScript==

// user_account、user_password 分别是账号和密码
var user_account = '2007';
var user_password = '060524';

// 各个控件的 selector
var boxOfLogin = '#loginSet > div > div';
var inputOfAccount = '#account';
var inputOfPassword = '#password';
var buttonOfLogin = '#loginSet > div > div > form > div:nth-child(5) > button';
var buttonOfBack = '#edit_body > div:nth-child(2) > div.edit_loginBox.ui-resizable-autohide > form > input';
// 注销按钮暂时用不上，还是旧的，没改
var buttonOfLogout = 'body > div.view-main > div > div:nth-child(2) > div.col-md-3.col-sm-4.hidden-xs > div > div > p.text-center > a';

// 自动刷新页面函数
function autoRefresh() {
    console.log("自动刷新页面");
    location.reload();
}

// 登录函数
function login() {
    console.log("正在进行登录操作");
    // 自动填写账号密码到输入框
    document.querySelector(inputOfAccount).value = user_account;
    document.querySelector(inputOfPassword).value = user_password;
    // 自动点击登录按钮
    window.setTimeout(function () { document.querySelector(buttonOfLogin).click() }, 200);
}

// 登录后的重复操作函数
function repeatActions() {
    for (let i = 1; i <= 5; i++) {
        const macSelector = `#OnlineLisBig > tbody > tr:nth-child(${i}) > td:nth-child(3)`;
        const ipSelector = `#OnlineLisBig > tbody > tr:nth-child(${i}) > td:nth-child(2)`;
        const actionSelector = `#OnlineLisBig > tbody > tr:nth-child(${i}) > td:nth-child(7) > a`;

        const macElement = document.querySelector(macSelector);
        const ipElement = document.querySelector(ipSelector);
        const actionElement = document.querySelector(actionSelector);

        if (macElement && actionElement && ipElement) {
            const mac = macElement.textContent;
            const ip = ipElement.textContent;
            if (mac !== '00-00-00-00-00-00' && mac !== 'F2-47-8C-8A-28-07' || ip !== '10.4.43.22' && ip !== "10.3.33.22") {
                // 只有当文本不等于 '00-00-00-00-00-00' 和 'F2-47-8C-8A-28-07' 时执行点击操作
                console.log(`Element ${i}: ${mac}`);
                actionElement.click(); // 点击对应的元素
                // 在这里可以执行你需要的点击操作
                window.setTimeout(function () {
                    var button = document.querySelector('body > div.sweet-alert.showSweetAlert.visible > div.sa-button-container > div > button');
                    if (button) {
                        button.click();
                    } else {
                        console.error('Button not found!');
                    }
                }, 1000);
            }
        } else {
            console.log(`Element ${i} not found`);
        }
    }
}

(function () {
    'use strict';
    // Your code here..
    window.setTimeout(function () {
        //判断输入框是否存在
        if ($(boxOfLogin).length == 1) {
            console.log("登录框存在");
            login();
        }
    }, 300);

     // 执行登录后的第一次操作
    window.setTimeout(function () {
        repeatActions();
    }, 500); // 延时 0.5 秒执行，确保登录成功后再执行

     setInterval(autoRefresh, 5000); // 每5秒刷新一次页面
})();
