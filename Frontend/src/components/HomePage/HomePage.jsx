import React, { useRef, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import styles from "./HomePage.module.css";
import homePageImage from '../../assets/homePageImage.jpg';
import imageContent2 from '../../assets/imgContent3.jpg';
import imageContent1 from '../../assets/imgContent1.JPG';

const cards = [
  {
    heading: "Heading",
    subheading: "Subheading",
    body: "Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:",
    detail: "Excepteur different emerging, minim veniam anim aute carefully curated. Cizna conversation exquisite perfect nostrud incididunt content. Qui ullamco elit first-class nulla ut. Punctual adipiscing, essential lovely queen tamper occaecat irure. Exclusive kitsch charming Scandinavian impeccable aute quality of life soft power particular Melbourne occaecat cascading. Quo wardrobe aliquip, et Porter destination. Toto remarkable officia Helsinki exceptur Basset hound. Zürich sleepy perfect consectetur.",
    image: imageContent1
  },
  {
    heading: "Heading",
    subheading: "Subheading",
    body: "Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:",
    detail: "Excepteur different emerging, minim veniam anim aute carefully curated. Cizna conversation exquisite perfect nostrud incididunt content. Qui ullamco elit first-class nulla ut. Punctual adipiscing, essential lovely queen tamper occaecat irure. Exclusive kitsch charming Scandinavian impeccable aute quality of life soft power particular Melbourne occaecat cascading. Quo wardrobe aliquip, et Porter destination. Toto remarkable officia Helsinki exceptur Basset hound. Zürich sleepy perfect consectetur.",
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
      <Header UserName="Nguyen Anh Dung" />
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
                  {idx === 0 ? 'PROJECTS' : idx === 1 ? 'SKILLS' : 'NETWORK'}
                </div>
                <div className={styles.serviceDesc}>
                  {idx === 0
                    ? 'I have worked on many projects and I am very proud of them. I am a very good developer and I am always looking for new projects.'
                    : idx === 1
                    ? 'I have a lot of skills and I am very good at them. I am very good at programming and I am always looking for new skills.'
                    : 'I have a lot of network skills and I am very good at them. I am very good at networking and I am always looking for new network skills.'}
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