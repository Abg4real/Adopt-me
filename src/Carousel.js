import React from 'react';

class Carousel extends React.Component {
    state = {
        photos: [],
        active: 0
    };

    // the below method gets the props, modifies it and t

    static getDerivedStateFromProps({ media }) {
        let photos = ['http://placecorgi.com/600/600'];

        if (media.length) {
            photos = media.map(({ large }) => large);
        }

        return { photos };
    }

    // Here the e.target.dataset.index gives a string. 
    // Putting a unary + in front of it coarses it to a number.
    // The function is converted to arrow as it does not create a new context and
    // stays to the context of place of invoke.
    // If arrow function is not used, the context(this) will be set to window or undefined.
    // Alternatively, you can use bind method in constructor to bind to the component(Remember the react specialization).

    handleIndexClick = (e) => {
        this.setState({
            active: +e.target.dataset.index
        })
    }
    render() {
        const { photos, active } = this.state;

        return (
            <div className="carousel">
                <img src={photos[active]} alt="animal" />
                <div className="carousel-smaller">
                    {photos.map((photo, index) => (
                        // eslint-disable-next-line
                        <img key={photos}
                            onClick={this.handleIndexClick}
                            data-index={index}
                            src={photo}
                            className={index === active ? "active" : ""}
                            alt="animal thumbnail"
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Carousel;