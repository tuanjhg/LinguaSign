import React from "react";

export const NotificationVariantMessage = ({ title, icon, className }) => {
  return (
    <div className={className}>
      {icon}
      <span>{title}</span>
    </div>
  );
};
