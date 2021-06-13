import React, { useEffect, useState } from 'react'
import { Button, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import { CREATE } from '../../route';

import './style.css'

const { Option } = Select;

const HeaderContainer = ({ state, ...props }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push(CREATE)
    }

    const handleChange = (value) => {
        props.dispatch({ type: 'CHANGE_ACTIVE_USER', payload: value })
    }

    return (
        <div className="header">
            {state.active?.role === 'admin' && (
                <Button type="primary" onClick={handleClick}>CREATE NEW INCIDENT</Button>
            )}

            <Select defaultValue={state.active?.id} style={{ width: 120, marginLeft: 20 }} onChange={handleChange}>
                {state.users.map(user => <Option key={user.id} value={user.id}>{user.name} {user.role === 'admin' && (<strong>&#9812;</strong>)}</Option>)}
            </Select>
        </div>
    )
}

export default HeaderContainer;