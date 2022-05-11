import React, {useState, useRef} from 'react';
import {useEffect} from 'react';
import curtain from '../../assets/curtain.jpeg';
import cross from '../../assets/cross2.png';
import noImageIcon from "../../assets/no-image-icon.png";
import {useParams} from 'react-router';
import {Switch} from '@mui/material';
import CreateActivityModal from "./createActivityModal";
import ActivityAPI from '../../apis/ActivityAPI'
import CategoryAPI from '../../apis/CategoryAPI'

require("./index.css");

//     const token = useSelector(state => state.user.token)

export default function Activities() {
    const {topicId, categoryId} = useParams(); // this is defined in path(mainRouter)
    const [isAdmin, _setIsAdmin] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState({});
    const [activities, setActivities] = useState([]);
    const isAdminRef = useRef(isAdmin);
    const setIsAdmin = (data) => {
        isAdminRef.current = data;
        _setIsAdmin(data);
    };

    useEffect(() => {
        ActivityAPI.getActivities(topicId, categoryId, getActivitiesCb)
    }, [])



    const fetchActivities = () => {
        ActivityAPI.getActivities(topicId, categoryId, getActivitiesCb);
    }


    const getActivitiesCb = (resultStatus, activities) => {
        if (resultStatus) {
            setActivities(activities)
        } else {
            console.log("error");
        }
    }


    return (
        <div>
            {modalVisible ?
                <CreateActivityModal
                    topicId={topicId}
                    categoryId={categoryId}
                    selectedActivity={selectedActivity}
                    setModalVisible={setModalVisible}
                    fetchActivities={fetchActivities}
                /> : null
            }
            <div className="header-container">
                <CategoryHeader topicId={topicId} categoryId={categoryId}/>
                <AdminPanel isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
            </div>
            <span>&nbsp;&nbsp;</span>
            <div className="activities-container">
                {
                    activities.map((activity, index) =>
                        <Activity
                            isAdmin={isAdmin}
                            activity={activity}
                            index={index}
                            setSelectedActivity={setSelectedActivity}
                            setModalVisible={setModalVisible}
                        />
                    )

                }
                {
                    isAdmin ?
                    <AddActivityCard
                        setSelectedActivity={setSelectedActivity}
                        setModalVisible={setModalVisible}
                    /> : null
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


function Activity({isAdmin, activity, index, setSelectedActivity, setModalVisible}) {
    const backgroundColor = activity ? "#0AA1DD" : "black";
    const [isOpen, setIsOpen] = useState(false);

    function curtainClickEvent() {
        setIsOpen(oldIsOpen => !oldIsOpen)
    }

    useEffect(() => {
        if (isOpen & isAdmin) {
            setSelectedActivity(activity);
            setModalVisible(true);
        }
    }, [isOpen])

    return (
        <div key={index} className="activity-container clickable"
             style={{backgroundSize: '200px 225px', backgroundColor: backgroundColor}}
             onClick={() => curtainClickEvent()}>
            {activity ?
                <div className="inner-container">
                    <img src={activity.image ? activity.image : noImageIcon} key={index}
                         className="activity-image"/>
                    <p>Activity Name: {activity && activity.name ? activity.name : index}</p>
                </div>
                :
                <img src={cross} key={index} alt={index}
                     className="image-overlay plus-sign"/>
            }
            <img src={curtain} key={index} alt={index}
                 className={"image-overlay " + (isAdmin || isOpen ? "curtain-invisible" : "curtain-visible")}/>
        </div>
    )
}

function AddActivityCard({setSelectedActivity, setModalVisible}) {
    const BACKGROUND_COLOR = "black";

    function handleAddActivityEvent() {
        setSelectedActivity(null);
        setModalVisible(true);
    }


    return (
        <div className="activity-container"
             style={{backgroundSize: '200px 225px', backgroundColor: BACKGROUND_COLOR}}
             onClick={() => handleAddActivityEvent()}>
                <img src={cross}
                     className="image-overlay plus-sign"/>
        </div>
    )
}