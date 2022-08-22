import { Link as RouterLink, useParams } from 'react-router-dom';
// material
import { Box, Card, Typography, Button, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Twitter } from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function AppLinks() {
  const { id } = useParams();

  const BUTTON_OPTIONS = [
    {
      category: 'Twitter',
      label: 'Schedule a post',
      icon: Twitter,
      catergoryColor: 'info',
      link: `/dashboard/${id}/twitter/add`,
      key: 'twitter-posts-add',
    },
    {
      category: 'Twitter',
      label: 'Edit a post',
      icon: Twitter,
      catergoryColor: 'info',
      link: `/dashboard/${id}/twitter/edit`,
      key: 'twitter-posts-edit',
    },
  ];
  return (
    <>
      {BUTTON_OPTIONS.map((option) => (
        <Grid item xs={12} md={3} key={option.key}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3, boxShadow: 4 }}>
            <Box sx={{ flexGrow: 1 }}>
              {/* <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <option.icon fontSize="small" color={option.catergoryColor} />
                <Typography variant="subtitle2">&nbsp;{option.category}</Typography>
              </div>
              <br /> */}

              <Typography variant="h5" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                {option.label}&nbsp;
                <Button to={option.link} component={RouterLink} color={option.catergoryColor}>
                  <ArrowForwardIcon />
                </Button>
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </>
  );
}
