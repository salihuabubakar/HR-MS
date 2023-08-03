import React, { useState} from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './custom.css'
import { Popup, Segment  } from "semantic-ui-react";
import PopUpText from '../../../_components/modelbox/PopUpText';

const Gallery = ({ 
    data, houseId, 
    onLoading,
    handleFileDownload,
    handleEditHouseImages,
    handleDeleteHouseImages
  }) => {

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleFullScreenChange = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleImageDoubleClick = () => {
    setIsZoomed(!isZoomed);
  };

  const filteredImage = data
  ?.map((img, index) => {
    const { name, id, description, image, house } = img;
    if (house === houseId) {
      return {
        id,
        index, // Add the index to the returned object
        image,
        description,
        name,
      };
    }
    return null; // Return null for non-matching items
  })
  .filter((item) => item !== null); // Filter out the null items (non-matching ones)

  const imgData = [];
  filteredImage?.forEach((img) => {
    const { name, id, description, image, index } = img;
    imgData.push({
      id: id,
      index: index,
      original: image,
      thumbnail: image,
      description: description,
      originalAlt: name,
      originalTitle: name, 
    });
  });

  const renderImageWithDescription = (item) => {
    return (
      <div className={`image-gallery-image ${isZoomed ? 'zoomed' : ''}`}>
        <img onDoubleClick={handleImageDoubleClick} src={item.original} alt={item.originalAlt} className="image-gallery-no-resize" />
        {item.originalTitle && (
          <div className="image-gallery-description">
            <Popup
              inline
              hoverable
              position="top center"
              delay={{
                show: 300,
                hide: 800,
              }}
              content={
                <Segment.Group>
                      <Segment style={{ width: "250px" }}>
                        <div className="ui column relaxed divided grid">
                          <div className="column">
                            <h4>
                              <span>{item.originalTitle}</span>
                              <span 
                                style={{
                                    background: "none",
                                    border: "none",
                                    position: "absolute",
                                    right: "0"
                                  }}
                                >
                                <div className="dropdown dropdown-action text-start">
                                  <a
                                    className="action-icon dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="material-icons">
                                      more_vert
                                    </i>
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-left">
                                    <a
                                      className="dropdown-item"
                                      onClick={() => handleFileDownload(item.original)}
                                    >
                                      <i className="fa fa-download m-r-5" />{" "}
                                      Download
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      onClick={() => handleEditHouseImages(item.id, item.index)}
                                    >
                                      <i className="fa fa-pencil m-r-5" />{" "}
                                      Edit
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      onClick={() => handleDeleteHouseImages(item.id)}
                                    >
                                      <i className="fa fa-trash-o m-r-5" />{" "}
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </span>
                            </h4>
                            <div className="ui link list">
                              <a className="item">{item.description}</a>
                            </div>
                          </div>
                        </div>
                      </Segment>
                </Segment.Group>
              }
              trigger={
                <div>
                  {item.originalTitle}
                </div>
              }
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`image-gallery-container ${isFullScreen ? 'fullscreen' : ''}`}>
      <ImageGallery
        items={imgData} 
        onImageLoad={onLoading} 
        lazyLoad={true} 
        thumbnailLoading={onLoading}
        showPlayButton={false}
        onScreenChange={handleFullScreenChange}
        renderItem={renderImageWithDescription}
      />
    </div>
  )
}
export default Gallery;
