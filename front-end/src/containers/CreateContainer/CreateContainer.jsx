import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { HOME, host_url } from '../../route';
import axios from 'axios';

import IncidentCard from '../../components/incident-card';

import './style.css'

const CreateContainer = ({ state, ...props }) => {
    const history = useHistory();
    const [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        if(state.active){
            setInitialValues({reportedBy: state.active.name});
        }
    }, [state.active]);

    const handleSubmit = async (values) => {
        const payload = {
            date: values.date.toISOString(),
            title: values.title,
            type: values.type,
            description: values.description,
            reportedBy: values.reportedBy
        }
        const result = await axios.post(`${host_url}/api/incident`, payload)
        if (result) {
            history.push(HOME)
        }
    }

    const handleCancel = () => {
        history.push(HOME)
    }


    return (
        <div className="container">
            <IncidentCard
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                initialValues={initialValues}
                state={state}
            />
        </div>
    )
}

export default CreateContainer;