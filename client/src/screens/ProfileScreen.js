import React,{useState,useEffect} from 'react'
import {Form,Row,Col,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUserDetails,updateUserProfile} from '../actions/userAction';

const ProfileScreen = ({location,history}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [message,setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector(state=>state.userDetails);
    console.log('userDetails : ',userDetails);
    const {loading,error,user} = userDetails;

    console.log('user :',user)
    

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const userUpdateProfile=useSelector(state=>state.userUpdateProfile);
    const {success} = userUpdateProfile;

    const submitHandler=(e)=>{
        e.preventDefault();

        if(password!==confirmPassword)
        {
            setMessage("Password do not match")
        }
        else
        {
            dispatch(updateUserProfile({id:user._id,name,email,password}));

        }
    }


    useEffect(() => {
        if(!userInfo)
        {
            history.push('/login');
        }
        else
        {
            if(!user.name)
            {
            dispatch(getUserDetails('profile'));
            }
            setName(user.name);
            setEmail(user.email);
            
        }
        
        
    }, [userInfo,history,user,dispatch])

    return (
        <Row className='m-5'>
            <Col md={4}>
            <h2>User Profile  {disabled ? <i className='fas fa-edit' onClick={()=>setDisabled(!disabled)}></i>:<i className='fas fa-times' onClick={()=>setDisabled(!disabled)}></i>}  </h2>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' disabled={disabled} placeholder='enter name' value={name}onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' disabled={disabled}  placeholder='enter email' value={email}onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            
            {!disabled && 
            
            <>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' disabled={disabled}  placeholder='enter password' value={password}onChange={(e)=>setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' disabled={disabled}  placeholder='confirm password' value={confirmPassword}onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            </>

            }
            

            <Button type='submit' disabled={disabled} varient='primary'>Update</Button>
            </Form>
            </Col>

            <Col md={8}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
