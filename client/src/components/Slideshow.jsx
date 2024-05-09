import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Slideshow.css';

class Slideshow extends Component {
    state = {
        slideIndex: 0
    };

    showSlides = () => {
        let {slideIndex} = this.state;
        let slides = document.querySelectorAll('.slide');

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }

        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = 'block';

        this.setState({slideIndex});

        this.slideInterval = setTimeout(this.showSlides, 5000);
    };

    componentDidMount() {
        this.showSlides();
    }

    componentWillUnmount() {
        clearTimeout(this.slideInterval);
    }

    render() {
        return(
            <section className='slideshow-container'>
                <Link to='/' className='slide fade'>
                    <img src='/images/slides/sample-slide.png' />
                </Link>
                <Link to='/' className='slide fade'>
                    <img src='/images/slides/sample-slide-2.png' />
                </Link>
                <Link to='/' className='slide fade'>
                    <img src='/images/slides/sample-slide-3.png' />
                </Link>
            </section>
        );
    }
}

export default Slideshow;