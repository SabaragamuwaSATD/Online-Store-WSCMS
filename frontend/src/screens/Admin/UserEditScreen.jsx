import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { 
  useUpdateUserMutation, 
  useGetUserDetailsQuery, 
} from '../../slices/usersApiSlice';


const UserEditScreen = () => {
    const { id: userId } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const { 
        data:user, 
        isLoading, 
        refetch, 
        error,
    } = useGetUserDetailsQuery(userId);

    const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
      if(user) {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }, [user]);

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        await updateUser({ userId, name, email, isAdmin});
        toast.success('User updated');
        refetch();
        navigate('/admin/userlist');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Back
      </Link>
       <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/>}

        { isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
          
          <Form onSubmit={submitHandler}>

            <FormGroup controlId='name' className='my-2'>
              <FormLabel>Name</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}>
              </FormControl>
            </FormGroup>
              
            <FormGroup controlId='email' className='my-2'>
              <FormLabel>Email</FormLabel>
                <FormControl
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}>
              </FormControl>
            </FormGroup>

            <FormGroup controlId='isAdmin' className='my-2'>
                <FormCheck
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                ></FormCheck>
            </FormGroup>

            <Button
            type='submit'
            variant='primary'
            className='my-2'
            >Update</Button>

          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen