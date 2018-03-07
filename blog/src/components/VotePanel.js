import React from 'react';
import PropTypes from 'prop-types';
import TiArrowDown from 'react-icons/lib/ti/arrow-down';
import TiArrowUp from 'react-icons/lib/ti/arrow-up';
import { Transition } from 'semantic-ui-react'


class VotePanel extends React.Component {
        state = {
            visibleUp: true,
            visibleDown: true,
        }

        toggleVisibilityUp = () => (
            this.setState({ visibleUp: !this.state.visibleUp })
        )

        toggleVisibilityDown = () => (
            this.setState({ visibleDown: !this.state.visibleDown })
        )

        render(){
            return (
                <div className='row vote-counter'>
                        <Transition animation='pulse' duration='100' visible={this.state.visibleUp}>
                            <div onClick={() => this.toggleVisibilityUp()}>
                                <TiArrowUp size={50} onClick={() => this.props.votingFunction(this.props.id, {option: 'upVote'}, this.props.postId)} />
                            </div>
                        </Transition>
                        <div className='votes'>
                            <h6 className={this.props.votes > 0 ? 'hot' : 'cold'}>{this.props.votes}</h6>
                        </div>
                        <Transition animation='pulse' duration='100' visible={this.state.visibleDown}>
                            <div onClick={() => this.toggleVisibilityDown()}>
                                <TiArrowDown size={50} onClick={() => this.props.votingFunction(this.props.id, {option: 'downVote'}, this.props.postId)} />
                            </div>
                        </Transition>
                </div>
            )
        }
}


VotePanel.propTypes = {
    id: PropTypes.string.isRequired,
    votingFunction: PropTypes.func.isRequired,
}

export default VotePanel;
