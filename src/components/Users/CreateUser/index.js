import React,{useState,useEffect} from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Alert from "sweetalert2";
import { createUser, getUser, getUserIdPresignedUrl, updateUser } from '../../../actions/users'
import { userIdPresignedUrlSelector } from '../../../selectors/preSignedUrls'
import { userSelector } from '../../../selectors/users'
import Navbar from '../../Navbar'
import { AWS_S3_USER } from '../../../config';

const CreateNewUser = (props) => {
    let src = 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png'

    const {userId} = props.match.params
    const dispatch = useDispatch()
    const history = useHistory()

    const [name,setName] = useState('')
    const [validateName,setValidateName] = useState(true)
    const [email,setEmail] = useState('')
    const [validateEmail,setValidateEmail] = useState(true)
    const [password,setPassword] = useState('')
    const [validatePassword,setValidatePassword] = useState(true)
    
    const [id,setId] = useState('')
    const [uploadUrl,setUploadUrl] = useState('')
    const [showUpload,setShowUpload] = useState(false)

    const user = useSelector(state=>userSelector(state),shallowEqual)
    
    useEffect(()=>{
        if(user&&userId){
            setName(user.userName)
            setEmail(user.email)
            setUploadUrl(user.id_loc)
        }},[user,userId])


    useEffect(()=>{
        if(userId){
            dispatch(getUser({userId}))
        }
    },[userId,dispatch])

    const onFileChange = (event) => {
        setShowUpload(true)
        setId(event.target.files[0])
        dispatch(getUserIdPresignedUrl(event.target.files[0].type))
    }

    const uploadConfigs = useSelector(state=>userIdPresignedUrlSelector(state))


    const uploadFile = async () => {
        await axios.put(uploadConfigs.url,id,{
            headers:{
               'Content-Type':id.type
            }
        }).then((val)=>{
           setUploadUrl(`${AWS_S3_USER}/${uploadConfigs.key}`)
           Alert.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thumbnail Uploaded',
            showConfirmButton: false,
            timer: 1500
          })
           
        }).catch((err)=>{
           Alert.fire({
               position: 'top-end',
               icon: 'error',
               title: 'Image Upload Failed',
               showConfirmButton: false,
               timer: 1500
             })
        })
    }

    const handleSubmit = () => {
        if(userId){
            dispatch(updateUser({
                userId,
                name,
                email,
                idLocation:uploadUrl

            }))
        }else{
            dispatch(createUser({
                name,
                email,
                password,
                idLocation:uploadUrl || src
            }))
        }
        
        history.push('/users')
    }

    return (
        <Navbar title="Create New User">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-1"></div>
                                <div className="col-lg-10">

                                    {/* Name */}
                                    <div className="row mb-3">
                                        <label
                                            htmlFor="name"
                                            className="col-2 col-form-label mt-2"
                                        >
                                            Name : 
                                        </label>
                                        <div className="col-9">
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                                onBlur={(e)=>{
                                                    if(e.target.value === ''){
                                                        setValidateName(false)
                                                    }else{
                                                        setValidateName(true)
                                                    }
                                                }}
                                                id="name"
                                                placeholder="Name of the User"
                                                autoComplete="off"
                                            />
                                            {validateName === false ?(
                                                <div className="text-danger">
                                                    Please give user name.
                                                </div>
                                            ):null}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="row mb-3">
                                        <label
                                            htmlFor="email"
                                            className="col-2 col-form-label mt-2"
                                        >
                                            Email : 
                                        </label>
                                        <div className="col-9">
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                                onBlur={(e)=>{
                                                    if(e.target.value === ''){
                                                        setValidateEmail(false)
                                                    }else{
                                                        setValidateEmail(true)
                                                    }
                                                }}
                                                id="email"
                                                placeholder="Email for login"
                                                autoComplete="off"
                                            />
                                            {validateEmail === false ?(
                                                <div className="text-danger">
                                                    Please give user email.
                                                </div>
                                            ):null}
                                        </div>
                                    </div>

                                    {/* Password */}
                                    {userId?null:
                                        <div className="row mb-3">
                                            <label
                                                htmlFor="name"
                                                className="col-2 col-form-label mt-2"
                                            >
                                                Password : 
                                            </label>
                                            <div className="col-9">
                                                <input
                                                    type="password"
                                                    className="form-control mt-2"
                                                    value={password}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }}
                                                    onBlur={(e)=>{
                                                        if(e.target.value === ''){
                                                            setValidatePassword(false)
                                                        }else{
                                                            setValidatePassword(true)
                                                        }
                                                    }}
                                                    id="password"
                                                    placeholder="Password for the account"
                                                    autoComplete="off"
                                                />
                                                {validatePassword === false ?(
                                                    <div className="text-danger">
                                                        Please set a password.
                                                    </div>
                                                ):null}
                                            </div>
                                        </div>
                                        }

                                    {/* User Identification  */}
                                    <div className="row mb-3">
                                        <div>
                                            <h4>Upload Book Cover </h4>
                                            <img 
                                                src={uploadUrl && !id ? uploadUrl : id ? URL.createObjectURL(id) : src}
                                                alt="profile"
                                                style={{height:'50px',width:'50px'}}    
                                                />
                                            
                                            <div>
                                            
                                                {id===''?
                                                <>
                                                    <h5>Choose a task thumbnail</h5>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        onChange={(event)=>{onFileChange(event)}}
                                                        style={{display:'block'}}
                                                        />
                                                </>
                                                
                                                :<>
                                                    <button 
                                                        className="btn btn-info btn-rounded mt-3"
                                                        onClick={uploadFile}
                                                        style={{padding:'2px' ,width:'100px'}}
                                                    >   
                                                        Upload
                                                    </button>
                                                    <span 
                                                        className='p-1' 
                                                        
                                                        onClick={()=>{setId('');setShowUpload(false)}}
                                                    >
                                                        ❌
                                                    </span>
                                                </>
                                                }
                                            </div>
                                        </div>         
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="justify-content-center d-flex" style={{marginTop:'1.75rem', marginLeft:"-25px"}}>
                            <button 
                                type="submit" 
                                className="btn btn-success"
                                onClick={()=>{handleSubmit()}}
                            >                   
                                {userId?'Edit User Details':'Create New User'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </Navbar>
    )
}

export default CreateNewUser;