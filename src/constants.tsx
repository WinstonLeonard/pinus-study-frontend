/**
 * Format: color_name_opacity
 * If opacity is not defined, then it is 100% by default.
 */
export const Colors = {
    black: "#000000",
    blue: "#1F2E6E",
    blue_accent: "#222638",
    light_blue: "#748EFF",
    red: "#FF3A3A",
    red_80: "#FF3A3A80",
    red_accent: "#CD3838",
    dark_grey: "#2D2D2F",
    dark_grey_75: "#2D2D2F75",
    light_grey: "#8F8F8F",
    light_grey_75: "#8F8F8F75",
    light_grey_50: "#8F8F8F50",
    light_grey_25: "#8F8F8F25",
    light_grey_two: "#D9D9D9", // input background color
    white: "#F5F5F5",
    white_accent: "#BDBDBD", // for pressed module threads
    yellow: "#EFB61E",
    yellow_accent: "#c2910e",
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

// export const API_URL = 'http://localhost:8080';
export const API_URL = 'https://pinus-study-backend-deployment-production.up.railway.app';

export const LOGIN_URL = `${API_URL}/login`;
export const USER_URL = `${API_URL}/user`;
