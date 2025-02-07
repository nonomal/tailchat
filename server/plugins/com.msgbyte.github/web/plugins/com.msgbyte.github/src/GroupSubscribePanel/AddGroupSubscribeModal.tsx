import React, { useMemo } from 'react';
import {
  createFastFormSchema,
  fieldSchema,
  useAsyncRequest,
  showToasts,
} from '@capital/common';
import {
  WebFastForm,
  GroupPanelSelector,
  ModalWrapper,
} from '@capital/component';
import { request } from '../request';
import { Translate } from '../translate';

interface Values {
  repoName: string;
  textPanelId: string;
}

const schema = createFastFormSchema({
  repoName: fieldSchema.string().required(Translate.repoNameEmpty),
  textPanelId: fieldSchema.string().required(Translate.textPanelEmpty),
});

export const AddGroupSubscribeModal: React.FC<{
  groupId: string;
  onSuccess?: () => void;
}> = React.memo((props) => {
  const groupId = props.groupId;
  const [, handleSubmit] = useAsyncRequest(
    async (values: Values) => {
      const { repoName, textPanelId } = values;
      await request.post('subscribe.add', {
        groupId,
        textPanelId,
        repoName,
      });

      showToasts(Translate.success, 'success');
      props.onSuccess?.();
    },
    [groupId, props.onSuccess]
  );

  const fields = useMemo(
    () => [
      {
        type: 'text',
        name: 'repoName',
        label: Translate.repoName,
        placeholder: Translate.repoNamePlaceholder,
      },
      {
        type: 'custom',
        name: 'textPanelId',
        label: Translate.textPanel,
        render: (props: {
          value: any;
          error: string | undefined;
          onChange: (val: any) => void; // 修改数据的回调函数
        }) => {
          return (
            <GroupPanelSelector
              style={{ width: '100%' }}
              value={props.value}
              onChange={props.onChange}
              groupId={groupId}
            />
          );
        },
      },
    ],
    [groupId]
  );

  return (
    <ModalWrapper title={Translate.createApplication}>
      <WebFastForm schema={schema} fields={fields} onSubmit={handleSubmit} />
    </ModalWrapper>
  );
});
AddGroupSubscribeModal.displayName = 'AddGroupSubscribeModal';
