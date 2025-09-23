import { Link} from '@mui/material'
import { Link as LinkReactRouter } from "react-router-dom"
import PropTypes  from "prop-types"
import type { NavBarLink } from '../../../NavBar/types'


const LinksExhibitor = ({ links }: { links: NavBarLink[] }) => {
  return (
    <ul>
    {
        links?.map((link: NavBarLink) => (
            <li key={link?.linkText} style={{ listStyle: 'none'}}>
                <Link
                    component={LinkReactRouter} 
                    color='inherit' 
                    to={link?.linkUrl === '/' ? '/' : `/${link?.linkUrl}`} 
                    sx={{ 
                        color: theme => theme?.custom?.white,
                        fontSize: theme => theme?.typography?.body1?.fontSize,
                        textAlign: 'left',
                        textDecoration: 'none',
                        marginTop: '10px'
                    }}
                    >
                        {link?.linkText}
                </Link>
            </li>
        ))
    }
    </ul>
  )
}

LinksExhibitor.propTypes = {
    links: PropTypes?.array?.isRequired,
}

export default LinksExhibitor
