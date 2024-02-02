import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
// import Alert from "react-bootstrap/Alert";

function CreatePost() {
    const [errors, setErrors] = useState({});
    const [places, setPlaces] = useState([]);
    let navigate = useNavigate();

    const [postData, setPostData] = useState({
        place_name: "",
        title: "",
        visit_date: "",
        content: "",
        image: "",
        image_filter: "",
        recommendaton: "",
    });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get("/places/");
                setPlaces(data.results);
            } catch (error) {
                console.log(error);
            }
        };
        handleMount();
    }, []);

    const handleChange = (event) => {
        // handleChange for all fields
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("place_name", postData.place_name);
        formData.append("title", postData.title);
        formData.append("visit_date", postData.visit_date);
        formData.append("content", postData.content);
        formData.append("image", postData.image);
        formData.append("image_filter", postData.image_filter);
        formData.append("recommendaton", postData.recommendaton);

        try {
            const { data } = await axiosReq.post("/posts/", formData);
            navigate.push(`/posts/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
            setErrors(err.response?.data);
            }
        }
    };

    return (
        <div>
            <h1>Create Post Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={postData.title}
                        onChange={handleChange}
                    />
                    {errors.place_type && (
                        <div className="alert alert-danger">
                            {errors.place_type}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="place_name">Place Name</label>
                    <select
                        className="form-control"
                        id="place_name"
                        name="place_name"
                        value={postData.place_name}
                        onChange={handleChange}
                    >
                        <option value="">Select a place</option>
                        {places.map((place) => (
                            <option key={place.id} value={place.id}>
                                {place.place_name}, {place.country},
                                {place.city}, {place.address}
                            </option>
                        ))}
                    </select>
                    {errors.place_name && (
                        <div className="alert alert-danger">
                            {errors.place_name}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="visit_date">Visit Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="visit_date"
                        name="visit_date"
                        value={postData.visit_date}
                        onChange={handleChange}
                    />
                    {errors.address && (
                        <div className="alert alert-danger">
                            {errors.address}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="content">Write your positive experience</label>
                    <input
                        type="text"
                        className="form-control"
                        id="content"
                        name="content"
                        value={postData.content}
                        onChange={handleChange}
                    />
                    {errors.country && (
                        <div className="alert alert-danger">
                            {errors.country}
                        </div>
                    )}
                </div>
                {/* // !Change to the form for uploading images!!!!!!!!!!!!!! //
                // !Change to bootstrap!!!!!!!!!!!!!! */}
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        name="image"
                        value={postData.image}
                        onChange={handleChange}
                    />
                    {errors.image && (
                        <div className="alert alert-danger">{errors.image}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="image_filter">Image Filter</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image_filter"
                        name="image_filter"
                        value={postData.image_filter}
                        onChange={handleChange}
                    />
                    {errors.place_name && (
                        <div className="alert alert-danger">
                            {errors.place_name}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="recommendation">Recommendation</label>
                    <input
                        type="text"
                        className="form-control"
                        id="recommendation"
                        name="recommendation"
                        value={postData.recommendation}
                        onChange={handleChange}
                    />
                    {errors.place_name && (
                        <div className="alert alert-danger">
                            {errors.place_name}
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreatePost;
