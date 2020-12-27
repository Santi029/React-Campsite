import React, { Component } from 'react';
import {CampsiteInfo} from 'DirectoryComponent.js';

class CampsiteInfo extends Components {
        render(){
            if (this.state.CampsiteInfo === true) {
                return (
                    <div className = 'row'></div>
                );
            }
            return <div />;
        }
    }
}

export default CampsiteInfo;