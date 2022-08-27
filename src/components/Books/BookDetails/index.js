/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState,useEffect} from 'react'
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



const AllocateUser = ({bookId}) => {
      
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllUsers())
    },[dispatch])
    const users = useSelector(state=>usersSelector(state))
    const filteredUsers = users?users.filter(user=>user.available_credit>0):[]
    const options = filteredUsers?filteredUsers.map(({userName,userId})=>{
        return(
            {
                value:userId,
                label:userName
            }
        )
    }):[]
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

const AllocationTable = ({data})=> {
    const history = useHistory()
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


const BookDetails = (props) => {
    
    const bookId = props.match.params.bookId
    const dispatch = useDispatch()

    useEffect(()=>{
        if(bookId){
            dispatch(getBook({bookId}))
        }
    },[bookId,dispatch])

    const book = useSelector(state=>bookSelector(state))
    useEffect(()=>{  
    },[book])


    const onActionClick = () => {
        if(book){
            if(book.status === 'Allocated'){
                const user = book.allocationHistory.filter((item)=>item.returnedOn===null)
                const userId = user[0].userId
                dispatch(deallocateBook({bookId,userId}))
        }
    }
}


    return (
        <Navbar title="Book Details">
            <Banner
                primaryData={book?book.title:''}
                secondaryData={book?book.author:''}
                actionType={book?book.status==='Unallocated'?'success':'warning':'secondary'}
                actionText={book?book.status==='Unallocated'?'Allocate':'Unallocate':'No Book Found'}
                onActionClick={onActionClick}
                showActionButton={book?book.status==='Unallocated'?false:true:false}
    />  
            {book?book.status==='Unallocated'?
                <AllocateUser
                    bookId={bookId}
                />
                :null:
            null}
            <AllocationTable data={book?book.allocationHistory:[]}/>
        </Navbar>
    )
}

export default BookDetails;