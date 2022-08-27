/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react'
import { Grid, _ } from "gridjs-react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUser } from '../../../actions/users'
import { userSelector } from '../../../selectors/users'
import Banner from '../../Common/Banner'
import Navbar from '../../Navbar'
import moment from 'moment';

const AllocationTable = ({data})=>{
    const history = useHistory()
    const tableData = data?data.map((alloc)=>[
        _(
            <a
                className="text-info"
                aria-disabled={alloc.book_status ==='active'?false:true}
                onClick={()=>{history.push(`/book/${alloc.bookId}`)}}
                >
                    {alloc.bookId}
            </a>
        ),
        alloc.book_status==='available'?alloc.title:'[ Discontinued Book ]',
        moment(alloc.allocatedOn).format('Do MMMM, YYYY hh:mm A'),
        alloc.returnedOn?moment(alloc.returnedOn).format('Do MMMM, YYYY hh:mm A'):_(<span className={`badge bg-primary`}>Currently Holding</span>),
    ]):[]
    return (
        <div className="col-12">
            <div className="card">
                <div className="card-body">
                    <div className="tab-content">
                        <div
                            className="tab-pane show active"
                            id="basic-datatable-preview"
                        >
                            <div id="basic-datatable-wrapper">
                                <Grid
                                    data={tableData}
                                    columns={[
                                        {name:"Book Id"},
                                        {name:"Book Name"},
                                        {name:"Allocated On"},
                                        {name:"Returned On"},
                                    ]}
                                    pagination={{
                                        enabled: true,
                                        limit: 20,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



const UserDetails = (props) => {
    const userId = props.match.params.userId
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        if(userId){
            dispatch(getUser({userId}))
        }
    } , [dispatch,userId])

    const user = useSelector(state=>userSelector(state))
    console.log(user)
    const onActionClick = ()=>{
        history.push(`/createNewUser/${userId}`)
    }

    return (
        <Navbar title="User Details">
            <Banner
                primaryData={user?user.userName:''}
                secondaryData={user?`Available Credit: ${user.available_credit}`:''}
                actionType="info"
                actionText="Edit User Details"
                onActionClick={onActionClick}
            />
            <AllocationTable data={user?user.allocationHistory:[]}/>
            
        </Navbar>
    )
}

export default UserDetails;

