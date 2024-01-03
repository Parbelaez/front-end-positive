import PostCard from "../components/PostCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { axiosReq } from "../api/axiosDefaults";


const Dashboard = () => {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        const dashboard = async () => {
            try {
                const result = await axiosReq.get('https://api-positive-a53d71b6a573.herokuapp.com/posts');
                console.log(result.data);
                setPosts(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        dashboard();
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

export default Dashboard;
