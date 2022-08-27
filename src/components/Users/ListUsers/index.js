import React,{useEffect} from 'react'
import Navbar from '../../Navbar'
import { Grid, _ } from "gridjs-react";
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteUser, getAllUsers } from '../../../actions/users'
import { usersSelector } from '../../../selectors/users'

const Table = ({users}) => {
    const history = useHistory();
    const dispath = useDispatch();
    
    const handleDelete = (userId) => {
        dispath(deleteUser({userId}))
    }
    
    const data = users?users.map((user)=>[
        _(
            <>
                <img
                    src={'https://image-store-admin.s3.amazonaws.com/labTestThumbnail/752713cd-3d71-41ee-ab03-fdb59004f1a6.image/png'}
                    alt={users.userName}
                    style={{height:'48px',width:'48px'}}
                />
            </>
            
         ),
        user.userName,
        user.default_credit-user.available_credit,
        user.available_credit,
        _(
            <div>
                <div className="row d-flex justify-content-between">
                    <div className="col-4" 
                        onClick={()=>{
                            history.push(`/user/${user.userId}`)
                        }}
                    >
                        <i className="uil-info-circle text-info font-20"></i>
                    </div>
                    
                    <div className="col-4"
                        onClick={()=>{
                            history.push(`/createNewUser/${user.userId}`)
                        }}
                    >
                        <i className="mdi mdi-pencil text-warning font-20"></i>
                    </div> 
                
                    <div className="col-4"
                        onClick={()=>{
                            handleDelete(user.userId)
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
                                        {name:"Identification",width:"15%"},
                                        {name:"Name",width:"20%"},
                                        {name:"Books Allocated",width:"20%"},
                                        {name:"Credit Available",width:"20%"},
                                        {name:"Actions",width:"15%"},
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


const ListUsers = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(()=>{
        dispatch(getAllUsers())
    },[dispatch])
    const users = useSelector((state)=>usersSelector(state))
    return (
        <Navbar>
            <div className="d-flex justify-content-between mb-2 mx-3">
                <h3> User Records</h3>
                <button 
                    className='btn btn-info'
                    style={{height:'80%'}}
                    onClick={()=>{
                        history.push('/createNewUser')
                    }}
                > 
                        CREATE NEW USER
                </button>
            </div>
            <Table
                users={users}
            />
        </Navbar>
    )
}
export default ListUsers;