/**
 * Format: color_name_opacity
 * If opacity is not defined, then it is 100% by default.
 */
export const Colors = {
    black: "#141212",
    black_10: "#14121210",
    black_25: "#14121225",
    blue: "#F4F4F4",
    auth_button_blue: "#1F2E6E",
    // blue_accent: "#222638",
    light_blue: "#748EFF",
    red: "#FF3A3A",
    red_80: "#FF3A3A80",
    red_accent: "#CD3838",
    dark_grey: "#403B3B",
    dark_grey_75: "#2D2D2F75",
    light_grey: "#8F8F8F",
    light_grey_75: "#8F8F8F75",
    light_grey_50: "#8F8F8F50",
    light_grey_25: "#8F8F8F25",
    light_grey_two: "#D9D9D9", // input background color
    white: "#F5F5F5",
    white_accent: "#BDBDBD", // for pressed module threads
    yellow_accent: "#c2910e",
    light_new_red: '#FFDBDB',
    new_red: "#F16F6F",
    new_red_80: "#F16F6F80",
    new_red_accent: "#892C2C",
    new_blue: "#ABEAE2",
    new_blue_accent: "#2C3B79",
    new_blue_50: "#728DFF50",
    new_blue_75: "#728DFF75",
    yellow: '#FEF0E9',
    button_yellow: '#EFB61E',
    light_yellow: '#FEF0E9',
    light_yellow_75: '#FEF0E975',
    white_1: '#f4f4f4', // '#faebd7', #fffff3, #f4f4f4
    green_1: '#d6eadf',
    green_2: '#b8e0d2',
    green_accent: '#95C6B5',
    green_3: '#e4f6df',
    blue_1: '#95b8d1',
    blue_2: '#809bce',
    blue_accent: '#F1FBFF',
    blue_2_75: '#809bce75',
    blue_3: '#dcf3fc',
    blue_4: '#e9f7fd',
    hyperlink: '#5681D4',
    hyperlink_hover: '#1B3F82',
}

export const ScreenSizes = {
    extra_small: '@media only screen and (max-width: 600px)',
    small_up: '@media only screen and (min-width: 600px)',
    small_below: '@media only screen and (max-width: 768px)',
    medium_up: '@media only screen and (min-width: 768px)',
    medium_below: '@media only screen and (max-width: 992px)',
    large_up: '@media only screen and (min-width: 992px)',
    large_below: '@media only screen and (max-width: 1200px)',
    extra_large_up: '@media only screen and (min-width: 1200px)',
    extra_large_below: '@media only screen and (max-width: 2000px)',
    huge_up:  '@media only screen and (min-width: 1500px)',
    extra_huge_up: '@media only screen and (min-width: 2000px)'
};


//export const API_URL = process.env.REACT_APP_API_URL || 'https://pinus-study-backend-deployment-production.up.railway.app';
export const API_URL = 'http://localhost:8080';

export const LOGIN_URL = `${API_URL}/login`;
export const USER_URL = `${API_URL}/user`;
export const VERIFICATION_URL = `${API_URL}/verify_email`;
