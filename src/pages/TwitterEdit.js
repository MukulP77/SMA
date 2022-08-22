import { useParams } from 'react-router-dom';

// material
import { Grid, Card, Container, Typography } from '@mui/material';
// components
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { AppLinks } from '../components/twitter/index';
import Page from '../components/Page';

function TwitterEdit() {
  const { id } = useParams();
  return (
    <>
      <Page title="Twitter Dashboard">
        <Container>
          <HeaderBreadcrumbs
            heading="Twitter Dashboard"
            links={[
              { name: 'Home', href: `/dashboard/${id}/app` },
              { name: 'Twitter Dashboard', href: `/dashboard/${id}/twitter` },
              { name: 'Edit' },
            ]}
          />
          {/* <Grid container spacing={3}>
            <AppLinks />
          </Grid> */}
          <br />
          <br />
          <Grid>
            <Typography variant="h5">List of posts</Typography>
            <Typography variant="subtitle2">Complete list of posts currently being tracked</Typography>
          </Grid>
          <br />
          <Grid>
            <Card>{/* <SortingSelecting data={companies} /> */}</Card>
          </Grid>
        </Container>
      </Page>
    </>
  );
}

export default TwitterEdit;
