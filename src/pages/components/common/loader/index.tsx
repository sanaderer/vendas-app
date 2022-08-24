interface LoaderProps {
    show: boolean;
}

export const Loader: React.FC = ({ show }) => {

    if(!show){
        return <></>
    }
    return (
        <div id="loader" style ={{
            background: 'rgba(255, 255, 255, 0.5)',
            width: '100%',
            height: '100%',
            zIndex: 99999,
            position: 'absolute',
            left: '20%',
            top: '30%'
        }}>
            <div style= {{
                position: 'absolute',
                left: '20%',
                top: '30%'
            }}>
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}