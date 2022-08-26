import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createUser } from '../../../actions/users'
import Navbar from '../../Navbar'

const CreateNewUser = () => {
    let src = 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png'

    const dispatch = useDispatch()
    const history = useHistory()

    const [name,setName] = useState('')
    const [validateName,setValidateName] = useState(true)
    const [email,setEmail] = useState('')
    const [validateEmail,setValidateEmail] = useState(true)
    const [password,setPassword] = useState('')
    const [validatePassword,setValidatePassword] = useState(true)
    const [id,setId] = useState('')

    const onFileChange = (event) => {
        setId(event.target.files[0])
        // dispatch(getTaskThumbnailPresignedUrl(event.target.files[0].type))
    }
    const handleSubmit = () => {
        dispatch(createUser({
            name,
            email,
            password,
            idLocation:id || src
        }))
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

                                    {/* Identifocation  */}
                                    <div className="row mb-3">
                                        <div>
                                            <h4>Upload User Identification</h4>
                                            <img 
                                                src={id? URL.createObjectURL(id) : src} 
                                                alt="profile"
                                                style={{height:'50px',width:'50px'}}    
                                                />
                                            
                                            <div>
                                            
                                                {id===''?
                                                <>
                                                    <h5>Select an Id Proof</h5>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        onChange={(event)=>{onFileChange(event)}}
                                                        style={{display:'block'}}
                                                        />
                                                </>
                                                
                                                :   <div>
                                                        <button 
                                                            className="btn btn-info btn-rounded mt-3"
                                                            // onClick={uploadFile}
                                                            style={{padding:'2px' ,width:'100px'}}
                                                        >   
                                                            Upload
                                                        </button>
                                                        <span 
                                                            className='p-1' 
                                                            style={{marginLeft:'10px'}}
                                                            onClick={()=>{setId('')}}
                                                        >
                                                                    ❌
                                                        </span>
                                                    </div>
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
                                Create New User
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </Navbar>
    )
}

export default CreateNewUser;