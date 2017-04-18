import * as React from "react";
import _ from "lodash";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";

import { AlertBox } from "../components/alertBox";
import { AdminUIState } from "../redux/state";
import { Alert, panelAlertsSelector } from "../redux/alerts";

interface AlertSectionProps {
  /**
   * List of alerts to display in the alert secion.
   */
  alerts: Alert[];
  /**
   * Raw dispatch method for the current store, will be used to dispatch
   * alert dismissal callbacks.
   */
  dispatch: Dispatch<AdminUIState>;
}

class AlertSection extends React.Component<AlertSectionProps, {}> {
  render() {
    let { alerts, dispatch } = this.props;
    return <div>
      {
        _.map(alerts, (a, i) => {
          const { dismiss, ...alertProps } = a;
          const boundDismiss = bindActionCreators(() => a.dismiss, dispatch);
          return <AlertBox key={i} dismiss={ boundDismiss } {...alertProps} />;
        })
      }
    </div>;
  }
}

const alertSectionConnected = connect(
  (state: AdminUIState) => {
    return {
      alerts: panelAlertsSelector(state),
    };
  },
  (dispatch) => {
    return {
      dispatch: dispatch,
    };
  },
)(AlertSection);

export default alertSectionConnected;
