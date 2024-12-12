import React from 'react';

// Images
import low from '../../assets/images/low.svg';
import medium from '../../assets/images/medium.svg';
import high from '../../assets/images/high.svg';

function Priority({type = 'low', size = 16}) {
    const src = type === 'medium' ? medium : type === 'high' ? high : low;
    const title = type === 'medium' ? 'Medium porioity' : type === 'high' ?'High porioity' : 'Low porioity';
    return (
        <img title={title} width={size} src={src} alt={'porioity'} />
    )
}

export default React.memo(Priority);