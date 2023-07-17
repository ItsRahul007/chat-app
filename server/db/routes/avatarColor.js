// For user avatar color;
const avatarColor = ['#72c976', '#454f5a', '#c18138', '#367e4f', '#17b1a4', '#1755b1', '#4116db', '#9616db', '#b913b9', '#b9137c', '#b9133d', '#b91313'];

function pickColor(){
    const index = Math.floor(Math.random() * (avatarColor.length + 1));
    return avatarColor[index]
};

module.exports = pickColor;