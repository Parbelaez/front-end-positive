import PostCard from "../components/PostCard";
import { useState, useEffect } from "react";
import axios from "axios";


const Home = () => {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        const home = async () => {
            try {
                const result = await axios.get('https://api-positive-a53d71b6a573.herokuapp.com/posts');
                console.log(result.data);
                setPosts(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        home();
    }, []);
    return (
        <div>
            <h1>Positive Posts</h1>
                <div className="row">
                {posts.map((post) => (
                    <div className="col-md-4">
                        <PostCard post={post} />
                    </div>
                    )
                )
                }
                </div>
        </div>
    );
}

export default Home;
