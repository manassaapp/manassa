import React, { FC, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useModals } from '@gitroom/frontend/components/layout/new-modal';
import { Button } from '@gitroom/react/form/button';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

export const PreConditionComponentModal: FC = () => {
  const modal = useModals();
  const t = useT();
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="whitespace-pre-line">
        {t(
          'precondition_channel_used_before',
          "This social channel was previously connected to another {{brand}} account.\nTo connect it during your trial, you can end the trial now: your plan's first payment is charged today instead of at the end of the trial, and nothing extra is added.\n\n** Please note this payment is final and not refundable.\nOnly an admin or the super admin of the organization can end the trial and pay."
        )}
      </div>
      <div className="flex gap-[2px] justify-center">
        <Button
          onClick={() => (window.location.href = '/billing?finishTrial=true')}
        >
          {t('end_trial_and_pay_now', 'End trial and pay now')}
        </Button>
        <Button onClick={modal.closeCurrent} secondary={true}>
          {t('cancel', 'Cancel')}
        </Button>
      </div>
    </div>
  );
};
export const PreConditionComponent: FC = () => {
  const modal = useModals();
  const query = useSearchParams();
  const t = useT();
  useEffect(() => {
    if (query.get('precondition')) {
      modal.openModal({
        title: t('suspicious_activity_detected', 'Suspicious activity detected'),
        withCloseButton: true,
        classNames: {
          modal: 'text-textColor',
        },
        children: <PreConditionComponentModal />,
      });
    }
  }, []);
  return null;
};
