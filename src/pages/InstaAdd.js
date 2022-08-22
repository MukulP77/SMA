import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Grid, Container, Stack, TextField, Typography, Card, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useDropzone } from 'react-dropzone';

// components
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// import { AppLinks } from '../components/twitter/index';
import Page from '../components/Page';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' },
}));

const InstaAdd = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const [files, setFiles] = useState([]);
  const { id } = useParams();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt={file}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const NewFormSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
    media: Yup.mixed(),
  });

  const formik = useFormik({
    initialValues: {
      content: '',
      media: null,
    },
    validationSchema: NewFormSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        values.datetime = value;
        values.id = id;
        values.media = files;
        console.log(values);
        const response = await axios.post('/insta/post', values);
        if (response.data.status !== 'Success') throw new Error('Scheduling failed');
        resetForm();
        navigate(`/dashboard/${id}/insta`);
      } catch (error) {
        resetForm();
        console.error(error);
        alert('Scheduling failed');
      }
    },
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  return (
    <>
      <Page title="Instagram Dashboard">
        <Container>
          <HeaderBreadcrumbs
            heading="Instagram Dashboard"
            links={[
              { name: 'Home', href: `/dashboard/${id}/app` },
              { name: 'Instagram Dashboard', href: `/dashboard/${id}/insta` },
              { name: 'Add' },
            ]}
          />
          {/* <Grid container spacing={3}>
            <AppLinks />
          </Grid> */}

          <Grid>
            <Typography variant="h5">Schedule a post</Typography>
            <Typography variant="subtitle2">Provide the post details</Typography>
          </Grid>
          <br />
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="Post content"
                        {...getFieldProps('content')}
                        name="content"
                        error={Boolean(touched.content && errors.content)}
                        helperText={touched.content && errors.content}
                        required
                      />
                      <div>
                        <LabelStyle>Post media</LabelStyle>
                        <Box>
                          <DropZoneStyle {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Box>
                              <Typography gutterBottom variant="h5">
                                Drop or Select files
                              </Typography>

                              <Typography variant="body2">
                                Drop files here or click&nbsp;
                                <Typography variant="body2" component="span">
                                  browse
                                </Typography>
                                &nbsp;through your machine
                              </Typography>
                            </Box>
                          </DropZoneStyle>
                          <aside style={thumbsContainer}>{thumbs}</aside>
                        </Box>
                      </div>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDateTimePicker
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          label="Date time *"
                          onError={console.log}
                          minDate={new Date()}
                          inputFormat="yyyy/MM/dd hh:mm a"
                          mask="___/__/__ __:__ _M"
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>

                      <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                        Submit
                      </LoadingButton>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Container>
      </Page>
    </>
  );
};

export default InstaAdd;
