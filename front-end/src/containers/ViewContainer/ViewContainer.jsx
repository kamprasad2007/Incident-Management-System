import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Card, Descriptions } from "antd";
import axios from 'axios'
import { host_url } from '../../route';
import CommentList from '../../components/CommentList'
import CommentEditor from '../../components/CommentEditor'
import './style.css'


const ViewContainer = () => {
    const { id } = useParams();
    const [report, setReport] = useState();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({});

    useEffect(() => {
        axios.get(`${host_url}/api/incident/${id}`).then(res => {
            setReport(res.data);
        })
    }, [id]);

    const handleSubmit = (values) => {
        setComments(comments => [
            ...comments,
            {
                content: values.comment,
                datetime: new Date().toISOString()
            }
        ]);
        setComment({ comment: '' })
    }

    return (
        <>
            <div className="container">
                <Card style={{ width: 800 }} >
                    <Descriptions title="INCIDENT REPORT" bordered>
                        <Descriptions.Item label="Date" span={4}>{report?.date}</Descriptions.Item>
                        <Descriptions.Item label="Title" span={4}>{report?.title}</Descriptions.Item>
                        <Descriptions.Item label="Reported By" span={4}>{report?.reportedBy}</Descriptions.Item>
                        <Descriptions.Item label="Assigned To" span={4}>{report?.assignedTo}</Descriptions.Item>

                        <Descriptions.Item label="Description" span={4}>
                            {report?.description}
                        </Descriptions.Item>

                        <Descriptions.Item label="Comment">

                            {comments.length > 0 && <CommentList comments={comments} />}

                        </Descriptions.Item>
                    </Descriptions>
                    <div className="comment">
                        <CommentEditor onSubmit={handleSubmit} initialValues={comment} />
                    </div>
                </Card>
            </div>
        </>
    )
}

export default ViewContainer;