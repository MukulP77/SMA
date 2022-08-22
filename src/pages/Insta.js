// material
import { Grid, Card, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

// components
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { AppLinks } from '../components/insta/index';
import Page from '../components/Page';
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';
import EnhancedTable from '../components/twitter/TwitterTable';
// import axios from '../../axios';
// ----------------------------------------------------------------------

function Insta() {
  const { id } = useParams();
  return (
    <>
      <Page title="Instagram Dashboard">
        <Container>
          <HeaderBreadcrumbs
            heading="Instagram Dashboard"
            links={[{ name: 'Home', href: `/dashboard/${id}/app` }, { name: 'Instagram Posts' }]}
          />
          {/* <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary
                title="Successful Twitter Posts"
                total={1352831}
                color="info"
                icon={'eva:checkmark-circle-outline'}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary
                title="Pending Twitter Posts"
                total={1723315}
                color="warning"
                icon={'eva:clock-outline'}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <AppWidgetSummary title="Total Posts Available" total={714000} icon={'eva:activity-outline'} />
            </Grid>
          </Grid> */}
          {/* <br />

          <br /> */}
          <Grid>
            <Typography variant="h5">List of posts</Typography>
            <Typography variant="subtitle2">Complete list of posts currently being tracked</Typography>
          </Grid>
          <br />
          <Grid>
            <EnhancedTable />
          </Grid>
          <br />
          <Grid container spacing={3}>
            <AppLinks />
          </Grid>
        </Container>
      </Page>
    </>
  );
}

export default Insta;
