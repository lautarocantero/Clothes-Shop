import FilterList from './FilterList';
import {typesData, sizesData} from '../helpers/filterData';
import FilterHeader from './FilterHeader';
import { Box, Typography } from '@mui/material';

const ProductsFilter = () => {
  return (
      <Box 
        sx={{ 
          backgroundColor: theme => theme?.palette?.primary?.main,
          borderRadius: '5px',
          margin: {xs:'auto'},
          width: {xs: '95%', md: '100%'},
          padding: '10px',
          color: theme => theme?.custom?.white,
        }}
      >
        <FilterHeader />
        <hr />
        <FilterList items={typesData} filterTitle='type'/>
        <Typography component={'h4'} sx={{ fontSize: theme => theme?.typography?.h4?.fontSize}}>Talle</Typography>
        <hr />
        <FilterList items={sizesData} filterTitle='size'/>
      </Box>
  )
}

export default ProductsFilter
