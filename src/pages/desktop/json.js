export const desktopMenus = [{
  name:'browser',
  text:'浏览器',
  icon:'./static/img/icon32/browser_32.png',
  top:80*0,
  left:80*0,
  insertTime:'2019-01-01 00:00:00'
},{
  name:'taskList',
  text:'我的任务',
  icon:'./static/img/icon32/task_32.png',
  top:80*1,
  left:80*0,
  insertTime:'2019-01-02 00:00:00'
},{
  name:'portal',
  text:'系统门户',
  icon:'./static/img/icon32/portal_32.png',
  top:80*2,
  left:80*0,
  insertTime:'2019-01-16 00:00:00'
},{
  name:'processEditor',
  text:'流程设计',
  icon:'./static/img/icon32/molecule.png',
  top:80*1,
  left:80*1,
  insertTime:'2019-01-22 00:00:00'
},{
  name:'processList',
  text:'流程管理',
  icon:'./static/img/icon32/table_gear.png',
  top:80*0,
  left:80*1,
  insertTime:'2019-01-23 00:00:00'
},{
  name:'ruleList',
  text:'规则管理',
  icon:'./static/img/icon32/rule_32.png',
  top:80*0,
  left:80*3,
  insertTime:'2019-02-14 00:00:00'
},{
  name:'pageList',
  text:'页面管理',
  icon:'./static/img/icon32/page_32.png',
  top:80*0,
  left:80*4,
  insertTime:'2019-02-14 00:00:00'
},{
  name:'pageEditor',
  text:'页面设计',
  icon:'./static/img/icon32/pageEditor_32.png',
  top:80*0,
  left:80*5,
  insertTime:'2019-02-14 00:00:00'
},{
  name:'database',
  text:'数据库',
  icon:'./static/img/icon32/database_gear.png',
  top:80*1,
  left:80*4,
  insertTime:'2019-02-14 00:00:00'
},{
  name:'monitor',
  text:'流程监控',
  icon:'./static/img/icon32/control_panel.png',
  top:80*1,
  left:80*3,
  insertTime:'2019-02-14 00:00:00'
},{
  name:'date',
  text:'日历',
  icon:'./static/img/icon32/date.png',
  top:80*1,
  left:80*5,
  insertTime:'2019-02-14 00:00:00'
},{
  name:'chat',
  text:'聊天室',
  icon:'./static/img/icon32/comments.png',
  top:80*0,
  left:80*6,
  insertTime:'2019-02-14 00:00:00',
  width:280
},{
  name:'userList',
  text:'权限管理',
  icon:'./static/img/icon32/group_gear.png',
  top:80*1,
  left:80*7,
  insertTime:'2019-02-14 00:00:00'
},{
  name:'bugreport',
  text:'问题反馈',
  icon:'./static/img/icon32/ladybird.png',
  top:80*2,
  left:80*1,
  insertTime:'2019-02-14 00:00:00'
},{
  name:'theme',
  text:'主题风格',
  icon:'./static/img/icon32/palette.png',
  top:80*0,
  left:80*7,
  insertTime:'2019-02-15 00:00:00'
}]

