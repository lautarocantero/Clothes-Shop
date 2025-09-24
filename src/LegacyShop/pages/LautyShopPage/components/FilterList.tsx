import { useState } from 'react'
import { Link as LinkReactRouter, useLocation } from "react-router-dom";
import { Button, Link, Typography } from "@mui/material";

const FilterList = ({items, filterTitle}: {items: any[], filterTitle: string}) => {
  const [showAll, setShowAll] = useState(false);
  const { pathname, search } = useLocation();

  const visibleItems = showAll ? items : items.slice(0, 10);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const getUpdatedSearch = (item: string) => {
    const params = new URLSearchParams(search);
    params.set(filterTitle, item);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
      {visibleItems.map((item) => (
        <li key={item}>
          <Link
            component={LinkReactRouter}
            to={getUpdatedSearch(item)}
            sx={{
              color: theme => theme?.custom?.white,
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
                fontSize: '1.5em',
              },
            }}
          >
            {capitalize(item)}
          </Link>
        </li>
      ))}
      {!showAll && items.length > 10 && (
        <li>
          <Button
            sx={{ color: theme => theme?.custom?.accent, textDecoration: 'underline', marginTop: '10px', backgroundColor: theme => theme?.custom?.white }}
            onClick={() => setShowAll(true)}
          >
            <Typography component={'span'} sx={{ fontWeight:'bold'} }>Ver más</Typography>
          </Button>
        </li>
      )}
      {showAll && items.length > 10 && (
        <li>
          <Button
            sx={{ color: theme => theme?.custom?.accent, textDecoration: 'underline', marginTop: '10px', backgroundColor: theme => theme?.custom?.white }}
            onClick={() => setShowAll(false)}
          >
            <Typography component={'span'} sx={{ fontWeight:'bold'} }>Ver menos</Typography>
          </Button>
        </li>
      )}
    </ul>
  )
}

export default FilterList