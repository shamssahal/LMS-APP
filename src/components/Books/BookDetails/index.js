/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react'
import { Grid, _ } from "gridjs-react";
import { useDispatch, useSelector } from 'react-redux'
import { getBook } from '../../../actions/books'
import { bookSelector } from '../../../selectors/books'
import Banner from '../../Common/Banner'
import Navbar from '../../Navbar'
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const AllocationTable = ({data})=> {
    const history = useHistory()
    const tableData = data?data.map((alloc)=>[
        _(<a className="text-info" onClick={()=>{history.push(`/user/${alloc.userId}`)}}>{alloc.userId}</a>),
        alloc.userName,
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
    console.log(book)

    const onActionClick = (targetUserId) => {
        if(book){
            if(book.status === 'Allocated'){
                // get userId from allocation history
                // dispatch action to deallocate book
                // dispatch(deallocateBook({bookId,TargetUserId}))
            }else{
                // dispatch to allocate book to targetUserId
                //dispatch(allocateBook({bookId,targetUserId}))
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
            />
            <AllocationTable data={book?book.allocationHistory:[]}/>
        </Navbar>
    )
}

export default BookDetails;