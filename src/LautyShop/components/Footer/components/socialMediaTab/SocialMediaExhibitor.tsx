import { Button } from "@mui/material"
import type { socialMediaLink } from "../../types";


const SocialMediaExhibitor = ({socialMedia}: {socialMedia: socialMediaLink}) => {
    const {altText, srcPath, link} = socialMedia;

  const handleLink = () => {
    window.open(link);
  }

  return (
    <Button
        sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: '#f0f0f0',
        padding: 0,
        minWidth: 0,
        '&:hover': {
            backgroundColor:theme => theme.palette.secondary.main,
            transform: 'scale(1.1)'
        },
        }}
        onClick={handleLink}
        >
          <img
          src={srcPath}
          alt={altText}
          style={{ width: 24, height: 24 }}
          />
    </Button>
  )
}

export default SocialMediaExhibitor
