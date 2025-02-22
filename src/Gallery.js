import React, { useState, useRef } from "react";
import "./gallery.css";

const imageLinks = [
    "https://cdn.pixabay.com/photo/2023/11/09/19/36/zoo-8378189_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/06/08/12/42/iceland-4260053_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/08/09/16/19/sea-7375377_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/01/28/23/35/hills-615429_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/11/28/16/27/nature-6830717_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/03/05/22/04/bird-8615360_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/11/21/20/10/bach-6815187_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/07/03/16/38/bird-7299650_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/08/28/18/03/dog-7417233_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/06/26/13/41/wolf-8089783_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/09/08/17/05/elephant-2729413_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/10/03/18/30/iceland-4524112_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/09/27/23/39/cow-5608144_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/09/10/06/55/flying-2734543_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/05/09/23/13/home-3386450_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/12/14/10/23/sea-3874707_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/01/17/21/03/reykjavik-1988082_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/08/22/11/31/iceland-1611766_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/02/21/08/06/coast-8587004_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/05/15/14/58/pied-kingfisher-6255945_1280.jpg",
];

const Gallery = () => {
    const [model, setModel] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(null);

    const openImage = (index) => {
        setCurrentIndex(index);
        setModel(true);
    };

    const closeModal = () => {
        setModel(false);
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageLinks.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imageLinks.length) % imageLinks.length);
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        if (!touchStartX.current) return;

        const touchEndX = e.touches[0].clientX;
        const difference = touchStartX.current - touchEndX;

        if (difference > 50) {
            nextImage();
        } else if (difference < -50) {
            prevImage();
        }

        touchStartX.current = null;
    };

    return (
        <>
            {model && (
                <div className="modal" onClick={closeModal}>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img
                        src={imageLinks[currentIndex]}
                        alt="Full Size"
                        className="modal-content"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    />
                    <button className="prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>&#10094;</button>
                    <button className="next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>&#10095;</button>
                </div>
            )}

            <div className="gallery">
                {imageLinks.map((link, index) => (
                    <div className="pics" key={index} onClick={() => openImage(index)}>
                        <img src={link} alt="gallery image" style={{ width: "100%" }} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Gallery;
