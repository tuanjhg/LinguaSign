import React, { useRef, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import styles from "./HomePage.module.css";
import homePageImage from '../../assets/homePageImage.jpg';
import imageContent2 from '../../assets/imgContent3.jpg';
import imageContent1 from '../../assets/imgContent1.JPG';

const cards = [
  {
    heading: "Khóa học Ngôn ngữ Ký hiệu",
    subheading: "Học cách giao tiếp bằng ký hiệu",
    body: "Khóa học này cung cấp kiến thức cơ bản về ngôn ngữ ký hiệu, giúp bạn tự tin giao tiếp với cộng đồng người khiếm thính.",
    detail: "Bạn sẽ học cách sử dụng các cử chỉ tay, nét mặt và cơ thể để truyền đạt thông điệp một cách rõ ràng và chính xác. Nội dung khóa học bao gồm từ vựng ký hiệu phổ biến, cấu trúc ngữ pháp cơ bản, và cách biểu đạt cảm xúc thông qua ký hiệu.",
    image: imageContent1
  },
  {
    heading: "Phát triển kỹ năng Ngôn ngữ Ký hiệu",
    subheading: "Nâng cao khả năng giao tiếp bằng ký hiệu",
    body: "Tiếp tục hành trình học tập với các bài học nâng cao, giúp bạn giao tiếp linh hoạt và hiệu quả hơn.",
    detail: "Khóa học này sẽ đi sâu vào các chủ đề giao tiếp hàng ngày, ký hiệu chuyên ngành và kỹ năng phiên dịch ngôn ngữ ký hiệu. Bạn sẽ được thực hành với các tình huống thực tế, cải thiện tốc độ và độ chính xác khi sử dụng ngôn ngữ ký hiệu.",
    image: imageContent2
  }
];


const HomePage = () => {
  const cardRefs = useRef([]);
  const [visible, setVisible] = useState(Array(cards.length).fill(false));
  const [imgVisible, setImgVisible] = useState(false);
  const imgRef = useRef(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [serviceItemsVisible, setServiceItemsVisible] = useState([false, false, false]);
  const servicesRef = useRef(null);
  const serviceItemRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    // Fade-in effect for top image
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImgVisible(true);
          setTimeout(() => setOverlayVisible(true), 400); // Hiện overlay sau khi ảnh fade-in một chút
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observers = [];
    cardRefs.current = cardRefs.current.slice(0, cards.length);
    cards.forEach((_, idx) => {
      observers[idx] = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(v => {
              const updated = [...v];
              updated[idx] = true;
              return updated;
            });
            observers[idx].disconnect();
          }
        },
        { threshold: 0.2 }
      );
      if (cardRefs.current[idx]) {
        observers[idx].observe(cardRefs.current[idx]);
      }
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  useEffect(() => {
    // Observer cho section dịch vụ
    const servicesObserver = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServicesVisible(true);
          servicesObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (servicesRef.current) servicesObserver.observe(servicesRef.current);
    return () => servicesObserver.disconnect();
  }, []);

  useEffect(() => {
    if (servicesVisible) {
      // Hiện lần lượt từng thẻ dịch vụ từ phải sang trái, từng card một
      let idx = 2;
      function showNextCard() {
        setServiceItemsVisible(prev => {
          const updated = [...prev];
          updated[idx] = true;
          return updated;
        });
        if (idx > 0) {
          setTimeout(() => {
            idx--;
            showNextCard();
          }, 600); // 600ms: thời gian animation + delay rõ rệt
        }
      }
      showNextCard();
    }
  }, [servicesVisible]);

  return (
    <>
      <Header UserName="Khong Manh Tuan" />
      <div style={{position: 'relative'}}>
        <img
          src={homePageImage}
          alt="Home Banner"
          className={`${styles.topFullImage} ${imgVisible ? styles.fadeIn : styles.fadeOut}`}
          ref={imgRef}
        />
        <div className={styles.overlayOnImage}>
          <div className={`${styles.overlayText} ${overlayVisible ? styles.overlayFadeIn : ''}`}>
            Học ngôn ngữ&nbsp;ký hiệu dễ dàng hơn 
          </div>
          <button className={`${styles.getStartedOnImage} ${overlayVisible ? styles.overlayFadeInBtn : ''}`}>Bắt đầu ngay</button>
        </div>
      </div>
      <div className={styles.homePageWrapper} >
        <div className={styles.cardsSection}>
          {cards.map((card, idx) => {
            const isReverse = idx % 2 === 1;
            const slideClass = visible[idx]
              ? isReverse
                ? styles.slideInLeft
                : styles.slideInRight
              : styles.cardHidden;
            return (
              <div
                className={`${styles.infoCard} ${isReverse ? styles.reverse : ''} ${slideClass}`}
                key={idx}
                ref={el => (cardRefs.current[idx] = el)}
              >
                {card.image ? (
                  <img src={card.image} alt="Card" className={styles.cardImagePlaceholder} style={{objectFit:'cover'}} />
                ) : (
                  <div className={styles.cardImagePlaceholder}></div>
                )}
                <div className={styles.cardContent}>
                  <h2>{card.heading}</h2>
                  <h4>{card.subheading}</h4>
                  <p>{card.body}</p>
                  <p style={{ color: '#888', fontSize: 14 }}>{card.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Dịch vụ section */}
        <div className={styles.servicesSection} ref={servicesRef}>
          <h2 className={styles.servicesTitle + (servicesVisible ? ' ' + styles.servicesTitleVisible : '')}>
            Các Dịch vụ chúng tôi đem lại
          </h2>
          <div className={styles.servicesGrid}>
            {[0,1,2].map(idx => (
              <div
                key={idx}
                className={
                  styles.serviceItem +
                  (serviceItemsVisible[idx] ? ' ' + styles.serviceItemVisible : '')
                }
                ref={serviceItemRefs[idx]}
              >
                <div className={styles.serviceIcon}>
                  {idx === 0 ? '⚙️' : idx === 1 ? '🏃‍♂️' : '🏢'}
                </div>
              <div className={styles.serviceName}>
              {idx === 0 ? 'CƠ BẢN' : idx === 1 ? 'NÂNG CAO' : 'GIAO TIẾP'}
            </div>
            <div className={styles.serviceDesc}>
              {idx === 0
                ? 'Khóa học giúp bạn làm quen với ngôn ngữ ký hiệu, học cách diễn đạt ý tưởng cơ bản và giao tiếp với người khiếm thính.'
                : idx === 1
                ? 'Đào sâu hơn vào kỹ năng sử dụng ngôn ngữ ký hiệu, học ký hiệu chuyên ngành và cách biểu đạt cảm xúc một cách linh hoạt.'
                : 'Thực hành giao tiếp thực tế, giúp bạn tự tin trò chuyện bằng ngôn ngữ ký hiệu với cộng đồng và trong các tình huống hàng ngày.'}
            </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;