import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
    return (
        <div className='#overlay' style={{
            position: "fixed",
            display: "block",
            width: "100%",
            height: "100%",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            cursor: "pointer",
            zIndex: "10000"
        }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} />} className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
        </div >
    )
}

export default Loading