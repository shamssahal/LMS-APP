import React,{useEffect} from 'react'
import { Grid, _ } from "gridjs-react";
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAllBooks } from '../../../actions/books'
import { booksSelector } from '../../../selectors/books'
import Navbar from '../../Navbar'

const Table = ({books}) => {
    const history = useHistory();

    const handleDelete = () => {

    }
    const data = books?books.map((book)=>[
        _(
            <>
                <img
                    src={'https://image-store-admin.s3.amazonaws.com/labTestThumbnail/752713cd-3d71-41ee-ab03-fdb59004f1a6.image/png'}
                    alt={book.title}
                    style={{height:'48px',width:'48px'}}
                />
            </>
            
         ),
        book.title,
        book.author,
        _(
            book.status==='Unallocated'?
            <span className={`badge bg-success`}>Unallocated</span> 
            :<span className={`badge bg-warning`}>Allocated</span>
        ),
        _(
            <div>
                <div className="row d-flex justify-content-between">
                    <div className="col-4" 
                        onClick={()=>{
                            history.push(`/book/${book.bookId}`)
                        }}
                    >
                        <i className="uil-info-circle text-info font-20"></i>
                    </div>
                    
                    <div className="col-4"
                        onClick={()=>{
                            history.push(`/createNewBook/${book.bookId}`)
                        }}
                    >
                        <i className="mdi mdi-pencil text-warning font-20"></i>
                    </div> 
                
                    <div className="col-4"
                        onClick={()=>{
                            handleDelete(book.bookId)
                        }}
                    >
                        <i className=" mdi mdi-delete text-danger font-20"></i>
                    </div>
                </div>
            </div>
        )
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
                                    data={data}
                                    columns={[
                                        {name:"Cover",width:"10%"},
                                        {name:"Title",width:"30%"},
                                        {name:"Author",width:"20%"},
                                        {name:"Status",width:"20%"},
                                        {name:"Action",width:"15%"},
                                    ]}
                                    search={true}
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

const ListBooks = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(()=>{
        dispatch(getAllBooks())
    },[dispatch])
    const books = useSelector((state)=>booksSelector(state))
    return (
        <Navbar>
            <div className="d-flex justify-content-between mb-2 mx-3">
                <h3> Books Listing</h3>
                <button 
                    className='btn btn-info'
                    style={{height:'80%'}}
                    onClick={()=>{
                        history.push('/createNewBook')
                    }}
                > 
                        CREATE NEW BOOK
                </button>
            </div>
            <Table
                books={books}
            />
        </Navbar>
    )
}

export default ListBooks;