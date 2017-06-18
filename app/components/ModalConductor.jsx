import React from 'react';

import ExportDataModal from './ExportDataModal.jsx';
import SendMessageModal from './SendMessage.jsx';
// import FeedbackModal from './FeedbackModal.jsx';
// import BoxDetailsModal from './BoxDetailsModal.jsx';

const ModalConductor = props => {
  switch (props.currentModal) {
    case 'EXPORT_DATA':
      return <SendMessageModal {...props}/>;

    default:
      return null;
  }
};

export default ModalConductor;