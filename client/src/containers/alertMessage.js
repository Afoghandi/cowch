import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from '../components';
import { REMOVE_ALERT } from '../constants/types';

function AlertMessage({ alerts, onRemoveAlert }) {
	if(!alerts || alerts.length ===0) return null;
	return (
	
		alerts.map((alert) => (
		
			<Alert key={alert.id} alertType={alert.alertType} onClose={() => onRemoveAlert(alert.id)}>
			
				{alert.msg}
			
			</Alert>
		))
	);
}

AlertMessage.propTypes = {
	alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
	alerts: state.alert,
});

const mapDispatchToProps = (dispatch) => ({
	onRemoveAlert: (id) => dispatch({ type: REMOVE_ALERT, payload: id }),
});
export default connect(mapStateToProps, mapDispatchToProps)(AlertMessage);
