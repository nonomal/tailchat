import {
  getModelForClass,
  prop,
  DocumentType,
  Ref,
  index,
  modelOptions,
  Severity,
} from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import type { Types } from 'mongoose';
import type { InboxStruct } from 'tailchat-server-sdk';
import { User } from '../user/user';

/**
 * @deprecated use InboxStruct directly
 */
interface InboxMessage {
  /**
   * 消息所在群组Id
   */
  groupId?: string;

  /**
   * 消息所在会话Id
   */
  converseId: string;

  messageId: string;

  /**
   * 消息发送者
   */
  messageAuthor: string;

  /**
   * 消息片段，用于消息的预览/发送通知
   */
  messageSnippet: string;

  /**
   * 消息去除富文本标记的原始内容，用于推送
   */
  messagePlainContent: string;
}

/**
 * 收件箱管理
 */
@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ userId: 1 })
export class Inbox extends TimeStamps implements Base {
  _id: Types.ObjectId;
  id: string;
  /**
   * 接收方的id
   */
  @prop({
    ref: () => User,
  })
  userId: Ref<User>;

  @prop({
    type: () => String,
  })
  type: string;

  /**
   * @deprecated please use payload
   */
  @prop()
  message?: InboxMessage;

  /**
   * 信息体，没有类型
   */
  @prop()
  payload?: InboxStruct['payload'];

  /**
   * 是否已读
   */
  @prop({
    default: false,
  })
  readed: boolean;
}

export type InboxDocument = DocumentType<Inbox>;

const model = getModelForClass(Inbox);

export type InboxModel = typeof model;

export default model;
