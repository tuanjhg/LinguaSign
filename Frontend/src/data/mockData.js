// src/data/mockData.js
import imageCourse from "../assets/sign_topic_2.png";

const generateCourses = (title, count) =>
  Array.from({ length: count }, () => ({ title, imageSrc: imageCourse }));

export const recentCourses = [
  { title: "Chủ đề: Ẩm thực", imageSrc: imageCourse },
  { title: "Chủ đề: Câu cảm thán", imageSrc: imageCourse },
  { title: "Bài học: Các quốc gia", imageSrc: imageCourse },
  { title: "Bài học: Ẩm Thực", imageSrc: imageCourse },
  ...generateCourses("Bài học: Động vật", 6),
];

export const yourCourses = [
  { title: "Bài học: Ẩm Thực", imageSrc: imageCourse },
  { title: "Bài học: Thể thao", imageSrc: imageCourse },
  ...generateCourses("Bài học: Động vật", 3),
];

export const favoriteCourses = [
  ...generateCourses("Bài học: Động vật", 5),
  ...generateCourses("Favorite", 6).map((course, index) => ({
    ...course,
    title: `Favorite ${index + 1}`,
  })),
];
