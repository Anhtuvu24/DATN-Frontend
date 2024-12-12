export function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Sử dụng độ dài của chuỗi để ảnh hưởng đến màu sắc
    hash += string.length;

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name) {
    const nameParts = name.split(' ');
    let initials = '';

    if (nameParts.length === 1) {
        initials = nameParts[0][0];
    } else {
        initials = nameParts[0][0] + nameParts[nameParts.length - 1][0];
    }

    return {
        bgcolor: stringToColor(name),
        children: initials.toUpperCase(),
    };
}

export function objectToArray(obj) {
    if (!obj) return []
    return Object.keys(obj).map(key => {
        return obj[key]
    })
}

export function arrayToObject(arr) {
    if (!arr) return {}

    let obj = {}
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i].id] = arr[i]
    }

    return obj
}

export const toObject = (arr, key) => arr.reduce((a, b) => ({ ...a, [b[key]]: b }), {})

export function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
}

export function removeItem(array, id, key = '') {
    if(key){
        return array[key].filter(item => item.id !== id)
    }
    return array.filter(item => item.id !== id)
}

export function insertItem(array, item) {
    let newArray = array.slice()
    newArray.splice(0, 0, item)
    return newArray
}

export function updateObjectInArray(array, obj) {
    return array.map(item => {
        if (item.id !== obj.id) {
            return item
        }

        return {
            ...item,
            ...obj,
        }
    })
}

export function timeAgo(createdAt) {
    const now = new Date();
    const createdTime = new Date(createdAt);
    const diffInSeconds = Math.floor((now - createdTime) / 1000);

    if (diffInSeconds < 60) {
        return 'Just now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minustes ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hours ago`;
    } else if (diffInSeconds < 172800) {
        return 'Yesterday';
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} days ago`;
    }
}

export const determineFileType = (metadata) => {
    const { contentType } = metadata;

    if (!contentType) {
        return 'Unknown';
    }

    if (contentType.startsWith('image/')) {
        return 'Image';
    } else if (contentType.startsWith('video/')) {
        return 'Video';
    } else if (contentType.startsWith('audio/')) {
        return 'Audio';
    } else if (contentType === 'application/pdf') {
        return 'PDF Document';
    } else if (contentType.startsWith('application/vnd.openxmlformats-officedocument')) {
        return 'Office Document';
    } else if (contentType.startsWith('text/')) {
        return 'Text Document';
    } else {
        return 'Other';
    }
};

// function generateAvatar(text) {
//     const canvas = createCanvas(150, 150);
//     const context = canvas.getContext('2d');
//     const strAvatar = stringAvatar(text);
//
//     canvas.width = 150;
//     canvas.height = 150;
//
//     // Draw background
//     context.fillStyle = strAvatar.bgcolor;
//     context.fillRect(0, 0, canvas.width, canvas.height);
//
//     // Draw text
//     context.font = 'bold 70px Arial'; // Adjust font size if needed
//     context.fillStyle = 'white';
//     context.textAlign = 'center';
//     context.textBaseline = 'middle';
//
//     // Adjust the position slightly to center the text better
//     context.fillText(strAvatar.children, canvas.width / 2, canvas.height / 2 + 5);
//
//     return canvas.toDataURL('image/png');
// }
// //