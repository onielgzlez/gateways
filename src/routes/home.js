import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <p>
                Welcome to our Gateways managment. Head over to{" "}
                <Link to="/gateways">/gateways</Link> to see our gateways{" "} 
                or <Link to="/devices">/devices</Link> to see our devices.
            </p>
        </>
    );
}