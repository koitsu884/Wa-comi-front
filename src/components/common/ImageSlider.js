import React from 'react'
import { makeStyles } from '@material-ui/core'
import ImageGallery from 'react-image-gallery';

const useStyles = makeStyles({
    root: {
        height: '400px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        '& img.image-gallery-image': {
            maxWidth: '100%',
            height: '400px'
        }
    },
})

const ImageSlider = ({ images }) => {
    const classes = useStyles();

    const renderCarousel = () => {
        var items = images.map(image => {
            return {
                original: image,
                thumbnail: image
            }
        });

        return (
            <ImageGallery
                items={items}
                showThumbnails={false}
                autoPlay={true}
            />
        )
    }

    return (
        <div className={classes.root}>
            {
                images.length > 1
                    ? renderCarousel()
                    : <img src={images[0]} alt='' style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            }
        </div>
    )
}

export default ImageSlider
