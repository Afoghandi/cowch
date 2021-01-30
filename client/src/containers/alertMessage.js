import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from '../components';

function AlertMessage({ alerts }) {
	return (
		alerts !== null &&
		alerts.length > 0 &&
		alerts.map((alert) => <Alert key={alert.id}>{alert.msg}</Alert>)
	);
}

AlertMessage.propTypes = {
	alerts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
	alerts: state.alert,
});
export default connect(mapStateToProps)(AlertMessage);
