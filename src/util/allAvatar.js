import a from "../pages/auth/assets/1.svg";
import b from "../pages/auth/assets/2.svg";
import c from "../pages/auth/assets/3.svg";
import d from "../pages/auth/assets/4.svg";
import e from "../pages/auth/assets/5.svg";
import f from "../pages/auth/assets/6.svg";
import g from "../pages/auth/assets/7.svg";
import h from "../pages/auth/assets/8.svg";
import i from "../pages/auth/assets/9.svg";
import j from "../pages/auth/assets/10.svg";


const avatarArray = [a, b, c, d, e, f, g, h, i, j];


export default function getAvatarSvg(numString){
    return( avatarArray[Number(numString) - 1]);
};