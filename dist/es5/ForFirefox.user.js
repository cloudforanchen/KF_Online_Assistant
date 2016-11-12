// ==UserScript==
// @name        KF Online助手
// @namespace   https://greasyfork.org/users/4514
// @icon        https://git.oschina.net/miaolapd/KF_Online_Assistant/raw/master/icon.png
// @author      喵拉布丁
// @homepage    https://github.com/miaolapd/KF_Online_Assistant
// @description KFOL必备！为绯月Galgame论坛增加了大量人性化、自动化的功能，更多功能开发中……
// @updateURL   https://git.oschina.net/miaolapd/KF_Online_Assistant/raw/master/dist/es5/ForFirefox.meta.js
// @downloadURL https://git.oschina.net/miaolapd/KF_Online_Assistant/raw/master/dist/es5/ForFirefox.user.js
// @require     https://cdn.css.net/libs/babel-polyfill/6.16.0/polyfill.min.js
// @require     https://git.oschina.net/miaolapd/KF_Online_Assistant/raw/master/dist/lib/jquery.min.js?V2.2.4
// @include     http://*2dkf.com/*
// @include     http://*ddgal.com/*
// @include     http://*9moe.com/*
// @include     http://*kfgal.com/*
// @version     7.0
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @run-at      document-end
// @license     MIT
// @include-jquery   true
// @use-greasemonkey true
// ==/UserScript==
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Info = require('./module/Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./module/Util');

var Util = _interopRequireWildcard(_Util);

var _Const = require('./module/Const');

var _Const2 = _interopRequireDefault(_Const);

var _Config = require('./module/Config');

var _Log = require('./module/Log');

var _Public = require('./module/Public');

var Public = _interopRequireWildcard(_Public);

var _Index = require('./module/Index');

var Index = _interopRequireWildcard(_Index);

var _Read = require('./module/Read');

var Read = _interopRequireWildcard(_Read);

var _Post = require('./module/Post');

var Post = _interopRequireWildcard(_Post);

var _Other = require('./module/Other');

var Other = _interopRequireWildcard(_Other);

var _Bank = require('./module/Bank');

var Bank = _interopRequireWildcard(_Bank);

var _Card = require('./module/Card');

var Card = _interopRequireWildcard(_Card);

var _Item = require('./module/Item');

var Item = _interopRequireWildcard(_Item);

var _Loot = require('./module/Loot');

var Loot = _interopRequireWildcard(_Loot);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 版本号
var version = '7.0';

$(function () {
    if (typeof jQuery === 'undefined') return;
    var startDate = new Date();
    //console.log('【KF Online助手】启动');
    _Info2.default.version = version;
    if (!Public.getUidAndUserName()) return;
    Public.addPolyfill();
    (0, _Config.init)();
    (0, _Log.init)();
    Public.checkBrowserType();
    Public.appendCss();
    Public.addConfigAndLogDialogLink();
    if (Config.animationEffectOffEnabled) $.fx.off = true;

    if (Config.customScriptEnabled) Public.runCustomScript(1);
    Public.repairBbsErrorCode();
    window.addEventListener('beforeunload', Public.preventCloseWindowWhenActioning);
    if (Config.showSearchLinkEnabled) Public.addSearchDialogLink();
    Public.bindSearchTypeSelectMenuClick();
    Public.makeSearchByBelowTwoKeyWordAvailable();
    if (Config.modifySideBarEnabled) Public.modifySideBar();
    if (Config.addSideBarFastNavEnabled) Public.addFastNavForSideBar();
    if (_Info2.default.isInHomePage) {
        Index.handleAtTips();
        Index.addSearchTypeSelectBoxInHomePage();
        if (Config.smLevelUpAlertEnabled) Index.smLevelUpAlert();
        if (Config.smRankChangeAlertEnabled) Index.smRankChangeAlert();
        if (Config.showVipSurplusTimeEnabled) Index.showVipSurplusTime();
        if (Config.homePageThreadFastGotoLinkEnabled) Index.addHomePageThreadFastGotoLink();
        if (Config.fixedDepositDueAlertEnabled && !Util.getCookie(_Const2.default.fixedDepositDueAlertCookieName)) Bank.fixedDepositDueAlert();
    } else if (location.pathname === '/read.php') {
        if (Config.turnPageViaKeyboardEnabled) Public.turnPageViaKeyboard();
        Read.fastGotoFloor();
        if (Config.adjustThreadContentWidthEnabled) Public.adjustThreadContentWidth();
        Read.adjustThreadContentFontSize();
        Read.showAttachImageOutsideSellBox();
        if (Config.parseMediaTagEnabled) Read.parseMediaTag();
        if (Config.modifyKFOtherDomainEnabled) Read.modifyKFOtherDomainLink();
        if (Config.customSmColorEnabled) Read.modifySmColor();
        if (Config.customMySmColor) Read.modifyMySmColor();
        if (Config.multiQuoteEnabled) Read.addMultiQuoteButton();
        Read.addFastGotoFloorInput();
        Read.addFloorGotoLink();
        Read.addCopyBuyersListLink();
        Read.addStatRepliersLink();
        Read.handleBuyThreadBtn();
        if (Config.batchBuyThreadEnabled) Read.addBatchBuyThreadButton();
        if (Config.showSelfRatingLinkEnabled) Read.addSelfRatingLink();
        if (Config.userMemoEnabled) Read.addUserMemo();
        Read.addCopyCodeLink();
        Read.addMoreSmileLink();
    } else if (location.pathname === '/thread.php') {
        if (Config.highlightNewPostEnabled) Other.highlightNewPost();
        if (Config.showFastGotoThreadPageEnabled) Other.addFastGotoThreadPageLink();
    } else if (/\/kf_fw_ig_my\.php$/i.test(location.href)) {
        Item.enhanceMyItemsPage();
        Item.addBatchUseAndConvertItemTypesButton();
    } else if (/\/kf_fw_ig_renew\.php$/i.test(location.href)) {
        Item.addBatchConvertEnergyAndRestoreItemsLink();
    } else if (/\/kf_fw_ig_renew\.php\?lv=\d+$/i.test(location.href)) {
        Item.addConvertEnergyAndRestoreItemsButton();
    } else if (/\/kf_fw_ig_my\.php\?lv=\d+$/i.test(location.href)) {
        Item.addSellAndUseItemsButton();
    } else if (/\/kf_fw_ig_my\.php\?pro=\d+/i.test(location.href)) {
        Item.modifyItemDescription();
        if (/\/kf_fw_ig_my\.php\?pro=\d+&display=1$/i.test(location.href)) {
            Item.addSampleItemTips();
        }
    } else if (location.pathname === '/kf_fw_ig_shop.php') {
        Item.addBatchBuyItemsLink();
    } else if (location.pathname === '/kf_fw_ig_index.php') {
        Loot.enhanceLootIndexPage();
    } else if (location.pathname === '/kf_fw_ig_pklist.php') {
        Loot.addUserLinkInPkListPage();
    } else if (/\/hack\.php\?H_name=bank$/i.test(location.href)) {
        Bank.addBatchTransferButton();
        Bank.handleInBankPage();
    } else if (/\/kf_fw_card_my\.php$/i.test(location.href)) {
        Card.addStartBatchModeButton();
    } else if (/\/post\.php\?action=reply&fid=\d+&tid=\d+&multiquote=1/i.test(location.href)) {
        if (Config.multiQuoteEnabled) Post.handleMultiQuote(2);
    } else if (/\/post\.php\?action=quote/i.test(location.href)) {
        Post.removeUnpairedBBCodeInQuoteContent();
    } else if (/\/message\.php\?action=read&mid=\d+/i.test(location.href)) {
        Other.addFastDrawMoneyLink();
        if (Config.modifyKFOtherDomainEnabled) Read.modifyKFOtherDomainLink();
    } else if (/\/message\.php($|\?action=receivebox)/i.test(location.href)) {
        Other.addMsgSelectButton();
    } else if (/\/profile\.php\?action=show/i.test(location.href)) {
        Other.addFollowAndBlockAndMemoUserLink();
    } else if (/\/personal\.php\?action=post/i.test(location.href)) {
        if (Config.perPageFloorNum === 10) Other.modifyMyPostLink();
    } else if (location.pathname === '/kf_growup.php') {
        Other.addAutoChangeIdColorButton();
    } else if (location.pathname === '/guanjianci.php') {
        Other.highlightUnReadAtTipsMsg();
    } else if (/\/profile\.php\?action=modify$/i.test(location.href)) {
        Other.syncModifyPerPageFloorNum();
    } else if (/\/job\.php\?action=preview$/i.test(location.href)) {
        Post.modifyPostPreviewPage();
    } else if (location.pathname === '/search.php') {
        if (Config.turnPageViaKeyboardEnabled) Public.turnPageViaKeyboard();
    } else if (/\/kf_fw_1wkfb\.php\?ping=(2|4)/i.test(location.href)) {
        Other.highlightRatingErrorSize();
    } else if (/\/kf_fw_1wkfb\.php\?do=1/i.test(location.href)) {
        Other.showSelfRatingErrorSizeSubmitWarning();
    } else if (location.pathname === '/kf_no1.php') {
        Other.addUserNameLinkInRankPage();
    } else if (location.pathname === '/faq.php') {
        Other.modifyFaq();
    }
    if (location.pathname === '/post.php') {
        Post.addExtraPostEditorButton();
        Post.addExtraOptionInPostPage();
    }
    if (Config.blockUserEnabled) Public.blockUsers();
    if (Config.blockThreadEnabled) Public.blockThread();
    if (Config.followUserEnabled) Public.followUsers();
    if (_Info2.default.isMobile) Public.bindElementTitleClick();

    var autoSaveCurrentDepositAvailable = Config.autoSaveCurrentDepositEnabled && _Info2.default.isInHomePage;
    var isDonationStarted = false;
    if (Config.autoDonationEnabled && !Util.getCookie(_Const2.default.donationCookieName)) {
        isDonationStarted = true;
        Public.donation(autoSaveCurrentDepositAvailable);
    }

    if (autoSaveCurrentDepositAvailable && !isDonationStarted) Public.autoSaveCurrentDeposit();

    if (Config.autoChangeSMColorEnabled && !Util.getCookie(_Const2.default.autoChangeSMColorCookieName)) Public.changeIdColor();

    if (Config.autoRefreshEnabled && _Info2.default.isInHomePage) Public.startAutoRefreshMode();

    if (Config.customScriptEnabled) Public.runCustomScript(2);

    var endDate = new Date();
    console.log('\u3010KF Online\u52A9\u624B\u3011\u52A0\u8F7D\u5B8C\u6BD5\uFF0C\u52A0\u8F7D\u8017\u65F6\uFF1A' + (endDate - startDate) + 'ms');
});

},{"./module/Bank":2,"./module/Card":3,"./module/Config":4,"./module/Const":6,"./module/Index":9,"./module/Info":10,"./module/Item":11,"./module/Log":12,"./module/Loot":14,"./module/Other":16,"./module/Post":17,"./module/Public":18,"./module/Read":19,"./module/Util":21}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fixedDepositDueAlert = exports.handleInBankPage = exports.addBatchTransferButton = exports.drawCurrentDeposit = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Log = require('./Log');

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 最低转账金额
var minTransferMoney = 20;

/**
 * 给活期帐户存款
 * @param {number} money 存款金额（KFB）
 * @param {number} cash 现金（KFB）
 * @param {number} currentDeposit 现有活期存款（KFB）
 */
var saveCurrentDeposit = function saveCurrentDeposit(money, cash, currentDeposit) {
    var $wait = Msg.wait('正在存款中&hellip;');
    $.post('hack.php?H_name=bank', { action: 'save', btype: 1, savemoney: money }, function (html) {
        if (/完成存款/.test(html)) {
            Public.showFormatLog('存款', html);
            Msg.remove($wait);
            console.log('\u5171\u6709' + money + 'KFB\u5B58\u5165\u6D3B\u671F\u5B58\u6B3E');
            var $account = $('.bank1 > tbody > tr:nth-child(2) > td:contains("当前所持：")');
            $account.html($account.html().replace(/当前所持：-?\d+KFB/, '\u5F53\u524D\u6240\u6301\uFF1A' + (cash - money) + 'KFB').replace(/活期存款：-?\d+KFB/, '\u6D3B\u671F\u5B58\u6B3E\uFF1A' + (currentDeposit + money) + 'KFB'));
            setTimeout(function () {
                $(document).dequeue('Bank');
            }, 5000);
        } else {
            $(document).clearQueue('Bank');
            alert('存款失败');
        }
    });
};

/**
 * 从活期帐户取款
 * @param {number} money 取款金额（KFB）
 */
var drawCurrentDeposit = exports.drawCurrentDeposit = function drawCurrentDeposit(money) {
    var $wait = Msg.wait('正在取款中&hellip;');
    $.post('hack.php?H_name=bank', { action: 'draw', btype: 1, drawmoney: money }, function (html) {
        Msg.remove($wait);
        if (/完成取款/.test(html)) {
            Public.showFormatLog('取款', html);
            console.log('\u4ECE\u6D3B\u671F\u5B58\u6B3E\u4E2D\u53D6\u51FA\u4E86' + money + 'KFB');
            Msg.show('\u4ECE\u6D3B\u671F\u5B58\u6B3E\u4E2D\u53D6\u51FA\u4E86<em>' + money + '</em>KFB', -1);
        } else if (/取款金额大于您的存款金额/.test(html)) {
            Msg.show('取款金额大于当前活期存款金额', -1);
        } else if (/\d+秒内不允许重新交易/.test(html)) {
            Msg.show('提交速度过快', -1);
        } else {
            Msg.show('取款失败', -1);
        }
    });
};

/**
 * 批量转账
 * @param {Array} users 用户列表
 * @param {string} msg 转帐附言
 * @param {boolean} isDeposited 是否已存款
 * @param {number} currentDeposit 现有活期存款
 */
var batchTransfer = function batchTransfer(users, msg, isDeposited, currentDeposit) {
    var successNum = 0,
        failNum = 0,
        successMoney = 0;
    $.each(users, function (index, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            userName = _ref2[0],
            money = _ref2[1];

        $(document).queue('Bank', function () {
            $.ajax({
                type: 'POST',
                url: 'hack.php?H_name=bank',
                timeout: _Const2.default.defAjaxTimeout,
                data: '&action=virement&pwuser=' + Util.getGBKEncodeString(userName) + '&to_money=' + money + '&memo=' + Util.getGBKEncodeString(msg),
                success: function success(html) {
                    Public.showFormatLog('批量转账', html);
                    var msg = '';
                    if (/完成转帐!<\/span>/.test(html)) {
                        successNum++;
                        successMoney += money;
                        msg = userName + ' <em>+' + money + '</em>';
                    } else {
                        failNum++;
                        var errorMsg = '';
                        if (/用户<b>.+?<\/b>不存在<br \/>/.test(html)) {
                            errorMsg = '用户不存在';
                        } else if (/您的存款不够支付转帐/.test(html)) {
                            errorMsg = '存款不足';
                        } else if (/转账额度不足/.test(html)) {
                            errorMsg = '转账额度不足';
                        } else if (/当前等级无法使用该功能/.test(html)) {
                            errorMsg = '当前等级无法使用转账功能';
                        } else if (/转帐数目填写不正确/.test(html)) {
                            errorMsg = '转帐金额不正确';
                        } else if (/自己无法给自己转帐/.test(html)) {
                            errorMsg = '无法给自己转帐';
                        } else if (/\d+秒内不允许重新交易/.test(html)) {
                            errorMsg = '提交速度过快';
                        } else {
                            errorMsg = '未能获得预期的回应';
                        }
                        msg = userName + ':' + money + ' <span class="pd_notice">(' + errorMsg + ')</span>';
                    }
                    $('.pd_result:last').append('<li>' + msg + '</li>');
                },
                error: function error() {
                    failNum++;
                    $('.pd_result:last').append('<li>' + userName + ':' + money + ' <span class="pd_notice">(\u8FDE\u63A5\u8D85\u65F6\uFF0C\u8F6C\u8D26\u53EF\u80FD\u5931\u8D25\uFF0C\u8BF7\u5230' + '<a target="_blank" href="hack.php?H_name=bank&action=log">银行日志</a>里进行确认)</span></li>');
                },
                complete: function complete() {
                    var $remainingNum = $('#pd_remaining_num');
                    $remainingNum.text(parseInt($remainingNum.text()) - 1);
                    var isStop = $remainingNum.closest('.pd_msg').data('stop');
                    if (isStop) $(document).clearQueue('Bank');

                    if (isStop || index === users.length - 1) {
                        if (successNum > 0) {
                            (0, _Log.push)('批量转账', '\u5171\u6709`' + successNum + '`\u540D\u7528\u6237\u8F6C\u8D26\u6210\u529F', { pay: { 'KFB': -successMoney } });
                        }
                        Msg.destroy();
                        var $account = $('.bank1 > tbody > tr:nth-child(2) > td:contains("活期存款：")');
                        $account.html($account.html().replace(/活期存款：-?\d+KFB/, '\u6D3B\u671F\u5B58\u6B3E\uFF1A' + (currentDeposit - successMoney) + 'KFB'));
                        console.log('\u5171\u6709' + successNum + '\u540D\u7528\u6237\u8F6C\u8D26\u6210\u529F\uFF0C\u5171\u6709' + failNum + '\u540D\u7528\u6237\u8F6C\u8D26\u5931\u8D25\uFF0CKFB-' + successMoney);
                        $('.pd_result:last').append('<li><b>\u5171\u6709<em>' + successNum + '</em>\u540D\u7528\u6237\u8F6C\u8D26\u6210\u529F' + ((failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u540D\u7528\u6237\u8F6C\u8D26\u5931\u8D25' : '') + '\uFF1A</b>KFB <ins>-' + successMoney + '</ins></li>'));
                        Msg.show('<strong>\u5171\u6709<em>' + successNum + '</em>\u540D\u7528\u6237\u8F6C\u8D26\u6210\u529F' + ((failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u540D\u7528\u6237\u8F6C\u8D26\u5931\u8D25' : '') + '</strong><i>KFB<ins>-' + successMoney + '</ins></i>'), -1);
                    } else {
                        setTimeout(function () {
                            return $(document).dequeue('Bank');
                        }, 5000);
                    }
                }
            });
        });
    });
    if (!isDeposited) $(document).dequeue('Bank');
};

/**
 * 验证批量转账的字段值是否正确
 * @returns {boolean} 是否正确
 */
var batchTransferVerify = function batchTransferVerify() {
    var $bankUsers = $('#pd_bank_users');
    var users = $bankUsers.val();
    if (!/^\s*\S+\s*$/m.test(users) || /^\s*:/m.test(users) || /:/.test(users) && /:(\D|$)/m.test(users)) {
        alert('用户列表格式不正确');
        $bankUsers.select();
        $bankUsers.focus();
        return false;
    }
    if (/^\s*\S+?:0*[0-1]?\d\s*$/m.test(users)) {
        alert('\u8F6C\u5E10\u91D1\u989D\u4E0D\u80FD\u5C0F\u4E8E' + minTransferMoney + 'KFB');
        $bankUsers.select();
        $bankUsers.focus();
        return false;
    }
    var $bankMoney = $('#pd_bank_money');
    var money = parseInt($.trim($bankMoney.val()));
    if (/^\s*[^:]+\s*$/m.test(users)) {
        if (!$.isNumeric(money)) {
            alert('通用转账金额格式不正确');
            $bankMoney.select();
            $bankMoney.focus();
            return false;
        } else if (money < minTransferMoney) {
            alert('\u8F6C\u5E10\u91D1\u989D\u4E0D\u80FD\u5C0F\u4E8E' + minTransferMoney + 'KFB');
            $bankMoney.select();
            $bankMoney.focus();
            return false;
        }
    }
    return true;
};

/**
 * 添加批量转账的按钮
 */
var addBatchTransferButton = exports.addBatchTransferButton = function addBatchTransferButton() {
    var html = '\n<tr id="pd_bank_transfer">\n  <td style="vertical-align: top;">\u4F7F\u7528\u8BF4\u660E\uFF1A<br>\u6BCF\u884C\u4E00\u540D\u7528\u6237\uFF0C<br>\u5982\u9700\u5355\u72EC\u8BBE\u5B9A\u91D1\u989D\uFF0C<br>\u53EF\u5199\u4E3A\u201C\u7528\u6237\u540D:\u91D1\u989D\u201D<br>\uFF08\u6CE8\u610F\u662F<b>\u82F1\u6587\u5192\u53F7</b>\uFF09<br>\n\u4F8B\u5B50\uFF1A<br><pre style="border: 1px solid #9999ff; padding: 5px;">\u5F20\u4E09\n\u674E\u56DB:200\n\u738B\u4E94:500\n\u4FE1\u4EF0\u98CE</pre></td>\n  <td>\n  <form>\n    <div style="display: inline-block;">\n      <label>\u7528\u6237\u5217\u8868\uFF1A<br>\n        <textarea class="pd_textarea" id="pd_bank_users" style="width: 270px; height: 250px;"></textarea>\n      </label>\n    </div>\n    <div style="display: inline-block; margin-left: 10px;">\n      <label>\u901A\u7528\u8F6C\u5E10\u91D1\u989D\uFF08\u5982\u6240\u6709\u7528\u6237\u90FD\u5DF2\u8BBE\u5B9A\u5355\u72EC\u91D1\u989D\u5219\u53EF\u7559\u7A7A\uFF09\uFF1A<br>\n        <input class="pd_input" id="pd_bank_money" type="text" style="width: 217px;" maxlength="15">\n      </label><br>\n      <label style="margin-top: 5px;">\u8F6C\u5E10\u9644\u8A00\uFF08\u53EF\u7559\u7A7A\uFF09\uFF1A<br>\n        <textarea class="pd_textarea" id="pd_bank_msg" style="width: 225px; height: 206px;"></textarea>\n      </label>\n    </div>\n    <div>\n      <label><input class="pd_input" type="submit" value="\u6279\u91CF\u8F6C\u8D26"></label>\n      <label style="margin-left: 3px;"><input class="pd_input" type="reset" value="\u91CD\u7F6E"></label>\n      <label style="margin-left: 3px;">\n        <input class="pd_input" type="button" value="\u968F\u673A\u91D1\u989D" title="\u4E3A\u7528\u6237\u5217\u8868\u4E0A\u7684\u6BCF\u4E2A\u7528\u6237\u8BBE\u5B9A\u6307\u5B9A\u8303\u56F4\u5185\u7684\u968F\u673A\u91D1\u989D">\n      </label>\n      \uFF08\u6D3B\u671F\u5B58\u6B3E\u4E0D\u8DB3\u65F6\uFF0C\u5C06\u81EA\u52A8\u8FDB\u884C\u5B58\u6B3E\uFF1B\u6279\u91CF\u8F6C\u8D26\u91D1\u989D\u4E0D\u4F1A\u4ECE\u5B9A\u671F\u5B58\u6B3E\u4E2D\u6263\u9664\uFF09\n    </div>\n  </form>\n  </td>\n</tr>';
    $(html).appendTo('.bank1 > tbody').find('form').submit(function (e) {
        e.preventDefault();
        Msg.destroy();
        if (!batchTransferVerify()) return;
        var commonMoney = parseInt($.trim($('#pd_bank_money').val()));
        if (!commonMoney) commonMoney = 0;
        var msg = $('#pd_bank_msg').val();
        var users = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = $('#pd_bank_users').val().split('\n')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var line = _step.value;

                line = $.trim(line);
                if (!line) continue;
                if (line.includes(':')) {
                    var _line$split = line.split(':'),
                        _line$split2 = _slicedToArray(_line$split, 2),
                        userName = _line$split2[0],
                        money = _line$split2[1];

                    if (typeof money === 'undefined') continue;
                    users.push([$.trim(userName), parseInt(money)]);
                } else {
                    users.push([line, commonMoney]);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        if (!users.length) return;

        var matches = /\(手续费(\d+)%\)/.exec($('td:contains("(手续费")').text());
        if (!matches) return;
        var fee = parseInt(matches[1]) / 100;
        var totalMoney = 0;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = users[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _step2$value = _slicedToArray(_step2.value, 2),
                    _userName = _step2$value[0],
                    _money = _step2$value[1];

                totalMoney += _money;
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        totalMoney = Math.floor(totalMoney * (1 + fee));
        if (!confirm('\u5171\u8BA1' + users.length + '\u540D\u7528\u6237\uFF0C\u603B\u989D' + totalMoney.toLocaleString() + 'KFB\uFF0C\u662F\u5426\u8F6C\u8D26\uFF1F')) return;

        var $wait = Msg.wait('正在获取存款信息中&hellip;');
        $.get('hack.php?H_name=bank&t=' + new Date().getTime(), function (html) {
            Msg.remove($wait);
            var cash = 0,
                currentDeposit = 0;
            var matches = /当前所持：(-?\d+)KFB<br/i.exec(html);
            if (!matches) return;
            cash = parseInt(matches[1]);
            matches = /活期存款：(-?\d+)KFB<br/i.exec(html);
            if (!matches) return;
            currentDeposit = parseInt(matches[1]);
            if (totalMoney > cash + currentDeposit) {
                alert('资金不足');
                return;
            }

            $(document).clearQueue('Bank');
            var isDeposited = false;
            var difference = totalMoney - currentDeposit;
            if (difference > 0) {
                isDeposited = true;
                $(document).queue('Bank', function () {
                    saveCurrentDeposit(difference, cash, currentDeposit);
                    cash -= difference;
                    currentDeposit += difference;
                });
                $(document).dequeue('Bank');
            }
            Msg.wait('<strong>\u6B63\u5728\u6279\u91CF\u8F6C\u8D26\u4E2D\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + users.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
            $('#pd_bank_transfer > td:last-child').append('<ul class="pd_result pd_stat"><li><strong>转账结果：</strong></li></ul>');
            batchTransfer(users, msg, isDeposited, currentDeposit);
        });
    }).end().find('.pd_input[type="button"]').click(function (e) {
        e.preventDefault();
        var userList = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = $('#pd_bank_users').val().split('\n')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var line = _step3.value;

                line = $.trim(line);
                if (!line) continue;
                userList.push($.trim(line.split(':')[0]));
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        if (!userList.length) return;

        var range = prompt('设定随机金额的范围（注：最低转账金额为20KFB）', '20-100');
        if (range === null) return;
        range = $.trim(range);
        if (!/^\d+-\d+$/.test(range)) {
            alert('随机金额范围格式不正确');
            return;
        }
        var arr = range.split('-');
        var min = parseInt(arr[0]),
            max = parseInt(arr[1]);
        if (max < min) {
            alert('最大值不能低于最小值');
            return;
        }

        var content = '';
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = userList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var userName = _step4.value;

                content += userName + ':' + Math.floor(Math.random() * (max - min + 1) + min) + '\n';
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        $('#pd_bank_users').val(content);
    });
};

/**
 * 在银行页面对页面元素进行处理
 */
var handleInBankPage = exports.handleInBankPage = function handleInBankPage() {
    var $account = $('.bank1 > tbody > tr:nth-child(2) > td:contains("可获利息：")');
    var interestHtml = $account.html();
    var matches = /可获利息：(\d+)\(/i.exec(interestHtml);
    var interest = 0;
    if (matches) {
        interest = parseInt(matches[1]);
        if (interest > 0) {
            $account.html(interestHtml.replace(/可获利息：\d+\(/i, '\u53EF\u83B7\u5229\u606F\uFF1A<b class="pd_highlight">' + interest + '</b>('));
        }
    }

    var fixedDepositHtml = $account.html();
    matches = /定期存款：(\d+)KFB/i.exec(fixedDepositHtml);
    if (matches) {
        var fixedDeposit = parseInt(matches[1]);
        if (fixedDeposit > 0 && interest === 0) {
            var time = parseInt(TmpLog.getValue(_Const2.default.fixedDepositDueTmpLogName));
            if (!isNaN(time) && time > new Date().getTime()) {
                fixedDepositHtml = fixedDepositHtml.replace('期间不存取定期，才可以获得利息）', '\u671F\u95F4\u4E0D\u5B58\u53D6\u5B9A\u671F\uFF0C\u624D\u53EF\u4EE5\u83B7\u5F97\u5229\u606F\uFF09<span style="color: #339933;"> (\u5230\u671F\u65F6\u95F4\uFF1A' + Util.getDateString(new Date(time)) + ' ' + (Util.getTimeString(new Date(time), ':', false) + ')</span>'));
                $account.html(fixedDepositHtml);
            }

            matches = /定期利息：([\d\.]+)%/.exec(fixedDepositHtml);
            if (matches) {
                var interestRate = parseFloat(matches[1]) / 100;
                var anticipatedInterest = Math.round(fixedDeposit * interestRate * _Const2.default.fixedDepositDueTime);
                fixedDepositHtml = fixedDepositHtml.replace('取出定期将获得该数额的KFB利息)', '\u53D6\u51FA\u5B9A\u671F\u5C06\u83B7\u5F97\u8BE5\u6570\u989D\u7684KFB\u5229\u606F)<span style="color: #339933;"> (\u9884\u671F\u5229\u606F\uFF1A' + anticipatedInterest + ' KFB)</span>');
                $account.html(fixedDepositHtml);
            }
        }
    }

    $('form[name="form1"], form[name="form2"]').submit(function () {
        var $this = $(this);
        var money = 0;
        if ($this.is('[name="form2"]')) money = parseInt($this.find('input[name="drawmoney"]').val());else money = parseInt($this.find('input[name="savemoney"]').val());
        if (parseInt($this.find('input[name="btype"]:checked').val()) === 2 && money > 0) {
            TmpLog.setValue(_Const2.default.fixedDepositDueTmpLogName, Util.getDate('+' + _Const2.default.fixedDepositDueTime + 'd').getTime());
        }
    });

    $('form[name="form3"]').submit(function () {
        var matches = /活期存款：(-?\d+)KFB/.exec($('td:contains("活期存款：")').text());
        if (!matches) return;
        var currentDeposit = parseInt(matches[1]);
        matches = /定期存款：(\d+)KFB/.exec($('td:contains("定期存款：")').text());
        if (!matches) return;
        var fixedDeposit = parseInt(matches[1]);
        var money = parseInt($('input[name="to_money"]').val());
        if (!isNaN(money) && fixedDeposit > 0 && money > currentDeposit) {
            if (!confirm('你的活期存款不足，转账金额将从定期存款里扣除，是否继续？')) {
                $(this).find('input[type="submit"]').prop('disabled', false);
                return false;
            }
        }
    });
};

/**
 * 定期存款到期提醒
 */
var fixedDepositDueAlert = exports.fixedDepositDueAlert = function fixedDepositDueAlert() {
    console.log('定期存款到期提醒Start');
    $.get('hack.php?H_name=bank&t=' + new Date().getTime(), function (html) {
        Util.setCookie(_Const2.default.fixedDepositDueAlertCookieName, 1, Util.getMidnightHourDate(1));
        var matches = /可获利息：(\d+)\(/.exec(html);
        if (!matches) return;
        var interest = parseInt(matches[1]);
        if (interest > 0) {
            Util.setCookie(_Const2.default.fixedDepositDueAlertCookieName, 1, Util.getMidnightHourDate(7));
            if (confirm('\u60A8\u7684\u5B9A\u671F\u5B58\u6B3E\u5DF2\u5230\u671F\uFF0C\u5171\u4EA7\u751F\u5229\u606F' + interest + 'KFB\uFF0C\u662F\u5426\u524D\u5F80\u94F6\u884C\u53D6\u6B3E\uFF1F')) {
                location.href = 'hack.php?H_name=bank';
            }
        }
    });
};

},{"./Const":6,"./Info":10,"./Log":12,"./Msg":15,"./Public":18,"./TmpLog":20,"./Util":21}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addStartBatchModeButton = undefined;

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Log = require('./Log');

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 将指定的一系列卡片转换为VIP时间
 * @param {number[]} cardList 卡片ID列表
 * @param {string} safeId 用户的SafeID
 */
var convertCardsToVipTime = function convertCardsToVipTime(cardList, safeId) {
    var successNum = 0,
        failNum = 0,
        totalVipTime = 0,
        totalEnergy = 0;
    $(document).clearQueue('ConvertCardsToVipTime');
    $.each(cardList, function (index, cardId) {
        $(document).queue('ConvertCardsToVipTime', function () {
            $.ajax({
                type: 'GET',
                url: 'kf_fw_card_doit.php?do=recard&id=' + cardId + '&safeid=' + safeId + '&t=' + new Date().getTime(),
                timeout: _Const2.default.defAjaxTimeout,
                success: function success(html) {
                    Public.showFormatLog('将卡片转换为VIP时间', html);
                    var matches = /增加(\d+)小时VIP时间(?:.*?获得(\d+)点恢复能量)?/.exec(html);
                    if (matches) {
                        successNum++;
                        totalVipTime += parseInt(matches[1]);
                        if (typeof matches[2] !== 'undefined') totalEnergy += parseInt(matches[2]);
                    } else failNum++;
                },
                error: function error() {
                    failNum++;
                },
                complete: function complete() {
                    var $remainingNum = $('#pd_remaining_num');
                    $remainingNum.text(parseInt($remainingNum.text()) - 1);
                    var isStop = $remainingNum.closest('.pd_msg').data('stop');
                    if (isStop) $(document).clearQueue('ConvertCardsToVipTime');

                    if (isStop || index === cardList.length - 1) {
                        if (successNum > 0) {
                            (0, _Log.push)('将卡片转换为VIP时间', '\u5171\u6709`' + successNum + '`\u5F20\u5361\u7247\u6210\u529F\u4E3AVIP\u65F6\u95F4', {
                                gain: { 'VIP小时': totalVipTime, '能量': totalEnergy },
                                pay: { '卡片': -successNum }
                            });
                        }
                        Msg.destroy();
                        console.log('\u5171\u6709' + successNum + '\u5F20\u5361\u7247\u8F6C\u6362\u6210\u529F\uFF0C\u5171\u6709' + failNum + '\u5F20\u5361\u7247\u8F6C\u6362\u5931\u8D25\uFF0CVIP\u5C0F\u65F6+' + totalVipTime + '\uFF0C\u80FD\u91CF+' + totalEnergy);
                        Msg.show('<strong>\u5171\u6709<em>' + successNum + '</em>\u5F20\u5361\u7247\u8F6C\u6362\u6210\u529F' + (failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u5F20\u5361\u7247\u8F6C\u6362\u5931\u8D25' : '') + '</strong>' + ('<i>VIP\u5C0F\u65F6<em>+' + totalVipTime + '</em></i><i>\u80FD\u91CF<em>+' + totalEnergy + '</em></i>'), -1);
                        $('.kf_fw_ig2 .pd_card_chk:checked').closest('td').fadeOut('normal', function () {
                            var $parent = $(this).parent();
                            $(this).remove();
                            if (!$parent.children().length) $parent.remove();
                        });
                    } else {
                        setTimeout(function () {
                            $(document).dequeue('ConvertCardsToVipTime');
                        }, _Const2.default.defAjaxInterval);
                    }
                }
            });
        });
    });
    $(document).dequeue('ConvertCardsToVipTime');
};

/**
 * 添加开启批量模式的按钮
 */
var addStartBatchModeButton = exports.addStartBatchModeButton = function addStartBatchModeButton() {
    var safeId = Public.getSafeId();
    if (!safeId) return;
    if (!$('.kf_fw_ig2 a[href^="kf_fw_card_my.php?id="]').length) return;
    $('<div class="pd_item_btns"><button>开启批量模式</button></div>').insertAfter('.kf_fw_ig2').find('button').click(function () {
        var $this = $(this);
        var $cardLines = $('.kf_fw_ig2 > tbody > tr:gt(2)');
        if ($this.text() === '开启批量模式') {
            (function () {
                $this.text('关闭批量模式');
                $cardLines.on('click', 'a', function (e) {
                    e.preventDefault();
                    $(this).next('.pd_card_chk').click();
                }).find('td').has('a').each(function () {
                    var matches = /kf_fw_card_my\.php\?id=(\d+)/.exec($(this).find('a').attr('href'));
                    if (!matches) return;
                    $(this).css('position', 'relative').append('<input class="pd_card_chk" type="checkbox" value="' + matches[1] + '">');
                });
                var playedCardList = [];
                $('.kf_fw_ig2 > tbody > tr:nth-child(2) > td').each(function () {
                    var matches = /kf_fw_card_my\.php\?id=(\d+)/.exec($(this).find('a').attr('href'));
                    if (!matches) return;
                    playedCardList.push(parseInt(matches[1]));
                });

                /**
                 * 不选择已出战的卡片
                 */
                var uncheckPlayedCard = function uncheckPlayedCard() {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = playedCardList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var id = _step.value;

                            $cardLines.find('td').has('a[href="kf_fw_card_my.php?id=' + id + '"]').find('input:checked').prop('checked', false);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                };

                $this.before('<label><input id="uncheckPlayedCard" type="checkbox" checked> 不选已出战的卡片</label>' + '<button>每类只保留一张</button><button>全选</button><button>反选</button><br><button>转换为VIP时间</button>').prev().click(function () {
                    Msg.destroy();
                    var cardList = [];
                    $cardLines.find('input:checked').each(function () {
                        cardList.push(parseInt($(this).val()));
                    });
                    if (!cardList.length) return;
                    if (!confirm('\u5171\u9009\u62E9\u4E86' + cardList.length + '\u5F20\u5361\u7247\uFF0C\u662F\u5426\u5C06\u5361\u7247\u6279\u91CF\u8F6C\u6362\u4E3AVIP\u65F6\u95F4\uFF1F')) return;
                    Msg.wait('<strong>\u6B63\u5728\u6279\u91CF\u8F6C\u6362\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + cardList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
                    convertCardsToVipTime(cardList, safeId);
                }).prev().prev().click(function () {
                    $cardLines.find('input').each(function () {
                        $(this).prop('checked', !$(this).prop('checked'));
                    });
                    if ($('#uncheckPlayedCard').prop('checked')) uncheckPlayedCard();
                }).prev().click(function () {
                    $cardLines.find('input').prop('checked', true);
                    if ($('#uncheckPlayedCard').prop('checked')) uncheckPlayedCard();
                }).prev().click(function () {
                    $cardLines.find('input').prop('checked', true);
                    if ($('#uncheckPlayedCard').prop('checked')) uncheckPlayedCard();
                    var cardTypeList = new Set();
                    $cardLines.find('a > img').each(function () {
                        cardTypeList.add($(this).attr('src'));
                    });
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = cardTypeList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var src = _step2.value;

                            var $cardElems = $cardLines.find('td').has('img[src="' + src + '"]');
                            var totalNum = $cardElems.length;
                            var checkedNum = $cardElems.has('input:checked').length;
                            if (totalNum > 1) {
                                if (totalNum === checkedNum) {
                                    $cardElems.eq(0).find('input:checked').prop('checked', false);
                                }
                            } else {
                                $cardElems.find('input:checked').prop('checked', false);
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                });
            })();
        } else {
            $this.text('开启批量模式');
            $cardLines.off('click').find('.pd_card_chk').remove();
            $this.prevAll().remove();
        }
    });
};

},{"./Const":6,"./Log":12,"./Msg":15,"./Public":18}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.normalize = exports.changeStorageType = exports.clear = exports.write = exports.read = exports.init = exports.Config = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Log = require('./Log');

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 保存设置的键值名称
var name = 'pd_config';

/**
 * 配置类
 */
var Config = exports.Config = {
    // 是否开启定时模式，可按时进行自动操作（包括捐款、自动更换ID颜色，需开启相关功能），只在论坛首页生效，true：开启；false：关闭
    autoRefreshEnabled: false,
    // 在首页的网页标题上显示定时模式提示的方案，auto：停留一分钟后显示；always：总是显示；never：不显示
    showRefreshModeTipsType: 'auto',

    // 是否自动KFB捐款，true：开启；false：关闭
    autoDonationEnabled: false,
    // KFB捐款额度，取值范围在1-5000的整数之间；可设置为百分比，表示捐款额度为当前所持现金的百分比（最多不超过5000KFB），例：80%
    donationKfb: '1',
    // 在当天的指定时间之后捐款（24小时制），例：22:30:00（注意不要设置得太接近零点，以免错过捐款）
    donationAfterTime: '00:05:00',

    // 对首页上的有人@你的消息框进行处理的方案，no_highlight：取消已读提醒高亮；no_highlight_extra：取消已读提醒高亮，并在无提醒时补上消息框；
    // hide_box_1：不显示已读提醒的消息框；hide_box_2：永不显示消息框；default：保持默认；at_change_to_cao：将@改为艹(其他和方式2相同)
    atTipsHandleType: 'no_highlight',
    // 是否在神秘等级升级后进行提醒，只在首页生效，true：开启；false：关闭
    smLevelUpAlertEnabled: false,
    // 是否在定时存款到期时进行提醒，只在首页生效，true：开启；false：关闭
    fixedDepositDueAlertEnabled: false,
    // 是否在神秘系数排名发生变化时进行提醒，只在首页生效，true：开启；false：关闭
    smRankChangeAlertEnabled: false,
    // 在首页帖子链接旁显示快速跳转至页末的链接，true：开启；false：关闭
    homePageThreadFastGotoLinkEnabled: true,
    // 是否在首页显示VIP剩余时间，true：开启；false：关闭
    showVipSurplusTimeEnabled: false,

    // 是否在版块页面中显示帖子页数快捷链接，true：开启；false：关闭
    showFastGotoThreadPageEnabled: false,
    // 在帖子页数快捷链接中显示页数链接的最大数量
    maxFastGotoThreadPageNum: 5,
    // 帖子每页楼层数量，用于电梯直达和帖子页数快捷链接功能，如果修改了KF设置里的“文章列表每页个数”，请在此修改成相同的数目
    perPageFloorNum: 10,
    // 是否在版块页面中高亮今日新发表帖子的发表时间，true：开启；false：关闭
    highlightNewPostEnabled: true,

    // 是否调整帖子内容宽度，使其保持一致，true：开启；false：关闭
    adjustThreadContentWidthEnabled: false,
    // 帖子内容字体大小，留空表示使用默认大小，推荐值：14
    threadContentFontSize: 0,
    // 自定义本人的神秘颜色（包括帖子页面的ID显示颜色和楼层边框颜色，仅自己可见），例：#009CFF，如无需求可留空
    customMySmColor: '',
    // 是否开启自定义各等级神秘颜色的功能，（包括帖子页面的ID显示颜色和楼层边框颜色，仅自己可见），true：开启；false：关闭
    customSmColorEnabled: false,
    // 自定义各等级神秘颜色的设置列表，例：[{min:'50',max:'100',color:'#009CFF'},{min:'800',max:'MAX',color:'#FF0000'}]
    customSmColorConfigList: [],
    // 是否将帖子中的绯月其它域名的链接修改为当前域名，true：开启；false：关闭
    modifyKFOtherDomainEnabled: true,
    // 是否在帖子页面开启多重回复和多重引用的功能，true：开启；false：关闭
    multiQuoteEnabled: true,
    // 是否在帖子页面开启批量购买帖子的功能，true：开启；false：关闭
    batchBuyThreadEnabled: true,
    // 是否开启显示用户的自定义备注的功能，true：开启；false：关闭
    userMemoEnabled: false,
    // 用户自定义备注列表，格式：{'用户名':'备注'}，例：{'李四':'张三的马甲','王五':'张三的另一个马甲'}
    userMemoList: {},
    // 是否在帖子页面解析多媒体标签，true：开启；false：关闭
    parseMediaTagEnabled: true,
    // 是否在帖子和搜索页面通过左右键进行翻页，true：开启；false：关闭
    turnPageViaKeyboardEnabled: false,
    // 是否在符合条件的帖子页面显示自助评分的链接（仅限自助评分测试人员使用），true：开启；false：关闭
    showSelfRatingLinkEnabled: false,
    // 是否使用Ajax的方式购买帖子（购买时页面不会跳转），true：开启；false：关闭
    buyThreadViaAjaxEnabled: true,

    // 默认的消息显示时间（秒），设置为-1表示永久显示
    defShowMsgDuration: -1,
    // 是否禁用jQuery的动画效果（推荐在配置较差的机器上使用），true：开启；false：关闭
    animationEffectOffEnabled: false,
    // 日志保存天数
    logSaveDays: 30,
    // 在页面上方显示助手日志的链接，true：开启；false：关闭
    showLogLinkEnabled: true,
    // 在页面上方显示搜索对话框的链接，true：开启；false：关闭
    showSearchLinkEnabled: true,
    // 日志内容的排序方式，time：按时间顺序排序；type：按日志类别排序
    logSortType: 'time',
    // 日志统计范围类型，cur：显示当天统计结果；custom：显示距该日N天内的统计结果；all：显示全部统计结果
    logStatType: 'cur',
    // 显示距该日N天内的统计结果（用于日志统计范围）
    logStatDays: 7,
    // 是否为侧边栏添加快捷导航的链接，true：开启；false：关闭
    addSideBarFastNavEnabled: true,
    // 是否将侧边栏修改为和手机相同的平铺样式，true：开启；false：关闭
    modifySideBarEnabled: false,
    // 是否为页面添加自定义的CSS内容，true：开启；false：关闭
    customCssEnabled: false,
    // 自定义CSS的内容
    customCssContent: '',
    // 是否执行自定义的脚本，true：开启；false：关闭
    customScriptEnabled: false,
    // 在脚本开始时执行的自定义脚本内容
    customScriptStartContent: '',
    // 在脚本结束时执行的自定义脚本内容
    customScriptEndContent: '',
    // 浏览器类型，auto：自动检测；desktop：桌面版；mobile：移动版
    browseType: 'auto',

    // 是否开启关注用户的功能，true：开启；false：关闭
    followUserEnabled: false,
    // 关注用户列表，格式：[{name:'用户名'}]，例：[{name:'张三'}, {name:'李四'}]
    followUserList: [],
    // 是否高亮所关注用户在首页下的帖子链接，true：开启；false：关闭
    highlightFollowUserThreadInHPEnabled: true,
    // 是否高亮所关注用户在帖子列表页面下的帖子链接，true：开启；false：关闭
    highlightFollowUserThreadLinkEnabled: true,
    // 是否开启屏蔽用户的功能，true：开启；false：关闭
    blockUserEnabled: false,
    // 屏蔽用户的默认屏蔽类型，0：屏蔽主题和回贴；1：仅屏蔽主题；2：仅屏蔽回贴
    blockUserDefaultType: 0,
    // 是否屏蔽被屏蔽用户的@提醒，true：开启；false：关闭
    blockUserAtTipsEnabled: true,
    // 屏蔽用户的版块屏蔽范围，0：所有版块；1：包括指定的版块；2：排除指定的版块
    blockUserForumType: 0,
    // 屏蔽用户的版块ID列表，例：[16, 41, 67, 57, 84, 92, 127, 68, 163, 182, 9]
    blockUserFidList: [],
    // 屏蔽用户列表，格式：[{name:'用户名', type:屏蔽类型}]，例：[{name:'张三', type:0}, {name:'李四', type:1}]
    blockUserList: [],
    // 是否开启屏蔽标题包含指定关键字的帖子的功能，true：开启；false：关闭
    blockThreadEnabled: false,
    // 屏蔽帖子的默认版块屏蔽范围，0：所有版块；1：包括指定的版块；2：排除指定的版块
    blockThreadDefForumType: 0,
    // 屏蔽帖子的默认版块ID列表，例：[16, 41, 67, 57, 84, 92, 127, 68, 163, 182, 9]
    blockThreadDefFidList: [],
    // 屏蔽帖子的关键字列表，格式：[{keyWord:'关键字', includeUser:['包括的用户名'], excludeUser:['排除的用户名'], includeFid:[包括指定的版块ID], excludeFid:[排除指定的版块ID]}]
    // 关键字可使用普通字符串或正则表达式（正则表达式请使用'/abc/'的格式），includeUser、excludeUser、includeFid和excludeFid这三项为可选
    // 例：[{keyWord: '标题1'}, {keyWord: '标题2', includeUser:['用户名1', '用户名2'], includeFid: [5, 56]}, {keyWord: '/关键字A.*关键字B/i', excludeFid: [92, 127, 68]}]
    blockThreadList: [],

    // 是否在当前收入满足指定额度之后自动将指定数额存入活期存款中，只会在首页触发，true：开启；false：关闭
    autoSaveCurrentDepositEnabled: false,
    // 在当前收入已满指定KFB额度之后自动进行活期存款，例：1000
    saveCurrentDepositAfterKfb: 0,
    // 将指定额度的KFB存入活期存款中，例：900；举例：设定已满1000存900，当前收入为2000，则自动存入金额为1800
    saveCurrentDepositKfb: 0,

    // 是否自动更换ID颜色，true：开启；false：关闭
    autoChangeSMColorEnabled: false,
    // 自动更换ID颜色的更换顺序类型，random：随机；sequence：顺序
    autoChangeSMColorType: 'random',
    // 自动更换ID颜色的时间间隔（小时）
    autoChangeSMColorInterval: 24,
    // 是否从当前所有可用的ID颜色中进行更换，true：开启；false：关闭
    changeAllAvailableSMColorEnabled: true,
    // 自定义自动更换ID颜色的ID列表，例：[1,8,13,20]
    customAutoChangeSMColorList: []
};

/**
 * 初始化
 */
var init = exports.init = function init() {
    var c = $.extend(true, {}, Config);
    if (typeof unsafeWindow === 'undefined') window.Config = c;else unsafeWindow.Config = c;
    if (typeof GM_getValue !== 'undefined') {
        _Info2.default.storageType = GM_getValue('StorageType');
        if (_Info2.default.storageType !== 'ByUid' && _Info2.default.storageType !== 'Global') _Info2.default.storageType = 'Default';
    }
    read();
};

/**
 * 读取设置
 */
var read = exports.read = function read() {
    var options = null;
    if (_Info2.default.storageType === 'ByUid') options = GM_getValue(name + '_' + _Info2.default.uid);else if (_Info2.default.storageType === 'Global') options = GM_getValue(name);else options = localStorage.getItem(name);
    if (!options) return;
    try {
        options = JSON.parse(options);
    } catch (ex) {
        return;
    }
    if (!options || $.type(options) !== 'object' || $.isEmptyObject(options)) return;
    options = normalize(options);
    _Info2.default.w.Config = $.extend(true, {}, Config, options);
};

/**
 * 写入设置
 */
var write = exports.write = function write() {
    var options = Util.getDifferenceSetOfObject(Config, _Info2.default.w.Config);
    if (_Info2.default.storageType === 'ByUid') GM_setValue(name + '_' + _Info2.default.uid, JSON.stringify(options));else if (_Info2.default.storageType === 'Global') GM_setValue(name, JSON.stringify(options));else localStorage.setItem(name, JSON.stringify(options));
};

/**
 * 清空设置
 */
var clear = exports.clear = function clear() {
    if (_Info2.default.storageType === 'ByUid') GM_deleteValue(name + '_' + _Info2.default.uid);else if (_Info2.default.storageType === 'Global') GM_deleteValue(name);else localStorage.removeItem(name);
};

/**
 * 更改存储类型
 * @param {string} storageType 要更改的存储类型
 */
var changeStorageType = exports.changeStorageType = function changeStorageType(storageType) {
    (0, _Log.read)();
    TmpLog.read();
    _Info2.default.storageType = storageType;
    if (typeof GM_setValue !== 'undefined') GM_setValue('StorageType', _Info2.default.storageType);
    if (!Util.deepEqual(Config, _Info2.default.w.Config) || !$.isEmptyObject(_Info2.default.w.Log)) {
        if (confirm('是否将助手设置和日志转移到对应存储类型中？（对应存储类型中的数据将被覆盖）')) {
            write();
            (0, _Log.write)();
            TmpLog.write();
        }
    }
};

/**
 * 获取经过规范化的Config对象
 * @param {Config} options 待处理的Config对象
 * @returns {Config} 经过规范化的Config对象
 */
var normalize = exports.normalize = function normalize(options) {
    var settings = {};
    if ($.type(options) !== 'object') return settings;

    if (typeof options.autoRefreshEnabled !== 'undefined') {
        settings.autoRefreshEnabled = typeof options.autoRefreshEnabled === 'boolean' ? options.autoRefreshEnabled : Config.autoRefreshEnabled;
    }
    if (typeof options.showRefreshModeTipsType !== 'undefined') {
        var showRefreshModeTipsType = $.trim(options.showRefreshModeTipsType).toLowerCase();
        var allowTypes = ['auto', 'always', 'never'];
        if (showRefreshModeTipsType !== '' && $.inArray(showRefreshModeTipsType, allowTypes) > -1) settings.showRefreshModeTipsType = showRefreshModeTipsType;else settings.showRefreshModeTipsType = Config.showRefreshModeTipsType;
    }

    if (typeof options.autoDonationEnabled !== 'undefined') {
        settings.autoDonationEnabled = typeof options.autoDonationEnabled === 'boolean' ? options.autoDonationEnabled : Config.autoDonationEnabled;
    }
    if (typeof options.donationKfb !== 'undefined') {
        var donationKfb = options.donationKfb;
        if ($.isNumeric(donationKfb) && donationKfb > 0 && donationKfb <= _Const2.default.maxDonationKfb) settings.donationKfb = parseInt(donationKfb).toString();else if (/^1?\d?\d%$/.test(donationKfb) && parseInt(donationKfb) > 0 && parseInt(donationKfb) <= 100) settings.donationKfb = parseInt(donationKfb) + '%';else settings.donationKfb = Config.donationKfb;
    }
    if (typeof options.donationAfterTime !== 'undefined') {
        var donationAfterTime = options.donationAfterTime;
        if (/^(2[0-3]|[0-1][0-9]):[0-5][0-9]:[0-5][0-9]$/.test(donationAfterTime)) settings.donationAfterTime = donationAfterTime;else settings.donationAfterTime = Config.donationAfterTime;
    }

    if (typeof options.atTipsHandleType !== 'undefined') {
        var atTipsHandleType = $.trim(options.atTipsHandleType).toLowerCase();
        var _allowTypes = ['no_highlight', 'no_highlight_extra', 'hide_box_1', 'hide_box_2', 'default', 'at_change_to_cao'];
        if (atTipsHandleType !== '' && $.inArray(atTipsHandleType, _allowTypes) > -1) settings.atTipsHandleType = atTipsHandleType;else settings.atTipsHandleType = Config.atTipsHandleType;
    }
    if (typeof options.smLevelUpAlertEnabled !== 'undefined') {
        settings.smLevelUpAlertEnabled = typeof options.smLevelUpAlertEnabled === 'boolean' ? options.smLevelUpAlertEnabled : Config.smLevelUpAlertEnabled;
    }
    if (typeof options.fixedDepositDueAlertEnabled !== 'undefined') {
        settings.fixedDepositDueAlertEnabled = typeof options.fixedDepositDueAlertEnabled === 'boolean' ? options.fixedDepositDueAlertEnabled : Config.fixedDepositDueAlertEnabled;
    }
    if (typeof options.smRankChangeAlertEnabled !== 'undefined') {
        settings.smRankChangeAlertEnabled = typeof options.smRankChangeAlertEnabled === 'boolean' ? options.smRankChangeAlertEnabled : Config.smRankChangeAlertEnabled;
    }
    if (typeof options.homePageThreadFastGotoLinkEnabled !== 'undefined') {
        settings.homePageThreadFastGotoLinkEnabled = typeof options.homePageThreadFastGotoLinkEnabled === 'boolean' ? options.homePageThreadFastGotoLinkEnabled : Config.homePageThreadFastGotoLinkEnabled;
    }
    if (typeof options.showVipSurplusTimeEnabled !== 'undefined') {
        settings.showVipSurplusTimeEnabled = typeof options.showVipSurplusTimeEnabled === 'boolean' ? options.showVipSurplusTimeEnabled : Config.showVipSurplusTimeEnabled;
    }

    if (typeof options.showFastGotoThreadPageEnabled !== 'undefined') {
        settings.showFastGotoThreadPageEnabled = typeof options.showFastGotoThreadPageEnabled === 'boolean' ? options.showFastGotoThreadPageEnabled : Config.showFastGotoThreadPageEnabled;
    }
    if (typeof options.maxFastGotoThreadPageNum !== 'undefined') {
        var maxFastGotoThreadPageNum = parseInt(options.maxFastGotoThreadPageNum);
        if (!isNaN(maxFastGotoThreadPageNum) && maxFastGotoThreadPageNum > 0) settings.maxFastGotoThreadPageNum = maxFastGotoThreadPageNum;else settings.maxFastGotoThreadPageNum = Config.maxFastGotoThreadPageNum;
    }
    if (typeof options.highlightNewPostEnabled !== 'undefined') {
        settings.highlightNewPostEnabled = typeof options.highlightNewPostEnabled === 'boolean' ? options.highlightNewPostEnabled : Config.highlightNewPostEnabled;
    }

    if (typeof options.perPageFloorNum !== 'undefined') {
        var perPageFloorNum = parseInt(options.perPageFloorNum);
        if ($.inArray(perPageFloorNum, [10, 20, 30]) > -1) settings.perPageFloorNum = perPageFloorNum;else settings.perPageFloorNum = Config.perPageFloorNum;
    }
    if (typeof options.threadContentFontSize !== 'undefined') {
        var threadContentFontSize = parseInt(options.threadContentFontSize);
        if (threadContentFontSize > 0) settings.threadContentFontSize = threadContentFontSize;else settings.threadContentFontSize = Config.threadContentFontSize;
    }
    if (typeof options.adjustThreadContentWidthEnabled !== 'undefined') {
        settings.adjustThreadContentWidthEnabled = typeof options.adjustThreadContentWidthEnabled === 'boolean' ? options.adjustThreadContentWidthEnabled : Config.adjustThreadContentWidthEnabled;
    }
    if (typeof options.turnPageViaKeyboardEnabled !== 'undefined') {
        settings.turnPageViaKeyboardEnabled = typeof options.turnPageViaKeyboardEnabled === 'boolean' ? options.turnPageViaKeyboardEnabled : Config.turnPageViaKeyboardEnabled;
    }
    if (typeof options.customMySmColor !== 'undefined') {
        var customMySmColor = options.customMySmColor;
        if (/^#[0-9a-fA-F]{6}$/.test(customMySmColor)) settings.customMySmColor = customMySmColor;else settings.customMySmColor = Config.customMySmColor;
    }
    if (typeof options.customSmColorEnabled !== 'undefined') {
        settings.customSmColorEnabled = typeof options.customSmColorEnabled === 'boolean' ? options.customSmColorEnabled : Config.customSmColorEnabled;
    }
    if (typeof options.customSmColorConfigList !== 'undefined') {
        var customSmColorConfigList = options.customSmColorConfigList;
        if ($.isArray(customSmColorConfigList)) {
            settings.customSmColorConfigList = [];
            $.each(customSmColorConfigList, function (index, data) {
                if ($.type(data) === 'object' && $.type(data.min) === 'string' && $.type(data.max) === 'string' && $.type(data.color) === 'string' && /^(-?\d+|MAX)$/i.test(data.min) && /^(-?\d+|MAX)$/i.test(data.max) && /^#[0-9a-fA-F]{6}$/.test(data.color) && Util.compareSmLevel(data.min, data.max) <= 0) {
                    settings.customSmColorConfigList.push(data);
                }
            });
        } else settings.customSmColorConfigList = Config.customSmColorConfigList;
    }
    if (typeof options.modifyKFOtherDomainEnabled !== 'undefined') {
        settings.modifyKFOtherDomainEnabled = typeof options.modifyKFOtherDomainEnabled === 'boolean' ? options.modifyKFOtherDomainEnabled : Config.modifyKFOtherDomainEnabled;
    }
    if (typeof options.multiQuoteEnabled !== 'undefined') {
        settings.multiQuoteEnabled = typeof options.multiQuoteEnabled === 'boolean' ? options.multiQuoteEnabled : Config.multiQuoteEnabled;
    }
    if (typeof options.batchBuyThreadEnabled !== 'undefined') {
        settings.batchBuyThreadEnabled = typeof options.batchBuyThreadEnabled === 'boolean' ? options.batchBuyThreadEnabled : Config.batchBuyThreadEnabled;
    }
    if (typeof options.userMemoEnabled !== 'undefined') {
        settings.userMemoEnabled = typeof options.userMemoEnabled === 'boolean' ? options.userMemoEnabled : Config.userMemoEnabled;
    }
    if (typeof options.userMemoList !== 'undefined') {
        if ($.type(options.userMemoList) === 'object') {
            settings.userMemoList = {};
            for (var user in options.userMemoList) {
                var memo = $.trim(options.userMemoList[user]);
                if (memo) settings.userMemoList[user] = memo;
            }
        } else settings.userMemoList = Config.userMemoList;
    }
    if (typeof options.parseMediaTagEnabled !== 'undefined') {
        settings.parseMediaTagEnabled = typeof options.parseMediaTagEnabled === 'boolean' ? options.parseMediaTagEnabled : Config.parseMediaTagEnabled;
    }
    if (typeof options.showSelfRatingLinkEnabled !== 'undefined') {
        settings.showSelfRatingLinkEnabled = typeof options.showSelfRatingLinkEnabled === 'boolean' ? options.showSelfRatingLinkEnabled : Config.showSelfRatingLinkEnabled;
    }
    if (typeof options.buyThreadViaAjaxEnabled !== 'undefined') {
        settings.buyThreadViaAjaxEnabled = typeof options.buyThreadViaAjaxEnabled === 'boolean' ? options.buyThreadViaAjaxEnabled : Config.buyThreadViaAjaxEnabled;
    }

    if (typeof options.defShowMsgDuration !== 'undefined') {
        var defShowMsgDuration = parseInt(options.defShowMsgDuration);
        if (!isNaN(defShowMsgDuration) && defShowMsgDuration >= -1) settings.defShowMsgDuration = defShowMsgDuration;else settings.defShowMsgDuration = Config.defShowMsgDuration;
    }
    if (typeof options.animationEffectOffEnabled !== 'undefined') {
        settings.animationEffectOffEnabled = typeof options.animationEffectOffEnabled === 'boolean' ? options.animationEffectOffEnabled : Config.animationEffectOffEnabled;
    }
    if (typeof options.logSaveDays !== 'undefined') {
        var logSaveDays = parseInt(options.logSaveDays);
        if (logSaveDays > 0) settings.logSaveDays = logSaveDays;else settings.logSaveDays = Config.logSaveDays;
    }
    if (typeof options.browseType !== 'undefined') {
        if ($.inArray(options.browseType.toLowerCase(), ['auto', 'desktop', 'mobile']) > -1) settings.browseType = options.browseType.toLowerCase();else settings.browseType = Config.options.browseType;
    }
    if (typeof options.showLogLinkEnabled !== 'undefined') {
        settings.showLogLinkEnabled = typeof options.showLogLinkEnabled === 'boolean' ? options.showLogLinkEnabled : Config.showLogLinkEnabled;
    }
    if (typeof options.showSearchLinkEnabled !== 'undefined') {
        settings.showSearchLinkEnabled = typeof options.showSearchLinkEnabled === 'boolean' ? options.showSearchLinkEnabled : Config.showSearchLinkEnabled;
    }
    if (typeof options.logSortType !== 'undefined') {
        var logSortType = $.trim(options.logSortType).toLowerCase();
        var _allowTypes2 = ['time', 'type'];
        if (logSortType !== '' && $.inArray(logSortType, _allowTypes2) > -1) settings.logSortType = logSortType;else settings.logSortType = Config.logSortType;
    }
    if (typeof options.logStatType !== 'undefined') {
        var logStatType = $.trim(options.logStatType).toLowerCase();
        var _allowTypes3 = ['cur', 'custom', 'all'];
        if (logStatType !== '' && $.inArray(logStatType, _allowTypes3) > -1) settings.logStatType = logStatType;else settings.logStatType = Config.logStatType;
    }
    if (typeof options.logStatDays !== 'undefined') {
        var logStatDays = parseInt(options.logStatDays);
        if (logStatDays > 0) settings.logStatDays = logStatDays;else settings.logStatDays = Config.logStatDays;
    }
    if (typeof options.addSideBarFastNavEnabled !== 'undefined') {
        settings.addSideBarFastNavEnabled = typeof options.addSideBarFastNavEnabled === 'boolean' ? options.addSideBarFastNavEnabled : Config.addSideBarFastNavEnabled;
    }
    if (typeof options.modifySideBarEnabled !== 'undefined') {
        settings.modifySideBarEnabled = typeof options.modifySideBarEnabled === 'boolean' ? options.modifySideBarEnabled : Config.modifySideBarEnabled;
    }
    if (typeof options.customCssEnabled !== 'undefined') {
        settings.customCssEnabled = typeof options.customCssEnabled === 'boolean' ? options.customCssEnabled : Config.customCssEnabled;
    }
    if (typeof options.customCssContent !== 'undefined') {
        var customCssContent = $.trim(options.customCssContent);
        if (customCssContent !== '') settings.customCssContent = customCssContent;else settings.customCssContent = Config.customCssContent;
    }
    if (typeof options.customScriptEnabled !== 'undefined') {
        settings.customScriptEnabled = typeof options.customScriptEnabled === 'boolean' ? options.customScriptEnabled : Config.customScriptEnabled;
    }
    if (typeof options.customScriptStartContent !== 'undefined') {
        if (typeof options.customScriptStartContent === 'string') settings.customScriptStartContent = options.customScriptStartContent;else settings.customScriptStartContent = Config.customScriptStartContent;
    }
    if (typeof options.customScriptEndContent !== 'undefined') {
        if (typeof options.customScriptEndContent === 'string') settings.customScriptEndContent = options.customScriptEndContent;else settings.customScriptEndContent = Config.customScriptEndContent;
    }

    if (typeof options.followUserEnabled !== 'undefined') {
        settings.followUserEnabled = typeof options.followUserEnabled === 'boolean' ? options.followUserEnabled : Config.followUserEnabled;
    }
    if (typeof options.highlightFollowUserThreadInHPEnabled !== 'undefined') {
        settings.highlightFollowUserThreadInHPEnabled = typeof options.highlightFollowUserThreadInHPEnabled === 'boolean' ? options.highlightFollowUserThreadInHPEnabled : Config.highlightFollowUserThreadInHPEnabled;
    }
    if (typeof options.highlightFollowUserThreadLinkEnabled !== 'undefined') {
        settings.highlightFollowUserThreadLinkEnabled = typeof options.highlightFollowUserThreadLinkEnabled === 'boolean' ? options.highlightFollowUserThreadLinkEnabled : Config.highlightFollowUserThreadLinkEnabled;
    }
    if (typeof options.followUserList !== 'undefined') {
        if ($.isArray(options.followUserList)) {
            settings.followUserList = [];
            for (var i in options.followUserList) {
                var _user = options.followUserList[i];
                if ($.type(_user) === 'object' && $.type(_user.name) === 'string') {
                    var _name = $.trim(_user.name);
                    if (_name) settings.followUserList.push({ name: _name });
                } else if ($.type(_user) === 'string') {
                    var _name2 = $.trim(_user);
                    if (_name2) settings.followUserList.push({ name: _name2 });
                }
            }
        } else settings.followUserList = Config.followUserList;
    }

    if (typeof options.blockUserEnabled !== 'undefined') {
        settings.blockUserEnabled = typeof options.blockUserEnabled === 'boolean' ? options.blockUserEnabled : Config.blockUserEnabled;
    }
    if (typeof options.blockUserDefaultType !== 'undefined') {
        var blockUserDefaultType = parseInt(options.blockUserDefaultType);
        if (!isNaN(blockUserDefaultType) && blockUserDefaultType >= 0 && blockUserDefaultType <= 2) settings.blockUserDefaultType = blockUserDefaultType;else settings.blockUserDefaultType = Config.blockUserDefaultType;
    }
    if (typeof options.blockUserAtTipsEnabled !== 'undefined') {
        settings.blockUserAtTipsEnabled = typeof options.blockUserAtTipsEnabled === 'boolean' ? options.blockUserAtTipsEnabled : Config.blockUserAtTipsEnabled;
    }
    if (typeof options.blockUserForumType !== 'undefined') {
        var blockUserForumType = parseInt(options.blockUserForumType);
        if (!isNaN(blockUserForumType) && blockUserForumType >= 0 && blockUserForumType <= 2) settings.blockUserForumType = blockUserForumType;else settings.blockUserForumType = Config.blockUserForumType;
    }
    if (typeof options.blockUserFidList !== 'undefined') {
        if ($.isArray(options.blockUserFidList)) {
            settings.blockUserFidList = [];
            for (var _i in options.blockUserFidList) {
                var fid = parseInt(options.blockUserFidList[_i]);
                if (!isNaN(fid) && fid > 0) settings.blockUserFidList.push(fid);
            }
        } else settings.blockUserFidList = Config.blockUserFidList;
    }
    if (typeof options.blockUserList !== 'undefined') {
        if ($.isArray(options.blockUserList)) {
            settings.blockUserList = [];
            for (var _i2 in options.blockUserList) {
                var _user2 = options.blockUserList[_i2];
                if ($.type(_user2) === 'object' && $.type(_user2.name) === 'string' && $.type(_user2.type) === 'number') {
                    var type = _user2.type;
                    if (type < 0 || type > 2) type = Config.blockUserDefaultType;
                    var _name3 = $.trim(_user2.name);
                    if (_name3) settings.blockUserList.push({ name: _name3, type: type });
                } else if ($.type(_user2) === 'string') {
                    var _name4 = $.trim(_user2);
                    if (_name4) settings.blockUserList.push({ name: _name4, type: Config.blockUserDefaultType });
                }
            }
        } else settings.blockUserList = Config.blockUserList;
    }
    if (typeof options.blockThreadEnabled !== 'undefined') {
        settings.blockThreadEnabled = typeof options.blockThreadEnabled === 'boolean' ? options.blockThreadEnabled : Config.blockThreadEnabled;
    }
    if (typeof options.blockThreadDefForumType !== 'undefined') {
        var blockThreadDefForumType = parseInt(options.blockThreadDefForumType);
        if (!isNaN(blockThreadDefForumType) && blockThreadDefForumType >= 0 && blockThreadDefForumType <= 2) settings.blockThreadDefForumType = blockThreadDefForumType;else settings.blockThreadDefForumType = Config.blockThreadDefForumType;
    }
    if (typeof options.blockThreadDefFidList !== 'undefined') {
        if ($.isArray(options.blockThreadDefFidList)) {
            settings.blockThreadDefFidList = [];
            for (var _i3 in options.blockThreadDefFidList) {
                var _fid = parseInt(options.blockThreadDefFidList[_i3]);
                if (!isNaN(_fid) && _fid > 0) settings.blockThreadDefFidList.push(_fid);
            }
        } else settings.blockThreadDefFidList = Config.blockThreadDefFidList;
    }
    if (typeof options.blockThreadList !== 'undefined') {
        if ($.isArray(options.blockThreadList)) {
            settings.blockThreadList = [];
            for (var _i4 in options.blockThreadList) {
                var obj = options.blockThreadList[_i4];
                if ($.type(obj) === 'object' && $.type(obj.keyWord) === 'string' && $.trim(obj.keyWord) !== '') {
                    var newObj = { keyWord: obj.keyWord };
                    if ($.isArray(obj.includeUser) && obj.includeUser.length > 0) newObj.includeUser = obj.includeUser;else if ($.isArray(obj.excludeUser) && obj.excludeUser.length > 0) newObj.excludeUser = obj.excludeUser;else if ($.isArray(obj.userName) && obj.userName.length > 0) newObj.includeUser = obj.userName;
                    if ($.isArray(obj.includeFid) && obj.includeFid.length > 0) newObj.includeFid = obj.includeFid;else if ($.isArray(obj.excludeFid) && obj.excludeFid.length > 0) newObj.excludeFid = obj.excludeFid;
                    settings.blockThreadList.push(newObj);
                }
            }
        } else settings.blockThreadList = Config.blockThreadList;
    }

    if (typeof options.autoSaveCurrentDepositEnabled !== 'undefined') {
        settings.autoSaveCurrentDepositEnabled = typeof options.autoSaveCurrentDepositEnabled === 'boolean' ? options.autoSaveCurrentDepositEnabled : Config.autoSaveCurrentDepositEnabled;
    }
    if (typeof options.saveCurrentDepositAfterKfb !== 'undefined') {
        var saveCurrentDepositAfterKfb = parseInt(options.saveCurrentDepositAfterKfb);
        if (saveCurrentDepositAfterKfb > 0) settings.saveCurrentDepositAfterKfb = saveCurrentDepositAfterKfb;else settings.saveCurrentDepositAfterKfb = Config.saveCurrentDepositAfterKfb;
    }
    if (typeof options.saveCurrentDepositKfb !== 'undefined') {
        var saveCurrentDepositKfb = parseInt(options.saveCurrentDepositKfb);
        if (saveCurrentDepositKfb > 0 && saveCurrentDepositKfb <= settings.saveCurrentDepositAfterKfb) settings.saveCurrentDepositKfb = saveCurrentDepositKfb;else settings.saveCurrentDepositKfb = Config.saveCurrentDepositKfb;
    }

    if (typeof options.autoChangeSMColorEnabled !== 'undefined') {
        settings.autoChangeSMColorEnabled = typeof options.autoChangeSMColorEnabled === 'boolean' ? options.autoChangeSMColorEnabled : Config.autoChangeSMColorEnabled;
    }
    if (typeof options.autoChangeSMColorType !== 'undefined') {
        var autoChangeSMColorType = $.trim(options.autoChangeSMColorType).toLowerCase();
        var _allowTypes4 = ['random', 'sequence'];
        if (autoChangeSMColorType !== '' && $.inArray(autoChangeSMColorType, _allowTypes4) > -1) settings.autoChangeSMColorType = autoChangeSMColorType;else settings.autoChangeSMColorType = Config.autoChangeSMColorType;
    }
    if (typeof options.autoChangeSMColorInterval !== 'undefined') {
        var autoChangeSMColorInterval = parseInt(options.autoChangeSMColorInterval);
        if (!isNaN(autoChangeSMColorInterval) && autoChangeSMColorInterval > 0) settings.autoChangeSMColorInterval = autoChangeSMColorInterval;else settings.autoChangeSMColorInterval = Config.autoChangeSMColorInterval;
    }
    if (typeof options.changeAllAvailableSMColorEnabled !== 'undefined') {
        settings.changeAllAvailableSMColorEnabled = typeof options.changeAllAvailableSMColorEnabled === 'boolean' ? options.changeAllAvailableSMColorEnabled : Config.changeAllAvailableSMColorEnabled;
    }
    if (typeof options.customAutoChangeSMColorList !== 'undefined') {
        if ($.isArray(options.customAutoChangeSMColorList)) {
            settings.customAutoChangeSMColorList = [];
            for (var _i5 in options.customAutoChangeSMColorList) {
                var id = parseInt(options.customAutoChangeSMColorList[_i5]);
                if (!isNaN(id) && id >= 1 && id <= 20) {
                    settings.customAutoChangeSMColorList.push(id);
                }
            }
        } else settings.customAutoChangeSMColorList = Config.customAutoChangeSMColorList;
    }

    return settings;
};

},{"./Const":6,"./Info":10,"./Log":12,"./TmpLog":20,"./Util":21}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.show = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Dialog = require('./Dialog');

var Dialog = _interopRequireWildcard(_Dialog);

var _Func = require('./Func');

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Config = require('./Config');

var _LogDialog = require('./LogDialog');

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 显示设置对话框
 */
var show = exports.show = function show() {
    if ($('#pd_config').length > 0) return;
    (0, _Config.read)();
    (0, _Func.run)('ConfigDialog.show_before_');
    var html = '\n<div class="pd_cfg_main">\n  <div class="pd_cfg_nav">\n    <a title="\u6E05\u9664\u4E0E\u52A9\u624B\u6709\u5173\u7684Cookies\u548C\u672C\u5730\u5B58\u50A8\u6570\u636E\uFF08\u4E0D\u5305\u62EC\u52A9\u624B\u8BBE\u7F6E\u548C\u65E5\u5FD7\uFF09" href="#">\u6E05\u9664\u4E34\u65F6\u6570\u636E</a>\n    <a href="#">\u8FD0\u884C\u547D\u4EE4</a>\n    <a href="#">\u67E5\u770B\u65E5\u5FD7</a>\n    <a href="#">\u5BFC\u5165/\u5BFC\u51FA\u8BBE\u7F6E</a>\n  </div>\n\n  <div class="pd_cfg_panel" style="margin-bottom: 5px;">\n    <fieldset>\n      <legend><label><input id="pd_cfg_auto_refresh_enabled" type="checkbox">\u5B9A\u65F6\u6A21\u5F0F \n<span class="pd_cfg_tips" title="\u53EF\u6309\u65F6\u8FDB\u884C\u81EA\u52A8\u64CD\u4F5C\uFF08\u5305\u62EC\u6350\u6B3E\u3001\u81EA\u52A8\u66F4\u6362ID\u989C\u8272\uFF0C\u9700\u5F00\u542F\u76F8\u5173\u529F\u80FD\uFF09\uFF0C\n\u53EA\u5728\u8BBA\u575B\u9996\u9875\u751F\u6548\uFF08\u4E0D\u5F00\u542F\u6B64\u6A21\u5F0F\u7684\u8BDD\u53EA\u80FD\u5728\u5237\u65B0\u9875\u9762\u540E\u624D\u4F1A\u8FDB\u884C\u64CD\u4F5C\uFF09">[?]</span></label></legend>\n      <label>\u6807\u9898\u63D0\u793A\u65B9\u6848<select id="pd_cfg_show_refresh_mode_tips_type"><option value="auto">\u505C\u7559\u4E00\u5206\u949F\u540E\u663E\u793A</option>\n<option value="always">\u603B\u662F\u663E\u793A</option><option value="never">\u4E0D\u663E\u793A</option></select>\n<span class="pd_cfg_tips" title="\u5728\u9996\u9875\u7684\u7F51\u9875\u6807\u9898\u4E0A\u663E\u793A\u5B9A\u65F6\u6A21\u5F0F\u63D0\u793A\u7684\u65B9\u6848">[?]</span></label>\n    </fieldset>\n    <fieldset>\n      <legend><label><input id="pd_cfg_auto_donation_enabled" type="checkbox">\u81EA\u52A8KFB\u6350\u6B3E</label></legend>\n      <label>KFB\u6350\u6B3E\u989D\u5EA6<input id="pd_cfg_donation_kfb" maxlength="4" style="width:32px" type="text">\n<span class="pd_cfg_tips" title="\u53D6\u503C\u8303\u56F4\u57281-5000\u7684\u6574\u6570\u4E4B\u95F4\uFF1B\u53EF\u8BBE\u7F6E\u4E3A\u767E\u5206\u6BD4\uFF0C\u8868\u793A\u6350\u6B3E\u989D\u5EA6\u4E3A\u5F53\u524D\u6240\u6301\u73B0\u91D1\u7684\u767E\u5206\u6BD4\uFF08\u6700\u591A\u4E0D\u8D85\u8FC75000KFB\uFF09\uFF0C\u4F8B\uFF1A80%">[?]</span></label>\n      <label class="pd_cfg_ml">\u5728<input id="pd_cfg_donation_after_time" maxlength="8" style="width:55px" type="text">\n\u4E4B\u540E\u6350\u6B3E <span class="pd_cfg_tips" title="\u5728\u5F53\u5929\u7684\u6307\u5B9A\u65F6\u95F4\u4E4B\u540E\u6350\u6B3E\uFF0824\u5C0F\u65F6\u5236\uFF09\uFF0C\u4F8B\uFF1A22:30:00\uFF08\u6CE8\u610F\u4E0D\u8981\u8BBE\u7F6E\u5F97\u592A\u63A5\u8FD1\u96F6\u70B9\uFF0C\u4EE5\u514D\u9519\u8FC7\u6350\u6B3E\uFF09">[?]</span></label>\n    </fieldset>\n    <fieldset>\n      <legend>\u9996\u9875\u76F8\u5173</legend>\n      <label>@\u63D0\u9192<select id="pd_cfg_at_tips_handle_type" style="width:130px"><option value="no_highlight">\u53D6\u6D88\u5DF2\u8BFB\u63D0\u9192\u9AD8\u4EAE</option>\n<option value="no_highlight_extra">\u53D6\u6D88\u5DF2\u8BFB\u63D0\u9192\u9AD8\u4EAE\uFF0C\u5E76\u5728\u65E0\u63D0\u9192\u65F6\u8865\u4E0A\u6D88\u606F\u6846</option><option value="hide_box_1">\u4E0D\u663E\u793A\u5DF2\u8BFB\u63D0\u9192\u7684\u6D88\u606F\u6846</option>\n<option value="hide_box_2">\u6C38\u4E0D\u663E\u793A\u6D88\u606F\u6846</option><option value="default">\u4FDD\u6301\u9ED8\u8BA4</option>\n<option value="at_change_to_cao">\u5C06@\u6539\u4E3A\u8279(\u5176\u4ED6\u548C\u65B9\u5F0F2\u76F8\u540C)</option></select>\n<span class="pd_cfg_tips" title="\u5BF9\u9996\u9875\u4E0A\u7684\u6709\u4EBA@\u4F60\u7684\u6D88\u606F\u6846\u8FDB\u884C\u5904\u7406\u7684\u65B9\u6848">[?]</span></label>\n      <label class="pd_cfg_ml"><input id="pd_cfg_sm_level_up_alert_enabled" type="checkbox">\u795E\u79D8\u7B49\u7EA7\u5347\u7EA7\u63D0\u9192 \n<span class="pd_cfg_tips" title="\u5728\u795E\u79D8\u7B49\u7EA7\u5347\u7EA7\u540E\u8FDB\u884C\u63D0\u9192\uFF0C\u53EA\u5728\u9996\u9875\u751F\u6548">[?]</span></label><br>\n      <label><input id="pd_cfg_fixed_deposit_due_alert_enabled" type="checkbox">\u5B9A\u671F\u5B58\u6B3E\u5230\u671F\u63D0\u9192 \n<span class="pd_cfg_tips" title="\u5728\u5B9A\u65F6\u5B58\u6B3E\u5230\u671F\u65F6\u8FDB\u884C\u63D0\u9192\uFF0C\u53EA\u5728\u9996\u9875\u751F\u6548">[?]</span></label>\n      <label class="pd_cfg_ml"><input id="pd_cfg_sm_rank_change_alert_enabled" type="checkbox">\u7CFB\u6570\u6392\u540D\u53D8\u5316\u63D0\u9192 \n<span class="pd_cfg_tips" title="\u5728\u795E\u79D8\u7CFB\u6570\u6392\u540D\u53D1\u751F\u53D8\u5316\u65F6\u8FDB\u884C\u63D0\u9192\uFF0C\u53EA\u5728\u9996\u9875\u751F\u6548">[?]</span></label><br>\n      <label><input id="pd_cfg_home_page_thread_fast_goto_link_enabled" type="checkbox">\u5728\u9996\u9875\u5E16\u5B50\u65C1\u663E\u793A\u8DF3\u8F6C\u94FE\u63A5 \n<span class="pd_cfg_tips" title="\u5728\u9996\u9875\u5E16\u5B50\u94FE\u63A5\u65C1\u663E\u793A\u5FEB\u901F\u8DF3\u8F6C\u81F3\u9875\u672B\u7684\u94FE\u63A5">[?]</span></label>\n      <label class="pd_cfg_ml"><input id="pd_cfg_show_vip_surplus_time_enabled" type="checkbox">\u663E\u793AVIP\u5269\u4F59\u65F6\u95F4 \n<span class="pd_cfg_tips" title="\u5728\u9996\u9875\u663E\u793AVIP\u5269\u4F59\u65F6\u95F4">[?]</span></label>\n    </fieldset>\n    <fieldset>\n      <legend>\u5E16\u5B50\u9875\u9762\u76F8\u5173</legend>\n      <label>\u5E16\u5B50\u6BCF\u9875\u697C\u5C42\u6570\u91CF<select id="pd_cfg_per_page_floor_num"><option value="10">10</option>\n<option value="20">20</option><option value="30">30</option></select>\n<span class="pd_cfg_tips" title="\u7528\u4E8E\u7535\u68AF\u76F4\u8FBE\u548C\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5\u529F\u80FD\uFF0C\u5982\u679C\u4FEE\u6539\u4E86KF\u8BBE\u7F6E\u91CC\u7684\u201C\u6587\u7AE0\u5217\u8868\u6BCF\u9875\u4E2A\u6570\u201D\uFF0C\u8BF7\u5728\u6B64\u4FEE\u6539\u6210\u76F8\u540C\u7684\u6570\u76EE">[?]</span></label>\n      <label class="pd_cfg_ml">\u5E16\u5B50\u5185\u5BB9\u5B57\u4F53\u5927\u5C0F<input id="pd_cfg_thread_content_font_size" maxlength="2" style="width: 20px;" type="text">px \n<span class="pd_cfg_tips" title="\u5E16\u5B50\u5185\u5BB9\u5B57\u4F53\u5927\u5C0F\uFF0C\u7559\u7A7A\u8868\u793A\u4F7F\u7528\u9ED8\u8BA4\u5927\u5C0F\uFF0C\u63A8\u8350\u503C\uFF1A14">[?]</span></label><br>\n      <label><input id="pd_cfg_adjust_thread_content_width_enabled" type="checkbox">\u8C03\u6574\u5E16\u5B50\u5185\u5BB9\u5BBD\u5EA6 \n<span class="pd_cfg_tips" title="\u8C03\u6574\u5E16\u5B50\u5185\u5BB9\u5BBD\u5EA6\uFF0C\u4F7F\u5176\u4FDD\u6301\u4E00\u81F4">[?]</span></label>\n      <label class="pd_cfg_ml"><input id="pd_cfg_turn_page_via_keyboard_enabled" type="checkbox">\u901A\u8FC7\u5DE6\u53F3\u952E\u7FFB\u9875 \n<span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u548C\u641C\u7D22\u9875\u9762\u901A\u8FC7\u5DE6\u53F3\u952E\u8FDB\u884C\u7FFB\u9875">[?]</span></label><br>\n      <label><input id="pd_cfg_auto_change_sm_color_enabled_2" type="checkbox" data-disabled="#pd_cfg_auto_change_sm_color_page">\u81EA\u52A8\u66F4\u6362ID\u989C\u8272 \n<span class="pd_cfg_tips" title="\u53EF\u81EA\u52A8\u66F4\u6362ID\u989C\u8272\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u524D\u5F80\u76F8\u5E94\u9875\u9762\u8FDB\u884C\u81EA\u5B9A\u4E49\u8BBE\u7F6E">[?]</span></label>\n<a id="pd_cfg_auto_change_sm_color_page" class="pd_cfg_ml" target="_blank" href="kf_growup.php">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label>\u81EA\u5B9A\u4E49\u672C\u4EBA\u7684\u795E\u79D8\u989C\u8272<input id="pd_cfg_custom_my_sm_color" maxlength="7" style="width: 50px;" type="text">\n<input style="margin-left:0" type="color" id="pd_cfg_custom_my_sm_color_select">\n<span class="pd_cfg_tips" title="\u81EA\u5B9A\u4E49\u672C\u4EBA\u7684\u795E\u79D8\u989C\u8272\uFF08\u5305\u62EC\u5E16\u5B50\u9875\u9762\u7684ID\u663E\u793A\u989C\u8272\u548C\u697C\u5C42\u8FB9\u6846\u989C\u8272\uFF0C\u4EC5\u81EA\u5DF1\u53EF\u89C1\uFF09\uFF0C\u4F8B\uFF1A#009CFF\uFF0C\u5982\u65E0\u9700\u6C42\u53EF\u7559\u7A7A">[?]</span></label><br>\n      <label><input id="pd_cfg_custom_sm_color_enabled" type="checkbox" data-disabled="#pd_cfg_custom_sm_color_dialog">\u81EA\u5B9A\u4E49\u5404\u7B49\u7EA7\u795E\u79D8\u989C\u8272 \n<span class="pd_cfg_tips" title="\u81EA\u5B9A\u4E49\u5404\u7B49\u7EA7\u795E\u79D8\u989C\u8272\uFF08\u5305\u62EC\u5E16\u5B50\u9875\u9762\u7684ID\u663E\u793A\u989C\u8272\u548C\u697C\u5C42\u8FB9\u6846\u989C\u8272\uFF0C\u4EC5\u81EA\u5DF1\u53EF\u89C1\uFF09\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u81EA\u5B9A\u4E49\u5404\u7B49\u7EA7\u989C\u8272">[?]</span></label>\n<a class="pd_cfg_ml" id="pd_cfg_custom_sm_color_dialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label><input id="pd_cfg_modify_kf_other_domain_enabled" type="checkbox">\u5C06\u7EEF\u6708\u5176\u5B83\u57DF\u540D\u7684\u94FE\u63A5\u4FEE\u6539\u4E3A\u5F53\u524D\u57DF\u540D \n<span class="pd_cfg_tips" title="\u5C06\u5E16\u5B50\u548C\u77ED\u6D88\u606F\u4E2D\u7684\u7EEF\u6708\u5176\u5B83\u57DF\u540D\u7684\u94FE\u63A5\u4FEE\u6539\u4E3A\u5F53\u524D\u57DF\u540D">[?]</span></label><br>\n      <label><input id="pd_cfg_multi_quote_enabled" type="checkbox">\u5F00\u542F\u591A\u91CD\u5F15\u7528\u529F\u80FD \n<span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u9875\u9762\u5F00\u542F\u591A\u91CD\u56DE\u590D\u548C\u591A\u91CD\u5F15\u7528\u529F\u80FD">[?]</span></label>\n      <label class="pd_cfg_ml"><input id="pd_cfg_show_self_rating_link_enabled" type="checkbox">\u663E\u793A\u81EA\u52A9\u8BC4\u5206\u94FE\u63A5 \n<span class="pd_cfg_tips" title="\u5728\u7B26\u5408\u6761\u4EF6\u7684\u5E16\u5B50\u9875\u9762\u663E\u793A\u81EA\u52A9\u8BC4\u5206\u7684\u94FE\u63A5\uFF08\u4EC5\u9650\u81EA\u52A9\u8BC4\u5206\u6D4B\u8BD5\u4EBA\u5458\u4F7F\u7528\uFF09">[?]</span></label><br>\n      <label><input id="pd_cfg_user_memo_enabled" type="checkbox" data-disabled="#pd_cfg_user_memo_dialog">\u663E\u793A\u7528\u6237\u5907\u6CE8 \n<span class="pd_cfg_tips" title="\u663E\u793A\u7528\u6237\u7684\u81EA\u5B9A\u4E49\u5907\u6CE8\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u81EA\u5B9A\u4E49\u7528\u6237\u5907\u6CE8">[?]</span></label>\n<a class="pd_cfg_ml" id="pd_cfg_user_memo_dialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a>\n      <label class="pd_cfg_ml"><input id="pd_cfg_parse_media_tag_enabled" type="checkbox">\u89E3\u6790\u591A\u5A92\u4F53\u6807\u7B7E \n<span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u9875\u9762\u89E3\u6790HTML5\u591A\u5A92\u4F53\u6807\u7B7E\uFF0C\u8BE6\u89C1\u3010\u5E38\u89C1\u95EE\u989811\u3011">[?]</span></label><br>\n      <label><input id="pd_cfg_batch_buy_thread_enabled" type="checkbox">\u5F00\u542F\u6279\u91CF\u8D2D\u4E70\u5E16\u5B50\u529F\u80FD \n<span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u9875\u9762\u5F00\u542F\u6279\u91CF\u8D2D\u4E70\u5E16\u5B50\u7684\u529F\u80FD">[?]</span></label>\n      <label class="pd_cfg_ml"><input id="pd_cfg_buy_thread_via_ajax_enabled" type="checkbox">\u4F7F\u7528Ajax\u8D2D\u4E70\u5E16\u5B50 \n<span class="pd_cfg_tips" title="\u4F7F\u7528Ajax\u7684\u65B9\u5F0F\u8D2D\u4E70\u5E16\u5B50\uFF0C\u8D2D\u4E70\u65F6\u9875\u9762\u4E0D\u4F1A\u8DF3\u8F6C">[?]</span></label><br>\n    </fieldset>\n  </div>\n\n  <div class="pd_cfg_panel">\n    <fieldset>\n      <legend>\u7248\u5757\u9875\u9762\u76F8\u5173</legend>\n      <label><input id="pd_cfg_show_fast_goto_thread_page_enabled" type="checkbox" data-disabled="#pd_cfg_max_fast_goto_thread_page_num">\n\u663E\u793A\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5 <span class="pd_cfg_tips" title="\u5728\u7248\u5757\u9875\u9762\u4E2D\u663E\u793A\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5">[?]</span></label>\n      <label class="pd_cfg_ml">\u9875\u6570\u94FE\u63A5\u6700\u5927\u6570\u91CF<input id="pd_cfg_max_fast_goto_thread_page_num" style="width:25px" maxlength="4" type="text">\n<span class="pd_cfg_tips" title="\u5728\u5E16\u5B50\u9875\u6570\u5FEB\u6377\u94FE\u63A5\u4E2D\u663E\u793A\u9875\u6570\u94FE\u63A5\u7684\u6700\u5927\u6570\u91CF">[?]</span></label><br>\n      <label><input id="pd_cfg_highlight_new_post_enabled" type="checkbox">\u9AD8\u4EAE\u4ECA\u65E5\u7684\u65B0\u5E16 \n<span class="pd_cfg_tips" title="\u5728\u7248\u5757\u9875\u9762\u4E2D\u9AD8\u4EAE\u4ECA\u65E5\u65B0\u53D1\u8868\u5E16\u5B50\u7684\u53D1\u8868\u65F6\u95F4">[?]</span></label>\n    </fieldset>\n    <fieldset>\n      <legend>\u5176\u5B83\u8BBE\u7F6E</legend>\n      <label class="pd_highlight">\u5B58\u50A8\u7C7B\u578B<select id="pd_cfg_storage_type"><option value="Default">\u9ED8\u8BA4</option>\n<option value="ByUid">\u6309uid</option><option value="Global">\u5168\u5C40</option></select>\n<span class="pd_cfg_tips" title="\u52A9\u624B\u8BBE\u7F6E\u548C\u65E5\u5FD7\u7684\u5B58\u50A8\u65B9\u5F0F\uFF0C\u8BE6\u60C5\u53C2\u89C1\u3010\u5E38\u89C1\u95EE\u98981\u3011">[?]</span></label>\n      <label class="pd_cfg_ml">\u6D4F\u89C8\u5668\u7C7B\u578B<select id="pd_cfg_browse_type"><option value="auto">\u81EA\u52A8\u68C0\u6D4B</option>\n<option value="desktop">\u684C\u9762\u7248</option><option value="mobile">\u79FB\u52A8\u7248</option></select>\n<span class="pd_cfg_tips" title="\u7528\u4E8E\u5728KFOL\u52A9\u624B\u4E0A\u5224\u65AD\u6D4F\u89C8\u5668\u7684\u7C7B\u578B\uFF0C\u4E00\u822C\u4F7F\u7528\u81EA\u52A8\u68C0\u6D4B\u5373\u53EF\uFF1B\n\u5982\u679C\u5F53\u524D\u6D4F\u89C8\u5668\u4E0E\u81EA\u52A8\u68C0\u6D4B\u7684\u7C7B\u578B\u4E0D\u76F8\u7B26\uFF08\u79FB\u52A8\u7248\u4F1A\u5728\u8BBE\u7F6E\u754C\u9762\u6807\u9898\u4E0A\u663E\u793A\u201CFor Mobile\u201D\u7684\u5B57\u6837\uFF09\uFF0C\u8BF7\u624B\u52A8\u8BBE\u7F6E\u4E3A\u6B63\u786E\u7684\u7C7B\u578B">[?]</span></label><br>\n      <label><input id="pd_cfg_animation_effect_off_enabled" type="checkbox">\u7981\u7528\u52A8\u753B\u6548\u679C \n<span class="pd_cfg_tips" title="\u7981\u7528jQuery\u7684\u52A8\u753B\u6548\u679C\uFF08\u63A8\u8350\u5728\u914D\u7F6E\u8F83\u5DEE\u7684\u673A\u5668\u4E0A\u4F7F\u7528\uFF09">[?]</span></label><br>\n      <label>\u9ED8\u8BA4\u7684\u6D88\u606F\u663E\u793A\u65F6\u95F4<input id="pd_cfg_def_show_msg_duration" maxlength="5" style="width: 30px;" type="text">\u79D2 \n<span class="pd_cfg_tips" title="\u9ED8\u8BA4\u7684\u6D88\u606F\u663E\u793A\u65F6\u95F4\uFF08\u79D2\uFF09\uFF0C\u8BBE\u7F6E\u4E3A-1\u8868\u793A\u6C38\u4E45\u663E\u793A\uFF0C\u4F8B\uFF1A15">[?]</span></label>\n      <label class="pd_cfg_ml">\u65E5\u5FD7\u4FDD\u5B58\u5929\u6570<input id="pd_cfg_log_save_days" maxlength="3" style="width:25px" type="text">\n<span class="pd_cfg_tips" title="\u9ED8\u8BA4\u503C\uFF1A' + _Config.Config.logSaveDays + '">[?]</span></label><br>\n      <label><input id="pd_cfg_show_log_link_enabled" type="checkbox">\u663E\u793A\u65E5\u5FD7\u94FE\u63A5 \n<span class="pd_cfg_tips" title="\u5728\u9875\u9762\u4E0A\u65B9\u663E\u793A\u52A9\u624B\u65E5\u5FD7\u7684\u94FE\u63A5">[?]</span></label>\n      <label class="pd_cfg_ml"><input id="pd_cfg_show_search_link_enabled" type="checkbox">\u663E\u793A\u641C\u7D22\u94FE\u63A5 \n<span class="pd_cfg_tips" title="\u5728\u9875\u9762\u4E0A\u65B9\u663E\u793A\u641C\u7D22\u5BF9\u8BDD\u6846\u7684\u94FE\u63A5">[?]</span></label><br>\n      <label><input id="pd_cfg_add_side_bar_fast_nav_enabled" type="checkbox">\u4E3A\u4FA7\u8FB9\u680F\u6DFB\u52A0\u5FEB\u6377\u5BFC\u822A \n<span class="pd_cfg_tips" title="\u4E3A\u4FA7\u8FB9\u680F\u6DFB\u52A0\u5FEB\u6377\u5BFC\u822A\u7684\u94FE\u63A5">[?]</span></label>\n      <label class="pd_cfg_ml"><input id="pd_cfg_modify_side_bar_enabled" type="checkbox">\u5C06\u4FA7\u8FB9\u680F\u4FEE\u6539\u4E3A\u5E73\u94FA\u6837\u5F0F \n<span class="pd_cfg_tips" title="\u5C06\u4FA7\u8FB9\u680F\u4FEE\u6539\u4E3A\u548C\u624B\u673A\u76F8\u540C\u7684\u5E73\u94FA\u6837\u5F0F">[?]</span></label><br>\n      <label><input id="pd_cfg_custom_css_enabled" type="checkbox" data-disabled="#pd_cfg_custom_css_dialog">\u6DFB\u52A0\u81EA\u5B9A\u4E49CSS \n<span class="pd_cfg_tips" title="\u4E3A\u9875\u9762\u6DFB\u52A0\u81EA\u5B9A\u4E49\u7684CSS\u5185\u5BB9\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u586B\u5165\u81EA\u5B9A\u4E49\u7684CSS\u5185\u5BB9">[?]</span></label>\n<a class="pd_cfg_ml" id="pd_cfg_custom_css_dialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label><input id="pd_cfg_custom_script_enabled" type="checkbox" data-disabled="#pd_cfg_custom_script_dialog">\u6267\u884C\u81EA\u5B9A\u4E49\u811A\u672C \n<span class="pd_cfg_tips" title="\u6267\u884C\u81EA\u5B9A\u4E49\u7684javascript\u811A\u672C\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u586B\u5165\u81EA\u5B9A\u4E49\u7684\u811A\u672C\u5185\u5BB9">[?]</span></label>\n<a class="pd_cfg_ml" id="pd_cfg_custom_script_dialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a>\n    </fieldset>\n    <fieldset>\n      <legend>\u5173\u6CE8\u548C\u5C4F\u853D</legend>\n      <label><input id="pd_cfg_follow_user_enabled" type="checkbox" data-disabled="#pd_cfg_follow_user_dialog">\u5173\u6CE8\u7528\u6237 \n<span class="pd_cfg_tips" title="\u5F00\u542F\u5173\u6CE8\u7528\u6237\u7684\u529F\u80FD\uFF0C\u6240\u5173\u6CE8\u7684\u7528\u6237\u5C06\u88AB\u52A0\u6CE8\u8BB0\u53F7\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5173\u6CE8\u7528\u6237">[?]</span></label>\n<a class="pd_cfg_ml" id="pd_cfg_follow_user_dialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label><input id="pd_cfg_block_user_enabled" type="checkbox" data-disabled="#pd_cfg_block_user_dialog">\u5C4F\u853D\u7528\u6237 \n<span class="pd_cfg_tips" title="\u5F00\u542F\u5C4F\u853D\u7528\u6237\u7684\u529F\u80FD\uFF0C\u4F60\u5C06\u770B\u4E0D\u89C1\u6240\u5C4F\u853D\u7528\u6237\u7684\u53D1\u8A00\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5C4F\u853D\u7528\u6237">[?]</span></label>\n<a class="pd_cfg_ml" id="pd_cfg_block_user_dialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n      <label><input id="pd_cfg_block_thread_enabled" type="checkbox" data-disabled="#pd_cfg_block_thread_dialog">\u5C4F\u853D\u5E16\u5B50 \n<span class="pd_cfg_tips" title="\u5F00\u542F\u5C4F\u853D\u6807\u9898\u5305\u542B\u6307\u5B9A\u5173\u952E\u5B57\u7684\u5E16\u5B50\u7684\u529F\u80FD\uFF0C\u8BF7\u70B9\u51FB\u8BE6\u7EC6\u8BBE\u7F6E\u7BA1\u7406\u5C4F\u853D\u5173\u952E\u5B57">[?]</span></label>\n<a class="pd_cfg_ml" id="pd_cfg_block_thread_dialog" href="#">\u8BE6\u7EC6\u8BBE\u7F6E&raquo;</a><br>\n    </fieldset>\n    <fieldset>\n      <legend><label><input id="pd_cfg_auto_save_current_deposit_enabled" type="checkbox">\u81EA\u52A8\u6D3B\u671F\u5B58\u6B3E \n<span class="pd_cfg_tips" title="\u5728\u5F53\u524D\u6536\u5165\u6EE1\u8DB3\u6307\u5B9A\u989D\u5EA6\u4E4B\u540E\u81EA\u52A8\u5C06\u6307\u5B9A\u6570\u989D\u5B58\u5165\u6D3B\u671F\u5B58\u6B3E\u4E2D\uFF0C\u53EA\u4F1A\u5728\u9996\u9875\u89E6\u53D1">[?]</span></label></legend>\n      <label>\u5728\u5F53\u524D\u6536\u5165\u5DF2\u6EE1<input id="pd_cfg_save_current_deposit_after_kfb" maxlength="10" style="width:45px" type="text">KFB\u4E4B\u540E \n<span class="pd_cfg_tips" title="\u5728\u5F53\u524D\u6536\u5165\u5DF2\u6EE1\u6307\u5B9AKFB\u989D\u5EA6\u4E4B\u540E\u81EA\u52A8\u8FDB\u884C\u6D3B\u671F\u5B58\u6B3E\uFF0C\u4F8B\uFF1A1000">[?]</span></label><br>\n      <label>\u5C06<input id="pd_cfg_save_current_deposit_kfb" maxlength="10" style="width:45px" type="text">KFB\u5B58\u5165\u6D3B\u671F\u5B58\u6B3E \n<span class="pd_cfg_tips" title="\u5C06\u6307\u5B9A\u989D\u5EA6\u7684KFB\u5B58\u5165\u6D3B\u671F\u5B58\u6B3E\u4E2D\uFF0C\u4F8B\uFF1A900\uFF1B\u4E3E\u4F8B\uFF1A\u8BBE\u5B9A\u5DF2\u6EE11000\u5B58900\uFF0C\u5F53\u524D\u6536\u5165\u4E3A2000\uFF0C\u5219\u81EA\u52A8\u5B58\u5165\u91D1\u989D\u4E3A1800">[?]</span></label>\n    </fieldset>\n  </div>\n</div>\n\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about">\n    <a target="_blank" href="read.php?tid=508450">By \u55B5\u62C9\u5E03\u4E01</a>\n    <i style="color:#666;font-style:normal">(V' + _Info2.default.version + ')</i>\n    <a target="_blank" href="https://git.oschina.net/miaolapd/KF_Online_Assistant/wikis/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98">[\u5E38\u89C1\u95EE\u9898]</a>\n  </span>\n  <button>\u786E\u5B9A</button><button>\u53D6\u6D88</button><button>\u9ED8\u8BA4\u503C</button>\n</div>';
    var $dialog = Dialog.create('pd_config', 'KF Online助手设置' + (_Info2.default.isMobile ? ' (For Mobile)' : ''), html);

    $dialog.find('.pd_cfg_btns > button:eq(1)').click(function () {
        return Dialog.close('pd_config');
    }).end().find('.pd_cfg_btns > button:eq(2)').click(function (e) {
        e.preventDefault();
        if (confirm('是否重置所有设置？')) {
            (0, _Config.clear)();
            alert('设置已重置');
            location.reload();
        }
    }).end().find('.pd_cfg_nav > a:first-child').click(function (e) {
        e.preventDefault();
        var type = prompt('可清除与助手有关的Cookies和本地临时数据（不包括助手设置和日志）\n' + '请填写清除类型，0：全部清除；1：清除Cookies；2：清除本地临时数据', 0);
        if (type === null) return;
        type = parseInt($.trim(type));
        if (!isNaN(type) && type >= 0) {
            clearTmpData(type);
            alert('缓存已清除');
        }
    }).next('a').click(function (e) {
        e.preventDefault();
        showRunCommandDialog();
    }).next('a').click(function (e) {
        e.preventDefault();
        (0, _LogDialog.show)();
    }).next('a').click(function (e) {
        e.preventDefault();
        showImportOrExportSettingDialog();
    });

    $dialog.on('click', 'a[id^="pd_cfg_"][href="#"]', function (e) {
        e.preventDefault();
        if ($(this).hasClass('pd_disabled_link')) return;
        if (this.id === 'pd_cfg_custom_sm_color_dialog') showCustomSmColorDialog();else if (this.id === 'pd_cfg_user_memo_dialog') showUserMemoDialog();else if (this.id === 'pd_cfg_custom_css_dialog') showCustomCssDialog();else if (this.id === 'pd_cfg_custom_script_dialog') showCustomScriptDialog();else if (this.id === 'pd_cfg_follow_user_dialog') showFollowUserDialog();else if (this.id === 'pd_cfg_block_user_dialog') showBlockUserDialog();else if (this.id === 'pd_cfg_block_thread_dialog') showBlockThreadDialog();
    }).end().find('#pd_cfg_custom_my_sm_color_select').change(function () {
        $('#pd_cfg_custom_my_sm_color').val($(this).val().toString().toUpperCase());
    }).end().find('pd_cfg_custom_my_sm_color').keyup(function () {
        var customMySmColor = $.trim($(this).val());
        if (/^#[0-9a-fA-F]{6}$/.test(customMySmColor)) {
            $('pd_cfg_custom_my_sm_color_select').val(customMySmColor.toUpperCase());
        }
    });

    setValue();
    $dialog.submit(function (e) {
        e.preventDefault();
        $('.pd_cfg_btns > button:first').click();
    }).end().find('.pd_cfg_btns > button:first').click(function (e) {
        e.preventDefault();
        if (!verify()) return;
        var oriAutoRefreshEnabled = Config.autoRefreshEnabled;
        (0, _Config.read)();
        var options = getValue();
        options = (0, _Config.normalize)(options);
        $.extend(Config, options);
        (0, _Config.write)();
        var storageType = $('#pd_cfg_storage_type').val();
        if (storageType !== _Info2.default.storageType) {
            (0, _Config.changeStorageType)(storageType);
            alert('存储类型已修改');
            Dialog.close('pd_config');
            location.reload();
            return;
        }
        Dialog.close('pd_config');
        if (oriAutoRefreshEnabled !== options.autoRefreshEnabled) {
            if (confirm('你已修改了定时模式的设置，需要刷新页面才能生效，是否立即刷新？')) {
                location.reload();
            }
        }
    });

    Dialog.show('pd_config');
    $dialog.find('a:first').focus();
    (0, _Func.run)('ConfigDialog.show_after_');
};

/**
 * 设置对话框中的字段值
 */
var setValue = function setValue() {
    $('#pd_cfg_auto_refresh_enabled').prop('checked', Config.autoRefreshEnabled);
    $('#pd_cfg_show_refresh_mode_tips_type').val(Config.showRefreshModeTipsType.toLowerCase());

    $('#pd_cfg_auto_donation_enabled').prop('checked', Config.autoDonationEnabled);
    $('#pd_cfg_donation_kfb').val(Config.donationKfb);
    $('#pd_cfg_donation_after_time').val(Config.donationAfterTime);

    $('#pd_cfg_at_tips_handle_type').val(Config.atTipsHandleType.toLowerCase());
    $('#pd_cfg_sm_level_up_alert_enabled').prop('checked', Config.smLevelUpAlertEnabled);
    $('#pd_cfg_fixed_deposit_due_alert_enabled').prop('checked', Config.fixedDepositDueAlertEnabled);
    $('#pd_cfg_sm_rank_change_alert_enabled').prop('checked', Config.smRankChangeAlertEnabled);
    $('#pd_cfg_home_page_thread_fast_goto_link_enabled').prop('checked', Config.homePageThreadFastGotoLinkEnabled);
    $('#pd_cfg_show_vip_surplus_time_enabled').prop('checked', Config.showVipSurplusTimeEnabled);

    $('#pd_cfg_show_fast_goto_thread_page_enabled').prop('checked', Config.showFastGotoThreadPageEnabled);
    $('#pd_cfg_max_fast_goto_thread_page_num').val(Config.maxFastGotoThreadPageNum);
    $('#pd_cfg_highlight_new_post_enabled').prop('checked', Config.highlightNewPostEnabled);

    $('#pd_cfg_per_page_floor_num').val(Config.perPageFloorNum);
    $('#pd_cfg_thread_content_font_size').val(Config.threadContentFontSize > 0 ? Config.threadContentFontSize : '');
    $('#pd_cfg_adjust_thread_content_width_enabled').prop('checked', Config.adjustThreadContentWidthEnabled);
    $('#pd_cfg_turn_page_via_keyboard_enabled').prop('checked', Config.turnPageViaKeyboardEnabled);
    $('#pd_cfg_auto_change_sm_color_enabled_2').prop('checked', Config.autoChangeSMColorEnabled);
    $('#pd_cfg_custom_my_sm_color').val(Config.customMySmColor);
    if (Config.customMySmColor) $('#pd_cfg_custom_my_sm_color_select').val(Config.customMySmColor);
    $('#pd_cfg_custom_sm_color_enabled').prop('checked', Config.customSmColorEnabled);
    $('#pd_cfg_modify_kf_other_domain_enabled').prop('checked', Config.modifyKFOtherDomainEnabled);
    $('#pd_cfg_multi_quote_enabled').prop('checked', Config.multiQuoteEnabled);
    $('#pd_cfg_batch_buy_thread_enabled').prop('checked', Config.batchBuyThreadEnabled);
    $('#pd_cfg_user_memo_enabled').prop('checked', Config.userMemoEnabled);
    $('#pd_cfg_parse_media_tag_enabled').prop('checked', Config.parseMediaTagEnabled);
    $('#pd_cfg_show_self_rating_link_enabled').prop('checked', Config.showSelfRatingLinkEnabled);
    $('#pd_cfg_buy_thread_via_ajax_enabled').prop('checked', Config.buyThreadViaAjaxEnabled);

    $('#pd_cfg_def_show_msg_duration').val(Config.defShowMsgDuration);
    $('#pd_cfg_animation_effect_off_enabled').prop('checked', Config.animationEffectOffEnabled);
    $('#pd_cfg_log_save_days').val(Config.logSaveDays);
    $('#pd_cfg_browse_type').val(Config.browseType);
    $('#pd_cfg_show_log_link_enabled').prop('checked', Config.showLogLinkEnabled);
    $('#pd_cfg_show_search_link_enabled').prop('checked', Config.showSearchLinkEnabled);
    $('#pd_cfg_add_side_bar_fast_nav_enabled').prop('checked', Config.addSideBarFastNavEnabled);
    $('#pd_cfg_modify_side_bar_enabled').prop('checked', Config.modifySideBarEnabled);
    $('#pd_cfg_custom_css_enabled').prop('checked', Config.customCssEnabled);
    $('#pd_cfg_custom_script_enabled').prop('checked', Config.customScriptEnabled);

    $('#pd_cfg_follow_user_enabled').prop('checked', Config.followUserEnabled);
    $('#pd_cfg_block_user_enabled').prop('checked', Config.blockUserEnabled);
    $('#pd_cfg_block_thread_enabled').prop('checked', Config.blockThreadEnabled);

    $('#pd_cfg_auto_save_current_deposit_enabled').prop('checked', Config.autoSaveCurrentDepositEnabled);
    if (Config.saveCurrentDepositAfterKfb > 0) $('#pd_cfg_save_current_deposit_after_kfb').val(Config.saveCurrentDepositAfterKfb);
    if (Config.saveCurrentDepositKfb > 0) $('#pd_cfg_save_current_deposit_kfb').val(Config.saveCurrentDepositKfb);

    $('#pd_cfg_storage_type').val(_Info2.default.storageType);
    if (typeof GM_getValue === 'undefined') $('#pd_cfg_storage_type > option:gt(0)').prop('disabled', true);
};

/**
 * 获取对话框中字段值的Config对象
 * @returns {Config} 字段值的Config对象
 */
var getValue = function getValue() {
    var options = {};
    options.autoRefreshEnabled = $('#pd_cfg_auto_refresh_enabled').prop('checked');
    options.showRefreshModeTipsType = $('#pd_cfg_show_refresh_mode_tips_type').val();

    options.autoDonationEnabled = $('#pd_cfg_auto_donation_enabled').prop('checked');
    options.donationKfb = $.trim($('#pd_cfg_donation_kfb').val());
    options.donationAfterTime = $('#pd_cfg_donation_after_time').val();

    options.atTipsHandleType = $('#pd_cfg_at_tips_handle_type').val();
    options.smLevelUpAlertEnabled = $('#pd_cfg_sm_level_up_alert_enabled').prop('checked');
    options.fixedDepositDueAlertEnabled = $('#pd_cfg_fixed_deposit_due_alert_enabled').prop('checked');
    options.smRankChangeAlertEnabled = $('#pd_cfg_sm_rank_change_alert_enabled').prop('checked');
    options.homePageThreadFastGotoLinkEnabled = $('#pd_cfg_home_page_thread_fast_goto_link_enabled').prop('checked');
    options.showVipSurplusTimeEnabled = $('#pd_cfg_show_vip_surplus_time_enabled').prop('checked');

    options.showFastGotoThreadPageEnabled = $('#pd_cfg_show_fast_goto_thread_page_enabled').prop('checked');
    options.maxFastGotoThreadPageNum = parseInt($.trim($('#pd_cfg_max_fast_goto_thread_page_num').val()));
    options.highlightNewPostEnabled = $('#pd_cfg_highlight_new_post_enabled').prop('checked');

    options.perPageFloorNum = $('#pd_cfg_per_page_floor_num').val();
    options.threadContentFontSize = parseInt($.trim($('#pd_cfg_thread_content_font_size').val()));
    options.adjustThreadContentWidthEnabled = $('#pd_cfg_adjust_thread_content_width_enabled').prop('checked');
    options.turnPageViaKeyboardEnabled = $('#pd_cfg_turn_page_via_keyboard_enabled').prop('checked');
    options.autoChangeSMColorEnabled = $('#pd_cfg_auto_change_sm_color_enabled_2').prop('checked');
    options.customMySmColor = $.trim($('#pd_cfg_custom_my_sm_color').val()).toUpperCase();
    options.customSmColorEnabled = $('#pd_cfg_custom_sm_color_enabled').prop('checked');
    options.modifyKFOtherDomainEnabled = $('#pd_cfg_modify_kf_other_domain_enabled').prop('checked');
    options.multiQuoteEnabled = $('#pd_cfg_multi_quote_enabled').prop('checked');
    options.batchBuyThreadEnabled = $('#pd_cfg_batch_buy_thread_enabled').prop('checked');
    options.userMemoEnabled = $('#pd_cfg_user_memo_enabled').prop('checked');
    options.parseMediaTagEnabled = $('#pd_cfg_parse_media_tag_enabled').prop('checked');
    options.showSelfRatingLinkEnabled = $('#pd_cfg_show_self_rating_link_enabled').prop('checked');
    options.buyThreadViaAjaxEnabled = $('#pd_cfg_buy_thread_via_ajax_enabled').prop('checked');

    options.defShowMsgDuration = parseInt($.trim($('#pd_cfg_def_show_msg_duration').val()));
    options.animationEffectOffEnabled = $('#pd_cfg_animation_effect_off_enabled').prop('checked');
    options.logSaveDays = parseInt($.trim($('#pd_cfg_log_save_days').val()));
    options.browseType = $('#pd_cfg_browse_type').val();
    options.showLogLinkEnabled = $('#pd_cfg_show_log_link_enabled').prop('checked');
    options.showSearchLinkEnabled = $('#pd_cfg_show_search_link_enabled').prop('checked');
    options.addSideBarFastNavEnabled = $('#pd_cfg_add_side_bar_fast_nav_enabled').prop('checked');
    options.modifySideBarEnabled = $('#pd_cfg_modify_side_bar_enabled').prop('checked');
    options.customCssEnabled = $('#pd_cfg_custom_css_enabled').prop('checked');
    options.customScriptEnabled = $('#pd_cfg_custom_script_enabled').prop('checked');

    options.followUserEnabled = $('#pd_cfg_follow_user_enabled').prop('checked');
    options.blockUserEnabled = $('#pd_cfg_block_user_enabled').prop('checked');
    options.blockThreadEnabled = $('#pd_cfg_block_thread_enabled').prop('checked');

    options.autoSaveCurrentDepositEnabled = $('#pd_cfg_auto_save_current_deposit_enabled').prop('checked');
    options.saveCurrentDepositAfterKfb = parseInt($.trim($('#pd_cfg_save_current_deposit_after_kfb').val()));
    options.saveCurrentDepositKfb = parseInt($.trim($('#pd_cfg_save_current_deposit_kfb').val()));
    return options;
};

/**
 * 验证设置是否正确
 * @returns {boolean} 是否验证通过
 */
var verify = function verify() {
    var $txtDonationKfb = $('#pd_cfg_donation_kfb');
    var donationKfb = $.trim($txtDonationKfb.val());
    if (/%$/.test(donationKfb)) {
        if (!/^1?\d?\d%$/.test(donationKfb)) {
            alert('KFB捐款额度格式不正确');
            $txtDonationKfb.select();
            $txtDonationKfb.focus();
            return false;
        }
        if (parseInt(donationKfb) <= 0 || parseInt(donationKfb) > 100) {
            alert('KFB捐款额度百分比的取值范围在1-100之间');
            $txtDonationKfb.select();
            $txtDonationKfb.focus();
            return false;
        }
    } else {
        if (!$.isNumeric(donationKfb)) {
            alert('KFB捐款额度格式不正确');
            $txtDonationKfb.select();
            $txtDonationKfb.focus();
            return false;
        }
        if (parseInt(donationKfb) <= 0 || parseInt(donationKfb) > _Const2.default.maxDonationKfb) {
            alert('KFB捐款额度的取值范围在1-{0}之间'.replace('{0}', _Const2.default.maxDonationKfb));
            $txtDonationKfb.select();
            $txtDonationKfb.focus();
            return false;
        }
    }

    var $txtDonationAfterTime = $('#pd_cfg_donation_after_time');
    var donationAfterTime = $.trim($txtDonationAfterTime.val());
    if (!/^(2[0-3]|[0-1][0-9]):[0-5][0-9]:[0-5][0-9]$/.test(donationAfterTime)) {
        alert('在指定时间之后捐款格式不正确');
        $txtDonationAfterTime.select();
        $txtDonationAfterTime.focus();
        return false;
    }

    var $txtMaxFastGotoThreadPageNum = $('#pd_cfg_max_fast_goto_thread_page_num');
    var maxFastGotoThreadPageNum = $.trim($txtMaxFastGotoThreadPageNum.val());
    if (!$.isNumeric(maxFastGotoThreadPageNum) || parseInt(maxFastGotoThreadPageNum) <= 0) {
        alert('页数链接最大数量格式不正确');
        $txtMaxFastGotoThreadPageNum.select();
        $txtMaxFastGotoThreadPageNum.focus();
        return false;
    }

    var $txtThreadContentFontSize = $('#pd_cfg_thread_content_font_size');
    var threadContentFontSize = $.trim($txtThreadContentFontSize.val());
    if (threadContentFontSize && (isNaN(parseInt(threadContentFontSize)) || parseInt(threadContentFontSize) < 0)) {
        alert('帖子内容字体大小格式不正确');
        $txtThreadContentFontSize.select();
        $txtThreadContentFontSize.focus();
        return false;
    }

    var $txtCustomMySmColor = $('#pd_cfg_custom_my_sm_color');
    var customMySmColor = $.trim($txtCustomMySmColor.val());
    if (customMySmColor && !/^#[0-9a-fA-F]{6}$/.test(customMySmColor)) {
        alert('自定义本人的神秘颜色格式不正确，例：#009CFF');
        $txtCustomMySmColor.select();
        $txtCustomMySmColor.focus();
        return false;
    }

    var $txtDefShowMsgDuration = $('#pd_cfg_def_show_msg_duration');
    var defShowMsgDuration = $.trim($txtDefShowMsgDuration.val());
    if (!$.isNumeric(defShowMsgDuration) || parseInt(defShowMsgDuration) < -1) {
        alert('默认的消息显示时间格式不正确');
        $txtDefShowMsgDuration.select();
        $txtDefShowMsgDuration.focus();
        return false;
    }

    var $txtLogSaveDays = $('#pd_cfg_log_save_days');
    var logSaveDays = $.trim($txtLogSaveDays.val());
    if (!$.isNumeric(logSaveDays) || parseInt(logSaveDays) < 1) {
        alert('日志保存天数格式不正确');
        $txtLogSaveDays.select();
        $txtLogSaveDays.focus();
        return false;
    }

    var $txtSaveCurrentDepositAfterKfb = $('#pd_cfg_save_current_deposit_after_kfb');
    var $txtSaveCurrentDepositKfb = $('#pd_cfg_save_current_deposit_kfb');
    var saveCurrentDepositAfterKfb = parseInt($txtSaveCurrentDepositAfterKfb.val());
    var saveCurrentDepositKfb = parseInt($txtSaveCurrentDepositKfb.val());
    if (saveCurrentDepositAfterKfb || saveCurrentDepositKfb) {
        if (!saveCurrentDepositAfterKfb || saveCurrentDepositAfterKfb <= 0) {
            alert('自动活期存款满足额度格式不正确');
            $txtSaveCurrentDepositAfterKfb.select();
            $txtSaveCurrentDepositAfterKfb.focus();
            return false;
        }
        if (!saveCurrentDepositKfb || saveCurrentDepositKfb <= 0 || saveCurrentDepositKfb > saveCurrentDepositAfterKfb) {
            alert('想要存款的金额格式不正确');
            $txtSaveCurrentDepositKfb.select();
            $txtSaveCurrentDepositKfb.focus();
            return false;
        }
    }

    return true;
};

/**
 * 清除临时数据
 * @param {number} type 清除类别，0：全部清除；1：清除Cookies；2：清除本地临时数据
 */
var clearTmpData = function clearTmpData() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    if (type === 0 || type === 1) {
        for (var key in _Const2.default) {
            if (/CookieName$/.test(key)) {
                Util.deleteCookie(_Const2.default[key]);
            }
        }
    }
    if (type === 0 || type === 2) {
        TmpLog.clear();
        localStorage.removeItem(_Const2.default.multiQuoteStorageName);
    }
};

/**
 * 显示运行命令对话框
 */
var showRunCommandDialog = function showRunCommandDialog() {
    if ($('#pd_run_command').length > 0) return;
    Dialog.close('pd_config');
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin: 5px 0;">\u8FD0\u884C\u547D\u4EE4\u5FEB\u6377\u952E\uFF1A<b>Ctrl+Enter</b>\uFF1B\u6E05\u9664\u547D\u4EE4\u5FEB\u6377\u952E\uFF1A<b>Ctrl+\u9000\u683C\u952E</b><br>\n\u6309<b>F12\u952E</b>\u53EF\u6253\u5F00\u6D4F\u89C8\u5668\u63A7\u5236\u53F0\u67E5\u770B\u6D88\u606F\uFF08\u9700\u5207\u6362\u81F3\u63A7\u5236\u53F0\u6216Console\u6807\u7B7E\uFF09</div>\n  <textarea wrap="off" style="width: 750px; height: 300px; white-space: pre;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <button>\u8FD0\u884C</button><button>\u6E05\u9664</button><button>\u5173\u95ED</button>\n</div>';
    var $dialog = Dialog.create('pd_run_command', '运行命令', html);
    var $textArea = $dialog.find('textarea');
    $dialog.find('.pd_cfg_btns > button:first').click(function (e) {
        e.preventDefault();
        var content = $textArea.val();
        if (!content) return;
        try {
            console.log(eval(content));
        } catch (ex) {
            console.log(ex);
        }
    }).next('button').click(function (e) {
        e.preventDefault();
        $textArea.val('').focus();
    }).next('button').click(function () {
        return Dialog.close('pd_run_command');
    });
    Dialog.show('pd_run_command');
    $textArea.keyup(function (e) {
        if (e.ctrlKey && e.keyCode === 13) {
            $dialog.find('.pd_cfg_btns > button:first').click();
        } else if (e.ctrlKey && e.keyCode === 8) {
            $dialog.find('.pd_cfg_btns > button:eq(1)').click();
        }
    }).focus();
};

/**
 * 显示导入或导出设置对话框
 */
var showImportOrExportSettingDialog = function showImportOrExportSettingDialog() {
    if ($('#pd_im_or_ex_setting').length > 0) return;
    (0, _Config.read)();
    var html = '\n<div class="pd_cfg_main">\n  <div>\n    <strong>\u5BFC\u5165\u8BBE\u7F6E\uFF1A</strong>\u5C06\u8BBE\u7F6E\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u4FDD\u5B58\u6309\u94AE\u5373\u53EF<br>\n    <strong>\u5BFC\u51FA\u8BBE\u7F6E\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u6587\u672C\u6587\u4EF6\u91CC\u5373\u53EF\n  </div>\n  <textarea id="pd_cfg_setting" style="width: 600px; height: 400px; word-break: break-all;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <button>\u4FDD\u5B58</button><button>\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create('pd_im_or_ex_setting', '导入或导出设置', html);
    $dialog.find('.pd_cfg_btns > button:first').click(function (e) {
        e.preventDefault();
        if (!confirm('是否导入文本框中的设置？')) return;
        var options = $.trim($('#pd_cfg_setting').val());
        if (!options) return;
        try {
            options = JSON.parse(options);
        } catch (ex) {
            alert('设置有错误');
            return;
        }
        if (!options || $.type(options) !== 'object') {
            alert('设置有错误');
            return;
        }
        options = (0, _Config.normalize)(options);
        _Info2.default.w.Config = $.extend(true, {}, _Config.Config, options);
        (0, _Config.write)();
        alert('设置已导入');
        location.reload();
    }).next('button').click(function () {
        return Dialog.close('pd_im_or_ex_setting');
    });
    Dialog.show('pd_im_or_ex_setting');
    $('#pd_cfg_setting').val(JSON.stringify(Util.getDifferenceSetOfObject(_Config.Config, Config))).select();
};

/**
 * 显示自定义各等级神秘颜色设置对话框
 */
var showCustomSmColorDialog = function showCustomSmColorDialog() {
    if ($('#pd_custom_sm_color').length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  <div style="border-bottom: 1px solid #9191ff; margin-bottom: 7px; padding-bottom: 5px;">\n    <strong>\n      \u793A\u4F8B\uFF08<a target="_blank" href="http://www.35ui.cn/jsnote/peise.html">\u5E38\u7528\u914D\u8272\u8868</a> /\n      <a target="_blank" href="read.php?tid=488016">\u5176\u4ED6\u4EBA\u5206\u4EAB\u7684\u914D\u8272\u65B9\u6848</a>\uFF09\uFF1A\n    </strong><br>\n    <b>\u7B49\u7EA7\u8303\u56F4\uFF1A</b>4-4 <b>\u989C\u8272\uFF1A</b><span style="color: #0000ff;">#0000ff</span><br>\n    <b>\u7B49\u7EA7\u8303\u56F4\uFF1A</b>10-99 <b>\u989C\u8272\uFF1A</b><span style="color: #5ad465;">#5ad465</span><br>\n    <b>\u7B49\u7EA7\u8303\u56F4\uFF1A</b>5000-MAX <b>\u989C\u8272\uFF1A</b><span style="color: #ff0000;">#ff0000</span>\n  </div>\n  <ul id="pd_cfg_custom_sm_color_list"></ul>\n  <div style="margin-top: 5px;" id="pd_cfg_custom_sm_color_add_btns">\n    <a href="#">\u589E\u52A01\u4E2A</a><a href="#" style="margin-left: 7px;">\u589E\u52A05\u4E2A</a><a href="#" style="margin-left: 7px;">\u6E05\u9664\u6240\u6709</a>\n  </div>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a href="#">\u5BFC\u5165/\u5BFC\u51FA\u914D\u8272\u65B9\u6848</a></span>\n  <button>\u786E\u5B9A</button><button>\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create('pd_custom_sm_color', '自定义各等级神秘颜色', html);
    var $customSmColorList = $dialog.find('#pd_cfg_custom_sm_color_list');
    $dialog.find('.pd_cfg_btns > button:last').click(function () {
        return Dialog.close('pd_custom_sm_color');
    });

    $customSmColorList.on('keyup', '.pd_cfg_sm_color', function () {
        var $this = $(this);
        var color = $.trim($this.val());
        if (/^#[0-9a-fA-F]{6}$/.test(color)) {
            $this.next('input[type="color"]').val(color.toLowerCase());
        }
    }).on('change', 'input[type="color"]', function () {
        var $this = $(this);
        $this.prev('input').val($this.val().toString().toLowerCase());
    }).on('click', 'a', function (e) {
        e.preventDefault();
        $(this).closest('li').remove();
    });

    /**
     * 获取每列神秘颜色的HTML内容
     * @param {string} min 最小神秘等级
     * @param {string} max 最大神秘等级
     * @param {string} color 颜色
     * @returns {string}
     */
    var getSmColorLineHtml = function getSmColorLineHtml() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$min = _ref.min,
            min = _ref$min === undefined ? '' : _ref$min,
            _ref$max = _ref.max,
            max = _ref$max === undefined ? '' : _ref$max,
            _ref$color = _ref.color,
            color = _ref$color === undefined ? '' : _ref$color;

        return '\n<li>\n  <label>\u7B49\u7EA7\u8303\u56F4<input class="pd_cfg_sm_min" type="text" maxlength="5" style="width: 30px;" value="' + min + '"></label>\n  <label>-<input class="pd_cfg_sm_max" type="text" maxlength="5" style="width: 30px;" value="' + max + '"></label>\n  <label>\u989C\u8272<input class="pd_cfg_sm_color" type="text" maxlength="7" style="width: 50px;" value="' + color + '">\n  <input style="margin-left: 0;" type="color" value="' + color + '"></label>\n  <a href="#">\u5220\u9664</a>\n</li>';
    };

    $dialog.find('#pd_cfg_custom_sm_color_add_btns').find('a:lt(2)').click(function (e) {
        e.preventDefault();
        var num = 1;
        if ($(this).is('#pd_cfg_custom_sm_color_add_btns > a:eq(1)')) num = 5;
        for (var i = 1; i <= num; i++) {
            $customSmColorList.append(getSmColorLineHtml());
        }
        Dialog.show('pd_custom_sm_color');
    }).end().find('a:last').click(function (e) {
        e.preventDefault();
        if (confirm('是否清除所有设置？')) {
            $customSmColorList.empty();
            Dialog.show('pd_custom_sm_color');
        }
    });

    $dialog.find('.pd_cfg_about > a').click(function (e) {
        e.preventDefault();
        showImportOrExportSmColorConfigDialog();
    });

    var smColorHtml = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Config.customSmColorConfigList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var data = _step.value;

            smColorHtml += getSmColorLineHtml(data);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    $customSmColorList.html(smColorHtml);

    $dialog.submit(function (e) {
        e.preventDefault();
        var list = [];
        var verification = true;
        $customSmColorList.find('li').each(function () {
            var $this = $(this);
            var $txtSmMin = $this.find('.pd_cfg_sm_min');
            var min = $.trim($txtSmMin.val()).toUpperCase();
            if (min === '') return;
            if (!/^(-?\d+|MAX)$/i.test(min)) {
                verification = false;
                $txtSmMin.select();
                $txtSmMin.focus();
                alert('等级范围格式不正确');
                return false;
            }
            var $txtSmMax = $this.find('.pd_cfg_sm_max');
            var max = $.trim($txtSmMax.val()).toUpperCase();
            if (max === '') return;
            if (!/^(-?\d+|MAX)$/i.test(max)) {
                verification = false;
                $txtSmMax.select();
                $txtSmMax.focus();
                alert('等级范围格式不正确');
                return false;
            }
            if (Util.compareSmLevel(max, min) < 0) {
                verification = false;
                $txtSmMin.select();
                $txtSmMin.focus();
                alert('等级范围格式不正确');
                return false;
            }
            var $txtSmColor = $this.find('.pd_cfg_sm_color');
            var color = $.trim($txtSmColor.val()).toLowerCase();
            if (color === '') return;
            if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
                verification = false;
                $txtSmColor.select();
                $txtSmColor.focus();
                alert('颜色格式不正确');
                return false;
            }
            list.push({ min: min, max: max, color: color });
        });
        if (verification) {
            list.sort(function (a, b) {
                return Util.compareSmLevel(a.min, b.min) > 0;
            });
            Config.customSmColorConfigList = list;
            (0, _Config.write)();
            Dialog.close('pd_custom_sm_color');
        }
    });

    Dialog.show('pd_custom_sm_color');
    if ($customSmColorList.find('input').length > 0) $customSmColorList.find('input:first').focus();else $('#pd_cfg_custom_sm_color_add_btns > a:first').focus();
};

/**
 * 显示导入或导出配色方案对话框
 */
var showImportOrExportSmColorConfigDialog = function showImportOrExportSmColorConfigDialog() {
    if ($('#pd_im_or_ex_sm_color_config').length > 0) return;
    (0, _Config.read)();
    var html = '\n<div class="pd_cfg_main">\n  <div>\n    <strong>\u5BFC\u5165\u914D\u8272\u65B9\u6848\uFF1A</strong>\u5C06\u8BBE\u7F6E\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u4FDD\u5B58\u6309\u94AE\u5373\u53EF<br>\n    <strong>\u5BFC\u51FA\u914D\u8272\u65B9\u6848\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u6587\u672C\u6587\u4EF6\u91CC\u5373\u53EF\n  </div>\n  <textarea id="pd_cfg_sm_color_config" style="width: 420px; height: 200px; word-break: break-all;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a target="_blank" href="read.php?tid=488016">\u5176\u4ED6\u4EBA\u5206\u4EAB\u7684\u914D\u8272\u65B9\u6848</a></span>\n  <button>\u4FDD\u5B58</button><button>\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create('pd_im_or_ex_sm_color_config', '导入或导出配色方案', html);
    $dialog.find('.pd_cfg_btns > button:first').click(function (e) {
        e.preventDefault();
        if (!confirm('是否导入文本框中的设置？')) return;
        var options = $.trim($('#pd_cfg_sm_color_config').val());
        if (!options) return;
        try {
            options = JSON.parse(options);
        } catch (ex) {
            alert('配色方案有错误');
            return;
        }
        if (!options || !Array.isArray(options)) {
            alert('配色方案有错误');
            return;
        }
        Config.customSmColorConfigList = options;
        (0, _Config.write)();
        alert('配色方案已导入');
        location.reload();
    }).next('button').click(function () {
        return Dialog.close('pd_im_or_ex_sm_color_config');
    });
    Dialog.show('pd_im_or_ex_sm_color_config');
    $dialog.find('#pd_cfg_sm_color_config').val(JSON.stringify(Config.customSmColorConfigList)).select();
};

/**
 * 显示自定义CSS对话框
 */
var showCustomCssDialog = function showCustomCssDialog() {
    if ($('#pd_custom_css').length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  <strong>\u81EA\u5B9A\u4E49CSS\u5185\u5BB9\uFF1A</strong><br>\n  <textarea wrap="off" style="width: 750px; height: 400px; white-space: pre;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a target="_blank" href="read.php?tid=500969">\u5176\u4ED6\u4EBA\u5206\u4EAB\u7684CSS\u89C4\u5219</a></span>\n  <button>\u786E\u5B9A</button><button>\u53D6\u6D88</button>\n</div>\';';
    var $dialog = Dialog.create('pd_custom_css', '自定义CSS', html);
    var $content = $dialog.find('textarea');
    $dialog.find('.pd_cfg_btns > button:first').click(function (e) {
        e.preventDefault();
        Config.customCssContent = $.trim($content.val());
        (0, _Config.write)();
        Dialog.close('pd_custom_css');
    }).next('button').click(function () {
        return Dialog.close('pd_custom_css');
    });
    $content.val(Config.customCssContent);
    Dialog.show('pd_custom_css');
    $content.focus();
};

/**
 * 显示自定义脚本对话框
 */
var showCustomScriptDialog = function showCustomScriptDialog() {
    if ($('#pd_custom_script').length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin: 5px 0;">\n    <label style="color: #f00;"><input type="radio" name="pd_custom_script_type" value="start" checked> \u5728\u811A\u672C\u5F00\u59CB\u65F6\u6267\u884C\u7684\u5185\u5BB9</label>\n    <label style="color: #00f;"><input type="radio" name="pd_custom_script_type" value="end"> \u5728\u811A\u672C\u7ED3\u675F\u65F6\u6267\u884C\u7684\u5185\u5BB9</label>\n  </div>\n  <textarea wrap="off" id="pd_custom_script_start_content" style="width: 750px; height: 500px; white-space: pre;"></textarea>\n  <textarea wrap="off" id="pd_custom_script_end_content" style="width: 750px; height: 500px; white-space: pre; display: none;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a target="_blank" href="read.php?tid=500968">\u5176\u4ED6\u4EBA\u5206\u4EAB\u7684\u81EA\u5B9A\u4E49\u811A\u672C</a></span>\n  <button>\u786E\u5B9A</button><button>\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create('pd_custom_script', '自定义脚本', html);
    $dialog.find('.pd_cfg_btns > button:first').click(function (e) {
        e.preventDefault();
        Config.customScriptStartContent = $('#pd_custom_script_start_content').val();
        Config.customScriptEndContent = $('#pd_custom_script_end_content').val();
        (0, _Config.write)();
        Dialog.close('pd_custom_script');
    }).next('button').click(function () {
        return Dialog.close('pd_custom_script');
    });
    $dialog.find('#pd_custom_script_start_content').val(Config.customScriptStartContent).end().find('#pd_custom_script_end_content').val(Config.customScriptEndContent).end().find('input[name="pd_custom_script_type"]').click(function () {
        var type = $(this).val();
        $('#pd_custom_script_' + (type === 'end' ? 'start' : 'end') + '_content').hide();
        $('#pd_custom_script_' + (type === 'end' ? 'end' : 'start') + '_content').show();
    });
    Dialog.show('pd_custom_script');
    $dialog.find('#pd_custom_script_start_content').focus();
};

/**
 * 显示用户备注对话框
 */
var showUserMemoDialog = function showUserMemoDialog() {
    if ($('#pd_user_memo').length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  \u6309\u7167\u201C\u7528\u6237\u540D:\u5907\u6CE8\u201D\u7684\u683C\u5F0F\uFF08\u6CE8\u610F\u662F\u82F1\u6587\u5192\u53F7\uFF09\uFF0C\u6BCF\u884C\u4E00\u4E2A<br>\n  <textarea wrap="off" style="width: 320px; height: 400px; white-space: pre;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <button>\u786E\u5B9A</button><button>\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create('pd_user_memo', '用户备注', html);
    var $userMemoList = $dialog.find('textarea');
    $dialog.find('.pd_cfg_btns > button:first').click(function (e) {
        e.preventDefault();
        var content = $.trim($userMemoList.val());
        Config.userMemoList = {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = content.split('\n')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var line = _step2.value;

                line = $.trim(line);
                if (!line) continue;
                if (!/.+?:.+/.test(line)) {
                    alert('用户备注格式不正确');
                    $userMemoList.focus();
                    return;
                }

                var _line$split = line.split(':'),
                    _line$split2 = _slicedToArray(_line$split, 2),
                    user = _line$split2[0],
                    _line$split2$ = _line$split2[1],
                    memo = _line$split2$ === undefined ? '' : _line$split2$;

                if (!memo) continue;
                Config.userMemoList[user.trim()] = memo.trim();
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        (0, _Config.write)();
        Dialog.close('pd_user_memo');
    }).next('button').click(function () {
        return Dialog.close('pd_user_memo');
    });
    var content = '';
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = Util.entries(Config.userMemoList)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _slicedToArray(_step3.value, 2),
                user = _step3$value[0],
                memo = _step3$value[1];

            content += user + ':' + memo + '\n';
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    $userMemoList.val(content);
    Dialog.show('pd_user_memo');
    $userMemoList.focus();
};

/**
 * 显示关注用户对话框
 */
var showFollowUserDialog = function showFollowUserDialog() {
    if ($('#pd_follow_user').length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin-top: 5px;">\n    <label><input id="pd_cfg_highlight_follow_user_thread_in_hp_enabled" type="checkbox">\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u7684\u9996\u9875\u5E16\u5B50\u94FE\u63A5 \n<span class="pd_cfg_tips" title="\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u5728\u9996\u9875\u4E0B\u7684\u5E16\u5B50\u94FE\u63A5">[?]</span></label><br>\n    <label><input id="pd_cfg_highlight_follow_user_thread_link_enabled" type="checkbox">\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u7684\u5E16\u5B50\u94FE\u63A5 \n<span class="pd_cfg_tips" title="\u9AD8\u4EAE\u6240\u5173\u6CE8\u7528\u6237\u5728\u7248\u5757\u9875\u9762\u4E0B\u7684\u5E16\u5B50\u94FE\u63A5">[?]</span></label><br>\n  </div>\n  <ul id="pd_cfg_follow_user_list" style="margin-top: 5px; width: 274px; line-height: 24px;"></ul>\n  <div id="pd_cfg_follow_user_btns" style="margin-top: 5px;">\n    <div style="display: inline-block;"><a href="#">\u5168\u9009</a><a style="margin-left: 7px;" href="#">\u53CD\u9009</a></div>\n    <div style="float: right;"><a style="margin-left: 7px;" href="#">\u5220\u9664</a></div>\n  </div>\n  <div style="margin-top: 5px;" title="\u6DFB\u52A0\u591A\u4E2A\u7528\u6237\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">\n    <input id="pd_cfg_add_follow_user" style="width: 200px;" type="text">\n    <a style="margin-left: 7px;" href="#">\u6DFB\u52A0</a>\n  </div>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a href="#">\u5BFC\u5165/\u5BFC\u51FA\u5173\u6CE8\u7528\u6237</a></span>\n  <button>\u786E\u5B9A</button><button>\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create('pd_follow_user', '关注用户', html);
    var $followUserList = $dialog.find('#pd_cfg_follow_user_list');
    $dialog.submit(function (e) {
        e.preventDefault();
        $dialog.find('.pd_cfg_btns > button:first').click();
    }).find('.pd_cfg_btns > button:first').click(function (e) {
        e.preventDefault();
        Config.highlightFollowUserThreadInHPEnabled = $('#pd_cfg_highlight_follow_user_thread_in_hp_enabled').prop('checked');
        Config.highlightFollowUserThreadLinkEnabled = $('#pd_cfg_highlight_follow_user_thread_link_enabled').prop('checked');
        Config.followUserList = [];
        $followUserList.find('li').each(function () {
            var $this = $(this);
            var name = $.trim($this.find('[type="text"]').val());
            if (name !== '' && Util.inFollowOrBlockUserList(name, Config.followUserList) === -1) {
                Config.followUserList.push({ name: name });
            }
        });
        (0, _Config.write)();
        Dialog.close('pd_follow_user');
    }).end().find('.pd_cfg_btns > button:last').click(function () {
        return Dialog.close('pd_follow_user');
    });

    $('#pd_cfg_highlight_follow_user_thread_in_hp_enabled').prop('checked', Config.highlightFollowUserThreadInHPEnabled);
    $('#pd_cfg_highlight_follow_user_thread_link_enabled').prop('checked', Config.highlightFollowUserThreadLinkEnabled);

    /**
     * 添加关注用户
     * @param {string} name 用户名
     */
    var addFollowUser = function addFollowUser(name) {
        $('<li><input type="checkbox"><input type="text" style="width: 178px; margin-left: 5px;" maxlength="15" value="' + name + '">' + '<a style="margin-left: 7px;" href="#">\u5220\u9664</a></li>').appendTo($followUserList);
    };

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = Config.followUserList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var user = _step4.value;

            addFollowUser(user.name);
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    $followUserList.on('click', 'a', function (e) {
        e.preventDefault();
        $(this).parent().remove();
    });

    $('#pd_cfg_follow_user_btns').find('a:first').click(function (e) {
        e.preventDefault();
        $followUserList.find('input[type="checkbox"]').prop('checked', true);
    }).end().find('a:eq(1)').click(function (e) {
        e.preventDefault();
        $followUserList.find('input[type="checkbox"]').each(function () {
            $(this).prop('checked', !$(this).prop('checked'));
        });
    }).end().find('a:last').click(function (e) {
        e.preventDefault();
        var $checked = $followUserList.find('li:has(input[type="checkbox"]:checked)');
        if (!$checked.length) return;
        if (confirm('是否删除所选用户？')) {
            $checked.remove();
            Dialog.show('pd_follow_user');
        }
    });

    $dialog.find('#pd_cfg_add_follow_user').keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $(this).next('a').click();
        }
    }).next('a').click(function (e) {
        e.preventDefault();
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            for (var _iterator5 = $.trim($('#pd_cfg_add_follow_user').val()).split(',')[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var name = _step5.value;

                name = $.trim(name);
                if (!name) continue;
                if (Util.inFollowOrBlockUserList(name, Config.followUserList) === -1) {
                    addFollowUser(name);
                }
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                    _iterator5.return();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        $('#pd_cfg_add_follow_user').val('');
        Dialog.show('pd_follow_user');
    });

    $dialog.find('.pd_cfg_about > a').click(function (e) {
        e.preventDefault();
        showCommonImportOrExportConfigDialog(1);
    });

    Dialog.show('pd_follow_user');
    $('#pd_cfg_highlight_follow_user_thread_in_hp_enabled').focus();
};

/**
 * 显示屏蔽用户对话框
 */
var showBlockUserDialog = function showBlockUserDialog() {
    if ($('#pd_block_user').length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin-top: 5px; line-height: 24px;">\n    <label>\u9ED8\u8BA4\u5C4F\u853D\u7C7B\u578B\n      <select id="pd_cfg_block_user_default_type">\n        <option value="0">\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16</option><option value="1">\u4EC5\u5C4F\u853D\u4E3B\u9898</option><option value="2">\u4EC5\u5C4F\u853D\u56DE\u5E16</option>\n      </select>\n    </label>\n    <label class="pd_cfg_ml">\n      <input id="pd_cfg_block_user_at_tips_enabled" type="checkbox">\u5C4F\u853D@\u63D0\u9192 <span class="pd_cfg_tips" title="\u5C4F\u853D\u88AB\u5C4F\u853D\u7528\u6237\u7684@\u63D0\u9192">[?]</span>\n    </label><br>\n    <label>\u7248\u5757\u5C4F\u853D\u8303\u56F4\n      <select id="pd_cfg_block_user_forum_type">\n        <option value="0">\u6240\u6709\u7248\u5757</option><option value="1">\u5305\u62EC\u6307\u5B9A\u7248\u5757</option><option value="2">\u6392\u9664\u6307\u5B9A\u7248\u5757</option>\n      </select>\n    </label><br>\n    <label>\u7248\u5757ID\u5217\u8868\n      <input id="pd_cfg_block_user_fid_list" type="text" style="width: 220px;"> \n      <span class="pd_cfg_tips" title="\u7248\u5757URL\u4E2D\u7684fid\u53C2\u6570\uFF0C\u591A\u4E2AID\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">[?]</span>\n    </label>\n  </div>\n  <ul id="pd_cfg_block_user_list" style="margin-top: 5px; width: 362px; line-height: 24px;"></ul>\n  <div id="pd_cfg_block_user_btns" style="margin-top: 5px;">\n    <div style="display: inline-block;"><a href="#">\u5168\u9009</a><a style="margin-left: 7px;" href="#">\u53CD\u9009</a></div>\n    <div style="float: right;">\n      <a href="#">\u4FEE\u6539\u4E3A</a>\n      <select style="margin-left: 7px;">\n        <option value="0">\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16</option><option value="1">\u4EC5\u5C4F\u853D\u4E3B\u9898</option><option value="2">\u4EC5\u5C4F\u853D\u56DE\u5E16</option>\n      </select>\n      <a style="margin-left: 7px;" href="#">\u5220\u9664</a>\n    </div>\n  </div>\n  <div style="margin-top: 5px;" title="\u6DFB\u52A0\u591A\u4E2A\u7528\u6237\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">\n    <input id="pd_cfg_add_block_user" style="width: 200px;" type="text">\n    <a style="margin-left: 7px;" href="#">\u6DFB\u52A0</a>\n  </div>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a href="#">\u5BFC\u5165/\u5BFC\u51FA\u5C4F\u853D\u7528\u6237</a></span>\n  <button>\u786E\u5B9A</button><button>\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create('pd_block_user', '屏蔽用户', html);
    var $blockUserList = $dialog.find('#pd_cfg_block_user_list');
    $dialog.submit(function (e) {
        e.preventDefault();
        $dialog.find('.pd_cfg_btns > button:first').click();
    }).find('.pd_cfg_btns > button:first').click(function (e) {
        e.preventDefault();
        Config.blockUserDefaultType = $('#pd_cfg_block_user_default_type').val();
        Config.blockUserAtTipsEnabled = $('#pd_cfg_block_user_at_tips_enabled').prop('checked');
        Config.blockUserForumType = parseInt($('#pd_cfg_block_user_forum_type').val());
        Config.blockUserFidList = [];
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
            for (var _iterator6 = $.trim($('#pd_cfg_block_user_fid_list').val()).split(',')[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var fid = _step6.value;

                fid = parseInt(fid);
                if (!isNaN(fid) && fid > 0) Config.blockUserFidList.push(fid);
            }
        } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                    _iterator6.return();
                }
            } finally {
                if (_didIteratorError6) {
                    throw _iteratorError6;
                }
            }
        }

        Config.blockUserList = [];
        $blockUserList.find('li').each(function () {
            var $this = $(this);
            var name = $.trim($this.find('input[type="text"]').val());
            if (name !== '' && Util.inFollowOrBlockUserList(name, Config.blockUserList) === -1) {
                var type = parseInt($this.find('select').val());
                Config.blockUserList.push({ name: name, type: type });
            }
        });
        (0, _Config.write)();
        Dialog.close('pd_block_user');
    }).end().find('.pd_cfg_btns > button:last').click(function () {
        return Dialog.close('pd_block_user');
    });

    $('#pd_cfg_block_user_default_type').val(Config.blockUserDefaultType);
    $('#pd_cfg_block_user_at_tips_enabled').prop('checked', Config.blockUserAtTipsEnabled);
    $('#pd_cfg_block_user_forum_type').val(Config.blockUserForumType);
    $('#pd_cfg_block_user_fid_list').val(Config.blockUserFidList.join(','));

    /**
     * 添加屏蔽用户
     * @param {string} name 用户名
     * @param {number} type 屏蔽类型
     */
    var addBlockUser = function addBlockUser(name, type) {
        $('\n<li>\n  <input type="checkbox">\n  <input type="text" style="width: 150px; margin-left: 5px;" maxlength="15" value="' + name + '">\n  <select style="margin-left: 5px;">\n    <option value="0">\u5C4F\u853D\u4E3B\u9898\u548C\u56DE\u5E16</option><option value="1">\u4EC5\u5C4F\u853D\u4E3B\u9898</option><option value="2">\u4EC5\u5C4F\u853D\u56DE\u5E16</option>\n  </select>\n  <a style="margin-left: 7px;" href="#">\u5220\u9664</a>\n</li>').appendTo($blockUserList).find('select').val(type);
    };

    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
        for (var _iterator7 = Config.blockUserList[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var user = _step7.value;

            addBlockUser(user.name, user.type);
        }
    } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
            }
        } finally {
            if (_didIteratorError7) {
                throw _iteratorError7;
            }
        }
    }

    $blockUserList.on('click', 'a', function (e) {
        e.preventDefault();
        $(this).parent().remove();
    });

    $('#pd_cfg_block_user_btns').find('a:first').click(function (e) {
        e.preventDefault();
        $blockUserList.find('input[type="checkbox"]').prop('checked', true);
    }).end().find('a:eq(1)').click(function (e) {
        e.preventDefault();
        $blockUserList.find('input[type="checkbox"]').each(function () {
            $(this).prop('checked', !$(this).prop('checked'));
        });
    }).end().find('a:eq(2)').click(function (e) {
        e.preventDefault();
        var value = $(this).next('select').val();
        $blockUserList.find('li:has(input[type="checkbox"]:checked) > select').val(value);
    }).end().find('a:last').click(function (e) {
        e.preventDefault();
        var $checked = $blockUserList.find('li:has(input[type="checkbox"]:checked)');
        if (!$checked.length) return;
        if (confirm('是否删除所选用户？')) {
            $checked.remove();
            Dialog.show('pd_block_user');
        }
    });

    $dialog.find('#pd_cfg_add_block_user').keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $(this).next('a').click();
        }
    }).next('a').click(function (e) {
        e.preventDefault();
        var type = parseInt($('#pd_cfg_block_user_default_type').val());
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
            for (var _iterator8 = $.trim($('#pd_cfg_add_block_user').val()).split(',')[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var name = _step8.value;

                name = $.trim(name);
                if (!name) continue;
                if (Util.inFollowOrBlockUserList(name, Config.blockUserList) === -1) {
                    addBlockUser(name, type);
                }
            }
        } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                    _iterator8.return();
                }
            } finally {
                if (_didIteratorError8) {
                    throw _iteratorError8;
                }
            }
        }

        $('#pd_cfg_add_block_user').val('');
        Dialog.show('pd_block_user');
    });

    $dialog.find('#pd_cfg_block_user_forum_type').change(function () {
        $('#pd_cfg_block_user_fid_list').prop('disabled', parseInt($(this).val()) === 0);
    }).end().find('.pd_cfg_about > a').click(function (e) {
        e.preventDefault();
        showCommonImportOrExportConfigDialog(2);
    });

    Dialog.show('pd_block_user');
    $('#pd_cfg_block_user_forum_type').triggerHandler('change');
    $('#pd_cfg_block_user_default_type').focus();
};

/**
 * 显示屏蔽帖子对话框
 */
var showBlockThreadDialog = function showBlockThreadDialog() {
    if ($('#pd_block_thread').length > 0) return;
    var html = '\n<div class="pd_cfg_main">\n  <div style="border-bottom: 1px solid #9191ff; margin-bottom: 7px; padding-bottom: 5px;">\n    \u6807\u9898\u5173\u952E\u5B57\u53EF\u4F7F\u7528\u666E\u901A\u5B57\u7B26\u4E32\u6216\u6B63\u5219\u8868\u8FBE\u5F0F\uFF0C\u6B63\u5219\u8868\u8FBE\u5F0F\u8BF7\u4F7F\u7528/abc/\u7684\u683C\u5F0F\uFF0C\u4F8B\uFF1A/\u5173\u952E\u5B57A.*\u5173\u952E\u5B57B/i<br>\n    \u7528\u6237\u540D\u548C\u7248\u5757ID\u4E3A\u53EF\u9009\u9879\uFF08\u591A\u4E2A\u7528\u6237\u540D\u6216\u7248\u5757ID\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694\uFF09<br>\n    <label>\u9ED8\u8BA4\u7248\u5757\u5C4F\u853D\u8303\u56F4\n      <select id="pd_cfg_block_thread_def_forum_type">\n        <option value="0">\u6240\u6709\u7248\u5757</option><option value="1">\u5305\u62EC\u6307\u5B9A\u7248\u5757</option><option value="2">\u6392\u9664\u6307\u5B9A\u7248\u5757</option>\n      </select>\n    </label>\n    <label style="margin-left: 5px;">\u9ED8\u8BA4\u7248\u5757ID\u5217\u8868<input id="pd_cfg_block_thread_def_fid_list" type="text" style="width: 150px;"></label>\n  </div>\n  <table id="pd_cfg_block_thread_list" style="line-height: 22px; text-align: center;">\n    <tbody>\n      <tr>\n        <th style="width: 220px;">\u6807\u9898\u5173\u952E\u5B57(\u5FC5\u586B)</th>\n        <th style="width: 62px;">\u5C4F\u853D\u7528\u6237</th>\n        <th style="width: 200px;">\u7528\u6237\u540D <span class="pd_cfg_tips" title="\u591A\u4E2A\u7528\u6237\u540D\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">[?]</span></th>\n        <th style="width: 62px;">\u5C4F\u853D\u8303\u56F4</th>\n        <th style="width: 132px;">\u7248\u5757ID <span class="pd_cfg_tips" title="\u7248\u5757URL\u4E2D\u7684fid\u53C2\u6570\uFF0C\u591A\u4E2AID\u8BF7\u7528\u82F1\u6587\u9017\u53F7\u5206\u9694">[?]</span></th>\n        <th style="width: 35px;"></th>\n      </tr>\n    </tbody>\n  </table>\n  <div style="margin-top: 5px;" id="pd_cfg_block_thread_add_btns">\n    <a href="#">\u589E\u52A01\u4E2A</a><a href="#" style="margin-left: 7px;">\u589E\u52A05\u4E2A</a><a href="#" style="margin-left: 7px;">\u6E05\u9664\u6240\u6709</a>\n  </div>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a href="#">\u5BFC\u5165/\u5BFC\u51FA\u5C4F\u853D\u5E16\u5B50</a></span>\n  <button>\u786E\u5B9A</button><button>\u53D6\u6D88</button>\n</div>';
    var $dialog = Dialog.create('pd_block_thread', '屏蔽帖子', html, 'width: 768px;');
    var $blockThreadList = $dialog.find('#pd_cfg_block_thread_list');

    /**
     * 验证设置是否正确
     * @returns {boolean} 是否验证通过
     */
    var verify = function verify() {
        var flag = true;
        $blockThreadList.find('tr:gt(0)').each(function () {
            var $this = $(this);
            var $txtKeyWord = $this.find('td:first-child > input');
            var keyWord = $txtKeyWord.val();
            if ($.trim(keyWord) === '') return;
            if (/^\/.+\/[gimy]*$/.test(keyWord)) {
                try {
                    eval(keyWord);
                } catch (ex) {
                    alert('正则表达式不正确');
                    $txtKeyWord.select();
                    $txtKeyWord.focus();
                    flag = false;
                    return false;
                }
            }
        });
        return flag;
    };

    $dialog.submit(function (e) {
        e.preventDefault();
        $dialog.find('.pd_cfg_btns > button:first').click();
    }).find('.pd_cfg_btns > button:first').click(function (e) {
        e.preventDefault();
        if (!verify()) return;
        Config.blockThreadDefForumType = parseInt($('#pd_cfg_block_thread_def_forum_type').val());
        Config.blockThreadDefFidList = [];
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
            for (var _iterator9 = $.trim($('#pd_cfg_block_thread_def_fid_list').val()).split(',')[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                var fid = _step9.value;

                fid = parseInt(fid);
                if (!isNaN(fid) && fid > 0) Config.blockThreadDefFidList.push(fid);
            }
        } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                    _iterator9.return();
                }
            } finally {
                if (_didIteratorError9) {
                    throw _iteratorError9;
                }
            }
        }

        Config.blockThreadList = [];
        $blockThreadList.find('tr:gt(0)').each(function () {
            var $this = $(this);
            var keyWord = $this.find('td:first-child > input').val();
            if ($.trim(keyWord) === '') return;
            var newObj = { keyWord: keyWord };

            var userType = parseInt($this.find('td:nth-child(2) > select').val());
            if (userType > 0) {
                var userList = [];
                var _iteratorNormalCompletion10 = true;
                var _didIteratorError10 = false;
                var _iteratorError10 = undefined;

                try {
                    for (var _iterator10 = $.trim($this.find('td:nth-child(3) > input').val()).split(',')[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                        var user = _step10.value;

                        user = $.trim(user);
                        if (user) userList.push(user);
                    }
                } catch (err) {
                    _didIteratorError10 = true;
                    _iteratorError10 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion10 && _iterator10.return) {
                            _iterator10.return();
                        }
                    } finally {
                        if (_didIteratorError10) {
                            throw _iteratorError10;
                        }
                    }
                }

                if (userList.length > 0) newObj[userType === 2 ? 'excludeUser' : 'includeUser'] = userList;
            }

            var fidType = parseInt($this.find('td:nth-child(4) > select').val());
            if (fidType > 0) {
                var fidList = [];
                var _iteratorNormalCompletion11 = true;
                var _didIteratorError11 = false;
                var _iteratorError11 = undefined;

                try {
                    for (var _iterator11 = $.trim($this.find('td:nth-child(5) > input').val()).split(',')[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                        var fid = _step11.value;

                        fid = parseInt(fid);
                        if (!isNaN(fid) && fid > 0) fidList.push(fid);
                    }
                } catch (err) {
                    _didIteratorError11 = true;
                    _iteratorError11 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion11 && _iterator11.return) {
                            _iterator11.return();
                        }
                    } finally {
                        if (_didIteratorError11) {
                            throw _iteratorError11;
                        }
                    }
                }

                if (fidList.length > 0) newObj[fidType === 2 ? 'excludeFid' : 'includeFid'] = fidList;
            }
            Config.blockThreadList.push(newObj);
        });
        (0, _Config.write)();
        Dialog.close('pd_block_thread');
    }).end().find('.pd_cfg_btns > button:last').click(function () {
        return Dialog.close('pd_block_thread');
    });

    $blockThreadList.on('change', 'select', function () {
        var $this = $(this);
        $this.parent('td').next('td').find('input').prop('disabled', parseInt($this.val()) === 0);
    }).on('click', 'td > a', function (e) {
        e.preventDefault();
        $(this).closest('tr').remove();
    });

    /**
     * 添加屏蔽帖子
     * @param {string} keyWord 标题关键字
     * @param {number} userType 屏蔽用户，0：所有；1：包括；2：排除
     * @param {string[]} userList 用户名
     * @param {number} fidType 屏蔽范围，0：所有；1：包括；2：排除
     * @param {number[]} fidList 版块ID列表
     */
    var addBlockThread = function addBlockThread(keyWord, userType, userList, fidType, fidList) {
        $('\n<tr>\n  <td><input type="text" style="width: 208px;" value="' + keyWord + '"></td>\n  <td><select><option value="0">\u6240\u6709</option><option value="1">\u5305\u62EC</option><option value="2">\u6392\u9664</option></select></td>\n  <td><input type="text" style="width: 188px;" value="' + userList.join(',') + '" ' + (userType === 0 ? 'disabled' : '') + '></td>\n  <td><select><option value="0">\u6240\u6709</option><option value="1">\u5305\u62EC</option><option value="2">\u6392\u9664</option></select></td>\n  <td><input type="text" style="width: 120px;" value="' + fidList.join(',') + '" ' + (fidType === 0 ? 'disabled' : '') + '></td>\n  <td><a href="#">\u5220\u9664</a></td>\n</tr>\n').appendTo($blockThreadList).find('td:nth-child(2) > select').val(userType).end().find('td:nth-child(4) > select').val(fidType);
    };

    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
        for (var _iterator12 = Config.blockThreadList[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var data = _step12.value;
            var keyWord = data.keyWord,
                includeUser = data.includeUser,
                excludeUser = data.excludeUser,
                includeFid = data.includeFid,
                excludeFid = data.excludeFid;

            var userType = 0;
            var userList = [];
            if (typeof includeUser !== 'undefined') {
                userType = 1;
                userList = includeUser;
            } else if (typeof excludeUser !== 'undefined') {
                userType = 2;
                userList = excludeUser;
            }

            var fidType = 0;
            var fidList = [];
            if (typeof includeFid !== 'undefined') {
                fidType = 1;
                fidList = includeFid;
            } else if (typeof excludeFid !== 'undefined') {
                fidType = 2;
                fidList = excludeFid;
            }
            addBlockThread(keyWord, userType, userList, fidType, fidList);
        }
    } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion12 && _iterator12.return) {
                _iterator12.return();
            }
        } finally {
            if (_didIteratorError12) {
                throw _iteratorError12;
            }
        }
    }

    $('#pd_cfg_block_thread_add_btns').find('a:lt(2)').click(function (e) {
        e.preventDefault();
        var num = 1;
        if ($(this).is('#pd_cfg_block_thread_add_btns > a:eq(1)')) num = 5;
        for (var i = 1; i <= num; i++) {
            addBlockThread('', 0, [], parseInt($('#pd_cfg_block_thread_def_forum_type').val()), $.trim($('#pd_cfg_block_thread_def_fid_list').val()).split(','));
        }
        Dialog.show('pd_block_thread');
    }).end().find('a:last').click(function (e) {
        e.preventDefault();
        if (confirm('是否清除所有屏蔽关键字？')) {
            $blockThreadList.find('tbody > tr:gt(0)').remove();
            Dialog.show('pd_block_thread');
        }
    });

    $dialog.find('#pd_cfg_block_thread_def_forum_type').change(function () {
        $('#pd_cfg_block_thread_def_fid_list').prop('disabled', parseInt($(this).val()) === 0);
    }).end().find('.pd_cfg_about > a').click(function (e) {
        e.preventDefault();
        showCommonImportOrExportConfigDialog(3);
    });

    Dialog.show('pd_block_thread');
    $('#pd_cfg_block_thread_def_forum_type').val(Config.blockThreadDefForumType).focus().triggerHandler('change');
    $('#pd_cfg_block_thread_def_fid_list').val(Config.blockThreadDefFidList.join(','));
};

/**
 * 显示通用的导入/导出设置对话框
 * @param {number} type 1：关注用户；2：屏蔽用户；3：屏蔽帖子
 */
var showCommonImportOrExportConfigDialog = function showCommonImportOrExportConfigDialog(type) {
    if ($('#pd_common_im_or_ex_config').length > 0) return;
    (0, _Config.read)();
    var html = '\n<div class="pd_cfg_main">\n  <div>\n    <strong>\u5BFC\u5165\u8BBE\u7F6E\uFF1A</strong>\u5C06\u8BBE\u7F6E\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u4FDD\u5B58\u6309\u94AE\u5373\u53EF<br>\n    <strong>\u5BFC\u51FA\u8BBE\u7F6E\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u6587\u672C\u6587\u4EF6\u91CC\u5373\u53EF\n  </div>\n  <textarea id="pd_cfg_common_config" style="width: 420px; height: 200px; word-break: break-all;"></textarea>\n</div>\n<div class="pd_cfg_btns">\n  <button>\u4FDD\u5B58</button><button>\u53D6\u6D88</button>\n</div>';
    var title = '关注用户';
    if (type === 2) title = '屏蔽用户';else if (type === 3) title = '屏蔽帖子';
    var $dialog = Dialog.create('pd_common_im_or_ex_config', '\u5BFC\u5165\u6216\u5BFC\u51FA' + title, html);
    $dialog.find('.pd_cfg_btns > button:first').click(function (e) {
        e.preventDefault();
        if (!confirm('是否导入文本框中的设置？')) return;
        var options = $.trim($('#pd_cfg_common_config').val());
        if (!options) return;
        try {
            options = JSON.parse(options);
        } catch (ex) {
            alert('设置有错误');
            return;
        }
        if (!options || !Array.isArray(options)) {
            alert('设置有错误');
            return;
        }
        if (type === 2) Config.blockUserList = options;else if (type === 3) Config.blockThreadList = options;else Config.followUserList = options;
        (0, _Config.write)();
        alert('设置已导入');
        location.reload();
    }).next('button').click(function () {
        return Dialog.close('pd_common_im_or_ex_config');
    });
    Dialog.show('pd_common_im_or_ex_config');

    var options = Config.followUserList;
    if (type === 2) options = Config.blockUserList;else if (type === 3) options = Config.blockThreadList;
    $dialog.find('#pd_cfg_common_config').val(JSON.stringify(options)).select();
};

},{"./Config":4,"./Const":6,"./Dialog":7,"./Func":8,"./Info":10,"./LogDialog":13,"./TmpLog":20,"./Util":21}],6:[function(require,module,exports){
'use strict';

/**
 * 配置常量类
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Const = {
    // 开启调试模式，true：开启；false：关闭
    debug: false,
    // UTC时间与论坛时间之间的时差（小时）
    forumTimezoneOffset: -8,
    // KFB捐款额度的最大值
    maxDonationKfb: 5000,
    // 定时操作结束后的再判断间隔（秒），用于在定时模式中进行下一次定时时间的再判断
    actionFinishRetryInterval: 30,
    // 在连接超时的情况下获取剩余时间失败后的重试间隔（分钟），用于定时模式
    errorRefreshInterval: 1,
    // 在网页标题上显示定时模式提示的更新间隔（分钟）
    showRefreshModeTipsInterval: 1,
    // 标记已去除首页已读at高亮提示的Cookie有效期（天）
    hideMarkReadAtTipsExpires: 3,
    // 神秘等级升级的提醒间隔（小时），设为0表示当升级时随时进行提醒
    smLevelUpAlertInterval: 3,
    // 神秘系数排名变化的提醒间隔（小时），设为0表示当排名变化时随时进行提醒
    smRankChangeAlertInterval: 22,
    // 存储VIP剩余时间的Cookie有效期（分钟）
    vipSurplusTimeExpires: 60,
    // ajax请求的默认超时时间（毫秒）
    defAjaxTimeout: 30000,
    // ajax请求的默认时间间隔（毫秒）
    defAjaxInterval: 200,
    // 特殊情况下的ajax请求（如使用、恢复、购买道具等）的时间间隔（毫秒），可设置为函数来返回值
    specialAjaxInterval: function specialAjaxInterval() {
        return Math.floor(Math.random() * 150) + 200;
    },

    // 循环使用道具中每轮第一次ajax请求的时间间隔（毫秒），可设置为函数来返回值
    cycleUseItemsFirstAjaxInterval: function cycleUseItemsFirstAjaxInterval() {
        return Math.floor(Math.random() * 250) + 2000;
    },

    // 购买帖子提醒的最低售价（KFB）
    minBuyThreadWarningSell: 6,
    // 统计回帖者名单最大能访问的帖子页数
    statRepliersMaxPage: 300,
    // 道具样品ID列表
    sampleItemIdList: {
        '零时迷子的碎片': 2257935,
        '被遗弃的告白信': 2005272,
        '学校天台的钥匙': 2001303,
        'TMA最新作压缩包': 1990834,
        'LOLI的钱包': 1836588,
        '棒棒糖': 1942370,
        '蕾米莉亚同人漫画': 1000888,
        '十六夜同人漫画': 1002668,
        '档案室钥匙': 1013984,
        '傲娇LOLI娇蛮音CD': 4621,
        '整形优惠卷': 1003993,
        '消逝之药': 1000306
    },
    // 定期存款到期期限（天）
    fixedDepositDueTime: 90,
    // 自助评分错标范围百分比
    ratingErrorSizePercent: 3,
    // 自定义侧边栏导航内容
    // 格式：'<li><a href="导航链接">导航项名称</a></li>'
    customSideBarContent: '',
    // 自定义侧边栏导航内容（手机平铺样式）
    // 格式：'<a href="导航链接1">导航项名称1</a> | <a href="导航链接2">导航项名称2</a><br>'，换行：'<br>'
    customTileSideBarContent: '',
    // 可进行自助评分的版块ID列表
    selfRatingFidList: [41, 67, 92, 127, 68],
    // 存储多重引用数据的LocalStorage名称
    multiQuoteStorageName: 'pd_multi_quote',
    // 神秘升级提醒的临时日志名称
    smLevelUpTmpLogName: 'SmLevelUp',
    // 神秘系数排名变化提醒的临时日志名称
    smRankChangeTmpLogName: 'SmRankChange',
    // 定期存款到期时间的临时日志名称
    fixedDepositDueTmpLogName: 'FixedDepositDue',
    // 上一次自动更换神秘颜色的ID的临时日志名称
    prevAutoChangeSMColorIdTmpLogName: 'PrevAutoChangeSMColorId',
    // 标记已KFB捐款的Cookie名称
    donationCookieName: 'pd_donation',
    // 标记已去除首页已读at高亮提示的Cookie名称
    hideMarkReadAtTipsCookieName: 'pd_hide_mark_read_at_tips',
    // 存储之前已读的at提醒信息的Cookie名称
    prevReadAtTipsCookieName: 'pd_prev_read_at_tips',
    // 标记已进行定期存款到期提醒的Cookie名称
    fixedDepositDueAlertCookieName: 'pd_fixed_deposit_due_alert',
    // 存储VIP剩余时间的Cookie名称
    vipSurplusTimeCookieName: 'pd_vip_surplus_time',
    // 标记已自动更换神秘颜色的Cookie名称
    autoChangeSMColorCookieName: 'pd_auto_change_sm_color',
    // 标记已检查过期日志的Cookie名称
    checkOverdueLogCookieName: 'pd_check_overdue_log'
};

exports.default = Const;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.close = exports.show = exports.create = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 创建对话框
 * @param {string} id 对话框ID
 * @param {string} title 对话框标题
 * @param {string} content 对话框内容
 * @param {string} style 对话框样式
 * @returns {jQuery} 对话框的jQuery对象
 */
var create = exports.create = function create(id, title, content) {
    var style = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    var html = '\n<form>\n<div class="pd_cfg_box" id="' + id + '" style="' + style + '">\n  <h1>' + title + '<span>&times;</span></h1>\n  ' + content + '\n</div>\n</form>';
    var $dialog = $(html).appendTo('body');
    $dialog.on('click', '.pd_cfg_tips', function (e) {
        if (_Info2.default.isMobile) Public.showElementTitleTips(e, this.title);
        return false;
    }).on('click', 'a.pd_disabled_link', function () {
        return false;
    }).keydown(function (e) {
        if (e.keyCode === 27) {
            return close(id);
        }
    }).find('h1 > span').click(function () {
        return close(id);
    }).end().find('legend input[type="checkbox"]').click(function () {
        var $this = $(this);
        var checked = $this.prop('checked');
        if (Util.isOpera() || Util.isEdge()) $this.closest('fieldset').find('input, select, textarea, button').not('legend input').prop('disabled', !checked);else $this.closest('fieldset').prop('disabled', !checked);
    }).end().find('input[data-disabled]').click(function () {
        var $this = $(this);
        var checked = $this.prop('checked');
        $($this.data('disabled')).each(function () {
            var $this = $(this);
            if ($this.is('a')) {
                if (checked) $this.removeClass('pd_disabled_link');else $this.addClass('pd_disabled_link');
            } else {
                $this.prop('disabled', !checked);
            }
        });
    });
    if (!_Info2.default.isMobile) {
        $(window).on('resize.' + id, function () {
            show(id);
        });
    }
    return $dialog;
};

/**
 * 显示或调整对话框
 * @param {string} id 对话框ID
 */
var show = exports.show = function show(id) {
    var $box = $('#' + id);
    if (!$box.length) return;
    $box.find('.pd_cfg_main').css('max-height', $(window).height() - 80).end().find('legend input[type="checkbox"]').each(function () {
        $(this).triggerHandler('click');
    }).end().find('input[data-disabled]').each(function () {
        $(this).triggerHandler('click');
    });
    var boxWidth = $box.width(),
        windowWidth = $(window).width(),
        windowHeight = $(window).height();
    if (_Info2.default.isMobile && windowHeight > 1000) windowHeight /= 2;
    var scrollTop = $(window).scrollTop();
    if (scrollTop < windowHeight / 2) scrollTop = 0;
    var left = windowWidth / 2 + (_Info2.default.isMobile ? $(window).scrollLeft() / 3 : 0) - boxWidth / 2;
    if (left + boxWidth > windowWidth) left = windowWidth - boxWidth - 20;
    if (left < 0) left = 0;
    var top = windowHeight / 2 + (_Info2.default.isMobile ? scrollTop : 0) - $box.height() / 2;
    if (top < 0) top = 0;
    $box.css({ 'top': top, 'left': left }).fadeIn('fast');
};

/**
 * 关闭对话框
 * @param {string} id 对话框ID
 * @returns {boolean} 返回false
 */
var close = exports.close = function close(id) {
    $('#' + id).fadeOut('fast', function () {
        $(this).parent('form').remove();
    });
    if (!_Info2.default.isMobile) {
        $(window).off('resize.' + id);
    }
    return false;
};

},{"./Info":10,"./Public":18,"./Util":21}],8:[function(require,module,exports){
'use strict';

// 自定义方法列表

Object.defineProperty(exports, "__esModule", {
    value: true
});
var funcList = new Map();

/**
 * 添加自定义方法
 * @param {string} name 自定义方法名称
 * @param {function} func 自定义方法
 */
var add = exports.add = function add(name, func) {
    if (!funcList.has(name)) funcList[name] = [];
    funcList[name].push(func);
};

/**
 * 执行自定义方法
 * @param {string} name 自定义方法名称
 * @param {*} [data] 自定义方法参数
 * @returns {boolean} 是否执行了自定义方法
 */
var run = exports.run = function run(name, data) {
    if (funcList.has(name)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = funcList.get(name)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var func = _step.value;

                if (typeof func === 'function') {
                    try {
                        func(data);
                    } catch (ex) {
                        console.log(ex);
                        return false;
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return true;
    } else return false;
};

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addSearchTypeSelectBoxInHomePage = exports.showVipSurplusTime = exports.addHomePageThreadFastGotoLink = exports.smRankChangeAlert = exports.smLevelUpAlert = exports.handleAtTips = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Log = require('./Log');

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 处理首页有人@你的消息框
 */
var handleAtTips = exports.handleAtTips = function handleAtTips() {
    var type = Config.atTipsHandleType;
    if (type === 'default') return;
    var $atTips = $('a[href^="guanjianci.php?gjc="]');
    var noHighlight = function noHighlight() {
        $atTips.removeClass('indbox5').addClass('indbox6');
    };
    var hideBox = function hideBox() {
        $atTips.parent().next('div.line').addBack().remove();
    };
    var handleBox = noHighlight;
    if (type === 'hide_box_1' || type === 'hide_box_2') handleBox = hideBox;
    if (['no_highlight', 'no_highlight_extra', 'hide_box_1', 'at_change_to_cao'].includes(type)) {
        if ($atTips.length > 0) {
            (function () {
                var cookieText = Util.getCookie(_Const2.default.hideMarkReadAtTipsCookieName);
                var atTipsText = $.trim($atTips.text());
                var matches = /\d+日\d+时\d+分/.exec(atTipsText);
                if (matches) atTipsText = matches[0];
                if (cookieText && cookieText === atTipsText) {
                    handleBox();
                } else {
                    $atTips.click(function () {
                        var $this = $(this);
                        if ($this.data('disabled')) return;
                        var cookieText = Util.getCookie(_Const2.default.hideMarkReadAtTipsCookieName);
                        if (!cookieText) {
                            var curDate = new Date().getDate();
                            Util.setCookie(_Const2.default.prevReadAtTipsCookieName, (curDate < 10 ? '0' + curDate : curDate) + '日00时00分');
                        } else if (cookieText !== atTipsText) {
                            Util.setCookie(_Const2.default.prevReadAtTipsCookieName, cookieText);
                        }
                        Util.setCookie(_Const2.default.hideMarkReadAtTipsCookieName, atTipsText, Util.getDate('+' + _Const2.default.hideMarkReadAtTipsExpires + 'd'));
                        $this.data('disabled', true);
                        handleBox();
                    });
                }
                if (type === 'at_change_to_cao') {
                    $atTips.text($atTips.text().replace('@', '艹'));
                }
            })();
        } else if (!$atTips.length && (type === 'no_highlight_extra' || type === 'at_change_to_cao')) {
            var html = '<div style="width: 300px;"><a class="indbox6" href="guanjianci.php?gjc=' + _Info2.default.userName + '" target="_blank">\n\u6700\u8FD1\u65E0\u4EBA' + (type === 'at_change_to_cao' ? '艹' : '@') + '\u4F60</a><br><div class="line"></div><div class="c"></div></div><div class="line"></div>';
            $('a[href="kf_givemekfb.php"][title="网站虚拟货币"]').parent().before(html);
        }
    } else if (type === 'hide_box_2') {
        if ($atTips.length > 0) handleBox();
    }
};

/**
 * 在神秘等级升级后进行提醒
 */
var smLevelUpAlert = exports.smLevelUpAlert = function smLevelUpAlert() {
    var matches = /神秘(\d+)级/.exec($('a[href="kf_growup.php"]').text());
    if (!matches) return;
    var smLevel = parseInt(matches[1]);

    /**
     * 写入神秘等级数据
     * @param {number} smLevel 神秘等级
     */
    var writeData = function writeData(smLevel) {
        TmpLog.setValue(_Const2.default.smLevelUpTmpLogName, { time: new Date().getTime(), smLevel: smLevel });
    };

    var data = TmpLog.getValue(_Const2.default.smLevelUpTmpLogName);
    if (!data || $.type(data.time) !== 'number' || $.type(data.smLevel) !== 'number') {
        writeData(smLevel);
    } else if (smLevel > data.smLevel) {
        var diff = Math.floor((new Date().getTime() - data.time) / 60 / 60 / 1000);
        if (diff >= _Const2.default.smLevelUpAlertInterval) {
            var date = new Date(data.time);
            writeData(smLevel);
            (0, _Log.push)('神秘等级升级', '\u81EA`' + Util.getDateString(date) + '`\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7B49\u7EA7\u5171\u4E0A\u5347\u4E86`' + (smLevel - data.smLevel) + '`\u7EA7 (Lv.`' + data.smLevel + '`->Lv.`' + smLevel + '`)');
            Msg.show('\u81EA<em>' + Util.getDateString(date) + '</em>\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7B49\u7EA7\u5171\u4E0A\u5347\u4E86<em>' + (smLevel - data.smLevel) + '</em>\u7EA7');
        } else if (diff < 0) {
            writeData(smLevel);
        }
    } else if (smLevel < data.smLevel) {
        writeData(smLevel);
    }
};

/**
 * 在神秘系数排名发生变化时进行提醒
 */
var smRankChangeAlert = exports.smRankChangeAlert = function smRankChangeAlert() {
    var matches = /系数排名第\s*(\d+)\s*位/.exec($('a[href="kf_growup.php"]').text());
    if (!matches) return;
    var smRank = parseInt(matches[1]);

    /**
     * 写入神秘系数排名数据
     * @param {number} smRank 神秘系数排名
     */
    var writeData = function writeData(smRank) {
        TmpLog.setValue(_Const2.default.smRankChangeTmpLogName, { time: new Date().getTime(), smRank: smRank });
    };

    var data = TmpLog.getValue(_Const2.default.smRankChangeTmpLogName);
    if (!data || $.type(data.time) !== 'number' || $.type(data.smRank) !== 'number') {
        writeData(smRank);
    } else if (smRank !== data.smRank) {
        var diff = Math.floor((new Date().getTime() - data.time) / 60 / 60 / 1000);
        if (diff >= _Const2.default.smRankChangeAlertInterval) {
            var date = new Date(data.time);
            var isUp = smRank < data.smRank;
            writeData(smRank);
            (0, _Log.push)('神秘系数排名变化', '\u81EA`' + Util.getDateString(date) + '`\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7CFB\u6570\u6392\u540D\u5171`' + (isUp ? '上升' : '下降') + '`\u4E86`' + Math.abs(smRank - data.smRank) + '`\u540D ' + ('(No.`' + data.smRank + '`->No.`' + smRank + '`)'));
            Msg.show('\u81EA<em>' + Util.getDateString(date) + '</em>\u4EE5\u6765\uFF0C\u4F60\u7684\u795E\u79D8\u7CFB\u6570\u6392\u540D\u5171<b style="color: ' + (isUp ? '#F00' : '#393') + '">' + (isUp ? '上升' : '下降') + '</b>\u4E86' + ('<em>' + Math.abs(smRank - data.smRank) + '</em>\u540D'));
        } else if (diff < 0) {
            writeData(smRank);
        }
    }
};

/**
 * 在首页帖子链接旁添加快速跳转至页末的链接
 */
var addHomePageThreadFastGotoLink = exports.addHomePageThreadFastGotoLink = function addHomePageThreadFastGotoLink() {
    $('.index1').on('mouseenter', 'li.b_tit4:has("a"), li.b_tit4_1:has("a")', function () {
        var $this = $(this);
        $this.css('position', 'relative').prepend('<a class="pd_thread_goto" href="{0}&page=e#a">&raquo;</a>'.replace('{0}', $this.find('a').attr('href')));
    }).on('mouseleave', 'li.b_tit4:has("a"), li.b_tit4_1:has("a")', function () {
        $(this).css('position', 'static').find('.pd_thread_goto').remove();
    });
};

/**
 * 在首页显示VIP剩余时间
 */
var showVipSurplusTime = exports.showVipSurplusTime = function showVipSurplusTime() {
    /**
     * 添加VIP剩余时间的提示
     * @param {number} hours VIP剩余时间（小时）
     */
    var addVipHoursTips = function addVipHoursTips(hours) {
        $('a[href="kf_growup.php"][title="用户等级和权限"]').parent().after('<div class="line"></div><div style="width:300px;"><a href="kf_vmember.php" class="indbox' + (hours > 0 ? 5 : 6) + '">VIP\u4F1A\u5458 ' + ('(' + (hours > 0 ? '剩余' + hours + '小时' : '参与论坛获得的额外权限') + ')</a><div class="c"></div></div>'));
    };

    var vipHours = parseInt(Util.getCookie(_Const2.default.vipSurplusTimeCookieName));
    if (isNaN(vipHours) || vipHours < 0) {
        console.log('检查VIP剩余时间Start');
        $.get('kf_vmember.php?t=' + new Date().getTime(), function (html) {
            var hours = 0;
            var matches = /我的VIP剩余时间\s*<b>(\d+)<\/b>\s*小时/i.exec(html);
            if (matches) hours = parseInt(matches[1]);
            Util.setCookie(_Const2.default.vipSurplusTimeCookieName, hours, Util.getDate('+' + _Const2.default.vipSurplusTimeExpires + 'm'));
            addVipHoursTips(hours);
        });
    } else {
        addVipHoursTips(vipHours);
    }
};

/**
 * 在首页上添加搜索类型选择框
 */
var addSearchTypeSelectBoxInHomePage = exports.addSearchTypeSelectBoxInHomePage = function addSearchTypeSelectBoxInHomePage() {
    var $form = $('form[action="search.php?"]');
    $form.attr('name', 'pd_search');
    var $keyWord = $form.find('[type="text"][name="keyword"]');
    $keyWord.css('width', '116px');
    $('<div class="pd_search_type"><span>标题</span><i>&#8744;</i></div>').insertAfter($keyWord);
};

},{"./Const":6,"./Info":10,"./Log":12,"./Msg":15,"./TmpLog":20,"./Util":21}],10:[function(require,module,exports){
'use strict';

/**
 * KFOL类
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Info = {
  // 用户ID
  uid: 0,
  // 用户名
  userName: '',
  // 是否位于首页
  isInHomePage: location.pathname === '/' || location.pathname === '/index.php',
  // 是否为移动版
  isMobile: false,
  // 版本号
  version: '',
  // 当前窗口
  w: typeof unsafeWindow !== 'undefined' ? unsafeWindow : window,
  /**
   * 助手设置和日志的存储位置类型
   * Default：存储在浏览器的localStorage中，设置仅按域名区分，日志同时按域名和uid区分；
   * ByUid：存储在油猴脚本的数据库中，设置和日志仅按uid区分;
   * Global：存储在油猴脚本的数据库中，各域名和各uid均使用全局设置，日志仅按uid区分；
   */
  storageType: 'Default'
};

exports.default = Info;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modifyItemDescription = exports.addBatchBuyItemsLink = exports.addSampleItemTips = exports.getItemUsedInfo = exports.enhanceMyItemsPage = exports.addBatchUseAndConvertItemTypesButton = exports.addBatchConvertEnergyAndRestoreItemsLink = exports.addConvertEnergyAndRestoreItemsButton = exports.addSellAndUseItemsButton = exports.getLevelByName = exports.getTypeIdByName = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Log = require('./Log');

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获得转换指定等级道具可获得的能量点
 * @param {number} itemLevel 道具等级
 * @returns {number} 能量点
 */
var getGainEnergyNumByLevel = function getGainEnergyNumByLevel(itemLevel) {
    switch (itemLevel) {
        case 1:
            return 2;
        case 2:
            return 10;
        case 3:
            return 50;
        case 4:
            return 300;
        case 5:
            return 2000;
        default:
            return 0;
    }
};

/**
 * 获得恢复指定等级道具所需的能量点
 * @param {number} itemLevel 道具等级
 * @returns {number} 能量点
 */
var getRestoreEnergyNumByLevel = function getRestoreEnergyNumByLevel(itemLevel) {
    switch (itemLevel) {
        case 1:
            return 10;
        case 2:
            return 50;
        case 3:
            return 300;
        case 4:
            return 2000;
        case 5:
            return 10000;
        default:
            return 0;
    }
};

/**
 * 获取指定等级道具的出售所得
 * @param {number} itemLevel 道具等级
 * @returns {number} 出售所得
 */
var getSellItemGainByLevel = function getSellItemGainByLevel(itemLevel) {
    switch (itemLevel) {
        case 3:
            return 300;
        case 4:
            return 2000;
        case 5:
            return 10000;
        default:
            return 0;
    }
};

/**
 * 获取指定名称的道具种类ID
 * @param {string} itemName 道具名称
 * @returns {number} 道具种类ID
 */
var getTypeIdByName = exports.getTypeIdByName = function getTypeIdByName(itemName) {
    switch (itemName) {
        case '零时迷子的碎片':
            return 1;
        case '被遗弃的告白信':
            return 2;
        case '学校天台的钥匙':
            return 3;
        case 'TMA最新作压缩包':
            return 4;
        case 'LOLI的钱包':
            return 5;
        case '棒棒糖':
            return 6;
        case '蕾米莉亚同人漫画':
            return 11;
        case '十六夜同人漫画':
            return 7;
        case '档案室钥匙':
            return 8;
        case '傲娇LOLI娇蛮音CD':
            return 12;
        case '整形优惠卷':
            return 9;
        case '消逝之药':
            return 10;
        default:
            return 0;
    }
};

/**
 * 获取指定名称的道具等级
 * @param {string} itemName 道具名称
 * @returns {number} 道具等级
 */
var getLevelByName = exports.getLevelByName = function getLevelByName(itemName) {
    switch (itemName) {
        case '零时迷子的碎片':
        case '被遗弃的告白信':
        case '学校天台的钥匙':
        case 'TMA最新作压缩包':
            return 1;
        case 'LOLI的钱包':
        case '棒棒糖':
            return 2;
        case '蕾米莉亚同人漫画':
        case '十六夜同人漫画':
            return 3;
        case '档案室钥匙':
        case '傲娇LOLI娇蛮音CD':
            return 4;
        case '整形优惠卷':
        case '消逝之药':
            return 5;
        default:
            return 0;
    }
};

/**
 * 获取指定名称的道具使用上限个数
 * @param {string} itemName 道具名称
 * @returns {number} 道具的使用上限个数
 */
var getMaxUsedNumByName = function getMaxUsedNumByName(itemName) {
    switch (itemName) {
        case '蕾米莉亚同人漫画':
        case '十六夜同人漫画':
            return 50;
        case '档案室钥匙':
        case '傲娇LOLI娇蛮音CD':
            return 30;
        case '整形优惠卷':
        case '消逝之药':
            return 10;
        default:
            return -1;
    }
};

/**
 * 从使用道具的回应消息中获取积分数据
 * @param {string} response 使用道具的回应消息
 * @param {number} itemTypeId 道具种类ID
 * @returns {Object|number} 积分对象，-1表示使用失败
 */
var getCreditsViaResponse = function getCreditsViaResponse(response, itemTypeId) {
    if (/(错误的物品编号|无法再使用|该道具已经被使用)/.test(response)) {
        return -1;
    }
    if (itemTypeId >= 7 && itemTypeId <= 12) {
        if (/成功！/.test(response)) return { '效果': 1 };
    } else {
        var matches = null;
        matches = /恢复能量增加了\s*(\d+)\s*点/i.exec(response);
        if (matches) return { '能量': parseInt(matches[1]) };
        matches = /(\d+)KFB/i.exec(response);
        if (matches) return { 'KFB': parseInt(matches[1]) };
        matches = /(\d+)点?贡献/i.exec(response);
        if (matches) return { '贡献': parseInt(matches[1]) };
        matches = /贡献\+(\d+)/i.exec(response);
        if (matches) return { '贡献': parseInt(matches[1]) };
    }
    return {};
};

/**
 * 获取本种类指定数量的道具ID列表
 * @param {string} html 道具列表页面的HTML代码
 * @param {number} num 指定道具数量（设为0表示获取当前所有道具）
 * @returns {number[]} 道具ID列表
 */
var getItemIdList = function getItemIdList(html) {
    var num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var itemIdList = [];
    var matches = html.match(/kf_fw_ig_my\.php\?pro=\d+/g);
    if (matches) {
        for (var i = 0; i < matches.length; i++) {
            if (num > 0 && i + 1 > num) break;
            var itemIdMatches = /pro=(\d+)/i.exec(matches[i]);
            if (itemIdMatches) itemIdList.push(parseInt(itemIdMatches[1]));
        }
    }
    return itemIdList;
};

/**
 * 使用指定的一系列道具
 * @param {{}} options 设置项
 * @param {number} options.type 使用类型，1：使用本种类指定数量的道具；2：使用本种类指定ID的道具
 * @param {number[]} options.itemIdList 指定的道具ID列表
 * @param {string} options.safeId 用户的SafeID
 * @param {number} options.itemLevel 道具等级
 * @param {number} options.itemTypeId 道具种类ID
 * @param {string} options.itemName 道具名称
 * @param {jQuery} [options.$itemLine] 当前使用道具种类所在的表格行（用于使用类型1）
 * @param {boolean} [options.isTypeBatch=false] 是否批量使用不同种类的道具
 * @param {{}} [cycle] 循环使用道具的信息类
 * @param {number} cycle.itemNum 循环使用的道具数量
 * @param {number} cycle.round 当前循环的轮数
 * @param {number} cycle.totalEnergyNum 当前的道具恢复能量
 * @param {{}} cycle.countStat 循环使用道具的操作次数统计项
 * @param {{}} cycle.stat 循环使用道具的统计项
 * @param {number} cycle.maxEffectiveItemCount 有效道具使用次数上限（0表示不限制）
 * @param {number} cycle.maxSuccessRestoreItemCount 恢复道具成功次数上限（0表示不限制）
 */
var useItems = function useItems(options, cycle) {
    var settings = {
        type: 1,
        itemIdList: [],
        safeId: '',
        itemLevel: 0,
        itemTypeId: 0,
        itemName: '',
        $itemLine: null,
        isTypeBatch: false
    };
    $.extend(settings, options);

    if (cycle) {
        if (cycle.round === 1) {
            console.log('\u5FAA\u73AF\u4F7F\u7528\u9053\u5177Start\uFF0C\u4F7F\u7528\u9053\u5177\u6570\u91CF\uFF1A' + cycle.itemNum + '\uFF0C\u6709\u6548\u9053\u5177\u4F7F\u7528\u6B21\u6570\u4E0A\u9650\uFF1A' + (cycle.maxEffectiveItemCount ? cycle.maxEffectiveItemCount : '无限制') + '\uFF0C' + ('\u6062\u590D\u9053\u5177\u6210\u529F\u6B21\u6570\u4E0A\u9650\uFF1A' + (cycle.maxSuccessRestoreItemCount ? cycle.maxSuccessRestoreItemCount : '无限制')));
            $('.kf_fw_ig1:last').parent().append('<ul class="pd_result"><li class="pd_stat"><strong>\u5BF9<em>' + cycle.itemNum + '</em>\u4E2A\u3010Lv.' + settings.itemLevel + '\uFF1A' + settings.itemName + '\u3011' + ('\u9053\u5177\u7684\u5FAA\u73AF\u4F7F\u7528\u5F00\u59CB\uFF08\u5F53\u524D\u9053\u5177\u6062\u590D\u80FD\u91CF<em>' + cycle.totalEnergyNum + '</em>\u70B9\uFF09<br>') + ('\uFF08\u6709\u6548\u9053\u5177\u4F7F\u7528\u6B21\u6570\u4E0A\u9650\uFF1A<em>' + (cycle.maxEffectiveItemCount ? cycle.maxEffectiveItemCount : '无限制') + '</em>\uFF0C') + ('\u6062\u590D\u9053\u5177\u6210\u529F\u6B21\u6570\u4E0A\u9650\uFF1A<em>' + (cycle.maxSuccessRestoreItemCount ? cycle.maxSuccessRestoreItemCount : '无限制') + '</em>\uFF09</strong></li></ul>'));
        } else {
            $('.pd_result:last').append('<div class="pd_result_sep"></div>');
        }
        $('.pd_result:last').append('<li class="pd_stat" style="color: #ff3399;"><strong>\u7B2C' + cycle.round + '\u8F6E\u5FAA\u73AF\u5F00\u59CB\uFF1A</strong></li>');
    }
    if (cycle) {
        $('.pd_result:last').append('<li><strong>使用结果：</strong></li>');
    } else {
        $('.kf_fw_ig1:last').parent().append('<ul class="pd_result"><li><strong>\u3010Lv.' + settings.itemLevel + '\uFF1A' + settings.itemName + '\u3011\u4F7F\u7528\u7ED3\u679C\uFF1A</strong></li></ul>');
    }

    var successNum = 0,
        failNum = 0;
    var stat = { '有效道具': 0, '无效道具': 0 };
    var nextRoundItemIdList = [];
    var isStop = false;
    $(document).clearQueue('UseItems');
    $.each(settings.itemIdList, function (index, itemId) {
        $(document).queue('UseItems', function () {
            $.ajax({
                type: 'GET',
                url: 'kf_fw_ig_doit.php?id=' + itemId + '&t=' + new Date().getTime(),
                timeout: _Const2.default.defAjaxTimeout,
                success: function success(html) {
                    Public.showFormatLog('使用道具', html);
                    var matches = /<span style=".+?">(.+?)<\/span><br\s*\/?><a href=".+?">/i.exec(html);
                    if (matches && !/(错误的物品编号|无法再使用|该道具已经被使用)/.test(html)) {
                        successNum++;
                        nextRoundItemIdList.push(itemId);
                        var credits = getCreditsViaResponse(matches[1], settings.itemTypeId);
                        if (credits !== -1) {
                            if ($.isEmptyObject(credits)) stat['无效道具']++;else stat['有效道具']++;
                            if (settings.itemTypeId <= 6) {
                                var _iteratorNormalCompletion = true;
                                var _didIteratorError = false;
                                var _iteratorError = undefined;

                                try {
                                    for (var _iterator = Object.keys(credits)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var key = _step.value;

                                        if (typeof stat[key] === 'undefined') stat[key] = credits[key];else stat[key] += credits[key];
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return) {
                                            _iterator.return();
                                        }
                                    } finally {
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        failNum++;
                        if (/无法再使用/.test(html)) nextRoundItemIdList = [];
                    }
                    $('.pd_result:last').append('<li><b>\u7B2C' + (index + 1) + '\u6B21\uFF1A</b>' + (matches ? matches[1] : '未能获得预期的回应') + '</li>');
                    if (cycle && cycle.maxEffectiveItemCount && cycle.stat['有效道具'] + stat['有效道具'] >= cycle.maxEffectiveItemCount) {
                        isStop = true;
                        console.log('有效道具使用次数到达设定上限，循环使用操作停止');
                        $('.pd_result:last').append('<li><span class="pd_notice">（有效道具使用次数到达设定上限，循环操作中止）</span></li>');
                    }
                },
                error: function error() {
                    failNum++;
                },
                complete: function complete() {
                    var $remainingNum = $('#pd_remaining_num');
                    $remainingNum.text(parseInt($remainingNum.text()) - 1);
                    isStop = isStop || $remainingNum.closest('.pd_msg').data('stop');
                    if (isStop) {
                        $(document).clearQueue('UseItems');
                        if (settings.isTypeBatch) $(document).clearQueue('UseItemTypes');
                    }

                    if (isStop || index === settings.itemIdList.length - 1) {
                        Msg.remove($remainingNum.closest('.pd_msg'));
                        if (stat['有效道具'] === 0) delete stat['有效道具'];
                        if (stat['无效道具'] === 0) delete stat['无效道具'];
                        if (!cycle && successNum > 0) {
                            (0, _Log.push)('使用道具', '\u5171\u6709`' + successNum + '`\u4E2A\u3010`Lv.' + settings.itemLevel + '\uFF1A' + settings.itemName + '`\u3011\u9053\u5177\u88AB\u4F7F\u7528', {
                                gain: $.extend({}, stat, { '已使用道具': successNum }),
                                pay: { '道具': -successNum }
                            });
                        }
                        var logStat = '',
                            msgStat = '',
                            resultStat = '';
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = Object.keys(stat)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var type = _step2.value;

                                logStat += '\uFF0C' + type + '+' + stat[type];
                                msgStat += '<i>' + type + '<em>+' + stat[type] + '</em></i>';
                                resultStat += '<i>' + type + '<em>+' + stat[type] + '</em></i> ';
                                if (cycle) {
                                    if (typeof cycle.stat[type] === 'undefined') cycle.stat[type] = stat[type];else cycle.stat[type] += stat[type];
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        console.log('\u5171\u6709' + successNum + '\u4E2A\u9053\u5177\u88AB\u4F7F\u7528' + (failNum > 0 ? '\uFF0C\u5171\u6709' + failNum + '\u4E2A\u9053\u5177\u672A\u80FD\u4F7F\u7528' : '') + logStat);
                        Msg.show('<strong>\u5171\u6709<em>' + successNum + '</em>\u4E2A\u9053\u5177\u88AB\u4F7F\u7528' + (failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u4E2A\u9053\u5177\u672A\u80FD\u4F7F\u7528' : '') + '</strong>' + msgStat, -1);
                        if (resultStat === '') resultStat = '<span class="pd_notice">无</span>';
                        $('.pd_result:last').append('<li class="pd_stat"><b>\u7EDF\u8BA1\u7ED3\u679C\uFF08\u5171\u6709<em>' + successNum + '</em>\u4E2A\u9053\u5177\u88AB\u4F7F\u7528\uFF09\uFF1A</b><br>' + resultStat + '</li>');

                        if (settings.type === 2) {
                            $('.kf_fw_ig1 input[type="checkbox"]:checked').closest('tr').fadeOut('normal', function () {
                                $(this).remove();
                            });
                        } else {
                            setCurrentItemUsableAndUsedNum(settings.$itemLine, successNum, -successNum);
                            showItemUsedInfo(settings.$itemLine.closest('tbody').find('tr:gt(1) > td:nth-child(2) > a'));
                        }
                        if (settings.itemName === '零时迷子的碎片') showCurrentUsedItemNum();

                        if (cycle) {
                            settings.itemIdList = nextRoundItemIdList;
                            if (!settings.itemIdList.length) isStop = true;
                            cycle.countStat['被使用次数'] += successNum;
                            cycle.stat['道具'] -= successNum;
                            cycle.stat['已使用道具'] += successNum;
                            cycleUseItems(isStop ? 0 : 2, settings, cycle);
                        } else if (settings.isTypeBatch) {
                            $(document).dequeue('UseItemTypes');
                        }
                    } else {
                        setTimeout(function () {
                            return $(document).dequeue('UseItems');
                        }, typeof _Const2.default.specialAjaxInterval === 'function' ? _Const2.default.specialAjaxInterval() : _Const2.default.specialAjaxInterval);
                    }
                }
            });
        });
    });
    $(document).dequeue('UseItems');
};

/**
 * 恢复指定的一系列道具
 * @param {{}} options 设置项
 * @param {number} options.type 恢复类型，1：恢复本种类指定数量的道具；2：恢复本种类指定ID的道具
 * @param {number[]} options.itemIdList 指定的道具ID列表
 * @param {string} options.safeId 用户的SafeID
 * @param {number} options.itemLevel 道具等级
 * @param {number} options.itemTypeId 道具种类ID
 * @param {string} options.itemName 道具名称
 * @param {jQuery} [options.$itemLine] 当前恢复道具种类所在的表格行（用于恢复类型1）
 * @param {{}} [cycle] 循环使用道具的信息类
 * @param {number} cycle.itemNum 循环使用的道具数量
 * @param {number} cycle.round 当前循环的轮数
 * @param {number} cycle.totalEnergyNum 当前的道具恢复能量
 * @param {{}} cycle.countStat 循环使用道具的操作次数统计项
 * @param {{}} cycle.stat 循环使用道具的统计项
 * @param {number} cycle.maxEffectiveItemCount 有效道具使用次数上限（0表示不限制）
 * @param {number} cycle.maxSuccessRestoreItemCount 恢复道具成功次数上限（0表示不限制）
 */
var restoreItems = function restoreItems(options, cycle) {
    var settings = {
        type: 1,
        itemIdList: [],
        safeId: '',
        itemLevel: 0,
        itemTypeId: 0,
        itemName: '',
        $itemLine: null
    };
    $.extend(settings, options);

    if (cycle) {
        $('.pd_result:last').append('<li class="pd_result_sep_inner"></li><li><strong>恢复结果：</strong></li>');
    } else {
        $('.kf_fw_ig1:last').parent().append('<ul class="pd_result"><li><strong>\u3010Lv.' + settings.itemLevel + '\uFF1A' + settings.itemName + '\u3011\u6062\u590D\u7ED3\u679C\uFF1A</strong></li></ul>');
    }

    var successNum = 0,
        failNum = 0,
        successEnergyNum = 0;
    var perEnergyNum = getRestoreEnergyNumByLevel(settings.itemLevel);
    var isStop = false;
    var nextRoundItemIdList = [];
    $(document).clearQueue('RestoreItems');
    $.each(settings.itemIdList, function (index, itemId) {
        $(document).queue('RestoreItems', function () {
            $.ajax({
                type: 'GET',
                url: 'kf_fw_ig_doit.php?renew=' + settings.safeId + '&id=' + itemId + '&t=' + new Date().getTime(),
                timeout: _Const2.default.defAjaxTimeout,
                success: function success(html) {
                    Public.showFormatLog('恢复道具', html);
                    var msg = '';
                    var matches = /<span style=".+?">(.+?)<\/span><br\s*\/?><a href=".+?">/i.exec(html);
                    if (matches) {
                        if (/该道具已经被恢复/.test(html)) {
                            msg = '该道具已经被恢复';
                            successNum++;
                            successEnergyNum += perEnergyNum;
                            nextRoundItemIdList.push(itemId);
                            if (cycle && cycle.maxSuccessRestoreItemCount && cycle.countStat['恢复成功次数'] + successNum >= cycle.maxSuccessRestoreItemCount) {
                                isStop = true;
                                msg += '<span class="pd_notice">（恢复道具成功次数已达到设定上限，恢复操作中止）</span>';
                            }
                        } else if (/恢复失败/.test(html)) {
                            msg = '该道具恢复失败';
                            failNum++;
                        } else if (/你的能量不足以恢复本道具/.test(html)) {
                            isStop = true;
                            msg = '你的能量不足以恢复本道具<span class="pd_notice">（恢复操作中止）</span>';
                        } else {
                            msg = matches[1];
                        }
                    } else {
                        msg = '未能获得预期的回应';
                    }
                    $('.pd_result:last').append('<li><b>\u7B2C' + (index + 1) + '\u6B21\uFF1A</b>' + msg + '</li>');
                },
                complete: function complete() {
                    var $remainingNum = $('#pd_remaining_num');
                    $remainingNum.text(parseInt($remainingNum.text()) - 1);
                    isStop = isStop || $remainingNum.closest('.pd_msg').data('stop');
                    if (isStop) $(document).clearQueue('RestoreItems');

                    if (isStop || index === settings.itemIdList.length - 1) {
                        Msg.remove($remainingNum.closest('.pd_msg'));
                        if (!cycle && (successNum > 0 || failNum > 0)) {
                            (0, _Log.push)('恢复道具', '\u5171\u6709`' + successNum + '`\u4E2A\u3010`Lv.' + settings.itemLevel + '\uFF1A' + settings.itemName + '`\u3011\u9053\u5177\u6062\u590D\u6210\u529F\uFF0C\u5171\u6709`' + failNum + '`\u4E2A\u9053\u5177\u6062\u590D\u5931\u8D25', {
                                gain: { '道具': successNum },
                                pay: { '已使用道具': -(successNum + failNum), '能量': -successEnergyNum }
                            });
                        }
                        console.log('\u5171\u6709' + successNum + '\u4E2A\u9053\u5177\u6062\u590D\u6210\u529F\uFF0C\u5171\u6709' + failNum + '\u4E2A\u9053\u5177\u6062\u590D\u5931\u8D25\uFF0C\u80FD\u91CF-' + successEnergyNum);
                        Msg.show('<strong>\u5171\u6709<em>' + successNum + '</em>\u4E2A\u9053\u5177\u6062\u590D\u6210\u529F\uFF0C\u5171\u6709<em>' + failNum + '</em>\u4E2A\u9053\u5177\u6062\u590D\u5931\u8D25</strong>' + ('<i>\u80FD\u91CF<ins>-' + successEnergyNum + '</ins></i>'), -1);
                        $('.pd_result:last').append('<li class="pd_stat">\u5171\u6709<em>' + successNum + '</em>\u4E2A\u9053\u5177\u6062\u590D\u6210\u529F\uFF0C\u5171\u6709<em>' + failNum + '</em>\u4E2A\u9053\u5177\u6062\u590D\u5931\u8D25\uFF0C' + ('<i>\u80FD\u91CF<ins>-' + successEnergyNum + '</ins></i></li>'));

                        if (settings.type === 2) {
                            $('.kf_fw_ig1:eq(1) input[type="checkbox"]:checked').closest('tr').fadeOut('normal', function () {
                                $(this).remove();
                            });
                        }
                        setCurrentItemUsableAndUsedNum(settings.$itemLine, -(successNum + failNum), successNum, -successEnergyNum);

                        if (cycle) {
                            settings.itemIdList = nextRoundItemIdList;
                            if (!settings.itemIdList.length) isStop = true;
                            if (!isStop) cycle.round++;
                            cycle.totalEnergyNum -= successEnergyNum;
                            cycle.countStat['恢复成功次数'] += successNum;
                            cycle.countStat['恢复失败次数'] += failNum;
                            cycle.stat['能量'] -= successEnergyNum;
                            cycle.stat['道具'] += successNum;
                            cycle.stat['已使用道具'] -= successNum + failNum;
                            cycleUseItems(isStop ? 0 : 1, settings, cycle);
                        }
                    } else {
                        setTimeout(function () {
                            return $(document).dequeue('RestoreItems');
                        }, typeof _Const2.default.specialAjaxInterval === 'function' ? _Const2.default.specialAjaxInterval() : _Const2.default.specialAjaxInterval);
                    }
                }
            });
        });
    });
    $(document).dequeue('RestoreItems');
};

/**
 * 循环使用指定的一系列道具
 * @param {number} type 操作类型，1：批量使用道具；2：批量恢复道具；0：中止循环
 * @param {{}} options 设置项
 * @param {number} options.type 循环使用类型，1：循环使用本种类指定数量的道具；2：循环使用本种类指定ID的道具
 * @param {number[]} options.itemIdList 指定的道具ID列表
 * @param {string} options.safeId 用户的SafeID
 * @param {number} options.itemLevel 道具等级
 * @param {number} options.itemTypeId 道具种类ID
 * @param {string} options.itemName 道具名称
 * @param {jQuery} [options.$itemLine] 当前使用道具种类所在的表格行（用于循环使用类型1）
 * @param {{}} cycle 循环使用道具的信息类
 * @param {number} cycle.itemNum 循环使用的道具数量
 * @param {number} cycle.round 当前循环的轮数
 * @param {number} cycle.totalEnergyNum 当前的道具恢复能量
 * @param {{}} cycle.countStat 循环使用道具的操作次数统计项
 * @param {{}} cycle.stat 循环使用道具的统计项
 * @param {number} cycle.maxEffectiveItemCount 有效道具使用次数上限（0表示不限制）
 * @param {number} cycle.maxSuccessRestoreItemCount 恢复道具成功次数上限（0表示不限制）
 */
var cycleUseItems = function cycleUseItems(type, options, cycle) {
    if (!cycle.countStat || $.isEmptyObject(cycle.countStat)) {
        cycle.countStat = {
            '被使用次数': 0,
            '恢复成功次数': 0,
            '恢复失败次数': 0
        };
    }
    if (!cycle.stat || $.isEmptyObject(cycle.stat)) {
        cycle.stat = {
            '能量': 0,
            '道具': 0,
            '已使用道具': 0,
            '有效道具': 0,
            '无效道具': 0
        };
    }

    if ($('.pd_msg').length >= 5) {
        Msg.remove($('.pd_msg:first'));
    }

    var showResult = function showResult(type, stat) {
        var resultStat = '';
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = Object.keys(stat)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var key = _step3.value;

                if (type > 0 && (key === '道具' || key === '已使用道具')) continue;
                resultStat += '<i>' + key + Util.getStatFormatNumber(cycle.stat[key]) + '</i> ';
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        $('.pd_result:last').append('\n<li class="pd_result_sep' + (type > 0 ? '_inner' : '') + '"></li>\n<li class="pd_stat">\n  <strong>' + (type > 0 ? '截至目前为止的统计' : '\u3010Lv.' + options.itemLevel + '\uFF1A' + options.itemName + '\u3011\u5FAA\u73AF\u4F7F\u7528\u6700\u7EC8\u7EDF\u8BA1') + '\n(\u5F53\u524D\u9053\u5177\u6062\u590D\u80FD\u91CF<em>' + cycle.totalEnergyNum + '</em>\u70B9)\uFF1A</strong>\n</li>\n<li class="pd_stat">\n  ' + (type > 0 ? '' : '\u5171\u8FDB\u884C\u4E86<em>' + cycle.round + '</em>\u8F6E\u5FAA\u73AF\uFF1A') + '\n  <i>\u88AB\u4F7F\u7528\u6B21\u6570<em>+' + cycle.countStat['被使用次数'] + '</em></i>\n  <i>\u6062\u590D\u6210\u529F\u6B21\u6570<em>+' + cycle.countStat['恢复成功次数'] + '</em></i>\n  <i>\u6062\u590D\u5931\u8D25\u6B21\u6570<em>+' + cycle.countStat['恢复失败次数'] + '</em></i>\n</li>\n<li class="pd_stat">' + resultStat + '</li>\n');
    };

    if (type === 1) {
        showResult(type, cycle.stat);
        Msg.wait('<strong>\u6B63\u5728\u4F7F\u7528\u9053\u5177\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + options.itemIdList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
        setTimeout(function () {
            useItems(options, cycle);
        }, cycle.round === 1 ? 500 : typeof _Const2.default.cycleUseItemsFirstAjaxInterval === 'function' ? _Const2.default.cycleUseItemsFirstAjaxInterval() : _Const2.default.cycleUseItemsFirstAjaxInterval);
    } else if (type === 2) {
        Msg.wait('<strong>\u6B63\u5728\u6062\u590D\u9053\u5177\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + options.itemIdList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
        setTimeout(function () {
            return restoreItems(options, cycle);
        }, typeof _Const2.default.cycleUseItemsFirstAjaxInterval === 'function' ? _Const2.default.cycleUseItemsFirstAjaxInterval() : _Const2.default.cycleUseItemsFirstAjaxInterval);
    } else {
        if (cycle.stat['道具'] === 0) delete cycle.stat['道具'];
        if (cycle.stat['已使用道具'] === 0) delete cycle.stat['已使用道具'];
        if (cycle.stat['有效道具'] === 0) delete cycle.stat['有效道具'];
        if (cycle.stat['无效道具'] === 0) delete cycle.stat['无效道具'];
        var gain = {},
            pay = {};
        for (var key in cycle.stat) {
            if (cycle.stat[key] > 0) gain[key] = cycle.stat[key];else pay[key] = cycle.stat[key];
        }

        if (cycle.countStat['被使用次数'] > 0) {
            (0, _Log.push)('循环使用道具', '\u5BF9`' + cycle.itemNum + '`\u4E2A\u3010`Lv.' + options.itemLevel + '\uFF1A' + options.itemName + '`\u3011\u9053\u5177\u8FDB\u884C\u4E86`' + cycle.round + '`\u8F6E\u5FAA\u73AF\u4F7F\u7528' + ('(\u88AB\u4F7F\u7528\u6B21\u6570`+' + cycle.countStat['被使用次数'] + '`\uFF0C\u6062\u590D\u6210\u529F\u6B21\u6570`+' + cycle.countStat['恢复成功次数'] + '`\uFF0C') + ('\u6062\u590D\u5931\u8D25\u6B21\u6570`+' + cycle.countStat['恢复失败次数'] + '`)'), { gain: gain, pay: pay });
        }

        console.log('\u5171\u8FDB\u884C\u4E86' + cycle.round + '\u8F6E\u5FAA\u73AF\uFF0C\u88AB\u4F7F\u7528\u6B21\u6570+' + cycle.countStat['被使用次数'] + '\uFF0C\u6062\u590D\u6210\u529F\u6B21\u6570+' + cycle.countStat['恢复成功次数'] + '\uFF0C' + ('\u6062\u590D\u5931\u8D25\u6B21\u6570+' + cycle.countStat['恢复失败次数'] + '\uFF0C\u80FD\u91CF' + cycle.stat['能量']));
        Msg.show('<strong>\u5171\u8FDB\u884C\u4E86<em>' + cycle.round + '</em>\u8F6E\u5FAA\u73AF</strong><i>\u88AB\u4F7F\u7528\u6B21\u6570<em>+' + cycle.countStat['被使用次数'] + '</em></i>' + ('<i>\u6062\u590D\u6210\u529F\u6B21\u6570<em>+' + cycle.countStat['恢复成功次数'] + '</em></i><i>\u6062\u590D\u5931\u8D25\u6B21\u6570<em>+' + cycle.countStat['恢复失败次数'] + '</em></i>') + ('<i>\u80FD\u91CF<ins>' + cycle.stat['能量'] + '</ins></i><a href="#">\u6E05\u9664\u6D88\u606F\u6846</a>'), -1).find('a').click(function (e) {
            e.preventDefault();
            Msg.destroy();
        });
        showResult(type, cycle.stat);
    }
};

/**
 * 转换指定的一系列道具为能量
 * @param {{}} options 设置项
 * @param {number} options.type 转换类型，1：转换本种类指定数量的道具为能量；2：转换本种类指定ID的道具为能量
 * @param {number[]} options.itemIdList 指定的道具ID列表
 * @param {string} options.safeId 用户的SafeID
 * @param {number} options.itemLevel 道具等级
 * @param {string} options.itemName 道具名称
 * @param {jQuery} [options.$itemLine] 当前恢复道具种类所在的表格行（用于转换类型1）
 * @param {boolean} [options.isTypeBatch=false] 是否批量转换不同种类的道具
 */
var convertItemsToEnergy = function convertItemsToEnergy(options) {
    var settings = {
        type: 1,
        itemIdList: [],
        safeId: '',
        itemLevel: 0,
        itemName: '',
        $itemLine: null,
        isTypeBatch: false
    };
    $.extend(settings, options);
    $('.kf_fw_ig1:last').parent().append('<ul class="pd_result"><li><strong>\u3010Lv.' + settings.itemLevel + '\uFF1A' + settings.itemName + '\u3011\u8F6C\u6362\u7ED3\u679C\uFF1A</strong></li></ul>');

    var successNum = 0,
        failNum = 0;
    var energyNum = getGainEnergyNumByLevel(settings.itemLevel);
    $(document).clearQueue('ConvertItemsToEnergy');
    $.each(settings.itemIdList, function (index, itemId) {
        $(document).queue('ConvertItemsToEnergy', function () {
            $.ajax({
                type: 'GET',
                url: 'kf_fw_ig_doit.php?tomp=' + settings.safeId + '&id=' + itemId + '&t=' + new Date().getTime(),
                timeout: _Const2.default.defAjaxTimeout,
                success: function success(html) {
                    Public.showFormatLog('将道具转换为能量', html);
                    if (/转换为了\s*\d+\s*点能量/.test(html)) {
                        successNum++;
                    } else failNum++;
                },
                error: function error() {
                    failNum++;
                },
                complete: function complete() {
                    var $remainingNum = $('#pd_remaining_num');
                    $remainingNum.text(parseInt($remainingNum.text()) - 1);
                    var isStop = $remainingNum.closest('.pd_msg').data('stop');
                    if (isStop) {
                        $(document).clearQueue('ConvertItemsToEnergy');
                        if (settings.isTypeBatch) $(document).clearQueue('ConvertItemTypesToEnergy');
                    }

                    if (isStop || index === settings.itemIdList.length - 1) {
                        Msg.remove($remainingNum.closest('.pd_msg'));
                        var successEnergyNum = successNum * energyNum;
                        if (successNum > 0) {
                            (0, _Log.push)('将道具转换为能量', '\u5171\u6709`' + successNum + '`\u4E2A\u3010`Lv.' + settings.itemLevel + '\uFF1A' + settings.itemName + '`\u3011\u9053\u5177\u6210\u529F\u8F6C\u6362\u4E3A\u80FD\u91CF', { gain: { '能量': successEnergyNum }, pay: { '已使用道具': -successNum } });
                        }
                        console.log('\u5171\u6709' + successNum + '\u4E2A\u9053\u5177\u6210\u529F\u8F6C\u6362\u4E3A\u80FD\u91CF' + (failNum > 0 ? '\uFF0C\u5171\u6709' + failNum + '\u4E2A\u9053\u5177\u8F6C\u6362\u5931\u8D25' : '') + '\uFF0C\u80FD\u91CF+' + successEnergyNum);
                        Msg.show('<strong>\u5171\u6709<em>' + successNum + '</em>\u4E2A\u9053\u5177\u6210\u529F\u8F6C\u6362\u4E3A\u80FD\u91CF' + (failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u4E2A\u9053\u5177\u8F6C\u6362\u5931\u8D25' : '') + '</strong>' + ('<i>\u80FD\u91CF<em>+' + successEnergyNum + '</em></i>'), -1);
                        $('.pd_result:last').append('<li class="pd_stat">\u5171\u6709<em>' + successNum + '</em>\u4E2A\u9053\u5177\u6210\u529F\u8F6C\u6362\u4E3A\u80FD\u91CF' + (failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u4E2A\u9053\u5177\u8F6C\u6362\u5931\u8D25' : '') + '\uFF0C' + ('<i>\u80FD\u91CF<em>+' + successEnergyNum + '</em></i></li>'));

                        if (settings.type === 2) {
                            $('.kf_fw_ig1:eq(1) input[type="checkbox"]:checked').closest('tr').fadeOut('normal', function () {
                                $(this).remove();
                            });
                        }
                        setCurrentItemUsableAndUsedNum(settings.$itemLine, -successNum, null, successEnergyNum);
                        if (settings.isTypeBatch) $(document).dequeue('ConvertItemTypesToEnergy');
                    } else {
                        setTimeout(function () {
                            return $(document).dequeue('ConvertItemsToEnergy');
                        }, _Const2.default.defAjaxInterval);
                    }
                }
            });
        });
    });
    $(document).dequeue('ConvertItemsToEnergy');
};

/**
 * 出售指定的一系列道具
 * @param {{}} options 设置项
 * @param {number[]} options.itemIdList 指定的道具ID列表
 * @param {string} options.safeId 用户的SafeID
 * @param {number} options.itemLevel 道具等级
 * @param {string} options.itemName 道具名称
 */
var sellItems = function sellItems(options) {
    var settings = {
        itemIdList: [],
        itemLevel: 0,
        itemName: ''
    };
    $.extend(settings, options);
    $('.kf_fw_ig1:last').parent().append('<ul class="pd_result"><li><strong>\u3010Lv.' + settings.itemLevel + '\uFF1A' + settings.itemName + '\u3011\u51FA\u552E\u7ED3\u679C\uFF1A</strong></li></ul>');

    var successNum = 0,
        failNum = 0,
        totalGain = 0;
    $(document).clearQueue('SellItems');
    $.each(settings.itemIdList, function (index, itemId) {
        $(document).queue('SellItems', function () {
            $.ajax({
                type: 'GET',
                url: 'kf_fw_ig_shop.php?sell=yes&id=' + itemId + '&t=' + new Date().getTime(),
                timeout: _Const2.default.defAjaxTimeout,
                success: function success(html) {
                    Public.showFormatLog('出售道具', html);
                    if (/出售成功/.test(html)) {
                        successNum++;
                        totalGain += getSellItemGainByLevel(settings.itemLevel);
                    } else failNum++;
                },
                error: function error() {
                    failNum++;
                },
                complete: function complete() {
                    var $remainingNum = $('#pd_remaining_num');
                    $remainingNum.text(parseInt($remainingNum.text()) - 1);
                    var isStop = $remainingNum.closest('.pd_msg').data('stop');
                    if (isStop) $(document).clearQueue('SellItems');

                    if (isStop || index === settings.itemIdList.length - 1) {
                        Msg.remove($remainingNum.closest('.pd_msg'));
                        if (successNum > 0) {
                            (0, _Log.push)('出售道具', '\u5171\u6709`' + successNum + '`\u4E2A\u3010`Lv.' + settings.itemLevel + '\uFF1A' + settings.itemName + '`\u3011\u9053\u5177\u51FA\u552E\u6210\u529F', {
                                gain: { 'KFB': totalGain },
                                pay: { '道具': -successNum }
                            });
                        }
                        $('.kf_fw_ig1 input[type="checkbox"]:checked').closest('tr').fadeOut('normal', function () {
                            $(this).remove();
                        });
                        console.log('\u5171\u6709' + successNum + '\u4E2A\u9053\u5177\u51FA\u552E\u6210\u529F\uFF0C\u5171\u6709' + failNum + '\u4E2A\u9053\u5177\u51FA\u552E\u5931\u8D25\uFF0CKFB+' + totalGain);
                        Msg.show('<strong>\u5171\u6709<em>' + successNum + '</em>\u4E2A\u9053\u5177\u51FA\u552E\u6210\u529F' + (failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u4E2A\u9053\u5177\u51FA\u552E\u5931\u8D25' : '') + '</strong>' + ('<i>KFB<em>+' + totalGain + '</em></i>'), -1);
                        $('.pd_result:last').append('<li class="pd_stat">\u5171\u6709<em>' + successNum + '</em>\u4E2A\u9053\u5177\u51FA\u552E\u6210\u529F' + (failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u4E2A\u9053\u5177\u51FA\u552E\u5931\u8D25' : '') + '\uFF0C' + ('<i>KFB<em>+' + totalGain + '</em></i></li>'));
                    } else {
                        setTimeout(function () {
                            return $(document).dequeue('SellItems');
                        }, _Const2.default.defAjaxInterval);
                    }
                }
            });
        });
    });
    $(document).dequeue('SellItems');
};

/**
 * 在道具列表页面上添加批量出售和使用道具的按钮
 */
var addSellAndUseItemsButton = exports.addSellAndUseItemsButton = function addSellAndUseItemsButton() {
    var safeId = Public.getSafeId();
    if (!safeId) return;
    var $lastLine = $('.kf_fw_ig1 > tbody > tr:last-child');
    var itemName = $lastLine.find('td:first-child').text();
    if (!itemName) return;
    var matches = /(\d+)级道具/.exec($lastLine.find('td:nth-child(2)').text());
    if (!matches) return;
    var itemLevel = parseInt(matches[1]);
    var itemTypeId = parseInt(Util.getUrlParam('lv'));
    if (!itemTypeId) return;
    $('.kf_fw_ig1 > tbody > tr > td:last-child').each(function () {
        var matches = /kf_fw_ig_my\.php\?pro=(\d+)/.exec($(this).find('a').attr('href'));
        if (!matches) return;
        $(this).css('width', '163').parent().append('<td style="width: 20px; padding-right: 5px;"><input class="pd_input" type="checkbox" value="' + matches[1] + '"></td>');
    });
    $('.kf_fw_ig1 > tbody > tr:lt(2)').find('td').attr('colspan', 5);
    $('<div class="pd_item_btns"><button title="批量使用指定道具">使用道具</button><button>全选</button><button>反选</button></div>').insertAfter('.kf_fw_ig1').find('button:first-child').click(function () {
        Msg.destroy();
        var itemIdList = [];
        $('.kf_fw_ig1 input[type="checkbox"]:checked').each(function () {
            itemIdList.push(parseInt($(this).val()));
        });
        if (!itemIdList.length) return;
        if (!confirm('\u5171\u9009\u62E9\u4E86' + itemIdList.length + '\u4E2A\u9053\u5177\uFF0C\u662F\u5426\u6279\u91CF\u4F7F\u7528\u9053\u5177\uFF1F')) return;
        Msg.wait('<strong>\u6B63\u5728\u4F7F\u7528\u9053\u5177\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + itemIdList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
        useItems({
            type: 2,
            itemIdList: itemIdList,
            safeId: safeId,
            itemLevel: itemLevel,
            itemTypeId: itemTypeId,
            itemName: itemName
        });
    }).next().click(function () {
        $('.kf_fw_ig1 input[type="checkbox"]').prop('checked', true);
    }).next().click(function () {
        $('.kf_fw_ig1 input[type="checkbox"]').each(function () {
            $(this).prop('checked', !$(this).prop('checked'));
        });
    });
    if (itemTypeId > 1) {
        $('<button style="color: #00f;" title="循环使用和恢复指定数量的道具，直至停止操作或没有道具可以恢复">循环使用</button>').prependTo('.pd_item_btns').click(function () {
            Msg.destroy();
            var itemIdList = [];
            $('.kf_fw_ig1 input[type="checkbox"]:checked').each(function () {
                itemIdList.push(parseInt($(this).val()));
            });
            if (!itemIdList.length) return;
            var value = prompt('你要循环使用多少个道具？\n' + '（可直接填写道具数量，也可使用“道具数量|有效道具使用次数上限|恢复道具成功次数上限”的格式[设为0表示不限制]，例一：7；例二：5|3；例三：3|0|6）', itemIdList.length);
            if (value === null) return;
            value = $.trim(value);
            if (!/\d+(\|\d+)?(\|\d+)?/.test(value)) {
                alert('格式不正确');
                return;
            }
            var arr = value.split('|');
            var num = parseInt(arr[0]),
                maxEffectiveItemCount = 0,
                maxSuccessRestoreItemCount = 0;
            if (!num) return;
            if (typeof arr[1] !== 'undefined') maxEffectiveItemCount = parseInt(arr[1]);
            if (typeof arr[2] !== 'undefined') maxSuccessRestoreItemCount = parseInt(arr[2]);
            Msg.destroy();

            if (num > itemIdList.length) num = itemIdList.length;
            var tmpItemIdList = [];
            for (var i = 0; i < num; i++) {
                tmpItemIdList.push(itemIdList[i]);
            }
            itemIdList = tmpItemIdList;
            Msg.wait('正在获取当前道具相关信息，请稍后&hellip;');
            $.get('kf_fw_ig_renew.php?t=' + new Date().getTime(), function (html) {
                Msg.destroy();
                var totalEnergyNum = getCurrentEnergyNum(html);
                showCurrentUsedItemNum(html);
                cycleUseItems(1, {
                    type: 2,
                    itemIdList: itemIdList,
                    safeId: safeId,
                    itemLevel: itemLevel,
                    itemTypeId: itemTypeId,
                    itemName: itemName
                }, {
                    itemNum: itemIdList.length,
                    round: 1,
                    totalEnergyNum: totalEnergyNum,
                    countStat: {},
                    stat: {},
                    maxEffectiveItemCount: maxEffectiveItemCount,
                    maxSuccessRestoreItemCount: maxSuccessRestoreItemCount
                });
            });
        });
    }
    if (itemTypeId >= 7 && itemTypeId <= 12) {
        $('<button style="color: #f00;" title="批量出售指定道具">出售道具</button>').prependTo('.pd_item_btns').click(function () {
            Msg.destroy();
            var itemIdList = [];
            $('.kf_fw_ig1 input[type="checkbox"]:checked').each(function () {
                itemIdList.push(parseInt($(this).val()));
            });
            if (!itemIdList.length) return;
            if (!confirm('共选择了{0}个道具，是否批量出售道具？'.replace('{0}', itemIdList.length))) return;
            Msg.wait('<strong>\u6B63\u5728\u51FA\u552E\u9053\u5177\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + itemIdList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
            sellItems({
                itemIdList: itemIdList,
                itemLevel: itemLevel,
                itemName: itemName
            });
        });
    }
    showCurrentUsedItemNum();
};

/**
 * 在已使用道具列表页面上添加批量转换能量和恢复道具的按钮
 */
var addConvertEnergyAndRestoreItemsButton = exports.addConvertEnergyAndRestoreItemsButton = function addConvertEnergyAndRestoreItemsButton() {
    var safeId = Public.getSafeId();
    if (!safeId) return;
    var $lastLine = $('.kf_fw_ig1:eq(1) > tbody > tr:last-child');
    var itemName = $lastLine.find('td:first-child').text();
    if (!itemName) return;
    var matches = /(\d+)级道具/.exec($lastLine.find('td:nth-child(2)').text());
    if (!matches) return;
    var itemLevel = parseInt(matches[1]);
    var itemTypeId = parseInt(Util.getUrlParam('lv'));
    if (!itemTypeId) return;
    $('.kf_fw_ig1:eq(1) > tbody > tr > td:last-child').each(function () {
        var matches = /kf_fw_ig_my\.php\?pro=(\d+)/.exec($(this).find('a').attr('href'));
        if (!matches) return;
        $(this).css('width', '500').parent().append('<td style="width: 20px; padding-right: 5px;"><input class="pd_input" type="checkbox" value="' + matches[1] + '"></td>');
    });
    $('<div class="pd_item_btns"><button class="pd_highlight" title="批量将指定道具转换为能量">转换能量</button>' + '<button title="批量恢复指定道具">恢复道具</button><button>全选</button><button>反选</button></div>').insertAfter('.kf_fw_ig1:eq(1)').find('button:first-child').click(function () {
        Msg.destroy();
        var itemIdList = [];
        $('.kf_fw_ig1:eq(1) input[type="checkbox"]:checked').each(function () {
            itemIdList.push(parseInt($(this).val()));
        });
        if (!itemIdList.length) return;
        if (!confirm('\u5171\u9009\u62E9\u4E86' + itemIdList.length + '\u4E2A\u9053\u5177\uFF0C\u662F\u5426\u8F6C\u6362\u4E3A\u80FD\u91CF\uFF1F')) return;
        Msg.wait('<strong>\u6B63\u5728\u8F6C\u6362\u80FD\u91CF\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + itemIdList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
        convertItemsToEnergy({
            type: 2,
            itemIdList: itemIdList,
            safeId: safeId,
            itemLevel: itemLevel,
            itemName: itemName
        });
    }).next().click(function () {
        Msg.destroy();
        var itemIdList = [];
        $('.kf_fw_ig1:eq(1) input[type="checkbox"]:checked').each(function () {
            itemIdList.push(parseInt($(this).val()));
        });
        if (!itemIdList.length) return;
        var totalRequiredEnergyNum = itemIdList.length * getRestoreEnergyNumByLevel(itemLevel);
        if (!confirm('\u5171\u9009\u62E9\u4E86' + itemIdList.length + '\u4E2A\u9053\u5177\uFF0C\u5171\u9700\u8981' + totalRequiredEnergyNum + '\u70B9\u6062\u590D\u80FD\u91CF\uFF0C\u662F\u5426\u6062\u590D\u9053\u5177\uFF1F')) return;
        var totalEnergyNum = parseInt($('.kf_fw_ig1 td:contains("道具恢复能量")').find('span').text());
        if (!totalEnergyNum || totalEnergyNum < totalRequiredEnergyNum) {
            alert('所需恢复能量不足');
            return;
        }
        Msg.wait('<strong>\u6B63\u5728\u6062\u590D\u9053\u5177\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + itemIdList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
        restoreItems({
            type: 2,
            itemIdList: itemIdList,
            safeId: safeId,
            itemLevel: itemLevel,
            itemTypeId: itemTypeId,
            itemName: itemName
        });
    }).next().click(function () {
        $('.kf_fw_ig1:eq(1) input[type="checkbox"]').prop('checked', true);
    }).next().click(function () {
        $('.kf_fw_ig1:eq(1) input[type="checkbox"]').each(function () {
            $(this).prop('checked', !$(this).prop('checked'));
        });
    });
};

/**
 * 在道具恢复页面上添加批量转换道具为能量和批量恢复道具的链接
 */
var addBatchConvertEnergyAndRestoreItemsLink = exports.addBatchConvertEnergyAndRestoreItemsLink = function addBatchConvertEnergyAndRestoreItemsLink() {
    var $myItems = $('.kf_fw_ig1:last');
    $myItems.find('tbody > tr').each(function (index) {
        var $this = $(this);
        if (index === 0) {
            $this.find('td').attr('colspan', 6);
        } else if (index === 1) {
            $this.find('td:nth-child(2)').attr('width', 200).next('td').attr('width', 100).wrapInner('<span class="pd_used_num pd_custom_tips" style="color: #000;"></span>').next('td').attr('width', 130).text('批量恢复').next('td').attr('width', 160).before('<td width="160">批量转换</td>');
        } else {
            $this.find('td:nth-child(3)').wrapInner('<span class="pd_used_num pd_custom_tips"></span>').end().find('td:nth-child(4)').html('<a class="pd_items_batch_restore ' + (index === 2 ? 'pd_disabled_link' : '') + '" href="#" title="\u6279\u91CF\u6062\u590D\u6307\u5B9A\u6570\u91CF\u7684\u9053\u5177">\u6279\u91CF\u6062\u590D\u9053\u5177</a>').after('<td><a class="pd_items_batch_convert pd_highlight ' + (index === 2 ? 'pd_disabled_link' : '') + '" href="#" ' + 'title="\u6279\u91CF\u5C06\u6307\u5B9A\u6570\u91CF\u7684\u9053\u5177\u8F6C\u6362\u4E3A\u80FD\u91CF">\u6279\u91CF\u8F6C\u6362\u9053\u5177\u4E3A\u80FD\u91CF</a></td>');
            var matches = /lv=(\d+)/i.exec($this.find('td:last-child').find('a').attr('href'));
            if (matches) $this.data('itemTypeId', parseInt(matches[1]));
        }
    });
    bindItemActionLinksClick($myItems);

    var $itemName = $myItems.find('tbody > tr:gt(1) > td:nth-child(2)');
    addSampleItemsLink($itemName);
    showItemUsedInfo($itemName.find('a'));
    showUsedItemEnergyTips();
};

/**
 * 添加批量使用和转换指定种类的道具的按钮
 */
var addBatchUseAndConvertItemTypesButton = exports.addBatchUseAndConvertItemTypesButton = function addBatchUseAndConvertItemTypesButton() {
    var safeId = Public.getSafeId();
    if (!safeId) return;
    $('<div class="pd_item_btns"><button title="批量使用指定种类的道具" data-action="useItemTypes">批量使用</button>' + '<button class="pd_highlight" title="批量将指定种类的道具转换为能量" data-action="convertItemTypes">批量转换</button>' + '<button data-action="selectAll">全选</button><button data-action="selectInverse">反选</button></div>').insertAfter('.pd_my_items').on('click', 'button', function () {
        var action = $(this).data('action');
        if (action === 'useItemTypes' || action === 'convertItemTypes') {
            var _ret = function () {
                var itemTypeList = [];
                $('.pd_item_type_chk:checked').each(function () {
                    var $itemLine = $(this).closest('tr'),
                        itemLevel = parseInt($itemLine.find('td:first-child').text()),
                        itemTypeId = parseInt($itemLine.data('itemTypeId')),
                        itemName = $itemLine.find('td:nth-child(2) > a').text();
                    if (isNaN(itemTypeId) || itemTypeId <= 0) return;
                    if (action === 'convertItemTypes' && itemTypeId === 1) return;
                    var itemListUrl = $itemLine.find('td:last-child').find(action === 'useItemTypes' ? 'a:first-child' : 'a:last-child').attr('href') + '&t=' + new Date().getTime();
                    itemTypeList.push({
                        itemTypeId: itemTypeId,
                        itemLevel: itemLevel,
                        itemName: itemName,
                        $itemLine: $itemLine,
                        itemListUrl: itemListUrl
                    });
                });
                if (!itemTypeList.length) return {
                        v: void 0
                    };
                var num = parseInt(prompt('\u5728\u6307\u5B9A\u79CD\u7C7B\u9053\u5177\u4E2D\u4F60\u8981' + (action === 'useItemTypes' ? '使用' : '转换') + '\u591A\u5C11\u4E2A\u9053\u5177\uFF1F\uFF080\u8868\u793A\u4E0D\u9650\u5236\uFF09', 0));
                if (isNaN(num) || num < 0) return {
                        v: void 0
                    };
                Msg.destroy();

                var queueName = action === 'useItemTypes' ? 'UseItemTypes' : 'ConvertItemTypesToEnergy';
                $(document).clearQueue(queueName);
                $.each(itemTypeList, function (index, data) {
                    $(document).queue(queueName, function () {
                        var $wait = Msg.wait('\u6B63\u5728\u83B7\u53D6\u672C\u79CD\u7C7B' + (action === 'useItemTypes' ? '未' : '已') + '\u4F7F\u7528\u9053\u5177\u5217\u8868\uFF0C\u8BF7\u7A0D\u540E&hellip;');
                        $.ajax({
                            type: 'GET',
                            url: data.itemListUrl,
                            timeout: _Const2.default.defAjaxTimeout,
                            success: function success(html) {
                                Msg.remove($wait);
                                var itemIdList = getItemIdList(html, num);
                                if (!itemIdList.length) {
                                    $(document).dequeue(queueName);
                                    return;
                                }

                                if (action === 'useItemTypes') {
                                    console.log('批量使用道具Start，使用道具数量：' + itemIdList.length);
                                    Msg.wait('<strong>\u6B63\u5728\u4F7F\u7528\u9053\u5177\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + itemIdList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
                                    useItems({
                                        type: 1,
                                        itemIdList: itemIdList,
                                        safeId: safeId,
                                        itemLevel: data.itemLevel,
                                        itemTypeId: data.itemTypeId,
                                        itemName: data.itemName,
                                        $itemLine: data.$itemLine,
                                        isTypeBatch: true
                                    });
                                } else {
                                    console.log('批量转换道具为能量Start，转换道具数量：' + itemIdList.length);
                                    Msg.wait('<strong>\u6B63\u5728\u8F6C\u6362\u80FD\u91CF\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + itemIdList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
                                    convertItemsToEnergy({
                                        type: 1,
                                        itemIdList: itemIdList,
                                        safeId: safeId,
                                        itemLevel: data.itemLevel,
                                        itemName: data.itemName,
                                        $itemLine: data.$itemLine,
                                        isTypeBatch: true
                                    });
                                }
                            },
                            error: function error() {
                                Msg.remove($wait);
                                $(document).dequeue(queueName);
                            }
                        });
                    });
                });
                $(document).dequeue(queueName);
            }();

            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        } else if (action === 'selectAll') {
            $('.pd_item_type_chk').prop('checked', true);
        } else if (action === 'selectInverse') {
            $('.pd_item_type_chk').each(function () {
                $(this).prop('checked', !$(this).prop('checked'));
            });
        }
    });
};

/**
 * 为我的道具页面中的道具操作链接绑定点击事件
 * @param {jQuery} $element 要绑定的容器元素
 */
var bindItemActionLinksClick = function bindItemActionLinksClick($element) {
    var safeId = Public.getSafeId();
    if (!safeId) return;
    $element.on('click', 'a[href="#"]', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.is('.pd_disabled_link')) return;
        var $itemLine = $this.closest('tr'),
            itemLevel = parseInt($itemLine.find('td:first-child').text()),
            itemTypeId = parseInt($itemLine.data('itemTypeId')),
            itemName = $itemLine.find('td:nth-child(2) > a').text(),
            itemUsableNum = parseInt($itemLine.find('td:nth-child(3) > .pd_usable_num').text()),
            itemUsedNum = parseInt($itemLine.find('td:nth-child(3) > .pd_used_num').text()),
            itemListUrl = '';
        if (isNaN(itemTypeId) || itemTypeId <= 0) return;

        if ($this.is('.pd_items_batch_use')) {
            var _ret2 = function () {
                var num = parseInt(prompt('\u4F60\u8981\u4F7F\u7528\u591A\u5C11\u4E2A\u3010Lv.' + itemLevel + '\uFF1A' + itemName + '\u3011\u9053\u5177\uFF1F\uFF080\u8868\u793A\u4E0D\u9650\u5236\uFF09', itemUsableNum ? itemUsableNum : 0));
                if (isNaN(num) || num < 0) return {
                        v: void 0
                    };
                Msg.destroy();

                Msg.wait('正在获取本种类未使用道具列表，请稍后&hellip;');
                itemListUrl = $itemLine.find('td:last-child').find('a:first-child').attr('href') + '&t=' + new Date().getTime();
                $.get(itemListUrl, function (html) {
                    Msg.destroy();
                    var itemIdList = getItemIdList(html, num);
                    if (!itemIdList.length) {
                        alert('本种类没有未使用的道具');
                        return;
                    }
                    console.log('批量使用道具Start，使用道具数量：' + itemIdList.length);
                    Msg.wait('<strong>\u6B63\u5728\u4F7F\u7528\u9053\u5177\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + itemIdList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
                    useItems({
                        type: 1,
                        itemIdList: itemIdList,
                        safeId: safeId,
                        itemLevel: itemLevel,
                        itemTypeId: itemTypeId,
                        itemName: itemName,
                        $itemLine: $itemLine
                    });
                });
            }();

            if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
        } else if ($this.is('.pd_items_cycle_use')) {
            var _ret3 = function () {
                var value = prompt('\u4F60\u8981\u5FAA\u73AF\u4F7F\u7528\u591A\u5C11\u4E2A\u3010Lv.' + itemLevel + '\uFF1A' + itemName + '\u3011\u9053\u5177\uFF1F\n' + '（可直接填写道具数量，也可使用“道具数量|有效道具使用次数上限|恢复道具成功次数上限”的格式[设为0表示不限制]，例一：7；例二：5|3；例三：3|0|6）', itemUsableNum ? itemUsableNum : 0);
                if (value === null) return {
                        v: void 0
                    };
                value = $.trim(value);
                if (!/\d+(\|\d+)?(\|\d+)?/.test(value)) {
                    alert('格式不正确');
                    return {
                        v: void 0
                    };
                }
                var arr = value.split('|');
                var num = 0,
                    maxEffectiveItemCount = 0,
                    maxSuccessRestoreItemCount = 0;
                num = parseInt(arr[0]);
                if (isNaN(num) || num < 0) return {
                        v: void 0
                    };
                if (typeof arr[1] !== 'undefined') maxEffectiveItemCount = parseInt(arr[1]);
                if (typeof arr[2] !== 'undefined') maxSuccessRestoreItemCount = parseInt(arr[2]);
                Msg.destroy();

                Msg.wait('正在获取本种类未使用道具列表，请稍后&hellip;');
                itemListUrl = $itemLine.find('td:last-child').find('a:first-child').attr('href') + '&t=' + new Date().getTime();
                $.get(itemListUrl, function (html) {
                    Msg.destroy();
                    var itemIdList = getItemIdList(html, num);
                    if (!itemIdList.length) {
                        alert('本种类没有未使用的道具');
                        return;
                    }
                    Msg.wait('正在获取当前道具相关信息，请稍后&hellip;');
                    $.get('kf_fw_ig_my.php?t=' + new Date().getTime(), function (html) {
                        showCurrentUsableItemNum(html);
                        $.get('kf_fw_ig_renew.php?t=' + new Date().getTime(), function (html) {
                            Msg.destroy();
                            var totalEnergyNum = getCurrentEnergyNum(html);
                            showCurrentUsedItemNum(html);
                            cycleUseItems(1, {
                                type: 1,
                                itemIdList: itemIdList,
                                safeId: safeId,
                                itemLevel: itemLevel,
                                itemTypeId: itemTypeId,
                                itemName: itemName,
                                $itemLine: $itemLine
                            }, {
                                itemNum: itemIdList.length,
                                round: 1,
                                totalEnergyNum: totalEnergyNum,
                                countStat: {},
                                stat: {},
                                maxEffectiveItemCount: maxEffectiveItemCount,
                                maxSuccessRestoreItemCount: maxSuccessRestoreItemCount
                            });
                        });
                    });
                });
            }();

            if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
        } else if ($this.is('.pd_items_batch_restore')) {
            var _ret4 = function () {
                var num = parseInt(prompt('\u4F60\u8981\u6062\u590D\u591A\u5C11\u4E2A\u3010Lv.' + itemLevel + '\uFF1A' + itemName + '\u3011\u9053\u5177\uFF1F\uFF080\u8868\u793A\u4E0D\u9650\u5236\uFF09', itemUsedNum ? itemUsedNum : 0));
                if (isNaN(num) || num < 0) return {
                        v: void 0
                    };
                Msg.destroy();

                itemListUrl = $itemLine.find('td:last-child').find('a:last-child').attr('href') + '&t=' + new Date().getTime();
                Msg.wait('正在获取本种类已使用道具列表，请稍后&hellip;');
                $.get(itemListUrl, function (html) {
                    Msg.destroy();
                    var itemIdList = getItemIdList(html, num);
                    if (!itemIdList.length) {
                        alert('本种类没有已使用的道具');
                        return;
                    }
                    console.log('批量恢复道具Start，恢复道具数量：' + itemIdList.length);
                    Msg.wait('<strong>\u6B63\u5728\u6062\u590D\u9053\u5177\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + itemIdList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
                    restoreItems({
                        type: 1,
                        itemIdList: itemIdList,
                        safeId: safeId,
                        itemLevel: itemLevel,
                        itemTypeId: itemTypeId,
                        itemName: itemName,
                        $itemLine: $itemLine
                    });
                });
            }();

            if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
        } else if ($this.is('.pd_items_batch_convert')) {
            var _ret5 = function () {
                var num = parseInt(prompt('\u4F60\u8981\u5C06\u591A\u5C11\u4E2A\u3010Lv.' + itemLevel + '\uFF1A' + itemName + '\u3011\u9053\u5177\u8F6C\u6362\u4E3A\u80FD\u91CF\uFF1F\uFF080\u8868\u793A\u4E0D\u9650\u5236\uFF09', itemUsedNum ? itemUsedNum : 0));
                if (isNaN(num) || num < 0) return {
                        v: void 0
                    };
                Msg.destroy();

                itemListUrl = $itemLine.find('td:last-child').find('a:last-child').attr('href') + '&t=' + new Date().getTime();
                Msg.wait('正在获取本种类已使用道具列表，请稍后&hellip;');
                $.get(itemListUrl, function (html) {
                    Msg.destroy();
                    var itemIdList = getItemIdList(html, num);
                    if (!itemIdList.length) {
                        alert('本种类没有已使用的道具');
                        return;
                    }
                    console.log('批量转换道具为能量Start，转换道具数量：' + itemIdList.length);
                    Msg.wait('<strong>\u6B63\u5728\u8F6C\u6362\u80FD\u91CF\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + itemIdList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
                    convertItemsToEnergy({
                        type: 1,
                        itemIdList: itemIdList,
                        safeId: safeId,
                        itemLevel: itemLevel,
                        itemName: itemName,
                        $itemLine: $itemLine
                    });
                });
            }();

            if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
        }
    });
};

/**
 * 增强我的道具页面
 */
var enhanceMyItemsPage = exports.enhanceMyItemsPage = function enhanceMyItemsPage() {
    var $myItems = $('.kf_fw_ig1:last');
    $myItems.addClass('pd_my_items').find('tbody > tr').each(function (index) {
        var $this = $(this);
        if (index === 0) {
            $this.find('td').attr('colspan', 6);
        } else if (index === 1) {
            $this.find('td:first-child').css('width', '75px').end().find('td:nth-child(2)').css('width', '185px').end().find('td:nth-child(3)').css('width', '105px').html('<span class="pd_usable_num">可用数</span> / <span class="pd_used_num pd_custom_tips">已用数</span>').end().find('td:last-child').css('width', '165px').before('<td style="width: 135px;">使用道具</td><td style="width: 135px;">恢复道具 和 转换能量</td>');
        } else {
            $this.find('td:first-child').prepend('<input class="pd_input pd_item_type_chk" type="checkbox">');
            var isDisabledLink = index === 2 ? 'pd_disabled_link' : '';
            $this.find('td:nth-child(3)').wrapInner('<span class="pd_usable_num" style="margin-left: 5px;"></span>').append(' / <span class="pd_used_num pd_custom_tips">?</span>').after('\n<td>\n  <a class="pd_items_batch_use" href="#" title="\u6279\u91CF\u4F7F\u7528\u6307\u5B9A\u6570\u91CF\u7684\u9053\u5177">\u6279\u91CF\u4F7F\u7528</a>\n  <a class="pd_items_cycle_use pd_highlight ' + isDisabledLink + '" href="#" title="\u5FAA\u73AF\u4F7F\u7528\u548C\u6062\u590D\u6307\u5B9A\u6570\u91CF\u7684\u9053\u5177\uFF0C\u76F4\u81F3\u505C\u6B62\u64CD\u4F5C\u6216\u6CA1\u6709\u9053\u5177\u53EF\u4EE5\u6062\u590D">\u5FAA\u73AF\u4F7F\u7528</a>\n</td>\n<td>\n  <a class="pd_items_batch_restore ' + isDisabledLink + '" href="#" title="\u6279\u91CF\u6062\u590D\u6307\u5B9A\u6570\u91CF\u7684\u9053\u5177">\u6279\u91CF\u6062\u590D</a>\n  <a class="pd_items_batch_convert pd_highlight ' + isDisabledLink + '" href="#" title="\u6279\u91CF\u5C06\u6307\u5B9A\u6570\u91CF\u7684\u9053\u5177\u8F6C\u6362\u4E3A\u80FD\u91CF">\u6279\u91CF\u8F6C\u6362</a>\n</td>\n');
            var $listLinkColumn = $this.find('td:last-child');
            var matches = /lv=(\d+)/i.exec($listLinkColumn.find('a').attr('href'));
            if (matches) {
                var itemTypeId = parseInt(matches[1]);
                $this.data('itemTypeId', itemTypeId);
                $listLinkColumn.find('a').text('未使用列表').after('<a class="pd_highlight" href="kf_fw_ig_renew.php?lv=' + itemTypeId + '">\u5DF2\u4F7F\u7528\u5217\u8868</a>');
            }
        }
    });
    bindItemActionLinksClick($myItems);

    var $itemName = $myItems.find('tbody > tr:gt(1) > td:nth-child(2)');
    addSampleItemsLink($itemName);
    showItemUsedInfo($itemName.find('a'));
    showCurrentUsedItemNum();
};

/**
 * 设定当前指定种类道具的未使用和已使用数量以及道具恢复能量
 * @param {?jQuery} $itemLine 当前道具所在的表格行
 * @param {?number} usedChangeNum 已使用道具的变化数量
 * @param {?number} [usableChangeNum] 未使用道具的变化数量
 * @param {?number} [energyChangeNum] 道具恢复能量的变化数量
 */
var setCurrentItemUsableAndUsedNum = function setCurrentItemUsableAndUsedNum($itemLine, usedChangeNum, usableChangeNum, energyChangeNum) {
    var flag = false;
    if ($itemLine) {
        var $itemUsed = $itemLine.find('td:nth-child(3) > .pd_used_num');
        var itemName = $itemLine.find('td:nth-child(2) > a').text();
        if ($itemUsed.length > 0 && itemName !== '零时迷子的碎片') {
            var num = parseInt($itemUsed.text());
            if (isNaN(num) || num + usedChangeNum < 0) {
                flag = true;
            } else {
                $itemUsed.text(num + usedChangeNum);
                showUsedItemEnergyTips();
            }
        }
        if (usableChangeNum) {
            var $itemUsable = $itemLine.find('td:nth-child(3) > .pd_usable_num');
            if ($itemUsable.length > 0) {
                var _num = parseInt($itemUsable.text());
                if (isNaN(_num) || _num + usableChangeNum < 0) flag = true;else $itemUsable.text(_num + usableChangeNum);
            }
        }
    }
    if (energyChangeNum) {
        var $totalEnergy = $('.pd_total_energy_num');
        if (location.pathname === '/kf_fw_ig_renew.php') $totalEnergy = $('.kf_fw_ig1:first > tbody > tr:nth-child(2) > td:contains("道具恢复能量") > span');
        if ($totalEnergy.length > 0) {
            var _num2 = parseInt($totalEnergy.text());
            if (isNaN(_num2) || _num2 + energyChangeNum < 0) flag = true;else $totalEnergy.text(_num2 + energyChangeNum);
        } else {
            flag = true;
        }
    }
    if (flag) {
        showCurrentUsedItemNum();
        if (location.pathname === '/kf_fw_ig_my.php' && !Util.getUrlParam('lv')) showCurrentUsableItemNum();
    }
};

/**
 * 获取当前道具恢复能量
 * @param {string} html 恢复道具页面的HTML代码
 */
var getCurrentEnergyNum = function getCurrentEnergyNum(html) {
    var energyNum = 0;
    var energyNumMatches = /道具恢复能量<br\s*\/?><span.+?>(\d+)<\/span><br\s*\/?>点/i.exec(html);
    if (energyNumMatches) energyNum = parseInt(energyNumMatches[1]);
    return energyNum;
};

/**
 * 显示已使用道具恢复所需和转换可得的能量的提示
 */
var showUsedItemEnergyTips = function showUsedItemEnergyTips() {
    var totalRestoreEnergy = 0,
        totalConvertEnergy = 0;
    $('.kf_fw_ig1:last > tbody > tr:gt(1) > td:nth-child(3) > .pd_used_num').each(function () {
        var $this = $(this);
        var itemNum = parseInt($this.text());
        if (isNaN(itemNum) || itemNum < 0) return;
        var itemLevel = parseInt($this.closest('tr').find('td:first-child').text());
        if (!itemLevel) return;
        var perRestoreEnergy = getRestoreEnergyNumByLevel(itemLevel);
        var perConvertEnergy = getGainEnergyNumByLevel(itemLevel);
        totalRestoreEnergy += perRestoreEnergy * itemNum;
        totalConvertEnergy += perConvertEnergy * itemNum;
        $this.attr('title', '\u5168\u90E8\u6062\u590D\u9700\u8981' + perRestoreEnergy * itemNum + '\u70B9\u80FD\u91CF\uFF0C\u5168\u90E8\u8F6C\u6362\u53EF\u5F97' + perConvertEnergy * itemNum + '\u70B9\u80FD\u91CF');
    });
    $('.kf_fw_ig1:last > tbody > tr:nth-child(2) > td:nth-child(3) > .pd_used_num').attr('title', '\u5168\u90E8\u6062\u590D\u9700\u8981' + totalRestoreEnergy + '\u70B9\u80FD\u91CF\uFF0C\u5168\u90E8\u8F6C\u6362\u53EF\u5F97' + totalConvertEnergy + '\u70B9\u80FD\u91CF');
};

/**
 * 在我的道具页面中显示当前各种类已使用道具的数量
 * @param {string} html 恢复道具页面的HTML代码（留空表示自动获取HTML代码）
 */
var showCurrentUsedItemNum = function showCurrentUsedItemNum() {
    var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    /**
     * 显示数量
     * @param {string} html 恢复道具页面的HTML代码
     */
    var show = function show(html) {
        var energyNum = getCurrentEnergyNum(html);
        var introMatches = /(1级道具转换得.+?点能量)。<br/.exec(html);
        if (location.pathname === '/kf_fw_ig_my.php') {
            $('.kf_fw_ig_title1:last').find('span:has(.pd_total_energy_num)').remove().end().append('<span class="pd_custom_tips" style="margin-left: 7px;" title="' + (introMatches ? introMatches[1] : '') + '">' + ('(\u9053\u5177\u6062\u590D\u80FD\u91CF <b class="pd_total_energy_num" style="font-size: 14px;">' + energyNum + '</b> \u70B9)</span>'));
        } else {
            $('.kf_fw_ig1:first > tbody > tr:nth-child(2) > td:contains("道具恢复能量") > span').text(energyNum);
        }

        if ($('.pd_used_num').length > 0) {
            var matches = html.match(/">\d+<\/td><td>全部转换本级已使用道具为能量<\/td>/g);
            if (matches) {
                (function () {
                    var usedItemNumList = [];
                    for (var i in matches) {
                        var usedItemNumMatches = /">(\d+)<\/td>/i.exec(matches[i]);
                        if (usedItemNumMatches) usedItemNumList.push(usedItemNumMatches[1]);
                    }
                    var $usedNum = $('.kf_fw_ig1:last > tbody > tr:gt(1) > td:nth-child(3) > .pd_used_num');
                    if ($usedNum.length === matches.length) {
                        $usedNum.each(function (index) {
                            $(this).text(usedItemNumList[index]);
                        });
                        showUsedItemEnergyTips();
                    }
                })();
            }
        }
    };

    if (html) {
        show(html);
    } else {
        $.get('kf_fw_ig_renew.php?t=' + new Date().getTime(), function (html) {
            return show(html);
        });
    }
};

/**
 * 在我的道具页面中显示当前各种类可使用道具的数量
 * @param {string} html 我的道具页面的HTML代码（留空表示自动获取HTML代码）
 */
var showCurrentUsableItemNum = function showCurrentUsableItemNum() {
    var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    /**
     * 显示数量
     * @param {string} html 我的道具页面的HTML代码
     */
    var show = function show(html) {
        var matches = html.match(/">\d+<\/td><td><a href="kf_fw_ig_my\.php\?lv=/ig);
        if (!matches) return;
        var usableItemNumList = [];
        for (var i in matches) {
            var usableItemNumMatches = /">(\d+)<\/td>/i.exec(matches[i]);
            if (usableItemNumMatches) usableItemNumList.push(usableItemNumMatches[1]);
        }
        $('.kf_fw_ig1:last > tbody > tr:gt(1) > td:nth-child(3) > .pd_usable_num').each(function (index) {
            $(this).text(usableItemNumList[index] ? usableItemNumList[index] : 0);
        });
    };

    if (html) {
        show(html);
    } else {
        $.get('kf_fw_ig_my.php?t=' + new Date().getTime(), function (html) {
            return show(html);
        });
    }
};

/**
 * 获取道具使用情况
 * @param html 争夺首页的HTML代码
 * @returns {{}} 道具使用情况对象
 */
var getItemUsedInfo = exports.getItemUsedInfo = function getItemUsedInfo(html) {
    var itemUsedNumList = {
        '蕾米莉亚同人漫画': 0,
        '十六夜同人漫画': 0,
        '档案室钥匙': 0,
        '傲娇LOLI娇蛮音CD': 0,
        '消逝之药': 0,
        '整形优惠卷': 0
    };
    var matches = /道具：\[(蕾米莉亚同人漫画)：(\d+)]\[(十六夜同人漫画)：(\d+)]\[(档案室钥匙)：(\d+)]\[(傲娇LOLI娇蛮音CD)：(\d+)]\[(消逝之药)：(\d+)]\[(整形优惠卷)：(\d+)]/.exec(html);
    if (matches) {
        for (var i = 1; i < matches.length; i += 2) {
            itemUsedNumList[matches[i]] = parseInt(matches[i + 1]);
        }
    }
    return itemUsedNumList;
};

/**
 * 显示道具使用情况
 * @param {jQuery} $links 道具名称的链接列表
 */
var showItemUsedInfo = function showItemUsedInfo($links) {
    var tipsList = ['仅供参考', '←谁信谁傻逼', '←不管你信不信，反正我是信了', '要是失败了出门左转找XX风', '退KFOL保一生平安', '←这一切都是XX风的阴谋', '这样的几率大丈夫？大丈夫，萌大奶！', '玄不救非，氪不改命', '严重警告：此地的概率学已死', '←概率对非洲人是不适用的', '要相信RP守恒定律'];
    $.get('kf_fw_ig_index.php?t=' + new Date().getTime(), function (html) {
        var itemUsedNumList = getItemUsedInfo(html);
        $links.next('.pd_used_item_info').remove();
        $links.each(function () {
            var $this = $(this);
            var itemName = $this.text();
            if (typeof itemUsedNumList[itemName] === 'undefined') return;
            var usedNum = itemUsedNumList[itemName];
            var maxUsedNum = getMaxUsedNumByName(itemName);
            var nextSuccessPercent = 0;
            if (usedNum > maxUsedNum) nextSuccessPercent = 0;else nextSuccessPercent = (1 - usedNum / maxUsedNum) * 100;
            var tips = '';
            if (usedNum < maxUsedNum && usedNum > 0) tips = '\uFF08' + tipsList[Math.floor(Math.random() * tipsList.length)] + '\uFF09';
            $this.after('<span class="pd_used_item_info" title="\u4E0B\u4E2A\u9053\u5177\u4F7F\u7528\u6210\u529F\u51E0\u7387\uFF1A' + (usedNum >= maxUsedNum ? '无' : nextSuccessPercent.toFixed(2) + '%') + tips + '">' + ('(<span style="' + (usedNum >= maxUsedNum ? 'color: #f00;' : '') + '">' + usedNum + '</span>/<span style="color: #f00;">' + maxUsedNum + '</span>)</span>'));
        });
    });
};

/**
 * 添加道具样品的链接
 * @param {jQuery} $nodes 道具名称的节点列表
 */
var addSampleItemsLink = function addSampleItemsLink($nodes) {
    $nodes.each(function () {
        var $this = $(this);
        var itemName = $this.text().trim();
        var itemLevel = getLevelByName(itemName);
        if (itemName && typeof _Const2.default.sampleItemIdList[itemName] !== 'undefined') {
            var title = '';
            if (itemName !== '零时迷子的碎片') {
                title = '\u6062\u590D\u6B64\u9053\u5177\u9700' + getRestoreEnergyNumByLevel(itemLevel) + '\u70B9\u80FD\u91CF\uFF0C\u8F6C\u6362\u6B64\u9053\u5177\u53EF\u5F97' + getGainEnergyNumByLevel(itemLevel) + '\u70B9\u80FD\u91CF';
            } else {
                title = '此道具不可恢复和转换';
            }
            $this.html('<a href="kf_fw_ig_my.php?pro=' + _Const2.default.sampleItemIdList[itemName] + '&display=1" title="' + title + '">' + itemName + '</a>');
        }
    });
};

/**
 * 添加道具样品提示
 */
var addSampleItemTips = exports.addSampleItemTips = function addSampleItemTips() {
    var itemId = parseInt(Util.getUrlParam('pro'));
    if (isNaN(itemId) || itemId <= 0) return;
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = Object.keys(_Const2.default.sampleItemIdList)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var itemName = _step4.value;

            if (itemId === _Const2.default.sampleItemIdList[itemName]) {
                $('.kf_fw_ig1 > tbody > tr:nth-child(3) > td:last-child').find('span:first').after('<span class="pd_notice" style="margin-left: 5px;">(展示用样品)</span>');
                break;
            }
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }
};

/**
 * 购买指定种类的道具
 * @param {{}} options 设置项
 * @param {number} options.itemTypeId 指定的道具种类ID
 * @param {number} options.num 欲购买的道具数量
 * @param {string} options.safeId 用户的SafeID
 * @param {number} options.itemLevel 道具等级
 * @param {string} options.itemName 道具名称
 */
var buyItems = function buyItems(options) {
    var settings = {
        itemTypeId: 0,
        num: 0,
        safeId: '',
        itemLevel: 0,
        itemName: ''
    };
    $.extend(settings, options);
    $('.kf_fw_ig1').parent().append('<ul class="pd_result"><li><strong>\u3010Lv.' + settings.itemLevel + '\uFF1A' + settings.itemName + '\u3011\u8D2D\u4E70\u7ED3\u679C\uFF1A</strong></li></ul>');

    var successNum = 0,
        failNum = 0;
    var isStop = false;
    $(document).clearQueue('BatchBuyItems');
    $.each(new Array(settings.num), function (index) {
        $(document).queue('BatchBuyItems', function () {
            $.ajax({
                type: 'GET',
                url: 'kf_fw_ig_shop.php?lvid=' + settings.itemTypeId + '&safeid=' + settings.safeId + '&t=' + new Date().getTime(),
                timeout: _Const2.default.defAjaxTimeout,
                success: function success(html) {
                    Public.showFormatLog('购买道具', html);
                    var msg = '';
                    var matches = /<a href="kf_fw_ig_my\.php\?pro=(\d+)">/i.exec(html);
                    if (matches) {
                        successNum++;
                        msg = '\u83B7\u5F97\u4E86<a target="_blank" href="kf_fw_ig_my.php?pro=' + matches[1] + '" data-id="' + matches[1] + '">\u4E00\u4E2A\u9053\u5177</a>';
                    } else if (/你需要持有该道具两倍市场价的KFB/i.test(html)) {
                        msg = '你需要持有该道具两倍市场价的KFB<span class="pd_notice">（购买操作中止）</span>';
                        isStop = true;
                    } else {
                        msg = '未能获得预期的回应';
                    }
                    $('.pd_result:last').append('<li><b>\u7B2C' + (index + 1) + '\u6B21\uFF1A</b>' + msg + '</li>');
                },
                error: function error() {
                    failNum++;
                },
                complete: function complete() {
                    var $remainingNum = $('#pd_remaining_num');
                    $remainingNum.text(parseInt($remainingNum.text()) - 1);
                    isStop = isStop || $remainingNum.closest('.pd_msg').data('stop');
                    if (isStop) $(document).clearQueue('BatchBuyItems');

                    if (isStop || index === settings.num - 1) {
                        Msg.remove($remainingNum.closest('.pd_msg'));
                        if (successNum > 0) {
                            (0, _Log.push)('购买道具', '\u5171\u6709`' + successNum + '`\u4E2A\u3010`Lv.' + settings.itemLevel + '\uFF1A' + settings.itemName + '`\u3011\u9053\u5177\u8D2D\u4E70\u6210\u529F', { gain: { '道具': successNum } });
                        }
                        console.log('\u5171\u6709' + successNum + '\u4E2A\u3010Lv.' + settings.itemLevel + '\uFF1A' + settings.itemName + '\u3011\u9053\u5177\u8D2D\u4E70\u6210\u529F' + (failNum > 0 ? '\uFF0C\u5171\u6709' + failNum + '\u4E2A\u9053\u5177\u8D2D\u4E70\u5931\u8D25' : ''));
                        Msg.show('<strong>\u5171\u6709<em>' + successNum + '</em>\u4E2A\u3010<em>Lv.' + settings.itemLevel + '</em>' + settings.itemName + '\u3011\u9053\u5177\u8D2D\u4E70\u6210\u529F' + ((failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u4E2A\u9053\u5177\u8D2D\u4E70\u5931\u8D25' : '') + '</strong>'), -1);

                        if (successNum > 0) {
                            $('<li><a href="#">统计购买价格</a></li>').appendTo('.pd_result:last').find('a').click(function (e) {
                                e.preventDefault();
                                var $result = $(this).closest('.pd_result');
                                $(this).parent().remove();
                                Msg.destroy();
                                statBuyItemsPrice($result, settings.itemLevel, settings.itemName);
                            });
                            showItemShopBuyInfo();
                        }
                    } else {
                        setTimeout(function () {
                            return $(document).dequeue('BatchBuyItems');
                        }, typeof _Const2.default.specialAjaxInterval === 'function' ? _Const2.default.specialAjaxInterval() : _Const2.default.specialAjaxInterval);
                    }
                }
            });
        });
    });
    $(document).dequeue('BatchBuyItems');
};

/**
 * 统计批量购买道具的购买价格
 * @param {jQuery} $result 购买结果的jQuery对象
 * @param {number} itemLevel 道具等级
 * @param {string} itemName 道具名称
 */
var statBuyItemsPrice = function statBuyItemsPrice($result, itemLevel, itemName) {
    var successNum = 0,
        failNum = 0,
        totalPrice = 0,
        minPrice = 0,
        maxPrice = 0,
        marketPrice = 0,
        totalNum = $result.find('li > a').length;
    $('.kf_fw_ig1:first > tbody > tr:gt(1) > td:nth-child(2)').each(function () {
        var $this = $(this);
        if ($this.find('a').text() === itemName) {
            marketPrice = parseInt($this.next('td').find('.pd_item_price').text());
            return false;
        }
    });
    if (!marketPrice) marketPrice = 1;
    Msg.wait('<strong>\u6B63\u5728\u7EDF\u8BA1\u8D2D\u4E70\u4EF7\u683C\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + totalNum + '</em></i>');
    $(document).clearQueue('StatBuyItemsPrice');
    $result.find('li > a').each(function (index) {
        var $this = $(this);
        var itemId = $this.data('id');
        if (!itemId) return;
        $(document).queue('StatBuyItemsPrice', function () {
            $.ajax({
                type: 'GET',
                url: 'kf_fw_ig_my.php?pro=' + itemId + '&t=' + new Date().getTime(),
                timeout: _Const2.default.defAjaxTimeout,
                success: function success(html) {
                    var $remainingNum = $('#pd_remaining_num');
                    $remainingNum.text(parseInt($remainingNum.text()) - 1);
                    var matches = /从商店购买，购买价(\d+)KFB。<br/.exec(html);
                    if (matches) {
                        successNum++;
                        var price = parseInt(matches[1]);
                        totalPrice += price;
                        if (minPrice === 0) minPrice = price;else if (price < minPrice) minPrice = price;
                        if (price > maxPrice) maxPrice = price;
                        $this.after('\uFF08\u8D2D\u4E70\u4EF7\uFF1A<b class="pd_highlight">' + price + '</b>KFB\uFF09');
                    } else {
                        failNum++;
                        $this.after('<span class="pd_notice">（未能获得预期的回应）</span>');
                    }
                },
                error: function error() {
                    failNum++;
                    $this.after('<span class="pd_notice">（连接超时）</span>');
                },
                complete: function complete() {
                    if (index === totalNum - 1) {
                        Msg.destroy();
                        if (successNum > 0) {
                            (0, _Log.push)('统计道具购买价格', '\u5171\u6709`' + successNum + '`\u4E2A\u3010`Lv.' + itemLevel + '\uFF1A' + itemName + '`\u3011\u9053\u5177\u7EDF\u8BA1\u6210\u529F' + ((failNum > 0 ? '\uFF08\u5171\u6709`' + failNum + '`\u4E2A\u9053\u5177\u672A\u80FD\u7EDF\u8BA1\u6210\u529F\uFF09' : '') + '\uFF0C\u603B\u8BA1\u4EF7\u683C\uFF1A`' + totalPrice.toLocaleString() + '`\uFF0C') + ('\u5E73\u5747\u4EF7\u683C\uFF1A`' + (successNum > 0 ? Util.getFixedNumberLocaleString(totalPrice / successNum, 2) : 0) + '`') + ('(`' + (successNum > 0 ? Math.round(totalPrice / successNum / marketPrice * 100) : 0) + '%`)\uFF0C') + ('\u6700\u4F4E\u4EF7\u683C\uFF1A`' + minPrice.toLocaleString() + '`(`' + Math.round(minPrice / marketPrice * 100) + '%`)\uFF0C') + ('\u6700\u9AD8\u4EF7\u683C\uFF1A`' + maxPrice.toLocaleString() + '`(`' + Math.round(maxPrice / marketPrice * 100) + '%`)'), { pay: { 'KFB': -totalPrice } });
                        }
                        console.log('\u7EDF\u8BA1\u9053\u5177\u8D2D\u4E70\u4EF7\u683C\uFF08KFB\uFF09\uFF08\u5171\u6709' + failNum + '\u4E2A\u9053\u5177\u672A\u80FD\u7EDF\u8BA1\u6210\u529F\uFF09\uFF0C\u7EDF\u8BA1\u6210\u529F\u6570\u91CF\uFF1A' + successNum + '\uFF0C\u603B\u8BA1\u4EF7\u683C\uFF1A' + totalPrice.toLocaleString() + '\uFF0C' + ('\u5E73\u5747\u4EF7\u683C\uFF1A' + (successNum > 0 ? Util.getFixedNumberLocaleString(totalPrice / successNum, 2) : 0) + ' ') + ('(' + (successNum > 0 ? Math.round(totalPrice / successNum / marketPrice * 100) : 0) + '%)\uFF0C\u6700\u4F4E\u4EF7\u683C\uFF1A' + minPrice.toLocaleString() + ' ') + ('(' + Math.round(minPrice / marketPrice * 100) + '%)\uFF0C\u6700\u9AD8\u4EF7\u683C\uFF1A' + maxPrice.toLocaleString() + ' (' + Math.round(maxPrice / marketPrice * 100) + '%)'));
                        $result.append('\n<li class="pd_stat">\n  <b>\u7EDF\u8BA1\u7ED3\u679C' + (failNum > 0 ? '<span class="pd_notice">\uFF08\u5171\u6709' + failNum + '\u4E2A\u9053\u5177\u672A\u80FD\u7EDF\u8BA1\u6210\u529F\uFF09</span>' : '') + '\uFF1A</b><br>\n  <i>\u7EDF\u8BA1\u6210\u529F\u6570\u91CF\uFF1A<em>' + successNum + '</em></i>\n  <i>\u603B\u8BA1\u4EF7\u683C\uFF1A<em>' + totalPrice.toLocaleString() + '</em></i>\n  <i>\u5E73\u5747\u4EF7\u683C\uFF1A<em>' + (successNum > 0 ? Util.getFixedNumberLocaleString(totalPrice / successNum, 2) : 0) + ' \n(' + (successNum > 0 ? Math.round(totalPrice / successNum / marketPrice * 100) : 0) + '%)</em></i>\n  <i>\u6700\u4F4E\u4EF7\u683C\uFF1A<em>' + minPrice.toLocaleString() + ' (' + Math.round(minPrice / marketPrice * 100) + '%)</em></i>\n  <i>\u6700\u9AD8\u4EF7\u683C\uFF1A<em>' + maxPrice.toLocaleString() + ' (' + Math.round(maxPrice / marketPrice * 100) + '%)</em></i>\n</li>\n');
                    } else {
                        setTimeout(function () {
                            return $(document).dequeue('StatBuyItemsPrice');
                        }, _Const2.default.defAjaxInterval);
                    }
                }
            });
        });
    });
    $(document).dequeue('StatBuyItemsPrice');
};

/**
 * 在道具商店页面上添加批量购买道具的链接
 */
var addBatchBuyItemsLink = exports.addBatchBuyItemsLink = function addBatchBuyItemsLink() {
    var $shop = $('.kf_fw_ig1:first');

    $shop.find('tbody > tr:nth-child(2)').find('td:nth-child(2)').css('width', '243px').end().find('td:nth-child(3)').css('width', '155px').end().find('td:last-child').css('width', '110px');

    $shop.find('tbody > tr:gt(1)').each(function () {
        $(this).find('td:nth-child(3)').wrapInner('<span class="pd_item_price"></span>').end().find('td:last-child').append('<a class="pd_batch_buy_items" style="margin-left: 15px;" href="#">批量购买</a>');
    });

    $shop.on('click', 'a[href^="kf_fw_ig_shop.php?lvid="]', function () {
        var $this = $(this);
        var itemLevel = parseInt($this.closest('tr').find('td:first-child').text());
        if (!itemLevel) return;
        var itemName = $this.closest('tr').find('td:nth-child(2) > a').text();
        if (!itemName) return;
        if (!confirm('\u662F\u5426\u8D2D\u4E70\u3010Lv.' + itemLevel + '\uFF1A' + itemName + '\u3011\u9053\u5177\uFF1F')) {
            return false;
        }
    }).on('click', 'a.pd_batch_buy_items', function (e) {
        e.preventDefault();
        Msg.destroy();
        var $this = $(this);
        var itemLevel = parseInt($this.closest('tr').find('td:first-child').text());
        if (!itemLevel) return;
        var itemName = $this.closest('tr').find('td:nth-child(2) > a').text();
        if (!itemName) return;
        var matches = /lvid=(\d+)&safeid=(\w+)/i.exec($this.prev('a').attr('href'));
        if (!matches) return;
        var itemTypeId = parseInt(matches[1]);
        var safeId = matches[2];
        var num = parseInt(prompt('\u4F60\u8981\u6279\u91CF\u8D2D\u4E70\u591A\u5C11\u4E2A\u3010Lv.' + itemLevel + '\uFF1A' + itemName + '\u3011\u9053\u5177\uFF1F', 0));
        if (!num || num < 0) return;
        Msg.wait('<strong>\u6B63\u5728\u8D2D\u4E70\u9053\u5177\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + num + '</em></i><a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
        buyItems({ itemTypeId: itemTypeId, num: num, safeId: safeId, itemLevel: itemLevel, itemName: itemName });
    });

    $shop.find('tbody > tr:gt(1) > td:nth-child(4)').each(function () {
        var $this = $(this);
        var price = parseInt($.trim($this.prev('td').text()));
        if (isNaN(price)) return;
        $this.addClass('pd_custom_tips').attr('title', Math.floor(price * 0.5) + '~' + price * 2 + '\uFF08\u5747\u4EF7\uFF1A' + Math.floor(price * 1.25) + '\uFF09');
    });

    var $itemName = $shop.find('tbody > tr:gt(1) > td:nth-child(2)');
    addSampleItemsLink($itemName);
    showItemUsedInfo($itemName.find('a'));
    showItemShopBuyInfo();
    $shop.find('tbody > tr:first-child > td').append('<br><span class="pd_highlight">想买道具却害怕使用失败？快来试试' + '<a href="read.php?tid=526110" target="_blank" title="喵拉布丁：我绝对没收广告费~">道具使用险</a>吧！</span>');
};

/**
 * 显示道具商店可购买情况
 */
var showItemShopBuyInfo = function showItemShopBuyInfo() {
    $.get('profile.php?action=show&uid=' + _Info2.default.uid + '&t=' + new Date().getTime(), function (html) {
        var matches = /论坛货币：(\d+)\s*KFB<br/i.exec(html);
        if (!matches) return;
        var cash = parseInt(matches[1]);
        $('.kf_fw_ig_title1:last').find('span:last').remove().end().append('<span style="margin-left: 7px;">(\u5F53\u524D\u6301\u6709 <b style="font-size: 14px;">' + cash + '</b> KFB)</span>');
        $('.kf_fw_ig1:first > tbody > tr:gt(1) > td:nth-child(3) > .pd_item_price').each(function () {
            var $this = $(this);
            $this.next('.pd_verify_tips').remove();
            var price = parseInt($this.text());
            if (isNaN(price)) return;
            var tips = '',
                title = '';
            if (price * 2 <= cash) {
                tips = '<span style="color: #669933;">可买</span>';
                title = '有足够KFB购买此道具';
            } else {
                tips = '<span style="color: #ff0033;">\u5DEE' + (price * 2 - cash) + '</span>';
                title = '\u8FD8\u5DEE' + (price * 2 - cash) + 'KFB\u624D\u53EF\u8D2D\u4E70\u6B64\u9053\u5177';
            }
            $this.after('<span class="pd_verify_tips" title="' + title + '" style="font-size: 12px; margin-left: 3px;">(' + tips + ')</span>');
        });
    });
};

/**
 * 修正道具描述
 */
var modifyItemDescription = exports.modifyItemDescription = function modifyItemDescription() {
    var $area = $('.kf_fw_ig1 > tbody > tr:nth-child(3) > td:last-child');
    var matches = /道具名称：(.+)/.exec($area.find('span:first').text().trim());
    if (!matches) return;
    var itemName = matches[1];
    var itemDescReplaceList = {
        '蕾米莉亚同人漫画': ['燃烧伤害+1。上限50。', '力量+1，体质+1；满50本时，追加+700生命值。'],
        '十六夜同人漫画': ['命中+3，闪避+1。上限50。', '敏捷+1，灵活+1；满50本时，追加+100攻击速度。'],
        '档案室钥匙': ['暴击伤害加成+10%。上限30。', '增加5%盒子获得概率[原概率*(100%+追加概率)]；满30枚时，增加50点可分配点数。'],
        '傲娇LOLI娇蛮音CD': ['闪避+3，命中+1。上限30。', '降低对手生命值上限的0.5%；满30张时，追加降低对手10%攻击力。'],
        '整形优惠卷': ['暴击几率+3%。上限10。', '在获得盒子时，增加3%的几率直接获得高一级的盒子；<br>满10张时，这个概率直接提升为50%(无法将传奇盒子升级为神秘盒子)。'],
        '消逝之药': ['消除伤害。<br>防御效果+7%。上限10。', '所有属性+5(不含耐力、幸运)；满10瓶时，追加200点可分配点数。']
    };
    if (itemDescReplaceList[itemName]) {
        $area.html($area.html().replace(itemDescReplaceList[itemName][0], itemDescReplaceList[itemName][1]));
    }
};

},{"./Const":6,"./Info":10,"./Log":12,"./Msg":15,"./Public":18,"./Util":21}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMergeLog = exports.push = exports.clear = exports.write = exports.read = exports.init = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 保存日志的键值名称
var name = 'pd_log';

/**
 * 初始化
 */
var init = exports.init = function init() {
    if (typeof unsafeWindow === 'undefined') window.Log = {};else unsafeWindow.Log = {};
};

/**
 * 读取日志
 */
var read = exports.read = function read() {
    _Info2.default.w.Log = {};
    var options = null;
    if (_Info2.default.storageType === 'ByUid' || _Info2.default.storageType === 'Global') options = GM_getValue(name + '_' + _Info2.default.uid);else options = localStorage.getItem(name + '_' + _Info2.default.uid);
    if (!options) return;
    try {
        options = JSON.parse(options);
    } catch (ex) {
        return;
    }
    if (!options || $.type(options) !== 'object') return;
    _Info2.default.w.Log = options;
    if (!Util.getCookie(_Const2.default.checkOverdueLogCookieName)) deleteOverdueLog();
};

/**
 * 写入日志
 */
var write = exports.write = function write() {
    if (_Info2.default.storageType === 'ByUid' || _Info2.default.storageType === 'Global') GM_setValue(name + '_' + _Info2.default.uid, JSON.stringify(_Info2.default.w.Log));else localStorage.setItem(name + '_' + _Info2.default.uid, JSON.stringify(_Info2.default.w.Log));
};

/**
 * 清除日志
 */
var clear = exports.clear = function clear() {
    if (_Info2.default.storageType === 'ByUid' || _Info2.default.storageType === 'Global') GM_deleteValue(name + '_' + _Info2.default.uid);else localStorage.removeItem(name + '_' + _Info2.default.uid);
};

/**
 * 删除过期日志
 */
var deleteOverdueLog = function deleteOverdueLog() {
    var dateList = Util.getObjectKeyList(Log, 1);
    var overdueDate = Util.getDateString(Util.getDate('-' + Config.logSaveDays + 'd'));
    var isDeleted = false;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = dateList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var date = _step.value;

            if (date <= overdueDate) {
                delete Log[date];
                isDeleted = true;
            } else break;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (isDeleted) write();
    Util.setCookie(_Const2.default.checkOverdueLogCookieName, 1, Util.getMidnightHourDate(1));
};

/**
 * 记录一条新日志
 * @param {string} type 日志类别
 * @param {string} action 行为
 * @param {?{}} gain 收获
 * @param {?{}} pay 付出
 */
var push = exports.push = function push(type, action) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$gain = _ref.gain,
        gain = _ref$gain === undefined ? null : _ref$gain,
        _ref$pay = _ref.pay,
        pay = _ref$pay === undefined ? null : _ref$pay;

    var date = new Date();
    var time = date.getTime();
    var today = Util.getDateString(date);
    var settings = { time: time, type: type, action: action };
    if (gain) settings['gain'] = gain;
    if (pay) settings['pay'] = pay;
    read();
    if (!Array.isArray(_Info2.default.w.Log[today])) _Info2.default.w.Log[today] = [];
    _Info2.default.w.Log[today].push(settings);
    write();
};

/**
 * 获取合并后的日志
 * @param {{}} log 当前日志
 * @param {{}} newLog 新日志
 * @returns {{}} 合并后的日志
 */
var getMergeLog = exports.getMergeLog = function getMergeLog(log, newLog) {
    for (var date in newLog) {
        if (!Array.isArray(log[date])) {
            log[date] = newLog[date];
        } else {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                var _loop = function _loop() {
                    var newItem = _step2.value;

                    if (typeof newItem.time !== 'number' || typeof newItem.type !== 'string') return 'continue';
                    var index = log[date].findIndex(function (item) {
                        return newItem['time'] === item['time'] && newItem['type'] === item['type'];
                    });
                    if (index > -1) log[date][index] = newItem;else log[date].push(newItem);
                };

                for (var _iterator2 = newLog[date][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _ret = _loop();

                    if (_ret === 'continue') continue;
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            log[date].sort(function (a, b) {
                return a.time > b.time;
            });
        }
    }
    return log;
};

},{"./Const":6,"./Info":10,"./Util":21}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.show = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Dialog = require('./Dialog');

var Dialog = _interopRequireWildcard(_Dialog);

var _Func = require('./Func');

var _Config = require('./Config');

var _Log = require('./Log');

var _Item = require('./Item');

var Item = _interopRequireWildcard(_Item);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 显示日志对话框
 */
var show = exports.show = function show() {
    if ($('#pd_log').length > 0) return;
    Dialog.close('pd_config');
    (0, _Config.read)();
    (0, _Func.run)('LogDialog.show_before_');
    var html = '\n<div class="pd_cfg_main">\n  <div class="pd_log_nav">\n    <a class="pd_disabled_link" href="#">&lt;&lt;</a>\n    <a style="padding: 0 7px;" class="pd_disabled_link" href="#">&lt;</a>\n    <h2 class="pd_custom_tips">\u6682\u65E0\u65E5\u5FD7</h2>\n    <a style="padding: 0 7px;" class="pd_disabled_link" href="#">&gt;</a>\n    <a class="pd_disabled_link" href="#">&gt;&gt;</a>\n  </div>\n  <fieldset>\n    <legend>\u65E5\u5FD7\u5185\u5BB9</legend>\n    <div>\n      <strong>\u6392\u5E8F\u65B9\u5F0F\uFF1A</strong>\n      <label title="\u6309\u65F6\u95F4\u987A\u5E8F\u6392\u5E8F"><input type="radio" name="pd_log_sort_type" value="time" checked>\u6309\u65F6\u95F4</label>\n      <label title="\u6309\u65E5\u5FD7\u7C7B\u522B\u6392\u5E8F"><input type="radio" name="pd_log_sort_type" value="type">\u6309\u7C7B\u522B</label>\n    </div>\n    <div class="pd_stat" id="pd_log_content">\u6682\u65E0\u65E5\u5FD7</div>\n  </fieldset>\n  <fieldset>\n    <legend>\u7EDF\u8BA1\u7ED3\u679C</legend>\n    <div>\n      <strong>\u7EDF\u8BA1\u8303\u56F4\uFF1A</strong>\n      <label title="\u663E\u793A\u5F53\u5929\u7684\u7EDF\u8BA1\u7ED3\u679C"><input type="radio" name="pd_log_stat_type" value="cur" checked>\u5F53\u5929</label>\n      <label title="\u663E\u793A\u8DDD\u8BE5\u65E5N\u5929\u5185\u7684\u7EDF\u8BA1\u7ED3\u679C"><input type="radio" name="pd_log_stat_type" value="custom"></label>\n      <label title="\u663E\u793A\u8DDD\u8BE5\u65E5N\u5929\u5185\u7684\u7EDF\u8BA1\u7ED3\u679C"><input id="pd_log_stat_days" type="text" style="width: 22px;" maxlength="3">\u5929\u5185</label>\n      <label title="\u663E\u793A\u5168\u90E8\u7EDF\u8BA1\u7ED3\u679C"><input type="radio" name="pd_log_stat_type" value="all">\u5168\u90E8</label>\n    </div>\n    <div class="pd_stat" id="pd_log_stat">\u6682\u65E0\u65E5\u5FD7</div>\n  </fieldset>\n</div>\n<div class="pd_cfg_btns">\n  <span class="pd_cfg_about"><a id="pd_log_im_or_ex_log_dialog" href="#">\u5BFC\u5165/\u5BFC\u51FA\u65E5\u5FD7</a></span>\n  <button>\u5173\u95ED</button><button>\u6E05\u9664\u65E5\u5FD7</button>\n</div>';
    var $dialog = Dialog.create('pd_log', 'KF Online助手日志', html);

    (0, _Log.read)();
    var dateList = [];
    var curIndex = 0;
    if (!$.isEmptyObject(Log)) {
        dateList = Util.getObjectKeyList(Log, 1);
        curIndex = dateList.length - 1;
        $dialog.find('.pd_log_nav h2').attr('title', '\u603B\u5171\u8BB0\u5F55\u4E86' + dateList.length + '\u5929\u7684\u65E5\u5FD7').text(dateList[curIndex]);
        if (dateList.length > 1) {
            $dialog.find('.pd_log_nav > a:eq(0)').attr('title', dateList[0]).removeClass('pd_disabled_link');
            $dialog.find('.pd_log_nav > a:eq(1)').attr('title', dateList[curIndex - 1]).removeClass('pd_disabled_link');
        }
    }
    $dialog.find('.pd_log_nav a').click(function (e) {
        e.preventDefault();
        if ($(this).is('.pd_log_nav a:eq(0)')) {
            curIndex = 0;
        } else if ($(this).is('.pd_log_nav a:eq(1)')) {
            if (curIndex > 0) curIndex--;else return;
        } else if ($(this).is('.pd_log_nav a:eq(2)')) {
            if (curIndex < dateList.length - 1) curIndex++;else return;
        } else if ($(this).is('.pd_log_nav a:eq(3)')) {
            curIndex = dateList.length - 1;
        }
        $dialog.find('.pd_log_nav h2').text(dateList[curIndex]);
        showLogContent(dateList[curIndex]);
        showLogStat(dateList[curIndex]);
        if (curIndex > 0) {
            $dialog.find('.pd_log_nav > a:eq(0)').attr('title', dateList[0]).removeClass('pd_disabled_link');
            $dialog.find('.pd_log_nav > a:eq(1)').attr('title', dateList[curIndex - 1]).removeClass('pd_disabled_link');
        } else {
            $dialog.find('.pd_log_nav > a:lt(2)').removeAttr('title').addClass('pd_disabled_link');
        }
        if (curIndex < dateList.length - 1) {
            $dialog.find('.pd_log_nav > a:eq(2)').attr('title', dateList[curIndex - 1]).removeClass('pd_disabled_link');
            $dialog.find('.pd_log_nav > a:eq(3)').attr('title', dateList[dateList.length - 1]).removeClass('pd_disabled_link');
        } else {
            $dialog.find('.pd_log_nav > a:gt(1)').removeAttr('title').addClass('pd_disabled_link');
        }
    }).end().find('input[name="pd_log_sort_type"]').click(function () {
        var value = $(this).val();
        if (Config.logSortType !== value) {
            Config.logSortType = value;
            (0, _Config.write)();
            showLogContent(dateList[curIndex]);
        }
    }).end().find('input[name="pd_log_stat_type"]').click(function () {
        var value = $(this).val();
        if (Config.logStatType !== value) {
            Config.logStatType = value;
            (0, _Config.write)();
            showLogStat(dateList[curIndex]);
        }
    }).end().find('#pd_log_stat_days').keyup(function () {
        var days = parseInt($.trim($(this).val()));
        if (days > 0 && Config.logStatDays !== days) {
            Config.logStatDays = days;
            (0, _Config.write)();
            $('input[name="pd_log_stat_type"][value="custom"]:not(:checked)').click();
            showLogStat(dateList[curIndex]);
        }
    }).end().find('input[name="pd_log_sort_type"][value="{0}"]'.replace('{0}', Config.logSortType)).click().end().find('input[name="pd_log_stat_type"][value="{0}"]'.replace('{0}', Config.logStatType)).click().end().find('#pd_log_stat_days').val(Config.logStatDays);

    $dialog.find('.pd_cfg_btns > button:first').click(function () {
        return Dialog.close('pd_log');
    }).next('button').click(function (e) {
        e.preventDefault();
        if (confirm('是否清除所有日志？')) {
            (0, _Log.clear)();
            alert('日志已清除');
            location.reload();
        }
    });

    $('#pd_log_im_or_ex_log_dialog').click(function (e) {
        e.preventDefault();
        showImportOrExportLogDialog();
    });

    showLogContent(dateList[curIndex]);
    showLogStat(dateList[curIndex]);

    if ($(window).height() <= 750) $dialog.find('#pd_log_content').css('height', '216px');
    Dialog.show('pd_log');
    $dialog.find('input:first').focus();
    (0, _Func.run)('LogDialog.show_after_');
};

/**
 * 显示指定日期的日志内容
 * @param {string} date 日志对象关键字
 */
var showLogContent = function showLogContent(date) {
    if (!Array.isArray(Log[date])) return;
    $('#pd_log_content').html(getLogContent(date, Config.logSortType)).parent().find('legend:first-child').text('\u65E5\u5FD7\u5185\u5BB9 (\u5171' + Log[date].length + '\u9879)');
};

/**
 * 获取指定日期的日志内容
 * @param {string} date 日志对象关键字
 * @param {string} logSortType 日志内容的排序方式
 * @returns {string} 指定日期的日志内容
 */
var getLogContent = function getLogContent(date, logSortType) {
    var logList = Log[date];
    if (logSortType === 'type') {
        (function () {
            var sortTypeList = ['捐款', '领取争夺奖励', '批量攻击', '试探攻击', '抽取神秘盒子', '抽取道具或卡片', '使用道具', '恢复道具', '循环使用道具', '将道具转换为能量', '将卡片转换为VIP时间', '购买道具', '统计道具购买价格', '出售道具', '神秘抽奖', '统计神秘抽奖结果', '神秘等级升级', '神秘系数排名变化', '批量转账', '购买帖子', '自动存款'];
            logList.sort(function (a, b) {
                return sortTypeList.indexOf(a.type) > sortTypeList.indexOf(b.type);
            });
        })();
    } else {
        logList.sort(function (a, b) {
            return a.time > b.time;
        });
    }

    var content = '',
        curType = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = logList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _step.value,
                time = _step$value.time,
                type = _step$value.type,
                action = _step$value.action,
                gain = _step$value.gain,
                pay = _step$value.pay;

            if (typeof time === 'undefined' || typeof type === 'undefined' || typeof action === 'undefined') continue;
            var d = new Date(time);
            if (logSortType === 'type') {
                if (curType !== type) {
                    content += '<h3>\u3010' + type + '\u3011</h3>';
                    curType = type;
                }
                content += '<p><b>' + Util.getTimeString(d) + '\uFF1A</b>' + action.replace(/`([^`]+?)`/g, '<b style="color: #f00;">$1</b>');
            } else {
                content += '<p><b>' + Util.getTimeString(d) + ' (' + type + ')\uFF1A</b>' + action.replace(/`([^`]+?)`/g, '<b style="color: #f00;">$1</b>');
            }

            var stat = '';
            if ($.type(gain) === 'object' && !$.isEmptyObject(gain)) {
                stat += '，';
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = Object.keys(gain)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var k = _step2.value;

                        if (k === 'item') {
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = Object.keys(gain[k])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var itemName = _step3.value;

                                    stat += '<i>' + itemName + '<em>+' + gain[k][itemName].toLocaleString() + '</em></i> ';
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
                        } else {
                            stat += '<i>' + k + '<em>+' + gain[k].toLocaleString() + '</em></i> ';
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
            if ($.type(pay) === 'object' && !$.isEmptyObject(pay)) {
                if (!stat) stat += '，';
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = Object.keys(pay)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _k = _step4.value;

                        if (_k === 'item') {
                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;

                            try {
                                for (var _iterator5 = Object.keys(pay[_k])[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var _itemName = _step5.value;

                                    stat += '<i>' + _itemName + '<ins>' + pay[_k][_itemName].toLocaleString() + '</ins></i> ';
                                }
                            } catch (err) {
                                _didIteratorError5 = true;
                                _iteratorError5 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                        _iterator5.return();
                                    }
                                } finally {
                                    if (_didIteratorError5) {
                                        throw _iteratorError5;
                                    }
                                }
                            }
                        } else {
                            stat += '<i>' + _k + '<ins>' + pay[_k].toLocaleString() + '</ins></i> ';
                        }
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }

            content += stat + '</p>';
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return content;
};

/**
 * 显示指定日期的日志统计结果
 * @param {string} date 日志对象关键字
 */
var showLogStat = function showLogStat(date) {
    if (!Array.isArray(Log[date])) return;
    $('#pd_log_stat').html(getLogStat(date, Config.logStatType));
};

/**
 * 获取指定日期的日志统计结果
 * @param {string} date 日志对象关键字
 * @param {string} logStatType 日志统计范围类型
 * @returns {string} 指定日期的日志统计结果
 */
var getLogStat = function getLogStat(date, logStatType) {
    var log = {};

    if (logStatType === 'custom') {
        var minDate = new Date(date);
        minDate.setDate(minDate.getDate() - Config.logStatDays + 1);
        minDate = Util.getDateString(minDate);
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
            for (var _iterator6 = Util.getObjectKeyList(Log, 1)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var d = _step6.value;

                if (d >= minDate && d <= date) log[d] = Log[d];
            }
        } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                    _iterator6.return();
                }
            } finally {
                if (_didIteratorError6) {
                    throw _iteratorError6;
                }
            }
        }
    } else if (logStatType === 'all') {
        log = Log;
    } else {
        log[date] = Log[date];
    }

    var income = {},
        expense = {},
        profit = {};
    var validItemNum = 0,
        highValidItemNum = 0,
        validItemStat = {},
        invalidItemNum = 0,
        highInvalidItemNum = 0,
        invalidItemStat = {};
    var buyItemTotalNum = 0,
        buyItemTotalPrice = 0,
        totalBuyItemPricePercent = 0,
        minBuyItemPricePercent = 0,
        maxBuyItemPricePercent = 0,
        buyItemStat = {};
    var invalidKeyList = ['item', '夺取KFB', 'VIP小时', '神秘', '燃烧伤害', '命中', '闪避', '暴击比例', '暴击几率', '防御', '有效道具', '无效道具'];
    for (var _d in log) {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
            for (var _iterator7 = log[_d][Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var _step7$value = _step7.value,
                    type = _step7$value.type,
                    action = _step7$value.action,
                    gain = _step7$value.gain,
                    pay = _step7$value.pay,
                    notStat = _step7$value.notStat;

                if (typeof type === 'undefined' || typeof notStat !== 'undefined') continue;
                if ($.type(gain) === 'object') {
                    var _iteratorNormalCompletion8 = true;
                    var _didIteratorError8 = false;
                    var _iteratorError8 = undefined;

                    try {
                        for (var _iterator8 = Object.keys(gain)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                            var k = _step8.value;

                            if (invalidKeyList.includes(k)) continue;
                            if (typeof income[k] === 'undefined') income[k] = gain[k];else income[k] += gain[k];
                        }
                    } catch (err) {
                        _didIteratorError8 = true;
                        _iteratorError8 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                _iterator8.return();
                            }
                        } finally {
                            if (_didIteratorError8) {
                                throw _iteratorError8;
                            }
                        }
                    }
                }
                if ($.type(pay) === 'object') {
                    var _iteratorNormalCompletion9 = true;
                    var _didIteratorError9 = false;
                    var _iteratorError9 = undefined;

                    try {
                        for (var _iterator9 = Object.keys(pay)[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                            var _k2 = _step9.value;

                            if (invalidKeyList.includes(_k2)) continue;
                            if (typeof expense[_k2] === 'undefined') expense[_k2] = pay[_k2];else expense[_k2] += pay[_k2];
                        }
                    } catch (err) {
                        _didIteratorError9 = true;
                        _iteratorError9 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                _iterator9.return();
                            }
                        } finally {
                            if (_didIteratorError9) {
                                throw _iteratorError9;
                            }
                        }
                    }
                }

                if ((type === '使用道具' || type === '循环使用道具') && $.type(gain) === 'object') {
                    var matches = /【`Lv.(\d+)：(.+?)`】/.exec(action);
                    if (matches) {
                        var itemLevel = parseInt(matches[1]);
                        var itemName = matches[2];
                        if (gain['有效道具'] > 0) {
                            validItemNum += gain['有效道具'];
                            if (itemLevel >= 3) highValidItemNum += gain['有效道具'];
                            if (typeof validItemStat[itemName] === 'undefined') validItemStat[itemName] = 0;
                            validItemStat[itemName] += gain['有效道具'];
                        }
                        if (gain['无效道具'] > 0) {
                            invalidItemNum += gain['无效道具'];
                            if (itemLevel >= 3) highInvalidItemNum += gain['无效道具'];
                            if (typeof invalidItemStat[itemName] === 'undefined') invalidItemStat[itemName] = 0;
                            invalidItemStat[itemName] += gain['无效道具'];
                        }
                    }
                } else if (type === '统计道具购买价格' && $.type(pay) === 'object' && typeof pay['KFB'] !== 'undefined') {
                    var _matches = /共有`(\d+)`个【`Lv.\d+：(.+?)`】道具统计成功，总计价格：`[^`]+?`，平均价格：`[^`]+?`\(`(\d+)%`\)，最低价格：`[^`]+?`\(`(\d+)%`\)，最高价格：`[^`]+?`\(`(\d+)%`\)/.exec(action);
                    if (_matches) {
                        var itemNum = parseInt(_matches[1]);
                        var _itemName2 = _matches[2];
                        if (typeof buyItemStat[_itemName2] === 'undefined') {
                            buyItemStat[_itemName2] = {
                                '道具数量': 0,
                                '总计价格': 0,
                                '总计价格比例': 0,
                                '最低价格比例': 0,
                                '最高价格比例': 0
                            };
                        }
                        buyItemTotalNum += itemNum;
                        buyItemStat[_itemName2]['道具数量'] += itemNum;
                        buyItemTotalPrice += Math.abs(pay['KFB']);
                        buyItemStat[_itemName2]['总计价格'] += Math.abs(pay['KFB']);
                        totalBuyItemPricePercent += parseInt(_matches[3]) * itemNum;
                        buyItemStat[_itemName2]['总计价格比例'] += parseInt(_matches[3]) * itemNum;
                        if (minBuyItemPricePercent <= 0 || parseInt(_matches[4]) < minBuyItemPricePercent) minBuyItemPricePercent = parseInt(_matches[4]);
                        if (parseInt(_matches[5]) > maxBuyItemPricePercent) maxBuyItemPricePercent = parseInt(_matches[5]);
                        if (buyItemStat[_itemName2]['最低价格比例'] <= 0 || parseInt(_matches[4]) < buyItemStat[_itemName2]['最低价格比例']) buyItemStat[_itemName2]['最低价格比例'] = parseInt(_matches[4]);
                        if (parseInt(_matches[5]) > buyItemStat[_itemName2]['最高价格比例']) buyItemStat[_itemName2]['最高价格比例'] = parseInt(_matches[5]);
                    }
                }
            }
        } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                    _iterator7.return();
                }
            } finally {
                if (_didIteratorError7) {
                    throw _iteratorError7;
                }
            }
        }
    }

    var content = '';
    var sortStatTypeList = ['KFB', '经验值', '能量', '贡献', '道具', '已使用道具', '卡片'];
    content += '<strong>收获：</strong>';
    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;
    var _iteratorError10 = undefined;

    try {
        for (var _iterator10 = Util.getSortedObjectKeyList(sortStatTypeList, income)[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var key = _step10.value;

            profit[key] = income[key];
            content += '<i>' + key + '<em>+' + income[key].toLocaleString() + '</em></i> ';
        }
    } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion10 && _iterator10.return) {
                _iterator10.return();
            }
        } finally {
            if (_didIteratorError10) {
                throw _iteratorError10;
            }
        }
    }

    content += '<br><strong>付出：</strong>';
    var _iteratorNormalCompletion11 = true;
    var _didIteratorError11 = false;
    var _iteratorError11 = undefined;

    try {
        for (var _iterator11 = Util.getSortedObjectKeyList(sortStatTypeList, expense)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            var _key = _step11.value;

            if (typeof profit[_key] === 'undefined') profit[_key] = expense[_key];else profit[_key] += expense[_key];
            content += '<i>' + _key + '<ins>' + expense[_key].toLocaleString() + '</ins></i> ';
        }
    } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion11 && _iterator11.return) {
                _iterator11.return();
            }
        } finally {
            if (_didIteratorError11) {
                throw _iteratorError11;
            }
        }
    }

    content += '<br><strong>结余：</strong>';
    var _iteratorNormalCompletion12 = true;
    var _didIteratorError12 = false;
    var _iteratorError12 = undefined;

    try {
        for (var _iterator12 = Util.getSortedObjectKeyList(sortStatTypeList, profit)[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            var _key2 = _step12.value;

            content += '<i>' + _key2 + Util.getStatFormatNumber(profit[_key2]) + '</i> ';
        }
    } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion12 && _iterator12.return) {
                _iterator12.return();
            }
        } finally {
            if (_didIteratorError12) {
                throw _iteratorError12;
            }
        }
    }

    content += '<div style="margin: 5px 0; border-bottom: 1px dashed #ccccff;"></div>';

    var sortItemTypeList = ['零时迷子的碎片', '被遗弃的告白信', '学校天台的钥匙', 'TMA最新作压缩包', 'LOLI的钱包', '棒棒糖', '蕾米莉亚同人漫画', '十六夜同人漫画', '档案室钥匙', '傲娇LOLI娇蛮音CD', '整形优惠卷', '消逝之药'];
    content += '\n<strong>\u6709\u6548\u9053\u5177\u7EDF\u8BA1\uFF1A</strong><i>\u6709\u6548\u9053\u5177<span class="pd_stat_extra"><em>+' + validItemNum.toLocaleString() + '</em>' + ('(<em title="3\u7EA7\u4EE5\u4E0A\u6709\u6548\u9053\u5177">+' + highValidItemNum.toLocaleString() + '</em>)</i></span> ');
    var _iteratorNormalCompletion13 = true;
    var _didIteratorError13 = false;
    var _iteratorError13 = undefined;

    try {
        for (var _iterator13 = Util.getSortedObjectKeyList(sortItemTypeList, validItemStat)[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            var _itemName3 = _step13.value;

            content += '<i>' + _itemName3 + '<em>+' + validItemStat[_itemName3].toLocaleString() + '</em></i> ';
        }
    } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion13 && _iterator13.return) {
                _iterator13.return();
            }
        } finally {
            if (_didIteratorError13) {
                throw _iteratorError13;
            }
        }
    }

    content += '<br><strong>\u65E0\u6548\u9053\u5177\u7EDF\u8BA1\uFF1A</strong><i>\u65E0\u6548\u9053\u5177<span class="pd_stat_extra"><em>+' + invalidItemNum.toLocaleString() + '</em>' + ('(<em title="3\u7EA7\u4EE5\u4E0A\u65E0\u6548\u9053\u5177">+' + highInvalidItemNum.toLocaleString() + '</em>)</i></span> ');
    var _iteratorNormalCompletion14 = true;
    var _didIteratorError14 = false;
    var _iteratorError14 = undefined;

    try {
        for (var _iterator14 = Util.getSortedObjectKeyList(sortItemTypeList, invalidItemStat)[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            var _itemName4 = _step14.value;

            content += '<i>' + _itemName4 + '<em>+' + invalidItemStat[_itemName4].toLocaleString() + '</em></i> ';
        }
    } catch (err) {
        _didIteratorError14 = true;
        _iteratorError14 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion14 && _iterator14.return) {
                _iterator14.return();
            }
        } finally {
            if (_didIteratorError14) {
                throw _iteratorError14;
            }
        }
    }

    var buyItemStatContent = '';
    var buyItemStatKeyList = Util.getObjectKeyList(buyItemStat, 0);
    buyItemStatKeyList.sort(function (a, b) {
        return Item.getLevelByName(a) > Item.getLevelByName(b);
    });
    var _iteratorNormalCompletion15 = true;
    var _didIteratorError15 = false;
    var _iteratorError15 = undefined;

    try {
        for (var _iterator15 = buyItemStatKeyList[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
            var _key3 = _step15.value;

            var item = buyItemStat[_key3];
            buyItemStatContent += '<i class="pd_custom_tips" title="\u603B\u4EF7\uFF1A' + item['总计价格'].toLocaleString() + '\uFF0C' + ('\u5E73\u5747\u4EF7\u683C\u6BD4\u4F8B\uFF1A' + (item['道具数量'] > 0 ? Util.getFixedNumberLocaleString(item['总计价格比例'] / item['道具数量'], 2) : 0) + '%\uFF0C') + ('\u6700\u4F4E\u4EF7\u683C\u6BD4\u4F8B\uFF1A' + item['最低价格比例'] + '%\uFF0C\u6700\u9AD8\u4EF7\u683C\u6BD4\u4F8B\uFF1A' + item['最高价格比例'] + '%">' + _key3 + '<em>+' + item['道具数量'] + '</em></i> ');
        }
    } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion15 && _iterator15.return) {
                _iterator15.return();
            }
        } finally {
            if (_didIteratorError15) {
                throw _iteratorError15;
            }
        }
    }

    content += '<br><strong>\u8D2D\u4E70\u9053\u5177\u7EDF\u8BA1\uFF1A</strong><i>\u9053\u5177<em>+' + buyItemTotalNum + '</em></i> ' + ('<i>\u9053\u5177\u4EF7\u683C<span class="pd_stat_extra"><em title="\u9053\u5177\u603B\u4EF7">+' + buyItemTotalPrice.toLocaleString() + '</em>') + ('(<em title="\u5E73\u5747\u4EF7\u683C\u6BD4\u4F8B">' + (buyItemTotalNum > 0 ? Util.getFixedNumberLocaleString(totalBuyItemPricePercent / buyItemTotalNum, 2) : 0) + '%</em>|') + ('<em title="\u6700\u4F4E\u4EF7\u683C\u6BD4\u4F8B">' + minBuyItemPricePercent + '%</em>|<em title="\u6700\u9AD8\u4EF7\u683C\u6BD4\u4F8B">' + maxBuyItemPricePercent + '%</em>)</span></i> ' + buyItemStatContent);

    return content;
};

/**
 * 显示导入或导出日志对话框
 */
var showImportOrExportLogDialog = function showImportOrExportLogDialog() {
    if ($('#pd_im_or_ex_log').length > 0) return;
    (0, _Log.read)();
    var html = '\n<div class="pd_cfg_main">\n  <div style="margin-top: 5px;">\n    <label style="color: #f00;"><input type="radio" name="pd_im_or_ex_log_type" value="setting" checked> \u5BFC\u5165/\u5BFC\u51FA\u65E5\u5FD7</label>\n    <label style="color: #00f"><input type="radio" name="pd_im_or_ex_log_type" value="text"> \u5BFC\u51FA\u65E5\u5FD7\u6587\u672C</label>\n  </div>\n  <div id="pd_im_or_ex_log_setting">\n    <strong>\u5BFC\u5165\u65E5\u5FD7\uFF1A</strong>\u5C06\u65E5\u5FD7\u5185\u5BB9\u7C98\u8D34\u5230\u6587\u672C\u6846\u4E2D\u5E76\u70B9\u51FB\u5408\u5E76\u6216\u8986\u76D6\u6309\u94AE\u5373\u53EF<br>\n    <strong>\u5BFC\u51FA\u65E5\u5FD7\uFF1A</strong>\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u6587\u672C\u6587\u4EF6\u91CC\u5373\u53EF<br>\n    <textarea id="pd_log_setting" style="width: 600px; height: 400px; word-break: break-all;"></textarea>\n  </div>\n  <div id="pd_im_or_ex_log_text" style="display: none;">\n    <strong>\u5BFC\u51FA\u65E5\u5FD7\u6587\u672C</strong>\uFF1A\u590D\u5236\u6587\u672C\u6846\u91CC\u7684\u5185\u5BB9\u5E76\u7C98\u8D34\u5230\u6587\u672C\u6587\u4EF6\u91CC\u5373\u53EF\n    <div>\n      <label title="\u6309\u65F6\u95F4\u987A\u5E8F\u6392\u5E8F"><input type="radio" name="pd_log_sort_type_2" value="time" checked>\u6309\u65F6\u95F4</label>\n      <label title="\u6309\u65E5\u5FD7\u7C7B\u522B\u6392\u5E8F"><input type="radio" name="pd_log_sort_type_2" value="type">\u6309\u7C7B\u522B</label>\n      <label title="\u5728\u65E5\u5FD7\u6587\u672C\u91CC\u663E\u793A\u6BCF\u65E5\u4EE5\u53CA\u5168\u90E8\u6570\u636E\u7684\u7EDF\u8BA1\u7ED3\u679C"><input type="checkbox" id="pd_log_show_stat" checked>\u663E\u793A\u7EDF\u8BA1</label>\n    </div>\n    <textarea id="pd_log_text" style="width: 600px; height: 400px;" readonly></textarea>\n  </div>\n</div>\n<div class="pd_cfg_btns">\n  <button data-action="merge">\u5408\u5E76\u65E5\u5FD7</button><button data-action="overwrite" style="color: #f00;">\u8986\u76D6\u65E5\u5FD7</button><button>\u5173\u95ED</button>\n</div>';

    var $dialog = Dialog.create('pd_im_or_ex_log', '导入或导出日志', html);
    $dialog.find('[name="pd_log_sort_type_2"], #pd_log_show_stat').click(function () {
        showLogText();
        $('#pd_log_text').select();
    }).end().find('[name="pd_im_or_ex_log_type"]').click(function () {
        var type = $(this).val();
        $('#pd_im_or_ex_log_' + (type === 'text' ? 'setting' : 'text')).hide();
        $('#pd_im_or_ex_log_' + (type === 'text' ? 'text' : 'setting')).show();
        $('#pd_log_' + (type === 'text' ? 'text' : 'setting')).select();
    }).end().find('.pd_cfg_btns > button').click(function (e) {
        e.preventDefault();
        var action = $(this).data('action');
        if (action === 'merge' || action === 'overwrite') {
            if (!confirm('\u662F\u5426\u5C06\u6587\u672C\u6846\u4E2D\u7684\u65E5\u5FD7' + (action === 'overwrite' ? '覆盖' : '合并') + '\u5230\u672C\u5730\u65E5\u5FD7\uFF1F')) return;
            var log = $.trim($('#pd_log_setting').val());
            if (!log) return;
            try {
                log = JSON.parse(log);
            } catch (ex) {
                alert('日志有错误');
                return;
            }
            if (!log || $.type(log) !== 'object') {
                alert('日志有错误');
                return;
            }
            if (action === 'merge') log = (0, _Log.getMergeLog)(Log, log);
            _Info2.default.w.Log = log;
            (0, _Log.write)();
            alert('日志已导入');
            location.reload();
        } else {
            return Dialog.close('pd_im_or_ex_log');
        }
    });
    Dialog.show('pd_im_or_ex_log');
    $('#pd_log_setting').val(JSON.stringify(Log)).select();
    $('input[name="pd_log_sort_type_2"][value="' + Config.logSortType + '"]').prop('checked', true).triggerHandler('click');
    (0, _Func.run)('LogDialog.showImportOrExportLogDialog_after_');
};

/**
 * 显示日志文本
 */
var showLogText = function showLogText() {
    var logSortType = $('input[name="pd_log_sort_type_2"]:checked').val();
    var isShowStat = $('#pd_log_show_stat').prop('checked');
    var content = '',
        lastDate = '';
    var _iteratorNormalCompletion16 = true;
    var _didIteratorError16 = false;
    var _iteratorError16 = undefined;

    try {
        for (var _iterator16 = Object.keys(Log)[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            var date = _step16.value;

            if (!Array.isArray(Log[date])) continue;
            if (lastDate > date) lastDate = date;
            content += '\u3010' + date + '\u3011(\u5171' + Log[date].length + '\u9879)\n' + (logSortType === 'type' ? '' : '\n') + getLogContent(date, logSortType).replace(/<h3>/g, '\n').replace(/<\/h3>/g, '\n').replace(/<\/p>/g, '\n').replace(/(<.+?>|<\/.+?>)/g, '').replace(/`/g, '');
            if (isShowStat) {
                content += '-'.repeat(46) + '\n\u5408\u8BA1\uFF1A\n' + getLogStat(date, 'cur').replace(/<br\s*\/?>/g, '\n').replace(/(<.+?>|<\/.+?>)/g, '') + '\n';
            }
            content += '='.repeat(46) + '\n';
        }
    } catch (err) {
        _didIteratorError16 = true;
        _iteratorError16 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion16 && _iterator16.return) {
                _iterator16.return();
            }
        } finally {
            if (_didIteratorError16) {
                throw _iteratorError16;
            }
        }
    }

    if (content && isShowStat) {
        content += '\n总计：\n' + getLogStat(lastDate, 'all').replace(/<br\s*\/?>/g, '\n').replace(/(<.+?>|<\/.+?>)/g, '');
    }
    $('#pd_log_text').val(content);
};

},{"./Config":4,"./Dialog":7,"./Func":8,"./Info":10,"./Item":11,"./Log":12,"./Util":21}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addUserLinkInPkListPage = exports.enhanceLootIndexPage = undefined;

var _Item = require('./Item');

var Item = _interopRequireWildcard(_Item);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * 增强争夺首页
 */
var enhanceLootIndexPage = exports.enhanceLootIndexPage = function enhanceLootIndexPage() {
    var $area = $('.kf_fw_ig1');
    var $properties = $area.find('> tbody > tr:nth-child(3) > td:first-child');
    var $points = $properties.next('td');
    var propertyList = getCurrentLootPropertyList();
    var itemUsedNumList = Item.getItemUsedInfo($area.find('> tbody > tr:nth-child(4) > td').html());

    $properties.html($properties.html().replace('技能伤害：攻击伤害+(体质点数*4)', '技能伤害：<span class="pd_custom_tips" id="pd_skill_attack" title="攻击伤害+(体质点数*4)"></span>'));
    $properties.find('br').each(function (index) {
        var name = '';
        switch (index) {
            case 1:
                name = 's1';
                break;
            case 2:
                name = 's2';
                break;
            case 3:
                name = 'd1';
                break;
            case 4:
                name = 'd2';
                break;
            case 6:
                name = 'i1';
                break;
            case 7:
                name = 'i2';
                break;
        }
        if (name) {
            $(this).before(' <span style="color:#777" id="pd_new_' + name + '"></span>');
        }
    });

    $points.find('[type="text"]').attr('type', 'number').attr('min', 1).attr('max', 999).prop('required', true).css('width', '60px');
    $points.find('input[readonly]').attr('min', 0).prop('disabled', true).removeProp('required', true);
    $points.prepend('<span class="pd_highlight">剩余属性点：<span id="pd_surplus_point"></span></span><br>');

    $points.on('change', '[type="number"]', function () {
        var $this = $(this);
        $('#pd_surplus_point').text(propertyList['可分配属性点'] - getCurrentAssignedPoint());
        showNewLootProperty($this, propertyList, itemUsedNumList);
        showSumOfPoint($this);

        var skillAttack = 0;
        var matches = /\d+/.exec($area.find('[name="s1"]').next('span').next('.pd_point_sum').text());
        if (matches) skillAttack = parseInt(matches[0]) * 5;
        skillAttack += parseInt($area.find('[name="s2"]').val()) * 4;
        $('#pd_skill_attack').text(skillAttack);
    }).on('click', '.pd_point_sum', function () {
        var surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint();
        if (!surplusPoint) return;
        var $point = $(this).prev('span').prev('[type="number"]');
        var num = parseInt($point.val());
        if (isNaN(num) || num < 0) num = 0;
        $point.val(num + surplusPoint).trigger('change');
    }).find('form').submit(function () {
        var surplusPoint = propertyList['可分配属性点'] - getCurrentAssignedPoint();
        if (surplusPoint < 0) {
            alert('剩余属性点为负，请重新填写');
            return false;
        } else if (surplusPoint > 0) {
            return confirm('你的可分配属性点尚未用完，是否提交？');
        }
    }).find('[type="number"]').trigger('change');

    enhanceLootLog();
};

/**
 * 获取当前已分配的属性点
 * @returns {number} 当前已分配的属性点
 */
var getCurrentAssignedPoint = function getCurrentAssignedPoint() {
    var usedPoint = 0;
    $('.kf_fw_ig1').find('[type="number"]').each(function () {
        var point = parseInt($(this).val());
        if (point && point > 0) usedPoint += point;
    });
    return usedPoint;
};

/**
 * 显示各项属性点的和值
 */
var showSumOfPoint = function showSumOfPoint($point) {
    var num = parseInt($point.val());
    if (isNaN(num) || num < 0) num = 0;
    var extraNum = parseInt($point.next('span').text());
    var $sum = $point.next('span').next('.pd_point_sum');
    if (!$sum.length) {
        $sum = $('<span class="pd_point_sum" style="color: #ff0033; cursor: pointer;" title="点击：给该项加上或减去剩余属性点"></span>').insertAfter($point.next('span'));
    }
    $sum.text('=' + (num + extraNum));
};

/**
 * 获取当前的争夺属性
 * @returns {{}} 争夺属性
 */
var getCurrentLootPropertyList = function getCurrentLootPropertyList() {
    var propertyList = {
        '攻击力': 0,
        '最大生命值': 0,
        '攻击速度': 0,
        '暴击几率': 0,
        '技能释放概率': 0,
        '防御': 0,
        '可分配属性点': 0
    };
    var html = $('.kf_fw_ig1 > tbody > tr:nth-child(3) > td:first-child').html();
    var matches = /攻击力：(\d+)/.exec(html);
    if (matches) propertyList['攻击力'] = parseInt(matches[1]);
    matches = /生命值：\d+\s*\(最大(\d+)\)/.exec(html);
    if (matches) propertyList['最大生命值'] = parseInt(matches[1]);
    matches = /攻击速度：(\d+)/.exec(html);
    if (matches) propertyList['攻击速度'] = parseInt(matches[1]);
    matches = /暴击几率：(\d+)%/.exec(html);
    if (matches) propertyList['暴击几率'] = parseInt(matches[1]);
    matches = /技能释放概率：(\d+)%/.exec(html);
    if (matches) propertyList['技能释放概率'] = parseInt(matches[1]);
    matches = /防御：(\d+)%/.exec(html);
    if (matches) propertyList['防御'] = parseInt(matches[1]);
    matches = /可分配属性点：(\d+)/.exec(html);
    if (matches) propertyList['可分配属性点'] = parseInt(matches[1]);
    return propertyList;
};

/**
 * 显示新的争夺属性
 * @param {jQuery} $point 属性字段
 * @param {{}} currentLootProperty 当前的争夺属性
 * @param {{}} itemUsedNumList 道具使用情况对象
 */
var showNewLootProperty = function showNewLootProperty($point, currentLootProperty, itemUsedNumList) {
    var name = $point.attr('name');
    var num = parseInt($point.val());
    if (isNaN(num) || num < 0) num = 0;
    var oriNum = parseInt($point.get(0).defaultValue);
    var extraNum = parseInt($point.next('span').text());
    var newValue = 0,
        diffValue = 0,
        unit = '';
    switch (name) {
        case 's1':
            newValue = (num + extraNum) * 5;
            diffValue = newValue - currentLootProperty['攻击力'];
            break;
        case 's2':
            newValue = (num + extraNum) * 20 + (itemUsedNumList['蕾米莉亚同人漫画'] === 50 ? 700 : 0);
            diffValue = newValue - currentLootProperty['最大生命值'];
            break;
        case 'd1':
            newValue = (num + extraNum) * 2 + (itemUsedNumList['十六夜同人漫画'] === 50 ? 100 : 0);
            diffValue = newValue - currentLootProperty['攻击速度'];
            break;
        case 'd2':
            newValue = num + extraNum;
            newValue = Math.round(newValue / (newValue + 100) * 100);
            diffValue = newValue - currentLootProperty['暴击几率'];
            unit = '%';
            break;
        case 'i1':
            newValue = num + extraNum;
            newValue = Math.round(newValue / (newValue + 120) * 100);
            diffValue = newValue - currentLootProperty['技能释放概率'];
            unit = '%';
            break;
        case 'i2':
            newValue = num + extraNum;
            newValue = Math.round(newValue / (newValue + 150) * 100);
            diffValue = newValue - currentLootProperty['防御'];
            unit = '%';
            break;
    }
    if (num !== oriNum) {
        $('#pd_new_' + name).html(' (<span style="color:#00F">' + newValue + unit + '</span>|<span style="color:' + (diffValue >= 0 ? '#ff0033' : '#339933') + '">' + ((diffValue >= 0 ? '+' : '') + diffValue + '</span>)'));
    } else {
        $('#pd_new_' + name).html('');
    }
};

/**
 * 增强争夺记录
 */
var enhanceLootLog = function enhanceLootLog() {
    var $log = $('.kf_fw_ig1 > tbody > tr:nth-child(5) > td');
    var matches = $log.html().match(/获得\d+经验和\d+KFB/g);
    var exp = 0,
        kfb = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var match = _step.value;

            var logMatches = /获得(\d+)经验和(\d+)KFB/.exec(match);
            exp += parseInt(logMatches[1]);
            kfb += parseInt(logMatches[2]);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (exp || kfb) {
        $log.prepend('<b class="pd_stat">\u4F60\u603B\u5171\u83B7\u5F97\u4E86<em>' + exp.toLocaleString() + '</em>\u7ECF\u9A8C\u548C<em>' + kfb.toLocaleString() + '</em>KFB</b><br>');
    }
};

/**
 * 在争夺排行页面添加用户链接
 */
var addUserLinkInPkListPage = exports.addUserLinkInPkListPage = function addUserLinkInPkListPage() {
    $('.kf_fw_ig1 > tbody > tr:gt(1) > td:nth-child(2)').each(function () {
        var $this = $(this);
        var userName = $this.text().trim();
        $this.html('<a href="profile.php?action=show&username=' + userName + '" target="_blank">' + userName + '</a>');
    });
};

},{"./Item":11}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.destroy = exports.remove = exports.wait = exports.show = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 显示消息
 * @param {string} msg 消息
 * @param {number} duration 消息持续时间（秒），-1为永久显示
 * @param {boolean} clickable 消息框可否手动点击消除
 * @param {boolean} preventable 是否阻止点击网页上的其它元素
 * @example
 * show('<strong>抽取道具或卡片</strong><i>道具<em>+1</em></i>', -1);
 * show({msg: '<strong>抽取神秘盒子</strong><i>KFB<em>+8</em></i>', duration: 20, clickable: false});
 * @returns {jQuery} 消息框对象
 */
var show = exports.show = function show() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$msg = _ref.msg,
        msg = _ref$msg === undefined ? '' : _ref$msg,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? Config.defShowMsgDuration : _ref$duration,
        _ref$clickable = _ref.clickable,
        clickable = _ref$clickable === undefined ? true : _ref$clickable,
        _ref$preventable = _ref.preventable,
        preventable = _ref$preventable === undefined ? false : _ref$preventable;

    if (arguments.length > 0) {
        if (typeof arguments[0] === 'string') msg = arguments[0];
        if (typeof arguments[1] === 'number') duration = arguments[1];
    }

    if ($('.pd_msg').length > 20) destroy();
    var $container = $('.pd_msg_container');
    var isFirst = $container.length === 0;
    if (!isFirst && !$('.pd_mask').length) {
        var $lastTips = $('.pd_msg:last');
        if ($lastTips.length > 0) {
            var top = $lastTips.offset().top;
            var winScrollTop = $(window).scrollTop();
            if (top < winScrollTop || top >= winScrollTop + $(window).height() - $lastTips.outerHeight() - 10) {
                destroy();
                isFirst = true;
            }
        }
    }
    if (preventable && !$('.pd_mask').length) {
        $('<div class="pd_mask"></div>').appendTo('body');
    }
    if (isFirst) {
        $container = $('<div class="pd_msg_container"></div>').appendTo('body');
    }
    var $msg = $('<div class="pd_msg">' + msg + '</div>').appendTo($container);
    $msg.on('click', 'a.pd_stop_action', function (e) {
        e.preventDefault();
        $(this).html('正在停止&hellip;').closest('.pd_msg').data('stop', true);
    });
    if (clickable) {
        $msg.css('cursor', 'pointer').click(function () {
            $(this).stop(true, true).fadeOut('slow', function () {
                remove($(this));
            });
        }).find('a').click(function (e) {
            e.stopPropagation();
        });
    }
    var windowWidth = $(window).width(),
        windowHeight = $(window).height();
    var popTipsWidth = $msg.outerWidth(),
        popTipsHeight = $msg.outerHeight();
    if (_Info2.default.isMobile && windowHeight > 1000) windowHeight /= 2;
    var scrollTop = $(window).scrollTop();
    if (scrollTop < windowHeight / 2) scrollTop = 0;
    var left = windowWidth / 2 + (_Info2.default.isMobile ? $(window).scrollLeft() / 3 : 0) - popTipsWidth / 2;
    if (left + popTipsWidth > windowWidth) left = windowWidth - popTipsWidth - 20;
    if (left < 0) left = 0;
    if (isFirst) {
        $container.css('top', windowHeight / 2 + (_Info2.default.isMobile ? scrollTop : 0) - popTipsHeight / 2);
    } else {
        $container.stop(false, true).animate({ 'top': '-=' + popTipsHeight / 1.75 });
    }
    var $prev = $msg.prev('.pd_msg');
    $msg.css({
        'top': $prev.length > 0 ? parseInt($prev.css('top')) + $prev.outerHeight() + 5 : 0,
        left: left
    }).fadeIn('slow');
    if (duration !== -1) {
        $msg.delay(duration * 1000).fadeOut('slow', function () {
            remove($(this));
        });
    }
    return $msg;
};

/**
 * 显示等待消息
 * @param {string} msg 等待消息
 * @param {boolean} preventable 是否阻止点击网页上的其它元素
 * @returns {jQuery} 消息框对象
 */
var wait = exports.wait = function wait(msg) {
    var preventable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    return show({ msg: msg, duration: -1, clickable: false, preventable: preventable });
};

/**
 * 移除指定消息框
 * @param {jQuery} $msg 消息框对象
 */
var remove = exports.remove = function remove($msg) {
    var $parent = $msg.parent();
    $msg.remove();
    if (!$('.pd_msg').length) {
        $parent.remove();
        $('.pd_mask').remove();
    } else if (!$('#pd_remaining_num').length) {
        $('.pd_mask').remove();
    }
};

/**
 * 销毁所有消息框
 */
var destroy = exports.destroy = function destroy() {
    $('.pd_msg_container').remove();
    $('.pd_mask').remove();
};

},{"./Info":10}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modifyFaq = exports.addUserNameLinkInRankPage = exports.showSelfRatingErrorSizeSubmitWarning = exports.highlightRatingErrorSize = exports.syncModifyPerPageFloorNum = exports.addAutoChangeIdColorButton = exports.addMsgSelectButton = exports.modifyMyPostLink = exports.addFollowAndBlockAndMemoUserLink = exports.addFastDrawMoneyLink = exports.highlightUnReadAtTipsMsg = exports.addFastGotoThreadPageLink = exports.highlightNewPost = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Config = require('./Config');

var _ConfigDialog = require('./ConfigDialog');

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

var _Bank = require('./Bank');

var Bank = _interopRequireWildcard(_Bank);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 高亮今日新发表帖子的发表时间
 */
var highlightNewPost = exports.highlightNewPost = function highlightNewPost() {
    $('.thread1 > tbody > tr > td:last-child').has('a.bl').each(function () {
        var html = $(this).html();
        if (/\|\s*\d{2}:\d{2}<br>\n.*\d{2}:\d{2}/.test(html)) {
            html = html.replace(/(\d{2}:\d{2})<br>/, '<span class="pd_highlight">$1</span><br>');
            $(this).html(html);
        }
    });
};

/**
 * 在版块页面中添加帖子页数快捷链接
 */
var addFastGotoThreadPageLink = exports.addFastGotoThreadPageLink = function addFastGotoThreadPageLink() {
    $('.threadtit1 > a[href^="read.php"]').each(function () {
        var $link = $(this);
        var floorNum = $link.closest('td').next().find('ul > li > a').contents().eq(0).text();
        if (!floorNum || floorNum < Config.perPageFloorNum) return;
        var url = $link.attr('href');
        var totalPageNum = Math.floor(floorNum / Config.perPageFloorNum) + 1;
        var html = '';
        for (var i = 1; i < totalPageNum; i++) {
            if (i > Config.maxFastGotoThreadPageNum) {
                if (i + 1 <= totalPageNum) {
                    html += '..<a href="' + url + '&page=' + totalPageNum + '">' + totalPageNum + '</a>';
                }
                break;
            }
            html += '<a href="' + url + '&page=' + (i + 1) + '">' + (i + 1) + '</a>';
        }
        html = '<span class="pd_thread_page">&hellip;' + html + '</span>';
        $link.after(html).parent().css('white-space', 'normal');
    });
};

/**
 * 高亮at提醒页面中未读的消息
 */
var highlightUnReadAtTipsMsg = exports.highlightUnReadAtTipsMsg = function highlightUnReadAtTipsMsg() {
    if ($('.kf_share1:first').text().trim() !== '\u542B\u6709\u5173\u952E\u8BCD \u201C' + _Info2.default.userName + '\u201D \u7684\u5185\u5BB9') return;
    var timeString = Util.getCookie(_Const2.default.prevReadAtTipsCookieName);
    if (!timeString || !/^\d+日\d+时\d+分$/.test(timeString)) return;
    var prevString = '';
    $('.kf_share1:eq(1) > tbody > tr:gt(0) > td:first-child').each(function (index) {
        var $this = $(this);
        var curString = $this.text().trim();
        if (index === 0) prevString = curString;
        if (timeString < curString && prevString >= curString) {
            $this.addClass('pd_highlight');
            prevString = curString;
        } else return false;
    });
    $('.kf_share1').on('click', 'td > a', function () {
        Util.deleteCookie(_Const2.default.prevReadAtTipsCookieName);
    });
};

/**
 * 在短消息页面中添加快速取款的链接
 */
var addFastDrawMoneyLink = exports.addFastDrawMoneyLink = function addFastDrawMoneyLink() {
    if (!$('td:contains("SYSTEM")').length || !$('td:contains("收到了他人转账的KFB")').length) return;
    var $msg = $('.thread2 > tbody > tr:eq(-2) > td:last');
    var html = $msg.html();
    var matches = /给你转帐(\d+)KFB/i.exec(html);
    if (matches) {
        (function () {
            var money = parseInt(matches[1]);
            $msg.html(html.replace(/会员\[(.+?)\]通过论坛银行/, '会员[<a target="_blank" href="profile.php?action=show&username=$1">$1</a>]通过论坛银行').replace(matches[0], '\u7ED9\u4F60\u8F6C\u5E10<span class="pd_stat"><em>' + money.toLocaleString() + '</em></span>KFB'));

            $('<br><a title="从活期存款中取出当前转账的金额" href="#">快速取款</a> | <a title="取出银行账户中的所有活期存款" href="#">取出所有存款</a>').appendTo($msg).filter('a:eq(0)').click(function (e) {
                e.preventDefault();
                Msg.destroy();
                Bank.drawCurrentDeposit(money);
            }).end().filter('a:eq(1)').click(function (e) {
                e.preventDefault();
                Msg.destroy();
                Msg.wait('<strong>正在获取当前活期存款金额&hellip;</strong>');
                $.get('hack.php?H_name=bank&t=' + new Date().getTime(), function (html) {
                    Msg.destroy();
                    var matches = /活期存款：(\d+)KFB<br/.exec(html);
                    if (!matches) {
                        alert('获取当前活期存款金额失败');
                        return;
                    }
                    var money = parseInt(matches[1]);
                    if (money <= 0) {
                        Msg.show('当前活期存款余额为零', -1);
                        return;
                    }
                    Bank.drawCurrentDeposit(money);
                });
            });

            $('a[href^="message.php?action=write&remid="]').attr('href', '#').addClass('pd_disabled_link').click(function (e) {
                e.preventDefault();
                alert('本短消息由系统发送，请勿直接回复；如需回复，请点击给你转账的用户链接，向其发送短消息');
            });
        })();
    }
};

/**
 * 添加关注和屏蔽用户以及用户备注的链接
 */
var addFollowAndBlockAndMemoUserLink = exports.addFollowAndBlockAndMemoUserLink = function addFollowAndBlockAndMemoUserLink() {
    var matches = /(.+?)\s*详细信息/.exec($('td:contains("详细信息")').text());
    if (!matches) return;
    var userName = $.trim(matches[1]);
    $('<span>[<a href="#">关注用户</a>] [<a href="#">屏蔽用户</a>]</span><br><span>[<a href="#">添加备注</a>]</span><br>').appendTo($('a[href^="message.php?action=write&touid="]').parent()).find('a').each(function () {
        var $this = $(this);
        if ($this.is('a:contains("备注")')) {
            var memo = '';
            for (var name in Config.userMemoList) {
                if (name === userName) {
                    memo = Config.userMemoList[name];
                    break;
                }
            }
            if (memo !== '') {
                $this.text('修改备注').data('memo', memo);
                var $info = $('.log1 > tbody > tr:last-child > td:last-child');
                $info.html('\u5907\u6CE8\uFF1A' + memo + '<br>' + $info.html());
            }
        } else {
            var str = '关注';
            var userList = Config.followUserList;
            if ($this.text().indexOf('屏蔽') > -1) {
                str = '屏蔽';
                userList = Config.blockUserList;
            }
            if (Util.inFollowOrBlockUserList(userName, userList) > -1) {
                $this.addClass('pd_highlight').text('解除' + str);
            }
        }
    }).click(function (e) {
        e.preventDefault();
        (0, _Config.read)();
        var $this = $(this);
        if ($this.is('a:contains("备注")')) {
            var memo = $this.data('memo');
            if (!memo) memo = '';
            var value = prompt('为此用户添加备注（要删除备注请留空）：', memo);
            if (value === null) return;
            if (!Config.userMemoEnabled) Config.userMemoEnabled = true;
            value = $.trim(value);
            if (value) {
                Config.userMemoList[userName] = value;
                $this.text('修改备注');
            } else {
                delete Config.userMemoList[userName];
                $this.text('添加备注');
            }
            $this.data('memo', value);
            (0, _Config.write)();
        } else {
            var str = '关注';
            var userList = Config.followUserList;
            if ($this.text().includes('屏蔽')) {
                str = '屏蔽';
                userList = Config.blockUserList;
                if (!Config.blockUserEnabled) Config.blockUserEnabled = true;
            } else {
                if (!Config.followUserEnabled) Config.followUserEnabled = true;
            }
            if ($this.text() === '解除' + str) {
                var index = Util.inFollowOrBlockUserList(userName, userList);
                if (index > -1) {
                    userList.splice(index, 1);
                    (0, _Config.write)();
                }
                $this.removeClass('pd_highlight').text(str + '用户');
                alert('该用户已被解除' + str);
            } else {
                if (Util.inFollowOrBlockUserList(userName, userList) === -1) {
                    if (str === '屏蔽') {
                        var type = Config.blockUserDefaultType;
                        type = prompt('请填写屏蔽类型，0：屏蔽主题和回帖；1：仅屏蔽主题；2：仅屏蔽回帖', type);
                        if (type === null) return;
                        type = parseInt(type);
                        if (isNaN(type) || type < 0 || type > 2) type = Config.blockUserDefaultType;
                        userList.push({ name: userName, type: type });
                    } else {
                        userList.push({ name: userName });
                    }
                    (0, _Config.write)();
                }
                $this.addClass('pd_highlight').text('解除' + str);
                alert('该用户已被' + str);
            }
        }
    });
};

/**
 * 修改我的回复页面里的帖子链接
 */
var modifyMyPostLink = exports.modifyMyPostLink = function modifyMyPostLink() {
    $('.t a[href^="read.php?tid="]').each(function () {
        var $this = $(this);
        $this.attr('href', $this.attr('href').replace(/&uid=\d+#(\d+)/, '&spid=$1'));
    });
};

/**
 * 在短消息页面添加选择指定短消息的按钮
 */
var addMsgSelectButton = exports.addMsgSelectButton = function addMsgSelectButton() {
    $('<input value="自定义" type="button" style="margin-right: 3px;">').insertBefore('input[type="button"][value="全选"]').click(function (e) {
        e.preventDefault();
        var value = $.trim(prompt('请填写所要选择的包含指定字符串的短消息标题（可用|符号分隔多个标题）', '收到了他人转账的KFB|银行汇款通知|您的文章被评分|您的文章被删除'));
        if (value !== '') {
            (function () {
                var titleArr = value.split('|');
                $('.thread1 > tbody > tr > td:nth-child(2) > a').each(function () {
                    var $this = $(this);
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = titleArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var title = _step.value;

                            if ($this.text().toLowerCase().includes(title.toLowerCase())) {
                                $this.closest('tr').find('td:last-child > input[type="checkbox"]').prop('checked', true);
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                });
            })();
        }
    }).parent().attr('colspan', 4).prev('td').attr('colspan', 3);
    $('<input value="反选" type="button" style="margin-left: 5px; margin-right: 1px;">').insertAfter('input[type="button"][value="全选"]').click(function (e) {
        e.preventDefault();
        $('.thread1 > tbody > tr > td:last-child > input[type="checkbox"]').each(function () {
            var $this = $(this);
            $this.prop('checked', !$this.prop('checked'));
        });
    });
};

/**
 * 添加自动更换ID颜色的按钮
 */
var addAutoChangeIdColorButton = exports.addAutoChangeIdColorButton = function addAutoChangeIdColorButton() {
    var $autoChangeIdColor = $('table div > table > tbody > tr > td:contains("自定义ID颜色")');
    $('<span class="pd_highlight">低等级没人权？没有自己喜欢的颜色？快来试试助手的<a href="#">自定义本人神秘颜色</a>的功能吧！（虽然仅限自己可见 ╮(╯▽╰)╭）</span><br>').appendTo($autoChangeIdColor).find('a').click(function (e) {
        e.preventDefault();
        (0, _ConfigDialog.show)();
    });

    var $idColors = $autoChangeIdColor.parent('tr').nextAll('tr').not('tr:last');
    if ($idColors.find('a').length <= 1) return;
    $('<form><div id="pd_auto_change_sm_color_btns" style="margin-top: 5px;">\n<label><input id="pd_cfg_auto_change_sm_color_enabled" class="pd_input" type="checkbox"> \u81EA\u52A8\u66F4\u6362ID\u989C\u8272</label></div></form>').appendTo($autoChangeIdColor).find('#pd_cfg_auto_change_sm_color_enabled').click(function () {
        var $this = $(this);
        var enabled = $this.prop('checked');
        if (enabled !== Config.autoChangeSMColorEnabled) {
            (0, _Config.read)();
            Config.autoChangeSMColorEnabled = enabled;
            (0, _Config.write)();
        }

        if (enabled) {
            $idColors.addClass('pd_sm_color_select').find('td:not(:has(a))').css('cursor', 'not-allowed');
            $('\n<label>\u66F4\u6362\u987A\u5E8F\n  <select id="pd_cfg_auto_change_sm_color_type" style="font-size: 12px;">\n    <option value="random">\u968F\u673A</option>\n    <option value="sequence">\u987A\u5E8F</option>\n  </select>\n</label>\n<label>\u6BCF\u9694 <input id="pd_cfg_auto_change_sm_color_interval" class="pd_input" style="width: 25px;" type="text" maxlength="5"> \u5C0F\u65F6</label>\n<button>\u4FDD\u5B58</button><button style="margin-left: 3px;">\u91CD\u7F6E</button><br>\n<a href="#">\u5168\u9009</a><a style="margin-left: 7px; margin-right: 10px;" href="#">\u53CD\u9009</a>\n<label><input id="pd_cfg_change_all_available_sm_color_enabled" class="pd_input" type="checkbox"> \u9009\u62E9\u5F53\u524D\u6240\u6709\u53EF\u7528\u7684ID\u989C\u8272</label>\n').insertAfter($this.parent()).filter('button:first').click(function (e) {
                e.preventDefault();
                var $autoChangeSMColorInterval = $('#pd_cfg_auto_change_sm_color_interval');
                var interval = parseInt($autoChangeSMColorInterval.val());
                if (isNaN(interval) || interval <= 0) {
                    alert('ID颜色更换时间间隔格式不正确');
                    $autoChangeSMColorInterval.select();
                    $autoChangeSMColorInterval.focus();
                    return;
                }
                var changeAllAvailableSMColorEnabled = $('#pd_cfg_change_all_available_sm_color_enabled').prop('checked');
                var customChangeSMColorList = [];
                $idColors.find('input[type="checkbox"]:checked').each(function () {
                    customChangeSMColorList.push(parseInt($(this).val()));
                });
                if (!changeAllAvailableSMColorEnabled && customChangeSMColorList.length <= 1) {
                    alert('必须选择2种或以上的ID颜色');
                    return;
                }
                if (customChangeSMColorList.length <= 1) customChangeSMColorList = [];

                var oriInterval = Config.autoChangeSMColorInterval;
                (0, _Config.read)();
                Config.autoChangeSMColorType = $('#pd_cfg_auto_change_sm_color_type').val().toLowerCase();
                Config.autoChangeSMColorInterval = interval;
                Config.changeAllAvailableSMColorEnabled = changeAllAvailableSMColorEnabled;
                Config.customAutoChangeSMColorList = customChangeSMColorList;
                (0, _Config.write)();
                if (oriInterval !== Config.autoChangeSMColorInterval) Util.deleteCookie(_Const2.default.autoChangeSMColorCookieName);
                alert('设置保存成功');
            }).end().filter('button:eq(1)').click(function (e) {
                e.preventDefault();
                (0, _Config.read)();
                Config.autoChangeSMColorEnabled = _Config.Config.autoChangeSMColorEnabled;
                Config.autoChangeSMColorType = _Config.Config.autoChangeSMColorType;
                Config.autoChangeSMColorInterval = _Config.Config.autoChangeSMColorInterval;
                Config.changeAllAvailableSMColorEnabled = _Config.Config.changeAllAvailableSMColorEnabled;
                Config.customAutoChangeSMColorList = _Config.Config.customAutoChangeSMColorList;
                (0, _Config.write)();
                Util.deleteCookie(_Const2.default.autoChangeSMColorCookieName);
                TmpLog.deleteValue(_Const2.default.prevAutoChangeSMColorIdTmpLogName);
                alert('设置已重置');
                location.reload();
            }).end().filter('a').click(function (e) {
                e.preventDefault();
                if ($idColors.find('input[disabled]').length > 0) {
                    alert('请先取消勾选“选择当前所有可用的ID颜色”复选框');
                    $('#pd_cfg_change_all_available_sm_color_enabled').focus();
                    return;
                }
                if ($(this).is('#pd_auto_change_sm_color_btns > a:first')) {
                    $idColors.find('input[type="checkbox"]').prop('checked', true);
                } else {
                    $idColors.find('input[type="checkbox"]').each(function () {
                        $(this).prop('checked', !$(this).prop('checked'));
                    });
                }
            });

            $idColors.find('td:has(a)').each(function () {
                var $this = $(this);
                var matches = /&color=(\d+)/i.exec($this.find('a').attr('href'));
                if (matches) $this.append('<input type="checkbox" class="pd_input" value="' + matches[1] + '">');
            });

            $('#pd_cfg_auto_change_sm_color_type').val(Config.autoChangeSMColorType);
            $('#pd_cfg_auto_change_sm_color_interval').val(Config.autoChangeSMColorInterval);
            $('#pd_cfg_change_all_available_sm_color_enabled').click(function () {
                $idColors.find('input').prop('disabled', $(this).prop('checked'));
            }).prop('checked', Config.changeAllAvailableSMColorEnabled).triggerHandler('click');
            for (var i in Config.customAutoChangeSMColorList) {
                $idColors.find('input[value="' + Config.customAutoChangeSMColorList[i] + '"]').prop('checked', true);
            }
        } else {
            $this.parent().nextAll().remove();
            $idColors.removeClass('pd_sm_color_select').find('input').remove();
        }
    });

    $idColors.on('click', 'td', function (e) {
        if (!$(e.target).is('a')) {
            var $this = $(this);
            if ($this.find('input[disabled]').length > 0) {
                alert('请先取消勾选“选择当前所有可用的ID颜色”复选框');
                $('#pd_cfg_change_all_available_sm_color_enabled').focus();
            } else if (!$(e.target).is('input')) {
                $this.find('input').click();
            }
        }
    });

    if (Config.autoChangeSMColorEnabled) {
        $('#pd_cfg_auto_change_sm_color_enabled').prop('checked', true).triggerHandler('click');
    }

    $('div[style="float: right; color: #8080c0;"]:contains("每天捐款附送100经验值")').html('每天捐款附送50经验值');
    $('div[style="border-bottom: #8000ff 1px dashed;"] > div:contains("帖子被奖励KFB")').html('帖子被奖励KFB(被协管评分)');
};

/**
 * 同步修改帖子每页楼层数量
 */
var syncModifyPerPageFloorNum = exports.syncModifyPerPageFloorNum = function syncModifyPerPageFloorNum() {
    var syncConfig = function syncConfig() {
        var perPageFloorNum = parseInt($('select[name="p_num"]').val());
        if (isNaN(perPageFloorNum)) return;
        if (!perPageFloorNum) perPageFloorNum = 10;
        if (perPageFloorNum !== Config.perPageFloorNum) {
            Config.perPageFloorNum = perPageFloorNum;
            (0, _Config.write)();
        }
    };
    $('form#creator').submit(function () {
        (0, _Config.read)();
        syncConfig();
    });
    syncConfig();
};

/**
 * 高亮自助评分错标文件大小
 */
var highlightRatingErrorSize = exports.highlightRatingErrorSize = function highlightRatingErrorSize() {
    $('.adp1 a[href^="read.php?tid="]').each(function () {
        var $this = $(this);
        var title = $this.text();
        var ratingSize = 0;
        var $ratingCell = $this.parent('td').next('td');
        var matches = /认定\[(\d+)\]/i.exec($ratingCell.text());
        if (matches) {
            ratingSize = parseInt(matches[1]);
        }

        var _Public$checkRatingSi = Public.checkRatingSize(title, ratingSize),
            type = _Public$checkRatingSi.type,
            titleSize = _Public$checkRatingSi.titleSize;

        if (type === -1) {
            $ratingCell.css('color', '#ff9933').attr('title', '标题文件大小无法解析').addClass('pd_custom_tips');
        } else if (type === 1) {
            $ratingCell.addClass('pd_highlight pd_custom_tips').attr('title', '\u6807\u9898\u6587\u4EF6\u5927\u5C0F(' + titleSize.toLocaleString() + 'M)\u4E0E\u8BA4\u5B9A\u6587\u4EF6\u5927\u5C0F(' + ratingSize.toLocaleString() + 'M)\u4E0D\u4E00\u81F4');
        }
    });
};

/**
 * 在提交自助评分时显示错标文件大小警告
 */
var showSelfRatingErrorSizeSubmitWarning = exports.showSelfRatingErrorSizeSubmitWarning = function showSelfRatingErrorSizeSubmitWarning() {
    $('form[name="mail1"]').submit(function () {
        var ratingSize = parseFloat($('[name="psize"]').val());
        if (isNaN(ratingSize) || ratingSize <= 0) return;
        if (parseInt($('[name="psizegb"]').val()) === 2) ratingSize *= 1024;
        var title = $('.adp1 a[href^="read.php?tid="]').text();

        var _Public$checkRatingSi2 = Public.checkRatingSize(title, ratingSize),
            type = _Public$checkRatingSi2.type,
            titleSize = _Public$checkRatingSi2.titleSize;

        if (type === 1) {
            return confirm('\u6807\u9898\u6587\u4EF6\u5927\u5C0F(' + titleSize.toLocaleString() + 'M)\u4E0E\u8BA4\u5B9A\u6587\u4EF6\u5927\u5C0F(' + ratingSize.toLocaleString() + 'M)\u4E0D\u4E00\u81F4\uFF0C\u662F\u5426\u7EE7\u7EED\uFF1F');
        }
    });
};

/**
 * 在论坛排行页面为用户名添加链接
 */
var addUserNameLinkInRankPage = exports.addUserNameLinkInRankPage = function addUserNameLinkInRankPage() {
    $('.kf_no11:eq(2) > tbody > tr:gt(0) > td:nth-child(2)').each(function () {
        var $this = $(this);
        var userName = $this.text().trim();
        $this.html('<a href="profile.php?action=show&username=' + userName + '" target="_blank">' + userName + '</a>');
        if (userName === _Info2.default.userName) $this.find('a').addClass('pd_highlight');
    });
};

/**
 * 修改帮助页面
 */
var modifyFaq = exports.modifyFaq = function modifyFaq() {
    var id = parseInt(Util.getUrlParam('id'));
    var $faq = $('.kf_share1 > tbody > tr:nth-child(2) > td:last-child > div:last-child');
    if (id === 1) {
        if ($faq.html().length !== 848) return;
        $faq.html('\n\u4F60\u53EF\u4EE5\u901A\u8FC7\u53D1\u5E16/\u56DE\u8D34\u3001\u53C2\u4E0E<a href="kf_fw_ig_index.php" target="_blank">\u4E89\u593A\u5956\u52B1</a>\u7B49\u65B9\u5F0F\u83B7\u53D6KFB\uFF08\u8BBA\u575B\u8D27\u5E01\uFF09\u548C\u7ECF\u9A8C\u3002<br><br>\n\u53D1\u5E16/\u56DE\u8D34\u65F6\u4F1A\u83B7\u5F97\u57FA\u672C\u7684KFB\u5956\u52B1\uFF0C\u6BCF\u5929\u7B2C\u4E00\u6B21\u53D1\u5E16/\u56DE\u8D34\u8FD8\u53EF\u83B7\u5F97\u989D\u5916\u7ECF\u9A8C\u5956\u52B1\u3002<br>\n\u53D1\u5E16\u8BF7\u5148\u9605\u8BFB\u89C4\u5B9A\u907F\u514D\u8FDD\u89C4\uFF0C\u5728\u4F60\u8FD8\u6CA1\u6709\u65F6\u95F4\u9605\u8BFB\u5168\u90E8\u89C4\u5B9A\u4E4B\u524D\uFF0C\u8BF7\u81F3\u5C11\u6CE8\u610F\u4EE5\u4E0B\u51E0\u70B9\uFF1A<br>\n\u4E0D\u8981\u53D1\u8868\u7EAF\u6C34\u5E16\uFF1B\u4E0D\u8981\u7EAF\u590D\u5236\u53D1\u5E16\uFF1B\u4E0D\u8981\u53D1\u8868\u653F\u6CBB\u3001\u5E7F\u544A\u3001\u6076\u5FC3\u7684\u5185\u5BB9\uFF1B\u4E0D\u8981\u653B\u51FB\u3001\u8BBD\u523A\u3001\u6311\u8845\u4ED6\u4EBA\uFF1B<br>\n\u4E0D\u8981\u53D1\u8868\u6210\u4EBA\u56FE\u7247\u3001\u89C6\u9891\u3001\u5C0F\u8BF4\u7B49\u5185\u5BB9\uFF1B\u4E0D\u8981\u4F2A\u9020\u539F\u521B\u3001\u76D7\u53D6\u4ED6\u4EBA\u539F\u521B\u3002<br><br>\n\u5347\u7EA7\uFF08\u795E\u79D8\u7CFB\u6570\uFF09\u53EF\u4EE5\u83B7\u5F97\u4E0D\u540C\u7684\u7B49\u7EA7\u6743\u9650\uFF0C\u4F60\u53EF\u4EE5\u5728<a href="kf_growup.php" target="_blank">\u7B49\u7EA7\u7ECF\u9A8C\u9875\u9762</a>\u8FDB\u884CKFB\u6350\u6B3E\uFF0C\n\u6839\u636E\u4E0D\u540C\u7684\u6350\u6B3E\u6570\u989D\u83B7\u5F97\u76F8\u5E94\u7684\u7ECF\u9A8C\u6765\u63D0\u5347\u795E\u79D8\u7CFB\u6570\u3002<br>\n\u6CE8\u518C\u521D\u59CB\u795E\u79D8\u7CFB\u6570\u4E3A0\uFF0C\u4E3A\u201C\u901A\u5E38\u7248\u201D\u7B49\u7EA7\uFF0C\u62E5\u6709\u5927\u90E8\u5206\u7684\u65E5\u5E38\u6743\u9650\uFF1B\u63D0\u5347\u4E3A\u795E\u79D8\u7CFB\u65704\u65F6\uFF0C\u5347\u7EA7\u4E3A\u201C\u521D\u56DE\u9650\u5B9A\u7248\u201D\u7B49\u7EA7\uFF0C\u62E5\u6709\u90E8\u5206\u8FFD\u52A0\u7684\u6743\u9650\u3002<br>\n\u90E8\u5206\u677F\u5757\u9700\u8981\u4E00\u5B9A\u795E\u79D8\u7CFB\u6570\u4EE5\u4E0A\u624D\u53EF\u8FDB\u5165\uFF0C\u5982\u6253\u5F00\u5E16\u5B50\u65F6\u51FA\u73B0\u201Cerror&hellip;\u201D\u7684\u63D0\u793A\uFF0C\u8BF4\u660E\u4F60\u5F53\u524D\u7684\u795E\u79D8\u7CFB\u6570\u65E0\u6CD5\u8FDB\u5165\u8BE5\u677F\u5757\u3002<br><br>\n\u795E\u79D8\u7B49\u7EA7\u7684\u503C\u4EE5\u795E\u79D8\u7CFB\u6570\u4E3A\u57FA\u7840\uFF0C\u57FA\u672C\u4E0A\u662F\u88C5\u9970\u7528\u7684\u5C5E\u6027\uFF0C\u53EF\u89C1\u4E8E\u5E16\u5B50\u9875\u9762\u5404\u697C\u5C42\u7528\u6237\u540D\u79F0\u65C1\uFF0C\u8FD8\u53EF\u7528\u4E8E\u9009\u62E9\u81EA\u5B9A\u4E49ID\u989C\u8272\u3002\n');
    }
};

},{"./Bank":2,"./Config":4,"./ConfigDialog":5,"./Const":6,"./Info":10,"./Msg":15,"./Public":18,"./TmpLog":20,"./Util":21}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.modifyPostPreviewPage = exports.addExtraOptionInPostPage = exports.addExtraPostEditorButton = exports.removeUnpairedBBCodeInQuoteContent = exports.handleMultiQuote = undefined;

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Func = require('./Func');

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * 处理多重回复和多重引用
 * @param {number} type 处理类型，1：多重回复；2：多重引用
 */
var handleMultiQuote = exports.handleMultiQuote = function handleMultiQuote() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    (0, _Func.run)('Post.handleMultiQuote_before_', type);
    if (!$('#pd_clear_multi_quote_data').length) {
        $('<a id="pd_clear_multi_quote_data" style="margin-left: 7px;" title="清除在浏览器中保存的多重引用数据" href="#">清除引用数据</a>').insertAfter('input[name="diy_guanjianci"]').click(function (e) {
            e.preventDefault();
            localStorage.removeItem(_Const2.default.multiQuoteStorageName);
            $('input[name="diy_guanjianci"]').val('');
            if (type === 2) $('#textarea').val('');else $('textarea[name="atc_content"]').val('');
            alert('多重引用数据已被清除');
        });
    }
    var data = localStorage[_Const2.default.multiQuoteStorageName];
    if (!data) return;
    try {
        data = JSON.parse(data);
    } catch (ex) {
        return;
    }
    if (!data || $.type(data) !== 'object' || $.isEmptyObject(data)) return;
    var tid = parseInt(Util.getUrlParam('tid')),
        fid = parseInt(Util.getUrlParam('fid'));
    if (!tid || typeof data.tid === 'undefined' || data.tid !== tid || !Array.isArray(data.quoteList)) return;
    if (type === 2 && !fid) return;
    var list = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data.quoteList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var quote = _step.value;

            if (!Array.isArray(quote)) continue;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = quote[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _data = _step2.value;

                    list.push(_data);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (!list.length) {
        localStorage.removeItem(_Const2.default.multiQuoteStorageName);
        return;
    }
    var keywords = new Set();
    var content = '';
    if (type === 2) {
        Msg.wait('<strong>\u6B63\u5728\u83B7\u53D6\u5F15\u7528\u5185\u5BB9\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + list.length + '</em></i>');
        $(document).clearQueue('MultiQuote');
    }
    $.each(list, function (index, data) {
        if (typeof data.floor === 'undefined' || typeof data.pid === 'undefined') return;
        keywords.add(data.userName);
        if (type === 2) {
            $(document).queue('MultiQuote', function () {
                $.get('post.php?action=quote&fid=' + fid + '&tid=' + tid + '&pid=' + data.pid + '&article=' + data.floor + '&t=' + new Date().getTime(), function (html) {
                    var matches = /<textarea id="textarea".*?>((.|\n)+?)<\/textarea>/i.exec(html);
                    if (matches) {
                        content += Util.getRemoveUnpairedBBCodeQuoteContent(Util.htmlDecode(matches[1]).replace(/\n{2,}/g, '\n')) + (index === list.length - 1 ? '' : '\n');
                    }
                    var $remainingNum = $('#pd_remaining_num');
                    $remainingNum.text(parseInt($remainingNum.text()) - 1);
                    if (index === list.length - 1) {
                        Msg.destroy();
                        $('#textarea').val(content).focus();
                    } else {
                        setTimeout(function () {
                            $(document).dequeue('MultiQuote');
                        }, 100);
                    }
                });
            });
        } else {
            content += '[quote]\u56DE ' + data.floor + '\u697C(' + data.userName + ') \u7684\u5E16\u5B50[/quote]\n';
        }
    });
    $('input[name="diy_guanjianci"]').val([].concat(_toConsumableArray(keywords)).join(','));
    $('form[name="FORM"]').submit(function () {
        localStorage.removeItem(_Const2.default.multiQuoteStorageName);
    });
    if (type === 2) $(document).dequeue('MultiQuote');else $('textarea[name="atc_content"]').val(content).focus();
    (0, _Func.run)('Post.handleMultiQuote_after_', type);
};

/**
 * 去除引用内容中不配对的BBCode
 */
var removeUnpairedBBCodeInQuoteContent = exports.removeUnpairedBBCodeInQuoteContent = function removeUnpairedBBCodeInQuoteContent() {
    var $content = $('#textarea');
    var content = $content.val();
    var matches = /\[quote\](.|\r|\n)+?\[\/quote\]/.exec(content);
    if (matches) {
        var workedContent = Util.getRemoveUnpairedBBCodeQuoteContent(matches[0]);
        if (matches[0] !== workedContent) {
            $content.val(content.replace(matches[0], workedContent));
        }
    }
};

/**
 * 在发帖页面的发帖框上添加额外的按钮
 */
var addExtraPostEditorButton = exports.addExtraPostEditorButton = function addExtraPostEditorButton() {
    var textArea = $('textarea[name="atc_content"]').get(0);
    if (!textArea) return;

    $('\n<span id="wy_post" title="\u63D2\u5165\u9690\u85CF\u5185\u5BB9" data-type="hide" style="background-position:0 -280px">\u63D2\u5165\u9690\u85CF\u5185\u5BB9</span>\n<span id="wy_justifyleft" title="\u5DE6\u5BF9\u9F50" data-type="left" style="background-position:0 -360px">\u5DE6\u5BF9\u9F50</span>\n<span id="wy_justifycenter" title="\u5C45\u4E2D" data-type="center" style="background-position:0 -380px">\u5C45\u4E2D</span>\n<span id="wy_justifyright" title="\u53F3\u5BF9\u9F50" data-type="right" style="background-position:0 -400px">\u53F3\u5BF9\u9F50</span>\n<span id="wy_subscript" title="\u4E0B\u6807" data-type="sub" style="background-position:0 -80px">\u4E0B\u6807</span>\n<span id="wy_superscript" title="\u4E0A\u6807" data-type="sup" style="background-position:0 -100px">\u4E0A\u6807</span>\n<span class="pd_editor_btn" title="\u63D2\u5165\u98DE\u884C\u6587\u5B57" data-type="fly">F</span>\n<span class="pd_editor_btn" title="\u63D2\u5165HTML5\u97F3\u9891" data-type="audio">A</span>\n<span class="pd_editor_btn" title="\u63D2\u5165HTML5\u89C6\u9891" data-type="video">V</span>\n').appendTo('#editor-button .editor-button').click(function () {
        var $this = $(this);
        var type = $this.data('type');
        var text = '';
        switch (type) {
            case 'hide':
                text = prompt('请输入神秘等级：', 5);
                break;
            case 'audio':
                {
                    text = prompt('请输入HTML5音频实际地址：\n（可直接输入网易云音乐或虾米的单曲地址，将自动转换为外链地址）', 'http://');
                    var matches = /^https?:\/\/music\.163\.com\/(?:#\/)?song\?id=(\d+)/i.exec(text);
                    if (matches) text = 'http://music.miaola.info/163/{0}.mp3'.replace('{0}', matches[1]);
                    matches = /^https?:\/\/www\.xiami\.com\/song\/(\d+)/i.exec(text);
                    if (matches) text = 'http://music.miaola.info/xiami/{0}.mp3'.replace('{0}', matches[1]);
                }
                break;
            case 'video':
                {
                    text = prompt('请输入HTML5视频实际地址：\n（可直接输入YouTube视频页面的地址，将自动转换为外链地址）', 'http://');
                    var _matches = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w\-]+)/i.exec(text);
                    if (_matches) text = 'http://video.miaola.info/youtube/{0}'.replace('{0}', _matches[1]);
                    _matches = /^https?:\/\/youtu\.be\/([\w\-]+)$/i.exec(text);
                    if (_matches) text = 'http://video.miaola.info/youtube/{0}'.replace('{0}', _matches[1]);
                }
                break;
        }
        if (text === null) return;

        var selText = '';
        var code = '';
        switch (type) {
            case 'hide':
                selText = Util.getSelText(textArea);
                code = '[hide=' + text + ']' + selText + '[/hide]';
                break;
            case 'left':
                selText = Util.getSelText(textArea);
                code = '[align=left]' + selText + '[/align]';
                break;
            case 'center':
                selText = Util.getSelText(textArea);
                code = '[align=center]' + selText + '[/align]';
                break;
            case 'right':
                selText = Util.getSelText(textArea);
                code = '[align=right]' + selText + '[/align]';
                break;
            case 'fly':
                selText = Util.getSelText(textArea);
                code = '[fly]' + selText + '[/fly]';
                break;
            case 'sub':
                selText = Util.getSelText(textArea);
                code = '[sub]' + selText + '[/sub]';
                break;
            case 'sup':
                selText = Util.getSelText(textArea);
                code = '[sup]' + selText + '[/sup]';
                break;
            case 'audio':
                code = '[audio]' + text + '[/audio]';
                break;
            case 'video':
                code = '[video]' + text + '[/video]';
                break;
        }
        if (!code) return;
        Util.addCode(textArea, code, selText);
        textArea.focus();
    }).mouseenter(function () {
        $(this).addClass('buttonHover');
    }).mouseleave(function () {
        $(this).removeClass('buttonHover');
    });
};

/**
 * 在发帖页面上添加额外的选项
 */
var addExtraOptionInPostPage = exports.addExtraOptionInPostPage = function addExtraOptionInPostPage() {
    $('\n<div class="pd_post_extra_option">\n  <label><input type="checkbox" id="pd_auto_analyze_url" checked> \u81EA\u52A8\u5206\u6790url</label><br>\n  <label><input type="checkbox" name="pd_wind_code_auto_convert" checked> Wind Code\u81EA\u52A8\u8F6C\u6362</label>\n</div>\n').appendTo($('#menu_show').closest('td')).on('click', 'input[type="checkbox"]', function () {
        var $this = $(this);
        var inputName = $this.is('#pd_auto_analyze_url') ? 'atc_autourl' : 'atc_convert';
        $('form[name="FORM"]').find('input[name="' + inputName + '"]').val($this.prop('checked') ? 1 : 0);
    });

    $('<input type="button" value="预览帖子" style="margin-left: 7px;">').insertAfter('input[type="submit"][name="Submit"]').click(function (e) {
        e.preventDefault();
        var $form = $('form[name="preview"]');
        $form.find('input[name="atc_content"]').val($('#textarea').val());
        $form.submit();
    });
};

/**
 * 修正发帖预览页面
 */
var modifyPostPreviewPage = exports.modifyPostPreviewPage = function modifyPostPreviewPage() {
    $('table > tbody > tr.tr1 > th').css({
        'text-align': 'left',
        'font-weight': 'normal',
        'border': '1px solid #9191ff',
        'padding': '10px'
    });
};

},{"./Const":6,"./Func":8,"./Msg":15,"./Util":21}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkRatingSize = exports.turnPageViaKeyboard = exports.repairBbsErrorCode = exports.addSearchDialogLink = exports.makeSearchByBelowTwoKeyWordAvailable = exports.bindSearchTypeSelectMenuClick = exports.bindElementTitleClick = exports.showElementTitleTips = exports.changeIdColor = exports.runCustomScript = exports.autoSaveCurrentDeposit = exports.addFastNavForSideBar = exports.modifySideBar = exports.blockThread = exports.blockUsers = exports.followUsers = exports.addConfigAndLogDialogLink = exports.startAutoRefreshMode = exports.getMinRefreshInterval = exports.donation = exports.addPolyfill = exports.showFormatLog = exports.preventCloseWindowWhenActioning = exports.appendCss = exports.checkBrowserType = exports.getSafeId = exports.getUidAndUserName = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Dialog = require('./Dialog');

var Dialog = _interopRequireWildcard(_Dialog);

var _Func = require('./Func');

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _ConfigDialog = require('./ConfigDialog');

var _Log = require('./Log');

var _LogDialog = require('./LogDialog');

var _TmpLog = require('./TmpLog');

var TmpLog = _interopRequireWildcard(_TmpLog);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获取Uid和用户名
 * @returns {boolean} 是否获取成功
 */
var getUidAndUserName = exports.getUidAndUserName = function getUidAndUserName() {
    var $user = $('.topright a[href^="profile.php?action=show&uid="]').eq(0);
    if (!$user.length) return false;
    _Info2.default.userName = $user.text();
    if (!_Info2.default.userName) return false;
    var matches = /&uid=(\d+)/.exec($user.attr('href'));
    if (!matches) return false;
    _Info2.default.uid = parseInt(matches[1]);
    return true;
};

/**
 * 获取用户的SafeID
 * @returns {string} 用户的SafeID
 */
var getSafeId = exports.getSafeId = function getSafeId() {
    var safeId = $('input#safeid').val();
    if (!safeId) {
        var matches = /safeid=(\w+)/i.exec($('a[href*="safeid="]:first').attr('href'));
        if (matches) safeId = matches[1];
    }
    return safeId ? safeId : '';
};

/**
 * 检查浏览器类型
 */
var checkBrowserType = exports.checkBrowserType = function checkBrowserType() {
    if (Config.browseType === 'auto') {
        _Info2.default.isMobile = /(Mobile|MIDP)/i.test(navigator.userAgent);
    } else {
        _Info2.default.isMobile = Config.browseType === 'mobile';
    }
};

/**
 * 添加CSS样式
 */
var appendCss = exports.appendCss = function appendCss() {
    $('head').append('\n<style>\n  /* \u901A\u7528 */\n  .pd_mask { position: fixed; width: 100%; height: 100%; left: 0; top: 0; z-index: 1000; }\n  .pd_msg_container { position: ' + (_Info2.default.isMobile ? 'absolute' : 'fixed') + '; width: 100%; z-index: 1001; }\n  .pd_msg {\n    border: 1px solid #6ca7c0; text-shadow: 0 0 3px rgba(0, 0, 0, 0.1); border-radius: 3px; padding: 12px 40px; text-align: center;\n    font-size: 14px; position: absolute; display: none; color: #333; background: #f8fcfe; background-repeat: no-repeat;\n    background-image: -webkit-linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);\n    background-image: -moz-linear-gradient(top, #f9fcfe, #f6fbfe 25%, #eff7fc);\n    background-image: -o-linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);\n    background-image: -ms-linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);\n    background-image: linear-gradient(#f9fcfe, #f6fbfe 25%, #eff7fc);\n  }\n  .pd_msg strong { margin-right: 5px; }\n  .pd_msg i { font-style: normal; padding-left: 10px; }\n  .pd_msg em, .pd_stat em, .pd_msg ins, .pd_stat ins { font-weight: 700; font-style: normal; color:#ff6600; padding: 0 3px; }\n  .pd_msg ins, .pd_stat ins { text-decoration: none; color: #339933; }\n  .pd_msg a { font-weight: bold; margin-left: 15px; }\n  .pd_stat i { font-style: normal; margin-right: 3px; }\n  .pd_stat .pd_notice { margin-left: 5px; }\n  .pd_stat_extra em, .pd_stat_extra ins { padding: 0 2px; cursor: help; }\n  .pd_highlight { color: #ff0000 !important; }\n  .pd_notice, .pd_msg .pd_notice { font-style: italic; color: #666; }\n  .pd_input, .pd_cfg_main input, .pd_cfg_main select { vertical-align: middle; height: auto; margin-right: 0; line-height: 22px; font-size: 12px; }\n  .pd_input[type="text"], .pd_cfg_main input[type="text"] { height: 18px; line-height: 18px; }\n  .pd_input:focus, .pd_cfg_main input[type="text"]:focus, .pd_cfg_main textarea:focus, .pd_textarea:focus { border-color: #7eb4ea; }\n  .pd_textarea, .pd_cfg_main textarea { border: 1px solid #ccc; font-size: 12px; }\n  .readlou .pd_goto_link { color: #000; }\n  .readlou .pd_goto_link:hover { color: #51d; }\n  .pd_fast_goto_floor, .pd_multi_quote_chk { margin-right: 2px; }\n  .pages .pd_fast_goto_page { margin-left: 8px; }\n  .pd_fast_goto_floor span:hover, .pd_fast_goto_page span:hover { color: #51d; cursor: pointer; text-decoration: underline; }\n  .pd_item_btns { text-align: right; margin-top: 5px;  }\n  .pd_item_btns button, .pd_item_btns input { margin-left: 3px; margin-bottom: 2px; vertical-align: middle; }\n  .pd_result { border: 1px solid #99f; padding: 5px; margin-top: 10px; line-height: 2em; }\n  .pd_result_sep { border-bottom: 1px solid #999; margin: 7px 0; }\n  .pd_result_sep_inner { border-bottom: 1px dashed #999; margin: 5px 0; }\n  .pd_thread_page { margin-left: 5px; }\n  .pd_thread_page a { color: #444; padding: 0 3px; }\n  .pd_thread_page a:hover { color: #51d; }\n  .pd_card_chk { position: absolute; bottom: -8px; left: 1px; }\n  .pd_disabled_link { color: #999 !important; text-decoration: none !important; cursor: default; }\n  .b_tit4 .pd_thread_goto, .b_tit4_1 .pd_thread_goto { position: absolute; top: 0; right: 0; padding: 0 15px; }\n  .b_tit4 .pd_thread_goto:hover, .b_tit4_1 .pd_thread_goto:hover { padding-left: 15px; }\n  .pd_custom_tips { cursor: help; }\n  .pd_user_memo { font-size: 12px; color: #999; line-height: 14px; }\n  .pd_user_memo_tips { font-size: 12px; color: #fff; margin-left: 3px; cursor: help; }\n  .pd_user_memo_tips:hover { color: #ddd; }\n  .pd_sm_color_select > td { position: relative; cursor: pointer; }\n  .pd_sm_color_select > td > input { position: absolute; top: 18px; left: 10px; }\n  .pd_used_item_info { color: #666; float: right; cursor: help; margin-right: 5px; }\n  .pd_panel { position: absolute; overflow-y: auto; background-color: #fff; border: 1px solid #9191ff; opacity: 0.9; }\n  #pd_smile_panel img { margin: 3px; cursor: pointer; }\n  .pd_verify_tips { cursor: help; color: #999; }\n  .pd_verify_tips_ok { color: #99cc66; }\n  .pd_verify_tips_conditional { color: #ff9900; }\n  .pd_verify_tips_unable { color: #ff0033; }\n  .pd_verify_tips_details { cursor: pointer; }\n  #pd_monster_loot_info_panel em { font-style: normal; cursor: help; }\n  #pd_attack_log_content {\n    width: 850px; min-height: 160px; max-height: 500px; margin: 5px 0; padding: 5px; border: 1px solid #9191ff; overflow: auto;\n    line-height: 1.6em; background-color: #fff;\n  }\n  .pd_my_items > tbody > tr > td > a + a { margin-left: 15px; }\n  .pd_usable_num { color: #669933; }\n  .pd_used_num { color: #ff0033; }\n  .pd_title_tips {\n    position: absolute; max-width: 470px; font-size: 12px; line-height: 1.5em;\n    padding: 2px 5px; background-color: #fcfcfc; border: 1px solid #767676; z-index: 9999;\n  }\n  .pd_search_type {\n    float: left; height: 26px; line-height: 26px; width: 65px; text-align: center; border: 1px solid #ccc; border-left: none; cursor: pointer;\n  }\n  .pd_search_type i { font-style: normal; margin-left: 5px; font-family: "Microsoft YaHei"; }\n  .pd_search_type_list {\n    position: absolute; width: 63px; background-color: #fcfcfc; border: 1px solid #ccc; border-top: none; line-height: 26px;\n    text-indent: 13px; cursor: pointer; z-index: 1003;\n  }\n  .pd_search_type_list li:hover { color: #fff; background-color: #87c3cf; }\n  .editor-button .pd_editor_btn { background: none; text-indent: 0; line-height: 18px; cursor: default; }\n  .readtext img[onclick] { max-width: 550px; }\n  .pd_post_extra_option { text-align:left; margin-top:5px; margin-left:5px; }\n  .pd_post_extra_option input { vertical-align:middle; height:auto; margin-right:0; }\n  .read_fds { text-align: left !important; font-weight: normal !important; font-style: normal !important; }\n  .pd_item_type_chk { margin-right: 5px; }\n\n  /* \u8BBE\u7F6E\u5BF9\u8BDD\u6846 */\n  .pd_cfg_box {\n    position: ' + (_Info2.default.isMobile ? 'absolute' : 'fixed') + '; border: 1px solid #9191ff; display: none; z-index: 1002;\n    -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); -moz-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);\n    -o-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5); box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);\n  }\n  .pd_cfg_box h1 {text-align: center; font-size: 14px; background-color: #9191ff; color: #fff; line-height: 2em; margin: 0; padding-left: 20px; }\n  .pd_cfg_box h1 span { float: right; cursor: pointer; padding: 0 10px; }\n  #pd_custom_sm_color { width: 360px; }\n  .pd_cfg_nav { text-align: right; margin-top: 5px; margin-bottom: -5px; }\n  .pd_cfg_nav a { margin-left: 10px; }\n  .pd_cfg_main { background-color: #fcfcfc; padding: 0 10px; font-size: 12px; line-height: 22px; min-height: 50px; overflow: auto; }\n  .pd_cfg_main fieldset { border: 1px solid #ccccff; padding: 0 6px 6px; }\n  .pd_cfg_main legend { font-weight: bold; }\n  .pd_cfg_main label input, .pd_cfg_main legend input, .pd_cfg_main label select { margin: 0 5px; }\n  .pd_cfg_main input[type="color"] { height: 18px; width: 30px; padding: 0; }\n  .pd_cfg_main button { vertical-align: middle; }\n  .pd_cfg_main .pd_cfg_tips { color: #51d; text-decoration: none; cursor: help; }\n  .pd_cfg_main .pd_cfg_tips:hover { color: #ff0000; }\n  #pd_config .pd_cfg_main { overflow-x: hidden; white-space: nowrap; }\n  .pd_cfg_panel { display: inline-block; width: 380px; vertical-align: top; }\n  .pd_cfg_panel + .pd_cfg_panel { margin-left: 5px; }\n  .pd_cfg_btns { background-color: #fcfcfc; text-align: right; padding: 5px; }\n  .pd_cfg_btns button { width: 80px; margin-left: 5px; }\n  .pd_cfg_about { float: left; line-height: 24px; margin-left: 5px; }\n  #pd_cfg_custom_monster_name_list td input[type="text"] { width: 140px; }\n  #pd_cfg_follow_user_list, #pd_cfg_block_user_list { max-height: 480px; overflow: auto; }\n  #pd_auto_change_sm_color_btns label { margin-right: 10px; }\n  .pd_cfg_ml { margin-left: 10px; }\n\n  /* \u65E5\u5FD7\u5BF9\u8BDD\u6846 */\n  #pd_log { width: 880px; }\n  .pd_log_nav { text-align: center; margin: -5px 0 -12px; font-size: 14px; line-height: 44px; }\n  .pd_log_nav a { display: inline-block; }\n  .pd_log_nav h2 { display: inline; font-size: 14px; margin-left: 7px; margin-right: 7px; }\n  #pd_log_content { height: 308px; overflow: auto; }\n  #pd_log_content h3 { display: inline-block; font-size: 12px; line-height: 22px; margin: 0; }\n  #pd_log_content h3:not(:first-child) { margin-top: 5px; }\n  #pd_log_content p { line-height: 22px; margin: 0; }\n  #pd_log .pd_stat i { display: inline-block; }\n</style>\n');

    if (Config.customCssEnabled) {
        $('head').append('<style>' + Config.customCssContent + '</style>');
    }
};

/**
 * 在操作进行时阻止关闭页面
 * @param e
 * @returns {string} 提示消息
 */
var preventCloseWindowWhenActioning = exports.preventCloseWindowWhenActioning = function preventCloseWindowWhenActioning(e) {
    if ($('.pd_mask').length > 0) {
        var msg = '操作正在进行中，确定要关闭页面吗？';
        e.returnValue = msg;
        return msg;
    }
};

/**
 * 输出经过格式化后的控制台消息
 * @param {string} msgType 消息类别
 * @param {string} html 回应的HTML源码
 */
var showFormatLog = exports.showFormatLog = function showFormatLog(msgType, html) {
    var msg = Util.getResponseMsg(html);
    if (!msg) msg = '未能获得预期的回应';
    console.log('\u3010' + msgType + '\u3011\u56DE\u5E94\uFF1A' + msg);
};

/**
 * 添加兼容方法
 */
var addPolyfill = exports.addPolyfill = function addPolyfill() {
    if (!Array.prototype.includes) {
        Array.prototype.includes = function (searchElement /*, fromIndex = 0 */) {
            'use strict';

            if (this == null) {
                throw new TypeError('Array.prototype.includes called on null or undefined');
            }

            var O = Object(this);
            var len = parseInt(O.length) || 0;
            if (len === 0) return false;
            var n = parseInt(arguments[1]) || 0;
            var k = void 0;
            if (n >= 0) {
                k = n;
            } else {
                k = len + n;
                if (k < 0) {
                    k = 0;
                }
            }
            var currentElement = void 0;
            while (k < len) {
                currentElement = O[k];
                if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
                    return true;
                }
                k++;
            }
            return false;
        };
    }
};

/**
 * KFB捐款
 * @param {boolean} isAutoSaveCurrentDeposit 是否在捐款完毕之后自动活期存款
 */
var donation = exports.donation = function donation() {
    var isAutoSaveCurrentDeposit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var now = new Date();
    var date = Util.getDateByTime(Config.donationAfterTime);
    if (now < date) {
        if (isAutoSaveCurrentDeposit) autoSaveCurrentDeposit();
        return;
    }
    (0, _Func.run)('Public.donation_before_');
    console.log('KFB捐款Start');
    var $wait = Msg.wait('<strong>正在进行捐款，请稍候&hellip;</strong>');

    /**
     * 获取捐款Cookies有效期
     * @returns {Date} Cookies有效期的Date对象
     */
    var getDonationCookieDate = function getDonationCookieDate() {
        var now = new Date();
        var date = Util.getTimezoneDateByTime('02:00:00');
        if (now > date) {
            date = Util.getTimezoneDateByTime('00:00:00');
            date.setDate(date.getDate() + 1);
        }
        if (now > date) date.setDate(date.getDate() + 1);
        return date;
    };

    /**
     * 使用指定的KFB捐款
     * @param {number} kfb 指定的KFB
     */
    var donationSubmit = function donationSubmit(kfb) {
        $.post('kf_growup.php?ok=1', { kfb: kfb }, function (html) {
            Util.setCookie(_Const2.default.donationCookieName, 1, getDonationCookieDate());
            showFormatLog('\u6350\u6B3E' + kfb + 'KFB', html);
            Msg.remove($wait);

            var msg = '<strong>\u6350\u6B3E<em>' + kfb + '</em>KFB</strong>';
            var matches = /捐款获得(\d+)经验值(?:.*?补偿期(?:.*?\+(\d+)KFB)?(?:.*?(\d+)成长经验)?)?/i.exec(html);
            if (!matches) {
                if (/KFB不足。<br/i.test(html)) {
                    msg += '<i class="pd_notice">KFB不足</i><a target="_blank" href="kf_growup.php">手动捐款</a>';
                } else return;
            } else {
                msg += '<i>\u7ECF\u9A8C\u503C<em>+' + matches[1] + '</em></i>';
                var gain = { '经验值': parseInt(matches[1]) };
                if (typeof matches[2] !== 'undefined' || typeof matches[3] !== 'undefined') {
                    msg += '<i style="margin-left: 5px;">(补偿期:</i>' + (typeof matches[2] !== 'undefined' ? '<i>KFB<em>+' + matches[2] + '</em>' + (typeof matches[3] !== 'undefined' ? '' : ')') + '</i>' : '') + (typeof matches[3] !== 'undefined' ? '<i>\u7ECF\u9A8C\u503C<em>+' + matches[3] + '</em>)</i>' : '');
                    if (typeof matches[2] !== 'undefined') gain['KFB'] = parseInt(matches[2]);
                    if (typeof matches[3] !== 'undefined') gain['经验值'] += parseInt(matches[3]);
                }
                (0, _Log.push)('捐款', '\u6350\u6B3E`' + kfb + '`KFB', { gain: gain, pay: { 'KFB': -kfb } });
            }
            Msg.show(msg);
            if (isAutoSaveCurrentDeposit) autoSaveCurrentDeposit(true);
            (0, _Func.run)('Public.donation_after_', html);
        });
    };

    if (/%$/.test(Config.donationKfb)) {
        $.get('profile.php?action=show&uid=' + _Info2.default.uid + '&t=' + new Date().getTime(), function (html) {
            var matches = /论坛货币：(-?\d+)\s*KFB/i.exec(html);
            var income = 1;
            if (matches) income = parseInt(matches[1]);else console.log('当前持有KFB获取失败');
            var donationKfb = parseInt(Config.donationKfb);
            donationKfb = Math.floor(income * donationKfb / 100);
            donationKfb = donationKfb > 0 ? donationKfb : 1;
            donationKfb = donationKfb <= _Const2.default.maxDonationKfb ? donationKfb : _Const2.default.maxDonationKfb;
            donationSubmit(donationKfb);
        });
    } else {
        $.get('kf_growup.php?t=' + new Date().getTime(), function (html) {
            if (/>今天已经捐款</.test(html)) {
                Msg.remove($wait);
                Util.setCookie(_Const2.default.donationCookieName, 1, getDonationCookieDate());
                if (isAutoSaveCurrentDeposit) autoSaveCurrentDeposit();
            } else {
                donationSubmit(parseInt(Config.donationKfb));
            }
        }, 'html');
    }
};

/**
 * 获取倒计时的最小时间间隔（秒）
 * @returns {number} 倒计时的最小时间间隔（秒）
 */
var getMinRefreshInterval = exports.getMinRefreshInterval = function getMinRefreshInterval() {
    var donationInterval = -1;
    if (Config.autoDonationEnabled) {
        var donationTime = Util.getDateByTime(Config.donationAfterTime);
        var now = new Date();
        if (!Util.getCookie(_Const2.default.donationCookieName) && now <= donationTime) {
            donationInterval = Math.floor((donationTime - now) / 1000);
        } else {
            donationTime.setDate(donationTime.getDate() + 1);
            donationInterval = Math.floor((donationTime - now) / 1000);
        }
    }

    var autoChangeSMColorInterval = -1;
    if (Config.autoChangeSMColorEnabled) {
        var nextTime = parseInt(Util.getCookie(_Const2.default.autoChangeSMColorCookieName));
        if (!isNaN(nextTime) && nextTime > 0) {
            autoChangeSMColorInterval = Math.floor((nextTime - new Date().getTime()) / 1000);
            if (autoChangeSMColorInterval < 0) autoChangeSMColorInterval = 0;
            if (!Config.changeAllAvailableSMColorEnabled && Config.customAutoChangeSMColorList.length <= 1) autoChangeSMColorInterval = -1;
        } else autoChangeSMColorInterval = 0;
    }

    var minArr = [donationInterval, autoChangeSMColorInterval];
    minArr.sort(function (a, b) {
        return a > b;
    });
    var min = -1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = minArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var num = _step.value;

            if (num > -1) {
                min = num;
                break;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (min <= -1) return -1;else return min > 0 ? min + 1 : 0;
};

/**
 * 启动定时模式
 */
var startAutoRefreshMode = exports.startAutoRefreshMode = function startAutoRefreshMode() {
    var interval = getMinRefreshInterval();
    if (interval === -1) return;
    var oriTitle = document.title;
    var titleItvFunc = null;
    var prevInterval = -1,
        errorNum = 0;

    /**
     * 获取经过格式化的倒计时标题
     * @param {number} type 倒计时显示类型，1：[小时:][分钟:]秒钟；2：[小时:]分钟
     * @param {number} interval 倒计时
     * @returns {string} 经过格式化的倒计时标题
     */
    var getFormatIntervalTitle = function getFormatIntervalTitle(type, interval) {
        var textInterval = '';
        var diff = Util.getTimeDiffInfo(Util.getDate('+' + interval + 's').getTime());
        textInterval = diff.hours > 0 ? diff.hours + '时' : '';
        if (type === 1) textInterval += (diff.minutes > 0 ? diff.minutes + '分' : '') + diff.seconds + '秒';else textInterval += diff.minutes + '分';
        return textInterval;
    };

    /**
     * 显示定时模式标题提示
     * @param {number} interval 倒计时的时间间隔（秒）
     * @param {boolean} isShowTitle 是否立即显示标题
     */
    var showRefreshModeTips = function showRefreshModeTips(interval) {
        var isShowTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (titleItvFunc) window.clearInterval(titleItvFunc);
        var showInterval = interval;
        console.log('【定时模式】倒计时：' + getFormatIntervalTitle(1, showInterval));
        if (Config.showRefreshModeTipsType.toLowerCase() !== 'never') {
            var showIntervalTitle = function showIntervalTitle() {
                document.title = oriTitle + ' (\u5B9A\u65F6: ' + getFormatIntervalTitle(interval < 60 ? 1 : 2, showInterval) + ')';
                showInterval = interval < 60 ? showInterval - 1 : showInterval - 60;
            };
            if (isShowTitle || Config.showRefreshModeTipsType.toLowerCase() === 'always' || interval < 60) showIntervalTitle();else showInterval = interval < 60 ? showInterval - 1 : showInterval - 60;
            titleItvFunc = setInterval(showIntervalTitle, _Const2.default.showRefreshModeTipsInterval * 60 * 1000);
        }
    };

    /**
     * 处理错误
     */
    var handleError = function handleError() {
        var interval = 0,
            errorText = '';
        $.ajax({
            type: 'GET',
            url: 'index.php?t=' + new Date().getTime(),
            timeout: _Const2.default.defAjaxTimeout,
            success: function success(html) {
                if (!/"kf_fw_ig_index.php"/.test(html)) {
                    interval = 10;
                    errorText = '论坛维护或其它未知情况';
                }
            },
            error: function error() {
                interval = _Const2.default.errorRefreshInterval;
                errorText = '连接超时';
            },
            complete: function complete() {
                if (interval > 0) {
                    console.log('\u5B9A\u65F6\u64CD\u4F5C\u5931\u8D25\uFF08\u539F\u56E0\uFF1A' + errorText + '\uFF09\uFF0C\u5C06\u5728' + interval + '\u5206\u949F\u540E\u91CD\u8BD5...');
                    Msg.remove($('.pd_refresh_notice').parent());
                    Msg.show('<strong class="pd_refresh_notice">\u5B9A\u65F6\u64CD\u4F5C\u5931\u8D25\uFF08\u539F\u56E0\uFF1A' + errorText + '\uFF09\uFF0C\u5C06\u5728<em>' + interval + '</em>\u5206\u949F\u540E\u91CD\u8BD5&hellip;</strong>', -1);
                    setTimeout(handleError, interval * 60 * 1000);
                    showRefreshModeTips(interval * 60, true);
                } else {
                    if (errorNum > 6) {
                        errorNum = 0;
                        interval = 15;
                        setTimeout(checkRefreshInterval, interval * 60 * 1000);
                        showRefreshModeTips(interval * 60, true);
                    } else {
                        errorNum++;
                        checkRefreshInterval();
                    }
                }
            }
        });
    };

    /**
     * 检查刷新间隔
     */
    var checkRefreshInterval = function checkRefreshInterval() {
        Msg.remove($('.pd_refresh_notice').parent());
        if (Config.autoDonationEnabled && !Util.getCookie(_Const2.default.donationCookieName)) donation();
        if (Config.autoChangeSMColorEnabled && !Util.getCookie(_Const2.default.autoChangeSMColorCookieName)) changeIdColor();

        var interval = getMinRefreshInterval();
        if (interval > 0) errorNum = 0;
        if (interval === 0 && prevInterval === 0) {
            prevInterval = -1;
            handleError();
            return;
        } else prevInterval = interval;
        if (interval === -1) {
            if (titleItvFunc) clearInterval(titleItvFunc);
            return;
        } else if (interval === 0) interval = _Const2.default.actionFinishRetryInterval;
        setTimeout(checkRefreshInterval, interval * 1000);
        showRefreshModeTips(interval, true);
    };

    setTimeout(checkRefreshInterval, interval < 60 ? 60 * 1000 : interval * 1000);
    showRefreshModeTips(interval < 60 ? 60 : interval);
};

/**
 * 添加设置和日志对话框的链接
 */
var addConfigAndLogDialogLink = exports.addConfigAndLogDialogLink = function addConfigAndLogDialogLink() {
    var $login = $('a[href^="login.php?action=quit"]:first');
    $('<a href="#">助手设置</a><span> | </span>').insertBefore($login).filter('a').click(function (e) {
        e.preventDefault();
        (0, _ConfigDialog.show)();
    });
    if (Config.showLogLinkEnabled) {
        $('<a href="#">助手日志</a><span> | </span>').insertBefore($login).filter('a').click(function (e) {
            e.preventDefault();
            (0, _LogDialog.show)();
        });
    }
};

/**
 * 关注用户
 */
var followUsers = exports.followUsers = function followUsers() {
    if (!Config.followUserList.length) return;
    if (_Info2.default.isInHomePage && Config.highlightFollowUserThreadInHPEnabled) {
        $('.b_tit4 > a, .b_tit4_1 > a').each(function () {
            var $this = $(this);
            var matches = /》by：(.+)/.exec($this.attr('title'));
            if (!matches) return;
            if (Util.inFollowOrBlockUserList(matches[1], Config.followUserList) > -1) {
                $this.addClass('pd_highlight');
            }
        });
    } else if (location.pathname === '/thread.php') {
        $('a.bl[href^="profile.php?action=show&uid="]').each(function () {
            var $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.followUserList) > -1) {
                $this.addClass('pd_highlight');
                if (Config.highlightFollowUserThreadLinkEnabled) $this.parent('td').prev('td').prev('td').find('div > a[href^="read.php?tid="]').addClass('pd_highlight');
            }
        });
    } else if (location.pathname === '/read.php') {
        $('.readidmsbottom > a, .readidmleft > a').each(function () {
            var $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.followUserList) > -1) {
                $this.closest('.readtext').prev('.readlou').find('div:nth-child(2) > span:first-child').find('a').addBack().addClass('pd_highlight');
            }
        });
    } else if (location.pathname === '/guanjianci.php' || location.pathname === '/kf_share.php') {
        $('.kf_share1 > tbody > tr > td:last-child').each(function () {
            var $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.followUserList) > -1) {
                $this.addClass('pd_highlight');
            }
        });
    } else if (location.pathname === '/search.php') {
        $('.thread1 a[href^="profile.php?action=show&uid="]').each(function () {
            var $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.followUserList) > -1) {
                $this.addClass('pd_highlight');
            }
        });
    }
};

/**
 * 屏蔽用户
 */
var blockUsers = exports.blockUsers = function blockUsers() {
    if (Config.blockUserList.length === 0) return;
    var blockNum = 0;
    if (_Info2.default.isInHomePage) {
        $('.b_tit4 > a, .b_tit4_1 > a').each(function () {
            var $this = $(this);
            var matches = /》by：(.+)/.exec($this.attr('title'));
            if (!matches) return;
            var index = Util.inFollowOrBlockUserList(matches[1], Config.blockUserList);
            if (index > -1 && Config.blockUserList[index].type < 2) {
                blockNum++;
                $this.parent('li').remove();
            }
        });
    } else if (location.pathname === '/thread.php') {
        var fid = parseInt($('input[name="f_fid"]:first').val());
        if (!fid) return;
        if (Config.blockUserForumType === 1 && $.inArray(fid, Config.blockUserFidList) === -1) return;else if (Config.blockUserForumType === 2 && $.inArray(fid, Config.blockUserFidList) > -1) return;
        $('a.bl[href^="profile.php?action=show&uid="]').each(function () {
            var $this = $(this);
            var index = Util.inFollowOrBlockUserList($this.text(), Config.blockUserList);
            if (index > -1 && Config.blockUserList[index].type < 2) {
                blockNum++;
                $this.closest('tr').remove();
            }
        });
    } else if (location.pathname === '/read.php') {
        var _ret = function () {
            if (Config.blockUserForumType > 0) {
                var _fid = parseInt($('input[name="fid"]:first').val());
                if (!_fid) return {
                        v: void 0
                    };
                if (Config.blockUserForumType === 1 && $.inArray(_fid, Config.blockUserFidList) === -1) return {
                        v: void 0
                    };else if (Config.blockUserForumType === 2 && $.inArray(_fid, Config.blockUserFidList) > -1) return {
                        v: void 0
                    };
            }
            var page = Util.getCurrentThreadPage();
            $('.readidmsbottom > a, .readidmleft > a').each(function (i) {
                var $this = $(this);
                var index = Util.inFollowOrBlockUserList($this.text(), Config.blockUserList);
                if (index > -1) {
                    var type = Config.blockUserList[index].type;
                    if (i === 0 && page === 1 && type > 1) return;else if ((i === 0 && page !== 1 || i > 0) && type === 1) return;
                    blockNum++;
                    var $lou = $this.closest('.readtext');
                    $lou.prev('.readlou').remove().end().next('.readlou').remove().end().remove();
                }
            });
            $('.readtext fieldset:has(legend:contains("Quote:"))').each(function () {
                var $this = $(this);
                var text = $this.text();
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = Config.blockUserList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var data = _step2.value;

                        if (data.type === 1) continue;
                        try {
                            var regex1 = new RegExp('^Quote:\u5F15\u7528(\u7B2C\\d+\u697C|\u697C\u4E3B)' + data.name + '\u4E8E', 'i');
                            var regex2 = new RegExp('^Quote:\u56DE\\s*\\d+\u697C\\(' + data.name + '\\)\\s*\u7684\u5E16\u5B50', 'i');
                            if (regex1.test(text) || regex2.test(text)) {
                                $this.html('<legend>Quote:</legend><mark class="pd_custom_tips" title="\u88AB\u5C4F\u853D\u7528\u6237\uFF1A' + data.name + '">\u8BE5\u7528\u6237\u5DF2\u88AB\u5C4F\u853D</mark>');
                            }
                        } catch (ex) {}
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            });
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else if (location.pathname === '/guanjianci.php' && Config.blockUserAtTipsEnabled) {
        $('.kf_share1 > tbody > tr > td:last-child').each(function () {
            var $this = $(this);
            if (Util.inFollowOrBlockUserList($this.text(), Config.blockUserList) > -1) {
                blockNum++;
                $this.closest('tr').remove();
            }
        });
    }
    if (blockNum > 0) console.log('【屏蔽用户】共有{0}个项目被屏蔽'.replace('{0}', blockNum));
};

/**
 * 屏蔽帖子
 */
var blockThread = exports.blockThread = function blockThread() {
    if (!Config.blockThreadList.length) return;
    /**
     * 是否屏蔽帖子
     * @param {string} title 帖子标题
     * @param {string} userName 用户名
     * @param {number} fid 版块ID
     * @returns {boolean} 是否屏蔽
     */
    var isBlock = function isBlock(title, userName) {
        var fid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = Config.blockThreadList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var data = _step3.value;

                var keyWord = data.keyWord;
                var re = null;
                if (/^\/.+\/[gimy]*$/.test(keyWord)) {
                    try {
                        re = eval(keyWord);
                    } catch (ex) {
                        console.log(ex);
                        continue;
                    }
                }
                if (userName) {
                    if (data.includeUser) {
                        if (!data.includeUser.includes(userName)) continue;
                    } else if (data.excludeUser) {
                        if (!data.excludeUser.includes(userName)) continue;
                    }
                }
                if (fid) {
                    if (data.includeFid) {
                        if (!data.includeFid.includes(fid)) continue;
                    } else if (data.excludeFid) {
                        if (data.excludeFid.includes(fid)) continue;
                    }
                }
                if (re) {
                    if (re.test(title)) return true;
                } else {
                    if (title.toLowerCase().indexOf(keyWord.toLowerCase()) > -1) return true;
                }
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return false;
    };

    var num = 0;
    if (_Info2.default.isInHomePage) {
        $('.b_tit4 a, .b_tit4_1 a').each(function () {
            var $this = $(this);
            var matches = /》by：(.+)/.exec($this.attr('title'));
            var userName = '';
            if (matches) userName = matches[1];
            if (isBlock($this.text(), userName)) {
                num++;
                $this.parent('li').remove();
            }
        });
    } else if (location.pathname === '/thread.php') {
        var _ret2 = function () {
            var fid = parseInt($('input[name="f_fid"]:first').val());
            if (!fid) return {
                    v: void 0
                };
            $('.threadtit1 a[href^="read.php"]').each(function () {
                var $this = $(this);
                if (isBlock($this.text(), $this.closest('tr').find('td:last-child > a.bl').text(), fid)) {
                    num++;
                    $this.closest('tr').remove();
                }
            });
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    } else if (location.pathname === '/read.php') {
        if (Util.getCurrentThreadPage() !== 1) return;
        var $threadInfo = $('form[name="delatc"] > div:first > table > tbody');
        var title = $threadInfo.find('tr:first-child > td > span').text();
        if (!title) return;
        var $userName = $('.readidmsbottom > a, .readidmleft > a').eq(0);
        if ($userName.closest('.readtext').prev('.readlou').find('div:nth-child(2) > span:first-child').text() !== '楼主') return;
        var userName = $userName.text();
        if (!userName) return;
        var _fid2 = parseInt($('input[name="fid"]:first').val());
        if (!_fid2) return;
        if (isBlock(title, userName, _fid2)) {
            num++;
            var $lou = $userName.closest('.readtext');
            $lou.prev('.readlou').remove().end().next('.readlou').remove().end().remove();
        }
    }
    if (num > 0) console.log('【屏蔽帖子】共有{0}个帖子被屏蔽'.replace('{0}', num));
};

/**
 * 将侧边栏修改为和手机相同的平铺样式
 */
var modifySideBar = exports.modifySideBar = function modifySideBar() {
    $('#r_menu').replaceWith('\n<div id="r_menu" style="width: 140px; color: #9999ff; font-size: 14px; line-height: 24px; text-align: center; border: 1px #ddddff solid; padding: 5px; overflow: hidden;">\n  <span style="color: #ff9999;">\u6E38\u620F</span><br>\n  <a href="thread.php?fid=102">\u6E38\u620F\u63A8\u8350</a> | <a href="thread.php?fid=106">\u65B0\u4F5C\u52A8\u6001</a><br>\n  <a href="thread.php?fid=52">\u6E38\u620F\u8BA8\u8BBA</a> | <a href="thread.php?fid=24">\u7591\u96BE\u4E92\u52A9</a><br>\n  <a href="thread.php?fid=16">\u79CD\u5B50\u4E0B\u8F7D</a> | <a href="thread.php?fid=41">\u7F51\u76D8\u4E0B\u8F7D</a><br>\n  <a href="thread.php?fid=67">\u56FE\u7247\u5171\u4EAB</a> | <a href="thread.php?fid=57">\u540C\u4EBA\u6F2B\u672C</a><br>\n  <span style="color: #ff9999;">\u52A8\u6F2B\u97F3\u4E50</span><br>\n  <a href="thread.php?fid=84">\u52A8\u6F2B\u8BA8\u8BBA</a> | <a href="thread.php?fid=92">\u52A8\u753B\u5171\u4EAB</a><br>\n  <a href="thread.php?fid=127">\u6F2B\u753B\u5C0F\u8BF4</a> | <a href="thread.php?fid=68">\u97F3\u4E50\u5171\u4EAB</a><br>\n  <a href="thread.php?fid=163">LIVE\u5171\u4EAB</a>  | <a href="thread.php?fid=182">\u8F6C\u8F7D\u8D44\u6E90</a><br>\n  <span style="color: #ff9999;">\u7EFC\u5408</span><br>\n  <a href="thread.php?fid=94">\u539F\u521B\u7F8E\u56FE</a> | <a href="thread.php?fid=87">\u5B85\u7269\u4EA4\u6D41</a><br>\n  <a href="thread.php?fid=86">\u7535\u5B50\u4EA7\u54C1</a> | <a href="thread.php?fid=115">\u6587\u5B57\u4F5C\u54C1</a><br>\n  <a href="thread.php?fid=96">\u51FA\u5904\u8BA8\u8BBA</a>  | <a href="thread.php?fid=36">\u5BFB\u6C42\u8D44\u6E90</a><br>\n  <span style="color: #ff9999;">\u4EA4\u6D41</span><br>\n  <a href="thread.php?fid=5">\u81EA\u7531\u8BA8\u8BBA</a> | <a href="thread.php?fid=56">\u4E2A\u4EBA\u65E5\u8BB0</a><br>\n  <a href="thread.php?fid=98">\u65E5\u672C\u8BED\u7248</a>  | <a href="thread.php?fid=9">\u6211\u7684\u5173\u6CE8</a><br>\n  <a href="thread.php?fid=4">\u7AD9\u52A1\u7BA1\u7406</a><br>\n  <span style="color: #ff9999;">\u4E13\u7528</span><br>\n  <a href="thread.php?fid=93">\u7BA1\u7406\u7EC4\u533A</a> | <a href="thread.php?fid=59">\u539F\u521B\u7EC4\u533A</a><br>\n  <a href="/">\u8BBA\u575B\u9996\u9875</a><br>\n</div>\n');
};

/**
 * 为侧边栏添加快捷导航的链接
 */
var addFastNavForSideBar = exports.addFastNavForSideBar = function addFastNavForSideBar() {
    var $menu = $('#r_menu');
    if (!$menu.hasClass('r_cmenu')) {
        if (!Config.modifySideBarEnabled) {
            $menu.append('<a href="/">论坛首页</a><br>');
        }
        $menu.find('> a:last').before('\n<span style="color: #ff9999;">\u5FEB\u6377\u5BFC\u822A</span><br>\n<a href="guanjianci.php?gjc=' + _Info2.default.userName + '">@\u63D0\u9192</a> | <a href="personal.php?action=post">\u56DE\u590D</a> | <a href="kf_growup.php">\u7B49\u7EA7</a><br>\n<a href="kf_fw_ig_index.php">\u4E89\u593A</a> | <a href="kf_fw_ig_my.php">\u9053\u5177</a> | <a href="kf_fw_ig_shop.php">\u5546\u5E97</a><br>\n<a href="profile.php?action=modify">\u8BBE\u7F6E</a> | <a href="hack.php?H_name=bank">\u94F6\u884C</a> | <a href="profile.php?action=favor">\u6536\u85CF</a><br>\n' + _Const2.default.customTileSideBarContent + '\n');
    } else {
        $menu.find('> ul > li:last-child').before('\n<li class="r_cmenuho">\n  <a href="javascript:;">\u5FEB\u6377\u5BFC\u822A</a>\n  <ul class="r_cmenu2">\n    <li><a href="guanjianci.php?gjc=' + _Info2.default.userName + '">@\u63D0\u9192</a></li>\n    <li><a href="kf_growup.php">\u7B49\u7EA7\u7ECF\u9A8C</a></li>\n    <li><a href="kf_fw_ig_index.php">\u4E89\u593A\u5956\u52B1</a></li>\n    <li><a href="kf_fw_ig_my.php">\u6211\u7684\u9053\u5177</a></li>\n    <li><a href="kf_fw_ig_shop.php">\u9053\u5177\u5546\u5E97</a></li>\n    <li><a href="profile.php?action=modify">\u8BBE\u7F6E</a></li>\n    <li><a href="hack.php?H_name=bank">\u94F6\u884C</a></li>\n    <li><a href="profile.php?action=favor">\u6536\u85CF</a></li>\n    <li><a href="personal.php?action=post">\u6211\u7684\u56DE\u590D</a></li>\n    ' + _Const2.default.customSideBarContent + '\n  </ul>\n</li>\n');
    }
};

/**
 * 自动活期存款
 * @param {boolean} [isRead=false] 是否读取个人信息页面以获得当前所拥有KFB的信息
 */
var autoSaveCurrentDeposit = exports.autoSaveCurrentDeposit = function autoSaveCurrentDeposit(isRead) {
    if (!(Config.saveCurrentDepositAfterKfb > 0 && Config.saveCurrentDepositKfb > 0 && Config.saveCurrentDepositKfb <= Config.saveCurrentDepositAfterKfb)) return;
    var $kfb = $('a[href="kf_givemekfb.php"]');

    /**
     * 活期存款
     * @param {number} income 当前拥有的KFB
     */
    var saveCurrentDeposit = function saveCurrentDeposit(income) {
        if (income < Config.saveCurrentDepositAfterKfb) return;
        var multiple = Math.floor((income - Config.saveCurrentDepositAfterKfb) / Config.saveCurrentDepositKfb);
        if (income - Config.saveCurrentDepositKfb * multiple >= Config.saveCurrentDepositAfterKfb) multiple++;
        var money = Config.saveCurrentDepositKfb * multiple;
        if (money <= 0 || money > income) return;
        console.log('自动活期存款Start');
        $.post('hack.php?H_name=bank', { action: 'save', btype: 1, savemoney: money }, function (html) {
            showFormatLog('自动存款', html);
            if (/完成存款/.test(html)) {
                (0, _Log.push)('自动存款', '\u5171\u6709`' + money + '`KFB\u5DF2\u81EA\u52A8\u5B58\u5165\u6D3B\u671F\u5B58\u6B3E');
                console.log('\u5171\u6709' + money + 'KFB\u5DF2\u81EA\u52A8\u5B58\u5165\u6D3B\u671F\u5B58\u6B3E');
                Msg.show('\u5171\u6709<em>' + money + '</em>KFB\u5DF2\u81EA\u52A8\u5B58\u5165\u6D3B\u671F\u5B58\u6B3E');
                if (_Info2.default.isInHomePage) $kfb.text('\u62E5\u6709' + (income - money) + 'KFB');
            }
        });
    };

    if (isRead) {
        console.log('获取当前持有KFB Start');
        $.get('profile.php?action=show&uid=' + _Info2.default.uid + '&t=' + new Date().getTime(), function (html) {
            var matches = /论坛货币：(\d+)\s*KFB<br/i.exec(html);
            if (matches) saveCurrentDeposit(parseInt(matches[1]));
        });
    } else {
        var matches = /拥有(\d+)KFB/.exec($kfb.text());
        if (matches) saveCurrentDeposit(parseInt(matches[1]));
    }
};

/**
 * 执行自定义脚本
 * @param {number} type 脚本类型，1：脚本开始时执行；2：脚本结束时执行
 */
var runCustomScript = exports.runCustomScript = function runCustomScript() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    var script = '';
    if (type === 2) script = Config.customScriptEndContent;else script = Config.customScriptStartContent;
    if (script) {
        try {
            eval(script);
        } catch (ex) {
            console.log(ex);
        }
    }
};

/**
 * 更换ID颜色
 */
var changeIdColor = exports.changeIdColor = function changeIdColor() {
    if (!Config.changeAllAvailableSMColorEnabled && Config.customAutoChangeSMColorList.length <= 1) return;
    /**
     * 写入Cookie
     */
    var setCookie = function setCookie() {
        var nextTime = Util.getDate('+' + Config.autoChangeSMColorInterval + 'h');
        Util.setCookie(_Const2.default.autoChangeSMColorCookieName, nextTime.getTime(), nextTime);
    };
    console.log('自动更换ID颜色Start');
    $.get('kf_growup.php?t=' + new Date().getTime(), function (html) {
        if (Util.getCookie(_Const2.default.autoChangeSMColorCookieName)) return;
        var matches = html.match(/href="kf_growup\.php\?ok=2&safeid=\w+&color=\d+"/g);
        if (matches) {
            var _ret3 = function () {
                var safeId = '';
                var safeIdMatches = /safeid=(\w+)&/i.exec(matches[0]);
                if (safeIdMatches) safeId = safeIdMatches[1];
                if (!safeId) {
                    setCookie();
                    return {
                        v: void 0
                    };
                }

                var availableIdList = [];
                for (var i in matches) {
                    var idMatches = /color=(\d+)/i.exec(matches[i]);
                    if (idMatches) availableIdList.push(parseInt(idMatches[1]));
                }

                var idList = availableIdList;
                if (!Config.changeAllAvailableSMColorEnabled) {
                    idList = [];
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = Config.customAutoChangeSMColorList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var id = _step4.value;

                            if (availableIdList.includes(id)) idList.push(id);
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }
                }
                if (idList.length <= 1) {
                    setCookie();
                    return {
                        v: void 0
                    };
                }

                var prevId = parseInt(TmpLog.getValue(_Const2.default.prevAutoChangeSMColorIdTmpLogName));
                if (isNaN(prevId) || prevId < 0) prevId = 0;

                var nextId = 0;
                if (Config.autoChangeSMColorType.toLowerCase() === 'sequence') {
                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = idList.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var _step5$value = _slicedToArray(_step5.value, 2),
                                _i = _step5$value[0],
                                _id = _step5$value[1];

                            if (_id > prevId) {
                                nextId = _id;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError5 = true;
                        _iteratorError5 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                _iterator5.return();
                            }
                        } finally {
                            if (_didIteratorError5) {
                                throw _iteratorError5;
                            }
                        }
                    }

                    if (nextId === 0) nextId = idList[0];
                } else {
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                        for (var _iterator6 = idList.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var _step6$value = _slicedToArray(_step6.value, 2),
                                _i2 = _step6$value[0],
                                _id2 = _step6$value[1];

                            if (_id2 === prevId) {
                                idList.splice(_i2, 1);
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                _iterator6.return();
                            }
                        } finally {
                            if (_didIteratorError6) {
                                throw _iteratorError6;
                            }
                        }
                    }

                    nextId = idList[Math.floor(Math.random() * idList.length)];
                }

                $.get('kf_growup.php?ok=2&safeid=' + safeId + '&color=' + nextId + '&t=' + new Date().getTime(), function (html) {
                    setCookie();
                    showFormatLog('自动更换ID颜色', html);
                    if (/等级颜色修改完毕/.test(html)) {
                        console.log('ID颜色更换为：' + nextId);
                        TmpLog.setValue(_Const2.default.prevAutoChangeSMColorIdTmpLogName, nextId);
                    }
                });
            }();

            if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
        } else {
            setCookie();
        }
    });
};

/**
 * 显示元素的title属性提示（用于移动版浏览器）
 * @param {{}} e 点击事件
 * @param {string} title title属性
 */
var showElementTitleTips = exports.showElementTitleTips = function showElementTitleTips(e, title) {
    $('.pd_title_tips').remove();
    if (!title || !e.originalEvent) return;
    $('<div class="pd_title_tips">' + title + '</div>').appendTo('body').css('left', e.originalEvent.pageX - 20).css('top', e.originalEvent.pageY + 15);
};

/**
 * 绑定包含title属性元素的点击事件（用于移动版浏览器）
 */
var bindElementTitleClick = exports.bindElementTitleClick = function bindElementTitleClick() {
    var excludeNodeNameList = ['A', 'IMG', 'INPUT', 'BUTTON', 'TEXTAREA', 'SELECT'];
    $(document).click(function (e) {
        var target = e.target;
        if (!target.title && !excludeNodeNameList.includes(target.nodeName) && target.parentNode && target.parentNode.title) target = target.parentNode;
        if (target.title && !excludeNodeNameList.includes(target.nodeName) && (!target.id || !target.id.startsWith('wy_')) && !$(target).is('.pd_editor_btn')) {
            showElementTitleTips(e, target.title);
        } else {
            $('.pd_title_tips').remove();
        }
    });
};

/**
 * 绑定搜索类型下拉菜单点击事件
 */
var bindSearchTypeSelectMenuClick = exports.bindSearchTypeSelectMenuClick = function bindSearchTypeSelectMenuClick() {
    $(document).on('click', '.pd_search_type', function () {
        var $menu = $(this);
        var $searchTypeList = $('.pd_search_type_list');
        if ($searchTypeList.length > 0) {
            $searchTypeList.remove();
            return;
        }
        var type = $menu.data('type');
        $searchTypeList = $('<ul class="pd_search_type_list"><li>标题</li><li>作者</li><li>关键词</li><li>用户名</li></ul>').appendTo('body');
        var offset = $menu.offset();
        $searchTypeList.css('top', offset.top + $menu.height() + 2).css('left', offset.left + 1);
        if (type === 'dialog') {
            $searchTypeList.css({
                'width': '65px',
                'left': offset.left - 1
            });
        }
        $searchTypeList.on('click', 'li', function () {
            var $this = $(this);
            var type = $this.text().trim();
            var $form = $menu.closest('form');
            var $keyWord = $form.find('input[name="keyword"], input[name="pwuser"]');
            $menu.find('span').text(type);
            if (type !== '关键词' && type !== '用户名') $form.attr('action', 'search.php?');
            if (type === '作者') $keyWord.attr('name', 'pwuser');else $keyWord.attr('name', 'keyword');
            var $searchRange = $form.find('input[name="search_range"][value="current"]');
            if ($searchRange.length > 0) {
                $searchRange.prop('disabled', type === '关键词' || type === '用户名' || !$searchRange.data('enabled'));
            }
            $searchTypeList.remove();
            $keyWord.focus();
        });
    });

    $(document).on('submit', 'form[name="pd_search"]', function () {
        var $this = $(this);
        var type = $.trim($this.find('.pd_search_type > span').text());
        if (type === '关键词') {
            $this.attr('action', 'guanjianci.php?gjc=' + $this.find('input[name="keyword"]').val());
        } else if (type === '用户名') {
            $this.attr('action', 'profile.php?action=show&username=' + $this.find('input[name="keyword"]').val());
        }
    });
};

/**
 * 可使用2个字以下的关键字进行搜索
 */
var makeSearchByBelowTwoKeyWordAvailable = exports.makeSearchByBelowTwoKeyWordAvailable = function makeSearchByBelowTwoKeyWordAvailable() {
    $(document).on('submit', 'form[action="search.php?"]', function () {
        var $this = $(this);
        var $keyWord = $this.find('input[name="keyword"]');
        var $method = $this.find('input[name="method"]');
        if (!$keyWord.length || !$method.length) return;
        var keyWord = $.trim($keyWord.val());
        if (!keyWord || Util.getStrByteLen(keyWord) > 2) return;
        $keyWord.val(keyWord + ' ' + Math.floor(new Date().getTime() / 1000));
        $method.val('OR');
        setTimeout(function () {
            $keyWord.val(keyWord);
            $method.val('AND');
        }, 200);
    });
};

/**
 * 添加搜索对话框链接
 */
var addSearchDialogLink = exports.addSearchDialogLink = function addSearchDialogLink() {
    $('<span> | </span><a href="#">搜索</a>').insertAfter('.topright > a[href="message.php"]').filter('a').click(function (e) {
        e.preventDefault();
        if ($('#pd_search').length > 0) return;
        var html = '\n<div class="pd_cfg_main">\n  <input name="step" value="2" type="hidden">\n  <input name="method" value="AND" type="hidden">\n  <input name="sch_area" value="0" type="hidden">\n  <input name="s_type" value="forum" type="hidden">\n  <input name="f_fid" value="all" type="hidden">\n  <input name="orderway" value="lastpost" type="hidden">\n  <input name="asc" value="DESC" type="hidden">\n  <div style="margin-top: 15px;">\n    <input class="pd_input" name="keyword" type="search" style="float: left; width: 175px; line-height: 26px;" placeholder="\u5173\u952E\u5B57">\n    <div class="pd_search_type" data-type="dialog"><span>\u6807\u9898</span><i>\u2228</i></div>\n    <button class="indloginm" name="submit" type="submit">\u641C\u7D22</button>\n  </div>\n  <div style="margin-bottom:8px; line-height:35px;">\n    <label><input name="search_range" type="radio" value="all" checked> \u5168\u7AD9 </label>\n    <label><input name="search_range" type="radio" value="current" disabled> \u672C\u7248</label>\n  </div>\n</div>';
        var $dialog = Dialog.create('pd_search', '搜索', html);

        $dialog.closest('form').attr({
            'name': 'pd_search',
            'action': 'search.php?',
            'method': 'post',
            'target': '_blank'
        }).off('submit');

        var fid = parseInt($('input[name="f_fid"]:first, input[name="fid"]:first').val());
        if (fid) {
            $dialog.find('input[name="search_range"]').click(function () {
                var $this = $(this);
                $dialog.find('input[name="f_fid"]').val($this.val() === 'current' ? fid : 'all');
            });
            $dialog.find('input[name="search_range"][value="current"]').prop('disabled', false).data('enabled', true).click();
        }

        $dialog.keydown(function (e) {
            if (e.keyCode === 27) {
                $('.pd_search_type_list').remove();
            }
        }).find('h1 > span').click(function () {
            $('.pd_search_type_list').remove();
        });

        Dialog.show('pd_search');
        $dialog.find('input[name="keyword"]').focus();
    });
};

/**
 * 修复论坛错误代码
 */
var repairBbsErrorCode = exports.repairBbsErrorCode = function repairBbsErrorCode() {
    _Info2.default.w.is_ie = false;
    if (location.pathname === '/read.php') {
        _Info2.default.w.strlen = Util.getStrByteLen;
    }
};

/**
 * 通过左右键进行翻页
 */
var turnPageViaKeyboard = exports.turnPageViaKeyboard = function turnPageViaKeyboard() {
    $(document).keydown(function (e) {
        if (e.keyCode !== 37 && e.keyCode !== 39) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        var $page = $('.pages:first');
        var $curPage = $page.find('li > a[href="javascript:;"]');
        if (!$curPage.length) return;
        var curPage = Util.getCurrentThreadPage();
        var url = '';
        if (e.keyCode === 37) {
            if (curPage <= 1) return;
            url = $page.find('li > a:contains("上一页")').attr('href');
        } else {
            var matches = /&page=(\d+)/.exec($page.find('li:last-child > a').attr('href'));
            if (!matches) return;
            if (curPage >= parseInt(matches[1])) return;
            url = $page.find('li > a:contains("下一页")').attr('href');
        }
        if (location.pathname === '/read.php') {
            if ($.trim($('textarea[name="atc_content"]').val())) {
                if (!confirm('发帖框尚有文字，是否继续翻页？')) return;
            }
        }
        location.href = url;
    });
};

/**
 * 检查自助评分文件大小
 * @param {string} title 帖子标题
 * @param {number} ratingSize 评分大小
 * @returns {{}} 检查结果
 */
var checkRatingSize = exports.checkRatingSize = function checkRatingSize(title, ratingSize) {
    var titleSize = 0;
    var matches = title.match(/\D(\d+(?:\.\d+)?)\s?(M|G)/ig);
    if (matches) {
        for (var i = 0; i < matches.length; i++) {
            var sizeMatches = /(\d+(?:\.\d+)?)\s?(M|G)/i.exec(matches[i]);
            if (!sizeMatches) continue;
            var size = parseFloat(sizeMatches[1]);
            if (sizeMatches[2].toUpperCase() === 'G') size *= 1024;
            titleSize += size;
        }
    }

    if (!titleSize || !ratingSize) {
        return { type: -1 };
    } else if (titleSize > ratingSize * (100 + _Const2.default.ratingErrorSizePercent) / 100 + 1 || titleSize < ratingSize * (100 - _Const2.default.ratingErrorSizePercent) / 100 - 1) {
        return { type: 1, titleSize: titleSize, ratingSize: ratingSize };
    } else return { type: 0 };
};

},{"./ConfigDialog":5,"./Const":6,"./Dialog":7,"./Func":8,"./Info":10,"./Log":12,"./LogDialog":13,"./Msg":15,"./TmpLog":20,"./Util":21}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addSelfRatingLink = exports.showAttachImageOutsideSellBox = exports.parseMediaTag = exports.addMoreSmileLink = exports.addCopyCodeLink = exports.addUserMemo = exports.buyThreads = exports.addBatchBuyThreadButton = exports.handleBuyThreadBtn = exports.modifyKFOtherDomainLink = exports.addMultiQuoteButton = exports.getMultiQuoteData = exports.addStatRepliersLink = exports.showStatRepliersDialog = exports.addCopyBuyersListLink = exports.adjustThreadContentFontSize = exports.adjustThreadContentWidth = exports.modifySmColor = exports.modifyMySmColor = exports.modifyFloorSmColor = exports.fastGotoFloor = exports.addFastGotoFloorInput = exports.addFloorGotoLink = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Util = require('./Util');

var Util = _interopRequireWildcard(_Util);

var _Msg = require('./Msg');

var Msg = _interopRequireWildcard(_Msg);

var _Dialog = require('./Dialog');

var Dialog = _interopRequireWildcard(_Dialog);

var _Func = require('./Func');

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _Log = require('./Log');

var _Public = require('./Public');

var Public = _interopRequireWildcard(_Public);

var _Post = require('./Post');

var Post = _interopRequireWildcard(_Post);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * 为帖子里的每个楼层添加跳转链接
 */
var addFloorGotoLink = exports.addFloorGotoLink = function addFloorGotoLink() {
    $('.readlou > div:nth-child(2) > span').each(function () {
        var $this = $(this);
        var floorText = $this.text();
        if (!/^\d+楼$/.test(floorText)) return;
        var linkName = $this.closest('.readlou').prev().attr('name');
        if (!linkName || !/^\d+$/.test(linkName)) return;
        var url = Util.getHostNameUrl() + 'read.php?tid=' + Util.getUrlParam('tid') + '&spid=' + linkName;
        $this.html('<a class="pd_goto_link" href="' + url + '" title="\u590D\u5236\u697C\u5C42\u94FE\u63A5">' + floorText + '</a>');
        $this.find('a').click(function (e) {
            e.preventDefault();
            var $this = $(this);
            var url = $this.attr('href');
            $this.data('copy-text', url);
            if (!Util.copyText($this, '楼层链接已复制')) {
                prompt('本楼的跳转链接（请按Ctrl+C复制）：', url);
            }
        });
    });
};

/**
 * 添加快速跳转到指定楼层的输入框
 */
var addFastGotoFloorInput = exports.addFastGotoFloorInput = function addFastGotoFloorInput() {
    $('<form><li class="pd_fast_goto_floor">电梯直达 <input class="pd_input" style="width:30px" type="text" maxlength="8"> <span>楼</span></li></form>').prependTo($('.readtext:first').prev('.readlou').find('> div:first-child > ul')).submit(function (e) {
        e.preventDefault();
        var floor = parseInt($.trim($(this).find('input').val()));
        if (!floor || floor < 0) return;
        location.href = Util.getHostNameUrl + 'read.php?tid=' + Util.getUrlParam('tid') + '&page=' + (parseInt(floor / Config.perPageFloorNum) + 1) + '&floor=' + floor;
    }).find('span').click(function () {
        $(this).closest('form').submit();
    }).end().closest('div').next().css({ 'max-width': '505px', 'white-space': 'nowrap', 'overflow': 'hidden', 'text-overflow': 'ellipsis' });
};

/**
 * 将页面滚动到指定楼层
 */
var fastGotoFloor = exports.fastGotoFloor = function fastGotoFloor() {
    var floor = parseInt(Util.getUrlParam('floor'));
    if (!floor || floor < 0) return;
    var $floorNode = $('.readlou > div:nth-child(2) > span:contains("' + floor + '\u697C")');
    if (!$floorNode.length) return;
    var linkName = $floorNode.closest('.readlou').prev().attr('name');
    if (!linkName || !/^\d+$/.test(linkName)) return;
    location.hash = '#' + linkName;
};

/**
 * 修改指定楼层的神秘颜色
 * @param {jQuery} $elem 指定楼层的发帖者的用户名链接的jQuery对象
 * @param {string} color 神秘颜色
 */
var modifyFloorSmColor = exports.modifyFloorSmColor = function modifyFloorSmColor($elem, color) {
    if ($elem.is('.readidmsbottom > a')) $elem.css('color', color);
    $elem.closest('.readtext').css('border-color', color).prev('.readlou').css('border-color', color).next().next('.readlou').css('border-color', color);
};

/**
 * 修改本人的神秘颜色
 */
var modifyMySmColor = exports.modifyMySmColor = function modifyMySmColor() {
    var $my = $('.readidmsbottom > a[href="profile.php?action=show&uid=' + _Info2.default.uid + '"]');
    if (!$my.length) $my = $('.readidmleft > a[href="profile.php?action=show&uid=' + _Info2.default.uid + '"]');
    if ($my.length > 0) modifyFloorSmColor($my, Config.customMySmColor);
};

/**
 * 修改各等级神秘颜色
 */
var modifySmColor = exports.modifySmColor = function modifySmColor() {
    if (!Config.customSmColorConfigList.length) return;
    $('.readidmsbottom > a[href^="profile.php?action=show&uid="], .readidmleft > a').each(function () {
        var $this = $(this);
        var smLevel = '';
        if ($this.is('.readidmleft > a')) {
            smLevel = $this.parent().next('.readidmright').text().toUpperCase();
            if (!/(-?\d+|MAX)/i.test(smLevel)) return;
        } else {
            var matches = /(-?\d+|MAX)级神秘/i.exec($this.parent().contents().last().text());
            if (!matches) return;
            smLevel = matches[1].toUpperCase();
        }
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Config.customSmColorConfigList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _step.value,
                    min = _step$value.min,
                    max = _step$value.max,
                    color = _step$value.color;

                if (Util.compareSmLevel(smLevel, min) >= 0 && Util.compareSmLevel(smLevel, max) <= 0) {
                    modifyFloorSmColor($this, color);
                    break;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    });
};

/**
 * 调整帖子内容宽度，使其保持一致
 */
var adjustThreadContentWidth = exports.adjustThreadContentWidth = function adjustThreadContentWidth() {
    $('head').append('\n<style>\n  .readtext > table > tbody > tr > td { padding-left: 192px; }\n  .readidms, .readidm { margin-left: -192px !important; }\n</style>\n');
};

/**
 * 调整帖子内容字体大小
 */
var adjustThreadContentFontSize = exports.adjustThreadContentFontSize = function adjustThreadContentFontSize() {
    if (Config.threadContentFontSize > 0 && Config.threadContentFontSize !== 12) {
        $('head').append('\n<style>\n  .readtext td { font-size: ' + Config.threadContentFontSize + 'px; line-height: 1.6em; }\n  .readtext td > div, .readtext td > .read_fds { font-size: 12px; }\n</style>\n');
    }
};

/**
 * 添加复制购买人名单的链接
 */
var addCopyBuyersListLink = exports.addCopyBuyersListLink = function addCopyBuyersListLink() {
    $('<a style="margin:0 2px 0 5px;" href="#">复制名单</a>').insertAfter('.readtext select[name="buyers"]').click(function (e) {
        e.preventDefault();
        var buyerList = [];
        $(this).prev('select').children('option').each(function (index) {
            var name = $(this).text();
            if (!index || name === '-'.repeat(11)) return;
            buyerList.push(name);
        });
        if (!buyerList.length) {
            alert('暂时无人购买');
            return;
        }
        if ($('#pd_copy_buyer_list').length > 0) return;
        var html = '\n<div class="pd_cfg_main">\n  <textarea style="width: 200px; height: 300px; margin: 5px 0;" readonly></textarea>\n</div>';
        var $dialog = Dialog.create('pd_copy_buyer_list', '购买人名单', html);
        Dialog.show('pd_copy_buyer_list');
        $dialog.find('textarea').val(buyerList.join('\n')).select().focus();
    });
};

/**
 * 显示统计回帖者名单对话框
 * @param {string[]} replierList 回帖者名单列表
 */
var showStatRepliersDialog = exports.showStatRepliersDialog = function showStatRepliersDialog(replierList) {
    var html = '\n<div class="pd_cfg_main">\n  <div id="pd_replier_list_filter" style="margin-top: 5px;">\n    <label><input type="checkbox" checked>\u663E\u793A\u697C\u5C42\u53F7</label>\n    <label><input type="checkbox">\u53BB\u9664\u91CD\u590D</label>\n    <label><input type="checkbox">\u53BB\u9664\u697C\u4E3B</label>\n  </div>\n  <div style="color: #ff0000;" id="pd_replier_list_stat"></div>\n  <textarea style="width: 250px; height: 300px; margin: 5px 0;" readonly></textarea>\n</div>';
    var $dialog = Dialog.create('pd_replier_list', '回帖者名单', html);

    var $filterNodes = $dialog.find('#pd_replier_list_filter input');
    $filterNodes.click(function () {
        var list = [].concat(_toConsumableArray(replierList));
        var isShowFloor = $filterNodes.eq(0).prop('checked'),
            isRemoveRepeated = $filterNodes.eq(1).prop('checked'),
            isRemoveTopFloor = $filterNodes.eq(2).prop('checked');
        if (isRemoveRepeated) {
            list = list.map(function (elem, index, list) {
                return list.indexOf(elem) === index ? elem : null;
            });
        }
        if (isRemoveTopFloor) {
            (function () {
                var topFloor = $('.readtext:first').find('.readidmsbottom, .readidmleft').find('a').text();
                list = list.map(function (elem) {
                    return elem !== topFloor ? elem : null;
                });
            })();
        }
        var content = '';
        var num = 0;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = list.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _step2$value = _slicedToArray(_step2.value, 2),
                    floor = _step2$value[0],
                    userName = _step2$value[1];

                if (!userName) continue;
                content += (isShowFloor ? floor + 'L：' : '') + userName + '\n';
                num++;
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        $dialog.find('textarea').val(content);
        $('#pd_replier_list_stat').html('\u5171\u6709<b>' + num + '</b>\u6761\u9879\u76EE');
    });
    $dialog.find('#pd_replier_list_filter input:first').triggerHandler('click');

    Dialog.show('pd_replier_list');
    $dialog.find('input:first').focus();
};

/**
 * 添加统计回帖者名单的链接
 */
var addStatRepliersLink = exports.addStatRepliersLink = function addStatRepliersLink() {
    if (Util.getCurrentThreadPage() !== 1) return;
    $('<li><a href="#" title="统计回帖者名单">[统计回帖]</a></li>').prependTo('.readtext:first + .readlou > div > .pages').find('a').click(function (e) {
        e.preventDefault();
        if ($('#pd_replier_list').length > 0) return;

        var tid = Util.getUrlParam('tid');
        if (!tid) return;
        var value = $.trim(prompt('统计到第几楼？（0表示统计所有楼层，可用m-n的方式来设定统计楼层的区间范围）', 0));
        if (value === '') return;
        if (!/^\d+(-\d+)?$/.test(value)) {
            alert('统计楼层格式不正确');
            return;
        }
        var startFloor = 0,
            endFloor = 0;
        var valueArr = value.split('-');
        if (valueArr.length === 2) {
            startFloor = parseInt(valueArr[0]);
            endFloor = parseInt(valueArr[1]);
        } else endFloor = parseInt(valueArr[0]);
        if (endFloor < startFloor) {
            alert('统计楼层格式不正确');
            return;
        }
        var matches = /(\d+)页/.exec($('.pages:eq(0) > li:last-child > a').text());
        var maxPage = matches ? parseInt(matches[1]) : 1;
        if (startFloor === 0) startFloor = 1;
        if (endFloor === 0) endFloor = maxPage * Config.perPageFloorNum - 1;
        var startPage = Math.floor(startFloor / Config.perPageFloorNum) + 1;
        var endPage = Math.floor(endFloor / Config.perPageFloorNum) + 1;
        if (endPage > maxPage) endPage = maxPage;
        if (endPage - startPage > _Const2.default.statRepliersMaxPage) {
            alert('需访问的总页数不可超过' + _Const2.default.statRepliersMaxPage);
            return;
        }

        Msg.wait('<strong>\u6B63\u5728\u7EDF\u8BA1\u56DE\u5E16\u540D\u5355\u4E2D&hellip;</strong><i>\u5269\u4F59\u9875\u6570\uFF1A<em id="pd_remaining_num">' + (endPage - startPage + 1) + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
        var isStop = false;
        $(document).clearQueue('StatRepliers');
        var replierList = [];
        $.each(new Array(endPage), function (index) {
            if (index + 1 < startPage) return;
            $(document).queue('StatRepliers', function () {
                $.ajax({
                    type: 'GET',
                    url: 'read.php?tid=' + tid + '&page=' + (index + 1) + '&t=' + new Date().getTime(),
                    timeout: _Const2.default.defAjaxTimeout,
                    success: function success(html) {
                        var matches = html.match(/<span style=".+?">\d+楼<\/span> <span style=".+?">(.|\n|\r\n)+?<a href="profile\.php\?action=show&uid=\d+" target="_blank" style=".+?">.+?<\/a>/gi);
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = matches[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var match = _step3.value;

                                var floorMatches = /<span style=".+?">(\d+)楼<\/span>(?:.|\n|\r\n)+?<a href="profile\.php\?action=show&uid=\d+".+?>(.+?)<\/a>/i.exec(match);
                                if (!floorMatches) continue;
                                var floor = parseInt(floorMatches[1]);
                                if (floor < startFloor) continue;
                                if (floor > endFloor) {
                                    isStop = true;
                                    break;
                                }
                                replierList[floor] = floorMatches[2];
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }
                    },
                    error: function error() {
                        isStop = true;
                        alert('因连接超时，统计回帖名单操作中止');
                    },
                    complete: function complete() {
                        var $remainingNum = $('#pd_remaining_num');
                        $remainingNum.text(parseInt($remainingNum.text()) - 1);
                        isStop = isStop || $remainingNum.closest('.pd_msg').data('stop');
                        if (isStop) $(document).clearQueue('StatRepliers');

                        if (isStop || index === endPage - 1) {
                            Msg.destroy();
                            showStatRepliersDialog(replierList);
                        } else {
                            setTimeout(function () {
                                return $(document).dequeue('StatRepliers');
                            }, _Const2.default.defAjaxInterval);
                        }
                    }
                });
            });
        });
        $(document).dequeue('StatRepliers');
    });
};

/**
 * 获取多重引用数据
 * @returns {Object[]} 多重引用数据列表
 */
var getMultiQuoteData = exports.getMultiQuoteData = function getMultiQuoteData() {
    var quoteList = [];
    $('.pd_multi_quote_chk input:checked').each(function () {
        var $readLou = $(this).closest('.readlou');
        var matches = /(\d+)楼/.exec($readLou.find('.pd_goto_link').text());
        var floor = matches ? parseInt(matches[1]) : 0;
        var pid = $readLou.prev('a').attr('name');
        var userName = $readLou.next('.readtext').find('.readidmsbottom > a, .readidmleft > a').text();
        if (!userName) return;
        quoteList.push({ floor: floor, pid: pid, userName: userName });
    });
    return quoteList;
};

/**
 * 添加多重回复和多重引用的按钮
 */
var addMultiQuoteButton = exports.addMultiQuoteButton = function addMultiQuoteButton() {
    var replyUrl = $('a[href^="post.php?action=reply"].b_tit2').attr('href');
    if (!replyUrl) return;
    $('<li class="pd_multi_quote_chk"><label title="多重引用"><input type="checkbox"> 引</label></li>').prependTo($('.readlou > div:first-child > ul').has('a[title="引用回复这个帖子"]')).find('input').click(function () {
        var tid = parseInt(Util.getUrlParam('tid'));
        var data = localStorage[_Const2.default.multiQuoteStorageName];
        if (data) {
            try {
                data = JSON.parse(data);
                if (!data || $.type(data) !== 'object' || $.isEmptyObject(data)) data = null;else if (typeof data.tid === 'undefined' || data.tid !== tid || !Array.isArray(data.quoteList)) data = null;
            } catch (ex) {
                data = null;
            }
        } else {
            data = null;
        }
        var quoteList = getMultiQuoteData();
        if (!data) {
            localStorage.removeItem(_Const2.default.multiQuoteStorageName);
            data = { tid: tid, quoteList: [] };
        }
        var page = Util.getCurrentThreadPage();
        if (quoteList.length > 0) data.quoteList[page] = quoteList;else delete data.quoteList[page];
        localStorage[_Const2.default.multiQuoteStorageName] = JSON.stringify(data);
    });
    $('.readlou:last').next('div').find('table > tbody > tr > td:last-child').css({ 'text-align': 'right', 'width': '320px' }).append('<span class="b_tit2" style="margin-left: 5px;"><a style="display: inline-block;" href="#" title="\u591A\u91CD\u56DE\u590D">\u56DE\u590D</a> ' + ('<a style="display: inline-block;" href="' + replyUrl + '&multiquote=1" title="\u591A\u91CD\u5F15\u7528">\u5F15\u7528</a></span>')).find('.b_tit2 > a:eq(0)').click(function (e) {
        e.preventDefault();
        Post.handleMultiQuote(1);
    });
};

/**
 * 将帖子和短消息中的绯月其它域名的链接修改为当前域名
 */
var modifyKFOtherDomainLink = exports.modifyKFOtherDomainLink = function modifyKFOtherDomainLink() {
    $('.readtext a, .thread2 a').each(function () {
        var $this = $(this);
        var url = $this.attr('href');
        if (/m\.miaola\.info\//i.test(url)) return;
        var matches = /^(https?:\/\/(?:[\w\.]+?\.)?(?:2dgal|ddgal|9gal|9baka|9moe|kfgal|2dkf|miaola|kfer)\.\w+?\/).+/i.exec(url);
        if (matches) $this.attr('href', url.replace(matches[1], Util.getHostNameUrl()));
    });
};

/**
 * 处理购买帖子按钮
 */
var handleBuyThreadBtn = exports.handleBuyThreadBtn = function handleBuyThreadBtn() {
    $('.readtext input[type="button"][value="愿意购买,支付KFB"]').each(function () {
        var $this = $(this);
        var matches = /此帖售价\s*(\d+)\s*KFB/i.exec($this.closest('legend').contents().eq(0).text());
        if (!matches) return;
        var sell = parseInt(matches[1]);
        matches = /location\.href="(.+?)"/i.exec($this.attr('onclick'));
        if (!matches) return;
        $this.data('sell', sell).data('url', matches[1]).removeAttr('onclick').click(function (e) {
            e.preventDefault();
            var $this = $(this);
            var sell = $this.data('sell');
            var url = $this.data('url');
            if (!sell || !url) return;
            if (sell >= _Const2.default.minBuyThreadWarningSell && !confirm('\u6B64\u8D34\u552E\u4EF7' + sell + 'KFB\uFF0C\u662F\u5426\u8D2D\u4E70\uFF1F')) return;
            if (Config.buyThreadViaAjaxEnabled) {
                (function () {
                    var $wait = Msg.wait('正在购买帖子&hellip;');
                    $.get(url, function (html) {
                        Msg.remove($wait);
                        if (/操作完成/.test(html)) {
                            location.reload();
                        } else if (/您已经购买此帖/.test(html)) {
                            alert('你已经购买过此帖');
                            location.reload();
                        } else {
                            alert('帖子购买失败');
                        }
                    });
                })();
            } else location.href = url;
        });
    });
};

/**
 * 添加批量购买帖子的按钮
 */
var addBatchBuyThreadButton = exports.addBatchBuyThreadButton = function addBatchBuyThreadButton() {
    var $btns = $('.readtext input[type="button"][value="愿意购买,支付KFB"]');
    if ($btns.length === 0) return;
    $btns.each(function () {
        var $this = $(this);
        var sell = $this.data('sell');
        var url = $this.data('url');
        if (!sell || !url) return;
        $this.after('<input class="pd_buy_thread" style="margin-left: 10px; vertical-align: middle;" type="checkbox" data-sell="' + sell + '" data-url="' + url + '">');
    });
    $('<span style="margin: 0 5px;">|</span><a class="pd_buy_thread_btn" title="批量购买所选帖子" href="#">批量购买</a>').insertAfter('td > a[href^="kf_tidfavor.php?action=favor&tid="]').filter('a').click(function (e) {
        e.preventDefault();
        Msg.destroy();
        var threadList = [];
        var totalSell = 0;
        $('.pd_buy_thread:checked').each(function () {
            var $this = $(this);
            var url = $this.data('url');
            var sell = parseInt($this.data('sell'));
            if (url && !isNaN(sell)) {
                threadList.push({ url: url, sell: sell });
                totalSell += sell;
            }
        });
        if (!threadList.length) {
            alert('请选择要购买的帖子');
            return;
        }
        if (confirm('\u4F60\u5171\u9009\u62E9\u4E86' + threadList.length + '\u4E2A\u5E16\u5B50\uFF0C\u603B\u552E\u4EF7' + totalSell.toLocaleString() + 'KFB\uFF0C' + ('\u5747\u4EF7' + Util.getFixedNumberLocaleString(totalSell / threadList.length, 2) + 'KFB\uFF0C\u662F\u5426\u6279\u91CF\u8D2D\u4E70\uFF1F'))) {
            Msg.wait('<strong>\u6B63\u5728\u8D2D\u4E70\u5E16\u5B50\u4E2D&hellip;</strong><i>\u5269\u4F59\uFF1A<em id="pd_remaining_num">' + threadList.length + '</em></i>' + '<a class="pd_stop_action" href="#">\u505C\u6B62\u64CD\u4F5C</a>');
            buyThreads(threadList);
        }
    }).parent().mouseenter(function () {
        $('<span style="margin-left: 5px;">[<a href="#">全选</a><a style="margin-left: 5px;" href="#">反选</a>]</span>').insertAfter($(this).find('.pd_buy_thread_btn')).find('a:first').click(function (e) {
            e.preventDefault();
            var $buyThread = $('.pd_buy_thread');
            $buyThread.prop('checked', true);
            alert('\u5171\u9009\u62E9\u4E86' + $buyThread.length + '\u9879');
        }).next('a').click(function (e) {
            e.preventDefault();
            var totalNum = 0;
            $('.pd_buy_thread').each(function () {
                var $this = $(this);
                $this.prop('checked', !$this.prop('checked'));
                if ($this.prop('checked')) totalNum++;
            });
            alert('\u5171\u9009\u62E9\u4E86' + totalNum + '\u9879');
        });
    }).mouseleave(function () {
        $(this).find('.pd_buy_thread_btn').next('span').remove();
    });
};

/**
 * 购买指定的一系列帖子
 * @param {Object[]} threadList 购买帖子列表，threadList[n][url]：购买帖子的URL；threadList[n][sell]：购买帖子的售价
 */
var buyThreads = exports.buyThreads = function buyThreads(threadList) {
    var successNum = 0,
        failNum = 0,
        totalSell = 0;
    $(document).clearQueue('BuyThreads');
    $.each(threadList, function (index, thread) {
        $(document).queue('BuyThreads', function () {
            $.ajax({
                type: 'GET',
                url: thread.url + '&t=' + new Date().getTime(),
                timeout: _Const2.default.defAjaxTimeout,
                success: function success(html) {
                    Public.showFormatLog('购买帖子', html);
                    if (/操作完成/.test(html)) {
                        successNum++;
                        totalSell += thread.sell;
                    } else failNum++;
                },
                error: function error() {
                    failNum++;
                },
                complete: function complete() {
                    var $remainingNum = $('#pd_remaining_num');
                    $remainingNum.text(parseInt($remainingNum.text()) - 1);
                    var isStop = $remainingNum.closest('.pd_msg').data('stop');
                    if (isStop) $(document).clearQueue('BuyThreads');

                    if (isStop || index === threadList.length - 1) {
                        Msg.destroy();
                        if (successNum > 0) {
                            (0, _Log.push)('购买帖子', '\u5171\u6709`' + successNum + '`\u4E2A\u5E16\u5B50\u8D2D\u4E70\u6210\u529F', { pay: { 'KFB': -totalSell } });
                        }
                        console.log('\u5171\u6709' + successNum + '\u4E2A\u5E16\u5B50\u8D2D\u4E70\u6210\u529F\uFF0C\u5171\u6709' + failNum + '\u4E2A\u5E16\u5B50\u8D2D\u4E70\u5931\u8D25\uFF0CKFB-' + totalSell);
                        Msg.show('<strong>\u5171\u6709<em>' + successNum + '</em>\u4E2A\u5E16\u5B50\u8D2D\u4E70\u6210\u529F' + (failNum > 0 ? '\uFF0C\u5171\u6709<em>' + failNum + '</em>\u4E2A\u5E16\u5B50\u8D2D\u4E70\u5931\u8D25' : '') + '</strong>' + ('<i>KFB<ins>-' + totalSell + '</ins></i>'), -1);
                        (0, _Func.run)('Read.buyThreads_after_', threadList);
                    } else {
                        setTimeout(function () {
                            return $(document).dequeue('BuyThreads');
                        }, _Const2.default.defAjaxInterval);
                    }
                }
            });
        });
    });
    $(document).dequeue('BuyThreads');
};

/**
 * 添加用户自定义备注
 */
var addUserMemo = exports.addUserMemo = function addUserMemo() {
    if ($.isEmptyObject(Config.userMemoList)) return;
    $('.readidmsbottom > a[href^="profile.php?action=show&uid="], .readidmleft > a').each(function () {
        var $this = $(this);
        var userName = $this.text().trim();
        var memo = '';
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = Object.keys(Config.userMemoList)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var name = _step4.value;

                if (name === userName) {
                    memo = Config.userMemoList[name];
                    break;
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        if (!memo) return;
        if ($this.is('.readidmleft > a')) {
            $this.after('<span class="pd_user_memo_tips" title="\u5907\u6CE8\uFF1A' + memo + '">[?]</span>');
        } else {
            var memoText = memo;
            var maxLength = 24;
            if (memo.length > maxLength) memoText = memoText.substring(0, maxLength) + '&hellip;';
            $this.after('<br><span class="pd_user_memo" title="\u5907\u6CE8\uFF1A' + memo + '">(' + memoText + ')</span>');
        }
    });
};

/**
 * 添加复制代码的链接
 */
var addCopyCodeLink = exports.addCopyCodeLink = function addCopyCodeLink() {
    $('.readtext fieldset > legend:contains("Copy code")').html('<a class="pd_copy_code" href="#">复制代码</a>');
    if (!$('.pd_copy_code').length) return;
    $('#alldiv').on('click', 'a.pd_copy_code', function (e) {
        e.preventDefault();
        var $this = $(this);
        var $fieldset = $this.closest('fieldset');
        if (Util.copyText($fieldset, '代码已复制', $this.parent())) return;

        var content = $fieldset.data('content');
        if (content) {
            $fieldset.html('<legend><a class="pd_copy_code" href="#">复制代码</a></legend>' + content).removeData('content');
        } else {
            var html = $fieldset.html();
            html = html.replace(/<legend>.+?<\/legend>/i, '');
            $fieldset.data('content', html);
            html = Util.htmlDecode(html);
            var height = $fieldset.height();
            height -= 17;
            if (height < 50) height = 50;
            if (height > 540) height = 540;
            $fieldset.html('\n<legend><a class="pd_copy_code" href="#">\u8FD8\u539F\u4EE3\u7801</a></legend>\n<textarea wrap="off" class="pd_textarea" style="width: 100%; height: ' + height + 'px; line-height: 1.4em; white-space: pre;">' + html + '</textarea>\n');
            $fieldset.find('textarea').select().focus();
        }
    });
};

/**
 * 在帖子页面添加更多表情的链接
 */
var addMoreSmileLink = exports.addMoreSmileLink = function addMoreSmileLink() {
    /**
     * 添加表情代码
     * @param {string} id 表情ID
     */
    var addSmileCode = function addSmileCode(id) {
        var textArea = $('textarea[name="atc_content"]').get(0);
        if (!textArea) return;
        var code = '[s:' + id + ']';
        Util.addCode(textArea, code);
        if (_Info2.default.isMobile) textArea.blur();else textArea.focus();
    };

    var $parent = $('input[name="diy_guanjianci"]').parent();
    $parent.on('click', 'a[href="javascript:;"]', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        if (id) addSmileCode(id);
    }).find('a[onclick^="javascript:addsmile"]').each(function () {
        var $this = $(this);
        var matches = /addsmile\((\d+)\)/i.exec($this.attr('onclick'));
        if (matches) {
            $this.data('id', matches[1]).removeAttr('onclick').attr('href', 'javascript:;');
        }
    });

    $('<a class="pd_highlight" href="#">[更多]</a>').appendTo($parent).click(function (e) {
        e.preventDefault();
        var $this = $(this);
        var $panel = $('#pd_smile_panel');
        if ($panel.length > 0) {
            $this.text('[更多]');
            $panel.remove();
            return;
        }
        $this.text('[关闭]');

        var smileImageIdList = ['48', '35', '34', '33', '32', '31', '30', '29', '28', '27', '26', '36', '37', '47', '46', '45', '44', '43', '42', '41', '40', '39', '38', '25', '24', '11', '10', '09', '08', '01', '02', '03', '04', '05', '06', '12', '13', '23', '22', '21', '20', '19', '18', '17', '16', '15', '14', '07'];
        var smileCodeIdList = [57, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 45, 46, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 34, 33, 20, 19, 18, 17, 10, 11, 12, 13, 14, 15, 21, 22, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 16];
        var html = '';
        for (var i = 0; i < smileImageIdList.length; i++) {
            html += '<img src="' + _Info2.default.w.imgpath + '/post/smile/em/em' + smileImageIdList[i] + '.gif" alt="[\u8868\u60C5]" data-id="' + smileCodeIdList[i] + '">';
        }
        html = '<div class="pd_panel" id="pd_smile_panel" style="width: 308px; height: 185px;">' + html + '</div>';

        var offset = $parent.offset();
        $panel = $(html).appendTo('body');
        $panel.css('top', offset.top + $parent.height() + 4).css('left', offset.left + $parent.width() - $panel.width() + 9).on('click', 'img', function () {
            var id = $(this).data('id');
            if (id) addSmileCode(id);
        });
        (0, _Func.run)('Read.addMoreSmileLink_after_click_');
    });
};

/**
 * 在帖子页面解析多媒体标签
 */
var parseMediaTag = exports.parseMediaTag = function parseMediaTag() {
    $('.readtext > table > tbody > tr > td').each(function () {
        var $this = $(this);
        var html = $this.html();
        if (/\[(audio|video)\](http|ftp)[^<>]+\[\/(audio|video)\]/.test(html)) {
            $this.html(html.replace(/\[audio\]((?:http|ftp)[^<>]+?)\[\/audio\](?!<\/fieldset>)/g, '<audio src="$1" controls preload="none" style="margin:3px 0;">[你的浏览器不支持audio标签]</audio>').replace(/\[video\]((?:http|ftp)[^<>]+?)\[\/video\](?!<\/fieldset>)/g, '<video src="$1" controls preload="none" style="max-width: ' + (Config.adjustThreadContentWidthEnabled ? 627 : 820) + 'px; margin:3px 0;">' + '[\u4F60\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301video\u6807\u7B7E]</video>'));
        }
    });
};

/**
 * 显示在购买框之外的附件图片
 */
var showAttachImageOutsideSellBox = exports.showAttachImageOutsideSellBox = function showAttachImageOutsideSellBox() {
    $('.readtext > table > tbody > tr > td').each(function () {
        var $this = $(this);
        var html = $this.html();
        if (/\[attachment=\d+\]/.test(html)) {
            var pid = $this.closest('.readtext').prev('.readlou').prev('a').attr('name');
            var tid = Util.getUrlParam('tid');
            $this.html(html.replace(/\[attachment=(\d+)\]/g, '<img src="job.php?action=download&pid=' + pid + '&tid=' + tid + '&aid=$1" alt="[\u9644\u4EF6\u56FE\u7247]" style="max-width:550px" ' + ('onclick="if(this.width>=550) window.open(\'job.php?action=download&pid=' + pid + '&tid=' + tid + '&aid=$1\');">')));
        }
    });
};

/**
 * 在帖子页面添加自助评分链接
 */
var addSelfRatingLink = exports.addSelfRatingLink = function addSelfRatingLink() {
    var fid = parseInt($('input[name="fid"]:first').val());
    if (!fid || !_Const2.default.selfRatingFidList.includes(fid)) return;
    var tid = parseInt($('input[name="tid"]:first').val());
    var safeId = Public.getSafeId();
    if (!safeId || !tid) return;
    if ($('.readtext:first fieldset legend:contains("本帖最近评分记录")').length > 0) return;
    $('a[href^="kf_tidfavor.php?action=favor"]').after('<span style="margin: 0 5px;">|</span><a href="kf_fw_1wkfb.php?do=1&safeid=' + safeId + '&ptid=' + tid + '" title="\u4EC5\u9650\u81EA\u52A9\u8BC4\u5206\u6D4B\u8BD5\u4EBA\u5458\u4F7F\u7528">\u81EA\u52A9\u8BC4\u5206</a>');
};

},{"./Const":6,"./Dialog":7,"./Func":8,"./Info":10,"./Log":12,"./Msg":15,"./Post":17,"./Public":18,"./Util":21}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteValue = exports.setValue = exports.getValue = exports.clear = exports.write = exports.read = undefined;

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 保存临时日志的键值名称
var name = 'pd_tmp_log';
// 临时日志对象
var log = {};

/**
 * 读取临时日志
 */
var read = exports.read = function read() {
    log = {};
    var options = null;
    if (_Info2.default.storageType === 'ByUid' || _Info2.default.storageType === 'Global') options = GM_getValue(name + '_' + _Info2.default.uid);else options = localStorage.getItem(name + '_' + _Info2.default.uid);
    if (!options) return;
    try {
        options = JSON.parse(options);
    } catch (ex) {
        return;
    }
    if (!options || $.type(options) !== 'object') return;
    var allowKeys = [];
    for (var k in _Const2.default) {
        if (k.endsWith('TmpLogName')) allowKeys.push(_Const2.default[k]);
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(options)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _k = _step.value;

            if (!allowKeys.includes(_k)) delete options[_k];
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    log = options;
};

/**
 * 写入临时日志
 */
var write = exports.write = function write() {
    if (_Info2.default.storageType === 'ByUid' || _Info2.default.storageType === 'Global') GM_setValue(name + '_' + _Info2.default.uid, JSON.stringify(log));else localStorage.setItem(name + '_' + _Info2.default.uid, JSON.stringify(log));
};

/**
 * 清除临时日志
 */
var clear = exports.clear = function clear() {
    if (_Info2.default.storageType === 'ByUid' || _Info2.default.storageType === 'Global') GM_deleteValue(name + '_' + _Info2.default.uid);else localStorage.removeItem(name + '_' + _Info2.default.uid);
};

/**
 * 获取指定名称的临时日志内容
 * @param {string} key 日志名称
 * @returns {*} 日志内容
 */
var getValue = exports.getValue = function getValue(key) {
    read();
    return key in log ? log[key] : null;
};

/**
 * 设置指定名称的临时日志内容
 * @param {string} key 日志名称
 * @param {*} value 日志内容
 */
var setValue = exports.setValue = function setValue(key, value) {
    read();
    log[key] = value;
    write();
};

/**
 * 删除指定名称的临时日志
 * @param {string} key 日志名称
 */
var deleteValue = exports.deleteValue = function deleteValue(key) {
    read();
    if (key in log) {
        delete log[key];
        write();
    }
};

},{"./Const":6,"./Info":10}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.inFollowOrBlockUserList = exports.entries = exports.getResponseMsg = exports.copyText = exports.getSelText = exports.addCode = exports.getStrByteLen = exports.getRemoveUnpairedBBCodeQuoteContent = exports.getFixedNumberLocaleString = exports.getCurrentThreadPage = exports.compareSmLevel = exports.isEdge = exports.isOpera = exports.getStatFormatNumber = exports.getSortedObjectKeyList = exports.getObjectKeyList = exports.htmlDecode = exports.htmlEncode = exports.getGBKEncodeString = exports.getUrlParam = exports.deepEqual = exports.getDifferenceSetOfObject = exports.getHostNameUrl = exports.isBetweenInTimeRange = exports.getTimeDiffInfo = exports.getTimeString = exports.getDateString = exports.getDate = exports.getMidnightHourDate = exports.getTimezoneDateByTime = exports.getDateByTime = exports.deleteCookie = exports.getCookie = exports.setCookie = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 设置Cookie
 * @param {string} name Cookie名称
 * @param {*} value Cookie值
 * @param {?Date} date Cookie有效期，留空则表示有效期为浏览器进程
 * @param {string} prefix Cookie名称前缀
 */
var setCookie = exports.setCookie = function setCookie(name, value) {
    var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Info2.default.uid + '_';

    document.cookie = '' + prefix + name + '=' + encodeURI(value) + (!date ? '' : ';expires=' + date.toUTCString()) + ';path=/;';
};

/**
 * 获取Cookie
 * @param {string} name Cookie名称
 * @param {string} prefix Cookie名称前缀
 * @returns {?string} Cookie值
 */
var getCookie = exports.getCookie = function getCookie(name) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Info2.default.uid + '_';

    var regex = new RegExp('(^| )' + prefix + name + '=([^;]*)(;|$)');
    var matches = document.cookie.match(regex);
    if (!matches) return null;else return decodeURI(matches[2]);
};

/**
 * 删除Cookie
 * @param {string} name Cookie名称
 * @param {string} prefix Cookie名称前缀
 */
var deleteCookie = exports.deleteCookie = function deleteCookie(name) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Info2.default.uid + '_';

    document.cookie = '' + prefix + name + '=;expires=' + getDate('-1d').toUTCString() + ';path=/;';
};

/**
 * 返回当天指定时间的Date对象
 * @param {string} time 指定的时间（例：22:30:00）
 * @returns {Date} 指定时间的Date对象
 */
var getDateByTime = exports.getDateByTime = function getDateByTime(time) {
    var date = new Date();
    var timeArr = time.split(':');
    if (timeArr[0]) date.setHours(parseInt(timeArr[0]));
    if (timeArr[1]) date.setMinutes(parseInt(timeArr[1]));
    if (timeArr[2]) date.setSeconds(parseInt(timeArr[2]));
    date.setMilliseconds(0);
    return date;
};

/**
 * 返回当天根据指定时区指定时间的Date对象
 * @param {string} time 指定的时间（例：22:30:00）
 * @param {number} timezoneOffset UTC时间与本地时间之间的时间差（例：东8区为-8）
 * @returns {Date} 指定时间的Date对象
 */
var getTimezoneDateByTime = exports.getTimezoneDateByTime = function getTimezoneDateByTime(time) {
    var timezoneOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Const2.default.forumTimezoneOffset;

    var date = new Date();
    var timeArr = time.split(':');
    if (timeArr[0]) date.setUTCHours(parseInt(timeArr[0]) + timezoneOffset);
    if (timeArr[1]) date.setUTCMinutes(parseInt(timeArr[1]));
    if (timeArr[2]) date.setUTCSeconds(parseInt(timeArr[2]));
    date.setUTCMilliseconds(0);
    var now = new Date();
    if (now.getDate() > date.getDate() || now.getMonth() > date.getMonth() || now.getFullYear() > date.getFullYear()) {
        date.setDate(date.getDate() + 1);
    }
    return date;
};

/**
 * 获取距今N天的零时整点的Date对象
 * @param {number} days 距今的天数
 * @returns {Date} 距今N天的零时整点的Date对象
 */
var getMidnightHourDate = exports.getMidnightHourDate = function getMidnightHourDate(days) {
    var date = getDateByTime('00:00:00');
    date.setDate(date.getDate() + days);
    return date;
};

/**
 * 获取在当前时间的基础上的指定（相对）时间量的Date对象
 * @param {string} value 指定（相对）时间量，+或-：之后或之前（相对于当前时间）；无符号：绝对值；Y：完整年份；y：年；M：月；d：天；h：小时；m：分；s：秒；ms：毫秒
 * @returns {?Date} 指定（相对）时间量的Date对象
 * @example
 * getDate('+2y') 获取2年后的Date对象
 * getDate('+3M') 获取3个月后的Date对象
 * getDate('-4d') 获取4天前的Date对象
 * getDate('5h') 获取今天5点的Date对象（其它时间量与当前时间一致）
 * getDate('2015Y') 获取年份为2015年的Date对象
 */
var getDate = exports.getDate = function getDate(value) {
    var date = new Date();
    var matches = /^(-|\+)?(\d+)([a-zA-Z]{1,2})$/.exec(value);
    if (!matches) return null;
    var flag = typeof matches[1] === 'undefined' ? 0 : matches[1] === '+' ? 1 : -1;
    var increment = flag === -1 ? -parseInt(matches[2]) : parseInt(matches[2]);
    var unit = matches[3];
    switch (unit) {
        case 'Y':
            date.setFullYear(increment);
            break;
        case 'y':
            date.setFullYear(flag === 0 ? increment : date.getFullYear() + increment);
            break;
        case 'M':
            date.setMonth(flag === 0 ? increment : date.getMonth() + increment);
            break;
        case 'd':
            date.setDate(flag === 0 ? increment : date.getDate() + increment);
            break;
        case 'h':
            date.setHours(flag === 0 ? increment : date.getHours() + increment);
            break;
        case 'm':
            date.setMinutes(flag === 0 ? increment : date.getMinutes() + increment);
            break;
        case 's':
            date.setSeconds(flag === 0 ? increment : date.getSeconds() + increment);
            break;
        case 'ms':
            date.setMilliseconds(flag === 0 ? increment : date.getMilliseconds() + increment);
            break;
        default:
            return null;
    }
    return date;
};

/**
 * 获取指定Date对象的日期字符串
 * @param {?Date} [date] 指定Date对象，留空表示现在
 * @param {string} separator 分隔符
 * @returns {string} 日期字符串
 */
var getDateString = exports.getDateString = function getDateString(date) {
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';

    date = date ? date : new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return date.getFullYear() + separator + (month < 10 ? '0' + month : month) + separator + (day < 10 ? '0' + day : day);
};

/**
 * 获取指定Date对象的时间字符串
 * @param {?Date} [date] 指定Date对象，留空表示现在
 * @param {string} separator 分隔符
 * @param {boolean} isShowSecond 是否显示秒钟
 * @returns {string} 时间字符串
 */
var getTimeString = exports.getTimeString = function getTimeString() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ':';
    var isShowSecond = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return (hour < 10 ? '0' + hour : hour) + separator + (minute < 10 ? '0' + minute : minute) + (isShowSecond ? separator : '') + (isShowSecond ? second < 10 ? '0' + second : second : '');
};

/**
 * 获取指定时间戳距现在所剩余时间的描述
 * @param {number} timestamp 指定时间戳
 * @returns {{hours: number, minutes: number, seconds: number}} 剩余时间的描述，hours：剩余的小时数；minutes：剩余的分钟数；seconds：剩余的秒数
 */
var getTimeDiffInfo = exports.getTimeDiffInfo = function getTimeDiffInfo(timestamp) {
    var diff = timestamp - new Date().getTime();
    if (diff > 0) {
        diff = Math.floor(diff / 1000);
        var hours = Math.floor(diff / 60 / 60);
        if (hours >= 0) {
            var minutes = Math.floor((diff - hours * 60 * 60) / 60);
            if (minutes < 0) minutes = 0;
            var seconds = Math.floor(diff - hours * 60 * 60 - minutes * 60);
            if (seconds < 0) seconds = 0;
            return { hours: hours, minutes: minutes, seconds: seconds };
        }
    }
    return { hours: 0, minutes: 0, seconds: 0 };
};

/**
 * 判断指定时间是否处于规定时间段内
 * @param {Date} time 指定时间
 * @param {string} range 规定时间段，例：'08:00:15-15:30:30'或'23:30-01:20'
 * @returns {?boolean} 是否处于规定时间段内，返回null表示规定时间段格式不正确
 */
var isBetweenInTimeRange = exports.isBetweenInTimeRange = function isBetweenInTimeRange(time, range) {
    var rangeArr = range.split('-');
    if (rangeArr.length !== 2) return null;
    var start = getDateByTime(rangeArr[0]);
    var end = getDateByTime(rangeArr[1]);
    if (end < start) {
        if (time > end) end.setDate(end.getDate() + 1);else start.setDate(start.getDate() - 1);
    }
    return time >= start && time <= end;
};

/**
 * 获取当前域名的URL
 * @returns {string} 当前域名的URL
 */
var getHostNameUrl = exports.getHostNameUrl = function getHostNameUrl() {
    return location.protocol + '//' + location.host + '/';
};

/**
 * 获取对象A在对象B中的相对补集
 * @param {Object} a 对象A
 * @param {Object} b 对象B
 * @returns {Object} 相对补集
 */
var getDifferenceSetOfObject = exports.getDifferenceSetOfObject = function getDifferenceSetOfObject(a, b) {
    var c = {};
    if ($.type(a) !== 'object' || $.type(b) !== 'object') return c;
    $.each(b, function (key, data) {
        if (key in a) {
            if (!deepEqual(a[key], data)) c[key] = data;
        }
    });
    return c;
};

/**
 * 深度比较两个对象是否相等
 * @param {*} a
 * @param {*} b
 * @returns {boolean} 是否相等
 */
var deepEqual = exports.deepEqual = function deepEqual(a, b) {
    if (a === b) return true;
    if ($.type(a) !== $.type(b)) return false;
    if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) return true;
    if ($.isArray(a) && $.isArray(b) || $.type(a) === 'object' && $.type(b) === 'object') {
        if (a.length !== b.length) return false;
        for (var i in $.extend($.isArray(a) ? [] : {}, a, b)) {
            if (typeof a[i] === 'undefined' || typeof b[i] === 'undefined') return false;
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }
    return false;
};

/**
 * 获取URL中的指定参数
 * @param {string} name 参数名称
 * @returns {?string} URL中的指定参数
 */
var getUrlParam = exports.getUrlParam = function getUrlParam(name) {
    var regex = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var matches = location.search.substring(1).match(regex);
    if (matches) return decodeURI(matches[2]);else return null;
};

/**
 * 获取经过GBK编码后的字符串
 * @param {string} str 待编码的字符串
 * @returns {string} 经过GBK编码后的字符串
 */
var getGBKEncodeString = exports.getGBKEncodeString = function getGBKEncodeString(str) {
    var img = $('<img>').appendTo('body').get(0);
    img.src = 'nothing?sp=' + str;
    var encodeStr = img.src.split('nothing?sp=').pop();
    $(img).remove();
    return encodeStr;
};

/**
 * HTML转义编码
 * @param {string} str 待编码的字符串
 * @returns {string} 编码后的字符串
 */
var htmlEncode = exports.htmlEncode = function htmlEncode(str) {
    if (!str.length) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;').replace(/\'/g, '&#39;').replace(/\"/g, '&quot;').replace(/\n/g, '<br>');
};

/**
 * HTML转义解码
 * @param {string} str 待解码的字符串
 * @returns {string} 解码后的字符串
 */
var htmlDecode = exports.htmlDecode = function htmlDecode(str) {
    if (!str.length) return '';
    return str.replace(/<br\s*\/?>/gi, '\n').replace(/&quot;/gi, '\"').replace(/&#39;/gi, '\'').replace(/&nbsp;/gi, ' ').replace(/&gt;/gi, '>').replace(/&lt;/gi, '<').replace(/&amp;/gi, '&');
};

/**
 * 获取指定对象的关键字列表
 * @param {Object} obj 指定对象
 * @param {number} sortBy 是否排序，0：不排序；1：升序；-1：降序
 * @returns {string[]} 关键字列表
 */
var getObjectKeyList = exports.getObjectKeyList = function getObjectKeyList(obj) {
    var sortBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var list = [];
    if ($.type(obj) !== 'object') return list;
    for (var key in obj) {
        list.push(key);
    }
    if (sortBy !== 0) {
        list.sort(function (a, b) {
            return sortBy > 0 ? a > b : a < b;
        });
    }
    return list;
};

/**
 * 获取经过排序的指定对象的关键字列表
 * @param {string[]} sortKeyList 用于排序的关键字列表
 * @param {Object} obj 指定对象
 * @param {number} sortBy 是否排序，0：不排序；1：升序；-1：降序
 * @returns {string[]} 关键字列表
 */
var getSortedObjectKeyList = exports.getSortedObjectKeyList = function getSortedObjectKeyList(sortKeyList, obj) {
    var sortBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var list = getObjectKeyList(obj, sortBy);
    list.sort(function (a, b) {
        return sortKeyList.indexOf(a) > sortKeyList.indexOf(b);
    });
    return list;
};

/**
 * 获取经过格式化的统计数字字符串
 * @param {number} num 待处理的数字
 * @returns {string} 经过格式化的数字字符串
 */
var getStatFormatNumber = exports.getStatFormatNumber = function getStatFormatNumber(num) {
    return num >= 0 ? '<em>+' + num.toLocaleString() + '</em>' : '<ins>' + num.toLocaleString() + '</ins>';
};

/**
 * 检测浏览器是否为Opera
 * @returns {boolean} 是否为Opera
 */
var isOpera = exports.isOpera = function isOpera() {
    return typeof window.opera !== 'undefined';
};

/**
 * 检测浏览器是否为Edge
 * @returns {boolean} 是否为Edge
 */
var isEdge = exports.isEdge = function isEdge() {
    return navigator.appVersion && navigator.appVersion.indexOf('Edge') > 0;
};

/**
 * 比较神秘等级高低
 * @param {string} a
 * @param {string} b
 * @returns {number} 比较结果，-1：a小于b；0：a等于b；1：a大于b
 */
var compareSmLevel = exports.compareSmLevel = function compareSmLevel(a, b) {
    var x = a.toUpperCase() === 'MAX' ? Number.MAX_VALUE : parseInt(a);
    var y = b.toUpperCase() === 'MAX' ? Number.MAX_VALUE : parseInt(b);
    if (x > y) return 1;else if (x < y) return -1;else return 0;
};

/**
 * 获取帖子当前所在的页数
 * @returns {number} 帖子当前所在的页数
 */
var getCurrentThreadPage = exports.getCurrentThreadPage = function getCurrentThreadPage() {
    var matches = /- (\d+) -/.exec($('.pages:first > li > a[href="javascript:;"]').text());
    return matches ? parseInt(matches[1]) : 1;
};

/**
 * 获取指定小数位的本地字符串
 * @param {number} num 数字
 * @param {number} digit 指定小数位
 * @returns {string} 指定小数位的本地字符串
 */
var getFixedNumberLocaleString = exports.getFixedNumberLocaleString = function getFixedNumberLocaleString(num) {
    var digit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var _num$toFixed$split = num.toFixed(digit).split('.'),
        _num$toFixed$split2 = _slicedToArray(_num$toFixed$split, 2),
        iNum = _num$toFixed$split2[0],
        dNum = _num$toFixed$split2[1];

    var iStr = parseInt(iNum).toLocaleString();
    var dStr = '';
    if (typeof dNum !== 'undefined') dStr = '.' + dNum;
    return iStr + dStr;
};

/**
 * 获取去除了不配对BBCode的引用内容
 * @param {string} content 引用内容
 * @returns {string} 去除了不配对BBCode的引用内容
 */
var getRemoveUnpairedBBCodeQuoteContent = exports.getRemoveUnpairedBBCodeQuoteContent = function getRemoveUnpairedBBCodeQuoteContent(content) {
    var startCodeList = [/\[color=.+?\]/g, /\[backcolor=.+?\]/g, /\[size=.+?\]/g, /\[font=.+?\]/g, /\[align=.+?\]/g, /\[b\]/g, /\[i\]/g, /\[u\]/g, /\[strike\]/g, /\[sup\]/g, /\[sub\]/g];
    var endCodeList = [/\[\/color\]/g, /\[\/backcolor\]/g, /\[\/size\]/g, /\[\/font\]/g, /\[\/align\]/g, /\[\/b\]/g, /\[\/i\]/g, /\[\/u\]/g, /\[\/strike\]/g, /\[\/sup\]/g, /\[\/sub\]/g];
    for (var i = 0; i < startCodeList.length; i++) {
        var startMatches = content.match(startCodeList[i]);
        var endMatches = content.match(endCodeList[i]);
        var startMatchesNum = startMatches ? startMatches.length : 0;
        var endMatchesNum = endMatches ? endMatches.length : 0;
        if (startMatchesNum !== endMatchesNum) {
            content = content.replace(startCodeList[i], '').replace(endCodeList[i], '');
        }
    }
    return content;
};

/**
 * 获取指定字符串的字节长度（1个GBK字符按2个字节来算）
 * @param {string} str 指定字符串
 * @returns {number} 字符串的长度
 */
var getStrByteLen = exports.getStrByteLen = function getStrByteLen(str) {
    var len = 0;
    var cLen = 2;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? cLen : 1;
    }
    return len;
};

/**
 * 添加BBCode
 * @param textArea 文本框
 * @param {string} code BBCode
 * @param {string} selText 选择文本
 */
var addCode = exports.addCode = function addCode(textArea, code) {
    var selText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var startPos = !selText ? code.indexOf(']') + 1 : code.indexOf(selText);
    if (typeof textArea.selectionStart !== 'undefined') {
        var prePos = textArea.selectionStart;
        textArea.value = textArea.value.substring(0, prePos) + code + textArea.value.substring(textArea.selectionEnd);
        textArea.selectionStart = prePos + startPos;
        textArea.selectionEnd = prePos + startPos + selText.length;
    } else {
        textArea.value += code;
    }
};

/**
 * 获取选择文本
 * @param textArea 文本框
 * @returns {string} 选择文本
 */
var getSelText = exports.getSelText = function getSelText(textArea) {
    return textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
};

/**
 * 复制文本
 * @param {jQuery} $target 要复制文本的目标元素
 * @param {string} msg 复制成功的消息
 * @param {jQuery} $excludeElem 要排除复制的元素
 * @returns {boolean} 是否复制成功
 */
var copyText = exports.copyText = function copyText($target) {
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var $excludeElem = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (!('execCommand' in document) || !$target.length) return false;
    var copyText = $target.data('copy-text');
    if (copyText) {
        $target = $('<span class="text-hide">' + copyText + '</span>').insertAfter($target);
    }
    if ($excludeElem) $excludeElem.prop('hidden', true);
    var s = window.getSelection();
    s.selectAllChildren($target.get(0));
    var result = document.execCommand('copy');
    s.removeAllRanges();
    if (copyText) $target.remove();
    if ($excludeElem) $excludeElem.removeProp('hidden');
    if (result) {
        alert(msg ? msg : '已复制');
    }
    return result;
};

/**
 * 获取服务器返回的消息
 * @param {string} html HTML代码
 * @returns {string} 服务器返回的消息
 */
var getResponseMsg = exports.getResponseMsg = function getResponseMsg(html) {
    var msg = '';
    var matches = /<span style=".+?">(.+?)<\/span><br\s*\/?><a href="(.+?)">/i.exec(html);
    if (matches) {
        msg = matches[1] + '\uFF1B\u8DF3\u8F6C\u5730\u5740\uFF1A' + getHostNameUrl() + matches[2];
    } else {
        var _matches = /操作提示<br\s*\/?>\r\n(.+?)<br\s*\/?>\r\n<a href="javascript:history\.go\(-1\);">返回上一步操作<\/a>/i.exec(html);
        if (_matches) msg = _matches[1];
    }
    return msg;
};

/**
 * 返回指定对象由可枚举属性名和对应属性值组成的的键值对
 * @param {Object} obj 指定对象
 */
var entries = exports.entries = regeneratorRuntime.mark(function entries(obj) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;

    return regeneratorRuntime.wrap(function entries$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 3;
                    _iterator = Object.keys(obj)[Symbol.iterator]();

                case 5:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context.next = 12;
                        break;
                    }

                    key = _step.value;
                    _context.next = 9;
                    return [key, obj[key]];

                case 9:
                    _iteratorNormalCompletion = true;
                    _context.next = 5;
                    break;

                case 12:
                    _context.next = 18;
                    break;

                case 14:
                    _context.prev = 14;
                    _context.t0 = _context['catch'](3);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                case 18:
                    _context.prev = 18;
                    _context.prev = 19;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 21:
                    _context.prev = 21;

                    if (!_didIteratorError) {
                        _context.next = 24;
                        break;
                    }

                    throw _iteratorError;

                case 24:
                    return _context.finish(21);

                case 25:
                    return _context.finish(18);

                case 26:
                case 'end':
                    return _context.stop();
            }
        }
    }, entries, this, [[3, 14, 18, 26], [19,, 21, 25]]);
});

/**
 * 获取指定用户名在关注或屏蔽列表中的索引号
 * @param {string} name 指定用户名
 * @param {Array} list 指定列表
 * @returns {number} 指定用户在列表中的索引号，-1表示不在该列表中
 */
var inFollowOrBlockUserList = exports.inFollowOrBlockUserList = function inFollowOrBlockUserList(name, list) {
    return list.findIndex(function (elem) {
        return elem.name && elem.name === name;
    });
};

},{"./Const":6,"./Info":10}]},{},[1]);