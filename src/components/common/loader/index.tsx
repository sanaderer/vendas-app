import React from 'react';

interface LoaderProps {
    show: boolean;
}

export const Loader: React.FC<LoaderProps> = ({show}) => {

    if(!show){
        return <React.Fragment></React.Fragment>
    }

    return (
        <div id="loader" style ={{
            background: 'rgba(255,255,255,0.5)',
            width: '100%',
            height: '100%',
            zIndex: 99999,
            position: 'absolute',
            left: '20%',
            top: '70%'
        }}>
            <div style= {{
                position: 'absolute',
                left: '20%',
                top: '70%'
            }}>
                    <div className="spinner">
                </div>
            </div>
        </div>
    )
}