export const contextMenus = [{
  text:'主题风格',
  value:'',
  iconCls:'icon-color',
  children:[{
    value:'theme-black',
    text:'black',
    iconCls:'icon-color'
  },{
    value:'theme-bootstrap',
    text:'bootstrap',
    iconCls:'icon-color'
  },{
    value:'theme-gray',
    text:'gray',
    iconCls:'icon-color'
  },{
    value:'theme-material',
    text:'material',
    iconCls:'icon-color'
  },{
    value:'theme-material-teal',
    text:'material-teal',
    iconCls:'icon-color'
  },{
    value:'theme-ui-sunny',
    text:'ui-sunny',
    iconCls:'icon-color'
  },{
    value:'theme-ui-pepper-grinder',
    text:'ui-pepper-grinder',
    iconCls:'icon-color'
  },{
    value:'theme-ui-dark-hive',
    text:'ui-dark-hive',
    iconCls:'icon-color'
  },{
    value:'theme-ui-cupertino',
    text:'ui-cupertino',
    iconCls:'icon-color'
  },{
    value:'theme-metro-red',
    text:'metro-red',
    iconCls:'icon-color'
  },{
    value:'theme-metro-orange',
    text:'metro-orange',
    iconCls:'icon-color'
  },{
    value:'theme-metro-green',
    text:'metro-green',
    iconCls:'icon-color'
  },{
    value:'theme-metro-gray',
    text:'metro-gray',
    iconCls:'icon-color'
  },{
    value:'theme-metro-blue',
    text:'metro-blue',
    iconCls:'icon-color'
  }]
},{
  value:'背景图片',
  text:'背景图片',
  iconCls:'icon-desktop',
  children:[{
    value:'bg-1.jpg',
    text:'1.jpg',
    iconCls:'icon-desktop'
  },{
    value:'bg-2.jpg',
    text:'2.jpg',
    iconCls:'icon-desktop'
  },{
    value:'bg-3.jpg',
    text:'3.jpg',
    iconCls:'icon-desktop'
  },{
    value:'bg-4.jpg',
    text:'4.jpg',
    iconCls:'icon-desktop'
  },{
    value:'bg-5.jpg',
    text:'5.jpg',
    iconCls:'icon-desktop'
  },{
    value:'bg-6.jpg',
    text:'6.jpg',
    iconCls:'icon-desktop'
  },{
    value:'bg-7.jpg',
    text:'7.jpg',
    iconCls:'icon-desktop'
  },{
    value:'bg-8.jpg',
    text:'8.jpg',
    iconCls:'icon-desktop'
  },{
    value:'bg-9.jpg',
    text:'9.jpg',
    iconCls:'icon-desktop'
  },{
    value:'bg-10.jpg',
    text:'10.jpg',
    iconCls:'icon-desktop'
  },]
},{
  text:'自动排序',
  iconCls:'icon-sort',
  children:[{
    value:'sort-name-asc',
    text:'按名称升序',
    iconCls:'icon-sort-name-asc'
  },{
    value:'sort-name-desc',
    text:'按名称降序',
    iconCls:'icon-sort-name-desc'
  },{
    value:'sort-time-asc',
    text:'按时间升序',
    iconCls:'icon-sort-time-asc'
  },{
    value:'sort-time-desc',
    text:'按时间降序',
    iconCls:'icon-sort-time-desc'
  }]
},{
  value:'lock-screen',
  text:'锁定屏幕',
  iconCls:'icon-lock',
},{
  value:'个人设置',
  text:'个人设置',
  iconCls:'icon-config',
},{
  value:'办公模式',
  text:'办公模式',
  iconCls:'icon-work',
},{
  value:'fullscreen',
  text:'全屏显示',
  iconCls:'icon-fullscreen',
}]

export const startMenus = [{
  group:'我的工作区',
  items:[{
    name:'我的门户',
    icon:'',
    url:''
  },{
    name:'我的任务',
    icon:'',
    url:''
  },{
    name:'已办任务',
    icon:'',
    url:''
  },{
    name:'消息提醒',
    icon:'',
    url:''
  },{
    name:'个人设置',
    icon:'',
    url:''
  },{
    name:'日程计划',
    icon:'',
    url:''
  },{
    name:'意见箱',
    icon:'',
    url:''
  },{
    name:'系统公告',
    icon:'',
    url:''
  }]
},{
  group:'系统设置',
  items:[{
    name:'流程列表',
    icon:'',
    url:''
  },{
    name:'表单列表',
    icon:'',
    url:''
  },{
    name:'校验规则列表',
    icon:'',
    url:''
  },{
    name:'用户列表',
    icon:'',
    url:''
  },{
    name:'角色列表',
    icon:'',
    url:''
  },{
    name:'菜单列表',
    icon:'',
    url:''
  },]
},{
  group:'其他',
  items:[{
    name:'使用帮助',
    icon:'',
    url:''
  }]
}]

export const funcs = [{
  name:'全屏',
  icon:'fa-user',
  url:''
},{
  name:'办公模式',
  icon:'fa-user',
  url:''
},{
  name:'个人设置',
  icon:'fa-user',
  url:''
},{
  name:'注销',
  icon:'fa-user',
  url:'logout'
}]