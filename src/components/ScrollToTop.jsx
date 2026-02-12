import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        // 1. Disable browser's default scroll restoration immediately
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        const scrollToTop = () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };

        // 2. Immediate scroll
        scrollToTop();

        // 3. Scroll after paint (RAF)
        requestAnimationFrame(() => {
            scrollToTop();
        });

        // 4. Scroll after small delay (nuclear option for slower devices)
        const timeoutId = setTimeout(() => {
            scrollToTop();
        }, 10);

        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
