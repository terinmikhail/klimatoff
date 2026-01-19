import { createMemo } from "solid-js";
import HomeView from "./home/HomeView";
import ConfidentialityView from "./confidentiality/ConfidentialityView";

export default function HomeLayout() {

    const content = createMemo(() => {
        const path = location.pathname;
        if (path === '/') {
            return <HomeView />;
        } else if (path === '/private') {
            return <ConfidentialityView />
        }
    })
    return (

        <div class="flex flex-1 w-screen">
            {content()}
        </div >
    );

};

