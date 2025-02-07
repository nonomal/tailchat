/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 该文件由 Tailchat 自动生成
 * 用于插件的类型声明
 * 生成命令: pnpm run plugins:declaration:generate
 */

/**
 * Tailchat 通用
 */
declare module '@capital/common' {
  export const useGroupPanelParams: any;

  /**
   * 打开模态框
   */
  export const openModal: (
    content: React.ReactNode,

    props?: {
      /**
       * 是否显示右上角的关闭按钮
       * @default false
       */
      closable?: boolean;

      /**
       * 遮罩层是否可关闭
       */
      maskClosable?: boolean;

      /**
       * 关闭modal的回调
       */
      onCloseModal?: () => void;
    }
  ) => number;

  export const closeModal: any;

  export const ModalWrapper: any;

  export const useModalContext: any;

  export const openConfirmModal: any;

  export const openReconfirmModal: any;

  export const Loadable: any;

  export const getGlobalState: any;

  export const getJWTUserInfo: () => Promise<{
    _id?: string;
    nickname?: string;
    email?: string;
    avatar?: string;
  }>;

  export const dataUrlToFile: any;

  export const urlSearchStringify: any;

  export const urlSearchParse: any;

  export const appendUrlSearch: any;

  export const useGroupIdContext: any;

  export const getServiceUrl: () => string;

  export const getCachedUserInfo: (
    userId: string,
    refetch?: boolean
  ) => Promise<{
    _id: string;
    email: string;
    nickname: string;
    discriminator: string;
    avatar: string | null;
    temporary: boolean;
  }>;

  export const getCachedConverseInfo: any;

  export const localTrans: any;

  export const getLanguage: any;

  export const sharedEvent: any;

  export const useAsync: any;

  export const useAsyncFn: any;

  export const useAsyncRefresh: any;

  export const useAsyncRequest: any;

  export const uploadFile: any;

  export const showToasts: any;

  export const showErrorToasts: any;

  export const fetchAvailableServices: any;

  export const isValidStr: any;

  export const useGroupPanelInfo: any;

  export const sendMessage: any;

  export const useLocation: any;

  export const useHistory: any;

  export const createFastFormSchema: any;

  export const fieldSchema: any;

  export const useCurrentUserInfo: any;

  export const createPluginRequest: (pluginName: string) => {
    get: (actionName: string, config?: any) => Promise<any>;
    post: (actionName: string, data?: any, config?: any) => Promise<any>;
  };

  export const postRequest: any;

  export const pluginCustomPanel: any;

  export const regCustomPanel: any;

  export const pluginGroupPanel: any;

  export const regGroupPanel: any;

  export const messageInterpreter: any;

  export const regMessageInterpreter: any;

  export const getMessageRender: any;

  export const regMessageRender: any;

  export const getMessageTextDecorators: any;

  export const regMessageTextDecorators: any;

  export const ChatInputActionContextProps: any;

  export const pluginChatInputActions: any;

  export const regChatInputAction: any;

  export const regSocketEventListener: (item: {
    eventName: string;
    eventFn: (...args: any[]) => void;
  }) => void;

  export const pluginColorScheme: any;

  export const regPluginColorScheme: any;

  export const pluginInspectServices: any;

  export const regInspectService: any;

  export const pluginMessageExtraParsers: any;

  export const regMessageExtraParser: any;

  export const pluginRootRoute: any;

  export const regPluginRootRoute: any;

  export const pluginPanelActions: any;

  export const regPluginPanelAction: any;
}

/**
 * Tailchat 组件
 */
declare module '@capital/component' {
  export const Button: any;

  export const Checkbox: any;

  export const Input: any;

  export const Divider: any;

  export const Space: any;

  export const Menu: any;

  export const Table: any;

  export const Switch: any;

  export const Tooltip: any;

  /**
   * @link https://ant.design/components/notification-cn/
   */
  export const notification: any;

  export const Avatar: any;

  export const TextArea: any;

  export const Image: any;

  export const Icon: any;

  export const IconBtn: any;

  export const PillTabs: any;

  export const PillTabPane: any;

  export const LoadingSpinner: any;

  export const WebFastForm: any;

  export const WebMetaForm: any;

  export const createMetaFormSchema: any;

  export const metaFormFieldSchema: any;

  export const FullModalField: any;

  export const DefaultFullModalInputEditorRender: any;

  export const DefaultFullModalTextAreaEditorRender: any;

  export const openModal: any;

  export const closeModal: any;

  export const ModalWrapper: any;

  export const useModalContext: any;

  export const openConfirmModal: any;

  export const openReconfirmModal: any;

  export const Loading: any;

  export const SidebarView: any;

  export const GroupPanelSelector: any;

  export const Emoji: any;

  export const PortalAdd: any;

  export const PortalRemove: any;

  export const ErrorBoundary: any;

  export const UserName: React.FC<{
    userId: string;
    className?: string;
  }>;
}
