import moment from "moment";

export const relativeTime = (time) => {
  time = moment(time).startOf("second").fromNow();

  return time
    .replace(
      /(\d+)\s*(minute?|hour?|day?|week?|month?|year?)s?/,
      (match, p1, p2) => {
        switch (p2) {
          case "minute":
            return p1 + "m";
          case "hour":
            return p1 + "h";
          case "day":
            return p1 + "d";
          case "week":
            return p1 + "w";
          case "month":
            return p1 + "M";
          case "year":
            return p1 + "y";
          default:
            return match;
        }
      },
    )
    .replace(" ago", "");
};

export const isImageLinkValid = (name = '') => {
  if(!name) return
  const validExtensions = ["jpg", "jpeg", "png", "gif", "svg", "bmp", "webp"];
  const extension = name.split('.').pop()?.toLocaleLowerCase() ?? "";

  return validExtensions.includes(extension);
}

export const formatFileSize = (size = 0) => {
  if (size < 1024) {
    return size.toFixed(2) + " B";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + " KB";
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
}