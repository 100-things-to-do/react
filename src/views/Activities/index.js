import React, {useState, useRef} from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import $ from "jquery";
import curtain from '../../assets/curtain.jpeg';
import cross from '../../assets/cross2.png'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {useParams} from 'react-router';
import {Switch} from '@mui/material';
import ActivityModal from "./Modal";
import ActivityAPI from '../../apis/ActivityAPI'
import CategoryAPI from '../../apis/CategoryAPI'

require("./index.css");

//     const token = useSelector(state => state.user.token)

export default function Activities() {
    const {topicId, categoryId} = useParams(); // this is defined in path(mainRouter)
    const [isAdmin, _setIsAdmin] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalActivity, setModalActivity] = useState({});
    const [activitiesToBeRendered, setActivitiesToBeRendered] = useState([]);
    const [isActivitiesRendered, setIsActivitiesRendered] = useState(false);
    const [isNewActivity, setIsNewActivity] = useState(false);
    const isAdminRef = useRef(isAdmin);
    const setIsAdmin = (data) => {
        isAdminRef.current = data;
        _setIsAdmin(data);
    };

    useEffect(() => {
        ActivityAPI.getActivities(topicId, categoryId, getActivitiesCb)
    }, [])

    useEffect(() => {
        if(isNewActivity){
            ActivityAPI.getActivities(topicId, categoryId, getActivitiesCb);
            setIsNewActivity(false);
        }
    }, [isNewActivity])

    useEffect(() => {
        if(isActivitiesRendered){
            if (isAdmin) {
                setActivitiesToBeRendered(activitiesToBeRendered => [...activitiesToBeRendered, null]);
            } else {
                setActivitiesToBeRendered(activitiesToBeRendered.filter(activity => activity != null));
            }
            setIsActivitiesRendered(false);
        }

    }, [isAdmin, isActivitiesRendered])

    const getActivitiesCb = (resultStatus, activities) => {
        if (resultStatus) {
            console.log(activities)
            setActivitiesToBeRendered(activities)
            setIsActivitiesRendered(true)
        } else {
            console.log("error");
        }
    }


    return (
        <div>
            {modalVisible ?
                <ActivityModal
                    topicId={topicId}
                    categoryId={categoryId}
                    modalActivity={modalActivity}
                    setModalVisible={setModalVisible}
                    setIsNewActivity={setIsNewActivity}
                /> : null
            }
            <div className="header-container">
                <CategoryHeader topicId={topicId} categoryId={categoryId}/>
                <AdminPanel isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
            </div>
            <span>&nbsp;&nbsp;</span>
            <div className="activities-container">
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
                category ? `Category Name : ${category.name}` : null
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
    const backgroundColor = activity ? "#0AA1DD" : "black";
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
             style={{backgroundSize: '200px 225px', backgroundColor: backgroundColor}}
             onClick={() => curtainClickEvent()}>
            {activity && activity.image ?
                <div className="inner-container">
                    <img src={activity.image} key={index}
                          className="activity-image"/>
                    <p>Activity Name: {activity && activity.name ? activity.name : index}</p>
                </div>
                :
                <img src={cross} key={index} alt={index}
                     className="image-overlay plus-sign"/>
            }
            <img src={curtain} key={index} alt={index}
                 className={"image-overlay " + (isAdmin || isOpen ? "curtain-invisible" : "curtain-visible")}/>
        </div>)
}