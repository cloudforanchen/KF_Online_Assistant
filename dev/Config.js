/**
 * 配置类
 */
// （注意：请到设置界面里修改相应设置，请勿在代码里修改！）
var Config = {
    // 是否开启定时模式，可按时进行自动操作（包括捐款、争夺、抽取神秘盒子，需开启相关功能），只在论坛首页生效，true：开启；false：关闭
    autoRefreshEnabled: false,
    // 在首页的网页标题上显示定时模式提示的方案，auto：停留一分钟后显示；always：总是显示；never：不显示
    showRefreshModeTipsType: 'auto',

    // 是否自动KFB捐款，true：开启；false：关闭
    autoDonationEnabled: false,
    // KFB捐款额度，取值范围在1-5000的整数之间；可设置为百分比，表示捐款额度为当前收入的百分比（最多不超过5000KFB），例：80%
    donationKfb: '1',
    // 在当天的指定时间之后捐款（24小时制），例：22:30:00（注意不要设置得太接近零点，以免错过捐款）
    donationAfterTime: '00:05:00',

    // 是否自动争夺，可自动领取争夺奖励，并可自动进行批量攻击（可选），true：开启；false：关闭
    autoLootEnabled: false,
    // 在指定的时间段内不自动领取争夺奖励（主要与在指定时间内才攻击配合使用），例：['07:00-08:15','17:00-18:15']，留空表示不启用
    noAutoLootWhen: [],
    // 是否在领取争夺奖励时，当本回合剩余攻击次数不低于{@link Config.deferLootTimeWhenRemainAttackNum}所设定的次数的情况下，抽取神秘盒子以延长争夺时间，true：开启；false：关闭
    deferLootTimeWhenRemainAttackNumEnabled: false,
    // 抽取神秘盒子以延长争夺时间的剩余攻击次数的上限
    deferLootTimeWhenRemainAttackNum: 15,
    // 是否自定义怪物名称，true：开启；false：关闭
    customMonsterNameEnabled: false,
    // 自定义怪物名称列表，格式：{怪物ID：'自定义名称'}，例：{1:'萝莉',5:'信仰风'}
    customMonsterNameList: {},
    // 是否在自动领取争夺奖励后，自动进行批量攻击（需指定攻击目标），true：开启；false：关闭
    autoAttackEnabled: false,
    // 在距本回合结束前指定时间内才自动完成（剩余）批量攻击，取值范围：660-63（分钟），设置为0表示不启用（注意不要设置得太接近最小值，以免错过攻击）
    attackAfterTime: 0,
    // 是否当生命值不超过低保线时自动进行试探攻击（需同时设置{@link Config.attackAfterTime}），true：开启；false：关闭
    attemptAttackEnabled: false,
    // 是否在自动攻击时限之前的指定时间（{@link Const.attemptAttackAfterTime}）内才进行试探攻击（适合有时间挂机的用户），true：开启；false：关闭
    // 例：设置{@link Config.attackAfterTime}为90分钟，设置{@link Const.attemptAttackAfterTime}为40分钟，则在距本回合结束前130分钟内才进行试探攻击
    attemptAttackAfterTimeEnabled: false,
    // 批量攻击的目标列表，格式：{怪物ID:次数}，例：{1:10,2:10}
    batchAttackList: {},
    // 当拥有致命一击时所自动攻击的怪物ID，设置为0表示保持默认
    deadlyAttackId: 0,
    // 是否自动使用批量攻击后刚掉落的道具，需指定自动使用的道具名称，true：开启；false：关闭
    autoUseItemEnabled: false,
    // 自动使用批量攻击后刚掉落的道具的名称，例：['被遗弃的告白信','学校天台的钥匙','LOLI的钱包']
    autoUseItemNames: [],

    // 是否自动抽取神秘盒子，true：开启；false：关闭
    autoDrawSmbox2Enabled: false,
    // 偏好的神秘盒子数字，例：[52,1,28,400]（以英文逗号分隔，按优先级排序），如设定的数字都不可用，则从剩余的盒子中随机抽选一个，如无需求可留空
    favorSmboxNumbers: [],

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

    // 默认提示消息的持续时间（秒），设置为-1表示永久显示
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