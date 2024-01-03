import PostCard from "../components/PostCard";
import { useState, useEffect } from "react";

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(
            "https://api-positive-a53d71b6a573.herokuapp.com/places"
        )
            .then((res) => res.json())
            .then((data) => setPosts(data.posts));
    }, []);
    return (
        <div>
            <h1>Positive Posts</h1>
            <div className="row">
                {posts.map((post) => (
                    <div className="col-md-4">
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
