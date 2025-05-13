import React, { createContext, useState, useContext, useEffect } from 'react';

// Tạo context cho thông tin người dùng và ngôn ngữ
const AppContext = createContext();

// Dữ liệu mặc định
const defaultUserData = {
  name: "Nguyen Anh",
  surname: "Dung",
  email: "nguyenanhd@example.com",
  countryCode: "+84",
  phone: "912345678",
  avatar: null // Mặc định không có avatar
};

// Các bản dịch cho đa ngôn ngữ
const translations = {
  vi: {
    // Header
    homePage: "Trang chủ",
    translate: "Dịch",
    course: "Khóa học",
    search: "Tìm kiếm...",

    // Profile
    profile: "Hồ sơ",
    personalInfo: "Thông tin cá nhân",
    updatePersonalInfo: "Cập nhật thông tin cá nhân của bạn",
    firstName: "Tên",
    lastName: "Họ",
    email: "Email",
    phoneNumber: "Số điện thoại",
    saveChanges: "Lưu thay đổi",
    saving: "Đang lưu...",
    infoUpdated: "Thông tin đã được cập nhật!",
    changeAvatar: "Thay đổi ảnh đại diện",
    selectAvatar: "Chọn ảnh đại diện",
    uploadAvatar: "Tải lên ảnh đại diện",
    avatarUpdated: "Ảnh đại diện đã được cập nhật!",

    // Settings
    settings: "Cài đặt",
    manageSettings: "Quản lý cài đặt tài khoản của bạn",
    notifications: "Thông báo",
    appNotifications: "Thông báo ứng dụng",
    receiveNotifications: "Nhận thông báo về các hoạt động trong ứng dụng",
    emailUpdates: "Cập nhật qua email",
    receiveEmails: "Nhận email về các cập nhật và tính năng mới",
    interface: "Giao diện",
    darkMode: "Chế độ tối",
    enableDarkMode: "Bật chế độ tối cho ứng dụng",
    language: "Ngôn ngữ",
    saveSettings: "Lưu cài đặt",
    settingsSaved: "Cài đặt đã được lưu!",

    // Other
    logout: "Đăng xuất"
  },
  en: {
    // Header
    homePage: "Home Page",
    translate: "Translate",
    course: "Course",
    search: "Search...",

    // Profile
    profile: "Profile",
    personalInfo: "Personal Information",
    updatePersonalInfo: "Update your personal information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phoneNumber: "Phone Number",
    saveChanges: "Save Changes",
    saving: "Saving...",
    infoUpdated: "Information has been updated!",
    changeAvatar: "Change Avatar",
    selectAvatar: "Select Avatar",
    uploadAvatar: "Upload Avatar",
    avatarUpdated: "Avatar has been updated!",

    // Settings
    settings: "Settings",
    manageSettings: "Manage your account settings",
    notifications: "Notifications",
    appNotifications: "App Notifications",
    receiveNotifications: "Receive notifications about activities in the app",
    emailUpdates: "Email Updates",
    receiveEmails: "Receive emails about updates and new features",
    interface: "Interface",
    darkMode: "Dark Mode",
    enableDarkMode: "Enable dark mode for the app",
    language: "Language",
    saveSettings: "Save Settings",
    settingsSaved: "Settings have been saved!",

    // Other
    logout: "Log out"
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  // Khởi tạo state từ localStorage hoặc giá trị mặc định
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : defaultUserData;
  });

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'vi';
  });

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      notifications: true,
      emailUpdates: false,
      darkMode: false
    };
  });

  // Lưu thay đổi vào localStorage khi state thay đổi
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));

    // Áp dụng chế độ tối nếu được bật
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [settings]);

  // Lấy bản dịch hiện tại
  const t = translations[language] || translations.vi;

  // Cập nhật thông tin người dùng
  const updateUserData = (newUserData) => {
    setUserData(prev => ({ ...prev, ...newUserData }));
  };

  // Cập nhật cài đặt
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Cập nhật ngôn ngữ
  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  // Giá trị context
  const contextValue = {
    userData,
    updateUserData,
    language,
    changeLanguage,
    settings,
    updateSettings,
    t
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Hook để sử dụng context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
