import React, { PureComponent } from 'react';

class Card extends PureComponent {
    render(){
        return(
            <div
              className="ui-card"
            >
                {this.props.children}
            </div>
        );
    }
}

export default Card;