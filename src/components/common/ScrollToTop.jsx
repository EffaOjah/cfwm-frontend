import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop utility component.
 * Automatically scrolls the window to the top (0, 0) whenever the route changes.
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top of window on route change
        window.scrollTo(0, 0);
    }, [pathname]);

    return null; // This component doesn't render anything visually
};

export default ScrollToTop;
