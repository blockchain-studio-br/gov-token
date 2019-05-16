import React from 'react';
import PropTypes from 'prop-types';
import Blockies from 'react-blockies';

class ProfileHeader extends React.Component {

  render() {
    return (
      <div className="row align-items-center">
        <Blockies seed={this.props.address.toLowerCase()} size={8} scale={6} />
        <div>
          <p className="user-id user-id-header">{this.props.userId}</p>
          <p className="wallet-address wallet-address-header">{this.props.address}</p>
        </div>
      </div>
    );
  }

}

ProfileHeader.propTypes = {
  userId: PropTypes.string,
  address: PropTypes.string
};

ProfileHeader.defaultProps = {
  userId: "",
  address: ""
};

export default ProfileHeader;
