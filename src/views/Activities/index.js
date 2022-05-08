import React, {useState, useRef} from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import $ from "jquery";
import curtain from '../../assets/curtain.jpeg';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {useParams} from 'react-router';
import {Switch} from '@mui/material';
import CardModal from "./Modal";
import ActivityAPI from '../../apis/ActivityAPI'
import CategoryAPI from '../../apis/CategoryAPI'

require("./index.css");

//     const token = useSelector(state => state.user.token)

export default function Activities() {
    const {topicId, categoryId} = useParams(); // this is defined in path(mainRouter)
    const [isAdmin, _setIsAdmin] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalActivity, setModalActivity] = useState({});
    const [activitiesToBeRendered, setActivitiesToBeRendered] = useState([]);
    const isAdminRef = useRef(isAdmin);
    const setIsAdmin = (data) => {
        isAdminRef.current = data;
        _setIsAdmin(data);
    };

    useEffect(() => {
        ActivityAPI.getActivities(topicId, categoryId, getActivitiesCb)
    }, [])

    useEffect(() => {
        if(isAdmin){
            setActivitiesToBeRendered(activitiesToBeRendered => [...activitiesToBeRendered, null]);
        }else{
            setActivitiesToBeRendered(activitiesToBeRendered.filter(activity => activity != null));
        }
    }, [isAdmin])

    const getActivitiesCb = (resultStatus, activities) => {
        if (resultStatus) {
            console.log(activities)
            setActivitiesToBeRendered(activities)
        } else {
            console.log("error");
        }
    }


    return (
        <div>
            {modalVisible ?
                <CardModal topicId={topicId} categoryId={categoryId} modalActivity={modalActivity} setModalVisible={setModalVisible}/> : null
            }
            <div className="parent">
                <CategoryHeader topicId={topicId} categoryId={categoryId}/>
                <AdminPanel isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
            </div>
            <div className="parent">
                {
                    activitiesToBeRendered.map((activity, index) =>
                            <Activity
                                isAdmin={isAdmin}
                                activity={activity}
                                index={index}
                                setModalActivity={setModalActivity}
                                setModalVisible={setModalVisible}
                            />

                    )
                }
            </div>
        </div>


    );
}


function CategoryHeader({topicId, categoryId}) {
    const [category, setCategory] = useState();

    useEffect(() => {
        CategoryAPI.getCategory(topicId, categoryId, getCategoryCb);
    }, [])

    const getCategoryCb = (resultStatus, category) => {
        if (resultStatus) {
            setCategory(category)
        } else {
            console.log("error");
        }
    }

    return (
        <div className="child">
            {
                category ? `Category - ${category.name}` : null
            }
        </div>
    )
}

function AdminPanel({isAdmin, setIsAdmin}) {
    return (
        <div className="child">
            User Mode
            <Switch
                checked={isAdmin}
                onChange={(chk) => {
                    setIsAdmin(!isAdmin);
                }}
                inputProps={{'aria-label': 'controlled'}}
            />
            Creator Mode
        </div>
    )
}


function Activity({isAdmin, activity, index, setModalActivity, setModalVisible}) {
    const backgroundImage = activity && activity.image ? `url(http://localhost:6666/${activity.image})` : null;
    const backgroundColor = activity ? null : "black";
    const [isOpen, setIsOpen] = useState(false);

    function curtainClickEvent() {
        setIsOpen(oldIsOpen => !oldIsOpen)
    }

    useEffect(() => {
        if (isOpen & isAdmin) {
            setModalActivity(activity);
            setModalVisible(true);
        }
    }, [isOpen])

    return (
        <div key={index} className="activity-container"
             style={{backgroundSize: '200px 225px', backgroundImage: backgroundImage, backgroundColor: backgroundColor}}
             onClick={() => curtainClickEvent()}>

            <p>{activity && activity.text ? activity.text : index}</p>
            <img src={curtain} key={index} alt={index}
                 className={isAdmin || isOpen ? "curtain-invisible" : "curtain-visible"}/>
        </div>)
}