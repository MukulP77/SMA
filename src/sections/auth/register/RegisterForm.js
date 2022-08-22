import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// axios
import axios from 'axios';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [subscription, setSubscription] = useState('');

  const handleChange = (event) => {
    setSubscription(event.target.value);
  };

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Full name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phoneNumber: Yup.number().min(10, 'Phone number should be of 10 digits').required('Phone number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Too short!')
      .matches(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    subscription: Yup.string().required('Please select a package'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      subscription: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await axios.post('/register', values);
        if (response) {
          alert('Registered successfully. Please login to view dashboard');
          console.log(response);
          navigate('/login', { replace: true });
        }
      } catch (error) {
        resetForm();
        console.log(error);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Full name"
              {...getFieldProps('fullName')}
              error={Boolean(touched.fullName && errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              error={Boolean(touched.subscription && errors.subscription)}
              helperText={touched.subscription && errors.subscription}
            >
              Subscription
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subscription}
              label="Subscription"
              onChange={handleChange}
              {...getFieldProps('subscription')}
              error={Boolean(touched.subscription && errors.subscription)}
              helperText={touched.subscription && errors.subscription}
            >
              <MenuItem value={`Start-ups`}>Start-ups</MenuItem>
              <MenuItem value={`Small scale business`}>Small scale business</MenuItem>
              <MenuItem value={`Large scale business`}>Large scale business</MenuItem>
              <MenuItem value={`Custom`}>Custom</MenuItem>
            </Select>
          </FormControl>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
