import React,{useState}from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createBook } from '../../../actions/books'
import Navbar from '../../Navbar'

const CreateNewBook = () => {
    
    let src = 'https://www.pngkey.com/png/full/103-1032588_book-cover-icon-website.png'
  
    const dispatch = useDispatch()
    const history = useHistory()
    const [title,setTitle] = useState()
    const [validateTitle,setValidateTitle] = useState(true)

    const [author,setAuthor] = useState()
    const [validateAuthor,setValidateAuthor] = useState(true)

    const [cover,setCover] = useState('')
    
    const onFileChange = (event) => {
        setCover(event.target.files[0])
        // dispatch(getTaskThumbnailPresignedUrl(event.target.files[0].type))
    }
    const handleSubmit = () => {
        dispatch(createBook({
            title,
            author,
            coverLoc:cover||src
        }))
        history.push('/books')
    }
    return (
        <Navbar title="Create New Book">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-1"></div>
                                <div className="col-lg-10">

                                    {/* Book Title */}
                                    <div className="row mb-3">
                                        <label
                                            htmlFor="book-title"
                                            className="col-2 col-form-label mt-2"
                                        >
                                            Book Title
                                        </label>
                                        <div className="col-9">
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                value={title}
                                                onChange={(e) => {
                                                    setTitle(e.target.value);
                                                }}
                                                onBlur={(e)=>{
                                                    if(e.target.value === ''){
                                                        setValidateTitle(false)
                                                    }else{
                                                        setValidateTitle(true)
                                                    }
                                                }}
                                                id="task-title"
                                                placeholder="Title of the book"
                                                autoComplete="off"
                                            />
                                            {validateTitle === false ?(
                                                <div className="text-danger">
                                                    Please give the book a title.
                                                </div>
                                            ):null}
                                        </div>
                                    </div>

                                    {/* Book Author */}
                                    <div className="row mb-3">
                                        <label
                                            htmlFor="book-author"
                                            className="col-2 col-form-label mt-2"
                                        >
                                            Book Author
                                        </label>
                                        <div className="col-9">
                                            <input
                                                type="text"
                                                className="form-control mt-2"
                                                value={author}
                                                onChange={(e) => {
                                                    setAuthor(e.target.value);
                                                }}
                                                onBlur={(e)=>{
                                                    if(e.target.value === ''){
                                                        setValidateAuthor(false)
                                                    }else{
                                                        setValidateAuthor(true)
                                                    }
                                                }}
                                                id="task-title"
                                                placeholder="Author of the book"
                                                autoComplete="off"
                                            />
                                            {validateAuthor === false ?(
                                                <div className="text-danger">
                                                    Please give author name.
                                                </div>
                                            ):null}
                                        </div>
                                    </div>

                                    {/* Book Cover  */}
                                    <div className="row mb-3">
                                        <div>
                                            <h4>Upload Book Cover</h4>
                                            <img 
                                                src={cover? URL.createObjectURL(cover) : src} 
                                                alt="profile"
                                                style={{height:'50px',width:'50px'}}    
                                                />
                                            
                                            <div>
                                            
                                                {cover===''?
                                                <>
                                                    <h5>Choose a book cover</h5>
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
                                                            onClick={()=>{setCover('')}}
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
                                onClick={handleSubmit}
                            >                   
                                Create New Book
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </Navbar>
    )
}

export default CreateNewBook;