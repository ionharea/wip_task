import {transformFileNameIntoPathLikeFileName} from "./transformFileNameIntoPathLikeFileName";

const extLength = 3;

export const getRoutePath = (fileName: string) => {
    const filename = transformFileNameIntoPathLikeFileName(fileName.substring(0, fileName.length - extLength));
    return `/blogs/${filename}`
};