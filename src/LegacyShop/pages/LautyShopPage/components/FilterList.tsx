import { useState } from 'react';
import { Link as LinkReactRouter, useLocation } from "react-router-dom";
import { Button, Link, Typography } from "@mui/material";

const FilterList = ({ items, filterTitle }: { items: any[], filterTitle: string }) => {
  const [showAll, setShowAll] = useState(false);
  const { pathname, search } = useLocation();

  const visibleItems = showAll ? items : items.slice(0, 10);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const getUpdatedSearch = (item: string) => {
  const params = new URLSearchParams(search);

  const currentFilter = params.get(filterTitle);

  if (currentFilter === item) {
    params.delete(filterTitle);
  } else {
    params.set(filterTitle, item);
  }

  return `${pathname}?${params.toString()}`;
};

  const isItemSelected = (item: string) => {
    const params = new URLSearchParams(search);
    const currentFilters = params.getAll(filterTitle);
    return currentFilters.includes(item);
  };

  return (
    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
      {visibleItems.map((item) => {
        const selected = isItemSelected(item);
        return (
          <li key={item}>
            <Link
              component={LinkReactRouter}
              to={getUpdatedSearch(item)}
              sx={{
                color: theme => theme?.custom?.white,
                fontWeight: selected ? 'bold' : 'normal',
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                  fontSize: '1.5em',
                },
              }}
            >
              <span>
                {selected && <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '12px'}}>arrow_forward</span>}
                {capitalize(item)} 
                {selected && <span className="material-symbols-outlined" style={{ color: 'white', fontSize: '12px'}}>arrow_back</span>}
              </span>
            </Link>
          </li>
        );
      })}
      {!showAll && items.length > 10 && (
        <li>
          <Button
            sx={{
              color: theme => theme?.custom?.accent,
              textDecoration: 'underline',
              marginTop: '10px',
              backgroundColor: theme => theme?.custom?.white
            }}
            onClick={() => setShowAll(true)}
          >
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>See more</Typography>
          </Button>
        </li>
      )}
      {showAll && items.length > 10 && (
        <li>
          <Button
            sx={{
              color: theme => theme?.custom?.accent,
              textDecoration: 'underline',
              marginTop: '10px',
              backgroundColor: theme => theme?.custom?.white
            }}
            onClick={() => setShowAll(false)}
          >
            <Typography component={'span'} sx={{ fontWeight: 'bold' }}>See less</Typography>
          </Button>
        </li>
      )}
    </ul>
  );
};

export default FilterList;


