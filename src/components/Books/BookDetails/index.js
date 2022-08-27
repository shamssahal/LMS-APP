/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react'
import { Grid, _ } from "gridjs-react";
import { useDispatch, useSelector } from 'react-redux'
import { allocateBook, deallocateBook, getBook } from '../../../actions/books'
import { bookSelector } from '../../../selectors/books'
import Banner from '../../Common/Banner'
import Navbar from '../../Navbar'
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Select from 'react-select'
import { getAllUsers } from '../../../actions/users';
import { usersSelector } from '../../../selectors/users';


// Allocate User Component for allocation of book to users
const AllocateUser = ({bookId}) => {
    const dispatch = useDispatch()

    // Dispatch to get all users
    useEffect(()=>{
        dispatch(getAllUsers())
    },[dispatch])

    // Get all users from store
    const users = useSelector(state=>usersSelector(state))
    // filter users who don't have credit available
    const filteredUsers = users?users.filter(user=>user.available_credit>0):[]
    //constructing options for select component
    const options = filteredUsers?filteredUsers.map(({userName,userId})=>({value:userId,label:userName})):[]
    // Action listener to dispatch action to allocate book to user
    const handleAllocation = ({value})=> {
        dispatch(allocateBook({bookId,userId:value})) 
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <h4 className="header-title mt-0 mb-4">
                                Allocate User
                            </h4>
                        </div>
                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-8">
                                <Select 
                                    options={options} 
                                    onChange={(e)=>{handleAllocation(e)}}
                                />
                            </div>
                            <div className="col-2"></div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Allocation Table Component for displaying allocation history of book
const AllocationTable = ({data})=> {
    const history = useHistory()
    // Constructing columns for allocation table
    const tableData = data?data.map((alloc)=>[
        _(
            <a 
                className="text-info"
                aria-disabled={alloc.account_status ==='active'?false:true} 
                onClick={()=>{history.push(`/user/${alloc.userId}`)}}
                >
                    {alloc.userId}
            </a>
        ),
        // if account is not active (account deleted) , then show [ Deleted User ]
        alloc.account_status==='active'?alloc.userName:'[ Deleted User ]',
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
                                        {name:"UserId"},
                                        {name:"User Name"},
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

// Book Details Component for displaying book details
const BookDetails = (props) => {
    // fetching bookId to get book details
    const bookId = props.match.params.bookId
    const dispatch = useDispatch()

    // Dispatch to get book details
    useEffect(()=>{
        if(bookId){
            dispatch(getBook({bookId}))
        }
    },[bookId,dispatch])

    // Get book details from store
    const book = useSelector(state=>bookSelector(state))
    useEffect(()=>{  
    },[book])

    // Action listener to dispatch action to deallocate book from user -> passed to Banner component
    const onActionClick = () => {
        if(book){
            if(book.status === 'Allocated'){
                // fetching userId for current holder of book -> returnedOn is null
                const user = book.allocationHistory.filter((item)=>item.returnedOn===null)
                const userId = user[0].userId

                // Dispatch to deallocate book from user
                dispatch(deallocateBook({bookId,userId}))
        }
    }
}


    return (
        <Navbar title="Book Details">
            {/* Banner Component for Book Details */}
            <Banner
                primaryData={book?book.title:''}
                secondaryData={book?book.author:''}
                actionType={book?book.status==='Unallocated'?'success':'warning':'secondary'}
                actionText={book?book.status==='Unallocated'?'Allocate':'Unallocate':'No Book Found'}
                onActionClick={onActionClick}
                showActionButton={book?book.status==='Unallocated'?false:true:false}
        />  
            {/* If book is unallocated show component to allocate book to user */}
            {book?book.status==='Unallocated'?
                <AllocateUser
                    bookId={bookId}
                />
                :null:
            null}
            
            {/* Allocation table to show allocation history of book */}
            <AllocationTable data={book?book.allocationHistory:[]}/>
        </Navbar>
    )
}

export default BookDetails;