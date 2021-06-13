import React, { useEffect, useState } from 'react'
import IncidentTable from '../../components/incident-table'
import { host_url, edit, view } from '../../route'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const SummaryContainer = (props) => {
    const history = useHistory();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${host_url}/api/incident`).then(res => {
            setData(res.data)
        })
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${host_url}/api/incident/${id}`).then(res => {
            const index = data.findIndex(item => item.id === id);
            data.splice(index, 1);
            setData(data);
        })
    }

    const handleEdit = (id) => {
        history.push(edit(id))
    }

    const handleView = (id) => {
        history.push(view(id))
    }

    return (
        <IncidentTable
            data={data}
            onEditClick={handleEdit}
            onDeleteClick={handleDelete}
            onViewClick={handleView}
            {...props}
        />
    )
}

export default SummaryContainer;