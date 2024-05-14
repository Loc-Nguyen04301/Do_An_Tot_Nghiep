import { useEffect } from 'react';

const useScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    };

    useEffect(() => {
        scrollToTop()
    }, []);
};

export default useScrollToTop;