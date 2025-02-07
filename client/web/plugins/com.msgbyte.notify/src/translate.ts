import { localTrans } from '@capital/common';

export const Translate = {
  nosupport: localTrans({
    'zh-CN': '当前浏览器不支持 Notification',
    'en-US': 'This browser not support Notification',
  }),
  slient: localTrans({ 'zh-CN': '免打扰', 'en-US': 'Slient' }),
  from: localTrans({
    'zh-CN': '来自',
    'en-US': 'From',
  }),
  dm: localTrans({
    'zh-CN': '私信',
    'en-US': 'DM',
  }),
  disabledSound: localTrans({
    'zh-CN': '禁用消息通知提示音',
    'en-US': 'Disable message notification sound',
  }),
};
