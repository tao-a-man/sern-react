import React, { Component } from 'react';
import { connect } from 'react-redux';
import TippyHeadLess from '@tippyjs/react/headless'; // different import path!

import Wrapper from '../WrapperPopper/Wrapper';
import Button from '../../components/Button';
import * as actions from '../../store/actions';
import './Search.scss';

class Search extends Component {
    render() {
        return (
            <TippyHeadLess
                visible={true}
                delay={[0, 500]}
                interactive
                render={(arr) => {
                    return (
                        <div className="search-result" tabIndex="-1" {...arr}>
                            <Wrapper>
                                <div>
                                    <h4 className="search-title">Account</h4>
                                    <p>1</p>
                                    <p>1</p>
                                    <p>1</p>
                                    <p>1</p>
                                    <p>1</p>
                                    <p>1</p>
                                    <p>1</p>
                                    <p>1</p>
                                </div>
                            </Wrapper>
                        </div>
                    );
                }}
                // onClickOutside={handleHideResult}
            >
                <div className="search">
                    <div className="search-content">
                        <input placeholder="Search doctor...." spellCheck={false}></input>
                        {/* {!!inputValue && !loading && (
                        <button onClick={handleClearInput} className={cx('search__clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )} */}
                        {/* {loading && <FontAwesomeIcon className={cx('search__loading')} icon={faSpinner}></FontAwesomeIcon>}{' '} */}
                        <Button primary className="search__btn">
                            <i className="fas fa-search"></i>
                        </Button>
                    </div>
                </div>
            </TippyHeadLess>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
