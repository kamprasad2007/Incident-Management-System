import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios'
import { HOME, host_url } from '../../route';
import IncidentCard from '../../components/incident-card';

const EditContainer = ({state, ...props}) => {
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState()

    useEffect(() => {
        axios.get(`${host_url}/api/incident/${id}`).then(res => {
            setData(res.data);
        })
    }, [id]);

    const handleSubmit = async (values) => {
        const payload = {
            assignedTo: values.assignedTo
        }
        const result = await axios.put(`${host_url}/api/incident/${id}`, payload)
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
                isEdit={true}
                initialValues={data}
                state={state}
            />
        </div>
    )
}

export default EditContainer;