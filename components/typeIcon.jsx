import React, { useEffect, useState } from "react";
import Image from "next/image";

const useTypeIcon = (type) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const fetchTypeIcon = async () => {
      const res = await fetch(`/api/getIcons?type=${type}`);
      if (res.ok) {
        const { base64Image } = await res.json();
        setIcon(`data:image/png;base64,${base64Image}`);
      }
    };

    fetchTypeIcon();
  }, [type]);

  return icon;
};

const TypeIcon = ({ type }) => {
  const icon = useTypeIcon(type);

  if (!icon) {
    return null;
  }

  return (
    <Image className="w-20" src={icon} alt={type} width={80} height={80} />
  );
};

export default TypeIcon;
